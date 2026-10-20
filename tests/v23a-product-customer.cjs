// v23A actual engine regression — run the real offline game script, not a replica.
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
 "globalThis.G={createDeal,feeFor,v23Work,v23Accepted,v23Finish,v23Render,v23Decision,worldTenderPreview,worldResolveTender,state:()=>S,save,load,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,ensureExecutive,leadershipMaturity,orgPeriod,leadershipRecordPhase,leadershipSummaryMarkup,renderLeadershipContexts,renderCEOFocus,gamePlan,gameChapter,companyMilestone,companyDirection,ceoDecisionInventory,executiveOfficer};})();",box,{timeout:10000});
const G=box.G;

function reset(){store.clear();G.fresh();return G.state();}
function newWorker(s,skill){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);p.role.primary=skill;p.department=skill==="mkt"?"commercial":"delivery";p.s[skill]=4;s.team.push(p);return p;}
function test(name,fn){fn();console.log("PASS v23A "+name);}
test("fresh Founder and historical contracts unchanged",()=>{
 const s=reset(),d=s.deals[0],fee=G.feeFor(d);
 assert.equal(G.leadershipMaturity().stage,"founder");assert.equal(s.cash,90);assert.equal(s.team.length,3);assert.equal(s.deals.length,2);
 assert.equal(d.v23,undefined);G.v23Work(d,s.team[0],1);assert.equal(G.feeFor(d),fee);
});
test("marketing response comes from worker effort, audience and creative; no phantom revenue",()=>{
 const s=reset();s.cash=25000;s.exec.lines.push({key:"marketing",since:0,spent:120,delivered:0,revenue:0});
 const d=G.createDeal("Campaign buyer",0,"hospitality"),p=newWorker(s,"mkt");assert.equal(d.v23.kind,"campaign");
 const originalFee=G.feeFor(d),startCash=s.cash,ledger=JSON.stringify(s.bi.totals);
 G.v23Work(d,p,1);const focused={reach:d.v23.reach,leads:d.v23.leads,conversion:d.v23.conversions/d.v23.leads};
 d.v23.channel="broad";G.v23Work(d,p,1);
 assert.ok(d.v23.reach-focused.reach>focused.reach);
 assert.ok((d.v23.conversions-focused.conversion*focused.leads)/(d.v23.leads-focused.leads)<focused.conversion);
 assert.equal(s.cash,startCash);assert.equal(G.feeFor(d),originalFee);G.v23Finish(d,true);
 assert.equal(s.v23History[0].kind,"campaign");assert.equal(JSON.stringify(s.bi.totals),ledger);
});
test("product needs actual prototype, validation, low debt and quality for acceptance",()=>{
 const s=reset();s.exec.lines.push({key:"product",since:0,spent:120,delivered:0,revenue:0});
 const d=G.createDeal("Product buyer",0,"hospitality"),p=newWorker(s,"prod"),fee=G.feeFor(d);
 assert.equal(d.v23.kind,"prototype");assert.equal(G.v23Accepted(d),false);
 for(let i=0;i<20;i++)G.v23Work(d,p,1);
 assert.ok(d.v23.built>0&&d.v23.verified>0);d.v23.debt=9;assert.equal(G.v23Accepted(d),false);
 d.v23.debt=1;d.v23.built=d.work;d.v23.verified=d.work;d.quality=90;
 assert.equal(G.v23Accepted(d),true);assert.equal(G.feeFor(d),fee);
 G.v23Finish(d,true);assert.ok(s.v23History[0].success);
});
test("buyer need, price, trust, quality and competitor quality change bid odds without orders",()=>{
 const s=reset();s.day=90;const lead={id:42,sector:"hospitality",client:"Sample buyer",preference:"price"};
 const a=G.worldTenderPreview(lead);s.economy.pricing="premium";
 const b=G.worldTenderPreview(lead);assert.ok(b.chance<a.chance,"price sensitivity");s.economy.pricing="standard";
 lead.preference="quality";s.market.customers[lead.client]={sector:lead.sector,orders:2,loyalty:94,quality:95};
 const c=G.worldTenderPreview(lead);assert.equal(c.evidence.clientOrders,2);assert.ok(c.drivers.length);
 s.world.rivals.find(x=>x.sector===lead.sector).quality=97;
 const rival=G.worldTenderPreview(lead);assert.ok(rival.chance<c.chance);
 const money=JSON.stringify(s.bi.totals),n=s.deals.length;G.worldResolveTender(lead);
 assert.ok(s.world.tenders[0].drivers.length);assert.equal(JSON.stringify(s.bi.totals),money);assert.equal(s.deals.length,n);
});
test("portfolio rendering is read-only for finance, people and old saves",()=>{
 const s=reset(),cash=s.cash,ledger=JSON.stringify(s.bi.totals),ids=s.team.map(p=>p.id),fees=s.deals.map(d=>G.feeFor(d));
 G.v23Render();assert.equal(s.cash,cash);assert.equal(JSON.stringify(s.bi.totals),ledger);
 assert.deepEqual(s.team.map(p=>p.id),ids);assert.deepEqual(s.deals.map(d=>G.feeFor(d)),fees);
});
