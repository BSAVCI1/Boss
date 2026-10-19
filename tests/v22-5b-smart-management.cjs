// v22.5B — exercise the actual offline Boss game script and ledger.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
const boot=code.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
const store=new Map(),els=new Map();let failWrites=false;
function el(id){if(!els.has(id))els.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,open:false,hidden:false,disabled:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},setAttribute(){},removeAttribute(){},scrollIntoView(){},focus(){},parentNode:{open:true}});return els.get(id);}
const box={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>{if(failWrites)throw Error("Storage unavailable");store.set(k,v)},removeItem:k=>store.delete(k)},setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Set,Map,console};
vm.createContext(box);
vm.runInContext(code.slice(0,boot)+"globalThis.G={fresh,load,save,get:()=>S,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,ensurePeopleCulture,peopleCultureNeed,cultureEligibility,runPeopleCulture,cultureDeliveryFactor,executiveManagementDigest,executiveOfficerDay,executiveOfficer,managementOps,managementHiringAvailable,renderCEODecisions,renderCEOFocus};})();",box,{timeout:10000});
const G=box.G;
function fresh(){failWrites=false;store.clear();G.fresh();return G.get();}
function staff(s,n){while(s.team.length<n){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);s.team.push(p);}}
function fund(s,amount){s.cash+=amount;s.bi.openingCash+=amount;}
function ledger(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.07,"cash and complete ledger must reconcile");}
function test(name,fn){fn();console.log("PASS v22.5B "+name);}
assert.ok(html.includes('data-people-culture')&&html.includes('data-ceo-action="culture"'));
test("founder receives contextual advice, no automatic spending",()=>{
 const s=fresh(),snap=JSON.stringify(s);assert.equal(G.peopleCultureNeed(),null);G.renderCEODecisions();
 assert.equal(JSON.stringify(s),snap);ledger(s);
});
test("three distinct activity prices, eligibility and realistic production capacity",()=>{
 const s=fresh();
 assert.equal(G.cultureEligibility("dinner").cost,s.team.length*7);
 assert.equal(G.cultureEligibility("outing").cost,s.team.length*12);
 assert.equal(G.cultureEligibility("training").cost,s.team.length*16);
 for(const p of s.team)p.mood=40;
 assert.equal(G.peopleCultureNeed().kind,"dinner");
 const before=s.cash,original=s.bi.totals.cashOut,ids=s.team.map(p=>p.id);
 assert.equal(G.runPeopleCulture("dinner"),true);
 assert.equal(before-s.cash,s.team.length*7);
 assert.equal(s.bi.totals.cashOut-original,s.team.length*7);
 assert.equal(s.hr.culture.history.length,1);
 assert.equal(s.hr.culture.history[0].approvedBy,"CEO");
 assert.deepEqual(s.team.map(p=>p.id),ids);
 assert.equal(G.runPeopleCulture("dinner"),false);
 assert.equal(G.runPeopleCulture("training"),false);
 assert.equal(s.hr.culture.history.length,1);
 s.day=1;assert.equal(G.cultureDeliveryFactor(s.team[0]),.90);
 s.day=2;assert.equal(G.cultureDeliveryFactor(s.team[0]),1);
 ledger(s);
});
test("mature team training improves skills without creating positions, income or payroll",()=>{
 const s=fresh();staff(s,27);fund(s,3600000);s.day=4900;
 for(const p of s.team)p.mood=40;
 const payroll=s.team.reduce((n,p)=>n+1.5+(p.career.rank||0)*.75,0);
 const prev=s.team.map(p=>({id:p.id,skills:Object.values(p.s).reduce((v,x)=>v+x,0)}));
 const oldRevenue=s.bi.totals.revenue,oldCompleted=s.market.completed;
 assert.equal(G.runPeopleCulture("training"),true);
 assert.equal(s.hr.culture.history[0].participants.length,27);
 assert.equal(s.hr.culture.history[0].cost,432);
 assert.ok(s.team.every((p,i)=>Object.values(p.s).reduce((v,x)=>v+x,0)>prev[i].skills));
 assert.equal(s.market.completed,oldCompleted);assert.equal(s.bi.totals.revenue,oldRevenue);
 assert.deepEqual(s.team.map(p=>p.id),prev.map(p=>p.id));
 assert.equal(G.load(JSON.stringify(s)).hr.culture.history[0].cost,432);
 assert.equal(s.team.length,27);assert.ok(payroll>0);ledger(s);
});
test("financial runway and missing money block culture choices",()=>{
 const s=fresh();s.cash=30;assert.equal(G.cultureEligibility("training").ready,false);
 assert.equal(G.runPeopleCulture("training"),false);
 assert.equal(s.hr.culture.history.length,0);ledger(s); // reset synthetic cash below
});
test("executive guidance uses only active actual office holders and records",()=>{
 const s=fresh();staff(s,16);fund(s,10000);s.day=200;
 s.exec.officers.hr.id=s.team[6].id;s.exec.officers.cfo.id=s.team[7].id;s.exec.officers.coo.id=s.team[8].id;
 for(const key of ["hr","cfo","coo"]){s.exec.officers[key].mandate=true;s.exec.officers[key].authoritySince=180;}
 s.exec.officers.hr.history.unshift({day:196,action:"people",hired:1,recovery:2});
 const report=G.executiveManagementDigest().join(" ");
 assert.match(report,/HR/);assert.match(report,/1 delegated hires/);assert.match(report,/CFO/);assert.match(report,/COO/);
 s.day=271;const expired=G.executiveManagementDigest().join(" ");
 assert.doesNotMatch(expired,/HR .* active mandate/);assert.doesNotMatch(expired,/CFO .* reserve veto active/);
 assert.doesNotMatch(expired,/COO .* active coordination/);ledger(s);
});
test("HR cannot manufacture recruiting authority from expired or zero-slot limits",()=>{
 const s=fresh();staff(s,16);fund(s,10000);s.day=7;
 const manager=s.team[5],hr=s.team[6];manager.department="delivery";manager.role.primary="ops";
 s.org.progression.appointments.push({id:manager.id,level:"manager",since:0});
 s.exec.officers.hr.id=hr.id;s.exec.officers.hr.mandate=true;s.exec.officers.hr.authoritySince=0;
 const o=G.managementOps();o.hireBudget=1000;o.hireSlots=0;o.perHire=50;o.since=0;o.days=90;
 o.requests.push({id:999,status:"open",dept:"delivery",managerId:manager.id,cost:20,payroll:1.5,skill:"ops"});
 const ids=s.team.map(x=>x.id).join();
 assert.equal(G.managementHiringAvailable(o.requests[0]),false);
 G.executiveOfficerDay();assert.equal(s.team.map(x=>x.id).join(),ids);
 assert.equal(o.requests[0].status,"open");ledger(s);
});
test("failed persistent save rolls back CEO activity and does not charge ledger twice",()=>{
 const s=fresh();fund(s,15000);assert.equal(G.save(),true);
 const old=store.get("boss20"),snap=JSON.stringify(s);
 failWrites=true;assert.equal(G.runPeopleCulture("dinner"),false);
 assert.equal(JSON.stringify(s),snap);assert.equal(store.get("boss20"),old);
 failWrites=false;
});
console.log("v22.5B focused permission, activity, culture recovery and ledger checks complete.");