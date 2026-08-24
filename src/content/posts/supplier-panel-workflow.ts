import type { Article } from './types'

export const supplierPanelWorkflow: Article = {
  slug: 'meesho-supplier-panel-dispatch-workflow',
  title: 'The Meesho supplier panel dispatch workflow, start to finish',
  seoTitle: 'Meesho Supplier Panel: The Full Dispatch Workflow, Step by Step',
  excerpt:
    'From order notification to courier handover, what each step in the Meesho supplier panel actually does, where new sellers lose time, and what to fix first.',
  seoDescription:
    'A step by step walkthrough of the Meesho supplier panel dispatch workflow: accepting orders, downloading labels, printing, packing and handover, with the common mistakes.',
  publishedAt: '2026-08-24',
  readingMinutes: 8,
  category: 'Operations',
  author: 'Akshit Ahuja',
  keywords: [
    'meesho supplier panel',
    'meesho supplier panel dispatch',
    'meesho order processing',
    'meesho ready to ship',
    'meesho seller workflow',
    'meesho label download',
  ],
  answer:
    'The Meesho supplier panel dispatch workflow runs: order received, order accepted, labels downloaded as one PDF, labels printed, items picked and packed, then handover to the courier before the pickup cut-off. Labels download as a single file covering many orders.',
  faqs: [
    {
      question: 'Where do I download shipping labels in the Meesho supplier panel?',
      answer:
        'From the orders section, once orders are ready to ship. The panel produces one PDF with a page per sub-order, typically named like Sub_Order_Labels_id.pdf. You can download labels for many orders in a single file rather than one at a time.',
    },
    {
      question: 'Can I download Meesho labels for only one product?',
      answer:
        'You can filter your selection before downloading, which some sellers use to build per-product batches. It works, but leaves you managing several small PDFs. Sorting one combined file is usually less error-prone at volume.',
    },
    {
      question: 'What is a sub-order on Meesho?',
      answer:
        'When one customer orders several different items, the order splits into sub-orders, one per item, because they may ship separately. Each sub-order gets its own label page, which is why a 40-order day can produce more than 40 label pages.',
    },
    {
      question: 'Why does my label PDF have more pages than I have orders?',
      answer:
        'Almost always sub-orders. One customer buying three different products generates three separate label pages, since each item can be picked, packed and shipped independently of the others.',
    },
    {
      question: 'What happens if I miss the pickup cut-off?',
      answer:
        'The parcel waits for the next pickup while the delivery clock keeps running, which hurts your dispatch metrics. Plan backwards from the cut-off: know your parcels-per-hour rate and set a start time with buffer.',
    },
  ],
  html: `
<div class="tldr">
  <p>Key takeaways</p>
  <ul>
    <li>The panel is built around one order at a time. Your job is to batch what it hands you one by one.</li>
    <li>Label download is the natural batching point. Everything before it is per order, everything after can be grouped.</li>
    <li>Most lost time sits between downloading the label and sealing the parcel, not inside the panel.</li>
    <li>Handover is where penalties come from. Keep courier stacks physically separate from the printer onwards.</li>
    <li>Missing the pickup cut-off is worse than packing slightly slower, so work backwards from the cut-off time.</li>
  </ul>
</div>

<p>New Meesho sellers usually learn the supplier panel by clicking through it until orders ship. That works, but it hides which steps are actually costing time and which are just clicks.</p>

<p>This walks the whole dispatch workflow in order, says what each step is really doing, and flags where small sellers lose their morning. It assumes you already have a live catalogue and are receiving orders.</p>

<p><strong>Scope:</strong> dispatch only. Catalogue upload, pricing, ads, returns processing and payment reconciliation are not covered. Panel screens change from time to time, so treat the stage names as the shape of the flow rather than exact button labels. I build the free sorting tool mentioned at stage three.</p>

<div class="toc">
  <p>On this page</p>
  <ol>
    <li><a href="#stage-1">Stage 1: the order arrives</a></li>
    <li><a href="#stage-2">Stage 2: download the labels</a></li>
    <li><a href="#stage-3">Stage 3: the gap nobody optimises</a></li>
    <li><a href="#stage-4">Stage 4: print</a></li>
    <li><a href="#stage-5">Stage 5: pick and pack</a></li>
    <li><a href="#stage-6">Stage 6: handover</a></li>
    <li><a href="#cutoff">Working backwards from the cut-off</a></li>
    <li><a href="#mistakes">Five mistakes that cost the most</a></li>
  </ol>
</div>

<h2 id="stage-1">Stage 1: the order arrives</h2>

<p>An order appears in the <a href="https://supplier.meesho.com/" target="_blank" rel="noopener noreferrer">Meesho supplier panel</a> and starts a clock. If you are still setting up, <a href="https://www.meesho.com/sell-online" target="_blank" rel="noopener noreferrer">Meesho's seller onboarding pages</a> cover registration and catalogue upload, which this guide assumes you have already done. You confirm you can fulfil it, and it moves toward ready-to-ship.</p>

<p>The thing to internalise here is that the panel is designed around one order at a time, because that is what it is tracking. Every screen, every status and every button is per order. Your entire operational job from this point is to batch what the panel hands you individually.</p>

<p>Practical rule: do not act on orders as they trickle in. Let them accumulate to a batch, then process the batch. Reacting to each notification is the single most common way to lose a morning.</p>

<h2 id="stage-2">Stage 2: download the labels</h2>

<p>When you download shipping labels, the panel produces one PDF containing a page per sub-order. That file is the real handoff point between the panel's world and yours.</p>

<p>Two things about that PDF matter:</p>

<ul>
  <li><strong>The page order is order-arrival sequence</strong>, not anything useful for picking. The same product will be scattered across the file.</li>
  <li><strong>Each page carries structured data in text</strong>: the SKU ID, size, quantity and delivery partner, plus the customer address block and a tax invoice.</li>
</ul>

<p>Because that data is text rather than a flat image, the file can be reorganised before printing. That is the leverage point, and almost nobody uses it.</p>

<h2 id="stage-3">Stage 3: the gap nobody optimises</h2>

<p>Between downloading the PDF and pressing print, there is a step most sellers do not know exists: reordering the pages so identical items sit together, and stamping a readable product name onto each one.</p>

<p>Skipping it means you do the same work later, by hand, on paper, in a worse format. Sorting forty printed pages into piles takes roughly ten to fifteen minutes. Sorting the PDF takes seconds and produces a better result, because it can also split the file per courier.</p>

<p>This is covered properly in <a href="/blog/how-to-sort-meesho-shipping-labels/">the label sorting guide</a>.</p>

<h2 id="stage-4">Stage 4: print</h2>

<p>Print settings that matter more than people expect:</p>

<div class="table-scroll">
<table>
  <thead>
    <tr><th>Setting</th><th>Use</th><th>Why</th></tr>
  </thead>
  <tbody>
    <tr><td>Scale</td><td>100%, actual size</td><td>Fit-to-page shrinks the barcode and scanners start failing at pickup.</td></tr>
    <tr><td>Colour</td><td>Black and white</td><td>Nothing on the label needs colour. Saves ink on high volume.</td></tr>
    <tr><td>Duplex</td><td>Off</td><td>Each label is one page and gets torn or stuck individually.</td></tr>
    <tr><td>Quality</td><td>Normal, not draft</td><td>Draft mode degrades barcode edges, which is what scanners read.</td></tr>
  </tbody>
</table>
</div>

<p>If a courier ever tells you a barcode will not scan, check scale first. It is the cause far more often than the printer.</p>

<h2 id="stage-5">Stage 5: pick and pack</h2>

<p>With a sorted stack, work one product at a time. Pull the full run for a product in a single shelf trip, lay the labels out, pack the batch, then move on.</p>

<p>Two checks worth building into the motion:</p>

<ul>
  <li><strong>Quantity before sealing.</strong> Multi-quantity orders are where shortfalls happen, and reopening a sealed bag is slow.</li>
  <li><strong>Size against the label, not against memory.</strong> M and L feel similar in the hand at speed.</li>
</ul>

<h2 id="stage-6">Stage 6: handover</h2>

<p>Handover is where penalties come from, and it is almost entirely a physical-organisation problem rather than a systems problem.</p>

<p>If you ship with more than one delivery partner, the two stacks should never have shared a pile. Producing a separate PDF per courier at stage 3 means they were separate from the printer onwards, and a parcel physically cannot end up in the wrong handover.</p>

<p>Keep the courier's manifest or scan confirmation. When something goes missing weeks later, that record is the whole argument.</p>

<h2 id="cutoff">Working backwards from the cut-off</h2>

<p>Every pickup has a cut-off time. Missing it costs more than packing slowly, because the parcel sits an extra day and the delivery clock keeps running.</p>

<p>Plan backwards instead of forwards. If pickup is at 4pm and you can pack roughly 40 parcels an hour, then 80 orders means you start at 2pm at the latest, with 30 minutes of buffer for the things that always go wrong. Write the start time on a whiteboard, not in your head.</p>

<h2 id="mistakes">Five mistakes that cost the most</h2>

<ol>
  <li><strong>Processing orders as they arrive.</strong> Batch them. Every context switch has a cost.</li>
  <li><strong>Printing before sorting.</strong> Once it is paper, sorting is manual forever.</li>
  <li><strong>Mixing couriers in one pile.</strong> Separate at the file level, not at the table.</li>
  <li><strong>Handling returns mid-dispatch.</strong> They break rhythm and they are never urgent enough to justify it.</li>
  <li><strong>Fit-to-page printing.</strong> Silently shrinks barcodes and creates scan failures you will blame on the courier.</li>
</ol>

<h2>The one change to make first</h2>

<p>If you take one thing from this: the gap at stage 3 is where the free time is. <a href="/tools/meesho-label-sorter/">Sort the label PDF</a> before you print it. Free, no account, runs in your browser.</p>
`,
}
