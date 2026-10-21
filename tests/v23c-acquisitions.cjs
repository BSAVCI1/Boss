// v23C: execute the real inlined Boss game, including save, ledger and competitive engine.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(code,{filename:"boss-v23c-real-engine.js"});
for(const id of ["acquisition-today","acquisition-work","acquisition-growth","acquisition-panel"])assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,id);
const store=new Map(),nodes=new Map();let fail=false;
function el(id){if(!nodes.has(id))nodes.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,open:false,hidden:false,disabled:false,
 style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},
 addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},
 setAttribute(){},removeAttribute(){},scrollIntoView(){},focus(){},parentNode:{open:true}});
 return nodes.get(id);}
const box={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},
 window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>{if(fail)throw Error("storage blocked");store.set(k,v)},removeItem:k=>store.delete(k)},
 setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Set,Map,console};
vm.createContext(box);const boot=code.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(code.slice(0,boot)+
 "globalThis.G={fresh,load,save,state:()=>S,acquisitionGate,acquisitionDiligence,acquisitionBuy,acquisitionDay,acquisitionBidEffect,acquisitionRender,acquisitionQuote,acquisitionCommitment,ensureAcquisitions,worldRivalFor,worldTenderPreview,capitalFacts,capitalBuy,capitalDay,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,orgPeriod,leadershipMaturity};})();",box,{timeout:12000});
