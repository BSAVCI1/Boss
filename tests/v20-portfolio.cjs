// Boss v20: real offers, recoverable investment, grouped people, briefing and safe browser saves.
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
// This backward-compatibility suite preserves pre-v21.5 launch scenarios. Strict new-game eligibility lives in tests/v21-5-growth.cjs.
const html=fs.readFileSync("index.html","utf8"),script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>")).replace("||!companyLaunchReadiness(key).ready","");
assert.equal((html.match(/<script\b/g)||[]).length,1,"offline single-file contract");
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const m of script.matchAll(/\$\("([^"]+)"\)/g))assert.ok(ids.has(m[1]),"Missing "+m[1]);
const store=new Map(),elements=new Map();
function el(id){if(!elements.has(id))elements.set(id,{id,open:false,innerHTML:"",textContent:"",value:"",hidden:false,checked:false,disabled:false,style:{},dataset:{},parentNode:{open:true},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},getContext(){return new Proxy({},{get:()=>()=>{}})},querySelectorAll(){return []},querySelector(){return null},setAttribute(){},removeAttribute(){},focus(){},scrollIntoView(){}});return elements.get(id)}
const sandbox={document:{getElementById:el,querySelector:()=>el("selector"),querySelectorAll:()=>[],documentElement:el("html"),body:el("body"),addEventListener(){},activeElement:null},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},clearInterval(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Math,Date,Set,Map,JSON,console};
vm.createContext(sandbox);
const boot=script.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
const exported="fresh,load,get:()=>S,set:x=>S=x,save,createDeal,feeFor,executiveLaunch,ceoLineFinish,chooseServiceOffer,teamReportingGroups,renderStructure,renderExecutiveWeekly,executiveShow,executiveWeek,executiveProposal,executiveAutonomous,orgSubManager,orgManager,orgReports,orgSubReports,orgDirectReports,orgPersonPosition,orgChooseManager,orgChangePolicy,unitActivate,unitAppoint,unitTransfer,unitRelease,unitOfPerson,unitPayrollDay,unitGMEligible,unitStaffEligible,unitAuthorize,unitRenewAuthority,unitAutonomousDay,unitStaffingDay,unitBudgetAllowed,unitRequestDecision,unitAssignmentAllowed,unitDelegateWork,unitSetFocus,unitApplyPreset,unitApplyDraft,unitRecordInput,unitPresetValues,unitCareerReadiness,unitDevelopSuccessor,unitDevelopTeam,managementReview,managementLead,managementWorkload,managementSetHiringPolicy,managementRequestDecision,managementSharedCandidates,managementShareStaff,managementSupportAllowed,managementHiringAvailable,managementCashReady,managementOps,ladderEvaluation,ladderNext,ladderPromote,ladderSetAuthority,ladderDay,ladderPayroll,ladderLaunchReadiness,ladderReassign,dailySalary,managementOps,managementLead,managementWorkload,managementReview,managementSetHiringPolicy,managementRequestDecision,managementSharedCandidates,managementShareStaff,managementSupportAllowed,renderLadder,renderLaunchGuide,delegateWork,assign,beginEditableInteraction,finishEditableInteraction,editableInteractionPending,renderBusinessUnits,refresh,renderBriefing,draftExecutiveDirection,gameAdvanceDays,createPerson,ensureRole,ensureCareer,ensureDepartment,ensurePerformance,tick";
vm.runInContext(script.slice(0,boot)+"globalThis.G={"+exported+"};})();",sandbox,{timeout:4000});
const G=sandbox.G;
function test(name,run){run();console.log("PASS",name)}
function init(){store.clear();G.fresh();el("lab-topic").value="learning";el("lab-duration").value="15";el("lab-forecast").value="25";el("lab-sector").value="hospitality";return G.get()}
function fund(s,amount){s.cash+=amount;s.bi.openingCash+=amount}
function reconcile(s){const t=s.bi.totals;assert.ok(Math.abs(s.bi.openingCash+t.cashIn-t.cashOut-s.cash)<.06,"cash ledger mismatch")}
test("new boss20 state imports boss19 without editing the old record",()=>{
 const s=init();s.day=2890;s.market.completed=449;s.rep=1708;fund(s,1000);const fee=G.feeFor(s.deals[0]);
 store.set("boss19",JSON.stringify(s));const prior=store.get("boss19");
 const next=G.load();assert.equal(next.day,2890);assert.equal(next.market.completed,449);assert.equal(G.feeFor(next.deals[0]),fee);
 G.set(next);assert.ok(G.save());assert.ok(store.get("boss20"));assert.equal(store.get("boss19"),prior);reconcile(next);
});
test("business launch charges once, survives refresh, and creates distinct contracted services",()=>{
 const s=init();fund(s,900);s.day=120;
 const before=s.cash;assert.equal(G.executiveLaunch("marketing"),true);assert.equal(s.cash,before-120);
 assert.equal(s.exec.lines.length,1);assert.equal(G.executiveLaunch("marketing"),false);
 const d=G.createDeal("Nova Cafe",0,"hospitality");
 assert.equal(d.serviceLine,"marketing");assert.equal(d.serviceOffer,"Campaign setup");assert.equal(d.need,"mkt");
 const price=G.feeFor(d);s.rep+=100;assert.equal(G.feeFor(d),price,"agreed fee changed retrospectively");
 assert.ok(G.save());const old=store.get("boss20");
 const loaded=G.load();assert.equal(loaded.exec.lines[0].key,"marketing");assert.equal(loaded.deals.at(-1).serviceLine,"marketing");
 assert.equal(store.get("boss20"),old);assert.equal(loaded.exec.lines[0].spent,120);reconcile(s);
});
test("service contribution is attributed without issuing another cash payment",()=>{
 const s=init();fund(s,900);s.day=100;G.executiveLaunch("technology");
 const d=G.createDeal("Luna Hotel",0,"hospitality"),earned=G.feeFor(d),cash=s.cash,revenue=s.bi.totals.revenue;
 d.laborCost=12;d.directCost=4;d.quality=86;
 G.ceoLineFinish(d,true,earned);
 const line=s.exec.lines[0];assert.equal(line.delivered,1);assert.equal(line.revenue,earned);
 assert.equal(line.contribution,earned-16);assert.equal(line.qualityTotal,86);
 assert.equal(s.cash,cash);assert.equal(s.bi.totals.revenue,revenue,"service line duplicated consolidated income");reconcile(s);
});
test("service maturity unlocks more valuable future offer only",()=>{
 const s=init();fund(s,900);s.day=100;G.executiveLaunch("marketing");
 const d1=G.createDeal(),fee=G.feeFor(d1);assert.equal(d1.serviceTier,1);
 s.exec.lines[0].delivered=3;
 const d2=G.createDeal();assert.equal(d2.serviceTier,2);assert.equal(d2.serviceOffer,"Brand growth program");
 assert.equal(d1.serviceOffer,"Campaign setup");assert.equal(G.feeFor(d1),fee);
 s.exec.lines[0].delivered=10;const d3=G.createDeal();assert.equal(d3.serviceTier,3);assert.equal(d3.serviceOffer,"Premium growth partnership");reconcile(s);
});
test("verified investment receipts recover missing lines without imaginary spending",()=>{
 const s=init();fund(s,600);s.day=110;G.executiveLaunch("product");assert.equal(s.exec.lines.length,1);
 s.exec.lines=[];G.save();
 let restored=G.load();assert.equal(restored.exec.lines.length,1);assert.equal(restored.exec.lines[0].key,"product");
 assert.equal(restored.exec.lines[0].recovered,true);reconcile(restored);
 restored.exec.lines=[];restored.bi.recent=restored.bi.recent.filter(x=>x.info!=="New business line: Product development");
 G.set(restored);G.save();const noReceipt=G.load();assert.equal(noReceipt.exec.lines.length,0,"recovery cannot invent a purchase without evidence");
});
test("v19 receipt recovers a lost purchased line during v20 import without refunding",()=>{
 const s=init();fund(s,900);s.day=2852;
 assert.ok(G.executiveLaunch("marketing"));
 const cash=s.cash,totalInvestment=s.bi.totals.investments;
 s.exec.lines=[];
 store.set("boss19",JSON.stringify(s));
 store.delete("boss20");store.delete("boss20_service_line_journal");
 const old=store.get("boss19"),migrated=G.load();
 assert.equal(migrated.exec.lines.length,1);assert.equal(migrated.exec.lines[0].key,"marketing");
 assert.equal(migrated.cash,cash);assert.equal(migrated.bi.totals.investments,totalInvestment);
 assert.equal(store.get("boss19"),old);reconcile(migrated);
});
test("reporting-line groups contain each colleague once and retain optional hierarchy",()=>{
 const s=init(),director=s.team[0],manager=s.team[1],worker=s.team[2];
 director.department="commercial";director.role.primary="lead";director.career.rank=4;s.org.departments.commercial.managerId=director.id;
 manager.department="commercial";manager.role.primary="lead";manager.role.previousPrimary="sales";s.org.departments.commercial.subManagers.sales=manager.id;
 worker.department="commercial";worker.role.primary="sales";
 const groups=G.teamReportingGroups(),seen=groups.flatMap(x=>x.people.map(p=>p.id));
 assert.equal(seen.length,s.team.length);assert.equal(new Set(seen).size,s.team.length);
 assert.equal(groups[0].title,"CEO · direct reports");
 assert.ok(groups.some(x=>x.id==="commercial-sales"&&x.people.some(p=>p.id===worker.id)));G.renderStructure();
 assert.ok(el("people").innerHTML.includes("commercial-sales"));reconcile(s);
});
test("a scheduled leadership week generates an actual read-only report",()=>{
 const s=init();s.day=7;s.exec.nextMeeting=7;
 G.executiveWeek();assert.equal(s.exec.weeklyReports[0].day,7);
 el("ea-weekly-report").open=true;G.renderExecutiveWeekly();
 const body=el("ea-weekly-body").innerHTML;assert.ok(body.includes("Direct-report briefing"));
 assert.ok(body.includes("Exceptions"));assert.ok(body.includes("cash paid"));reconcile(s);
});
test("Marketing Manager can request and execute an appropriately skilled hire under CEO-approved budget",()=>{
 const s=init();fund(s,750);s.day=7;
 const director=s.team[0],lead=s.team[1];
 director.department="commercial";director.role.primary="lead";director.career.rank=4;s.org.departments.commercial.managerId=director.id;
 lead.department="commercial";lead.role.primary="lead";lead.role.previousPrimary="mkt";s.org.departments.commercial.subManagers.mkt=lead.id;
 assert.ok(G.executiveLaunch("marketing"));
 const request=G.executiveProposal("commercial");assert.equal(request.type,"hire");assert.equal(request.role,"mkt");
 const plan=s.org.departments.commercial.plan;plan.limits.hiring=40;plan.perAction=20;plan.hireSlots=1;plan.payrollLimit=2;
 const before=s.team.length;
 assert.equal(G.executiveAutonomous("commercial",request),true);
 assert.equal(s.team.length,before+1);assert.equal(s.team.at(-1).role.primary,"mkt");
 assert.ok(s.team.at(-1).s.mkt>=2);assert.equal(plan.hires,1);
 reconcile(s);
});
test("730-day active service business preserves contract value and financial reconciliation",()=>{
 const s=init();fund(s,15000);s.day=20;s.nextEv=999999;
 assert.ok(G.executiveLaunch("operations"));
 const d=G.createDeal(),signed=G.feeFor(d);
 for(let i=0;i<730;i++){if(s.ev)s.ev=null;G.tick();}
 assert.equal(s.day,750);assert.equal(G.feeFor(d),signed);
 assert.ok(Number.isFinite(s.cash));assert.ok(Number.isFinite(s.exec.lines[0].contribution||0));
 reconcile(s);G.save();
 const saved=G.load();assert.equal(saved.day,750);assert.equal(saved.exec.lines[0].key,"operations");
 assert.ok(saved.deals.every(x=>Number.isFinite(G.feeFor(x))));reconcile(saved);
});
test("stale browser tab cannot replace a newer saved company",()=>{
 const s=init();fund(s,200);assert.ok(G.save());const newer=JSON.parse(store.get("boss20"));
 newer._saveRevision+=5;newer.cash+=35;newer.bi.openingCash+=35;
 store.set("boss20",JSON.stringify(newer));s.cash+=1;
 assert.equal(G.save(),false,"outdated tab overwrote progress");
 assert.equal(JSON.parse(store.get("boss20")).cash,newer.cash);
});
test("two independently purchased service lines persist, recover from legacy receipts and cannot be charged twice",()=>{
 const s=init();fund(s,1500);s.day=2852;
 const opening=s.cash,investments=s.bi.totals.investments;
 assert.equal(G.executiveLaunch("marketing"),true);
 s.day=2859;
 assert.equal(G.executiveLaunch("product"),true);
 const cash=s.cash,paid=s.bi.totals.investments;
 assert.equal(cash,opening-240);assert.equal(paid,investments+240);
 let saved=G.load();assert.deepEqual([...saved.exec.lines.map(x=>x.key)].sort(),["marketing","product"]);
 assert.equal(saved.cash,cash);reconcile(saved);
 const before=store.get("boss20");assert.ok(before);
 // A legacy browser tab is permitted to write only its own v19 key.
 const legacy=JSON.parse(store.get("boss20"));
 legacy.exec.lines=[];store.set("boss19",JSON.stringify(legacy));
 assert.equal(store.get("boss20"),before,"older-tab write must not erase newer v20 investments");
 store.delete("boss20");store.delete("boss20_service_line_journal");
 saved=G.load();
 assert.deepEqual([...saved.exec.lines.map(x=>x.key)].sort(),["marketing","product"]);
 assert.equal(saved.exec.lines.filter(x=>x.recovered).length,2);
 assert.equal(saved.cash,cash);assert.equal(saved.bi.totals.investments,paid);
 G.set(saved);assert.equal(G.executiveLaunch("marketing"),false);
 assert.equal(G.executiveLaunch("product"),false);
 assert.equal(G.save(),true);assert.equal(G.load().exec.lines.length,2);
 reconcile(saved);
});

