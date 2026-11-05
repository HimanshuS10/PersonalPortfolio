// Workshop prompts for the BTG x Google AI Studio session (GryphCafe app).
// Kept verbatim — attendees copy these straight into AI Studio.

const REVIEWS_SHEET = 'https://docs.google.com/spreadsheets/d/1EwbkeE01KoR854sb6KkLo8QvE8WuVvFfm8eb6fZr_t4';
const INVENTORY_SHEET = 'https://docs.google.com/spreadsheets/d/1bp17CLmqj0HHV0y3ObN6fOOSSSS--xoVfr0xCMEml2c';

// Files attendees need. `img` entries get a thumbnail; `links` are the buttons.
export const RESOURCES = [
  {
    name: 'GryphCafe logo',
    usedIn: 'Prompt 1',
    note: 'Attach this image to Prompt 1. It goes at the top of the sidebar.',
    img: '/btg/gryphcafe-logo.png',
    links: [{ label: 'download png', href: '/btg/gryphcafe-logo.png', download: 'gryphcafe-logo.png' }],
  },
  {
    name: 'Design reference',
    usedIn: 'Prompt 1',
    note: 'Attach this screenshot to Prompt 1 too. It is the layout and style to copy.',
    img: '/btg/design-reference.png',
    links: [{ label: 'download png', href: '/btg/design-reference.png', download: 'design-reference.png' }],
  },
  {
    name: 'Customer reviews sheet',
    usedIn: 'Prompt 1',
    note: 'Copy this link and paste it into "Connect Google Sheet" in your app. Make your own copy if you want to add reviews and watch them sync.',
    links: [
      { label: 'copy link', copy: `${REVIEWS_SHEET}/edit?gid=0#gid=0` },
      { label: 'open sheet', href: `${REVIEWS_SHEET}/edit?gid=0#gid=0` },
      { label: 'make a copy', href: `${REVIEWS_SHEET}/copy` },
    ],
  },
  {
    name: 'Inventory file',
    usedIn: 'Prompt 2',
    note: 'Download it as Excel or CSV, then use "Upload file" on the Inventory page.',
    links: [
      { label: 'download .xlsx', href: `${INVENTORY_SHEET}/export?format=xlsx` },
      { label: 'download .csv', href: `${INVENTORY_SHEET}/export?format=csv&gid=0` },
      { label: 'open sheet', href: `${INVENTORY_SHEET}/edit?usp=sharing` },
    ],
  },
];

