# Boss — Milestone Progression & Autonomous Leadership Architecture

Status: **v21.4b released** through PR #29. [PR #29](https://github.com/BSAVCI1/Boss/pull/29) merged at `69972b4fe6771478cd38ce82b15e9bc3734dc3e9`; [production regression](https://github.com/BSAVCI1/Boss/actions/runs/39073362391) and [GitHub Pages deployment](https://github.com/BSAVCI1/Boss/actions/runs/39073362154) passed for that commit. GitHub Actions covered 390/414px Chromium, 730-day cash reconciliation, fresh starts, historical save migrations, progression gates and cross-tab/save protection. The independent hosted live-browser check was unavailable due to provider wallet balance; original private iPhone Safari save was not opened. This document also covers future designs: **only stages explicitly marked implemented in code are live**.

## Product principle

Boss progresses from Founder → Team Builder → Department Leader → CEO → Group CEO → Business Owner. Every stage requires demonstrated organizational capacity, financial sustainability and meaningful results before new discretionary opportunities unlock. Today's CEO priorities must explain exactly *why* the company cannot advance and the minimum next action. A manager's ability to gain authority must depend on genuine people and business outcomes, not titles alone.

## Career rules — corporate Sales, Marketing, Product & Operations

| Next position | Hard readiness | Accountability after appointment | Status |
|---|---|---|---|
| Team Lead | First at **5 corporate staff**, another 3 staff for each additional lead; individual 14 role/work days, career experience or XP, leadership ability ≥45; no unfinished assigned contract | At most 3 individual contributors, weekly successor mentoring, +$0.50/game-day payroll | v21.4b implemented |
| Manager | **3 Team Leads**, 45 days of lead experience, leadership ability ≥55 | Leads team leads and team growth, proposes recruiting/training/delegation, +$0.25/day increment over Team Lead | v21.4b implemented; broader operational authority later |
| Senior Manager | **5 Team Leads**, 75 days since Manager appointment, leadership ability ≥65 | Multi-team capacity and successor cover, +$0.30/day over Manager | v21.4b implemented; broader operational authority later |
| Director | **3 Managers**, 105 days since Senior Manager appointment, leadership ability ≥70 | Functional performance and succession, +$0.30/day over Senior Manager | v21.4b implemented; broader authority later |
| General Manager | Previously purchased service line, eligible GM, dedicated unit staff; CEO appointment, explicit budget | Strategy, unit financial performance, measured outcomes, designated successors | v21.1–v21.4a already released |

*Skill/professional career grades remain separate from functional management positions*. Corporate staff retain their professional history, primary department and persistent unique ID. Each worker has **one primary reporting owner**, even if corporate resources later support a unit through an expressly budgeted service allocation. Appointments may not strip employees away from active customer work.

For a newly founded company with three employees, the EA helps develop qualified candidates and recommends the best evidence-based Team Lead at five staff. More hires cannot alone guarantee promotion; practical days, performance, abilities and sufficient cash still matter. Larger legacy saves are not retroactively rewritten or downgraded.

## Financial authority and autonomous promotion

- No automatic payroll authority by default. CEO may approve a new recurring management-payroll ceiling, distinct from coaching/training/hiring.
- Each weekly leadership review checks the next actual promotion gate. A qualified, affordable promotion within the authorised ceiling can auto-execute. A qualified promotion above the ceiling appears as an **Executive Assistant / CEO exception** with recurring salary effect and cash-runway requirement.
- No invented one-time promotion fee; wages accrue over future days through the **one corporate cash/expense ledger**, and existing historical wages remain unchanged. CEO-approved exceptions do not secretly increase delegated authority.
- Maintain at least **14 future game days of payroll coverage** for a promotion. Existing cash/contract values and booked history must remain unchanged by a recommendation.
- Managers identify and mentor a named successor. Mentorship earns experience but does not itself grant titles, money or authority. Approval decisions and results should be reviewable.

## Stage-gated company growth

| Chapter | Minimum evidence | What becomes available |
|---|---|---|
| Founder | First customer, real delivered project, sustainable cash | First hire, business capability investment |
| Team Builder | 5 employees, at least one qualified Team Lead candidate | Team Lead responsibility and delegation |
| Managed Company | 3 experienced Team Leads, first manager, pipeline quality and financial runway | Manager-led headcount recommendations and functional specialization |
| Multi-Team Company | 5 Team Leads, trained successors, 30-day objectives and repeated evidence of profitability | Senior Manager decision rights and department integration |
| Corporate Group | 3 managers, qualified directors, stable cash and risk control | More operating units, executive review cadence and capital allocation |
| Business Empire | Proven organizational scalability, actual reserves, successful company strategies | Offices/property (v22), investments/acquisitions (v23), manufacturing (v24) |

**New service readiness checklist** in v21.4b: 5 delivered projects, ≥1 corporate Team Lead, reputation ≥30 and spendable cash ≥$120 plus 21 days of payroll. This is *advisory* until the new-business stage-gating migration and all legacy tests are complete; do not claim a hard lock already exists. Purchased portfolios retain permanent ownership. Future new-business rules will also require relevant professional skills, an evidence-backed demand forecast, space/capacity, GM succession and approval before commitment. New businesses must not guarantee immediate revenue.

The Executive Assistant should rank **three immediate CEO priorities** from (a) unresolved customer/deadline risks, (b) missing leadership and training gates, (c) payroll/runway exceptions, (d) unmet direction/expansion readiness. It should provide the strongest candidate, the evidence, the cost and the realistic next achievement. The player may accept or decline structural proposals; line managers may autonomously execute only truly routine budgeted actions.

## Future functional depth

Sales must own prospecting, qualification, pricing and account capacity; Marketing owns campaign/market development; Product owns delivery complexity, technology and R&D; Operations owns capacity, quality, workflow and supply chain. Cross-functional corporate support of an operating unit requires an intentional shared-work allocation and explicit labor attribution, preserving a single employee primary owner and no duplicate corporate expense.

All stages need state-specific graphical progress (not 15 disconnected forms), with the next unlock and its missing conditions visible on Today. Priorities and business direction should change once prerequisites are met, not show obsolete strategic reminders.

## Save/QA non-negotiables

- New game: 3 employees → 5 employees → first Team Lead recommendation; no free promotion or payroll without authority.
- Historical v19/v20/v21 saves: additive migrations only; no retroactive repricing, business disappearance, legacy appointment deletion, save-day rollback, employee ID duplication, salary duplication or authority inflation.
- 730+ game-day simulation, payroll reconciliation, day/reload preservation, IndexedDB fallback, stale-tab protection, 390/414px controls and iPhone picker/edit safety.
- Review full test evidence **before** marking a feature released; all unfinished milestones remain named as roadmap work in Notion.
