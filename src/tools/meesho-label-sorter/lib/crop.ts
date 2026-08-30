/**
 * Cropping the tax invoice off a Meesho label page.
 *
 * A Meesho label PDF is A4 with two things stacked on it: the shipping label
 * on top and the tax invoice underneath. Sellers who print on a 4x6 thermal
 * roll want only the top half.
 *
 * Every tool in this category cuts at a hardcoded offset, which is why they
 * all leave the black "TAX INVOICE / Original For Recipient" band printed on
 * the bottom of each label. We find the band instead: `parseLabelPage` records
 * the baseline of the TAX INVOICE run, and the band's top edge sits a fixed
 * multiple of the font size above that baseline.
 *
 * The cut is also a real cut. The label is re-drawn into a fresh page through
 * a form XObject whose BBox is the label region, so the invoice text is gone
 * from the output rather than merely hidden under a smaller page box. That
 * matters: the cropped file gets handed to packers and pickup staff, and it
 * should not still carry the buyer's invoice, your GSTIN and your margins.
 */
import type { ViewMap } from './geometry'

export const CROP_MODES = ['off', 'crop', 'thermal-4x6', 'thermal-6x4', 'a4-4up'] as const
export type CropMode = (typeof CROP_MODES)[number]

/**
 * Distance from the TAX INVOICE baseline up to the top edge of its black band,
 * as a multiple of that run's font size. Measured at 1.456 on current Meesho
 * output; 1.5 lands just inside the white gap above the band, so a small font
 * change cannot push the band back into view.
 */
const BAND_TOP_RATIO = 1.5

/** A rectangle in the source page's own (unrotated) coordinates, for embedPage. */
export interface CropBox {
  left: number
  bottom: number
  right: number
  top: number
}

/**
 * Turns the view-space cut line into a file-space box.
 *
 * Pages can carry a /Rotate, so the cut we found while reading the page is in
 * "what a human sees" space. Mapping all four corners back and taking the
 * extent keeps this correct at every rotation instead of only at zero.
 */
export function cropBoxFromCut(cut: number, vm: ViewMap): CropBox {
  const corners: [number, number][] = [
    vm.back(0, cut),
    vm.back(vm.W, cut),
    vm.back(0, vm.H),
    vm.back(vm.W, vm.H),
  ]
  const xs = corners.map((c) => c[0])
  const ys = corners.map((c) => c[1])
  return {
    left: Math.min(...xs),
    bottom: Math.min(...ys),
    right: Math.max(...xs),
    top: Math.max(...ys),
  }
}

/** Where the band top sits, in view space, given the TAX INVOICE run. */
export function cutFromAnchor(baselineY: number, fontSize: number): number {
  return baselineY + fontSize * BAND_TOP_RATIO
}

/**
 * Used when a page has no TAX INVOICE run at all — a courier format we have
 * not seen, or a page that is only a label. Keeping the top 58% is roughly
 * where the band falls on current output, and the caller reports the guess so
 * the seller can check that page rather than trusting it silently.
 */
export function fallbackCut(viewHeight: number): number {
  return viewHeight * 0.58
}

export interface PlacedLabel {
  /** Anchor passed to drawPage, in the target page's coordinates. */
  x: number
  y: number
  /** Size in the label's own frame, before any rotation. */
  width: number
  height: number
  /** Total turn to apply, including any /Rotate carried by the source page. */
  rotate: 0 | 90 | 180 | 270
}

export interface CropLayout {
  pageWidth: number
  pageHeight: number
  /** How many labels share one output page. */
  perPage: number
  /** Cell rectangles, one per label on the page. */
  cells: { x: number; y: number; width: number; height: number }[]
}

const A4 = { width: 595.28, height: 841.89 }
const THERMAL_4X6 = { width: 288, height: 432 }
const THERMAL_6X4 = { width: 432, height: 288 }

