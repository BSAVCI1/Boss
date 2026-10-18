# Boss v22.3 — Economic balancing and forward-only price normalization

**Status: development candidate — NOT RELEASED.** Branch: `feature/v22-3-economic-balancing`. Do not merge before strict regression and real mobile tests pass; the owner's iPhone Safari save is not available in CI.

## Scope and discovered gap

The v22.2 model uses an unbounded reputation fee factor `1 + reputation/200`; payroll and property costs are smaller, creating increasingly distorted capital affordability and operating-result optics at large game ages. Marketing Studio screenshots showed $670,858 earned over 62 completed contracts, $3,941 allocated payroll and $144 development/recruiting costs, for $666,773 unit contribution (BEFORE corporate overhead). These are not audited group net earnings.

### Prospective policy: new contract quotes only

- New deals created at v22.3 or later carry `pricingVersion:23`.
- For reputation `r <= 600`, multiplier remains `1+r/200`: founder and normal growth economics stay **unchanged**.
- For `r > 600`, multiplier is `4 + 2.2 * ln(1+(r-600)/600)`, continuous at 600, increasing at diminishing rate with no arbitrary hard cap.
- Existing deals without version 23 use the ORIGINAL `1+r/200` calculation for any quote revisions and keep their persisted `agreedFee` unchanged until explicitly revised under legacy rules. No retroactive payment, booked amount, expense, cash, salary or investment change.
- The unit dashboard calls the measured result **unit contribution before corporate overhead** rather than presenting it as consolidated net profit.

### Comparative multiplier benchmark (per identical base deal / all other modifiers held constant)

| Reputation | Old | v22.3 new deal | Change |
| ---: | ---: | ---: | ---: |
| 0 | 1.00 | 1.00 | 0% |
| 300 | 2.50 | 2.50 | 0% |
| 600 | 4.00 | 4.00 | 0% |
| 1,200 | 7.00 | 5.52 | -21% |
| 3,000 | 16.00 | 7.54 | -53% |
| 10,000 | 51.00 | 10.19 | -80% |
| 30,000 | 151.00 | 12.61 | -92% |

These are pricing-factor scenarios, **not** forecasts of actual revenue or profitability. They isolate one source of inflation. 30/180/730-game-day snapshots are covered in quote-policy regression; full 730-day cost/cash simulation remains covered by the existing game pipeline. Since reputation varies by playstyle, day alone cannot determine realized cash.

## Executive authority remains unchanged

HR unlocked at 15 staff plus appointed manager; CFO at 20 completed contracts and two lines or owned property; COO at two staffed GM units and 15 completed contracts. All need competent existing staff and 30-day payroll coverage. Appointment and 90-day permission gates remain independent. CFO veto remains limited to delegated spend. This balance change must not silently appoint, remove or fund executives.

## Safety and release gates

1. All existing + v22.3 tests green in required GitHub Actions pipeline, including 390px/414px browser and IndexedDB migration.
2. New founder game, advanced 180/730 game-day synthetic saves, and day-2864 grandfathered deals retain saved day, cash, signed fees, staff IDs, properties, executive mandates and payroll.
3. Check that only newly generated unsigned proposals use version 23, and no historical project is revalued due solely to loading the update.
4. Review unit contribution vs consolidated overhead disclosure on mobile.
5. Compare startup / mature / advanced affordability after the quote correction. Evaluate future NEW employment, premises and asset price calibration separately, with a measured cost-to-revenue target; do not reprice already signed sites, alter past payroll, confiscate cash or invent overhead.
6. Do not represent v23 investment/acquisition gameplay as included in this release. Proceed to v23 only when unit- and group-level profit/cash runway remain credible.

**Next quantitative pass:** 30/180/730 full replay by company growth strategy, revenue per delivered contract, payroll+rent as % of revenue, cash runway, property affordability and utilization; identify whether a prospective recurring procurement/contract-delivery cost or higher-cost new properties is needed rather than guessing.