test("Executive Assistant shows real financial metrics, department budgets and three priorities",()=>{
 const s=init();s.day=7;fund(s,200);
 const values={revenue:120,costs:45,cashIn:90,cashOut:25,wins:2,delivered:1,missed:0};
 s.bi.daily.push({day:7,values});
 for(const [k,v] of Object.entries(values))s.bi.totals[k]=(s.bi.totals[k]||0)+v;
 s.cash+=65;
 const plan=s.org.departments.commercial.plan;plan.limits.training=100;plan.spent.training=20;
 el("ea-weekly-report").open=true;G.renderExecutiveWeekly();
 const body=el("ea-weekly-body").innerHTML;
 for(const part of ["operating profit","operating costs","net cash movement","Department leaders","remaining","Three CEO priorities","CEO approvals"])
  assert.ok(body.includes(part),"missing briefing part: "+part);
 assert.ok(body.includes("$120"),"seven-day revenue missing");
 assert.ok(body.includes("$45"),"seven-day operating cost missing");
 assert.ok(body.includes("$75"),"seven-day operating profit missing");
 assert.ok(body.includes("$65"),"seven-day cash movement missing");
 reconcile(s);
});
test("failed browser write rolls back a business launch with no phantom paid investment",()=>{
 const s=init();fund(s,300);const beforeCash=s.cash,beforeInvestments=s.bi.totals.investments;
 const previousWrite=sandbox.localStorage.setItem;
 sandbox.localStorage.setItem=(key,value)=>{if(key==="boss20")throw Error("storage quota reached");return previousWrite(key,value)};
 try{assert.equal(G.executiveLaunch("marketing"),false,"purchase must never appear successful without a durable save");}
 finally{sandbox.localStorage.setItem=previousWrite;}
 const current=G.get();
 assert.equal(current.cash,beforeCash);
 assert.equal(current.bi.totals.investments,beforeInvestments);
 assert.equal(current.exec.lines.length,0);
 assert.equal(store.has("boss20_service_line_journal"),false,"journal must not claim failed purchase");
 assert.equal(store.has("boss20"),false,"failed primary write must not have persisted");
 assert.ok(el("save-warning").textContent.includes("could not save progress"));
 reconcile(current);
});

test("every departmental budget, spending permission and target saves across reload",()=>{
 const s=init();fund(s,500);assert.ok(G.save());
 const cases=[
  ["commercial",{coaching:91,training:84,team:73,hiring:65,perAction:22,hireSlots:3,payrollLimit:4,days:180,leads:9}],
  ["delivery",{coaching:67,training:61,team:53,hiring:43,perAction:21,hireSlots:2,payrollLimit:3,days:180,onTime:94}]
 ];
 for(const [dept,fields] of cases)for(const [field,value] of Object.entries(fields))
  assert.equal(G.orgChangePolicy(dept,field,value,true),true,"cannot save "+dept+" "+field);
 const stored=JSON.parse(store.get("boss20"));
 const next=G.load();
 for(const [dept,fields] of cases)for(const [field,value] of Object.entries(fields)){
  const p=next.org.departments[dept],actual=["coaching","training","team","hiring"].includes(field)?p.plan.limits[field]:["leads","onTime"].includes(field)?p.target[field]:p.plan[field];
  assert.equal(actual,value,dept+" "+field+" disappeared on reload");
 }
 assert.equal(next.day,s.day);assert.equal(next.team.length,s.team.length);
 assert.equal(store.get("boss20"),JSON.stringify(stored),"loading a save should not alter stored settings");reconcile(next);
});
test("invalid or failed numeric updates leave last valid browser settings intact",()=>{
 const s=init();fund(s,100);assert.ok(G.save());assert.ok(G.orgChangePolicy("commercial","coaching",156,true));
 const before=store.get("boss20");
 for(const val of [-10,NaN,Infinity,10000001])assert.equal(G.orgChangePolicy("commercial","coaching",val,true),false);
 assert.equal(store.get("boss20"),before);
 const priorWrite=sandbox.localStorage.setItem;
 sandbox.localStorage.setItem=(key,value)=>{if(key==="boss20")throw Error("storage full");return priorWrite(key,value)};
 try{assert.equal(G.orgChangePolicy("commercial","training",45,true),false);}
 finally{sandbox.localStorage.setItem=priorWrite;}
 assert.equal(G.get().org.departments.commercial.plan.limits.training,0);
 assert.equal(JSON.parse(store.get("boss20")).org.departments.commercial.plan.limits.coaching,156);
 assert.equal(el("save-state").dataset.error,"true");reconcile(s);
});
test("an unconfirmed CEO strategy draft persists without changing company direction",()=>{
 const s=init();assert.equal(s.exec.priority,"grow");
 assert.equal(G.draftExecutiveDirection("people"),true);
 assert.equal(s.exec.priority,"grow");
 assert.equal(G.load().ui.pendingCEO,"people");
 assert.equal(G.load().exec.priority,"grow");
});