/** Page geometry for a mode, given the natural size of one cropped label. */
export function cropLayout(mode: CropMode, labelW: number, labelH: number): CropLayout {
  if (mode === 'thermal-4x6') {
    return {
      pageWidth: THERMAL_4X6.width,
      pageHeight: THERMAL_4X6.height,
      perPage: 1,
      cells: [{ x: 0, y: 0, width: THERMAL_4X6.width, height: THERMAL_4X6.height }],
    }
  }
  if (mode === 'thermal-6x4') {
    return {
      pageWidth: THERMAL_6X4.width,
      pageHeight: THERMAL_6X4.height,
      perPage: 1,
      cells: [{ x: 0, y: 0, width: THERMAL_6X4.width, height: THERMAL_6X4.height }],
    }
  }
  if (mode === 'a4-4up') {
    const halfW = A4.width / 2
    const halfH = A4.height / 2
    return {
      pageWidth: A4.width,
      pageHeight: A4.height,
      perPage: 4,
      cells: [
        { x: 0, y: halfH, width: halfW, height: halfH },
        { x: halfW, y: halfH, width: halfW, height: halfH },
        { x: 0, y: 0, width: halfW, height: halfH },
        { x: halfW, y: 0, width: halfW, height: halfH },
      ],
    }
  }
  // 'crop': keep the label at its own size, no scaling and no letterboxing.
  return {
    pageWidth: labelW,
    pageHeight: labelH,
    perPage: 1,
    cells: [{ x: 0, y: 0, width: labelW, height: labelH }],
  }
}

/**
 * Anchor for `drawPage`, given where the content should end up on the page.
 *
 * `drawPage` translates to (x, y), turns about that point, then scales, so for
 * anything but an upright draw the content grows away from the anchor rather
 * than up and to the right of it. This works back from the rectangle we want
 * to fill to the anchor that produces it.
 */
function anchorFor(
  visual: { x: number; y: number; width: number; height: number },
  rotate: 0 | 90 | 180 | 270,
): PlacedLabel {
  const { x, y, width: vw, height: vh } = visual
  switch (rotate) {
    case 90:
      // Occupies x in [ax - h, ax], y in [ay, ay + w].
      return { x: x + vw, y, width: vh, height: vw, rotate }
    case 180:
      return { x: x + vw, y: y + vh, width: vw, height: vh, rotate }
    case 270:
      // Occupies x in [ax, ax + h], y in [ay - w, ay].
      return { x, y: y + vh, width: vh, height: vw, rotate }
    default:
      return { x, y, width: vw, height: vh, rotate: 0 }
  }
}

const QUARTER: (0 | 90 | 180 | 270)[] = [0, 90, 180, 270]

/**
 * Fits one label into one cell, taking the quarter turn that fills the space
 * better — a Meesho label is landscape and a 4x6 roll is portrait, so the
 * thermal modes almost always turn it.
 *
 * `sourceRotation` is the /Rotate already on the source page. The embedded
 * form carries file-space content, so that turn has to be composed in here or
 * a rotated source would come out sideways.
 */
export function placeInCell(
  cell: { x: number; y: number; width: number; height: number },
  boxW: number,
  boxH: number,
  pad = 0,
  sourceRotation = 0,
): PlacedLabel {
  const base = (((sourceRotation % 360) + 360) % 360 / 90) | 0

  // What the label looks like once the source rotation is applied.
  const upright = base % 2 === 0
  const labelW = upright ? boxW : boxH
  const labelH = upright ? boxH : boxW

  const availW = Math.max(1, cell.width - pad * 2)
  const availH = Math.max(1, cell.height - pad * 2)

  const straight = Math.min(availW / labelW, availH / labelH)
  const turned = Math.min(availW / labelH, availH / labelW)
  const turn = turned > straight

  const scale = turn ? turned : straight
  const vw = (turn ? labelH : labelW) * scale
  const vh = (turn ? labelW : labelH) * scale

  const visual = {
    x: cell.x + pad + (availW - vw) / 2,
    y: cell.y + pad + (availH - vh) / 2,
    width: vw,
    height: vh,
  }

  /*
   * The source turn is subtracted, not added: /Rotate turns the page clockwise
   * on screen, while drawPage's angle is counter-clockwise. Adding it lands a
   * rotated source 180 degrees away from an unrotated one.
   */
  return anchorFor(visual, QUARTER[(4 - base + (turn ? 1 : 0)) % 4])
}