export const PROMPTS = [
  {
    id: 'p1',
    file: 'prompt_01.txt',
    title: 'Customer Reviews',
    blurb: 'Build the app shell + the Customer Reviews page: Google Sheet sync and an AI Action Plan from Gemini.',
    text: `[ROLE]
Build a café management web app for the owner of "GryphCafe". The owner is not technical, so everything must be simple and obvious.
I've attached two images:
- The GryphCafe logo: use it at the top of the sidebar, exactly as it is, with no background colour, box or border behind it. Put the name "GryphCafe" next to it.
- A screenshot of an app: use it only as a design reference for the layout and style.

[CONTEXT]
The owner has hundreds of customer reviews and no time to read them. The owner needs to see what customers think and know what to fix this week.

[INPUT]
- The reviews are in a Google Sheet with columns: Date, Customer, Rating (1-5), Review. Row 1 is the header.
- The owner connects it by pasting the sheet link into the app. The owner adds new reviews in the Google Sheet only, and the app picks them up automatically.

[TASK]
- Sidebar with the GryphCafe logo and name at the top, then three pages in this order: "Dashboard", "Customer Reviews", "Inventory". Only build Customer Reviews now and open the app on it. The other two show "Coming soon".
- Customer Reviews page, top right: a green "Connect Google Sheet" button and an "AI Action Plan" button.
- Connect Google Sheet: a modal to paste the link, with a one-line reminder to set sharing to "Anyone with the link can view". Re-fetch the sheet every 10 seconds, with a small "Last synced: <time>" line and a Refresh icon.
- AI Action Plan: when clicked, send all current reviews to Gemini and show 3 things customers love, 3 main complaints, and 3 actions to take this week.

[OUTPUT]
- Follow the attached screenshot: white background, slim left sidebar, large page title, green primary button, thin grey borders, rounded corners, plenty of white space. Highlight the active sidebar item the way the screenshot highlights "Product".
- A table like the screenshot's, with columns: Customer, Date, Rating, Review, Status. Newest reviews first.
  - Rating: a yellow star and the number.
  - Status: a coloured pill: "Positive" (green) for 4-5 stars, "Neutral" (yellow) for 3, "Needs reply" (red) for 1-2.
- The action plan appears in a card above the table, styled like the screenshot's stat cards.

[COLOURS]
- Background: white (#FFFFFF) everywhere, including the sidebar and cards.
- Text: near-black (#1A1A1A) for headings and body text, grey (#6B7280) for small notes like "Last synced".
- Primary buttons: deep green (#00704A) with white text, slightly darker green (#005A3C) on hover.
- Secondary buttons: white with a thin grey border (#E5E7EB) and near-black text.
- Borders and dividers: light grey (#E5E7EB).
- Active sidebar item: a light green highlight (#E6F2EC) with green text (#00704A).
- Status pills keep their meaning colours: green for Positive or OK, yellow for Neutral, red for Needs reply or Low.

[CONSTRAINTS]
- Keep it minimal. Leave out everything else in the screenshot: search, Tools/Workspace, Help center, Feedback, Settings, avatars, bell, share icon, Customize Widget, Table View, Filter, Sort, Show Statistics, Export, checkboxes, bulk actions and "Add Column".
- No way to add or edit reviews in the app. The Google Sheet is the only place reviews are added.
- Never write back to the Google Sheet. It syncs one way only, into the app.
- Only run the AI when the button is clicked, never on the 10-second sync.
- If something fails, show a short error with the message and HTTP status.

[TECH RECIPE: copy as is]
- React, TypeScript, Tailwind CSS, and an Express backend (server.ts with Vite middlewares in dev: "dev": "tsx server.ts"). Gemini calls happen on the server.
- Endpoints: GET /api/sheet-data, GET /api/sheet-config, POST /api/sheet-config (accepts { url }). Keep the link in server memory.
- Convert a normal sheet link (…/d/<SHEET_ID>/edit#gid=<GID>) to …/d/<SHEET_ID>/export?format=csv&gid=<GID> (gid=0 if none). Also accept /pub?output=csv links.
- Every fetch: add &t=<now> and use fetch(url, { redirect: "follow", cache: "no-store", headers: { "Cache-Control": "no-cache, no-store", "Pragma": "no-cache" } }). On /api/sheet-data responses set Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate; Pragma: no-cache; Expires: 0; Surrogate-Control: no-store.
- RFC-4180 CSV parser: remove BOM, handle quotes, commas and line breaks inside quotes, "" to ".
- If Google returns HTML instead of CSV, return HTTP 403 telling the owner to set the sheet to "Anyone with the link can view".`,
  },
  {
    id: 'p2',
    file: 'prompt_02.txt',
    title: 'Inventory',
    blurb: 'Add the Inventory page: upload an Excel/CSV file, +/− quantities, and red "Low" pills for items that need reordering.',
    text: `[ROLE]
Add the Inventory page to the same GryphCafe app. The owner is not technical, so everything must be simple and obvious.

[CONTEXT]
The owner tracks stock in a spreadsheet and often finds out too late that something has run out. The owner needs to see what's running low at a glance and update counts quickly.

[INPUT]
- An Excel file (.xlsx) or a CSV file with columns: Item, Category, Qty_OH, Min_Lvl, Unit. Row 1 is the header. Qty_OH is the quantity on hand. Min_Lvl is the minimum level before reordering.
- The owner can also add items by hand in the app.

[TASK]
- Inventory page, top right: a green "Upload file" button and a "+ Add item" button.
- Upload file: read the file and show the items in a table. Uploading a new file replaces the current list.
- In the table, Qty_OH has a small "−" button on the left and "+" button on the right. Each click changes the quantity by 1.
- + Add item: a modal with Item, Category, Qty_OH, Min_Lvl and Unit, and an "Add to list" button. The new item appears in the table straight away.

[OUTPUT]
- Same design as the attached screenshot and the Customer Reviews page.
- A table like the screenshot's, with columns: Item, Category, Qty_OH, Min_Lvl, Unit, Status.
  - Status: a coloured pill: red "Low" if Qty_OH is at or below Min_Lvl, otherwise green "OK". It updates instantly when the quantity changes.
  - Low items are sorted to the top.
- Before any data is added, show a simple empty state: "Upload your inventory file or add an item to get started."

[COLOURS]
- Use the same colours as the Customer Reviews page:
- Background: white (#FFFFFF) everywhere, including cards and modals.
- Text: near-black (#1A1A1A), with grey (#6B7280) for small notes.
- Primary buttons: deep green (#00704A) with white text, darker green (#005A3C) on hover.
- Secondary buttons and the − / + buttons: white with a thin grey border (#E5E7EB) and near-black text.
- Borders and dividers: light grey (#E5E7EB).
- Status pills: green for OK, red for Low.

[CONSTRAINTS]
- Keep the Customer Reviews page and the sidebar exactly the same.
- Keep it minimal: no search, filters, checkboxes or extra toolbars.
- Qty_OH can't go below 0. Qty_OH and Min_Lvl must be whole numbers.
- If the file is missing columns, show a short error saying which columns are missing.

[TECH RECIPE: copy as is]
- Use the SheetJS (xlsx) library to read Excel files (first sheet only) and the same CSV parser for CSV files.
- Keep the inventory (uploaded, edited and added items) in app state and save it in local storage, so it survives switching pages and refreshing.`,
  },
  {
    id: 'p3',
    file: 'prompt_03.txt',
    title: 'Dashboard',
    blurb: 'Add the Dashboard: four stat cards, a low-stock card and this week\'s AI actions, all on one screen.',
    text: `[ROLE]
Add the Dashboard page to the same GryphCafe app. The owner is not technical, so everything must be simple and obvious.

[CONTEXT]
The owner only has a few seconds between customers. The owner needs the whole business on one screen to decide what to do today.

[INPUT]
Use the data already in the app: the reviews synced from the Google Sheet, the inventory, and the AI Action Plan if one has been generated.

[TASK]
- A row of four stat cards: Average rating, Total reviews, Reviews needing attention (rating 1-2), Low-stock items.
- Under them, two side-by-side cards:
  - "Low stock": the names of low-stock items with red "Low" pills. If there's no inventory yet, say "Upload an inventory file".
  - "This week's actions": the 3 actions from the AI Action Plan, or "Generate an AI Action Plan on the Customer Reviews page" if there isn't one yet.
- Make Dashboard the page the app opens on, since it's first in the sidebar.

[OUTPUT]
- Page title "Dashboard". Stat cards styled exactly like the screenshot's top row: label, big number, small grey note underneath.
- Highlight the low-stock card in red when any item is low.

[COLOURS]
- Use the same colours as the rest of the app:
- Background: white (#FFFFFF) everywhere, including cards.
- Text: near-black (#1A1A1A) for numbers and labels, grey (#6B7280) for the small notes under each number.
- Card borders: light grey (#E5E7EB).
- Low-stock card when an item is low: a soft red background (#FDECEC) with a red border (#E5484D).
- Pills: red for Low. Use green (#00704A) for any links or accents.

[CONSTRAINTS]
- Keep the Customer Reviews and Inventory pages and the sidebar exactly the same.
- Keep it clean: just these cards, no charts, no header buttons, no extra text.

[TECH RECIPE: copy as is]
- Read from the same app state as the other pages.
- Review numbers update with the 10-second sheet sync. Low-stock numbers update instantly when inventory changes.`,
  },
];