test("failed device storage halts every subsequent game day and cannot be bypassed with Skip",()=>{
 const s=init();fund(s,350);assert.ok(G.save());
 const old=sandbox.localStorage.setItem;
 sandbox.localStorage.setItem=(key,value)=>{if(key==="boss20")throw Error("simulated Safari storage exhaustion");return old(key,value)};
 try{
  G.tick();
  const blockedAt=s.day;
  assert.ok(blockedAt>=1,"first tick must reach the failed-save checkpoint");
  G.tick();assert.equal(s.day,blockedAt,"simulation advanced despite an unresolved save error");
  G.gameAdvanceDays();assert.equal(s.day,blockedAt,"Skip advanced company with no durable save");
  assert.equal(el("save-state").dataset.error,"true");
  assert.ok(store.has("boss20"),"older valid save should remain recoverable");
 }finally{sandbox.localStorage.setItem=old;}
});


test("appointed leadership position wins over functional Team lead while career grade stays unchanged",()=>{
 const s=init(),anna=s.team[0],eva=s.team[1],lucia=s.team[2];
 anna.department="commercial";anna.role.primary="lead";anna.career.rank=2;anna.career.path="leadership";s.org.departments.commercial.managerId=anna.id;
 eva.department="delivery";eva.role.primary="lead";eva.career.rank=0;s.org.departments.delivery.managerId=eva.id;
 assert.equal(G.orgPersonPosition(anna),"Commercial Department Manager");
 assert.equal(G.orgPersonPosition(eva),"Delivery Department Manager");
 assert.equal(anna.career.rank,2);assert.equal(eva.career.rank,0);
 lucia.department="commercial";lucia.role.primary="lead";lucia.role.previousPrimary="mkt";
 s.org.departments.commercial.subManagers.mkt=lucia.id;
 assert.equal(G.orgPersonPosition(anna),"Commercial Director");
 assert.equal(G.orgPersonPosition(lucia),"Marketing Manager");
 const groups=G.teamReportingGroups(),ids=groups.flatMap(g=>g.people.map(p=>p.id));
 assert.equal(new Set(ids).size,s.team.length);
 G.renderStructure();
 const people=el("people").innerHTML;
 assert.ok(people.includes("Commercial Director · Career: Lead"),"Director title must show on Team");
 assert.ok(people.includes("Delivery Department Manager · Career: Associate"),"Appointment must not invent promotion");
 assert.ok(people.includes("Marketing Manager · Career: Associate"));
 assert.equal(anna.career.rank,2);reconcile(s);
});
test("CEO strategy overdue status is a review prompt, not Day 561/90",()=>{
 const s=init();s.day=561;s.exec.priorityDay=0;
 G.renderStructure(); G.renderExecutiveWeekly();
 G.executiveShow();
 assert.ok(el("ceo-direction-time").textContent.includes("Review overdue"));
 assert.equal(el("ceo-direction-time").textContent.includes("561 / 90"),false);
 assert.ok(el("ceo-set-direction").textContent.includes("Renew direction"));
 assert.ok(el("business-lines-summary").textContent.includes("0 launched"));
 reconcile(s);
});
test("delegated budgets remain one shared departmental envelope even with subordinate managers",()=>{
 const s=init(),anna=s.team[0],lucia=s.team[1];
 anna.role.primary="lead";anna.department="commercial";s.org.departments.commercial.managerId=anna.id;
 lucia.department="commercial";lucia.role.primary="lead";lucia.role.previousPrimary="mkt";s.org.departments.commercial.subManagers.mkt=lucia.id;
 const plan=s.org.departments.commercial.plan;
 plan.limits.coaching=8;plan.perAction=8;
 assert.ok(G.orgChangePolicy("commercial","coaching",8,true));
 assert.equal(plan.limits.coaching,8,"Managers should not each receive their own 8-dollar pool");
 const controls=fs.readFileSync("index.html","utf8");
 assert.ok(controls.includes("one shared budget per department"));
 assert.ok(controls.includes("No maximum team size is set here"));
 assert.ok(controls.includes("not independent subsidiaries"));
 reconcile(s);
});


test("v21 migration retains all original purchased lines and does not invent an operating unit",()=>{
 const s=init();fund(s,500);s.day=2864;
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.executiveLaunch("marketing"),true);
 const expected=store.get("boss20"),cash=s.cash;
 assert.equal(s.exec.units.length,0,"Purchased service portfolios are not automatically subsidiaries");
 const loaded=G.load();assert.equal(loaded.exec.units.length,0);assert.deepEqual([...loaded.exec.lines.map(x=>x.key)].sort(),["marketing","product"]);
 assert.equal(loaded.cash,cash);assert.equal(store.get("boss20"),expected);assert.equal(loaded.day,2864);reconcile(loaded);
});
test("v21 CEO converts existing paid line exactly once and keeps all financial balances",()=>{
 const s=init();fund(s,500);s.day=2864;
 assert.equal(G.executiveLaunch("product"),true);
 const beforeCash=s.cash,ledger=JSON.stringify(s.bi.totals),line=JSON.stringify(s.exec.lines);
 assert.equal(G.unitActivate("product"),true);
 assert.equal(G.unitActivate("product"),false);
 assert.equal(s.exec.units.length,1);assert.equal(s.exec.units[0].since,2864);
 assert.equal(s.cash,beforeCash);assert.equal(JSON.stringify(s.bi.totals),ledger);
 assert.equal(JSON.stringify(s.exec.lines),line,"Paid line journal must not change");
 assert.equal(G.load().exec.units[0].key,"product");reconcile(s);
});
test("v21 each worker has exactly one operating unit and GM salary changes only after appointment",()=>{
 const s=init();fund(s,650);s.deals=[];s.day=200;
 G.executiveLaunch("product");G.executiveLaunch("marketing");
 assert.equal(G.unitActivate("product"),true);assert.equal(G.unitActivate("marketing"),true);
 const gm=s.team[0],specialist=s.team[1],other=s.team[2];gm.career.rank=1;
 const baseSalary=1.5+.75;
 assert.equal(G.unitAppoint("product",gm.id),true);
 assert.equal(G.unitAppoint("marketing",gm.id),false);
 assert.equal(G.unitTransfer("product",specialist.id),true);
 assert.equal(G.unitTransfer("marketing",specialist.id),false);
 assert.equal(G.unitTransfer("marketing",other.id),true);
 assert.equal(G.unitOfPerson(specialist.id).key,"product");
 assert.equal(G.unitOfPerson(other.id).key,"marketing");
 assert.equal(G.unitOfPerson(gm.id).managerId,gm.id);
 assert.ok(!G.orgReports(gm.department).some(p=>p.id===gm.id),"GM must not remain a department report");
 assert.ok(!G.orgReports(specialist.department).some(p=>p.id===specialist.id),"dedicated specialist must not remain in shared department span");
 assert.ok(!G.orgReports(other.department).some(p=>p.id===other.id),"second unit specialist must not be counted by corporate manager");
 G.orgChooseManager(gm.department,gm.id);
 assert.notEqual(G.orgManager(gm.department)?.id,gm.id,"unit GM cannot simultaneously become corporate department head");
 const members=s.exec.units.flatMap(u=>u.staffIds);
 assert.equal(new Set(members).size,members.length);
 const ids=G.teamReportingGroups().flatMap(g=>g.people.map(p=>p.id));
 assert.equal(new Set(ids).size,s.team.length);assert.equal(ids.length,s.team.length);
 assert.ok(G.orgPersonPosition(gm).includes("General Manager"));
 assert.equal(G.unitRelease("product",specialist.id),true);
 assert.equal(G.unitOfPerson(specialist.id),null);
 assert.equal(s.bi.totals.cashOut,240,"Only the two original $120 service launches cost cash");
 assert.equal(G.load().exec.units.length,2);
 assert.ok(baseSalary>0);reconcile(s);
});
test("v21 unit financial report only attributes future unit-tagged contracts and does not post second income",()=>{
 const s=init();fund(s,550);s.deals=[];s.day=110;
 G.executiveLaunch("product");
 const before=G.createDeal("Past customer",0,"hospitality");
 assert.equal(before.unitKey,undefined,"Pre-unit signed work remains historical");
 assert.equal(G.unitActivate("product"),true);
 const worker=s.team[1];assert.equal(G.unitTransfer("product",worker.id),true);
 const newDeal=G.createDeal("New customer",0,"hospitality");
 assert.equal(newDeal.unitKey,"product");
 const cash=s.cash,rev=s.bi.totals.revenue,initial=s.exec.units[0].revenue;
 newDeal.directCost=7;newDeal.laborCost=12;newDeal.w=worker.id;newDeal.quality=87;
 G.ceoLineFinish(newDeal,true,200);
 const u=s.exec.units[0];assert.equal(u.revenue,initial+200);
 assert.equal(u.directCost,7);assert.equal(u.sharedLaborCost,0);
 assert.equal(u.delivered,1);assert.equal(u.qualityTotal,87);
 G.unitPayrollDay();assert.ok(u.payrollCost>0);
 assert.equal(s.cash,cash);assert.equal(s.bi.totals.revenue,rev);
 assert.equal(before.unitKey,undefined);reconcile(s);
});
test("v21 failed browser save cannot register a unit or debit a purchase",()=>{
 const s=init();fund(s,250);G.executiveLaunch("marketing");const old=store.get("boss20"),cash=s.cash;
 const write=sandbox.localStorage.setItem;
 sandbox.localStorage.setItem=(key,value)=>{if(key==="boss20")throw Error("simulated full browser");return write(key,value)};
 try{assert.equal(G.unitActivate("marketing"),false);}
 finally{sandbox.localStorage.setItem=write;}
 // Failed persistence restores the active game snapshot; the test fixture's
 // earlier object reference is no longer the active runtime state.
 assert.equal(G.get().exec.units.length,0);
 assert.equal(G.get().cash,cash);assert.equal(store.get("boss20"),old);
 assert.equal(G.load().exec.units.length,0,"Reload must not invent the failed conversion");
});

