# Cargo Flow

PART 1 — LOVABLE BUILD PROMPT (updated, full version)

Build a web app called "Cargo Copilot" — an AI-powered operations dashboard for small and mid-sized UAE freight forwarders and logistics companies. This is a polished product demo, not a toy — treat visual quality and interaction polish as seriously as functionality.

POSITIONING & TONE
This app is pitched as the affordable, WhatsApp-native alternative to expensive enterprise logistics software (CargoWise, SAP TM) that small UAE forwarders can't afford to run, and it goes further than tracking — it protects their cash flow, builds client trust through transparency, and connects them to their own partner network, not just their end customers. Design and copy should feel like a real, funded SaaS product — clean, modern, confident, professional — NOT like a generic admin template or a student project. Use a distinct color identity (not default blue/purple SaaS gradient), tight typography hierarchy, and purposeful whitespace. Think "Linear" or "Vercel dashboard" quality bar, not Bootstrap-admin quality bar.

LANGUAGE LAYER — CRITICAL, READ CAREFULLY
This app must be fully bilingual: English and Arabic, selectable via a persistent toggle in the top nav. This is NOT a single translated screen — it must apply consistently across every layer of the product, without exception:
- All UI labels, buttons, nav items, headers, form fields — in both languages, switching live with the toggle, no page reload required
- Arabic must render properly right-to-left (RTL layout — mirror the entire layout direction, not just flip text alignment) when Arabic is selected
- The AI-generated shipment summary (the 2-3 line plain-English summary) must generate natively in Arabic when the interface is set to Arabic — not machine-translated after the fact, prompt the LLM directly in the target language
- WhatsApp notification messages (see below) must generate in the customer's preferred language, stored per-shipment/per-customer, not tied to the operator's UI language
- The missing-document checklist labels, status badges (Booked/In Transit/etc.), and the cash-flow and cost-breakdown modules (below) must all respect the language toggle too — nothing gets left in English by default
- Numbers/currency (AED) and dates should follow appropriate regional formatting when Arabic is active
Do not treat this as one more screen to translate later — build the language layer as a first-class state (a language context/provider) that everything else reads from, so nothing is ever missed when new screens are added.

CORE CONCEPT (unchanged from original)
The app turns a raw shipment email or document into a structured, tracked, customer-notified record — automatically, in one visible pipeline. The user should be able to paste in a sample shipment email, click "Process," and watch the record populate step by step: extracted → validated → logged → summarized → notified.

PAGES / SCREENS

1. Dashboard (home)
- Grid/table of shipment cards showing: shipment ID, customer name, status badge (Booked / In Transit / Out for Delivery / Delivered / Failed), origin → destination, mode icon (air/sea/land), COD amount if applicable
- Filter/tabs by status
- A prominent "Time Saved" live counter widget — e.g. "47.5 hours saved this month" — that increments slightly as new shipments are processed
- A NEW "Cash Flow Snapshot" widget alongside it — see Cash Flow module below for full spec — showing at-a-glance runway status directly on the home screen, not buried in a separate tab
- A top "New Shipment" call-to-action button
- Language toggle (EN/AR) persistent in top nav

2. New Shipment (Ingestion)
- A large paste/textarea input for a shipment email, PLUS a file upload option for PDF documents (commercial invoice, packing list, booking confirmation)
- A "Process Shipment" button that triggers a visible, step-by-step pipeline animation: Extracting shipment data... → Validating documents... → Generating summary... → Logging shipment... Make this feel alive, not a static spinner.
- Once processed, show the extracted structured fields (shipper, consignee, cargo type, weight, origin, destination, mode, dates, COD amount) in an editable card, so the user can confirm/correct before saving
- NEW: a "Third-party cost breakdown" input section here too (see Cost Transparency module) — operator adds warehousing/customs-broker/trucking line items as they're incurred, tagged to this shipment

3. Shipment Detail View
- All extracted fields
- AI-generated 2-3 line plain-English (or Arabic) summary of the shipment
- Missing document checklist — visual checklist (commercial invoice, packing list, bill of lading/airway bill, certificate of origin) with checked/flagged states, warning banner if anything is missing
- Status update control (dropdown or stepper: Booked → In Transit → Out for Delivery → Delivered/Failed)
- WhatsApp notification log — chat-bubble style preview of messages "sent" to the customer at each status change, in the customer's set language, with interactive button options (Reschedule / Confirm / Contact Driver) shown as a realistic WhatsApp mockup
- NEW: "Partner Coordination" panel — a mini activity log showing which other parties (origin agent, customs broker, last-mile courier) have been looped in on this shipment via the shared WhatsApp-style coordination thread (see Cross-Company module), separate from the customer-facing log
- NEW: "Cost Breakdown" card — itemized list of third-party charges (warehousing, broker fee, trucking) plus your service fee, shown as a transparent line-item summary a client could be shown directly, with a toggle for "internal view" (with margin visible) vs "client view" (clean breakdown to share)
- A "Export to CSV/Sheets" button (simulate export, show a success toast)

