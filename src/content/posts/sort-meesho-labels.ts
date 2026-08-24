import type { Article } from './types'

export const sortMeeshoLabels: Article = {
  slug: 'how-to-sort-meesho-shipping-labels',
  title: 'How to sort Meesho shipping labels by product, size and courier',
  seoTitle: 'How to Sort Meesho Shipping Labels by Product and Size (Free Method)',
  excerpt:
    'Meesho gives you labels in order-arrival sequence, so identical products end up scattered across the stack. Here is how to reorder the PDF before you print, and cut the sorting step out of your morning.',
  seoDescription:
    'Sort your Meesho shipping label PDF by delivery partner, product, size and quantity before you print. Free browser method, nothing uploaded, step by step.',
  publishedAt: '2026-08-24',
  readingMinutes: 7,
  category: 'Shipping',
  author: 'Akshit Ahuja',
  keywords: [
    'sort meesho labels',
    'meesho label sorting',
    'meesho shipping label pdf',
    'meesho label sorter',
    'sort shipping labels by product',
    'meesho packing process',
  ],
  answer:
    'Sorting Meesho shipping labels means reordering the label PDF before printing so identical products, sizes and couriers sit together. Meesho generates pages in order-arrival sequence, so a browser-based sorter regroups them and the printed stack comes out already sorted.',
  faqs: [
    {
      question: 'Can I sort Meesho labels without any software?',
      answer:
        'Only by hand, or by downloading many small filtered batches from the supplier panel and printing them in order. Both work at low volume. Neither scales past about twenty orders a day, because the effort grows with every order while a software approach does not.',
    },
    {
      question: 'Will sorting the PDF invalidate my labels?',
      answer:
        'No, provided the tool reorders pages rather than regenerating them. The barcode, tracking number, address block and tax invoice are all part of the original page. Reordering a PDF changes page sequence only and does not touch page content.',
    },
    {
      question: 'Can I sort labels from two different Meesho shops at once?',
      answer:
        'Keep them separate. The same SKU ID can mean different products in two catalogues, so a shared mapping prints the wrong name. Use a tool that keeps a separate product mapping per shop and switch between them.',
    },
    {
      question: 'What happens to a SKU ID I have not named yet?',
      answer:
        'A well-built tool prints the raw SKU ID on those labels and keeps them at the end of their courier pile so they are easy to spot and name later. It should never guess a name for a code it has not seen before.',
    },
    {
      question: 'In what order should Meesho labels be sorted?',
      answer:
        'Delivery partner first if courier handover is your bottleneck, product first if picking is. Inside that, sort by product then size then quantity. Sizes should follow wearing order, S then M then L then XL, not alphabetical order.',
    },
  ],
  html: `
<div class="tldr">
  <p>Key takeaways</p>
  <ul>
    <li>Meesho prints labels in the order the orders arrived, not in the order you pick stock.</li>
    <li>Sorting the PDF before printing beats sorting paper afterwards, because the pile comes off the printer already grouped.</li>
    <li>Sort by delivery partner first if handover is your bottleneck, by product first if picking is.</li>
    <li>Print the product name on the label too. A SKU ID like <code>2pc_COMB0_LEGEND</code> is unreadable at 6am.</li>
    <li>Use a tool that works inside your browser. A label carries your customer's full address, so it should not be uploaded to a stranger's server.</li>
  </ul>
</div>

<p>If you ship more than about twenty Meesho orders a day, you know the problem. You download the label PDF from the supplier panel, print it, and end up with a stack where page 1 is a black kurti in size L, page 2 is a blue shirt in XL, and page 3 is that same black kurti again.</p>

<p>So you sort. You make piles on the floor, you fetch the black kurtis, you pack them, then you walk back to the shelf for the shirts. This guide is for small Meesho sellers doing that by hand, and it covers how to reorder the PDF instead so the printer does the sorting for you.</p>

<p><strong>Scope:</strong> this covers Meesho labels only. Flipkart and Amazon use different layouts and are not addressed here, and nothing below concerns your catalogue, pricing or returns. I built the free sorting tool linked at the end of this article, so treat the recommendation accordingly. Time figures are estimates from running this workflow, not measured study data.</p>

<div class="toc">
  <p>On this page</p>
  <ol>
    <li><a href="#why-order">Why the pages come out in that order</a></li>
    <li><a href="#manual">The manual method, and where it breaks</a></li>
    <li><a href="#sort-pdf">Sorting the PDF instead of the paper</a></li>
    <li><a href="#which-order">Which field to sort by first</a></li>
    <li><a href="#product-name">Printing the product name on the label</a></li>
    <li><a href="#split">Splitting into one file per courier</a></li>
    <li><a href="#privacy">Why it matters that this runs in your browser</a></li>
    <li><a href="#workflow">The two-minute workflow</a></li>
  </ol>
</div>

<h2 id="why-order">Why the pages come out in that order</h2>

<p>The <a href="https://supplier.meesho.com/" target="_blank" rel="noopener noreferrer">Meesho supplier panel</a> generates labels in the sequence the orders were placed. It has no idea what your shelves look like, which products sit next to each other, or that picking ten identical items in one trip is faster than ten separate trips.</p>

<p>That is not a bug. The panel is solving a different problem than you are. It is producing a document per order; you are trying to minimise walking.</p>

<h2 id="manual">The manual method, and where it breaks</h2>

<p>Most sellers start by sorting the printed pages by hand. At ten orders a day that is fine. At fifty it eats your morning. At a hundred it becomes the single slowest part of dispatch, and it is where most wrong-item shipments come from, because sorting and picking blur into one tired motion.</p>

<p>Some sellers try to fix it upstream by downloading labels in small filtered batches, one product at a time. That works, but the panel is not really built for it and you end up managing a dozen small PDFs, which introduces its own mistakes.</p>

<h2 id="sort-pdf">Sorting the PDF instead of the paper</h2>

<p>The better answer is to reorder the pages before they reach the printer. Every Meesho label page carries what you need in its own text layer:</p>

<ul>
  <li>the <strong>SKU ID</strong> of the item</li>
  <li>the <strong>size</strong></li>
  <li>the <strong>quantity</strong></li>
  <li>the <strong>delivery partner</strong>, printed large in the top right</li>
</ul>

<p>Software can read those four values off each page and rebuild the PDF with the pages grouped. Ten of the same product in the same size come out as ten pages in a row. Print that and your pile is sorted before you touch it.</p>

<figure>
  <div class="stack-demo">
    <div class="before">
      <h4>What the panel gives you</h4>
      <ul>
        <li class="p1"><span></span>LEGEND COMBO BLACK<span>M</span></li>
        <li class="p2"><span></span>WHITE TEE<span>XL</span></li>
        <li class="p3"><span></span>LION PRINT RED<span>L</span></li>
        <li class="p1"><span></span>LEGEND COMBO BLACK<span>L</span></li>
        <li class="p2"><span></span>WHITE TEE<span>M</span></li>
        <li class="p1"><span></span>LEGEND COMBO BLACK<span>M</span></li>
      </ul>
    </div>
    <div class="after">
      <h4>What you get back</h4>
      <ul>
        <li class="p1"><span></span>LEGEND COMBO BLACK<span>M</span></li>
        <li class="p1"><span></span>LEGEND COMBO BLACK<span>M</span></li>
        <li class="p1"><span></span>LEGEND COMBO BLACK<span>L</span></li>
      </ul>
      <p class="set">Set 1</p>
      <ul>
        <li class="p2"><span></span>WHITE TEE<span>M</span></li>
        <li class="p2"><span></span>WHITE TEE<span>XL</span></li>
      </ul>
      <p class="set">Set 2</p>
      <ul>
        <li class="p3"><span></span>LION PRINT RED<span>L</span></li>
      </ul>
      <p class="set">Set 3</p>
    </div>
  </div>
  <figcaption>Six label pages before and after sorting. Same pages, same barcodes, different order. Sizes run in wearing order inside each product, so M comes before L.</figcaption>
</figure>

<p>Nothing on the label itself needs to change. Pages get reordered, not redrawn, so the barcode, the address block and the tax invoice stay exactly as Meesho produced them.</p>

<h2 id="which-order">Which field to sort by first</h2>

<p>The field you sort by first makes the biggest piles, so this choice matters more than the rest.</p>

<div class="table-scroll">
<table>
  <thead>
    <tr><th>Sort first by</th><th>Best when</th><th>What you get</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Delivery partner</td>
      <td>You hand over to two or more couriers and mix-ups at pickup are the risk</td>
      <td>Each courier's parcels stay together. Inside each courier pile you then get product, then size.</td>
    </tr>
    <tr>
      <td>Product</td>
      <td>One person picks and a different person hands over</td>
      <td>One shelf trip per product. Courier separation happens at the end instead.</td>
    </tr>
    <tr>
      <td>Size</td>
      <td>You sell one or two designs in many sizes</td>
      <td>All the M parcels together, then L, then XL, regardless of design.</td>
    </tr>
  </tbody>
</table>
</div>

<p>There is no universally right answer. It depends on whether your bottleneck is picking or handover. Most sellers running more than one courier put the delivery partner on top.</p>

<p>One detail worth checking in whatever tool you use: sizes should sort in wearing order, S then M then L then XL, not alphabetically. Alphabetical gives you L, M, S, XL, which is useless on a packing table.</p>

<h2 id="product-name">Printing the product name on the label</h2>

<p>Sorting solves half the problem. The other half is that the label says <code>2pc_COMB0_LEGEND</code> where a human needs to read <strong>LEGEND COMBO BLACK</strong>. Nobody memorises SKU IDs, and nobody wants to try at six in the morning.</p>

<p>A Meesho label leaves blank space below the tax invoice block. You can print the product name, size and quantity there in large type without covering the barcode, the address or the invoice. That one change removes most of the "which packet is this" questions from the packing table, and it is the difference between a process only you can run and one you can hand to someone else.</p>

<p>To make that work, the tool needs to know what you call each SKU. That mapping is a one-time setup. If you want the detail on why one product often has three or four different SKU IDs, that is covered in <a href="/blog/meesho-sku-id-explained/">the SKU ID guide</a>.</p>

<h2 id="split">Splitting into one file per courier</h2>

<p>If you work with more than one delivery partner, a single sorted PDF still needs a physical split at handover. Producing one PDF per courier instead means the Valmo stack and the Delhivery stack print separately and cannot get mixed, because they were never in the same pile.</p>

<p>The same idea works per product if you have staff picking in parallel: one file each, one shelf each, no coordination needed.</p>

<h2 id="privacy">Why it matters that this runs in your browser</h2>

<p>One warning before you paste your label PDF into the first free tool a search turns up. A shipping label contains your customer's full name, delivery address and phone number. Many free "PDF sorter" sites upload your file to their server to process it, which means you have just handed a stranger a list of your customers along with where they live.</p>

<p>Look for a tool that does the work inside the browser. There is a simple test anyone can run:</p>

<ol>
  <li>Load the page.</li>
  <li>Turn off Wi-Fi and mobile data.</li>
  <li>Try to sort a file.</li>
</ol>

<p>If it still works, nothing is being uploaded, because nothing could be. If it stops working, your file was going somewhere. Browser-based PDF work is well-established technology: <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer">pdf.js</a>, the library Firefox uses to display PDFs, is open source and runs entirely on your device, and <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer">pdf-lib</a> can create and modify PDFs in the browser without any server. Between them, everything described in this article can happen on your own machine.</p>

<h2 id="workflow">The two-minute workflow</h2>

<p>Here is the checklist, start to finish:</p>

<ol>
  <li><strong>Download</strong> the label PDF from the Meesho supplier panel the way you already do.</li>
  <li><strong>Open</strong> it in a sorting tool and let it read the SKU IDs off the pages.</li>
  <li><strong>Name your products once.</strong> Give each SKU ID the name you actually use. Save it.</li>
  <li><strong>Check the summary:</strong> sets, products, sizes, page counts. This is your chance to catch a label the parser read oddly.</li>
  <li><strong>Download and print.</strong></li>
</ol>

<p>Step 3 disappears from the second file onwards, because the mapping is saved. After the first run it is download, drop, print.</p>

<h2>Where to start</h2>

<p>If you want this done for you, the <a href="/tools/meesho-label-sorter/">Meesho Label Sorter</a> on this site does all of the above. It is free, needs no account, and runs entirely in your browser, so your customers' addresses never leave your device.</p>
`,
}
