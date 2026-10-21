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
 "globalThis.G={fresh,load,save,state:()=>S,ensureFactory,factoryBuy,factoryOrder,factoryAssign,factoryRelease,factoryDay,factoryWorker,factoryQuote,factorySell,factoryRender,factoryCapitalReady,leadershipMaturity,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,ensureExecutive,propertyActive};})();",env,{timeout:12000});
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
pass("Founder cannot purchase plant, stock, or earn phantom revenue",()=>{
 const s=reset(),old=JSON.stringify(s);assert.equal(G.factoryBuy(),false);assert.equal(G.factoryOrder(),false);
 assert.equal(G.factorySell(),false);G.factoryRender();assert.equal(JSON.stringify(s),old);
 assert.ok(el("factory-growth").innerHTML.includes("No site or cash is silently created"));cashOK(s);
});
pass("Mature company must own active physical building and fund 30-day obligations",()=>{
 const s=mature();const old=JSON.stringify(s);
 s.exec.property.sites[0].status="inactive";assert.equal(G.factoryBuy(),false);
 s.exec.property.sites[0].status="active";s.cash=900;assert.equal(G.factoryBuy(),false);
 s.cash=32090;const staff=s.team.filter(p=>["prod","ops"].includes(p.role.primary)&&p.t==="idle");
 assert.ok(staff.length>0);for(const p of staff)p.t="study";
 assert.equal(G.factoryBuy(),false,"no real free production worker blocks equipment");
 staff[0].t="idle";
 s.cash=32090;assert.equal(G.factoryBuy(),true);
 assert.equal(s.factory.installed,true);assert.equal(s.factory.siteId,902);
 assert.equal(s.bi.totals.investments,1600);assert.equal(s.cash,30490);
 assert.equal(G.factoryBuy(),false);assert.equal(s.factory.events.filter(x=>x.type==="equipment").length,1);
 cashOK(s);
});
pass("Prepaid supplier components are physical inventory, not fake operating expense",()=>{
 const s=mature();assert.equal(G.factoryBuy(),true);
 const before=s.cash,book=s.bi.totals.costs,revenue=s.bi.totals.revenue;
 assert.equal(G.factoryOrder(),true);assert.equal(s.cash,before-102);
 assert.equal(s.bi.totals.costs,book);assert.equal(s.bi.totals.revenue,revenue);
 assert.equal(s.factory.orders.length,1);assert.equal(s.factory.raw,0);
 s.day+=1;G.factoryDay();assert.equal(s.factory.raw,0);
 s.day+=1;G.factoryDay();assert.equal(s.factory.raw,12);assert.equal(s.factory.rawBasis,102);
 assert.equal(s.factory.orders.length,0);cashOK(s);
});
pass("Real production worker, paid energy, stock basis, quality and reduced-capacity shutdown",()=>{
 const s=mature();assert.equal(G.factoryBuy(),true);
 const operator=s.team.find(p=>p.role.primary==="prod"&&p.t==="idle");
 assert.ok(operator);
 assert.equal(G.factoryAssign(operator.id),true);assert.equal(operator.t,"factory");
 assert.equal(G.factoryOrder(),true);
 s.day+=2;const cash=s.cash;G.factoryDay();
 assert.ok(s.factory.finished>0||s.factory.defects>0);
 assert.equal(s.factory.raw+s.factory.finished*2+s.factory.defects*2,12);
 assert.equal(s.factory.paidPower,1.15);
 assert.equal(s.cash,cash-1.15);
 assert.ok(s.bi.totals.costs>=1.15);
 const built=s.factory.totalBuilt,materials=s.factory.raw;
 s.exec.property.sites[0].status="inactive";assert.equal(G.factorySell(),false,"no inventory dispatch from inactive factory");s.day+=1;G.factoryDay();
 assert.equal(s.factory.totalBuilt,built);assert.equal(s.factory.raw,materials);
 s.exec.property.sites[0].status="active";
 assert.equal(G.factoryRelease(),true);assert.equal(operator.t,"idle");
 s.day+=1;G.factoryDay();assert.equal(s.factory.totalBuilt,built);cashOK(s);
});
pass("Wholesale quote is uncertain; no same-day duplicate sales, COGS recognized once",()=>{
 const s=mature();assert.equal(G.factoryBuy(),true);
 const operator=s.team.find(p=>p.role.primary==="prod"&&p.t==="idle");
 assert.equal(G.factoryAssign(operator.id),true);assert.equal(G.factoryOrder(),true);
 s.day+=2;G.factoryDay();
 assert.ok(s.factory.finished>0);
 let sold=false,refused=false;
 for(let i=0;i<15&&(!sold||!refused);i++){
  const quote=G.factoryQuote();const cash=s.cash,rev=s.bi.totals.revenue,inventory=s.factory.finished;
  const result=G.factorySell();
  if(quote.units&&!quote.already){
   assert.equal(result,true);
   if(quote.accepted){sold=true;assert.equal(s.cash,+(cash+quote.price*quote.units).toFixed(2));assert.ok(s.bi.totals.revenue>rev);assert.equal(s.factory.finished,inventory-quote.units);}
   else{refused=true;assert.equal(s.cash,cash);assert.equal(s.bi.totals.revenue,rev);assert.equal(s.factory.finished,inventory);}
   assert.equal(G.factorySell(),false);
  }
  s.day+=1;G.factoryDay();
 }
 assert.ok(sold&&refused,"actual wholesale price discovery includes acceptance and rejection");
 assert.ok(s.factory.totalSold>=1);assert.ok(s.factory.cogs>0);cashOK(s);
});
pass("Old saves migrate, failed save writes roll back physical inventory and worker",()=>{
 const s=mature();delete s.factory;G.ensureFactory(s);assert.equal(s.factory.installed,false);
 assert.equal(G.factoryBuy(),true);const before=JSON.stringify(s),cash=s.cash;
 fail=true;assert.equal(G.factoryOrder(),false);fail=false;
 assert.equal(JSON.stringify(G.state()),before);assert.equal(G.state().cash,cash);
 assert.equal(G.save(),true);const loaded=G.load(JSON.stringify(G.state()));
 assert.equal(loaded.factory.installed,true);assert.equal(loaded.factory.siteId,902);
 assert.equal(loaded.factory.raw,0);cashOK(G.state());
});
