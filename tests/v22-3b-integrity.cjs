// v22.3B targeted actual-engine accounting and prospective-contract integrity tests.
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const code=html.slice(html.indexOf('<script>')+8,html.lastIndexOf('</script>'));
const boot=code.indexOf('S=load();if(!S)fresh();');
assert.ok(boot>0);
function instance(){
 const store=new Map(),els=new Map();
 function el(id){if(!els.has(id))els.set(id,{id,innerHTML:'',textContent:'',value:'',checked:false,disabled:false,hidden:false,open:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},setAttribute(){},removeAttribute(){},focus(){},scrollIntoView(){},matches(){return false},parentNode:{open:true},contains(){return false}});return els.get(id);}
 const sandbox={document:{getElementById:el,querySelector:()=>el('x'),querySelectorAll:()=>[],documentElement:el('html'),body:el('body'),activeElement:null,addEventListener(){}},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},clearInterval(){},getComputedStyle:()=>({getPropertyValue:()=>''}),Math,Date,JSON,Set,Map,console};
 vm.createContext(sandbox);
 vm.runInContext(code.slice(0,boot)+'globalThis.G={fresh,load,save,get:()=>S,set:s=>S=s,tick,createDeal,contractProcurementQuote,contractProcurementClose,contractProcurementSettle,biProjectEnd,ceoLineFinish,feeFor,dailySalary,propertyQuote,propertySummary,propertyOpen,propertyReadiness,executiveEligibility,removePerson};})();',sandbox,{timeout:10000});
 return sandbox.G;
}
function ledger(s){const t=s.bi.totals;assert.ok(Math.abs(s.bi.openingCash+t.cashIn-t.cashOut-s.cash)<.065,'one authoritative cash ledger');}
{
 const G=instance();G.fresh();const s=G.get();
 const historic=s.deals[0],preserved={id:historic.id,fee:historic.agreedFee,terms:historic.paymentTerms};
 delete historic.economicVersion;delete historic.externalProcurementQuote;
 const teamTerms=s.team.map(p=>[p.id,G.dailySalary(p)]);
 const beforeCash=s.cash,beforeCost=s.bi.totals.costs;
 G.save();const recovered=G.load();assert.ok(recovered);
 G.set(recovered);const state=G.get(),old=state.deals.find(d=>d.id===preserved.id);
 assert.equal(old.agreedFee,preserved.fee);assert.equal(old.paymentTerms,preserved.terms);
 assert.equal(old.economicVersion,undefined);assert.equal(state.cash,beforeCash);assert.equal(state.bi.totals.costs,beforeCost);
 assert.equal(JSON.stringify(state.team.map(p=>[p.id,G.dailySalary(p)])),JSON.stringify(teamTerms),'existing salary terms');
 assert.equal(state.economy.procurementPayable,0,'save migrations cannot invent payables');
 assert.equal(state.day,0);ledger(state);
 // A legacy signed completion never activates new procurement.
 old.prog=old.work;G.biProjectEnd(old,true,old.agreedFee);
 assert.equal(state.bi.categoryTotals.procurement||0,0);
 assert.equal(state.economy.procurementPayable,0);
 ledger(state);
}
{
 const G=instance();G.fresh();const s=G.get(),d=G.createDeal();
 assert.equal(d.economicVersion,1);assert.ok(d.externalProcurementQuote>0);
 assert.equal(d.externalProcurementQuote,G.contractProcurementQuote(d));
 const agreed=d.agreedFee,quote=d.externalProcurementQuote,rev=s.bi.totals.revenue,cost=s.bi.totals.costs;
 d.prog=d.work;G.biProjectEnd(d,true,agreed);
 assert.ok(Math.abs(s.bi.totals.revenue-rev-agreed)<.001);
 assert.ok(Math.abs(s.bi.totals.costs-cost-quote)<.001);
 assert.ok(Math.abs(s.bi.categoryTotals.procurement-quote)<.001);
 assert.equal(d.directCost,quote);
 assert.ok(s.bi.totals.directAllocated>=quote-.001);
 const first={rev:s.bi.totals.revenue,cost:s.bi.totals.costs,payable:s.economy.procurementPayable};
 G.biProjectEnd(d,true,agreed);G.contractProcurementClose(d,true);
 assert.deepEqual({rev:s.bi.totals.revenue,cost:s.bi.totals.costs,payable:s.economy.procurementPayable},first,'completion is idempotent');
 ledger(s);
 G.save();const restored=G.load();assert.ok(restored);
 assert.equal(restored.economy.procurementPayable,first.payable);
 G.set(restored);const liability=G.get().economy.procurementPayable,preCash=G.get().cash,preCost=G.get().bi.totals.costs;
 G.contractProcurementSettle();
 const paid=Math.min(Math.max(0,preCash),liability);
 assert.ok(Math.abs(G.get().economy.procurementPayable-(liability-paid))<.011);
 assert.ok(Math.abs(G.get().cash-(preCash-paid))<.011);
 assert.equal(G.get().bi.totals.costs,preCost,'settlement is not a second expense');
 G.contractProcurementSettle();ledger(G.get());
}
{
 const G=instance();G.fresh();const s=G.get(),d=G.createDeal();d.prog=d.work*.5;
 const fee=d.agreedFee,pre=s.bi.totals.costs;
 G.biProjectEnd(d,false,0);const expected=+(d.externalProcurementQuote*.25*.5).toFixed(2);
 assert.ok(Math.abs(s.bi.totals.costs-pre-expected)<.02);
 assert.equal(s.economy.procurementPayable,expected);
 assert.equal(d.biCompleted,true);
 G.biProjectEnd(d,false,0);assert.ok(Math.abs(s.bi.totals.costs-pre-expected)<.02);
 assert.equal(d.agreedFee,fee,'failure never reprices contract');ledger(s);
}
{
 const G=instance();G.fresh();const s=G.get();
 const quotes={studio:G.propertyQuote('studio'),office:G.propertyQuote('office'),building:G.propertyQuote('building'),hq:G.propertyQuote('hq')};
 assert.equal(quotes.hq.price,7200);
 const oldSite={id:99,type:'studio',unitKey:null,status:'active',since:s.day,investment:0,setup:75,arrears:0,book:0,lastDepreciation:s.day,price:75,dayCost:1.5,boost:1.025,location:'park'};
 s.exec.property.sites.push(oldSite);G.save();const loaded=G.load();assert.ok(loaded);
 assert.equal(JSON.stringify(loaded.exec.property.sites[0]),JSON.stringify(oldSite),'historic property immutable');
 G.set(loaded);
 for(const [k,quote] of Object.entries(quotes))assert.equal(JSON.stringify(G.propertyQuote(k)),JSON.stringify(quote),'property pricing unchanged');
 assert.equal(G.get().exec.officers.hr.id,null,'no implicit executive appointment');
 ledger(G.get());
}
{
 const G=instance();G.fresh();const s=G.get(),manager=s.team[0],trainee=s.team[1];
 const u={key:'product',managerId:manager.id,staffIds:[manager.id,trainee.id],plan:{successorId:trainee.id}};
 s.exec.units.push(u);
 assert.equal(G.removePerson(trainee),true,'employee departure is explicit and must clean references immediately');
 assert.equal(u.plan.successorId,null,'departed employee cannot remain a nominated successor until reload');
 assert.equal(u.staffIds.includes(trainee.id),false,'departed employee cannot remain in unit roster');
}
console.log('PASS v22.3B: legacy signed fees/salaries/properties, forward-only procurement, accrual-payable, once-only close, failure, successor departure, cash ledger, reload and executive safeguards');
