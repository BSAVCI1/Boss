// v22.3 economic policy: new offers only, tested against the real production script.
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
const store=new Map(),elements=new Map();
function el(id){if(!elements.has(id))elements.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,disabled:false,open:false,hidden:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},focus(){},scrollIntoView(){},parentNode:{open:true}});return elements.get(id);}
const env={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],documentElement:el("html"),body:el("body"),activeElement:null,addEventListener(){}},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},clearInterval(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Math,Date,JSON,Set,Map,console};
vm.createContext(env);
const boot=script.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0,"game boot found");
vm.runInContext(script.slice(0,boot)+"globalThis.G={fresh,load,save,get:()=>S,set:s=>S=s,createDeal,estimatedFee,reputationPriceFactor,feeFor,lockDealFee,dailySalary,propertySummary};})();",env,{timeout:5000});
const G=env.G;
function fresh(){store.clear();G.fresh();return G.get();}
function check(name,fn){fn();console.log("PASS",name);}
function cashInvariant(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.06,"cash reconciliation");}
check("New games use future-only v23 pricing tags without changing founder cash",()=>{
 const s=fresh();assert.equal(s.cash,90);assert.equal(s.team.length,3);
 assert.ok(s.deals.length>=2&&s.deals.every(d=>d.pricingVersion===23));
 assert.equal(G.reputationPriceFactor(300,23),G.reputationPriceFactor(300,0));
 cashInvariant(s);
});
check("Pricing is continuous at 600 and progressively slows only beyond it",()=>{
 for(const rep of [0,100,300,600])assert.equal(G.reputationPriceFactor(rep,23),1+rep/200);
 assert.equal(G.reputationPriceFactor(600,23),4);
 let last=0;for(const rep of [600,1200,3000,10000,30000]){const next=G.reputationPriceFactor(rep,23);assert.ok(next>last&&next<=1+rep/200);last=next;}
 assert.ok(G.reputationPriceFactor(3000,23)<8);
 assert.ok(G.reputationPriceFactor(10000,23)<11);
});
check("Fresh and 180/730-day advanced offers use the new model only on future contracts",()=>{
 const s=fresh();for(const [day,rep] of [[30,100],[180,1200],[730,10000]]){
  s.day=day;s.rep=rep;const d=G.createDeal("Northwind");
  assert.equal(d.pricingVersion,23);const legacy={...d};delete legacy.pricingVersion;delete legacy.agreedFee;
  const old=G.estimatedFee(legacy,s),quoted=G.feeFor(d);
  assert.ok(quoted<=old);
  if(rep>600)assert.ok(quoted<old);
  const agreed=d.agreedFee;s.rep+=1000;assert.equal(G.feeFor(d),agreed,"signed quote remains fixed");
 }
 cashInvariant(s);
});
check("Migrated existing deals keep both agreed fee and old-model repricing on negotiation",()=>{
 const s=fresh(),prior=s.deals[0];delete prior.pricingVersion;
 const oldFee=prior.agreedFee,initialCash=s.cash,openingProperty=JSON.stringify(s.exec.property);
 s.day=2864;s.rep=3000;G.save();const loaded=G.load();assert.ok(loaded);G.set(loaded);
 const previous=loaded.deals.find(d=>d.id===prior.id);
 assert.equal(previous.agreedFee,oldFee);
 assert.equal(G.feeFor(previous),oldFee);
 assert.equal(G.estimatedFee(previous,loaded),G.estimatedFee({...previous,pricingVersion:0},loaded));
 G.lockDealFee(previous);
 assert.equal(previous.agreedFee,G.estimatedFee(previous,loaded),"legacy negotiation uses legacy rule");
 assert.equal(loaded.cash,initialCash);assert.equal(JSON.stringify(loaded.exec.property),openingProperty);
 const newer=G.createDeal();assert.equal(newer.pricingVersion,23);
 cashInvariant(loaded);
});
check("Economy change makes no direct wage or property changes",()=>{
 const s=fresh();const wage=s.team.reduce((n,p)=>n+G.dailySalary(p),0);
 const property=JSON.stringify(G.propertySummary());s.rep=10000;
 assert.equal(s.team.reduce((n,p)=>n+G.dailySalary(p),0),wage);
 assert.equal(JSON.stringify(G.propertySummary()),property);
 cashInvariant(s);
});
console.log("v22.3 economic balancing gate passed");
