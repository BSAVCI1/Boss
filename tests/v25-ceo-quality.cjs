// v24C: actual saved Boss game engine, real cash/asset/payroll and physical factory stock.
"use strict";const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(code,{filename:"boss-v24c-physical-factory.js"});
for(const id of ["factory-panel","factory-growth","factory-today"])assert.equal(
 (html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,id);
const store=new Map(),nodes=new Map();let fail=false;
function el(id){if(!nodes.has(id))nodes.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,disabled:false,
 style:{},dataset:{},events:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},
 addEventListener(name,fn){this.events[name]=fn},querySelector(){return null},querySelectorAll(){return []},
 getContext(){return new Proxy({},{get:()=>()=>{}})},setAttribute(){},removeAttribute(){},scrollIntoView(){},focus(){},parentNode:{open:true}});return nodes.get(id);}
const env={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},
 window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>{if(fail)throw Error("storage");store.set(k,v)},removeItem:k=>store.delete(k)},
 setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Set,Map,console};
vm.createContext(env);const boot=code.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(code.slice(0,boot)+
 "globalThis.G={fresh,load,save,state:()=>S,ensureFactory,factoryBuy,factoryOrder,factoryAssign,factoryRelease,factoryDay,factoryWorker,factoryQuote,factorySell,factoryRender,factoryCapitalReady,ceoFactoryPriority,renderCEOFocus,leadershipMaturity,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,ensureExecutive,propertyActive};})();",env,{timeout:12000});
const G=env.G;
function reset(){fail=false;store.clear();G.fresh();return G.state();}
function fund(s,n){s.cash+=n;s.bi.openingCash+=n;}
function cashOK(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.1,"cash and BI ledger must reconcile");}
function mature(){
 const s=reset();
 while(s.team.length<11){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);p.role.primary=["sales","prod","ops","mkt"][s.team.length%4];s.team.push(p);}
 s.day=20;s.market.completed=40;const leader=s.team[3];leader.department="commercial";leader.role.primary="lead";
 s.org.progression.appointments.push({id:leader.id,level:"director",since:0,successorId:null});
 s.org.departments.commercial.managerId=leader.id;
 s.org.departments.commercial.reviews.push({day:20,manager:leader.n,result:"Target met",reading:"Real measured delivery"});
 for(const [key,managerIndex,staffIndex]of [["marketing",5,6],["operations",7,8]]){
  const gm=s.team[managerIndex],staff=s.team[staffIndex];gm.role.primary="lead";
  s.exec.lines.push({key,since:0,delivered:4,revenue:900,directCost:200});
  s.exec.units.push({key,managerId:gm.id,staffIds:[gm.id,staff.id],delivered:4,
   reviews:[{day:20,managerId:gm.id,delivered:4}],plan:{}});
 }
 s.exec.officers.coo.id=s.team[10].id;s.exec.officers.coo.mandate=true;s.exec.officers.coo.authoritySince=20;G.ensureExecutive(s);
 s.exec.property.sites.push({id:902,type:"building",status:"active",location:"park",dayCost:1.2,boost:1.06,
  unitKey:null,since:20,investment:1800,book:1800,lastDepreciation:20,arrears:0});
 fund(s,32000);assert.equal(G.leadershipMaturity().stage,"group");return s;
}
function pass(name,fn){fn();console.log("PASS v24C "+name);}

pass("Existing Founder Today guidance unchanged when no factory is owned",()=>{
 const s=reset(),before=JSON.stringify(s),choice=G.ceoFactoryPriority();
 assert.equal(choice,null);
 G.renderCEOFocus();
 assert.ok(!el("ceo-priority-content").innerHTML.includes('data-ceo-nav="factory"'));
 assert.equal(JSON.stringify(s),before);
});
pass("Group CEO with a real paid factory prioritizes available operator without hiring",()=>{
 const s=mature();assert.equal(G.ceoFactoryPriority(),null);
 assert.equal(G.factoryBuy(),true);
 const before=JSON.stringify(s),choice=G.ceoFactoryPriority();
 assert.equal(choice.go,"factory");assert.ok(choice.title.includes("Assign a real factory operator"));
 assert.ok(choice.why.includes("existing payroll"));
 G.renderCEOFocus();assert.ok(el("ceo-priority-content").innerHTML.includes('data-ceo-nav="factory"'));
 assert.equal(JSON.stringify(s),before,"advice must not alter saved company");
 cashOK(s);
});
pass("Cash insolvency outranks factory and does not authorize an order",()=>{
 const s=mature();assert.equal(G.factoryBuy(),true);const cash=s.cash;
 s.cash=0;G.renderCEOFocus();
 assert.ok(el("ceo-priority-content").innerHTML.includes("Protect payroll and operating runway"));
 assert.ok(!el("ceo-priority-content").innerHTML.includes('data-ceo-nav="factory"'));
 assert.equal(s.cash,0);s.cash=cash;cashOK(s);
});
pass("Inactive actual site is flagged, but no factory purchase, sale or site assignment occurs",()=>{
 const s=mature();assert.equal(G.factoryBuy(),true);
 const site=s.exec.property.sites.find(x=>x.id===s.factory.siteId);
 site.status="inactive";const before=JSON.stringify(s),action=G.ceoFactoryPriority();
 assert.equal(action.go,"property");assert.ok(action.title.includes("Restore access"));
 assert.equal(JSON.stringify(s),before);site.status="active";cashOK(s);
});
pass("Real paid materials shortage and supplier order affect recommendation truthfully",()=>{
 const s=mature();assert.equal(G.factoryBuy(),true);
 const op=s.team.find(p=>p.role.primary==="prod"&&p.t==="idle");assert.ok(op);
 assert.equal(G.factoryAssign(op.id),true);
 let c=G.ceoFactoryPriority();assert.equal(c.go,"factory");assert.ok(c.title.includes("material shortage"));
 assert.equal(G.factoryOrder(),true);
 assert.equal(G.ceoFactoryPriority(),null,"pending real supplier order is already being handled");
 s.day+=2;G.factoryDay();
 const f=s.factory,actual=G.ceoFactoryPriority();
 assert.ok(f.finished>0||f.defects>0);
 if(f.finished>0){assert.ok(actual===null||actual.go==="factory");}
 cashOK(s);
});
pass("Saved long-run physical factory state/employee identity survives with read-only CEO advice",()=>{
 const s=mature();assert.equal(G.factoryBuy(),true);const ids=s.team.map(x=>x.id),
  before=JSON.stringify(s),choice=G.ceoFactoryPriority();
 assert.ok(choice);assert.equal(JSON.stringify(s),before);
 assert.equal(G.save(),true);const restored=G.load(JSON.stringify(s));
 assert.equal(JSON.stringify(restored.team.map(x=>x.id)),JSON.stringify(ids));
 assert.equal(restored.factory.siteId,s.factory.siteId);
 assert.equal(restored.factory.installed,true);
 cashOK(s);
});