4. Impact / Metrics Tab
- Before/after comparison cards using UAE industry benchmarks (present as illustrative assumptions, clearly labeled):
  - Redelivery rate: 18% → 11.8%
  - Support calls: -28%
  - Failed COD delivery attempts: -15 to -30%
  - Manual document processing time: -70 to -80%
- Simple bar/line chart showing "hours saved per week" trending up

5. NEW — Cash Flow Tab
This is the headline new feature — build it with real care, not as an afterthought.
- Two-column visual: "Money coming in" (unpaid client invoices, with due dates) vs. "Money going out" (upcoming carrier/broker/warehouse payments due)
- A simple forward-looking timeline (next 30/60/90 days) showing projected cash position — where the gap between receivables and payables narrows or goes negative
- A clear warning state: "You may be short by AED X around [date] based on current outstanding invoices vs. upcoming payments" — this is the single most important visual in this tab, make it impossible to miss
- Simple list view beneath: every unpaid invoice and upcoming payment, sortable by due date
- This should feel like a lightweight cash-flow forecast, not a full accounting system — clearly labeled as an estimate based on the data entered, not a guarantee

6. NEW — Route Estimator (secondary, lighter-weight)
- Simple origin → destination input
- Shows 2-3 route/mode options (air / sea / road where applicable) with rough transit-time ranges and rough cost bands, clearly labeled "Estimated — for planning purposes only, not a booked rate"
- Do NOT include customs duty calculations, required-certificate guidance, or any compliance/legal advice — keep this strictly to time and rough cost comparison, nothing that could be read as legal or customs guidance
- This is a planning aid, not a quoting or compliance tool — label it as such clearly on the screen itself

DATA MODEL (extend the original)
Shipment record: id, customer_name, customer_phone, customer_language (en/ar), shipper, consignee, cargo_type, weight, origin, destination, mode (air/sea/land), booking_date, status, cod_amount, missing_docs[], ai_summary, whatsapp_log[], cost_breakdown[] (item, amount, category: warehousing/broker/trucking/service_fee), partner_coordination_log[], created_at

Cash flow record: invoice_id/payment_id, shipment_id (linked), type (receivable/payable), party_name, amount, due_date, status (pending/paid)

AI INTEGRATION
Use an LLM call (via backend/edge function — never expose API keys client-side) to:
1. Extract structured shipment fields from pasted/uploaded unstructured text
2. Check extracted data against the required-document checklist and flag gaps
3. Generate the 2-3 line plain-English (or Arabic) shipment summary, generated natively in the selected language
4. NEW: generate the WhatsApp notification copy in the customer's set language
Prompt the LLM to always return strict JSON for extraction and flagging steps so the UI can render it reliably.

WHATSAPP NOTIFICATION (simulate, don't build live integration)
Do NOT attempt live WhatsApp Business API calls inside the builder. Simulate convincingly: when a shipment status changes, generate a realistic WhatsApp-style message bubble (sender/recipient styling, timestamp, interactive button mockups) IN THE CUSTOMER'S SET LANGUAGE, and log it in the shipment's notification history. Label clearly in code/comments as "simulated for demo — production version connects via Meta WhatsApp Cloud API." Also simulate a SEPARATE partner-coordination WhatsApp-style thread (internal, not customer-facing) for the Partner Coordination panel.

SAMPLE/SEED DATA
Pre-populate the dashboard with 8-10 realistic dummy shipments — generic UAE-flavored company names (not real companies), AED-denominated COD amounts, mix of air/sea/land, mix of statuses, and a mix of English and Arabic-preference customers so the language layer is visibly demonstrated on first load, not something the reviewer has to dig for. Include a realistic set of dummy cash-flow entries (some overdue receivables, some upcoming payables) so the Cash Flow tab shows a meaningful warning state out of the box, not an empty screen.

WHAT TO EXPLICITLY NOT BUILD
- No live email inbox/Gmail integration
- No real ERP or customs portal connections
- No live WhatsApp Business API calls
- No actual customs duty/compliance calculations in the Route Estimator — estimates only, clearly labeled
- No multi-user auth system unless there's time left over — single-user demo is fine

EXPLICIT DESIGN REQUIREMENTS
- Distinct, intentional color palette — pick one confident accent color (avoid default indigo/purple SaaS look)
- Clear typographic hierarchy, generous spacing, no cramped tables
- Status badges with clear color coding
- Subtle motion/transitions on the ingestion pipeline steps and status changes
- The Cash Flow warning state should feel visually serious (appropriate use of a warning color) without looking alarmist
- Fully responsive, but optimize primarily for desktop/demo-on-laptop viewing
- RTL layout must be a genuine mirrored layout when Arabic is active, not just right-aligned text in an LTR grid

Build this as a complete, working, click-through demo — every screen above (including the new Cash Flow tab, Route Estimator, Cost Breakdown, and Partner Coordination panel) should be reachable and functional with the seed data, in both languages, ready to demo live in a call or record as a walkthrough video. Nothing should be hollow — if a screen is listed here, it needs real interactive seed-data behavior, not a static mockup image.

UI should be great, simple to understand, not complex, different and aesthetically eye pleasing.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d80b7469-e188-42f0-8ea8-e47a08d6e79b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
