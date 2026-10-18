# Boss v22 — Offices, Property, Campus & Game Speed

**Status:** RELEASED 2026-10-18. [PR #33](https://github.com/BSAVCI1/Boss/pull/33) merged at `921c2ee5378d1957d7b300a902de038445fe0ed1`; [production regression](https://github.com/BSAVCI1/Boss/actions/runs/39111129733) and [Pages deployment](https://github.com/BSAVCI1/Boss/actions/runs/39111128958) passed on that commit.

## Property roadmap delivered

The CEO may rent a serviced suite (12 seats, $75 once + $1.50/game-day), a regional office (24 seats, $220 once + $3/day), buy an office building (40 seats, $1,800 once + $1.20/day upkeep), buy group headquarters (80 seats, $7,200 once + $3/day upkeep), or open a GM operating-unit satellite (10 seats, $100 once + $1.10/day). Work effectiveness rises by 2.5%, 4%, 6%, 9%, and 4% respectively before location adjustments. Real headcount, appointments, deliveries, operating-unit readiness, and 21 days of lease or 30 days of owned-company payroll and facility runway are enforced before transaction.

The starter distributed office offers 8 corporate seats and new operating units 6 seats without invented rent. Historical imported games retain a baseline covering all existing personnel at migration, so established companies avoid instantaneous crowding. That baseline remains fixed afterwards. Overcrowding reduces only future task efficiency (down to a 76% floor) and gradually presses on mood, never retroactively changes contracts, employees, earned cash or purchases.

Office location choices: business park uses baseline costs; city center +25% upfront, +30% recurring and +2.5 percentage points of future work efficiency; regional hub -15% upfront, -12% recurring and -1.5 percentage points of efficiency. Original terms are stored on each signed site and never repriced when the player changes the future location selection.

Only one corporate headquarters and one satellite per operating unit may be active. Moving between locations ends prior leases but retains owned assets as inactive property. Ended leases incur no new rent and are not refunded. Owned inactive buildings can be reactivated without a second purchase, or sold at 92% of their remaining carrying value. Portfolio acquisitions and resales are CEO decisions, not autonomous manager spends.

## Single company financial ledger

Rent and setup are real operating expenses; owned acquisitions are investing cash outflows, not operating income or instant gains. Property upkeep is an operating expense. Owned buildings incur 1.5% of original acquisition value in noncash depreciation every 90 subsequent game days, capped at remaining carrying value; cash is never charged twice. A sale recognizes real cash-in of 92% of remaining book and a noncash book-to-sale disposal loss, not fictitious service revenue. A sold site cannot be sold twice. If cash cannot cover rent/upkeep, the unpaid part becomes explicit property arrears with accrued costs; later settling the arrears is cash-only with no duplicate expense. Opening cash plus recorded cash in minus recorded cash out must equal closing cash.

Current acquired service lines, contracts, worker IDs, unique unit ownership, saved days, budgets, and the boss20 / IndexedDB fallback persist. All new property decisions are transactionally saved and rolled back on failed storage writes.

## CEO visualization

Growth now shows an offline-friendly responsive floor and capacity overview of headquarters and operating units, actual teammates/work-state icons, buy-or-rent quotes, location trade-offs, future work bonuses, cost/carrying value, prerequisite blockers and property decisions. Today and EA weekly report surface meaningful capacity or unpaid-bill risk. The live office canvas is now capped at 20 FPS and can be collapsed persistently to reduce render/battery cost. None of this requires external image assets or an always-on computer.

## Measured simulation pace

Previous timer: 1200 milliseconds per game day divided by selected multiplier. At default 1x, 30 game days elapsed in 36 real seconds. v22 changes the timer to 2400 milliseconds per day divided by speed:
- 1x Standard: 2.4 s/day; 72 s for a 30-day management cycle
- 3x Fast: 0.8 s/day; 24 s per cycle
- 8x Turbo: 0.3 s/day; 9 s per cycle

Pause and Skip up to seven days remain. The saved speed choices 1/3/8 are unchanged. Executive dilemmas previously had a 45-second real-time throttle that distorted their spacing at faster rates; now they require a minimum of 28 game days, alongside existing internal scenario eligibility. Legacy saved interruptions are not fabricated or replayed. Inbound sales and project progress remain game-day based.

Comparators: Startup Company offers pause and selectable playback speeds (including faster modes); Software Inc. documents game-calendar pacing with days per month. These are design references, not an objective industry timing standard. Slowing the default is a Boss-specific choice to allow CEO review time.

Initial v22 performance regression: 180 simulated days with 24 employees took 559 ms CPU time in a Node harness, **excluding** deliberate game-day waiting and browser rendering. This is not an iPhone FPS benchmark. Production gates include historical regression, 730-day finance checks, 390/414px Chromium mobile controls and extended IndexedDB saves. The owner's actual Safari save is not available for inspection.

## Outside v22

v23 will cover portfolio investments, business acquisitions and company valuation. v24 will cover factories, stock, suppliers and production economics. Properties do not yet reflect actual geographic real estate markets or personal finance advice.
