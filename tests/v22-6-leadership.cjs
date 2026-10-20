// v22.6 earned leadership regression — run the real offline game script, not a replica.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(code,{filename:"boss-v22.6-real-engine.js"});
for(const id of ["leadership-context-work","leadership-context-team","leadership-context-growth","ceo-priority-content","game-chapter"]){
 assert.equal([...html.matchAll(new RegExp('id="'+id+'"',"g"))].length,1,id+" must appear exactly once");
}
const store=new Map(),nodes=new Map();
function element(id){
 if(!nodes.has(id))nodes.set(id,{id,innerHTML:"",textContent:"",value:"",open:false,hidden:false,disabled:false,
  style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},
  addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},
  setAttribute(){},removeAttribute(){},scrollIntoView(){},focus(){},parentNode:{open:true}});
 return nodes.get(id);
}
const box={document:{getElementById:element,querySelector:()=>element("x"),querySelectorAll:()=>[],body:element("body"),documentElement:element("html"),activeElement:null,addEventListener(){}},
 window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},
 setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Set,Map,console};
vm.createContext(box);
const boot=code.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(code.slice(0,boot)+
 "globalThis.G={fresh,state:()=>S,save,load,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,ensureExecutive,leadershipMaturity,orgPeriod,leadershipRecordPhase,leadershipSummaryMarkup,renderLeadershipContexts,renderCEOFocus,gamePlan,gameChapter,companyMilestone,companyDirection,ceoDecisionInventory,executiveOfficer};})();",box,{timeout:10000});
