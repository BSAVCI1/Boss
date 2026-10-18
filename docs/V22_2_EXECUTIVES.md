# Boss v22.2 — Corporate Executive Leadership (Released)

**Status: RELEASED 2026-10-18.** [PR #38](https://github.com/BSAVCI1/Boss/pull/38) merged at `f189a529b39dc4d78a70394d00b58e92f0078cbf`. [Production regression](https://github.com/BSAVCI1/Boss/actions/runs/39113283639) and [Pages](https://github.com/BSAVCI1/Boss/actions/runs/39113283272) passed on that exact commit, including 390/414px browser, IndexedDB reload and cash reconciliation. Core game remains offline, one HTML file, with `boss20` and existing extended IndexedDB persistence. No reset or retrospective correction of sales, projects, purchases, payroll, employees, Day, property or unit ownership.

## CEO appointments

The CEO can appoint qualified *existing* employees as Chief People Officer (HR), Chief Financial Officer (CFO), and Chief Operating Officer (COO). Each role is an independently occupied office, not a new AI-generated headcount or fictional automatic hire. Candidates require 30 measured working days, career grade/XP, a real management competence of at least 48/100, no active customer contract, and no conflicting current GM, departmental manager, assistant or executive appointment. Existing worker ID and history are retained. Corporate leaders' prior appointments are not silently revoked; CEO role is a dedicated work state.

The company must first prove business readiness:
- HR: 15 people and a corporate Manager/Senior Manager/Director appointment.
- CFO: 20 delivered contracts plus two purchased service portfolios or an owned property.
- COO: two independently staffed and appointed GM units and 15 delivered contracts.
- Every appointment must leave a **30-day full payroll reserve**, factoring in the increment.

Recurring *additional* executive wages: HR $0.85/game-day, CFO $1.15/day, COO $1.05/day, scaled by existing wage cost modifier. No recruitment fee, duplication, historical salary adjustment or executive phantom role. Ending an appointment stops *future* premium only; booked wages are never refunded. The worker does not execute ordinary new client jobs while serving in the executive work state.

## Authority by explicit CEO mandate

All three offices initialize with **delegation OFF** in fresh games and in saved-game migration. Filling a title does not approve any budget or actions. The CEO can grant or revoke a separate 90-day mandate for each role; it expires with no implicit renewal. Delegation still depends on the existing manager/GM/department budget categories, slot counts, per-action limits and genuine cash runway.

- **HR/People:** Once every seven game days, check previously unapproved departmental hiring proposals and execute only those already qualifying under CEO-approved *global* recruiting funds, slots and 21-day payroll cash coverage. Can move stressed **idle** workers into recovery, without interrupting signed customer contracts, inventing sick leave or debiting cash. No authority to create new recruiting budgets, appoint GMs, or increase salaries.
- **CFO/Finance:** When the mandate is active, delegated discretionary spending needs an additional 30 days of aggregate payroll and premises cash **after** the proposed outflow. This controls delegated corporate recruitment and bounded department/GM training and coaching. It does **not** alter recorded balances, cancel existing approved contracts or invent a free cash transfer. Explicit CEO staffing exceptions continue under their pre-existing cash tests.
- **COO/Operations:** Can coordinate 30-day cross-unit specialist sharing and unit hiring as an acting functional counterpart when the relevant department manager is absent. Every loan keeps one worker ID, one primary employer, one salary ledger and a genuine finite expiration. Unit hiring remains subject to the same CEO recruitment envelope and 21-day payroll cash. With no mandate, GM/dept negotiations continue as in v22.1.

Each officer earns an evidence-based first 30-day baseline and later 30-day scorecards from tracked employees, units, unassigned work, real delivered contracts and actual cash runway. These are *reports*, not guaranteed productivity benefits. The Executive Assistant and CEO decision center summarize officer appointments, risks and expired mandates; the CEO performs appointment, delegation and overrides only by explicit controls on Today. No autonomous assistant purchases stock or acquires businesses.

## Safeguards and tests

QA must cover saved-game migration without default officers; no purchase/no phantom hire/no premium before appointment; same-ID exclusion from multiple offices; cash-only 30-day appointment reserve; mandates disabled by default, expiring after 90 days and revoked manually; HR protection of already-assigned customer work; CFO veto confined to delegated spend; COO coordination only under explicit mandate; monthly evidence without invented financial entries; durable save/reload; 730-day ledger and mobile input protection.

The true owner's personal Safari game record cannot be read via GitHub CI. Confirm the saved Day, cash, purchased lines, property, worker IDs and authority limits on-device after making an export backup.

## Deferred economic balancing before v23

Notion identifies disproportionate late-game reputation-driven service contract prices vs salaries, properties and acquisition affordability. **No retroactive price or cash changes** are included in this executive-rights release. A separate evidence-based pacing/economy model is required before new investments/acquisitions (v23); preserve signed contract fees and accrued income in all future changes.
