// v23B tests run real Boss engine and real existing cash/ledger code, never cloned calculations.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(code,{filename:"boss-v23b-real-engine.js"});
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
 "globalThis.G={fresh,load,save,get:()=>S,capitalFacts,capitalBuy,capitalSell,capitalDay,capitalRender,ensureCapital};})();",box,{timeout:12000});
const G=box.G;
function fresh(){fail=false;store.clear();G.fresh();return G.get();}
function fund(s,n){s.cash+=n;s.bi.openingCash+=n;}
function cashOk(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.08,"all cash must reconcile with ledger");}
function test(name,fn){fn();console.log("PASS v23B "+name);}
test("Founder cash guard prevents speculative capital purchases",()=>{
 const s=fresh(),original=JSON.stringify(s);
 assert.equal(s.cash,90);assert.equal(G.capitalFacts().available,0);
 assert.equal(G.capitalBuy("reserve"),false);assert.equal(G.capitalBuy("venture"),false);
 assert.equal(JSON.stringify(s),original);cashOk(s);
});
test("investing in two differentiated risk classes posts one capital cash expense, no sales revenue",()=>{
 const s=fresh();fund(s,25000);const baseline=s.cash,rev=s.bi.totals.revenue,costs=s.bi.totals.costs;
 assert.equal(G.capitalBuy("reserve"),true);assert.equal(G.capitalBuy("venture"),true);
 assert.equal(s.capital.lots.length,2);assert.equal(s.cash,baseline-360);
 assert.equal(s.bi.totals.investments,360);assert.equal(s.bi.totals.cashOut,360);
 assert.equal(s.bi.totals.costs,costs);assert.equal(s.bi.totals.revenue,rev);
 assert.equal(G.capitalSell(s.capital.lots[0].id),false,"early liquidation blocked");
 cashOk(s);
});
test("market marks are noncash, forward-only, idempotent, and saved",()=>{
 const s=fresh();fund(s,50000);assert.equal(G.capitalBuy("venture"),true);
 const lot=s.capital.lots[0],cash=s.cash,book=JSON.stringify(s.bi.totals);
 s.day=35;G.capitalDay();const mark=lot.value;assert.ok(mark!==240);
 G.capitalDay();assert.equal(lot.value,mark);assert.equal(lot.lastDay,35);
 assert.equal(s.cash,cash);assert.equal(JSON.stringify(s.bi.totals),book);
 assert.equal(G.save(),true);const restored=G.load(JSON.stringify(s));
 assert.equal(restored.capital.lots[0].value,mark);assert.equal(restored.capital.lots[0].id,lot.id);cashOk(s);
});
test("partial and full voluntary exits realize value once without fake customer orders or revenue",()=>{
 const s=fresh();fund(s,50000);assert.equal(G.capitalBuy("venture"),true);
 const id=s.capital.lots[0].id;s.day=90;G.capitalDay();
 const mark=s.capital.lots[0].value,before=s.cash,rev=s.bi.totals.revenue,costs=s.bi.totals.costs;
 assert.equal(G.capitalSell(id,.5),true);assert.equal(s.capital.lots.length,1);
 assert.equal(G.capitalSell(id,1),true);assert.equal(s.capital.lots.length,0);
 assert.ok(Math.abs(s.cash-before-mark)<.03);
 assert.equal(s.bi.totals.revenue,rev);assert.equal(s.bi.totals.costs,costs);
 assert.equal(G.capitalSell(id,1),false);assert.equal(s.capital.history.filter(x=>x.action==="sell").length,2);
 cashOk(s);
});
test("unpaid obligations and credit are not deployable surplus",()=>{
 const s=fresh();fund(s,500);
 s.economy.loan=475;assert.equal(G.capitalBuy("reserve"),false);
 s.economy.loan=0;s.bi.unpaidPayroll=495;assert.equal(G.capitalBuy("reserve"),false);
 assert.equal(G.capitalFacts().available,0);
});
test("legacy company and read-only views preserve unique employee IDs, fees and financial records",()=>{
 const s=fresh(),ids=s.team.map(p=>p.id),fees=s.deals.map(d=>d.agreedFee),cash=s.cash,bi=JSON.stringify(s.bi.totals);
 delete s.capital;G.ensureCapital(s);assert.equal(s.capital.lots.length,0);G.capitalRender();
 assert.deepEqual(s.team.map(p=>p.id),ids);assert.deepEqual(s.deals.map(d=>d.agreedFee),fees);
 assert.equal(s.cash,cash);assert.equal(JSON.stringify(s.bi.totals),bi);
 assert.ok(el("capital-today").innerHTML.includes("cash"));
 assert.ok(el("capital-growth").innerHTML.includes("reserve fund"));
 cashOk(s);
});
test("failed storage write cannot leave an unauthorized capital position",()=>{
 const s=fresh();fund(s,30000);const cash=s.cash,bi=JSON.stringify(s.bi.totals);
 fail=true;assert.equal(G.capitalBuy("reserve"),false);
 assert.equal(s.capital.lots.length,0);assert.equal(s.cash,cash);
 assert.equal(JSON.stringify(s.bi.totals),bi);fail=false;
});