const G=box.G;
function reset(){fail=false;store.clear();G.fresh();return G.state();}
function fund(s,n){s.cash+=n;s.bi.openingCash+=n;}
function ledger(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.09,"cash and BI ledger reconcile");}
function leader(s){
 const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);
 p.department="commercial";p.role.primary="lead";s.team.push(p);
 s.org.progression.appointments.push({id:p.id,level:"manager",since:s.day,successorId:null});
 s.org.departments.commercial.managerId=p.id;
 s.market.completed=12;s.day+=30;s.org.departments.commercial.stats.leads=5;G.orgPeriod();
 assert.equal(G.leadershipMaturity().stage,"leader");return s;
}
function test(name,fn){fn();console.log("PASS v23C "+name);}
test("Founder cannot spend even with cash, and views remain read-only",()=>{
 const s=reset();fund(s,90000);const before=JSON.stringify(s);
 assert.equal(G.acquisitionDiligence("harbor"),false);
 assert.equal(G.acquisitionBuy("harbor"),false);
 G.acquisitionRender();
 assert.match(el("acquisition-growth").innerHTML,/Business Leader/);
 assert.equal(JSON.stringify(s),before);ledger(s);
});
test("Distinct existing rivals have uncertain modeled quotes and paid diligence is not revenue",()=>{
 const s=leader(reset());fund(s,50000);
 const q=s.world.rivals.map(G.acquisitionQuote);
 assert.equal(new Set(q.map(x=>x.price)).size,3);
 const cash=s.cash,revenue=s.bi.totals.revenue,oldCost=s.bi.totals.costs;
 assert.equal(G.acquisitionBuy("harbor"),false,"no purchase before diligence");
 assert.equal(G.acquisitionDiligence("harbor"),true);
 assert.equal(s.cash,cash-18);assert.equal(s.bi.totals.revenue,revenue);
 assert.equal(s.bi.totals.costs,oldCost+18);
 assert.equal(G.acquisitionDiligence("harbor"),false,"no repeat paid diligence");
 assert.equal(s.acquisitions.diligence[0].id,"harbor");ledger(s);
});
test("One CEO purchase posts one capital investment and creates no staff, orders or revenue",()=>{
 const s=leader(reset());fund(s,50000);
 assert.equal(G.acquisitionDiligence("harbor"),true);
 const q=s.acquisitions.diligence[0],cash=s.cash,people=s.team.map(p=>p.id),contracts=s.deals.map(d=>d.agreedFee),rev=s.bi.totals.revenue;
 assert.equal(G.acquisitionBuy("harbor"),true);
 assert.equal(s.cash,cash-q.price);assert.equal(s.acquisitions.owned.length,1);
 assert.equal(s.bi.totals.investments,q.price);assert.equal(s.bi.totals.revenue,rev);
 assert.deepEqual(s.team.map(p=>p.id),people);assert.deepEqual(s.deals.map(d=>d.agreedFee),contracts);
 assert.equal(G.acquisitionBuy("harbor"),false);
 assert.equal(s.acquisitions.history.filter(x=>x.kind==="purchase").length,1);
 assert.notEqual(G.worldRivalFor({id:9,sector:"hospitality"}).id,"harbor");
 assert.equal(G.acquisitionBidEffect({sector:"hospitality"}),-.035);
 assert.ok(G.capitalFacts().integrationCommitment>0);ledger(s);
});
test("Integration charges 30 days only, paid/payable reconciles, affects future bids and preserves old contracts",()=>{
 const s=leader(reset());fund(s,50000);
 assert.equal(G.acquisitionDiligence("harbor"),true);assert.equal(G.acquisitionBuy("harbor"),true);
 const x=s.acquisitions.owned[0],cash=s.cash,rev=s.bi.totals.revenue;
 const oldTenders=JSON.stringify(s.world.tenders),oldDeals=JSON.stringify(s.deals);
 for(let i=0;i<35;i++){s.day++;G.acquisitionDay();}
 assert.equal(x.integrationCost,+(x.daily*30).toFixed(2));
 assert.ok(Math.abs(s.cash-(cash-x.integrationCost))<.09);
 assert.equal(x.payable,0);assert.equal(s.bi.totals.revenue,rev);
 assert.equal(JSON.stringify(s.world.tenders),oldTenders);
 assert.equal(JSON.stringify(s.deals),oldDeals);
 assert.ok(G.acquisitionBidEffect({sector:"hospitality"})>0,"staffed healthy integration helps future bids");
 const lead={id:44,sector:"hospitality",client:"Prospect",preference:"quality"};
 assert.ok(G.worldTenderPreview(lead).drivers.length);
 const day=s.day,cost=x.integrationCost;G.acquisitionDay();assert.equal(x.integrationCost,cost);assert.equal(s.day,day);ledger(s);
});
test("Debt, unpaid wages, portfolio lots and protected runway block speculative purchases",()=>{
 const s=leader(reset());fund(s,900);
 assert.equal(G.acquisitionDiligence("harbor"),true);
 s.economy.loan=1300;assert.equal(G.acquisitionBuy("harbor"),false);
 s.economy.loan=0;s.bi.unpaidPayroll=1000;assert.equal(G.acquisitionBuy("harbor"),false);
 s.bi.unpaidPayroll=0;assert.equal(G.capitalBuy("reserve"),true);
 assert.equal(s.capital.lots.length,1);assert.equal(G.acquisitionBuy("harbor"),false);
 ledger(s);
});
test("Failed storage rolls back cash, ledger, rival identity and purchase",()=>{
 leader(reset());const s=G.state();fund(s,50000);assert.equal(G.acquisitionDiligence("north"),true);
 const before=JSON.stringify(s),cash=s.cash;
 fail=true;assert.equal(G.acquisitionBuy("north"),false);fail=false;
 const restored=G.state();assert.equal(JSON.stringify(restored),before);assert.equal(restored.cash,cash);
 assert.equal(restored.acquisitions.owned.length,0);assert.equal(restored.world.rivals.find(r=>r.id==="north").acquired,false);
 ledger(restored);
});
test("Old saves and revoked CFO authority do not grant free units or damage identities",()=>{
 const s=leader(reset());fund(s,50000);const people=s.team.map(p=>p.id),contracts=s.deals.map(d=>d.agreedFee);
 delete s.acquisitions;G.ensureAcquisitions(s);assert.equal(s.acquisitions.owned.length,0);
 s.exec.officers.cfo.mandate=false;
 assert.equal(G.acquisitionDiligence("north"),true);assert.equal(G.acquisitionBuy("north"),true);
 const copy=G.load(JSON.stringify(s));assert.equal(copy.acquisitions.owned[0].id,"north");
 assert.equal(copy.world.rivals.find(r=>r.id==="north").acquired,true);
 assert.equal(JSON.stringify(copy.team.map(p=>p.id)),JSON.stringify(people));assert.equal(JSON.stringify(copy.deals.map(d=>d.agreedFee)),JSON.stringify(contracts));
 assert.equal(copy.exec.units.length,s.exec.units.length);ledger(s);
});
