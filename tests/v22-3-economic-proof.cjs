// v22.3A Economic Proof — deterministic actual production engine; no mocks of game economics.
// Usage: node tests/v22-3-economic-proof.cjs [--json]
// Scenarios intentionally seed earned-history *fixtures*, never copy or load the owner's Safari save.
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const script=html.slice(html.indexOf('<script>')+8,html.lastIndexOf('</script>'));
const boot=script.indexOf('S=load();if(!S)fresh();');
assert.ok(boot>0,'actual production script and boot boundary found');
const methods='fresh,load,save,get:()=>S,set:x=>S=x,tick,assign,createDeal,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,executiveLaunch,companyLaunchReadiness,unitActivate,unitAppoint,unitTransfer,unitOfPerson,propertyOpen,propertyReadiness,propertySummary,executiveEligibility,executiveAppoint,executiveMandate,economyBorrow,reputationPriceFactor,estimatedFee,feeFor,dailySalary';
const horizons=[30,180,730],seeds=[101,202,303];
const policies={
 conservative:{pipeline:'balanced',target:2,pricing:'standard',terms:0,world:'relationships'},
 balanced:{pipeline:'balanced',target:4,pricing:'standard',terms:7,world:'balanced'},
 growth:{pipeline:'growth',target:6,pricing:'competitive',terms:30,world:'volume'}
};
function engine(seed){
 let rng=seed>>>0;
 const math=Object.create(Math);math.random=()=>((rng=(1664525*rng+1013904223)>>>0)/4294967296);
 const store=new Map(),els=new Map();
 function element(id){
  if(!els.has(id))els.set(id,{id,innerHTML:'',textContent:'',value:'',checked:false,disabled:false,open:false,hidden:false,style:{},dataset:{},
   parentNode:{open:true},classList:{add(){},remove(){},toggle(){},contains(){return false}},
   addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},
   focus(){},scrollIntoView(){},setAttribute(){},removeAttribute(){},contains(){return false},matches(){return false}});
  return els.get(id);
 }
 const context={document:{getElementById:element,querySelector:()=>element('fallback'),querySelectorAll:()=>[],documentElement:element('html'),body:element('body'),activeElement:null,addEventListener(){}},
  window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},
  localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},
  requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},clearInterval(){},getComputedStyle:()=>({getPropertyValue:()=>''}),
  Math:math,Date,JSON,Set,Map,console:{log(){}}};
 vm.createContext(context);
 vm.runInContext(script.slice(0,boot)+'globalThis.G={'+methods+'};})();',context,{timeout:10000});
 context.G.fresh();
 return {G:context.G,store,seed};
}
const round=n=>Math.round((n||0)*100)/100;
function fund(s,amount){s.cash+=amount;s.bi.openingCash+=amount;}
function staff(G,s,total){
 while(s.team.length<total){
  const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);
  const i=s.team.length;
  p.role.primary=['prod','ops','mkt','sales'][i%4];
  p.role.auto=true;p.career.rank=i%5===0?2:i%3===0?1:0;p.perf.days=100;
  p.career.xp=60;p.management={planning:73,delegation:75,coaching:72,communication:74};
  for(const k of ['prod','ops','sales','mkt'])p.s[k]=Math.max(p.s[k]||1,3.4);
  s.team.push(p);
 }
}
function setup(G,kind,policy){
 const s=G.get();s.nextEv=99999999;s.flow.focus=false;s.pipeline.auto=true;
 if(kind!=='founder'){
  const init=kind==='developing'?{day:650,staff:12,cash:4200,rep:680,completed:26}:
   kind==='mature'?{day:4704,staff:28,cash:3300000,rep:5500,completed:165}:
   {day:2864,staff:24,cash:175000,rep:3200,completed:105};
  s.day=init.day;fund(s,init.cash-90);s.rep=init.rep;s.market.completed=init.completed;
  staff(G,s,init.staff);
  s.org.progression.appointments.push({id:s.team[0].id,level:'lead',since:s.day-180});
  s.org.progression.appointments.push({id:s.team[2].id,level:'manager',since:s.day-120});
  if(kind!=='developing')s.org.progression.appointments.push({id:s.team[4].id,level:'director',since:s.day-90});
  // Set these *synthetic earned milestone records* before exercising real launch/appointment gates.
  assert.ok(G.companyLaunchReadiness('product').ready,'earned first-line readiness');
  assert.equal(G.executiveLaunch('product'),true,'first line launched through game guard');
  assert.equal(G.unitActivate('product'),true,'unit activated through game guard');
  assert.equal(G.unitAppoint('product',s.team[5].id),true,'GM appointed through game guard');
  assert.equal(G.unitTransfer('product',s.team[6].id),true,'specialist assigned through game guard');
  if(kind!=='developing'){
   // Existing service history belongs to the synthetic fixture; it is NOT generated revenue in this trial.
   s.exec.lines[0].delivered=10;s.exec.lines[0].revenue=1600;
   assert.ok(G.companyLaunchReadiness('marketing').ready,'earned second-line readiness');
   assert.equal(G.executiveLaunch('marketing'),true);
   assert.equal(G.unitActivate('marketing'),true);
   assert.equal(G.unitAppoint('marketing',s.team[8].id),true);
   assert.equal(G.unitTransfer('marketing',s.team[9].id),true);
   for(const role of ['hr','cfo','coo']){
    const eligible=G.executiveEligibility(role);
    assert.equal(eligible.ready,true,role+' real appointment criteria');
    assert.equal(G.executiveAppoint(role,eligible.candidates[0].id),true,role+' CEO appointment');
    if(kind==='grandfathered')assert.equal(G.executiveMandate(role,true),true,'explicit mandate');
   }
  }
  const building=kind==='developing'?'office':kind==='mature'?'hq':'building';
  if(kind==='developing')assert.equal(G.propertyOpen('office'),true,'development lease');
  else assert.equal(G.propertyOpen(building),true,'owned property through readiness');
  if(kind==='grandfathered'){
   for(const d of s.deals){delete d.pricingVersion;assert.ok(Number.isFinite(d.agreedFee));}
   // Loan is an actual permitted game action, not invented initial debt or additional free cash.
   assert.equal(G.economyBorrow(),true,'working-capital draw');
  }
 }
 s.pipeline.mode=policy.pipeline;s.pipeline.target=policy.target;
 s.economy.pricing=policy.pricing;s.economy.terms=policy.terms;s.world.strategy=policy.world;
 s.nextEv=s.day+999999;
 // Founder explicitly delegates initial delivery using the real game action.
 if(kind==='founder')for(const d of [...s.deals]){
  const worker=s.team.find(p=>p.t==='idle'&&(p.role.primary===d.need||p.role.primary==='prod'||p.role.primary==='ops'));
  assert.ok(worker,'initial delivery resource');G.assign(d.id,worker.id);
 }
 const pay=s.team.reduce((x,p)=>x+G.dailySalary(p),0);
 assert.ok(pay>0,'real payroll obligations');
 return s;
}
function money(s){
 const t=s.bi.totals,delta=s.bi.openingCash+t.cashIn-t.cashOut-s.cash;
 assert.ok(Number.isFinite(s.cash)&&Math.abs(delta)<.075,'single cash ledger: '+delta+' day '+s.day);
 assert.equal(new Set(s.team.map(x=>x.id)).size,s.team.length,'unique employee identities');
 const owners=new Set();
 for(const u of s.exec.units)for(const id of u.staffIds){assert.ok(s.team.some(p=>p.id===id),'unit refers to active employee');assert.ok(!owners.has(id),'no double-owned unit staff');owners.add(id);}
 assert.ok(s.bi.unpaidPayroll>=0,'unpaid payroll nonnegative');
 assert.ok(t.costs>=0&&t.revenue>=0&&t.booked>=0,'account totals finite nonnegative');
}
function snapshot(G,s,origin,kind,policy,seed,horizon,first){
 money(s);
 const delta={};for(const key of ['revenue','costs','booked','cashIn','cashOut','investments','laborAllocated','directAllocated','delivered','missed','billableDays','deliveryEligibleDays','deliveryRoleWorkDays'])delta[key]=round((s.bi.totals[key]||0)-(origin.totals[key]||0));
 const categories={};for(const [k,v]of Object.entries(s.bi.categoryTotals))categories[k]=round(v-(origin.categories[k]||0));
 const dailyPayroll=round(s.team.reduce((n,p)=>n+G.dailySalary(p),0)),dailyPremises=round(G.propertySummary().daily);
 const unit=s.exec.units.map(u=>({key:u.key,contribution:round(u.revenue-u.directCost-u.sharedLaborCost-u.payrollCost-u.developmentCost),revenue:round(u.revenue),payroll:round(u.payrollCost),shared:round(u.sharedLaborCost),direct:round(u.directCost),development:round(u.developmentCost)}));
 const invoiceDue=round(s.economy.invoices.filter(x=>x.status==='open').reduce((n,x)=>n+x.amount,0));
 const propertyArrears=round(s.exec.property.sites.reduce((n,x)=>n+x.arrears,0));
 const payrollUnpaid=round(s.bi.unpaidPayroll);
 const cost=round(delta.costs),rev=round(delta.revenue),cash=round(s.cash);
 return {scenario:kind,policy,seed,days:horizon,gameDay:s.day,headcount:s.team.length,reputation:round(s.rep),completed:delta.delivered,
  booked:delta.booked,revenue:rev,collectionsNet:round(delta.cashIn-(s.bi.totals.investments-origin.totals.investments)),cashIn:delta.cashIn,cashOut:delta.cashOut,
  directLabor:delta.laborAllocated,otherDirect:delta.directAllocated,payroll:round(categories.payroll),property:round(categories.property),depreciation:round(categories.depreciation),
  expense:cost,profit:round(rev-cost),operatingMargin:rev?round((rev-cost)/rev*100):null,
  investment:delta.investments,cash,deltaCash:round(cash-origin.cash),cashReconciled:Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.075,
  invoicesOpen:invoiceDue,unpaidPayroll:payrollUnpaid,propertyArrears,debt:round(s.economy.loan+s.economy.interestDue),
  backlog:s.deals.length,deliveryUtilizationPct:delta.deliveryEligibleDays?round(delta.deliveryRoleWorkDays/delta.deliveryEligibleDays*100):null,
  runwayDays:dailyPayroll+dailyPremises?round(cash/(dailyPayroll+dailyPremises)):null,
  dailyPayroll,dailyPremises,unitContribution:unit,unitContributionTotal:round(unit.reduce((n,u)=>n+u.contribution,0)),
  firstAffordable:first};
}
function run(kind,policyName,seed){
 const {G}=engine(seed),s=setup(G,kind,policies[policyName]);
 const origin={totals:{...s.bi.totals},categories:{...s.bi.categoryTotals},cash:s.cash,day:s.day};
 const legacy=kind==='grandfathered'?s.deals.map(d=>({id:d.id,fee:d.agreedFee,version:d.pricingVersion})):null;
 const originalUnit=JSON.stringify(s.exec.units.map(u=>({key:u.key,managerId:u.managerId,staffIds:u.staffIds})));
 const property=JSON.stringify(s.exec.property.sites.map(x=>({id:x.id,price:x.price,dayCost:x.dayCost,location:x.location})));
 const mandate=JSON.stringify(s.exec.officers);
 const startIds=s.team.map(p=>p.id);
 const nextAffordable={};
 const result=[];
 for(let n=1;n<=730;n++){
  const before=s.day;G.tick();
  assert.equal(s.day,before+1,'uninterrupted game-day tick');
  if(n===1||n%30===0||horizons.includes(n))money(s);
  for(const key of ['studio','office','building','hq']){
   if(nextAffordable[key]!==undefined)continue;
   if(s.exec.property.sites.some(x=>x.type===key&&x.status!=='sold')){nextAffordable[key]='owned-or-leased-at-start';continue;}
   if(G.propertyReadiness(key).ready)nextAffordable[key]=n;
  }
  if(legacy){for(const d of legacy){const found=s.deals.find(x=>x.id===d.id);if(found)assert.equal(found.agreedFee,d.fee,'historic contract remains signed');}}
  if(horizons.includes(n)){
   G.save();const loaded=G.load();assert.ok(loaded,'localStorage reload works');assert.equal(loaded.day,s.day,'no day rollback');assert.equal(loaded.cash,s.cash);
   assert.equal(JSON.stringify(loaded.exec.property.sites.map(x=>({id:x.id,price:x.price,dayCost:x.dayCost,location:x.location}))),property,'property signed terms stable');
   assert.equal(JSON.stringify(loaded.exec.units.map(u=>({key:u.key,managerId:u.managerId,staffIds:u.staffIds}))),originalUnit,'unit ownership stable');
   assert.ok(startIds.every(id=>loaded.team.some(p=>p.id===id)),'initial employees not silently lost');
   if(kind==='grandfathered')assert.deepEqual(loaded.exec.officers,s.exec.officers,'explicit mandates survive reload');
   result.push(snapshot(G,s,origin,kind,policyName,seed,n,{...nextAffordable}));
  }
 }
 return result;
}
function main(){
 const results=[];
 for(const kind of ['founder','developing','mature','grandfathered'])for(const policy of Object.keys(policies))for(const seed of seeds)
  results.push(...run(kind,policy,seed));
 const grouped=[];
 for(const kind of ['founder','developing','mature','grandfathered'])for(const policy of Object.keys(policies))for(const days of horizons){
  const observations=results.filter(x=>x.scenario===kind&&x.policy===policy&&x.days===days);
  const mean=k=>round(observations.reduce((a,b)=>a+(b[k]||0),0)/observations.length);
  const range=k=>[Math.min(...observations.map(x=>x[k])),Math.max(...observations.map(x=>x[k]))];
  grouped.push({scenario:kind,policy,days,seeds:seeds.length,revenue:mean('revenue'),profit:mean('profit'),cash:mean('cash'),
   profitRange:range('profit'),cashRange:range('cash'),payroll:mean('payroll'),property:mean('property'),depreciation:mean('depreciation'),
   completed:mean('completed'),booked:mean('booked'),invoicesOpen:mean('invoicesOpen'),unpaidPayroll:mean('unpaidPayroll'),
   runwayDays:mean('runwayDays'),unitContribution:mean('unitContributionTotal')});
 }
 assert.equal(results.length,108,'four scenarios x three strategies x three seeds x three horizons');
 console.log('BOSS v22.3A economic proof: actual production tick(), 108 checkpoint observations, seeded history fixtures');
 for(const x of grouped)console.log('ECON '+JSON.stringify(x));
 if(process.argv.includes('--json'))console.log('ECON_RAW '+JSON.stringify(results));
 console.log('PASS v22.3A reproducible actual-engine economic proof (Node/localStorage; Chromium/IndexedDB separate CI)');
}
main();
