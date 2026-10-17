# Boss

Boss is a free, ad-free, offline-capable, mobile-first, endless leader simulation. Begin with a three-person team, then recruit specialists, support people, and lead through client work, learning, experimentation, dilemmas, and company decisions. No sign-in, tracking, external libraries, fonts or network requests are required.

**Play:** https://bsavci1.github.io/Boss/.

## How to play
Tap a person’s name on a client deal to assign or unassign them. Use Study, Teach, Experiment or Rest to guide the team. Under **Recruitment & team culture**, filter candidates by skill and personal interest, search for four candidates, and hire those you can afford. Each hire costs a one-time fee and adds $1.50/day in salaries. Interests influence performance and learning. Every person has **Recognize** (free), **Bonus** ($12), and **Coach** ($8) actions with a seven-day cooldown, plus a **Fire** button (the last employee cannot be dismissed). Team activities cost $5 per person and have a 12-day cooldown. Respond to dilemmas and combine discovered ideas into lasting breakthroughs. Choose 1x, 3x or 8x speed, Pause, or Restart. **Focus mode** suspends new client inquiries and new dilemmas without stopping progress on existing work (deadlines and salaries still apply). In v10, employees build a visible sales pipeline rather than waiting for randomly generated contracts. Accepted contracts are at least eight game days apart; dilemmas are separated by at least 45 seconds of real play. Appoint an existing employee as an **office assistant**, or hire one for $20; the assistant follows your customizable delegation rules. Open **Delegation rules** to choose automatic assignment (on/off), prioritization (balanced, deadline-first, or skills-first), an automatic spending cap, and individual permissions for praise, family leave, coaching mistakes, or supporting experiments. Raises, conflicts, departures, and rival offers remain your decisions. The **Project priorities & deadline forecast** shows days remaining, projected work time, worker status, and risk even without an assistant. Deadline warnings are logged once per risk change. Your direct orders always take priority. Progress saves automatically in the browser.

## How to change the game
All the HTML, CSS and JavaScript live in one file, [index.html](index.html). Edit this complete file and commit it to `main`; GitHub Pages automatically publishes the root of `main` shortly afterward. The browser save key is `boss10`. Existing `boss9`, `boss8`, `boss7`, `boss6`, `boss5`, and `tl3` progress is imported automatically. Existing project balances remain unchanged for v8 and v9 saves. Earlier projects retain the existing compatibility migration. Also record each change in [CHANGELOG.md](CHANGELOG.md) and the Boss Notion page.

## Publishing

