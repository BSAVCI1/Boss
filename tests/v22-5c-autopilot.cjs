// v22.5C — actual offline game-engine acceptance: executed work and blocked authority.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
const boot=code.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
const store=new Map(),els=new Map();
function el(id){if(!els.has(id))els.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,open:false,hidden:false,disabled:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},setAttribute(){},removeAttribute(){},scrollIntoView(){},focus(){},parentNode:{open:true}});return els.get(id);}
const box={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Set,Map,console};
vm.createContext(box);
vm.runInContext(code.slice(0,boot)+
 "globalThis.G={fresh,get:()=>S,load,save,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,managementCOODay,unitDelegateWork,unitStaffingDay,unitRequestDecision,managementAutopilotReconcile,managementOps,managementHire,managementHiringAvailable,managementCashReady,managementRequestLive,managementOutcomeCards,managementFinanceExplanation,ceoDecisionInventory,executiveOfficerDay,executiveOfficer,executiveFinanceGuard,renderCEOFocus,dailySalary};})();",box,{timeout:10000});
const G=box.G;
function reset(){store.clear();G.fresh();return G.get();}
function add(s,role="ops"){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);p.role.primary=role;p.department=["sales","mkt"].includes(role)?"commercial":"delivery";p.role.auto=true;s.team.push(p);return p;}
function fund(s,value){s.cash+=value;s.bi.openingCash+=value;}
function ledger(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.07,"one real cash ledger");}
function test(name,fn){fn();console.log("PASS v22.5C "+name);}
function unitSetup({coo=true,specialist=true}={}){
 const s=reset(),gm=add(s),leader=add(s),worker=specialist?add(s):null;
 if(worker)worker.s.ops=3;
 for(const d of s.deals){d.unitKey="operations";d.need="ops";d.w=null;d.dl=5;}
 s.exec.lines.push({key:"operations",since:0});
 s.exec.units.push({key:"operations",managerId:gm.id,staffIds:[gm.id],
  plan:{lastSharedNegotiation:-99,staffingTarget:5,lastHiringAsk:-99,lastStaffingReview:-99},reviews:[]});
 if(coo){s.exec.officers.coo.id=leader.id;s.exec.officers.coo.mandate=true;s.exec.officers.coo.authoritySince=s.day;}
 return{s,gm,leader,worker};
}
test("founder without executives remains functional",()=>{
 const s=reset(),before=s.team.length;assert.equal(G.managementCOODay(),false);
 assert.equal(G.managementOutcomeCards().length,0);assert.equal(s.team.length,before);
 assert.ok(G.ceoDecisionInventory());ledger(s);
});
test("COO shares existing qualified specialist and GM dispatches real work exactly once",()=>{
 const {s,leader,worker}=unitSetup(),ids=s.team.map(p=>p.id),cash=s.cash;
 const assignedBefore=s.deals.filter(d=>d.w).length;
 assert.equal(G.managementCOODay(),true);
 assert.equal(G.unitDelegateWork(),true);
 assert.equal(G.managementCOODay(),false);
 const grant=G.managementOps().shared.filter(x=>x.approvedBy===leader.id);
 assert.equal(grant.length,1);assert.equal(grant[0].employeeId,worker.id);
 const executed=G.managementOps().history.filter(x=>x.kind==="coo-dispatch");
 assert.equal(executed.length,1);assert.equal(executed[0].dealId,s.deals[0].id);
 assert.equal(s.deals.filter(d=>d.w).length,assignedBefore+1);
 assert.equal(s.exec.units[0].staffIds.includes(worker.id),false);
 assert.deepEqual(s.team.map(p=>p.id),ids);assert.equal(s.cash,cash);
 assert.match(G.managementOutcomeCards().join(" "),/COO assigned shared specialist/);
 ledger(s);
});
test("expired and revoked COO have no ability to share",()=>{
 let v=unitSetup();v.s.day=91;assert.equal(G.managementCOODay(),false);assert.equal(G.managementOps().shared.length,0);
 v=unitSetup();v.s.exec.officers.coo.mandate=false;assert.equal(G.managementCOODay(),false);
});
test("no qualified idle specialist produces one real canonical exception, not phantom work",()=>{
 const {s}=unitSetup({specialist:false});for(const p of s.team)p.s.ops=1;
 assert.equal(G.managementCOODay(),false);assert.equal(G.unitDelegateWork(),false);
 assert.equal(G.unitStaffingDay(),true);assert.equal(s.exec.unitRequests.length,1);
 assert.equal(s.exec.unitRequests[0].status,"open");
 assert.equal(G.unitStaffingDay(),false);assert.equal(s.exec.unitRequests.length,1);
 assert.ok(s.deals.every(d=>!d.w));assert.equal(s.team.length,5);
 assert.equal(G.ceoDecisionInventory().unit.length,1);
});
test("explicit player assignment cannot be displaced by COO",()=>{
 const {s,worker}=unitSetup();s.deals[0].w=worker.id;worker.t="d"+s.deals[0].id;
 const other=s.deals[1];other.dl=15;assert.equal(G.managementCOODay(),false);
 assert.equal(s.deals[0].w,worker.id);assert.equal(G.managementOps().shared.length,0);
});
test("CEO decline is canonical; no unauthorized hire or immediate repeated request",()=>{
 const {s}=unitSetup({specialist:false});for(const p of s.team)p.s.ops=1;
 G.unitStaffingDay();const req=s.exec.unitRequests[0],count=s.team.length;
 assert.equal(G.unitRequestDecision(req.id,"decline"),true);
 assert.equal(req.status,"declined");assert.equal(s.team.length,count);
 assert.equal(G.ceoDecisionInventory().unit.length,0);
 s.day++;G.unitStaffingDay();assert.equal(s.exec.unitRequests.length,1);ledger(s);
});
test("corporate slots zero prohibit delegated hire even with positive budget",()=>{
 const s=reset(),o=G.managementOps();o.hireBudget=400;o.hireSlots=0;o.perHire=20;
 assert.equal(G.managementHiringAvailable({cost:20,payroll:1.5}),false);
});
test("genuine manager-approved hire executes once and writes one recruiting expense",()=>{
 const s=reset(),manager=add(s);manager.department="delivery";
 s.org.progression.appointments.push({id:manager.id,level:"manager",since:0});
 for(const d of s.deals){d.unitKey=null;d.need="ops";d.w=null;}
 fund(s,15000);const o=G.managementOps();o.since=0;o.days=90;o.hireBudget=20;o.hireSlots=1;o.perHire=20;
 const req={id:123,status:"open",dept:"delivery",managerId:manager.id,skill:"ops",cost:20,payroll:1.5,day:0};o.requests.unshift(req);
 const before=s.team.length,cash=s.cash;
 assert.equal(G.managementHire(req,"delegated"),true);
 assert.equal(G.managementHire(req,"delegated"),false);
 assert.equal(s.team.length,before+1);assert.equal(cash-s.cash,20);assert.equal(o.hires,1);
 assert.equal(o.history.filter(x=>x.kind==="hire"&&x.employeeId===req.hiredId).length,1);
 assert.match(G.managementOutcomeCards().join(" "),/Manager hired colleague/);ledger(s);
});
test("active HR executes real zero-cost recovery, inactive HR cannot claim it",()=>{
 const s=reset(),hr=add(s),worker=add(s);
 s.day=7;worker.career.stress=80;worker.t="idle";
 s.exec.officers.hr.id=hr.id;s.exec.officers.hr.mandate=true;s.exec.officers.hr.authoritySince=0;
 G.executiveOfficerDay();assert.equal(worker.t,"rest");
 const h=G.managementOps().history.find(x=>x.kind==="hr-recovery");
 assert.equal(h.managerId,hr.id);assert.equal(h.cost,0);assert.equal(h.employeeId,worker.id);
 assert.match(G.managementOutcomeCards().join(" "),/HR arranged recovery/);
 s.exec.officers.hr.mandate=false;worker.t="idle";worker.career.autoRest=false;worker.career.stress=80;s.day=14;
 const count=G.managementOps().history.length;G.executiveOfficerDay();assert.equal(G.managementOps().history.length,count);
 ledger(s);
});
test("CFO safeguards incremental 30-day payroll even where current reserve remains",()=>{
 const s=reset(),cfo=add(s);s.exec.officers.cfo.id=cfo.id;s.exec.officers.cfo.mandate=true;s.exec.officers.cfo.authoritySince=0;
 const o=G.managementOps();o.since=0;o.days=90;o.hireBudget=200;o.hireSlots=2;o.perHire=20;
 const req={cost:20,payroll:1.5},base=s.team.reduce((v,p)=>v+G.dailySalary(p),0);
 const cash=base*30+20+1;fund(s,cash-s.cash);
 assert.equal(G.executiveFinanceGuard(20),true);
 assert.equal(G.managementHiringAvailable(req),false);
 assert.match(G.managementFinanceExplanation(req),/CFO 30-day/);
 ledger(s);
});
test("save/reload preserves bounded management outcomes and single-identity staffing",()=>{
 const {s}=unitSetup();G.managementCOODay();G.unitDelegateWork();
 const saved=JSON.stringify(s),loaded=G.load(saved);
 assert.equal(loaded.org.progression.operations.history.filter(x=>x.kind==="coo-dispatch").length,1);
 assert.equal(new Set(loaded.team.map(p=>p.id)).size,loaded.team.length);
 assert.equal(loaded.org.progression.operations.shared.length,1);
 ledger(s);
});
console.log("v22.5C actual-engine autonomous/blocked scenarios finished.");
