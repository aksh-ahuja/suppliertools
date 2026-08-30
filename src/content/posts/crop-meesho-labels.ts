import type { Article } from './types'

export const cropMeeshoLabels: Article = {
  slug: 'how-to-crop-meesho-shipping-labels',
  title: 'How to crop Meesho shipping labels for a 4x6 thermal printer',
  seoTitle: 'How to Crop Meesho Shipping Labels for 4x6 Thermal (Free, No Sign-up)',
  excerpt:
    'Meesho puts the shipping label and the tax invoice on one A4 page. Here is how to cut the invoice away for a thermal roll, why most crop tools leave a black bar on the label, and how to check in ten seconds whether your cropped file still carries your GSTIN.',
  seoDescription:
    'Crop the tax invoice off a Meesho shipping label PDF for a 4x6 thermal roll or four per A4 sheet. Free browser method, measured data on why crop tools leave a black bar, and a test to prove the invoice is gone.',
  publishedAt: '2026-08-30',
  readingMinutes: 9,
  category: 'Shipping',
  author: 'Akshit Ahuja',
  keywords: [
    'meesho label crop',
    'meesho label crop tool',
    'crop meesho shipping label',
    'meesho label cropper',
    'meesho label 4x6 thermal',
    'meesho label a4 4 per page',
    'crop meesho label pdf free',
  ],
  answer:
    'Cropping a Meesho shipping label means cutting the tax invoice off the bottom of each A4 page so only the label is printed. Upload the label PDF to a browser-based crop tool, choose a 4x6 thermal size or four labels per A4 sheet, and download the cropped file. Nothing needs to be uploaded to a server.',
  faqs: [
    {
      question: 'What size should a cropped Meesho label be?',
      answer:
        'A 4x6 inch label, which is 288 by 432 points, for a standard thermal roll. If you print on A4 instead, four labels arranged two by two on one sheet wastes the least paper. Check the page size of whatever a tool gives you, because some keep the full A4 width and only trim the height.',
    },
    {
      question: 'Why is there a black TAX INVOICE bar on my cropped labels?',
      answer:
        'Because the tool cut at a fixed distance down the page. The invoice band does not start at the same place on every Meesho label, so a fixed cut is too low for some couriers and leaves the top of the band behind. A tool that finds the band on each page does not have this problem.',
    },
    {
      question: 'Does cropping remove the invoice from the file, or just hide it?',
      answer:
        'It depends on the tool. Shrinking the page box hides the invoice on screen while leaving the text inside the file, so the GSTIN and billing address can still be extracted. Open your cropped file, search it for GSTIN, and if you get a hit the data is still there.',
    },
    {
      question: 'Will cropping break the barcode or the tracking number?',
      answer:
        'No, as long as the crop keeps the whole label area. The barcode, the QR code and the courier routing codes all sit above the invoice band. Only cut below them, and scanning is unaffected.',
    },
    {
      question: 'Can I crop and sort in one step?',
      answer:
        'Yes. Cropping decides what each page looks like and sorting decides what order the pages come in, so they are independent. Doing both in one pass means you print once and the stack is already grouped by courier and product.',
    },
  ],
  html: `
<div class="tldr">
  <p>Key takeaways</p>
  <ul>
    <li>A Meesho label page is A4 with the <strong>shipping label on top and the tax invoice underneath</strong>. Cropping means cutting the invoice away.</li>
    <li>For a thermal roll you want <strong>4&times;6 inches, which is exactly 288 by 432 points</strong>. For A4, four labels on a sheet wastes the least paper.</li>
    <li>The black <code>TAX INVOICE</code> bar other tools leave behind comes from cutting at a fixed offset. <strong>The invoice band starts in five different places</strong> depending on the courier.</li>
    <li>Hiding the invoice and removing it are different things. <strong>Search your cropped file for <code>GSTIN</code></strong> to find out which one you got.</li>
  </ul>
</div>

<p><strong>This guide is for Meesho sellers who print their own shipping labels</strong>, whether
to a 4&times;6 thermal roll or an ordinary A4 printer, and who want the tax invoice off the page
before it reaches the printer.</p>

<p>It covers the Meesho label format specifically. It does not cover Flipkart, Amazon or
Shopify labels, which use different layouts, and it does not cover label design or
courier-manifest handling. If you are looking for the ordering side rather than the page size,
that is a <a href="/blog/how-to-sort-meesho-shipping-labels/">separate guide on sorting Meesho
labels</a>.</p>

<h2 id="contents">What is on this page</h2>
<ul>
  <li><a href="#quick-version">The quick version</a></li>
  <li><a href="#which-size">Which output size to choose</a></li>
  <li><a href="#black-bar">Why cropped labels come out with a black bar</a></li>
  <li><a href="#method">How I measured that</a></li>
  <li><a href="#invoice-gone">Checking whether the invoice is actually gone</a></li>
  <li><a href="#sorting">Doing the sorting at the same time</a></li>
  <li><a href="#uploading">A note on uploading</a></li>
  <li><a href="#checklist">Before you print: a checklist</a></li>
</ul>

<h2 id="quick-version">The quick version</h2>

<p>A Meesho shipping label PDF is not really a label file. Every page is A4, with the shipping
label on the top half and the tax invoice underneath it. Print that as-is and you get a stack of
A4 sheets where most of each page is invoice or white space, and you cut them by hand afterwards.</p>

<ol>
<li>Download the shipping label PDF from the
<a href="https://supplier.meesho.com/" rel="nofollow noopener" target="_blank">Meesho supplier
panel</a> as you normally would.</li>
<li>Open a browser-based crop tool and pick the file.</li>
<li>Choose your output: <strong>4&times;6 thermal</strong>, 6&times;4 landscape, or
<strong>four per A4 sheet</strong>.</li>
<li>Download the cropped file and print it.</li>
</ol>

<p>The <a href="/tools/meesho-label-crop-sort/">Meesho Label Crop &amp; Sort tool</a> on this site
does this free, with no account, and without uploading your file anywhere. It also groups
identical products together in the same pass.</p>

<h2 id="which-size">Which output size to choose</h2>

<p>Pick by the printer you already own, not by what sounds better:</p>

<table>
<thead><tr><th>If you have</th><th>Choose</th><th>Why</th></tr></thead>
<tbody>
<tr><td>A thermal label printer with a 4&times;6 roll</td><td><strong>Thermal 4&times;6</strong></td><td>One label per page at 288&times;432 pt, the size the roll expects. No trimming.</td></tr>
<tr><td>A thermal printer fed landscape</td><td>Thermal 6&times;4</td><td>Same label, rotated for printers that take the roll the other way.</td></tr>
<tr><td>An ordinary A4 laser or inkjet</td><td><strong>Four per A4</strong></td><td>Four labels two-by-two on a sheet. One cut into quarters instead of trimming each page.</td></tr>
<tr><td>You only want the invoice gone</td><td>Label only</td><td>Keeps the label at its own size, invoice removed, nothing scaled.</td></tr>
</tbody>
</table>

<h2 id="black-bar">Why cropped labels come out with a black bar</h2>

<p>This is the most common complaint about crop tools, and the cause is straightforward once you
look inside the file.</p>

<p>Most tools cut at a <strong>fixed distance down the page</strong>. That works only if the
invoice always starts in the same place. It does not.</p>

<figure>
<svg viewBox="0 0 420 210" role="img" aria-labelledby="cutdiag-title cutdiag-desc" style="width:100%;height:auto;border:1px solid currentColor">
  <title id="cutdiag-title">Where the invoice band starts on a Meesho label, by courier</title>
  <desc id="cutdiag-desc">An A4 page with the shipping label on top and the tax invoice below. The boundary between them falls at 491.3 points for Delhivery, 496.9 for Valmo and 508.8 for Shadowfax, so a single fixed cut cannot be correct for all three.</desc>
  <rect x="16" y="14" width="150" height="182" fill="none" stroke="currentColor"/>
  <text x="26" y="40" font-size="11" fill="currentColor">Shipping label</text>
  <text x="26" y="56" font-size="9" fill="currentColor" opacity="0.75">address, barcode, SKU</text>
  <line x1="16" y1="120" x2="166" y2="120" stroke="currentColor" stroke-dasharray="4 3"/>
  <rect x="16" y="120" width="150" height="76" fill="currentColor" opacity="0.09"/>
  <text x="26" y="142" font-size="11" fill="currentColor">Tax invoice</text>
  <text x="26" y="158" font-size="9" fill="currentColor" opacity="0.75">GSTIN, HSN, amounts</text>
  <text x="182" y="118" font-size="10" fill="currentColor">the cut line moves:</text>
  <line x1="182" y1="128" x2="256" y2="128" stroke="currentColor"/>
  <text x="262" y="132" font-size="10" fill="currentColor">Delhivery 491.3 pt</text>
  <line x1="182" y1="148" x2="256" y2="148" stroke="currentColor"/>
  <text x="262" y="152" font-size="10" fill="currentColor">Valmo 496.9 pt</text>
  <line x1="182" y1="170" x2="256" y2="170" stroke="currentColor"/>
  <text x="262" y="174" font-size="10" fill="currentColor">Shadowfax 508.8 pt</text>
  <text x="182" y="196" font-size="9" fill="currentColor" opacity="0.75">a fixed cut is wrong for two of the three</text>
</svg>
<figcaption>Where the tax invoice band begins, measured across one 152-page export. A single
fixed cut cannot be right for every courier in the same file.</figcaption>
</figure>

<p>Checking a real 152-page export from one seller's panel, the top of the
<code>TAX INVOICE</code> band appeared at <strong>five different positions</strong> depending on
which courier the label was for:</p>

<table>
<thead><tr><th>Delivery partner</th><th>Where the invoice band starts</th><th>Pages</th></tr></thead>
<tbody>
<tr><td>Delhivery</td><td>491.3 and 496.5 pt</td><td>23</td></tr>
<tr><td>Valmo</td><td>496.9 and 523.9 pt</td><td>88</td></tr>
<tr><td>Shadowfax</td><td>508.8 pt</td><td>41</td></tr>
</tbody>
</table>

<p>PDF measures in points, 72 to the inch, so that <strong>32.6 point spread is about 12
millimetres</strong> between the highest and lowest. A single fixed cut cannot be right for all of
them. Set it low enough to be safe for Delhivery and it leaves the top of the band showing on
Shadowfax labels, which is the black strip you end up printing. Set it high enough to clear
Shadowfax and you start cutting into the product details row on the others.</p>

<p>The fix is not a better constant. It is to <strong>read each page, find where the band actually
begins, and cut just above it</strong>. Then the courier mix in your file stops mattering.</p>

<h3 id="method">How I measured that</h3>

<p>So you can judge the number rather than take it on faith:</p>

<ol>
<li>I took two real label exports from one seller's Meesho panel, 117 and 152 pages, covering
Valmo, Shadowfax and Delhivery.</li>
<li>For every page I extracted the text layer with its coordinates, found the <code>TAX
INVOICE</code> run, and recorded the y position of the band's top edge in PDF points.</li>
<li>I grouped those positions by the delivery partner printed on the same page.</li>
<li>The 117-page file was almost all one courier and showed two distinct positions. The
152-page file, with three couriers, showed five.</li>
</ol>

<p>Two pages in the 152-page file carried no tax invoice at all. Those are not in the table,
because there is no band to measure.</p>

<h3 id="limits">What this measurement does not cover</h3>

<p>It is <strong>two exports from one seller, on one date</strong>, covering three delivery
partners. It is enough to show that a fixed cut is unsafe, which is the claim being made. It is
not a survey of every Meesho seller, it does not cover couriers outside those three, and Meesho
could change the layout at any time. If your own file behaves differently, your file is the
authority, not this table.</p>

<h2 id="invoice-gone">Checking whether the invoice is actually gone</h2>

<p>There are two ways to make an invoice disappear from a PDF, and they are not equally good.</p>

<p>The first is to <strong>shrink the page box</strong> so the viewer only draws the top portion.
This looks correct on screen. The invoice text is still in the file, and anything that reads the
PDF rather than renders it can still pull out your GSTIN, the buyer's billing address and your
taxable value. That file then goes to whoever packs your orders and whoever collects them.</p>

<p>The second is to <strong>re-draw the label into a new page</strong> so the invoice is not part
of the content at all. That is a real removal.</p>

<p>You can tell which one you got in about ten seconds:</p>

<ol>
<li>Open your cropped file in any PDF reader.</li>
<li>Press <kbd>Ctrl</kbd>+<kbd>F</kbd>, or <kbd>Cmd</kbd>+<kbd>F</kbd> on a Mac.</li>
<li>Search for <code>GSTIN</code>. Then try <code>HSN</code> and <code>Taxable</code>.</li>
</ol>

<p><strong>Any hit means the invoice is still inside the file</strong> and was only hidden from
view. No hits means it was genuinely removed.</p>

<h2 id="sorting">Doing the sorting at the same time</h2>

<p>Cropping decides what each page looks like. Sorting decides what order the pages come in. They
are independent, so there is no reason to do them in two passes.</p>

<p>Meesho generates pages in the order the orders arrived, so the same product turns up on page 1,
page 9 and page 23. Crop and sort together and the stack that comes out of the printer is already
grouped by courier and by product, so packing becomes picking one product and working through a
run of it. There is more on the ordering side in
<a href="/blog/how-to-sort-meesho-shipping-labels/">how to sort Meesho shipping labels</a>, and on
printer settings in <a href="/blog/printing-meesho-shipping-labels/">printing Meesho shipping
labels</a>.</p>

<h2 id="uploading">A note on uploading</h2>

<p>A shipping label carries your customer's full name, address and phone number. Most free PDF
tools upload your file to a server to process it, which means that data leaves your device and
lands somewhere you cannot see.</p>

<p>It does not have to work that way. A browser can open and rewrite a PDF on its own, with no
server involved. A simple test: <strong>load the tool, turn off your internet, and try to crop a
file</strong>. If it still works, nothing was being uploaded, because there was nothing to upload
to.</p>

<h2 id="checklist">Before you print: a checklist</h2>

<ul>
<li>Page size is <strong>288&times;432 pt (4&times;6 in)</strong> for a thermal roll, not
8.3&times;5.1 in with the full A4 width kept.</li>
<li>No black <code>TAX INVOICE</code> strip along the bottom edge of any label.</li>
<li>Searching the file for <code>GSTIN</code> returns <strong>nothing</strong>.</li>
<li>The barcode and QR code are complete and not clipped at any edge.</li>
<li>Print at <strong>100% actual size</strong>, not fit-to-page, or the barcode may not scan.</li>
<li>Print one page first and scan it before committing the whole run.</li>
</ul>

<h2 id="wrap">So, how do you crop a Meesho label?</h2>

<p>Download the label PDF from your supplier panel, run it through a browser-based crop tool, and
pick 4&times;6 thermal or four-per-A4 depending on your printer. The part worth checking is what
you get back: <strong>the right page size, no leftover invoice bar, and no GSTIN inside the
file</strong>. Those three take under a minute to verify and they are what separates a label you
can hand to a packer from one you cannot.</p>

<p>The <a href="/tools/meesho-label-crop-sort/">Meesho Label Crop &amp; Sort tool</a> is free and
runs in your browser. If it does not handle a label your panel produced, tell me and I will look
at the file format.</p>
`,
}