GitHub Pages is enabled with **Deploy from a branch → main → /(root)**. Pushing changes to `main` automatically rebuilds and publishes the site. View [deployment runs](https://github.com/BSAVCI1/Boss/actions) for status.

See [ROADMAP.md](ROADMAP.md) for planned features; new roadmap features are proposals, not yet implemented.

## Current: Boss v8 — Projects & Customers
- **Shorter, better-paid opening contracts:** typically 8–9 units of work with initial base fees around $80–$90 (higher with sector focus), before reputation effects. A three-person starting team still costs $4.50 per game day. Progress carries into a staged Plan → Build → Review process; project quality affects customer loyalty.
- **Project negotiation:** one-time premium scope (+25% fee, slightly more work), quick delivery (less scope, -8% fee and quality compromise), or client-first delivery (more time, higher quality, -5% fee). Any in-progress project can request one deadline extension (+8 days, -10% fee, -1 reputation) and one $8 quality review.
- **Customer relationships:** every successful or late project changes customer trust; repeat customers can return and are tracked in the **Customer relationships** portfolio with loyalty, delivered quality and completed contract count.
- **Sector strategy and expansion:** start in Hospitality and Retail, select a focus for +12% payout and speed; unlock Creative ($55, reputation 6; +12% sector premium), Logistics ($75, rep 12; +20%), and Technology ($95, rep 20; +30%). All investments are in-game only and permanent within that playthrough.
- **Evolving complexity:** stages 1–5 increase as the company completes contracts (a new stage about every five completions); later sectors and advanced contracts pay more. When there are no projects, the next game-day-qualified lead can arrive without waiting for the 25-second real-time cooldown, preventing high-speed insolvency. Focus mode still blocks new intake.

## Boss v9 — Smarter Employees (delivered)
- **Individual goals:** each employee cares about growth, recognition, serving clients, healthy balance, stability, or creative freedom. Goals influence satisfaction and, for aligned work, productivity.
- **Workload and burnout:** stress accumulates from projects, tight deadlines and experimentation; breaks, check-ins, team activities and coaching provide relief. Persistent burnout reduces speed and quality and takes time to recover. Staff under severe pressure may take a four-day recovery pause without opening another dilemma.
- **Hidden talents:** each employee has a stable, initially unknown skill affinity with a visible clue. Observation through study, experimentation, teaching, relevant work or coaching can reveal it and deliver a one-time skill bonus.
- **Career decisions:** open a colleague's **Career & wellbeing** panel for stress, burnout, satisfaction, XP, milestones and hidden talent clues. **Check-in** is free (9-day cooldown), **Growth plan** costs $10 (14-day cooldown), and **Promote** costs $25 once experience and skill thresholds are met. Senior and Lead roles improve performance but add $0.75/day to payroll per rank.
- **Autonomy:** overwhelmed workers can recover without interrupting you; assistant delegation does not override a recovery pause. Player task orders still take priority.
- **Keep existing features:** project economics, sectors and contracts, recruiting, smart assistant, Focus mode, dilemmas and discoveries all remain available. The experience is offline and stored locally.

## Roadmap priority (latest)
1. v7 **Smarter Office Assistant** — delivered.
2. v8 **Realistic Projects & Customers** — delivered at your request ahead of employee development.
3. v9 **Smarter Employees** — delivered: goals, stress, burnout, talents and careers.
4. **Next candidates** — managers/departments, rivals, relationships or market evolution. No further expansion is assumed without your direction.

## Boss v10 — Company Operating System (delivered)
- **Continuous commercial pipeline:** prospects move through qualification, proposals and negotiation before a project is won. Sales employees prospect, Marketing generates demand, and organic inquiries supplement the pipeline. A won project is scheduled when delivery capacity is available, not thrown at the player as an immediate interruption. Contracts have an eight-game-day minimum spacing. Focus mode blocks new project starts but does not erase leads or stop them maturing.
- **Workforce roles:** each person owns Sales, Marketing, Product, Operations, or (after earning enough seniority/experience) Team Lead responsibilities. Opening staff default to Sales/Product/Operations. Change a primary role from the employee card. Role-based work builds skills and career experience.
- **Autonomous work plans:** global operating policies are Balanced, Growth, and Innovation; an adjustable target sets qualified pipeline coverage. Toggle automatic idle task planning globally or switch a specific employee to manual instructions until you resume their autonomous plan. Team members prospect, market, study, teach, experiment, or rest based on roles, backlog, personal goals, and stress. Manual orders remain protected. Dedicated office assistants, or qualifying team leads in their absence, can reassign staff from autonomous tasks to urgent paid work.
- **Company knowledge/capability map:** employee discoveries automatically fill a visual dependency map, with clear 0/2, 1/2, or active capability states. No trial-and-error pair selection: the previous breakthroughs and modifiers automatically unlock when both prerequisites exist, once only. Original discoveries and built capabilities migrate from prior saves.
- **Employee skill map:** team-level skills, strongest mentor suggestions, each person's main role and discovered or undiscovered talent.
- **Unchanged:** paid client projects and negotiation, milestones, quality, customer loyalty, sector focus and expansion, hiring/firing, career development, smart delegation spending caps, Focus mode, office simulation, and the offline single-file design.
- **QA:** functional scenarios include full pipeline progression, passive leads, autonomous study/marketing/sales, manual-command protection, leader delegation, capability migration and single application, uninterrupted Focus, and long-run financial behavior.
