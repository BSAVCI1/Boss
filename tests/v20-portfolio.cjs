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
const exported="fresh,load,get:()=>S,set:x=>S=x,save,createDeal,feeFor,executiveLaunch,ceoLineFinish,chooseServiceOffer,teamReportingGroups,renderStructure,renderExecutiveWeekly,executiveWeek,executiveProposal,executiveAutonomous,orgSubManager,orgManager,orgSubReports,orgDirectReports,orgChooseManager,createPerson,ensureRole,ensureCareer,ensureDepartment,ensurePerformance,tick";
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
console.log("Boss v20 functional and persistence checks passed.");
