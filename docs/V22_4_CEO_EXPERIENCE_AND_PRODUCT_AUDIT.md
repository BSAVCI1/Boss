# Boss — Product Experience Audit and Approved Roadmap (18 October 2026)

**Status:** Approved product plan; implementation staged. **Do not mistake a passing development-branch CI for deployed production.** Production main remains v22.2 at this audit. v22.3 economy balancing is an independent draft PR #39 and the comprehensive 30/180/730-day follow-up issue #40 is open.

## Evidence and player context
Source: owner-supplied four PDFs showing Today, Work, Team and Growth at Day 4704 (user's personal save, not loaded in engineering sandbox). 28 employees; ~$3.3M cash; 689 completed; 2 GM-led units; 3/3 HR/CFO/COO appointments; upgrades mastered. Screens reveal lengthy repeated controls, completed research visible in primary navigation, 19/12 corporate seating, business-unit 30-day targets well above actual performance, frequent budget expiry, complicated hierarchy, 26/28 Associate career grades and repetitive executive scorecards.

**Distinguish facts and proposals.** Observed issue: proposal "indicative fee" ~$199 and signed fees ~$11k–$13k. Code audit confirmed `worldTenderPreview` quote formula omits multipliers used by `createDeal/estimatedFee`. Observed: filled C-suite recommendation; code `renderCEODecisions` checks firm size, not role vacancies. Observed: alerts report "5 areas" and CEO center "0 actionable decisions"; these refer to different categories but need UX distinctions. Office cost and capacity are real gameplay, but proposed strategic decision is new UI. The game has auto-assignment and GM/shared-staff mechanisms; do not inaccurately call them absent. Work may remain unassigned for valid eligibility or paused tick; explain cause in-game.

## Player value
Keep: employee history and growth, actual operational authority and recurring wages, distinct GM operating units, real cash/working capital, portfolio and strategies. Reduce: repeated giant forms, expired caps requiring repetitive CEO taps, long plain-text briefing, obsolete unlocked-upgrades as primary content. Add: strategic CEO role progression; visual office and reporting trees; distinct business and market risks; context-aware action cards and decision outcomes.

## Approved roadmap and checkpoints
### v22.3 — Economic balancing (draft; not production)
Complete cost/profit/cash/runway simulation and property affordability, fresh & grandfathered save scenario at 30/180/730 days (issue #40); keep pricing prospective and booked/signed terms immutable. Draft PR #39 already regression-green for price policy, **not** full economy acceptance.

### v22.4 — CEO Experience (begin now; small reviewable increments)
**P0:** Match indicative bid quote with contract-fee economics (use a qualified range/assumptions where exact future contract scope is not known), suppress role recommendations for occupied offices, separate CEO approvals from EA risk notices, expose overcrowding and contextual premises choices.
**P1:** Today dashboard: consolidated game position, high-impact CEO decision, status of delegated work, next earned chapter; executive brief summarizes top three matters with cost/risk/next step; full report remains accessible. Make canonical CEO reporting line, explain promotion blockers and real action outcomes. Simplify role and business unit navigation and archive mastered R&D into a compact optional area.
**Quality:** Maintain existing gameplay; no new automatic approvals, hidden revaluation or new expenses. Verify every branch change in actual script, synthetic mature save, 730-day finance and 390px/414px live Chromium/IndexedDB.

### v22.5 — Management Autopilot (after v22.4)
Enable HR/COO/CFO to execute repeated *already authorized* work under matching grants and single ledger. HR evaluates succession, bounded within-cap progression/hiring, wellbeing; COO prioritizes GM projects and corporate shared specialists; CFO recommends evidence-backed budgets, profit/margin and reserve controls. Opt-in renewing authority rules must have hard TTL/total caps, cash reserves, clear audit trail and one-tap revocation. No automatic CEO exceptional approvals, strategic acquisitions, employment duplication or cash creation. Policy presets map to real limits, not magical allocation.

### v23 — Investments & Acquisitions
Meaningful acquisitions with price, diligence, financing, integration, culture and loss downside, balance-sheet realism, ROI and scenario comparisons; differentiated Product Development and Marketing Studio mechanics. v23 unlocks only once economy and CEO experience are accepted.

### v24 — Manufacturing, Business World & Visual Identity
Real supply-chain/factory prerequisites and ongoing risk, business/property world maps, contextual rooms/campus, visible employee stories and industry-specific challenges, battery-safe/mobile-first rendering.

## UX principles and acceptance
- Player modes emerge from **earned progression**: founder operates, manager delegates, group CEO allocates capital/strategy. Advanced/manual mode never disappears.
- CEO Today: decision needed vs delegated/in progress vs FYI; never duplicate the same root cause. A value judgement must include evidence, options, estimated spend, risk, owner, expected timing, later observed outcome.
- Target comprehension <=10 seconds, strategic choice <=3 relevant interactions, no input focus loss on game ticks. These are acceptance **targets**, not measured results.
- Protect original `boss20` localStorage/IndexedDB save, revision, team IDs, leadership, service lines, premises, signed fees, company day and ledger. Require code/CI+Pages evidence and independent owner Safari verification (not accessible in CI).

## Competitive analysis framing
Reference design lessons, not sourced telemetry: *Big Ambitions* shows tangible empire; *Software Inc* shows specialization/delegation; *Startup Company* shows product identity; *Two Point Campus* shows environmental and employee narrative. Boss should use original content and prioritize CEO strategic decisions rather than administrative burden.