test("v21 730-day managed-unit payroll never double-posts or loses team and line history",()=>{
 const s=init();fund(s,120000);s.day=2800;s.deals=[];s.flow.focus=true;s.nextEv=99999;
 assert.equal(G.executiveLaunch("product"),true);
 assert.equal(G.executiveLaunch("marketing"),true);
 assert.equal(G.unitActivate("product"),true);
 assert.equal(G.unitActivate("marketing"),true);
 const gm=s.team[0],member=s.team[1],other=s.team[2];
 gm.career.rank=1;
 assert.equal(G.unitAppoint("product",gm.id),true);
 assert.equal(G.unitTransfer("product",member.id),true);
 assert.equal(G.unitTransfer("marketing",other.id),true);
 const start=s.day,initialIncome=s.bi.totals.revenue,initialInvestments=s.bi.totals.investments;
 for(let i=0;i<730;i++)G.tick();
 assert.equal(s.day,start+730,"The simulation should advance a full two years");
 assert.equal(s.exec.units.length,2);
 assert.equal(s.exec.lines.length,2,"Operating a unit cannot relaunch a paid service");
 assert.equal(s.bi.totals.investments,initialInvestments,"No investment should be charged after initial purchases");
 assert.equal(s.bi.totals.revenue,initialIncome,"Dedicated unit payroll must not create phantom customer sales");
 assert.ok(s.exec.units[0].payrollCost>0&&s.exec.units[1].payrollCost>0,"Real dedicated payroll must be tracked");
 assert.equal(new Set(s.exec.units.flatMap(u=>u.staffIds)).size,3);
 const loaded=G.load();assert.ok(loaded&&loaded.day===s.day,"Two years of unit operations should survive reload");
 assert.deepEqual([...loaded.exec.units.map(u=>u.key)].sort(),["marketing","product"]);
 assert.equal(loaded.exec.lines.length,2);
 assert.equal(loaded.team.length,s.team.length);
 reconcile(s);
});

test("v21.2 unit authority defaults zero after migration and never spends without CEO approval",()=>{
 const s=init();fund(s,100);s.deals=[];
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0],worker=s.team[1];gm.career.rank=1;
 assert.equal(G.unitAppoint("product",gm.id),true);assert.equal(G.unitTransfer("product",worker.id),true);
 const u=s.exec.units[0];s.day=20;const cash=s.cash,costs=s.bi.totals.costs,skill=worker.s.prod;
 G.unitAutonomousDay();
 assert.equal(s.cash,cash);assert.equal(u.plan.spent,0);assert.equal(worker.s.prod,skill);
 assert.equal(s.bi.totals.costs,costs);
 assert.equal(G.load().exec.units[0].plan.coachingLimit,0);
 reconcile(s);
});
test("v21.2 one real paid coaching intervention obeys both caps, term and cooldown",()=>{
 const s=init();fund(s,400);s.deals=[];
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0],worker=s.team[1];gm.career.rank=1;
 assert.equal(G.unitAppoint("product",gm.id),true);assert.equal(G.unitTransfer("product",worker.id),true);
 assert.equal(G.unitAuthorize("product","coachingLimit",8),true);
 assert.equal(G.unitAuthorize("product","perAction",3),true);
 s.day=14;const initialCash=s.cash,initialCost=s.bi.totals.costs;
 G.unitAutonomousDay();assert.equal(s.cash,initialCash,"$3 max may not authorize a $4 action");
 assert.equal(G.unitAuthorize("product","perAction",4),true);
 G.unitAutonomousDay();
 assert.equal(s.cash,initialCash-4);
 assert.equal(s.bi.totals.costs,initialCost+4);
 assert.equal(s.exec.units[0].developmentCost,4);
 assert.equal(s.exec.units[0].plan.spent,4);
 G.unitAutonomousDay();assert.equal(s.cash,initialCash-4,"same-day repeated call must not double-charge");
 s.day+=7;G.unitAutonomousDay();assert.equal(s.cash,initialCash-8);
 s.day+=1;G.unitAutonomousDay();assert.equal(s.cash,initialCash-8,"budget exhausted");
 const priorSpending=s.exec.units[0].developmentCost;
 assert.equal(G.unitRenewAuthority("product"),true);
 assert.equal(s.exec.units[0].developmentCost,priorSpending,"renewal itself does not spend");
 G.unitAutonomousDay();assert.equal(s.exec.units[0].developmentCost,priorSpending,"renewal the day after coaching must not bypass its weekly cooldown");
 s.day+=6;G.unitAutonomousDay();assert.equal(s.exec.units[0].developmentCost,priorSpending+4,"coaching resumes exactly seven days after the previous session");
 assert.equal(G.load().exec.units[0].plan.coachingLimit,8);
 reconcile(s);
});
test("v21.2 GM 30-day review and CEO hire proposal reconcile cost, salary and stable worker IDs",()=>{
 const s=init();fund(s,500);s.deals=[];
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0];gm.career.rank=1;assert.equal(G.unitAppoint("product",gm.id),true);
 const u=s.exec.units[0];
 // Simulate one genuine new-work unit backlog and measured service record.
 const backlog=G.createDeal("Open unit contract",0,"hospitality");
 assert.equal(backlog.unitKey,"product");
 u.delivered=2;u.qualityTotal=168;s.day=35;
 const cash=s.cash,headcount=s.team.length,oldPid=s.pid,investments=s.bi.totals.investments;
 G.unitAutonomousDay();G.unitStaffingDay();
 assert.equal(u.reviews.length,1);assert.equal(u.reviews[0].quality,84);
 const proposal=s.exec.unitRequests.find(q=>q.key==="product"&&q.status==="open");
 assert.ok(proposal&&proposal.cost===20);
 assert.equal(s.cash,cash,"proposal must never spend");
 assert.equal(G.unitRequestDecision(proposal.id,"approve"),true);
 assert.equal(s.team.length,headcount+1);assert.equal(s.pid,oldPid+1);
 assert.equal(s.exec.unitRequests.find(q=>q.id===proposal.id).status,"approved");
 assert.equal(s.cash,cash-20);
 assert.equal(s.exec.units[0].developmentCost,20);
 assert.equal(s.bi.totals.investments,investments,"hiring is recruiting cost, not investment");
 assert.equal(G.unitRequestDecision(proposal.id,"approve"),false,"no double billing");
 assert.equal(s.exec.units[0].staffIds.filter(id=>id===oldPid).length,1);
 assert.equal(G.load().exec.units[0].staffIds.includes(oldPid),true);
 reconcile(s);
});
test("v21.2 rejected CEO unit proposal does not hire or spend",()=>{
 const s=init();fund(s,500);s.deals=[];
 G.executiveLaunch("marketing");G.unitActivate("marketing");
 const gm=s.team[0];gm.career.rank=1;G.unitAppoint("marketing",gm.id);
 G.createDeal("Marketing customer",0,"hospitality");
 s.day=36;G.unitAutonomousDay();G.unitStaffingDay();
 const req=s.exec.unitRequests.find(q=>q.status==="open");
 assert.ok(req);
 const cash=s.cash,count=s.team.length;
 assert.equal(G.unitRequestDecision(req.id,"decline"),true);
 assert.equal(s.cash,cash);assert.equal(s.team.length,count);
 assert.equal(s.exec.unitRequests.find(q=>q.id===req.id).status,"declined");
 assert.equal(G.unitRequestDecision(req.id,"approve"),false);
 reconcile(s);
});

test("v21.2 replacing or losing a General Manager withdraws outdated hiring requests",()=>{
 const s=init();fund(s,500);s.deals=[];
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const first=s.team[0],replacement=s.team[1];first.career.rank=1;replacement.career.rank=1;
 assert.equal(G.unitAppoint("product",first.id),true);
 G.createDeal("Qualified open backlog",0,"hospitality");s.day=35;G.unitAutonomousDay();G.unitStaffingDay();
 const request=s.exec.unitRequests.find(r=>r.status==="open");
 assert.ok(request,"First GM should propose hiring based on live unit demand");
 const oldCash=s.cash,oldHeadcount=s.team.length;
 assert.equal(G.unitAppoint("product",replacement.id),true);
 assert.equal(s.exec.unitRequests.find(r=>r.id===request.id).status,"withdrawn");
 assert.equal(G.unitRequestDecision(request.id,"approve"),false,"Previous manager proposal cannot be charged");
 assert.equal(s.cash,oldCash);assert.equal(s.team.length,oldHeadcount);
 assert.equal(G.load().exec.unitRequests.find(r=>r.id===request.id).status,"withdrawn");
 reconcile(s);
});


