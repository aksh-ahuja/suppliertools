/**
 * PDF pages can carry a /Rotate value, which means the coordinates in the file
 * are not the coordinates a human sees. `viewMap` converts between the two so
 * parsing and stamping both work in "what the reader sees" space.
 */
export interface ViewMap {
  /** Visual width and height. */
  W: number
  H: number
  /** File space to view space. */
  to: (x: number, y: number) => [number, number]
  /** View space back to file space. */
  back: (vx: number, vy: number) => [number, number]
  /** Rotation to apply when drawing, in degrees. */
  rotation: number
}

export function viewMap(rotate: number, width: number, height: number): ViewMap {
  const rot = ((rotate % 360) + 360) % 360

  if (rot === 90) {
    return {
      W: height,
      H: width,
      to: (x, y) => [y, width - x],
      back: (vx, vy) => [width - vy, vx],
      rotation: 90,
    }
  }
  if (rot === 180) {
    return {
      W: width,
      H: height,
      to: (x, y) => [width - x, height - y],
      back: (vx, vy) => [width - vx, height - vy],
      rotation: 180,
    }
  }
  if (rot === 270) {
    return {
      W: height,
      H: width,
      to: (x, y) => [height - y, x],
      back: (vx, vy) => [vy, height - vx],
      rotation: 270,
    }
  }
  return {
    W: width,
    H: height,
    to: (x, y) => [x, y],
    back: (vx, vy) => [vx, vy],
    rotation: 0,
  }
}
