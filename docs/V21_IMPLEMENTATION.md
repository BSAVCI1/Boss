# Boss v21 — Autonomous Operating Units Architecture

> Source of truth: this file, ROADMAP.md, tests and index.html. Status on 2026-10-17: v21.1 and v21.2 released; v21.3 is under PR #26 until regression, Pages and browser gates succeed. Do not infer release from this document alone.

## Preservation / migration contract

Boss is one standalone, offline `index.html`. Company state remains `boss20` with transactional `BossSafeProgress` IndexedDB fallback, verified save revisions, stale-tab protection and the JSON backup export. Never clear/replace the owner's Safari storage or backfill unverifiable past events. Historical paid service portfolios, cash, signed agreed fees, contract identities, payroll journals, worker IDs, and manager decisions are immutable. Existing operating units receive optional new capacity and strategy fields *on load* with zero historical staff/billable days. Their revenue/payroll review baselines start at their real saved totals, not zero. No additional unit launch payment.

`state.exec.lines[]` represents purchased service offerings. `state.exec.units[]` represents internally managed service divisions keyed by the purchased line; no subsidiary bank accounts or duplicate ledgers. `state.exec.unitRequests[]`, `unitEvents[]` and `units[].reviews[]` contain accountable decisions/evidence. One person ID may appear in at most one unit's staffIds. A GM is included in their unit's staffIds but excluded from its specialist capacity denominator; corporate department/assistant roles are mutually exclusive with unit management.

## v21.1 and v21.2 — already deployed (PRs #24 / #25)

CEO conversion of an already purchased line into a dedicated operating unit with no second purchase; uniquely owned worker transfers and eligible GM appointment. Forward-only unit-tied contract revenue, shared/direct cost and dedicated payroll allocation from the single corporate ledger. v21.2 added zero-default CEO coaching authority, per-action cap, expiry, real $4 coaching with seven-day cooldown, 30-day measured delivery-quality reviews, staffing proposal and one-time CEO-gated $20 recruiting plus recurring wages.

## v21.3 scope — PR #26

1. **Actual GM delivery dispatch.** Contracts signed after unit activation are tagged `deal.unitKey`. `unitDelegateWork()` assigns unallocated unit contracts to eligible *dedicated* specialists only when an appointed GM is active. `delegateWork()` ignores unit jobs; manual assignment and candidate lists respect `unitAssignmentAllowed()`. Corporate contracts use shared staff only. This creates a real capacity restriction: a vacancy or insufficient specialist headcount can cause delays instead of invisible corporate capacity.
2. **Strategy choice.** Per-unit `plan.focus` is balanced (default), quality (slower delivery, incremental quality increase) or speed (faster delivery at modest quality risk). It affects ongoing work only, not signed prices, old quality or historical project outcomes. Changing policy has no immediate cash cost and must be durably saved.
3. **Actual capacity measurement.** `unit.staffDays` counts payroll days for dedicated non-GM staff; `unit.billableDays` counts corresponding real unit-contract delivery work. They start at zero on existing v21.2 saves; leave, recovery and idle time may lower utilization. Unit employment costs already flow through the corporate payroll once, so these counters must never add payroll expenses.
4. **Unit CEO goals and reviews.** `plan.revenueTarget` defaults 0 (monitor without artificial retroactive performance target); `plan.utilizationTarget` defaults 65%, and quality remains an existing explicit target. The rolling 30-day review now measures period revenue, allocated operating cost, contribution and utilization, using forward-only cumulative baselines; no independent bank accounts or extra revenue. Existing older reviews without those fields remain valid with "not tracked" labels.
5. **Skill-based proposals.** Unit staffing recommendation identifies the actual required service skill, not a generic new employee. A GM recommends, while the CEO decides and bears legitimate recruiting and salary costs.

## Financial invariants

Consolidated company cash and `S.bi` accounting never change due merely to assignment, target edits, reviews or strategy selection. A customer contract is posted exactly once to corporate revenue via its existing completion and payment logic. Unit revenue is a separately attributed *view* of the same completed unit-tagged contracts. Direct costs, shared external labor and dedicated wages/development appear at unit level for management only. Corporate payroll posts once even when a unit measures dedicated wage allocation. StaffDays/billableDays are reporting counters only; office property and factories (v22/v24) must have separate explicit account and ledger designs.

## QA and rollout gates

Required: old v19/v20/v21 import, no-second-purchase, stable IDs/reports, no cross-unit assignment, GM vacancy/capacity delays, strategy feedback, 30-day actual metrics, zero delegated authority, cooldown and recurring wages, cash ledger equality, 730-day accelerated game, 390px/414px browser, IndexedDB failed-write and refresh recovery, one HTML file, and offline boot. Validate the actual PR head SHA, GitHub Actions results and merge; then separately confirm GitHub Pages *on the new main SHA* and isolated live-site performance. Never claim an owner Safari save test from a synthetic browser.

## Later v21 milestones (not included here)

v21.4: explicit subordinate functional manager structure inside justified units; time-boxed CEO-approved resource envelopes and management spans, verified cross-unit collaboration, periodic group-level capital choices, GM career and succession paths, compact playable executive meetings and responsive world/org visualization. Any shared staffing must use explicit employee-day ownership and one payroll source. v22 office/property purchase/rent/assets, v23 investments/acquisitions and v24 factories/products/inventory are independent gated future releases.
