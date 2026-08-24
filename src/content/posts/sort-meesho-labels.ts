import type { LocalPost } from './types'

export const sortMeeshoLabels: LocalPost = {
  slug: 'how-to-sort-meesho-shipping-labels',
  title: 'How to sort Meesho shipping labels by product, size and courier',
  excerpt:
    'Meesho hands you labels in order-arrival sequence. Here is how to get them grouped by product and size instead, so packing stops being a sorting exercise.',
  publishedAt: '2026-08-24',
  readingMinutes: 6,
  category: 'Shipping',
  author: 'Akshit Ahuja',
  keywords: [
    'sort meesho labels',
    'meesho label sorting',
    'meesho shipping label pdf',
    'meesho packing process',
  ],
  html: `
<p>If you ship more than about twenty Meesho orders a day, you already know the problem. You download the label PDF from the supplier panel, print it, and end up with a stack where page one is a black kurti in L, page two is a blue shirt in XL, and page three is that same black kurti again.</p>

<p>So you sit and sort. You make piles on the floor, you fetch the black kurtis, you pack them, then you go back to the shelf for the shirts. On a forty-order morning that is fifteen minutes of pure overhead, and it is also where most wrong-item dispatches come from.</p>

<h2>Why the pages come out in that order</h2>

<p>The supplier panel generates labels in the order the orders were placed. It has no idea what your shelves look like, which products live next to each other, or that picking ten identical items in one trip is far faster than ten separate trips. It is not a bug, it is just that the panel is solving a different problem than you are.</p>

<h2>The manual method, and why it stops working</h2>

<p>Most sellers start by sorting the printed pages by hand. That is fine at ten orders a day. At fifty it eats your morning, and at a hundred it becomes the single slowest part of dispatch. Some sellers try to fix it upstream by downloading labels in small batches filtered by product, but the panel does not really support that cleanly and you end up with a dozen small PDFs to manage.</p>

<h2>Sorting the PDF instead of the paper</h2>

<p>The better answer is to reorder the pages before you print. Every Meesho label page carries the information you need in its own text layer:</p>

<ul>
  <li>the SKU ID of the item</li>
  <li>the size</li>
  <li>the quantity</li>
  <li>the delivery partner, printed large at the top right</li>
</ul>

<p>A tool can read those four values off each page and rebuild the PDF with the pages grouped. Ten of the same product in the same size come out as ten pages in a row. Print that, and your pile is already sorted before it leaves the printer.</p>

<h3>Which order to sort in</h3>

<p>The field you sort by first makes the biggest piles, so the choice matters:</p>

<ul>
  <li><strong>Delivery partner first</strong> is what most sellers want. Each courier's parcels stay together, which means nothing gets handed to the wrong pickup. Inside each courier pile you then get product, then size.</li>
  <li><strong>Product first</strong> makes sense if one person picks and a different person hands over. You do the shelf trip once per product, and the courier separation happens at the end.</li>
</ul>

<p>There is no universally right answer. It depends on whether your bottleneck is picking or handover.</p>

<h2>Printing the product name on the label</h2>

<p>Sorting solves half the problem. The other half is that the label says <code>2pc_COMB0_LEGEND</code> where a human needs to read <strong>LEGEND COMBO BLACK</strong>. Nobody memorises SKU IDs, and at 6am nobody wants to.</p>

<p>Because a Meesho label leaves blank space below the invoice block, you can print the product name, size and quantity there in large type without covering the barcode, the address or the tax invoice. That one change removes most of the "which packet is this" questions from your packing table.</p>

<h2>Splitting into one file per courier</h2>

<p>If you work with more than one delivery partner, a single sorted PDF still needs a physical split at handover. Producing one PDF per courier instead means the Valmo stack and the Delhivery stack are printed separately and physically cannot get mixed.</p>

<h2>Do it in your browser, not on someone's server</h2>

<p>One warning before you paste your label PDF into the first free tool you find. A shipping label contains your customer's full name, address and phone number. A lot of free "PDF sorter" sites upload your file to a server to process it, which means you have just handed a stranger a list of your customers.</p>

<p>Look for a tool that does the work inside the browser. A simple test: load the page, turn off your Wi-Fi, then try to sort a file. If it still works, nothing is being uploaded, because nothing could be.</p>

<h2>A workflow that takes two minutes</h2>

<ol>
  <li>Download the label PDF from the Meesho supplier panel as usual.</li>
  <li>Open it in a sorting tool and let it read the SKU IDs.</li>
  <li>The first time, give each SKU ID a product name you actually use. Save it once.</li>
  <li>Check the summary table: sets, products, sizes, page counts.</li>
  <li>Download the sorted PDF and print.</li>
</ol>

<p>From the second file onwards, steps three disappears entirely. It becomes download, drop, print.</p>

<p><a href="/tools/meesho-label-sorter/">The Meesho Label Sorter</a> on this site does exactly this, free, with nothing uploaded anywhere.</p>
`,
}
