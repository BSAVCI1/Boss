// v22.2 executive leadership: strict actual script, no disabled purchase gates or mocks of appointment logic.
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const m of script.matchAll(/\$\("([^"]+)"\)/g))assert.ok(ids.has(m[1]),"Missing HTML element "+m[1]);
const els=new Map(),store=new Map();
function el(id){if(!els.has(id))els.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,hidden:false,disabled:false,open:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},querySelectorAll(){return []},querySelector(){return null},getContext(){return new Proxy({},{get:()=>()=>{}})},setAttribute(){},removeAttribute(){},focus(){},scrollIntoView(){},parentNode:{open:true}});return els.get(id);}
const win={innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}};
const sandbox={document:{getElementById:el,querySelector:()=>el("none"),querySelectorAll:()=>[],documentElement:el("html"),body:el("body"),addEventListener(){},activeElement:null},window:win,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},clearInterval(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,console,Set,Map};
vm.createContext(sandbox);
const boot=script.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
const methods="fresh,get:()=>S,set:s=>S=s,load,save,createPerson,ensureCareer,ensureRole,ensurePerformance,ensureDepartment,executiveEligibility,executiveAppoint,executiveUnappoint,executiveMandate,executiveOfficer,executiveOfficerDay,executiveRoleOf,executiveFinanceGuard,renderExecutiveOfficers,managementOps,managementHiringAvailable,unitStaffEligible,unitGMEligible,unitActivate,unitAppoint,unitTransfer,dailySalary,propertySummary";
vm.runInContext(script.slice(0,boot)+"globalThis.G={"+methods+"};})();",sandbox,{timeout:5000});
const G=sandbox.G;
function test(name,fn){fn();console.log("PASS "+name);}
function fresh(){store.clear();G.fresh();return G.get();}
function staff(s,n){while(s.team.length<n){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);s.team.push(p);}}
function fund(s,m){s.cash+=m;s.bi.openingCash+=m;}
function money(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.06,"Cash ledgers must reconcile");}
function candidate(s){const p=s.team.at(-1);p.perf.days=65;p.career.rank=2;p.management={planning:70,delegation:70,coaching:70,communication:70};p.t="idle";return p;}
test("fresh and migrated companies have exactly three vacant zero-authority executive roles",()=>{
 const s=fresh();assert.deepEqual(Object.keys(s.exec.officers).sort(),["cfo","coo","hr"]);
 assert.equal(G.executiveEligibility("hr").ready,false);
 assert.equal(G.executiveAppoint("hr",s.team[0].id),false);
 const cash=s.cash,day=s.day;const raw=JSON.stringify(s);delete s.exec.officers;
 G.save();const restored=G.load();assert.equal(restored.day,day);assert.equal(restored.cash,cash);
 assert.ok(restored.exec.officers.hr&&!restored.exec.officers.hr.id&&!restored.exec.officers.hr.mandate);
 assert.equal(restored.exec.officers.cfo.id,null);money(restored);
});
test("HR requires verified mature company, appoints existing employee with only future wage premium and no mandate",()=>{
 const s=fresh();fund(s,20000);staff(s,15);const who=candidate(s);
 s.org.progression.appointments.push({id:s.team[0].id,level:"manager",since:0});
 const payroll=s.team.reduce((n,p)=>n+G.dailySalary(p),0),cash=s.cash,count=s.team.length;
 assert.equal(G.executiveEligibility("hr").ready,true);
 assert.equal(G.executiveAppoint("hr",who.id),true);
 assert.equal(s.team.length,count);assert.equal(s.cash,cash);
 assert.ok(Math.abs(s.team.reduce((n,p)=>n+G.dailySalary(p),0)-payroll-.85*s.mod.cost)<.0001);
 assert.equal(s.exec.officers.hr.mandate,false);
 assert.equal(G.executiveOfficer("hr","people"),null);
 assert.equal(G.executiveAppoint("cfo",who.id),false);
 assert.equal(G.unitGMEligible(who,"product"),false);
 assert.equal(G.unitStaffEligible(who,"product"),false);
 G.save();const restored=G.load();assert.equal(restored.exec.officers.hr.id,who.id);
 assert.equal(restored.exec.officers.hr.mandate,false);
 money(s);
});
test("HR delegations are explicit and bounded to 90 days; expired authority needs reapproval",()=>{
 const s=fresh();fund(s,20000);staff(s,15);const who=candidate(s);
 s.org.progression.appointments.push({id:s.team[0].id,level:"manager",since:0});
 assert.equal(G.executiveAppoint("hr",who.id),true);
 assert.equal(G.executiveMandate("hr",true),true);
 assert.equal(G.executiveOfficer("hr","people").id,who.id);
 s.day=90;assert.equal(G.executiveOfficer("hr","people"),null);
 assert.equal(G.executiveMandate("hr",true),true);
 assert.equal(G.executiveOfficer("hr","people").id,who.id);
 assert.equal(G.executiveMandate("hr",false),true);
 assert.equal(G.executiveOfficer("hr","people"),null);
 money(s);
});
test("CFO requires actual service/owned office complexity and blocks only delegated spending below payroll runway",()=>{
 const s=fresh();fund(s,24000);staff(s,11);const who=candidate(s);
 s.market.completed=21;s.exec.lines=[{key:"product",since:0,spent:120,delivered:10,revenue:1000},{key:"marketing",since:0,spent:120,delivered:6,revenue:1000}];
 assert.equal(G.executiveEligibility("cfo").ready,true);
 assert.equal(G.executiveAppoint("cfo",who.id),true);
 assert.equal(G.executiveFinanceGuard(100000),true,"CFO has no veto before approved mandate");
 assert.equal(G.executiveMandate("cfo",true),true);
 const payroll=s.team.reduce((n,p)=>n+G.dailySalary(p),0);
 s.cash=payroll*30+G.propertySummary().daily*30+5;
 assert.equal(G.executiveFinanceGuard(10),false);assert.equal(G.executiveFinanceGuard(2),true);
 assert.equal(G.executiveMandate("cfo",false),true);assert.equal(G.executiveFinanceGuard(10),true);
});
test("COO requires two *staffed* managed units, cannot claim a fictitious group from purchased lines",()=>{
 const s=fresh();fund(s,20000);staff(s,15);const who=candidate(s);s.market.completed=16;
 s.exec.lines=[{key:"product",since:0,spent:120},{key:"marketing",since:0,spent:120}];
 assert.equal(G.executiveEligibility("coo").ready,false);
 s.team[0].career.rank=1;s.team[2].career.rank=1;
 assert.equal(G.unitActivate("product"),true);assert.equal(G.unitActivate("marketing"),true);
 assert.equal(G.unitAppoint("product",s.team[0].id),true);assert.equal(G.unitTransfer("product",s.team[1].id),true);
 assert.equal(G.unitAppoint("marketing",s.team[2].id),true);assert.equal(G.unitTransfer("marketing",s.team[3].id),true);
 assert.equal(G.executiveEligibility("coo").ready,true);
 assert.equal(G.executiveAppoint("coo",who.id),true);
 assert.equal(G.executiveOfficer("coo","coordinate"),null);
 assert.equal(G.executiveMandate("coo",true),true);
 assert.equal(G.executiveOfficer("coo","coordinate").id,who.id);
 money(s);
});
test("actual monthly scorecard does not invent history, add workers, duplicate payroll or mutate cash",()=>{
 const s=fresh();fund(s,20000);staff(s,15);const who=candidate(s);s.day=7;
 s.org.progression.appointments.push({id:s.team[0].id,level:"manager",since:0});
 assert.equal(G.executiveAppoint("hr",who.id),true);
 const cash=s.cash,roster=s.team.length,investment=s.bi.totals.investments;const total=s.team.reduce((n,p)=>n+G.dailySalary(p),0);
 s.day=42;G.executiveOfficerDay();
 assert.equal(s.exec.officers.hr.reviews.length,1);
 assert.equal(s.exec.officers.hr.reviews[0].deltaCompleted,null);
 G.executiveOfficerDay();assert.equal(s.exec.officers.hr.reviews.length,1);
 s.market.completed+=4;s.day=77;G.executiveOfficerDay();
 assert.equal(s.exec.officers.hr.reviews.length,2);
 assert.equal(s.exec.officers.hr.reviews[0].deltaCompleted,4);
 assert.equal(s.cash,cash);assert.equal(s.team.length,roster);
 assert.equal(s.bi.totals.investments,investment);assert.equal(s.team.reduce((n,p)=>n+G.dailySalary(p),0),total);
 money(s);
});
test("vacancy stops only future executive salary; years-old saves preserve signed deals and budget ledgers",()=>{
 const s=fresh();fund(s,20000);staff(s,15);const who=candidate(s);
 s.org.progression.appointments.push({id:s.team[0].id,level:"manager",since:0});
 s.day=4578;assert.equal(G.executiveAppoint("hr",who.id),true);
 const premium=G.dailySalary(who),cash=s.cash;
 assert.equal(G.executiveUnappoint("hr"),true);
 assert.equal(s.day,4578);assert.equal(s.cash,cash);assert.equal(s.exec.officers.hr.id,null);
 assert.ok(Math.abs(premium-G.dailySalary(who)-.85*s.mod.cost)<.0001);
 G.save();const restored=G.load();assert.equal(restored.exec.officers.hr.id,null);
 assert.equal(restored.day,4578);money(restored);
});
console.log("Boss v22.2 strict executive leadership migration/mandate validations passed.");