const G=box.G;
function reset(){store.clear();G.fresh();return G.state();}
function add(s,role="ops"){
 const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);
 p.department=["sales","mkt"].includes(role)?"commercial":"delivery";p.role.primary=role;p.role.auto=true;s.team.push(p);return p;
}
function manager(s,level="manager"){
 const m=add(s,"lead");m.department="commercial";m.role.primary="lead";
 s.org.progression.appointments.push({id:m.id,level,since:s.day,successorId:null});
 s.org.departments.commercial.managerId=m.id;
 return m;
}
function growBusiness(s,withReview=true,level="manager"){
 manager(s,level);s.market.completed=12;
 if(withReview){s.day+=30;s.org.departments.commercial.stats.leads=5;G.orgPeriod();}
 return s;
}
function addUnit(s,key){
 const gm=add(s),specialist=add(s,key==="marketing"?"mkt":"ops");
 gm.role.primary="lead";s.exec.lines.push({key,since:0,delivered:4,revenue:1000,directCost:120});
 s.exec.units.push({key,managerId:gm.id,staffIds:[gm.id,specialist.id],delivered:4,reviews:[{day:s.day,managerId:gm.id,delivered:4}],plan:{}});
 return gm;
}
function group(s){
 growBusiness(s,true,"director");s.market.completed=40;
 addUnit(s,"marketing");addUnit(s,"operations");
 const officer=add(s);s.exec.officers.coo.id=officer.id;
 s.exec.officers.coo.mandate=true;s.exec.officers.coo.authoritySince=s.day;
 return s;
}
function assertSafe(s,before){
 assert.equal(s.cash,before.cash,"No cash grant or spend");
 assert.equal(s.team.length,before.team,"No hiring");
 assert.equal(JSON.stringify(s.bi.totals),before.fin,"No financial ledger mutation");
 assert.equal(JSON.stringify(s.org.progression.appointments),before.appointments,"No promotions");
 assert.equal(JSON.stringify(s.exec.officers),before.officers,"No mandate grants");
}
function snapshot(s){return{cash:s.cash,team:s.team.length,fin:JSON.stringify(s.bi.totals),appointments:JSON.stringify(s.org.progression.appointments),officers:JSON.stringify(s.exec.officers)};}
function test(name,action){action();console.log("PASS v22.6 "+name);}
test("fresh founder, no fake management",()=>{
 const s=reset(),before=snapshot(s),m=G.leadershipMaturity();
 assert.equal(m.stage,"founder");assert.ok(m.checks.some(x=>!x.met));assert.ok(G.gamePlan()[0]);
 G.renderLeadershipContexts();G.renderCEOFocus();
 assert.match(element("ceo-priority-content").innerHTML,/Founder/);
 assert.match(element("ceo-priority-content").innerHTML,/Deliver and assign customer projects/);
 assert.match(element("leadership-context-work").innerHTML,/Founder/);
 assertSafe(s,before);
});
test("cash and elapsed days alone cannot earn managerial capability",()=>{
 const s=reset();s.cash+=250000;s.day=5000;s.rep=999;s.market.completed=300;
 assert.equal(G.leadershipMaturity().stage,"founder");
 manager(s,"manager");
 assert.equal(G.leadershipMaturity().stage,"founder","Appointment alone not demonstrated management");
 s.org.departments.commercial.reviews.push({day:1,manager:"Founder",result:"Target met"});
 assert.equal(G.leadershipMaturity().stage,"founder","Stale review cannot unlock");
 s.day+=30;s.org.departments.commercial.stats.leads=5;G.orgPeriod();
 assert.equal(G.leadershipMaturity().stage,"leader");
});
test("measured manager-led company becomes Business Leader",()=>{
 const s=growBusiness(reset()),before=snapshot(s),m=G.leadershipMaturity();
 assert.equal(m.stage,"leader");assert.equal(m.next,"Group CEO");
 assert.ok(m.checks.some(c=>c.label.includes("two staffed")&&!c.met));
 G.renderLeadershipContexts();G.renderCEOFocus();
 assert.match(element("ceo-priority-content").innerHTML,/Business Leader/);
 assert.match(element("ceo-priority-content").innerHTML,/Review manager outcomes and growth/);
 assert.match(element("leadership-context-team").innerHTML,/manager-led/);
 assertSafe(s,before);
});
test("rich but insufficient group remains Business Leader",()=>{
 const s=growBusiness(reset());s.cash=10000000;s.day=4704;s.exec.lines.push({key:"marketing",since:0,delivered:99});
 assert.equal(G.leadershipMaturity().stage,"leader");
});
test("genuinely operating Director-led two-unit group earns Group CEO",()=>{
 const s=group(reset()),before=snapshot(s),m=G.leadershipMaturity();
 assert.equal(m.stage,"group");
 assert.equal(m.operating.length,2);assert.equal(m.directors.length,1);
 assert.equal(m.activeExecutives.length,1);
 G.renderLeadershipContexts();G.renderCEOFocus();
 assert.match(element("ceo-priority-content").innerHTML,/Group CEO/);
 assert.match(element("ceo-priority-content").innerHTML,/Review business-unit results/);
 assert.match(element("leadership-context-growth").innerHTML,/portfolio/i);
 assertSafe(s,before);
});
test("invalid or expired officer mandate removes false autonomy, not historical achievement",()=>{
 const s=group(reset());G.save();
 assert.equal(s.ui.leadershipHighest,"group");
 s.exec.officers.coo.mandate=false;
 assert.equal(G.leadershipMaturity().stage,"leader");
 s.exec.officers.coo.mandate=true;s.day=91;
 assert.equal(G.leadershipMaturity().stage,"leader");
 assert.equal(s.ui.leadershipHighest,"group");
 G.renderCEOFocus();assert.match(element("ceo-priority-content").innerHTML,/Previously reached Group CEO/);
});
test("one-time transition persists and dismissal never spends or changes permissions",()=>{
 const s=reset();G.save();assert.deepEqual([...s.ui.leadershipSeen],["founder"]);
 growBusiness(s);const before=snapshot(s);
 G.save();assert.equal(s.ui.leadershipPending.length,1);
 assert.equal(s.ui.leadershipPending[0].stage,"leader");
 G.save();assert.equal(s.ui.leadershipPending.length,1);
 const reload=G.load(JSON.stringify(s));assert.equal(reload.ui.leadershipPending.length,1);
 s.ui.leadershipPending.shift();G.save();
 const again=G.load(JSON.stringify(s));assert.equal(again.ui.leadershipPending.length,0);
 assert.ok(again.ui.leadershipSeen.includes("leader"));
 assertSafe(s,before);
});
test("career milestone and chapter are distinct from leadership maturity",()=>{
 const s=reset();s.market.completed=100;s.rep=200;s.day=1000;
 assert.equal(G.companyMilestone(),"Established specialist firm");
 assert.equal(G.gameChapter(),"Founder");
 assert.equal(G.companyDirection().stage,"Founder");
 assert.equal(G.leadershipMaturity().stage,"founder");
});
test("GM replacement cannot inherit predecessor group capability",()=>{
 const s=group(reset()),old=s.exec.units[0].managerId,successor=add(s);
 assert.equal(G.leadershipMaturity().stage,"group");
 s.exec.units[0].managerId=successor.id;s.exec.units[0].staffIds.push(successor.id);
 assert.notEqual(successor.id,old);
 assert.equal(G.leadershipMaturity().stage,"leader");
 s.exec.units[0].reviews.push({day:s.day,managerId:successor.id,delivered:0});
 assert.equal(G.leadershipMaturity().stage,"leader");
});
test("new department manager needs their own evidence",()=>{
 const s=growBusiness(reset()),incoming=manager(s);
 assert.ok(incoming);assert.equal(G.leadershipMaturity().stage,"founder");
});
test("manual tabs, authority policy, finance, IndexedDB and save engine remain structurally present",()=>{
 for(const id of ["view-work","view-team","view-growth","economy-panel","management-policy-center","org-explorer","ceo-action-center","leadership-growth","business-units"]){
  assert.ok(html.includes('id="'+id+'"'),id+" missing");
 }
 for(const token of ["function managementAutopilotReconcile(","function managementCOODay(","function managementPolicyApprove(","function economyBorrow(","function queueIndexedSave(","function readExtendedSave("]){
  assert.ok(code.includes(token),token+" missing");
 }
});
console.log("v22.6 real-engine phase, data integrity, persistence and UI acceptance completed.");