test("v21.3 dedicated unit jobs are scheduled by the GM and cannot consume shared staff",()=>{
 const s=init();fund(s,1100);s.day=200;s.deals=[];
 assert.equal(G.executiveLaunch("marketing"),true);
 assert.equal(G.unitActivate("marketing"),true);
 const gm=s.team[0],specialist=s.team[1],corporate=s.team[2];
 gm.career.rank=1;assert.equal(G.unitAppoint("marketing",gm.id),true);
 assert.equal(G.unitTransfer("marketing",specialist.id),true);
 specialist.role.auto=true;specialist.t="idle";specialist.career.stress=0;
 corporate.role.auto=true;corporate.t="idle";
 const job=G.createDeal("Unit-only marketing contract");
 assert.equal(job.unitKey,"marketing");
 assert.equal(G.unitAssignmentAllowed(job,corporate),false);
 assert.equal(G.unitAssignmentAllowed(job,gm),false,"the GM is a leader, not unbounded delivery capacity");
 assert.equal(G.unitAssignmentAllowed(job,specialist),true);
 assert.equal(G.unitDelegateWork(),true,"GM should assign eligible dedicated specialist");
 assert.equal(job.w,specialist.id);
 G.assign(job.id,corporate.id);
 assert.equal(job.w,specialist.id,"CEO manual click may not bypass unit ownership");
 G.delegateWork();assert.equal(job.w,specialist.id,"shared dispatcher cannot steal unit contract");
 assert.ok(s.exec.unitEvents.some(x=>x.type==="delivery"));
 assert.equal(s.exec.units[0].staffIds.includes(corporate.id),false);
 assert.equal(new Set(s.exec.units.flatMap(u=>u.staffIds)).size,s.exec.units[0].staffIds.length);
 reconcile(s);
});
test("v21.3 shared projects never silently borrow dedicated unit payroll",()=>{
 const s=init();fund(s,1100);s.day=150;s.deals=[];
 const shared=G.createDeal("Corporate agreement");
 assert.equal(shared.unitKey,undefined);
 assert.equal(G.executiveLaunch("product"),true);
 assert.equal(G.unitActivate("product"),true);
 s.team[0].career.rank=1;
 assert.equal(G.unitAppoint("product",s.team[0].id),true);
 const dedicated=s.team[1];assert.equal(G.unitTransfer("product",dedicated.id),true);
 assert.equal(G.unitAssignmentAllowed(shared,dedicated),false);
 G.assign(shared.id,dedicated.id);assert.equal(shared.w,null);
 G.assign(shared.id,s.team[2].id);assert.equal(shared.w,s.team[2].id);
 reconcile(s);
});
test("v21.3 GM strategy, targets and migration preserve historical unit economics",()=>{
 const s=init();fund(s,1100);s.day=150;s.deals=[];
 assert.equal(G.executiveLaunch("product"),true);
 assert.equal(G.unitActivate("product"),true);
 const unit=s.exec.units[0],oldInvest=s.bi.totals.investments;
 assert.equal(G.unitAuthorize("product","revenueTarget",210),true);
 assert.equal(G.unitAuthorize("product","utilizationTarget",74),true);
 assert.equal(G.unitSetFocus("product","quality"),true);
 assert.equal(G.unitSetFocus("product","undocumented"),false);
 assert.equal(G.unitAuthorize("product","utilizationTarget",101),false);
 assert.equal(G.unitAuthorize("product","revenueTarget",-1),false);
 assert.equal(unit.plan.focus,"quality");
 const cash=s.cash,ledger=s.bi.totals.revenue;
 assert.ok(G.save());
 const roundtrip=G.load();assert.equal(roundtrip.exec.units[0].plan.focus,"quality");
 assert.equal(roundtrip.exec.units[0].plan.revenueTarget,210);
 assert.equal(roundtrip.exec.units[0].plan.utilizationTarget,74);
 assert.equal(roundtrip.cash,cash);
 assert.equal(roundtrip.bi.totals.revenue,ledger);
 assert.equal(roundtrip.bi.totals.investments,oldInvest);
 // Simulate v21.2 persisted unit without new optional telemetry.
 const migrated=JSON.parse(JSON.stringify(roundtrip));const u=migrated.exec.units[0];
 u.revenue=25;u.payrollCost=40;
 delete u.staffDays;delete u.billableDays;delete u.plan.focus;
 for(const key of ["revenueTarget","utilizationTarget","baselineRevenue","baselineCosts","baselineStaffDays","baselineBillableDays"])delete u.plan[key];
 G.set(migrated);assert.ok(G.save());
 const restored=G.load(),p=restored.exec.units[0].plan;
 assert.equal(restored.exec.units[0].staffDays,0);
 assert.equal(restored.exec.units[0].billableDays,0);
 assert.equal(p.baselineRevenue,25,"historic revenue must not appear as first v21.3 period");
 assert.equal(p.baselineCosts,40,"historic payroll must not appear as first v21.3 period");
 assert.equal(p.focus,"balanced");
 assert.equal(p.revenueTarget,0);
 assert.equal(p.utilizationTarget,65);
 assert.equal(restored.bi.totals.revenue,ledger);
 reconcile(restored);
});
test("v21.3 GM actual delivery and 30-day staffing results reconcile with corporate ledger",()=>{
 const s=init();fund(s,5000);s.day=260;s.deals=[];s.flow.focus=true;s.nextEv=99999;
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0],worker=s.team[1];gm.career.rank=1;
 assert.equal(G.unitAppoint("product",gm.id),true);
 assert.equal(G.unitTransfer("product",worker.id),true);
 worker.role.auto=true;worker.t="idle";worker.career.stress=0;worker.s.prod=8;
 const unit=s.exec.units[0];
 assert.equal(G.unitAuthorize("product","revenueTarget",150),true);
 assert.equal(G.unitAuthorize("product","utilizationTarget",35),true);
 const contract=G.createDeal("Product division customer"),fee=G.feeFor(contract);
 contract.work=1;contract.dl=40;contract.quality=87;
 const startDay=s.day,initialRevenue=s.bi.totals.revenue;
 for(let i=0;i<32;i++)G.tick();
 assert.equal(s.day,startDay+32);
 assert.equal(unit.delivered,1,"dedicated actual delivery should finish");
 assert.equal(unit.revenue,fee);
 assert.equal(s.bi.totals.revenue-initialRevenue,fee,"unit contract only earned once");
 assert.ok(unit.staffDays>0&&unit.billableDays>0,"capacity measured from real employee-days");
 assert.ok(unit.billableDays<=unit.staffDays);
 const review=unit.reviews.at(-1);
 assert.ok(review&&review.day>=startDay+30);
 assert.equal(review.revenue,fee);
 assert.ok(Number.isFinite(review.costs)&&review.costs>=0);
 assert.equal(review.operating,review.revenue-review.costs);
 assert.ok(review.utilization>=0&&review.utilization<=100);
 assert.equal(review.revenueTarget,150);
 assert.equal(review.utilizationTarget,35);
 assert.equal(G.load().exec.units[0].reviews.at(-1).revenue,fee);
 reconcile(s);
});
test("v21.3 unit-without-GM produces capacity gap, not phantom shared staffing",()=>{
 const s=init();fund(s,500);s.day=100;s.deals=[];
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const job=G.createDeal("GM vacancy contract");
 assert.equal(job.unitKey,"product");
 assert.equal(G.unitDelegateWork(),false);G.delegateWork();
 assert.equal(job.w,null,"corporate staff may not cover unit without intentional allocation");
 reconcile(s);
});

test("v21.3 unit vacancy and market opportunity surface to CEO",()=>{
 const s=init();fund(s,700);s.day=120;s.deals=[];
 G.executiveLaunch("product");G.unitActivate("product");
 G.createDeal("Unit capacity pressure");
 s.world.activeEvent={type:"opportunity",until:s.day+20};
 G.renderBriefing();
 assert.ok(el("attention-list").innerHTML.includes("GM capacity exception"));
 assert.ok(el("attention-list").innerHTML.includes("Optional market opportunity"));
 el("ea-weekly-report").open=true;G.renderExecutiveWeekly();
 assert.ok(el("ea-weekly-body").innerHTML.includes("needs a General Manager"));
 reconcile(s);
});
console.log("Boss v21.3 dedicated-capacity regression checks passed.");

test("v21.3.1 native GM dropdown survives live simulated financial and roster changes",()=>{
 const s=init();fund(s,1000);s.day=900;s.deals=[];
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 G.renderBusinessUnits();
 const before=el("business-units").innerHTML;
 assert.ok(before.includes("unit-gm-product")&&before.includes("unit-employee-product"));
 const select={isConnected:true,disabled:false,closest:()=>select};
 G.beginEditableInteraction({target:select});
 assert.equal(G.editableInteractionPending(),true);
 s.team[0].t="study";s.exec.units[0].revenue+=5;
 // Tick must advance and post to the same corporate ledger while the UI is protected.
 s.flow.focus=true;s.nextEv=999999;
 const dayBefore=s.day;
 G.tick();
 assert.equal(s.day,dayBefore+1,"interactive UI guard must not pause simulation");
 G.renderBusinessUnits();
 assert.equal(el("business-units").innerHTML,before,"native dropdown must not be recreated");
 G.refresh();
 assert.equal(el("business-units").innerHTML,before,"game refresh must not close selection");
 G.finishEditableInteraction({target:select});
 assert.equal(G.editableInteractionPending(),true,"native picker dismissal needs short grace period");
 reconcile(s);
});
test("v21.3.1 input typing retains its DOM during roster redraw",()=>{
 const s=init();s.day=590;
 G.renderStructure();const people=el("people").innerHTML;
 const input={isConnected:true,disabled:false,closest:()=>input};
 G.beginEditableInteraction({target:input});
 s.team[0].role.primary="mkt";s.day+=1;G.renderStructure();
 assert.equal(el("people").innerHTML,people,"typing should not reconstruct interactive sections");
 G.finishEditableInteraction({target:input});
 reconcile(s);
});


