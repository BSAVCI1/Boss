// Boss v20: real offers, recoverable investment, grouped people, briefing and safe browser saves.
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
assert.equal((html.match(/<script\b/g)||[]).length,1,"offline single-file contract");
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const m of script.matchAll(/\$\("([^"]+)"\)/g))assert.ok(ids.has(m[1]),"Missing "+m[1]);
const store=new Map(),elements=new Map();
function el(id){if(!elements.has(id))elements.set(id,{id,open:false,innerHTML:"",textContent:"",value:"",hidden:false,checked:false,disabled:false,style:{},dataset:{},parentNode:{open:true},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},getContext(){return new Proxy({},{get:()=>()=>{}})},querySelectorAll(){return []},querySelector(){return null},setAttribute(){},removeAttribute(){},focus(){},scrollIntoView(){}});return elements.get(id)}
const sandbox={document:{getElementById:el,querySelector:()=>el("selector"),querySelectorAll:()=>[],documentElement:el("html"),body:el("body"),addEventListener(){},activeElement:null},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},clearInterval(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Math,Date,Set,Map,JSON,console};
vm.createContext(sandbox);
const boot=script.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
const exported="fresh,load,get:()=>S,set:x=>S=x,save,createDeal,feeFor,executiveLaunch,ceoLineFinish,chooseServiceOffer,teamReportingGroups,renderStructure,renderExecutiveWeekly,executiveShow,executiveWeek,executiveProposal,executiveAutonomous,orgSubManager,orgManager,orgSubReports,orgDirectReports,orgPersonPosition,orgChooseManager,orgChangePolicy,unitActivate,unitAppoint,unitTransfer,unitRelease,unitOfPerson,unitPayrollDay,unitGMEligible,unitStaffEligible,draftExecutiveDirection,gameAdvanceDays,createPerson,ensureRole,ensureCareer,ensureDepartment,ensurePerformance,tick";
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
 assert.equal(s.exec.units.length,0);
 assert.equal(G.get().exec.units.length,0);
 assert.equal(G.get().cash,cash);assert.equal(store.get("boss20"),old);
});

console.log("Boss v20 functional and persistence checks passed.");
