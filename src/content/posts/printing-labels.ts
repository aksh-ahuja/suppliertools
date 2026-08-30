import type { Article } from './types'

export const printingLabels: Article = {
  slug: 'printing-meesho-shipping-labels',
  title: 'Printing Meesho shipping labels: settings, paper and scan failures',
  seoTitle: 'Printing Meesho Shipping Labels: Correct Settings and Common Problems',
  excerpt:
    'A4 or thermal, what scale to print at, why barcodes stop scanning, and how many labels you can fit on a page. The practical printing guide for Meesho sellers.',
  seoDescription:
    'How to print Meesho shipping labels correctly: print scale, paper choice, A4 vs thermal, barcode scan failures and how to cut ink and paper cost.',
  publishedAt: '2026-08-24',
  readingMinutes: 6,
  category: 'Shipping',
  author: 'Akshit Ahuja',
  keywords: [
    'print meesho shipping label',
    'meesho label printing',
    'meesho label paper size',
    'thermal printer meesho',
    'barcode not scanning label',
    'meesho label a4',
  ],
  answer:
    'Print Meesho shipping labels at 100% actual size, in black and white, at normal quality or higher, with duplex off. Fit-to-page scaling shrinks the barcode slightly and is the most common cause of labels that will not scan at pickup.',
  faqs: [
    {
      question: 'What size is a Meesho shipping label?',
      answer:
        'The label PDF from the supplier panel is generated as an A4 page, with the label block occupying the upper portion and a tax invoice below it. Sellers using thermal printers commonly print to a 4x6 inch roll and let the driver handle the fit.',
    },
    {
      question: 'Can I print two Meesho labels on one A4 sheet?',
      answer:
        'You can use the multiple-pages-per-sheet option, but it scales content down, which is the main cause of barcodes failing to scan. If you want to cut paper cost, a thermal roll is the safer route than shrinking labels.',
    },
    {
      question: 'Why is my printed barcode not scanning?',
      answer:
        'Check print scale first. It must be 100% or actual size, never fit-to-page, because a few percent of shrinkage can push bar widths outside scanner tolerance. After that check toner level and confirm quality is not set to draft.',
    },
    {
      question: 'Do I need a special printer for Meesho labels?',
      answer:
        'No. Any ordinary A4 laser or inkjet printer works. A thermal label printer is a running-cost and speed upgrade once volume justifies it, not a requirement for selling or shipping on Meesho.',
    },
    {
      question: 'Should I print Meesho labels in colour?',
      answer:
        'No. Nothing on a Meesho label carries meaning in colour, and colour printing costs noticeably more per page. Black and white at normal quality scans just as reliably and keeps consumable cost down.',
    },
  ],
  html: `
<div class="tldr">
  <p>Key takeaways</p>
  <ul>
    <li>Print at 100% actual size. Fit-to-page is the most common cause of barcodes that will not scan.</li>
    <li>Black and white, normal quality. Draft mode degrades the barcode edges scanners read.</li>
    <li>A4 laser is the cheapest start. Thermal wins on running cost once you are past roughly 50 parcels a day.</li>
    <li>Do not use glossy paper. Scanners struggle with the reflection.</li>
    <li>Sort the PDF before printing, otherwise you are paying for paper in an order that makes you work harder.</li>
  </ul>
</div>

<p>Printing labels sounds like the least interesting part of dispatch, right up until a courier tells you half your barcodes will not scan and you have to reprint sixty parcels.</p>

<p>This covers the settings that matter, the paper choice, and the handful of problems that account for most reprints. It is aimed at Meesho sellers printing at home or from a small warehouse, not at anyone with a fulfilment centre.</p>

<p><strong>Scope:</strong> printing and paper only. Choosing a courier, negotiating rates and packaging materials are out of scope. Volume thresholds below are rules of thumb from small-seller practice, not measured cost models, so run your own numbers before buying hardware.</p>

<div class="toc">
  <p>On this page</p>
  <ol>
    <li><a href="#settings">The settings that actually matter</a></li>
    <li><a href="#a4-thermal">A4 laser or thermal</a></li>
    <li><a href="#paper">Paper and adhesive</a></li>
    <li><a href="#scan-failures">Why barcodes stop scanning</a></li>
    <li><a href="#cost">Cutting paper and ink cost</a></li>
  </ol>
</div>

<h2 id="settings">The settings that actually matter</h2>

<p>Four settings cause nearly all label printing problems. Set them once and save the preset.</p>

<div class="table-scroll">
<table>
  <thead>
    <tr><th>Setting</th><th>Correct value</th><th>What goes wrong otherwise</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Scale</td>
      <td>100%, actual size</td>
      <td>Fit-to-page shrinks the barcode by a few percent. It still looks fine to you and stops scanning reliably.</td>
    </tr>
    <tr>
      <td>Colour</td>
      <td>Black and white</td>
      <td>Nothing on a Meesho label needs colour, and colour cartridges are the expensive ones.</td>
    </tr>
    <tr>
      <td>Quality</td>
      <td>Normal or higher</td>
      <td>Draft mode thins and breaks the bar edges, which is exactly what a scanner reads.</td>
    </tr>
    <tr>
      <td>Duplex</td>
      <td>Off</td>
      <td>Each label is a separate page that gets torn off and stuck individually.</td>
    </tr>
  </tbody>
</table>
</div>

<p>Margins are worth one check too. Some printers apply a hardware margin that clips the page edge. Print one page and confirm nothing is cut off before you commit to a batch of eighty.</p>

<h2 id="a4-thermal">A4 laser or thermal</h2>

<p>Both work. The right answer depends almost entirely on volume.</p>

<div class="table-scroll">
<table>
  <thead>
    <tr><th></th><th>A4 laser</th><th>Thermal (4x6)</th></tr>
  </thead>
  <tbody>
    <tr><td>Upfront cost</td><td>Low, you probably own one</td><td>Higher, a dedicated device</td></tr>
    <tr><td>Running cost</td><td>Toner plus paper plus tape</td><td>Label roll only, no ink at all</td></tr>
    <tr><td>Speed per label</td><td>Slower, you cut and tape</td><td>Faster, peel and stick</td></tr>
    <tr><td>Durability</td><td>Fine, tape over it</td><td>Good, but fades in heat and sunlight</td></tr>
    <tr><td>Best at</td><td>Under roughly 50 parcels a day</td><td>Above roughly 50 parcels a day</td></tr>
  </tbody>
</table>
</div>

<p>The honest framing: thermal saves you consumable cost and cutting time, not sorting time. If your dispatch is slow because the stack is in the wrong order, a thermal printer will make you produce a badly ordered stack faster. Fix the order first, then buy the printer when volume justifies it.</p>

<h2 id="paper">Paper and adhesive</h2>

<p>For A4 printing you have three options:</p>

<ul>
  <li><strong>Plain paper plus tape.</strong> Cheapest. Cut the label out and tape all four edges so rain cannot get under it.</li>
  <li><strong>A4 self-adhesive sheets.</strong> Peel and stick, no tape. More expensive per label, noticeably faster.</li>
  <li><strong>Pre-cut A4 label sheets.</strong> Convenient, but only if the cut positions line up with where the label actually prints, which they often do not.</li>
</ul>

<p>Avoid glossy paper. The reflection interferes with scanners and the surface resists most tape.</p>

<h2 id="scan-failures">Why barcodes stop scanning</h2>

<p>In rough order of how often each one is the actual cause:</p>

<ol>
  <li><strong>Printed below 100% scale.</strong> Check this first, always.</li>
  <li><strong>Draft quality.</strong> Bars come out thin and broken.</li>
  <li><strong>Low toner.</strong> Grey bars instead of black. Faces of the page look fine to a human.</li>
  <li><strong>Tape wrinkles over the barcode.</strong> Tape flat, or tape around it rather than across it.</li>
  <li><strong>Glossy or damp paper.</strong> Reflection and bleed.</li>
  <li><strong>Something written across the label</strong> in marker.</li>
</ol>

<p>A quick test before a big batch: print one label and scan it with any free barcode-scanner app on your phone. If your phone reads it in under a second in normal light, a courier's scanner will read it too.</p>

<h2 id="cost">Cutting paper and ink cost</h2>

<p>A few things that genuinely reduce cost without risking scans:</p>

<ul>
  <li><strong>Print black and white only.</strong> Obvious, frequently missed.</li>
  <li><strong>Do not print the tax invoice section if you do not need a paper copy.</strong> Check your own compliance requirements before doing this.</li>
  <li><strong>Reuse the back of misprints</strong> for internal picking lists, never for labels.</li>
  <li><strong>Buy toner in the high-yield cartridge size.</strong> The cost per page is usually meaningfully lower.</li>
</ul>

<p>What does not help: reducing print quality. The saving is small and reprints cost far more than toner.</p>

<h2>Print a sorted stack, not a random one</h2>

<p>Printing correctly is worth doing. Printing a stack that is already grouped by product and courier is worth more. <a href="/tools/meesho-label-crop-sort/">Sort the PDF first</a>, free and in your browser, then print with the settings above.</p>
`,
}