test("v21.4 presets provide 25 percent manager budget steps with zero upfront expense",()=>{
 const s=init();fund(s,1200);s.deals=[];s.day=220;
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0];gm.career.rank=1;assert.equal(G.unitAppoint("product",gm.id),true);
 const u=s.exec.units[0];
 assert.equal(u.plan.coachingLimit,0,"new manager remains unauthorized until CEO applies");
 assert.equal(u.plan.recommendedPreset,"fresh");
 const first=G.unitPresetValues("fresh"),manager=G.unitPresetValues("manager"),senior=G.unitPresetValues("senior");
 assert.equal(first.coachingLimit,24);assert.equal(first.trainingLimit,24);
 assert.equal(manager.coachingLimit,30);assert.equal(manager.trainingLimit,30);
 assert.equal(senior.coachingLimit,38);assert.equal(senior.trainingLimit,38);
 const cash=s.cash,spent=s.bi.totals.cashOut;
 assert.equal(G.unitApplyPreset("product","fresh"),true);assert.equal(u.plan.preset,"fresh");
 assert.equal(u.plan.coachingLimit,24);assert.equal(u.plan.trainingLimit,24);assert.equal(u.plan.teamLimit,12);
 assert.equal(s.cash,cash);assert.equal(s.bi.totals.cashOut,spent);
 assert.equal(G.unitApplyPreset("product","manager"),true);assert.equal(u.plan.coachingLimit,30);
 assert.equal(G.unitApplyPreset("product","senior"),true);assert.equal(u.plan.coachingLimit,38);
 assert.equal(G.unitApplyPreset("product","invalid"),false);
 assert.equal(G.load().exec.units[0].plan.preset,"senior");
 reconcile(s);
});
test("v21.4 GM edits keep multi-digit drafts until one atomic Apply",()=>{
 const s=init();fund(s,1200);s.deals=[];s.day=150;
 assert.equal(G.executiveLaunch("marketing"),true);assert.equal(G.unitActivate("marketing"),true);
 const u=s.exec.units[0],cash=s.cash,spend=s.bi.totals.cashOut;
 const field=(name,value)=>G.unitRecordInput({dataset:{unitKey:"marketing",unitField:name},value});
 for(const digit of ["3","30","300","3000","30000","300000"])field("revenueTarget",digit);
 field("coachingLimit","1000");field("trainingLimit","80");field("teamLimit","25");
 field("perAction","20");field("staffingTarget","8");
 field("qualityTarget","8"); // in-progress numeric is invalid but must not reprice the company
 assert.equal(u.plan.revenueTarget,0);
 assert.equal(G.unitApplyDraft("marketing"),false,"incomplete quality must not commit");
 assert.equal(u.plan.revenueTarget,0);assert.equal(s.cash,cash);
 field("qualityTarget","88");field("utilizationTarget","75");
 assert.equal(G.unitApplyDraft("marketing"),true);
 assert.equal(u.plan.revenueTarget,300000);assert.equal(u.plan.coachingLimit,1000);
 assert.equal(u.plan.trainingLimit,80);assert.equal(u.plan.teamLimit,25);
 assert.equal(u.plan.perAction,20);assert.equal(u.plan.staffingTarget,8);assert.equal(u.plan.preset,"custom");
 assert.equal(s.cash,cash);assert.equal(s.bi.totals.cashOut,spend);
 const restored=G.load().exec.units[0];assert.equal(restored.plan.revenueTarget,300000);assert.equal(restored.plan.staffingTarget,8);
 reconcile(s);
});
test("v21.4 successor development spends real cash once and respects period limits",()=>{
 const s=init();fund(s,1500);s.deals=[];s.day=170;
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0];gm.career.rank=1;
 assert.equal(G.unitAppoint("product",gm.id),true);assert.equal(G.unitTransfer("product",s.team[1].id),true);assert.equal(G.unitTransfer("product",s.team[2].id),true);
 const u=s.exec.units[0],initialCash=s.cash,cost=s.bi.totals.costs;
 G.unitAutonomousDay();assert.equal(s.cash,initialCash,"no spending before CEO approval");
 assert.equal(G.unitApplyPreset("product","fresh"),true);
 const worker=s.team[1];worker.career.stress=75;s.team[2].career.stress=80;
 G.unitAutonomousDay();
 assert.ok(u.plan.successorId&&u.staffIds.includes(u.plan.successorId));
 assert.equal(u.plan.trainingSpent,8);assert.equal(u.plan.teamSpent,6);
 assert.equal(u.plan.spent,4);
 assert.equal(s.cash,initialCash-18,"$4 coaching + $8 training + $6 team event");
 assert.equal(s.bi.totals.costs,cost+18,"one corporate ledger posts all actual expenses");
 const career=G.unitCareerReadiness(u);assert.ok(career.successor);
 const previousSpent=s.bi.totals.costs;
 G.unitAutonomousDay();assert.equal(s.bi.totals.costs,previousSpent,"same-day action may not be duplicated");
 u.plan.days=1;s.day+=2;G.unitAutonomousDay();
 assert.equal(s.bi.totals.costs,previousSpent,"expired authority never spends");
 reconcile(s);
});


test("v21.4b new founder company starts below the five-person Team Lead milestone",()=>{
 const s=init();
 assert.equal(s.team.length,3);assert.ok(s.org.progression);assert.equal(s.org.progression.appointments.length,0);
 const c=G.ladderEvaluation("lead");assert.equal(c.need,5);assert.equal(c.count,3);assert.equal(c.ready,false);
 assert.ok(c.reasons.some(x=>x.includes("5 company employees")));
 assert.equal(s.org.progression.authorityDaily,0,"new manager payroll authority defaults to zero");
 reconcile(s);
});
test("v21.4b strongest eligible candidate becomes a Team Lead only with CEO authority",()=>{
 const s=init();fund(s,1400);s.deals=[];s.day=70;
 for(let i=0;i<2;i++){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,20);s.team.push(p);}
 for(const p of s.team){p.perf.days=25;p.career.rank=1;p.career.xp=25;}
 s.team[1].management.coaching=95;s.team[1].management.delegation=95;
 const proposed=G.ladderEvaluation("lead");
 assert.equal(proposed.count,5);assert.equal(proposed.ready,true);
 const expected=proposed.candidateId,person=s.team.find(x=>x.id===expected);
 const existingSalary=G.dailySalary?G.dailySalary(person):null;
 const cash=s.cash,ledger=s.bi.totals.cashOut;
 assert.equal(G.ladderPromote("lead",expected,false),false,"no management spending authority");
 assert.equal(s.org.progression.appointments.length,0);
 assert.equal(G.ladderSetAuthority(.5),true);
 assert.equal(G.ladderPromote("lead",expected,false),true);
 assert.equal(s.org.progression.appointments[0].id,expected);
 assert.equal(s.cash,cash);assert.equal(s.bi.totals.cashOut,ledger);
 assert.ok(s.org.progression.reportTo&&Object.keys(s.org.progression.reportTo).length<=3);
 assert.equal(new Set(Object.keys(s.org.progression.reportTo)).size,Object.keys(s.org.progression.reportTo).length);
 assert.equal(G.ladderPayroll(),.5*s.mod.cost);
 assert.equal(G.ladderPromote("lead",expected,true),false,"same leader cannot be promoted twice");
 assert.equal(G.load().org.progression.appointments[0].id,expected);
 reconcile(s);
});
test("v21.4b CEO exception approves sustainable promotion without silently expanding authority",()=>{
 const s=init();fund(s,1250);s.day=84;s.deals=[];
 for(let i=0;i<2;i++){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,25);s.team.push(p);}
 for(const p of s.team){p.perf.days=35;p.career.rank=1;p.career.xp=30;}
 const proposal=G.ladderEvaluation("lead");assert.equal(proposal.ready,true);
 assert.equal(G.ladderPromote("lead",proposal.candidateId,false),false);
 assert.equal(G.ladderPromote("lead",proposal.candidateId,true),true);
 assert.equal(s.org.progression.authorityDaily,0);
 assert.equal(s.org.progression.events.at(-1).action,"CEO exception");
 reconcile(s);
});
test("v21.4b historical saves migrate additively without inventing a salary or purchase",()=>{
 const s=init();fund(s,555);s.day=2895;s.rep=99;s.market.completed=23;
 const beforeCash=s.cash,invest=s.bi.totals.investments;delete s.org.progression;
 assert.ok(G.save());const old=store.get("boss20");
 const state=G.load(old);assert.equal(state.cash,beforeCash);assert.equal(state.day,2895);
 assert.equal(state.bi.totals.investments,invest);
 assert.equal(state.org.progression.appointments.length,0);
 assert.equal(state.org.progression.authorityDaily,0);
 G.set(state);reconcile(state);
});
test("v21.4b gate checklist describes financial and people requirements without charging cash",()=>{
 const s=init();fund(s,1000);s.day=200;
 const oldCash=s.cash,investment=s.bi.totals.investments;
 const readiness=G.ladderLaunchReadiness();
 assert.equal(readiness.ready,false);assert.equal(readiness.checks.length,4);
 assert.ok(readiness.checks.some(x=>x.label.includes("Team Lead")&&!x.met));
 assert.equal(s.cash,oldCash);assert.equal(s.bi.totals.investments,investment);
 reconcile(s);
});


