import type { ToolFaq } from '@/config/tools'

/** Site-wide questions. Tool-specific ones live on the tool in the registry. */
export const siteFaqs: ToolFaq[] = [
  {
    question: 'What is SupplierTools?',
    answer:
      'SupplierTools is a small collection of free web tools for people who sell on Indian marketplaces like Meesho. Each tool does one boring job well, such as sorting a shipping label PDF so that identical products end up next to each other in the print pile.',
  },
  {
    question: 'Is it free? What is the catch?',
    answer:
      'The tools listed today are free, with no sign-up, no page limit and no watermark. There is no catch. They cost me almost nothing to run because there is no server: your browser does all the work. If I ever build a heavier tool that genuinely costs money to operate, it will be clearly marked as paid and the free tools will stay free.',
  },
  {
    question: 'Do you see my orders, customer names or addresses?',
    answer:
      'No. There is no server and no database. Your PDF is opened, read and rewritten inside your own browser tab. Nothing is uploaded, nothing is logged, and no account is created. After the page has loaded once you can even switch off your internet and the tools keep working.',
  },
  {
    question: 'Where is my saved data kept?',
    answer:
      'Your shop names, SKU mapping and settings are stored in your browser using localStorage. They stay on that one device and that one browser. Clearing your browser data removes them, and you can export a backup from the settings screen.',
  },
  {
    question: 'Do I need to install anything?',
    answer:
      'No. Open the site in Chrome, Safari, Edge or Firefox on a phone or a laptop and start using it. You can add it to your home screen if you want it to feel like an app.',
  },
  {
    question: 'Can I see the code?',
    answer:
      'Yes. The whole site and every tool are open source on GitHub. If you do not want to take my word for the privacy claims, read the code or run it yourself.',
  },
  {
    question: 'Can you build a tool for my workflow?',
    answer:
      'Quite possibly. Message me on WhatsApp at +91 99887 44669 with what you are doing by hand every day. If it is a common problem I will build it and put it here for free.',
  },
  {
    question: 'Which marketplaces do you support?',
    answer:
      'Meesho today. Flipkart and Amazon tools are planned. Tell me which one you need most and it moves up the list.',
  },
]
