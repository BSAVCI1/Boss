// v22.5A2: bounded layout/navigation and preservation guard.
// Full engine, 730-day ledger, save and real Chromium tests remain in mandatory CI.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(code,{filename:"Boss-v22.5A2.js"});
const once=id=>{
 const re=new RegExp('\\bid="'+id.replace(/[.*+?^$()|[\]{}]/g,"\\$&")+'"',"g");
 assert.equal([...html.matchAll(re)].length,1,"Missing/duplicated ID "+id);
};
for(const id of ["work-finance-snapshot","work-owned-capabilities","work-project-watch-summary",
 "work-project-forecasts","assistant-priorities","economy-panel","economy-borrow",
 "economy-invest-commercial","economy-invest-operations","economy-assets","economy-invoices",
 "org-explorer","team-simple-summary","people","org-controls","leadership-growth",
 "policy-renew","team-activity","management-policy-center",
 "growth-expand-businesses","growth-markets-customers","growth-investments-property",
 "growth-focus-summary","business-lines","business-units","property-panel","growth-research",
 "ideas","lab-panel","sector-options","world-strategy"])once(id);
const i=id=>html.indexOf('id="'+id+'"');
assert.ok(i("view-work")<i("work-finance-snapshot")&&i("work-finance-snapshot")<i("deals"));
assert.ok(i("deals")<i("work-project-forecasts")&&i("work-project-forecasts")<i("pipeline-stages"));
assert.ok(i("view-work")<i("assistant-priorities")&&i("assistant-priorities")<i("view-team"),
 "Project forecasts must live in Work only");
assert.ok(i("view-team")<i("team-simple-summary")&&i("view-team")<i("org-explorer"));
assert.ok(i("view-growth")<i("growth-expand-businesses")&&
 i("growth-expand-businesses")<i("growth-markets-customers")&&
 i("growth-markets-customers")<i("growth-investments-property"));
assert.ok(i("growth-investments-property")<i("economy-invest-operations"));
assert.ok(i("growth-research")<i("ideas"));
assert.match(html,/Advanced Finance &amp; business records/);
assert.match(html,/Target sector: /);
assert.match(html,/Commercial positioning: /);
assert.match(html,/Historical company contribution and wins are not investment ROI/);
assert.doesNotMatch(html,/observed company-wide project contribution and/);
assert.doesNotMatch(html,/Unassigned \(optional\)/);
const org=code.slice(code.indexOf("function renderOrgExplorer("),code.indexOf('$("org-explorer").addEventListener'));
assert.ok(!org.includes(" #'+id"),"Employee ID leaked into default organization explorer");
assert.match(org,/data-employee-jump/,"Immutable navigation ID must remain in DOM");
const summary=code.slice(code.indexOf("function renderSimpleScreens("),code.indexOf("function economyRender("));
assert.ok(summary.includes("e.procurementPayable")&&summary.includes("S.bi.unpaidPayroll"),"Liabilities must include vendor and wages");
assert.ok(summary.includes("rankedProjects()")&&summary.includes("orgManager("),"Real work/team context required");
assert.ok(!/S\.(?:cash|team|deals|org|economy|exec|world|market)\s*=/.test(summary),"Read-only summary cannot mutate game");
assert.match(code,/function managementPolicyApprove\(/,"v22.5A1 authority approval is retained");
assert.match(code,/function economyBorrow\(/,"Manual credit preserved");
assert.match(code,/function save\(/,"Saved game code is retained");
console.log("PASS v22.5A2 scoped layout, immutable IDs, investment claims and finance/authority preservation");