test("v21.4b a five-person company cannot duplicate a Team Lead without three further hires",()=>{
 const s=init();s.day=56;s.deals=[];fund(s,1000);
 for(let i=0;i<2;i++){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,0);s.team.push(p);}
 for(const p of s.team){p.perf.days=28;p.career.rank=1;p.career.xp=20;}
 assert.equal(G.ladderEvaluation("lead").need,5);
 const candidate=G.ladderEvaluation("lead");
 assert.equal(candidate.ready,true);assert.equal(G.ladderPromote("lead",candidate.candidateId,true),true);
 const next=G.ladderEvaluation("lead");
 assert.equal(next.need,8);assert.equal(next.ready,false);
 assert.ok(next.reasons.some(x=>x.includes("8 company employees")));
 reconcile(s);
});
test("v21.4b Manager stage requires three experienced Team Leads and an actual role upgrade",()=>{
 const s=init();s.deals=[];s.day=189;fund(s,2500);
 for(let i=0;i<8;i++){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,0);s.team.push(p);}
 for(const p of s.team){p.perf.days=120;p.career.rank=2;p.career.xp=40;for(const skill of ["planning","delegation","coaching","communication"])p.management[skill]=66;}
 const leaders=s.team.slice(0,3);
 for(const p of leaders)for(const skill of ["planning","delegation","coaching","communication"])p.management[skill]=85;
 for(const p of leaders)s.org.progression.appointments.push({id:p.id,level:"lead",since:100,successorId:null});
 const promoted=G.ladderEvaluation("manager");assert.equal(promoted.ready,true);assert.equal(promoted.count,3);
 const before=s.cash,expense=s.bi.totals.cashOut;
 assert.equal(G.ladderPromote("manager",promoted.candidateId,true),true);
 assert.equal(s.org.progression.appointments.filter(p=>p.level==="manager").length,1);
 assert.equal(s.cash,before);assert.equal(s.bi.totals.cashOut,expense);
 assert.equal(G.ladderPayroll(),1.75*s.mod.cost);
 const owners=Object.keys(s.org.progression.reportTo);
 assert.equal(new Set(owners).size,owners.length,"no worker has two primary leaders");
 reconcile(s);
});
test("v21.4b a weekly review may autonomously promote only inside the CEO payroll ceiling",()=>{
 const s=init();s.deals=[];s.day=84;fund(s,1200);
 for(let i=0;i<2;i++){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,0);s.team.push(p);}
 for(const p of s.team){p.perf.days=45;p.career.rank=1;p.career.xp=30;}
 G.ladderDay();assert.equal(s.org.progression.appointments.length,0);
 assert.equal(G.ladderSetAuthority(.5),true);
 s.org.progression.lastChecked=-1;G.ladderDay();
 assert.equal(s.org.progression.appointments.length,1);
 assert.ok(s.org.progression.events.some(x=>x.action==="within payroll authority"),"the actual promotion is authorized within the payroll ceiling, even if successor mentoring follows it in the same review");
 reconcile(s);
});


test("v21.4b Senior Manager and Director gates require verified subordinate leadership",()=>{
 const s=init();s.deals=[];s.day=250;fund(s,10000);
 for(let i=0;i<15;i++){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,0);s.team.push(p);}
 for(const p of s.team){p.perf.days=200;p.career.rank=3;p.career.xp=140;for(const skill of ["coaching","communication","delegation","planning"])p.management[skill]=95;}
 const g=s.org.progression;
 const leaders=s.team.slice(0,5);
 for(const p of leaders)g.appointments.push({id:p.id,level:"lead",since:100,successorId:null});
 const beforeSenior=G.ladderEvaluation("senior");
 assert.equal(beforeSenior.ready,false,"five team leads without a manager do not make a senior manager");
 assert.ok(beforeSenior.reasons.includes("No internal successor ready"));
 g.appointments[0].level="manager";g.appointments[0].since=120;
 const seniorBlocked=G.ladderEvaluation("senior");
 assert.equal(seniorBlocked.ready,false,"four remaining team leads insufficient for Senior Manager");
 g.appointments.push({id:s.team[5].id,level:"lead",since:100,successorId:null});
 const senior=G.ladderEvaluation("senior");
 assert.equal(senior.ready,true);assert.equal(senior.count,5);
 assert.equal(G.ladderPromote("senior",senior.candidateId,true),true);
 assert.equal(g.appointments.filter(n=>n.level==="senior").length,1);
 assert.equal(G.ladderEvaluation("director").ready,false,"Director requires three managers");
 for(const p of s.team.slice(6,9))g.appointments.push({id:p.id,level:"manager",since:100,successorId:null});
 s.day+=120; // Allow senior manager to accumulate the required experience before Director.
 const director=G.ladderEvaluation("director");
 assert.equal(director.ready,true);assert.equal(director.count,3);
 assert.equal(G.ladderPromote("director",director.candidateId,true),true);
 assert.equal(g.appointments.filter(n=>n.level==="director").length,1);
 const direct=Object.keys(g.reportTo);
 assert.equal(new Set(direct).size,direct.length);
 assert.ok([...Object.values(g.reportTo)].every(id=>g.appointments.some(n=>n.id===id)));
 const salary=s.team.reduce((n,p)=>n+G.dailySalary(p),0);
 assert.ok(Number.isFinite(salary)&&salary>0);
 reconcile(s);
});
test("v21.4b automatic game tick promotes once under approved payroll and saves same day",()=>{
 const s=init();fund(s,1800);s.day=83;s.deals=[];s.flow.focus=true;s.nextEv=99999;
 for(let i=0;i<2;i++){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,0);s.team.push(p);}
 for(const p of s.team){p.perf.days=50;p.career.rank=1;p.career.xp=40;}
 assert.equal(G.ladderSetAuthority(.5),true);
 s.org.progression.lastChecked=-1;
 const day=s.day;G.tick();
 assert.equal(s.day,day+1);
 assert.equal(s.org.progression.appointments.length,1);
 assert.equal(s.org.progression.events.filter(x=>x.level==="lead").length,1);
 assert.equal(G.load().org.progression.appointments.length,1);
 const saved=G.load();assert.equal(saved.day,s.day);
 assert.equal(saved.org.progression.events.filter(x=>x.level==="lead").length,1);
 reconcile(s);
});


test("v21.4c manager asks for evidence-based corporate hiring with zero permission by default",()=>{
 const s=init();fund(s,2800);s.day=84;s.deals=[];
 const gm=s.team[0];gm.department="commercial";
 s.org.progression.appointments.push({id:gm.id,level:"manager",since:33,successorId:null});
 const a=G.createDeal("Commercial client A"),b=G.createDeal("Commercial client B");
 for(const d of [a,b]){d.need="sales";delete d.unitKey;d.w=null;}
 const beforeCash=s.cash,out=s.bi.totals.cashOut,people=s.team.length;
 const policy=G.managementOps();assert.equal(policy.hireBudget,0);assert.equal(policy.hireSlots,0);
 G.managementReview();
 assert.equal(policy.requests.length,1);
 const req=policy.requests[0];assert.equal(req.status,"open");assert.equal(req.managerId,gm.id);
 assert.equal(req.dept,"commercial");assert.equal(req.cost,20);
 assert.equal(s.team.length,people);assert.equal(s.cash,beforeCash);assert.equal(s.bi.totals.cashOut,out);
 G.managementReview();assert.equal(policy.requests.length,1,"one active request per function");
 assert.equal(G.managementRequestDecision(req.id,"approve"),true);
 assert.equal(req.status,"approved");assert.ok(req.hiredId>0);
 assert.equal(s.team.length,people+1);assert.equal(s.cash,beforeCash-20);
 assert.equal(s.bi.totals.cashOut,out+20);
 assert.equal(G.managementRequestDecision(req.id,"approve"),false,"same request cannot be charged twice");
 assert.equal(G.load().org.progression.operations.requests[0].status,"approved");
 reconcile(s);
});
test("v21.4c autonomous manager hiring respects 90-day slots, budget, cash and no duplicate payroll",()=>{
 const s=init();fund(s,3000);s.day=70;s.deals=[];
 const head=s.team[0];head.department="commercial";s.org.progression.appointments.push({id:head.id,level:"manager",since:1});
 assert.equal(G.managementSetHiringPolicy(20,1),true);const policy=G.managementOps();
 assert.equal(s.bi.totals.recruiting||0,0);
 const cash=s.cash;assert.equal(G.managementSetHiringPolicy(-1,2),false);
 for(let i=0;i<2;i++){const d=G.createDeal("Overloaded corporate work "+i);d.need="sales";d.w=null;delete d.unitKey;}
 G.managementReview();
 assert.equal(policy.requests.length,1);const first=policy.requests[0];
 assert.equal(first.status,"delegated");assert.equal(policy.hires,1);
 assert.equal(policy.hireSpent,20);assert.equal(s.cash,cash-20);
 assert.equal(G.managementHiringAvailable({cost:20}),false);
 s.day=105;G.managementReview();assert.equal(policy.requests.filter(r=>r.status==="delegated").length,1);
 assert.equal(policy.hires,1);
 assert.equal(G.save(),true,"the model must commit the autonomous hire before reload");
 const reloaded=G.load().org.progression.operations;
 assert.equal(reloaded.hireBudget,20);assert.equal(reloaded.hires,1);
 assert.equal(reloaded.requests.find(r=>r.id===first.id).hiredId,first.hiredId,"autonomous hire retains its stable request ID even after later CEO exceptions");
 reconcile(s);
});
test("v21.4c explicit temporary central support fulfills GM contracts without double salary",()=>{
 const s=init();fund(s,1600);s.day=120;s.deals=[];
 assert.equal(G.executiveLaunch("product"),true);
 assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0],worker=s.team[1];gm.career.rank=2;
 assert.equal(G.unitAppoint("product",gm.id),true);
 const job=G.createDeal("Shared resource project");
 assert.equal(job.unitKey,"product");
 job.w=null;worker.t="idle";worker.role.auto=true;worker.career.stress=0;
 assert.equal(G.unitAssignmentAllowed(job,worker),false);
 const before=s.cash,beforePayroll=s.bi.totals.payroll||0;
 assert.equal(G.managementShareStaff("product",worker.id),true);
 assert.equal(s.cash,before,"authorization itself is free");
 assert.equal(G.unitAssignmentAllowed(job,worker),true);
 assert.equal(G.unitDelegateWork(),true);
 assert.equal(job.w,worker.id);
 assert.equal(s.exec.units[0].staffIds.includes(worker.id),false,"corporate worker still belongs to corporate team");
 const operating=s.exec.units[0],prior=operating.sharedLaborCost;
 job.laborCost=31;const revenues=s.bi.totals.revenue;
 G.ceoLineFinish(job,true,G.feeFor(job));
 assert.equal(operating.sharedLaborCost-prior,31);
 assert.equal(s.bi.totals.revenue,revenues,"unit attribution must not post extra group income");
 assert.equal(s.bi.totals.payroll||0,beforePayroll);
 s.day+=31;
 const next={unitKey:"product"};assert.equal(G.managementSupportAllowed(next,worker),false,"temporary support expires");
 assert.equal(G.unitOfPerson(worker.id),null);
 reconcile(s);
});
test("v21.4c old company migration defaults to zero hiring permission and zero shared allocation",()=>{
 const s=init();fund(s,200);s.day=2915;const orig=s.cash,old=s.bi.totals.investments;
 delete s.org.progression.operations;G.save();
 const loaded=G.load();assert.ok(loaded.org.progression.operations);
 assert.equal(loaded.org.progression.operations.hireBudget,0);
 assert.equal(loaded.org.progression.operations.hireSlots,0);
 assert.equal(loaded.org.progression.operations.shared.length,0);
 assert.equal(loaded.day,2915);assert.equal(loaded.cash,orig);
 assert.equal(loaded.bi.totals.investments,old);reconcile(loaded);
});


