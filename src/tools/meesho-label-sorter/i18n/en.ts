export const en = {
  langName: 'English',

  // shell
  appName: 'Label Sorter',
  appSub: 'For Meesho shipping labels',
  privacyNote: 'Everything runs inside your phone or computer. No file is uploaded anywhere.',

  // common
  back: 'Back',
  next: 'Next',
  skip: 'Skip',
  done: 'Done',
  save: 'Save',
  cancel: 'Cancel',
  remove: 'Remove',
  add: 'Add',
  close: 'Close',
  change: 'Change',
  reset: 'Reset to default',
  settings: 'Settings',
  home: 'Home',

  // fields
  f_courier: 'Delivery partner',
  f_product: 'Product name',
  f_size: 'Size',
  f_qty: 'Qty',
  f_setNumber: 'Set number',
  lbl_size: 'SIZE',
  lbl_qty: 'QTY',
  lbl_set: 'SET',

  // onboarding
  ob_welcomeTitle: 'Welcome',
  ob_welcomeBody:
    'A few quick questions so the sorted PDF comes out the way you actually pack. This takes about a minute and you will not be asked again.',
  ob_start: 'Get started',
  ob_step: (n: number, total: number) => `Step ${n} of ${total}`,
  ob_shopTitle: 'What is your shop called?',
  ob_shopBody: 'Each shop keeps its own product mapping. You can add more shops later.',
  ob_shopPlaceholder: 'Shop name (example: MayaKart)',
  ob_sortTitle: 'How should the pages be sorted?',
  ob_sortBody:
    'The first one makes the biggest piles. Most sellers keep the delivery partner on top so each courier stays together.',
  ob_splitTitle: 'Do you want separate files?',
  ob_splitBody:
    'Tick nothing to get one single PDF. Tick the delivery partner to get one file per courier, ready to hand over at pickup.',
  ob_printTitle: 'What should be printed on each label?',
  ob_printBody:
    'This is added in the empty space below the label. Nothing on the original label is covered or changed.',
  ob_mapTitle: 'Do you want to name your products?',
  ob_mapBody:
    'Meesho labels only show the SKU ID. Turn this on and you can give each SKU ID a name you recognise, and group several SKU IDs under one product.',
  ob_mapOn: 'Yes, let me name my products',
  ob_mapOnHint: 'Recommended. Set it up once and every future file just works.',
  ob_mapOff: 'No, just print the SKU ID',
  ob_mapOffHint: 'Good if your SKU IDs are already readable.',
  ob_finishTitle: 'All set',
  ob_finishBody:
    'You can change any of this later from Settings. Now upload your label PDF and get it sorted.',
  ob_finish: 'Upload my labels',

  // home
  home_hi: (shop: string) => `Shop: ${shop}`,
  tile_upload: 'Sort a label PDF',
  tile_uploadSub: 'Upload, check, download',
  tile_mapping: 'Product names',
  tile_mappingSub: (products: number, skus: number) =>
    `${products} products, ${skus} SKU IDs saved`,
  tile_mappingNone: 'Not set up yet',
  tile_settings: 'Settings',
  tile_settingsSub: 'Sorting, files, printing, language',
  tile_shops: 'Shops',
  tile_shopsSub: (n: number) => `${n} saved`,
  home_unmapped: (n: number) => `${n} SKU IDs still have no product name`,

  // upload
  up_title: 'Upload label PDF',
  up_body: 'Choose the label file you downloaded from the Meesho supplier panel.',
  up_pick: 'Tap here to choose a PDF',
  up_multi: 'You can choose more than one file',
  up_opening: 'Opening file...',
  up_reading: (a: number, b: number) => `Reading page ${a} of ${b}...`,

  // review
  rv_title: 'Check before you download',
  rv_pages: (n: number) => `${n} pages`,
  rv_products: (n: number) => `${n} products`,
  rv_couriers: (n: number) => `${n} delivery partners`,
  rv_unmapped: (n: number) => `${n} without a name`,
  rv_allMapped: 'Every SKU ID matched a product name.',
  rv_missingTitle: 'Some SKU IDs have no product name',
  rv_missingBody: (skus: number, pages: number) =>
    `${skus} SKU IDs in this file have no product name, so ${pages} pages will print the SKU ID instead and sit at the end of their delivery partner pile.`,
  rv_fixNow: 'Name them now',
  rv_generate: 'Make the sorted PDF',
  rv_generating: (a: number, b: number) => `Making page ${a} of ${b}...`,
  rv_saving: 'Saving PDF...',
  rv_done: (n: number) => `Ready. ${n} pages sorted and named.`,
  rv_doneMany: (n: number, f: number) => `Ready. ${n} pages sorted into ${f} files.`,
  rv_downloadAll: 'Download all files',
  rv_again: 'Do another file',
  rv_output: 'Output',
  rv_outputOne: 'One single PDF',
  rv_outputSep: (fields: string) => `A separate file for each ${fields}`,
  rv_file: (n: number) => `File ${n}`,
  th_set: 'Set',
  th_product: 'Product',
  th_size: 'Size',
  th_qty: 'Qty',
  th_courier: 'Delivery partner',
  th_pages: 'Pages',

  // mapping
  map_title: 'Product names',
  map_body:
    'Give each product a name you recognise, then tick every SKU ID that belongs to it. One SKU ID can only belong to one product.',
  map_productPlaceholder: 'Product name (example: LEGEND BLACK)',
  map_selectSkus: 'Choose SKU IDs',
  map_selected: (n: number) => (n === 1 ? '1 SKU ID' : `${n} SKU IDs`),
  map_none: 'No SKU ID chosen yet',
  map_addMore: 'Add another product',
  map_search: 'Search SKU ID',
  map_noResults: 'No SKU ID matches that.',
  map_noUnmapped: 'Every SKU ID is already named.',
  map_unmappedCount: (n: number) => `${n} SKU IDs still need a name`,
  map_empty: 'No SKU IDs yet',
  map_emptyBody:
    'Upload a label PDF once. The tool will pick up every SKU ID by itself and they will appear here.',
  map_uploadFirst: 'Upload a PDF',
  map_deleteProduct: (name: string) => `Delete "${name}" and its SKU IDs?`,
  map_disabled: 'Product naming is switched off',
  map_disabledBody:
    'Your labels will print the raw SKU ID. Turn naming on in Settings if you would rather use your own product names.',
  map_openSettings: 'Open Settings',

  // settings
  set_title: 'Settings',
  set_language: 'Language',
  set_sorting: 'Sorting order',
  set_sortingHint: 'The first one makes the biggest piles.',
  set_split: 'Make separate files',
  set_splitHint: 'Tick nothing to get one single PDF.',
  set_print: 'Print on each label',
  set_printHint: 'Added below the label. Nothing on the original is covered.',
  set_mapping: 'Product names',
  set_mappingHint:
    'Group one or more Meesho SKU IDs under a product name of your own. Switch off to print the raw SKU ID.',
  set_mappingOn: 'Use my own product names',
  set_shops: 'Shops',
  set_shopsHint: 'Each shop keeps its own product mapping.',
  set_addShop: 'Add a shop',
  set_shopPlaceholder: 'New shop name',
  set_active: 'In use',
  set_use: 'Use',
  set_deleteShop: (name: string) => `Delete "${name}" and everything saved under it?`,
  set_data: 'Your data',
  set_dataHint:
    'Everything is stored in this browser only. Take a backup before you clear your browser data.',
  set_export: 'Download a backup',
  set_import: 'Restore from a backup',
  set_clear: 'Delete everything',
  set_clearConfirm: 'Delete all shops, product names and settings from this browser?',

  // errors
  e_notPdf: 'That file is not a PDF. Please choose the label PDF.',
  e_readFail: 'This file could not be read. Please download the label PDF again from Meesho.',
  e_noLabels: 'No Meesho label pages were found in this file.',
  e_needName: 'Please write a name.',
  e_dupeShop: 'A shop with this name already exists.',
  e_nameExists: 'That product name is already in the list.',
  e_importFail: 'That backup file could not be read.',
  e_skuTaken: (product: string) => `This SKU ID is already under "${product}".`,
  unnamed: '(no name)',

  // crop
  set_crop: 'Cut the tax invoice off',
  set_cropHint: 'Keeps only the shipping label. The invoice is removed from the file, not just hidden under a smaller page.',
  crop_off: 'Keep the full page',
  crop_crop: 'Label only',
  crop_thermal4x6: 'Thermal 4x6 (portrait)',
  crop_thermal6x4: 'Thermal 6x4 (landscape)',
  crop_a4up: '4 labels on one A4 page',
  set_cropWarn: (n: number) => `The invoice band was not found on ${n} page(s), so they were cut at an estimated position. Check those pages before printing.`,
} as const

/**
 * Widens the literal types from `en` so every translation only has to satisfy
 * "a string" or "the same function signature", not the exact English wording.
 */
export type Dict = {
  [K in keyof typeof en]: (typeof en)[K] extends (...args: infer A) => string
    ? (...args: A) => string
    : string
}
