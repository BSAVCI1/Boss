# Boss — simulation development roadmap

**Product guardrails:** one self-contained `index.html`; free, ad-free, offline and private; no account, tracking, fonts, libraries or network activity. On-device saves only. Mobile-first. The player remains the boss. Never add a mandatory ending.

## Current: v5 — People and recruiting (delivered)
- Search a fresh pool of four candidates by specialty (Sales, Marketing, Product or Operations) and/or personal interest.
- See every candidate’s traits, skill levels and recruitment fee; hire within cash constraints. Existing team starts with three; there is no artificial team-size cap.
- Interests affect deal speed, skill growth, teaching or experimentation when aligned.
- Fire staff with confirmation; assigned client deals become available and dismissal lowers reputation and coworkers’ morale. The last person cannot be fired.
- Motivate individuals with recognition, a bonus or coaching, and run a team activity. Cash costs, cooldowns, memories, moods and loyalty matter.
- Migrate existing v4 browser progress from `tl3` into the new versioned save key `boss5`.

## Next: v5.1 — Make HR decisions deeper (small scope; approval required)
- Employee profiles with strengths, preferred tasks, past decisions and promotion readiness.
- Satisfaction and burnout indicators driven by workload, idle time, purpose and recognition.
- Candidate comparisons: expected productivity, hiring fee and salary impact, with a balanced scoring explanation.
- Resignation interviews, coaching paths and visible consequences of dismissals.
- Acceptance criteria: clear trade-offs, stable save migration, no free-repeat morale exploit, reliable controls at 380px.

## v6 — Departments, managers and office growth
- Departments for Sales, Marketing, Product and Operations, including manager assignments and reporting lines.
- Boss can issue team-level orders through managers rather than directing everyone individually.
- Managers learn leadership skills and have their own values, strengths and failure modes.
- Workspace/office upgrades use in-game cash and have both upkeep and productivity trade-offs.
- Acceptance criteria: original individual controls still accessible; no mandatory hierarchy; simulation works at large team sizes.

## v7 — Responsive competitors
- Named rivals with distinct strategies (discounting, copying ideas, recruiting away talent, improving quality).
- Rival actions respond to player decisions, reputation, client success, and market segment.
- Fair warning and multiple choices when threatened; never lock players into unwinnable states.

## v8 — Relationships and culture
- Trust, friendship, rivalry and mentoring ties between team members.
- Cooperation and disputes affect tasks and dilemmas; managerial choices change relationship memory.
- Privacy: all relationship simulation stays inside the offline save file.

## v9 — Living company economy
- More client industries, complex jobs, seasons, market swings, customer retention and negotiations.
- Richer moral dilemmas, multi-stage experiments and discovery recipes.
- Optional statistics panel tracking efficiency, cash flow, retention, burnout and team development.

## Later: optional conversational AI — separate decision required
- Default game remains **fully offline** with rule-based personalities and memories.
- An online AI mode would require network requests and an external service, conflicting with the present one-file offline-only contract. Do **not** implement it without explicit approval and a privacy/cost/design decision.
- Before any AI implementation, propose an opt-in architecture with clear data boundaries and an offline fallback.

## Delivery discipline
Read the latest GitHub `main/index.html`, preserve every feature, work on an isolated branch, test game logic and mobile layout, deploy to GitHub Pages, append GitHub + Notion changelog lines, and verify the live URL.