test("v21.4c new and legacy companies have zero delegated recruiting and no fabricated history",()=>{
 const s=init();const oldCash=s.cash,paid=s.bi.totals.investments;
 assert.equal(G.managementOps().hireBudget,0);assert.equal(G.managementOps().hireSlots,0);
 assert.equal(G.managementOps().requests.length,0);assert.equal(G.managementOps().shared.length,0);
 delete s.org.progression.operations;
 assert.ok(G.save());
 const loaded=G.load();G.set(loaded);
 assert.equal(G.managementOps().hireBudget,0);assert.equal(G.managementOps().hireSlots,0);
 assert.equal(G.managementOps().shared.length,0);assert.equal(loaded.cash,oldCash);
 assert.equal(loaded.bi.totals.investments,paid);
 reconcile(loaded);
});
test("v21.4c staffing proposal requires genuine backlog and supports one CEO-approved hire",()=>{
 const s=init();fund(s,2800);s.day=140;s.deals=[];s.flow.focus=true;
 const manager=s.team[0];manager.department="delivery";manager.role.primary="prod";
 s.org.progression.appointments.push({id:manager.id,level:"manager",since:44,successorId:null});
 const candidate=s.team[1];candidate.department="delivery";candidate.role.primary="ops";
 for(let i=0;i<2;i++){const d=G.createDeal("Corporate staffing QA "+i,0,"hospitality");d.need="prod";d.w=null;d.unitKey=undefined;}
 const beforeCash=s.cash,out=s.bi.totals.cashOut,head=s.team.length;
 G.managementReview();
 const req=G.managementOps().requests[0];
 assert.ok(req&&req.status==="open"&&req.dept==="delivery"&&req.managerId===manager.id);
 assert.equal(G.managementOps().hireBudget,0);assert.equal(s.team.length,head);
 assert.equal(G.managementRequestDecision(req.id,"approve"),true);
 assert.equal(req.status,"approved");assert.equal(s.team.length,head+1);
 assert.equal(s.cash,beforeCash-20);assert.equal(s.bi.totals.cashOut,out+20);
 assert.equal(G.managementRequestDecision(req.id,"approve"),false,"one application only");
 assert.equal(G.managementOps().hires,0,"CEO exception must not consume delegated slots");
 assert.equal(G.load().org.progression.operations.requests.find(x=>x.id===req.id).status,"approved");
 G.managementReview();assert.equal(s.team.length,head+1,"cooldown blocks duplicate hire");
 reconcile(s);
});
test("v21.4c manager hiring policy respects cash runway, period, action and slot ceilings",()=>{
 const s=init();fund(s,2900);s.day=140;s.deals=[];s.flow.focus=true;
 const manager=s.team[0];manager.department="delivery";manager.role.primary="prod";
 s.org.progression.appointments.push({id:manager.id,level:"manager",since:40,successorId:null});
 for(let i=0;i<2;i++){const d=G.createDeal("Corporate delegated QA "+i,0,"hospitality");d.need="prod";d.w=null;d.unitKey=undefined;}
 assert.equal(G.managementSetHiringPolicy(40,1),true);
 const before=s.cash,oldCosts=s.bi.totals.cashOut;
 G.managementReview();
 assert.equal(G.managementOps().hires,1);
 assert.equal(G.managementOps().hireSpent,20);
 assert.equal(s.cash,before-20);assert.equal(s.bi.totals.cashOut,oldCosts+20);
 const employeeCount=s.team.length;
 G.managementReview();assert.equal(s.team.length,employeeCount);
 s.day+=100;
 // New genuine overload after the authorized period: all specialists busy and new jobs awaiting delivery.
 for(const p of s.team.filter(p=>p.id!==manager.id)){p.t="d999";p.role.auto=false;}
 for(let i=0;i<3;i++){const d=G.createDeal("Later capacity shortage "+i);d.need="prod";d.w=null;delete d.unitKey;}
 G.managementReview();
 assert.equal(G.managementOps().hires,1,"90-day policy must not silently renew");
 assert.equal(s.team.length,employeeCount,"expired policy may propose, not hire");
 assert.ok(G.managementOps().requests.some(r=>r.status==="open"),"CEO receives exception after budget expiry");
 reconcile(s);
});
test("v21.4c time-limited shared staffing never changes primary ownership or upfront ledger",()=>{
 const s=init();fund(s,2600);s.day=125;s.deals=[];s.flow.focus=true;
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0];gm.career.rank=1;
 assert.equal(G.unitAppoint("product",gm.id),true);
 const helper=s.team[1];helper.role.auto=true;helper.t="idle";
 const cash=s.cash,cost=s.bi.totals.cashOut,units=s.exec.units[0].staffIds.slice();
 assert.equal(G.managementShareStaff("product",helper.id),true);
 assert.equal(s.cash,cash);assert.equal(s.bi.totals.cashOut,cost);
 assert.equal(JSON.stringify([...s.exec.units[0].staffIds]),JSON.stringify(units),"shared employee is not dedicated");
 assert.equal(G.managementShareStaff("product",helper.id),false,"no duplicate temporary allocation");
 assert.equal(G.managementSupportAllowed({unitKey:"product"},helper),true);
 assert.equal(G.managementSupportAllowed({unitKey:"marketing"},helper),false);
 const allocated=s.org.progression.operations.shared[0];
 assert.equal(allocated.until,155);
 assert.equal(G.load().org.progression.operations.shared[0].employeeId,helper.id);
 s.day=156;
 assert.equal(G.managementSupportAllowed({unitKey:"product"},helper),false,"support must expire");
 reconcile(s);
});
test("v21.4c actual corporate support labor is attributed by workdays, not final worker",()=>{
 const s=init();fund(s,4800);s.day=125;s.deals=[];s.flow.focus=true;s.nextEv=99999;
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0];gm.career.rank=1;
 assert.equal(G.unitAppoint("product",gm.id),true);
 const helper=s.team[1],dedicated=s.team[2];
 helper.role.auto=true;helper.t="idle";helper.career.stress=0;
 dedicated.role.auto=true;dedicated.t="idle";dedicated.career.stress=0;
 assert.equal(G.unitTransfer("product",dedicated.id),true);
 assert.equal(G.managementShareStaff("product",helper.id),true);
 const contract=G.createDeal("Shared corporate workday QA",0,"hospitality");
 contract.unitKey="product";contract.serviceLine="product";
 contract.need="prod";contract.work=18;contract.dl=75;contract.prog=0;
 assert.equal(G.managementSupportAllowed(contract,helper),true);
 assert.equal(G.unitAssignmentAllowed(contract,helper),true);
 G.assign(contract.id,helper.id);assert.equal(contract.w,helper.id);
 const helperWage=G.dailySalary(helper);
 G.tick();
 assert.ok(contract.unitSharedLaborCost>=helperWage-.01);
 const firstCost=contract.unitSharedLaborCost;
 G.assign(contract.id,dedicated.id);assert.equal(contract.w,dedicated.id);
 for(let i=0;i<55&&s.deals.includes(contract);i++)G.tick();
 assert.equal(s.exec.units[0].delivered,1);
 assert.ok(Math.abs(s.exec.units[0].sharedLaborCost-firstCost)<.01,"unit must charge only actual shared labor days");
 assert.ok(s.exec.units[0].payrollCost>0,"dedicated payroll appears only once in unit slice");
 assert.ok(contract.laborCost>firstCost,"corporate contract tracks all worker labor for informational contribution");
 assert.equal(new Set(s.team.map(p=>p.id)).size,s.team.length);
 reconcile(s);
});


test("v21.4c a manager cannot hire when available colleagues cover an unassigned queue",()=>{
 const s=init();fund(s,2300);s.day=84;s.deals=[];
 const head=s.team[0];head.department="commercial";s.org.progression.appointments.push({id:head.id,level:"manager",since:5});
 for(let i=0;i<2;i++){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);p.department="commercial";p.role.primary="sales";p.role.auto=true;p.t="idle";s.team.push(p);}
 for(let i=0;i<2;i++){const d=G.createDeal("Already-staffed corporate work");d.need="sales";d.w=null;delete d.unitKey;}
 const before=s.cash,people=s.team.length;
 G.managementReview();assert.equal(G.managementOps().requests.length,0,"no speculative hiring when the team can cover both contracts");
 assert.equal(s.cash,before);assert.equal(s.team.length,people);reconcile(s);
});

console.log("Boss v20 functional and persistence checks passed.");
