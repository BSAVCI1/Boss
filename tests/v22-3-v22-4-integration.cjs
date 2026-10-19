// v22.3 + v22.4 combined acceptance: actual game engine, not mocks of pricing or persistence.
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
const store=new Map(),els=new Map();
function el(id){if(!els.has(id))els.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,open:false,hidden:false,disabled:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},getContext(){return new Proxy({},{get:()=>()=>{}})},querySelector(){return null},querySelectorAll(){return []},setAttribute(){},removeAttribute(){},scrollIntoView(){},focus(){},parentNode:{open:true}});return els.get(id);}
const scope={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},setTimeout:()=>1,clearTimeout(){},clearInterval(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Map,Set,console};
vm.createContext(scope);
const boot=script.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(script.slice(0,boot)+"globalThis.G={fresh,get:()=>S,set:s=>S=s,load,save,createDeal,feeFor,estimatedFee,reputationPriceFactor,worldIndicativeFee,worldTenderPreview,canonicalReporting,clearCareerRequirements,ladderTrainingEligible,ladderStartTraining,propertyReadiness,ceoPropertyComparison,propertyOpen,renderCEOFocus,renderOrgExplorer};})();",scope,{timeout:5000});
const G=scope.G;
function cash(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.06,"Group cash ledger invariant");}
store.clear();G.fresh();const s=G.get();assert.equal(s.cash,90);assert.equal(s.team.length,3);cash(s);
const old=s.deals[0],historicFee=G.feeFor(old),oldId=old.id;
delete old.pricingVersion; // emulate pre-v22.3 save without repricing historical terms
const foundingCash=s.cash,foundingPeople=s.team.map(x=>x.id);
assert.equal(G.feeFor(old),historicFee);
s.day=4704;s.market.completed=689;
const priced=[];
for(const rep of [300,1200,3000,10000]){
 s.rep=rep;
 const lead={id:rep,client:"Synthetic Bid",sector:s.market.focus,preference:"trust",stage:"negotiation"};
 const before=s.cash,preview=G.worldTenderPreview(lead),hint=G.worldIndicativeFee(lead);
 assert.equal(preview.feeHint,hint,"Displayed indicative fee must derive from new-contract model");
 assert.ok(hint>0);
 const newDeal=G.createDeal("Synthetic Bid",0,s.market.focus);
 const signed=G.feeFor(newDeal);
 assert.equal(newDeal.pricingVersion,23,"Future contracts must use versioned pricing");
 assert.ok(Math.abs(signed-hint)/signed<.25,"Bid preview must match realistic signed scope at reputation "+rep);
 assert.equal(G.feeFor(old),historicFee,"Legacy signed agreement must not reprice");
 assert.equal(s.cash,before,"Neither bid nor new signature instantly generates cash");
 priced.push({rep,hint,signed,id:newDeal.id});
}
const signedSnapshot=s.deals.map(x=>({id:x.id,fee:G.feeFor(x)}));
const originalState=JSON.stringify(s),org=G.canonicalReporting();
assert.equal(org.entries.length,3);assert.equal(new Set(org.entries.map(x=>x.p.id)).size,3);
assert.ok(G.clearCareerRequirements(s.team[0]).includes("CEO-approved $12 leadership courses"),"Career view must acknowledge integrated leadership development");
assert.equal(G.ladderTrainingEligible(s.team[0]),false,"Unappointed employee cannot start leadership course");
assert.equal(G.ladderStartTraining(s.team[0].id),false,"Ineligible course cannot charge cash");
assert.equal(G.propertyReadiness("hq").ready,false,"Founder cannot buy HQ without milestones");
assert.ok(G.ceoPropertyComparison("hq").check.ready===false);
assert.equal(G.propertyOpen("hq"),false,"Ineligible HQ approval cannot spend");
G.renderCEOFocus();G.renderOrgExplorer(org);
assert.equal(JSON.stringify(s),originalState,"Read-only CEO + career + office must not mutate game");
assert.equal(s.cash,foundingCash);
assert.deepEqual(s.team.map(x=>x.id),foundingPeople);
G.save();const loaded=G.load();assert.ok(loaded);G.set(loaded);
assert.equal(loaded.day,4704);assert.equal(loaded.cash,foundingCash);
assert.equal(loaded.deals.find(x=>x.id===oldId).agreedFee,old.agreedFee);
for(const d of signedSnapshot)assert.equal(G.feeFor(loaded.deals.find(x=>x.id===d.id)),d.fee,"Saved signed price "+d.id);
assert.equal(G.canonicalReporting().entries.length,3);cash(loaded);
console.log("PASS combined v22.3 + v22.4: future bid parity across four reputation levels, historic prices, legitimate leadership/HQ gates, read-only CEO organization and saved-state ledger",JSON.stringify(priced));
