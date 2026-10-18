# Boss v21.5 — Earned Business Progression & CEO Direction

**Status:** RELEASED 2026-10-18. [PR #32](https://github.com/BSAVCI1/Boss/pull/32) merged at `583ea00e31af82753d26f6bcc2873f3811c70047`; [production regression](https://github.com/BSAVCI1/Boss/actions/runs/39107265404) and [Pages](https://github.com/BSAVCI1/Boss/actions/runs/39107264888) passed. Code: standalone `index.html`. The legacy `boss20` localStorage key, `BossSafeProgress` IndexedDB fallback and JSON backup are unchanged.

## Business progression: hard purchase gates

New service purchases are not allowed until **all** current criteria are fulfilled. A locked launch does not deduct cash, change the ledger, add a service, alter signed contracts or create an employee. The new Growth launch panel shows the selected service's requirements and disables the action until eligible. The underlying `executiveLaunch` validates the same rule again, independently of UI state, *before any financial mutation*. Existing purchased services, including those recovered from recorded investment receipts, remain available indefinitely without repurchasing.

- **First service:** at least five completed client projects, an actual Team Lead, reputation of at least 30, one qualified corporate specialist for the service type, and `$120 + 21 days of total payroll` in cash.
- **Second service:** all first-stage requirements, at least three fulfilled contracts in an existing service line, one properly appointed and staffed operating-unit GM, and `$120 + 30 days of total payroll` in cash.
- **Third service:** earlier criteria plus ten fulfilled contracts in an existing line, at least one real 30-day GM review, and a corporate Manager appointment.
- **Fourth service:** prior criteria plus two GM-led operating units, a Director appointment and `$120 + 60 days of total payroll` in cash.

Requirements reflect **current** workforce and recorded achievements. Saved historical purchases are grandfathered as assets, not inferred qualification for unrelated expansion. A staff member's role and skill must actually qualify; no phantom capacity is invented. Authority to spend is never implied by a readiness indicator. The existing CEO still approves the $120 purchase.

## CEO guidance

Today presents the derived organizational chapter (Founder → Team Builder → Managed Company → Corporate Group), the next owned/unowned business opportunity, the leading unmet condition and number of requirements remaining. Growth shows per-service steps, including current measurements. The Executive Assistant adds a progression recommendation when there is room after urgent decisions and includes expansion blockers among weekly CEO priorities. Advice does not silently change strategy or approve purchases.

## Monthly corporate manager accountability

Every 30 game days, record a bounded scorecard for appointed corporate leaders: role, function, staff scope, observed completed assignments since the prior scorecard, stressed colleagues, real unassigned functional work and next management attention state. First review records a baseline and does **not** invent earlier delivery history. Each leader receives at most one review per day; reports are saved and shown in Team and EA briefing. Generating a scorecard cannot modify salary, cash, booked revenue or worker ownership. Real hiring budgets and CEO exception rules remain those established by v21.4c.

## Safeguards and QA

Preserve actual game day, cash ledger, employee IDs, service purchase receipts, saved team/unit ownership, contract fee locks, old saves, browser native selection and mobile draft protection. Maintain one consolidated payroll ledger. Historical pre-v21.5 regression scenarios run without the *new* gate in their isolated JavaScript test harness; a separate unmodified-script `tests/v21-5-growth.cjs` explicitly tests real strict launch rules and no-charge denial. The browser test funds and awards synthetic milestone evidence *only in its isolated QA game* before validating real purchase persistence across IndexedDB/refresh. Never infer access to the owner's private Safari game or claim real-device verification from these fixtures.

## Not delivered in v21.5

Group campus/offices and property assets (v22); portfolio investments/acquisitions (v23); factories, warehouses, and product inventory economics (v24). Corporate scorecards are periodic evidence and advice, not full autonomous salary reviews, project-by-project manager strategy or automatic business formation. Those need later gates and dedicated tests.
