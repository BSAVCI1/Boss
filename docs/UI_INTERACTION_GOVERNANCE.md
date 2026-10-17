# Boss — Interactive UI Reliability Standard

Status: Mandatory engineering and release gate from v21.3.1 onward.

## Non-negotiable contract

When a player starts interacting with any `<select>`, `<input>`, `<textarea>` or editable element, **automatic updates must not replace, close, reset, blur or steal focus from it**. This includes native iPhone Safari pickers, text selection, numeric drafts and controls inside expandable sections. Background simulation and existing save protection must keep working, with deferred visual reconciliation after the interaction ends. Do not pause the simulation merely to avoid rebuilding a field, and do not overwrite a draft with a fresh model value.

Capture focus/touch/pointer/keyboard/input **before** any background render, and keep protection until change or focusout plus a short native picker dismissal interval. Avoid relying on `document.activeElement.closest("#container").matches("select,input")`: that tests the container, not the interactive descendant. App updates must preserve open sections and scroll through the edit. Never clear storage or create paid transactions as a UI workaround.

## Why this rule exists

- v19 and v20 manager-delegation budget controls lost input focus during autonomous renders. Previous limited fixes protected some numbers but not every control.
- v20.1 required saving numeric edits as the player types, not only at blur.
- v21.3 Growth → Operating units replaced General Manager and teammate selectors during game ticks, instantly dismissing the native iOS dropdown before a person could be selected.

Root cause: UI render functions replace DOM subtrees on a changing game-state signature, invalidating native browser controls. This is a systemic rendering lifecycle issue, not just a GM widget issue.

## Release checklist

1. Inventory every editable control affected by the feature and its parent DOM writers in Today, Work, Team, and Growth.
2. Protect the entire active edit lifecycle (touch/pointer/focus/input through change/blur). Handle iOS native select and keyboard dismissal gracefully.
3. Simulate 1× and 8× game ticks while the player is selecting, typing incomplete values, switching fields, scrolling within a disclosure, or cancelling an edit.
4. Verify that the same active control DOM node remains connected, user input is not reset, selection is committed exactly once, and UI eventually catches up without reopening closed sections.
5. Run real headless mobile browsers at 390px and 414px plus deterministic mutation tests. Cover GM/staff dropdowns with choices available, live cash/payroll changes, all numeric policy budgets, focus/selection, IndexedDB fallback/reload, and stale-tab conflicts.
6. Ensure user saves, company day, employees/IDs, single reconciled ledger, signed contracts, historical paid services and permission boundaries remain unchanged. Money-changing actions must stay failure-atomic.
7. Attach regression and Pages evidence to the PR. Never merge on red or unverified checks. Update README, CHANGELOG, ROADMAP and Notion with root cause and new tests.

## Implementation scope (v21.3.1)

Shared edit-session shield and deferred repaint across simulation-driven renders. Does **not** change unit staffing qualification, financial accounting, save format, or preexisting appointments. Subsequent UI features must reuse this shield, rather than duplicating ad-hoc checks.
