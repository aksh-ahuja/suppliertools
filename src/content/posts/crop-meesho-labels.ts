import type { Article } from './types'

export const cropMeeshoLabels: Article = {
  slug: 'how-to-crop-meesho-shipping-labels',
  title: 'How to crop Meesho shipping labels for a 4x6 thermal printer',
  seoTitle: 'How to Crop Meesho Shipping Labels for 4x6 Thermal (Free, No Sign-up)',
  excerpt:
    'Meesho puts the shipping label and the tax invoice on one A4 page. Here is how to cut the invoice away for a thermal roll, why most crop tools leave a black bar on the label, and how to check whether your cropped file still carries your GSTIN.',
  seoDescription:
    'Crop the tax invoice off a Meesho shipping label PDF for a 4x6 thermal roll or four per A4 sheet. Free browser method, plus how to check the invoice is really gone.',
  publishedAt: '2026-08-30',
  readingMinutes: 8,
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
<p>A Meesho shipping label PDF is not really a label file. Every page is A4, with
the shipping label on the top half and the tax invoice underneath it. If you
print that as-is you get a stack of A4 sheets where three quarters of each page
is either invoice or white space, and you cut them by hand afterwards.</p>

<p>What most sellers want instead is one of two things: a label sized for a
4&times;6 thermal roll, or four labels arranged on a single A4 sheet. Both mean
cutting the tax invoice off first. That is what "cropping" means here.</p>

<h2>The quick version</h2>

<ol>
<li>Download the shipping label PDF from your Meesho supplier panel as usual.</li>
<li>Open a browser-based crop tool and pick the file.</li>
<li>Choose your output: 4&times;6 thermal, 6&times;4 landscape, or four per A4 sheet.</li>
<li>Download the cropped file and print it.</li>
</ol>

<p>The <a href="/tools/meesho-label-crop-sort/">Meesho Label Crop &amp; Sort tool</a>
on this site does exactly that, free, with no account, and without uploading your
file anywhere. It also groups identical products together in the same pass, which
is the other half of the packing problem.</p>

<h2>Why cropped labels often come out with a black bar</h2>

<p>This is the most common complaint about crop tools, and the cause is
straightforward once you look at the file.</p>

<p>Most tools cut at a fixed distance down the page. That works if the invoice
always starts in the same place. It does not. Checking a real 152 page export
from one seller's panel, the top of the <code>TAX INVOICE</code> band appeared at
five different positions depending on which courier the label was for:</p>

<table>
<thead><tr><th>Delivery partner</th><th>Where the invoice band starts</th></tr></thead>
<tbody>
<tr><td>Delhivery</td><td>491.3 and 496.5 pt</td></tr>
<tr><td>Valmo</td><td>496.9 and 523.9 pt</td></tr>
<tr><td>Shadowfax</td><td>508.8 pt</td></tr>
</tbody>
</table>

<p>That is a spread of about 33 points, or 12 millimetres, between the highest and
lowest. A single fixed cut cannot be right for all of them. Set it low enough to
be safe for Delhivery and it leaves the top of the band showing on Shadowfax
labels, which is the black strip you end up printing. Set it high enough to clear
Shadowfax and you start eating into the product details row on the others.</p>

<p>The fix is not a better constant. It is to read each page, find where the band
actually begins, and cut just above it. Then the courier mix in your file stops
mattering.</p>

<h2>Check whether the invoice is actually gone</h2>

<p>There are two ways to make an invoice disappear from a PDF, and they are not
equally good.</p>

<p>The first is to shrink the page box so the viewer only draws the top portion.
This looks correct on screen. The invoice text is still sitting in the file, and
anything that reads the PDF rather than renders it can still pull out your GSTIN,
the buyer's billing address and your taxable value. That file then goes to
whoever packs your orders and whoever picks them up.</p>

<p>The second is to re-draw the label into a new page so the invoice is not part
of the content at all. That is a real removal.</p>

<p>You can tell which one you got in about ten seconds. Open your cropped file in
any PDF reader, press Ctrl+F or Cmd+F, and search for <code>GSTIN</code>. If it
finds something, the invoice is still in the file and only hidden. Search for
<code>HSN</code> or <code>Taxable</code> as a second check.</p>

<h2>Thermal roll or A4</h2>

<p>If you have a thermal printer, 4&times;6 inches is the standard label and the
one to ask for. Worth verifying: a shortcut some tools take is to keep the full
A4 width and trim only the height, which gives a page around 8.3&times;5.1 inches.
That is not a 4&times;6, and on a thermal roll it will either scale down and waste
half the label or refuse to fit.</p>

<p>If you print on A4, four labels two-by-two on a sheet is the best use of paper.
You cut the sheet into quarters once, rather than trimming each page individually.</p>

<h2>Do the sorting at the same time</h2>

<p>Cropping decides what each page looks like. Sorting decides what order they
come in. They are independent, so there is no reason to do them in two passes.</p>

<p>Meesho generates pages in the order the orders arrived, so the same product
turns up on page 1, page 9 and page 23. If you crop and sort together, the stack
that comes out of the printer is already grouped by courier and by product, and
packing becomes picking one product and working through a run of it. There is
more on the ordering side in
<a href="/blog/how-to-sort-meesho-shipping-labels/">how to sort Meesho shipping
labels</a>, and on printer settings in
<a href="/blog/printing-meesho-shipping-labels/">printing Meesho shipping
labels</a>.</p>

<h2>A note on uploading</h2>

<p>A shipping label carries your customer's full name, address and phone number.
Most free PDF tools upload your file to a server to process it, which means that
data leaves your device and lands somewhere you cannot see.</p>

<p>It does not have to work that way. A browser can open and rewrite a PDF on its
own, with no server involved. A simple test: load the tool, turn off your
internet, and try to crop a file. If it still works, nothing was being uploaded,
because there was nothing to upload to.</p>
`,
}
