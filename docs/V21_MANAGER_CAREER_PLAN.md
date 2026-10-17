# Boss v21.4 — Manager authority, succession and corporate hierarchy

Status: v21.4a budget and successor prototype is under PR #28; no merge or production claim without CI. Actual multi-layer reorganization (v21.4b) remains planned.

## Player experience

The CEO selects a **90-day manager authority** preset or Custom on each operating unit. Presets are **ceilings, not bank transfers**. The GM can exercise bounded coaching, skill/succession training, and team-health work, each with real company cash/expense postings and separately attributed unit analytical costs. Recruiting still requires an explicit CEO approval, real hiring expenses and recurring payroll. Applying an authority template must be one atomic, verified save; changing one character must never cause a state mutation, keyboard dismissal or element reconstruction.

Preset table:

| Spending envelope | Fresh manager | Manager (+25%) | Senior manager (+25%) |
| --- | ---: | ---: | ---: |
| Coaching | $24 | $30 | $38 |
| Successor training | $24 | $30 | $38 |
| Team development | $12 | $15 | $19 |
| Per-decision authorization | $8 | $10 | $13 |
| Staffing target (incl. GM) | 5 | 5 | 5 |

The 5-person target is an adjustable **maximum managed unit headcount**, NOT a promise of five hires. Custom can set 1–25, but there is no auto-hiring. Hiring must still come from actual backlog and CEO approval. A newly appointed GM receives a preselected Fresh manager recommendation **without enabling spending** until the CEO accepts it; this preserves the zero-default-spending invariant of existing saved games.

## Career ladder — clear line versus grade

- Individual contributor: Associate → Senior Specialist → Principal / Expert (merit and experience, no mandatory management).
- Team Lead: leads roughly 3 specialists; maintains a named successor, coaching and safe delivery.
- Manager: coordinates at most five team leads; owns a budget envelope, quality, resourcing, recruiting proposals and delivery results.
- Senior Manager: develops managers and coordinates multiple teams and specialties; requires repeated successful performance reviews and ready successors.
- Director: manages 3+ qualified managers/senior managers and substantial operating scope; must sustain profit, talent succession and quality.
- General Manager: business-unit P&L and strategy appointment, independent of employee grade. GM may be any appropriately qualified leadership grade, but GM authority and staff ownership must never be duplicated across units.
- Group CEO: capital allocation, strategy and appointment approvals.

### Auto development, approval gates and costs

1. At appointment, show a recommended authority envelope. CEO explicitly applies it before any costs may occur. Management authority is separate from career title.
2. Identify the best eligible successor by management competency and current primary unit. GM may fund training ($8 no more than once every 14 days) if authority unexpired, category budget and per-action cap permit, and the company has cash.
3. A stressed team may receive a $6 session no more than once every 30 days when sufficient team authority and cash remain. These are real expenses; no made-up salary or historical unit gains.
4. Track training sessions, real review results, staff headcount, manager skills, role skills and capacity. Display next leadership milestone and missing qualifications.
5. When more than five direct reports require layering, propose creating a Team Lead overseeing three unique employee IDs. This must be a **real reporting-line change** and CEO-approved recurring wage change. Do not count the same employee twice.
6. After a manager has up to five effective team leads with successors and sustained KPI results, assess Senior Manager promotion. Senior Manager → Director requires at least three effective manager-level reports and proven profitable growth, not headcount alone.
7. Talent promotion, payroll and new management authority must be one committed transaction with rollback on failed storage. The Executive Assistant should surface eligible, blocked and at-risk transitions and explain costs.

**Important:** In v21.4a only successor identification/coaching, visual path and budget control are implemented. Team Lead promotion, real subordinate manager IDs, cascading budgets, and automatic restructure are the v21.4b implementation gate; no fake reporting lines or titles before then.

## Four corporate functions and shared services

- Corporate Commercial: **Sales** (demand, conversion, negotiation, customers) and **Marketing** (research, campaigns, brand, pipeline).
- Corporate Delivery: **Product** (R&D, quality, product/program management) and **Operations** (delivery, efficiency, capacity).
- Each function has a direct manager and succession plan once scale requires it; Directors lead the parent departments and coach the functional leaders.
- Separate operating-unit GMs retain strategy, risk and unit performance accountability. Central departments may support units only through **explicit time-boxed shared resource allocation** recorded against the same employee ID, with a bounded work-day allowance and a single corporate payroll transaction. For now automatic dispatch retains strict unit ownership; never silently borrow specialists.
- Units should have different skill demand, pipeline, investment and quality consequences in later increments, not guaranteed passive income.

## Mandatory QA gates

- Test an active native Safari / Chromium dropdown and six-digit numeric draft across several simulation updates, change/blur, value retention and explicit Apply.
- Enforce zero active spending for all imported v19–v21.3 saves, including new manager appointments before approved presets.
- Prove exact +/-25% presets, Custom, valid and invalid partial edits, persisted values through IndexedDB fallback and reload.
- Verify $4 coaching, $8 successor training, $6 team development using real cash and the single corporate ledger once, cooldown and authority expiry.
- Prove unique successor/worker IDs and single ownership; 730-day simulations; 390/414px viewport; prevent double purchase/payroll.
- Do not merge to production on failures. Keep owner Safari save untouched. Record exact PR SHA, production CI/Pages results and update Notion.
