// v22.5A1: real Boss game script — zero-grant previews, atomic approval and rollback.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
const boot=code.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
const store=new Map(),els=new Map();let failWrites=false;
function el(id){if(!els.has(id))els.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,open:false,hidden:false,disabled:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},setAttribute(){},removeAttribute(){},scrollIntoView(){},focus(){},parentNode:{open:true}});return els.get(id);}
const box={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>{if(failWrites)throw new Error("No storage");store.set(k,v);},removeItem:k=>store.delete(k)},setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Set,Map,console};
vm.createContext(box);
vm.runInContext(code.slice(0,boot)+"globalThis.G={fresh,load,save,get:()=>S,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,managementPolicyCurrent,managementPolicyPreset,managementPolicyPropose,managementPolicyApprove,managementPolicyCancel,managementPolicyValidate,managementPolicyExposure,draft:()=>managementPolicyDraft,managementHiringAvailable,renderManagementPolicies,dailySalary};})();",box,{timeout:10000});
const G=box.G;
function fresh(){failWrites=false;store.clear();G.fresh();return G.get();}
function staff(s,n){while(s.team.length<n){let p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);s.team.push(p);}}
function fund(s,cash){s.cash+=cash;s.bi.openingCash+=cash;}
function ledger(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.07);}
function test(label,fn){fn();console.log("PASS v22.5A1 "+label);}
assert.ok(html.includes('id="management-policy-center"'));
test("founder with no surplus previews all four without modifying authorizations",()=>{
 const s=fresh(),snap=JSON.stringify(s);
 for(const k of ["conservative","balanced","aggressive","custom"]){G.managementPolicyPropose(k);const p=G.draft();assert.equal(p.preset,k);assert.equal(p.slots,0);assert.equal(p.hiring,0);assert.equal(G.managementPolicyValidate(p),"");assert.equal(JSON.stringify(s),snap);}
 G.managementPolicyCancel();assert.equal(G.draft(),null);ledger(s);
});
test("developing company scales proposals and applies all limits only after approval",()=>{
 const s=fresh();fund(s,15000);staff(s,16);
 const head=s.team[4];head.role.primary="lead";head.department="commercial";s.org.departments.commercial.managerId=head.id;
 s.org.progression.appointments.push({id:s.team[6].id,level:"manager",since:1});
 const a=G.managementPolicyPreset("conservative"),b=G.managementPolicyPreset("balanced"),c=G.managementPolicyPreset("aggressive");
 assert.equal(a.assistant.total,0);assert.ok(a.departments.commercial.coaching<=b.departments.commercial.coaching);
 assert.ok(b.departments.commercial.coaching<=c.departments.commercial.coaching);
 const before=JSON.stringify(s),cash=s.cash;G.managementPolicyPropose("balanced");
 assert.equal(JSON.stringify(s),before);assert.equal(G.managementPolicyApprove(),true);
 assert.equal(s.cash,cash);assert.equal(s.org.managementPolicy.preset,"balanced");
 assert.equal(s.org.departments.commercial.plan.limits.coaching,b.departments.commercial.coaching);
 assert.equal(s.org.progression.operations.hireBudget,b.hiring);
 assert.equal(G.load(JSON.stringify(s)).org.managementPolicy.preset,"balanced");ledger(s);
});
test("mature synthetic day 4900 preserves IDs, payroll and cash with zero-slot budget",()=>{
 const s=fresh();fund(s,3600000);staff(s,27);s.day=4900;
 for(const [i,k] of ["commercial","delivery"].entries()){const h=s.team[10+i];h.department=k;h.role.primary="lead";s.org.departments[k].managerId=h.id;}
 const a=G.managementPolicyPreset("aggressive");
 assert.ok(a.departments.commercial.coaching>0&&a.departments.delivery.training>0);
 G.managementPolicyPropose("custom");const p=G.draft();
 p.hiring=100;p.slots=0;p.perHire=0;p.payroll=0;p.departments.commercial.coaching=37;p.departments.delivery.training=22;
 assert.equal(G.managementPolicyValidate(p),"");
 const ids=s.team.map(x=>x.id),cash=s.cash;
 assert.equal(G.managementPolicyApprove(),true);assert.equal(s.org.managementPolicy.preset,"custom");
 assert.equal(s.org.progression.authorityDaily,0);assert.equal(s.org.progression.operations.hireBudget,100);
 assert.equal(s.org.progression.operations.hireSlots,0);
 assert.equal(G.managementHiringAvailable({cost:20}),false);
 assert.equal(s.team.map(x=>x.id).join(","),ids.join(","));assert.equal(s.cash,cash);
 assert.equal(s.org.departments.commercial.plan.limits.coaching,37);
 s.day=4991;assert.equal(G.managementHiringAvailable({cost:20}),false);ledger(s);
});
test("invalid or unaffordable proposal cannot apply even one permission",()=>{
 const s=fresh();fund(s,2000);const snap=JSON.stringify(s);
 G.managementPolicyPropose("custom");const p=G.draft();p.hiring=100;p.slots=1;p.perHire=0;
 assert.ok(G.managementPolicyValidate(p));assert.equal(G.managementPolicyApprove(),false);assert.equal(JSON.stringify(s),snap);
 p.perHire=20;p.hiring=10000;
 assert.ok(G.managementPolicyValidate(p));assert.equal(G.managementPolicyApprove(),false);assert.equal(JSON.stringify(s),snap);ledger(s);
});
test("failed save rolls back all limits and retains last durable save",()=>{
 const s=fresh();fund(s,25000);staff(s,12);assert.equal(G.save(),true);
 const saved=store.get("boss20"),snap=JSON.stringify(s);
 G.managementPolicyPropose("balanced");failWrites=true;assert.equal(G.managementPolicyApprove(),false);
 assert.equal(JSON.stringify(s),snap);assert.equal(store.get("boss20"),saved);failWrites=false;ledger(s);
});
test("history, expiry and default review are clearly separate",()=>{
 const s=fresh();s.org.progression.operations.hireBudget=1000;s.org.progression.operations.hireSlots=0;s.org.progression.operations.hireSpent=40;
 const current=G.managementPolicyCurrent();assert.equal(current.spent,40);
 G.renderManagementPolicies(true);const markup=el("management-policy-center").innerHTML;
 assert.ok(markup.includes("Review management policy")&&markup.includes("0 hires remaining"));ledger(s);
});
console.log("v22.5A1 management policy fast regression complete.");
