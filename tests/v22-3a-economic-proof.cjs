// v22.3A: repeatable economic proof using production index.html, never a spreadsheet surrogate.
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const script=html.slice(html.indexOf('<script>')+8,html.lastIndexOf('</script>'));
const boot=script.indexOf('S=load();if(!S)fresh();');
assert.ok(boot>0,'production simulation bootstrap');
const seeds=[20261018,41,73003], horizons=[30,180,730];
const policies={
 conservative:{pipeline:'balanced',target:2,world:'relationships',pricing:'standard',terms:0},
 balanced:{pipeline:'balanced',target:4,world:'balanced',pricing:'standard',terms:7},
 growth:{pipeline:'growth',target:6,world:'volume',pricing:'competitive',terms:14}
};
function engine(seed){
 const store=new Map(),elements=new Map();
 function el(id){if(!elements.has(id))elements.set(id,{id,innerHTML:'',textContent:'',value:'',checked:false,disabled:false,open:false,hidden:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},setAttribute(){},removeAttribute(){},focus(){},scrollIntoView(){},parentNode:{open:true},contains(){return false}});return elements.get(id);}
 let x=seed>>>0;const rng=Object.create(Math);rng.random=()=>{x=(Math.imul(1664525,x)+1013904223)>>>0;return x/4294967296;};
 const sandbox={document:{getElementById:el,querySelector:()=>el('x'),querySelectorAll:()=>[],documentElement:el('html'),body:el('body'),activeElement:null,addEventListener(){}},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},clearInterval(){},getComputedStyle:()=>({getPropertyValue:()=>''}),Math:rng,Date,JSON,Set,Map,console};
 vm.createContext(sandbox);
 const names='fresh,load,save,get:()=>S,set:s=>S=s,createDeal,tick,assign,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,dailySalary,propertySummary,propertyQuote,propertyReadiness,propertyOpen,companyLaunchReadiness,executiveLaunch,unitActivate,unitAppoint,unitTransfer,executiveEligibility,executiveAppoint,executiveMandate,feeFor,reputationPriceFactor';
 vm.runInContext(script.slice(0,boot)+'globalThis.G={'+names+'};})();',sandbox,{timeout:10000});
 return{G:sandbox.G,store};
}
function money(s){const t=s.bi.totals;const mismatch=s.bi.openingCash+t.cashIn-t.cashOut-s.cash;assert.ok(Math.abs(mismatch)<.065,'one cash ledger discrepancy '+mismatch+' day '+s.day);return +mismatch.toFixed(3);}
function addPeople(G,s,size){const roles=['sales','mkt','prod','ops','prod','ops'];while(s.team.length<size){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);p.role.primary=roles[s.team.length%roles.length];p.role.auto=true;s.team.push(p);}}
function qualified(p){p.career.rank=Math.max(1,p.career.rank);p.career.xp=Math.max(16,p.career.xp);p.perf.days=Math.max(65,p.perf.days||0);p.management={planning:75,delegation:75,coaching:75,communication:75};p.t='idle';}
function seeded(G,kind,policy){
 G.fresh();const s=G.get();s.nextEv=99999999;s.world.nextEvent=99999999;
 // These are explicit test CEO choices, not a new management-policy UI.
 const plan=policies[policy];s.pipeline.mode=plan.pipeline;s.pipeline.target=plan.target;
 s.world.strategy=plan.world;s.economy.pricing=plan.pricing;s.economy.terms=plan.terms;
 if(kind==='A'){
  assert.equal(s.team.length,3);assert.equal(s.cash,90);assert.equal(s.rep,0);
  G.assign(s.deals[0].id,s.team[1].id);G.assign(s.deals[1].id,s.team[2].id);
  return{G,s,baseline:90,fixture:'actual fresh company; two CEO-signed work assignments'};
 }
 // A historical synthetic opening position: pre-simulation balance is not cash created by a game tick.
 const mature=kind==='C'||kind==='D';
 const days=kind==='B'?180:kind==='C'?4704:2864;
 const cash=kind==='B'?4800:kind==='C'?3300000:275000;
 s.day=days;s.rep=kind==='B'?430:kind==='C'?3200:2600;
 s.market.completed=kind==='B'?32:kind==='C'?280:190;
 s.cash=cash;s.bi.openingCash=cash;s.bi.since=days;
 s.deals=[];s.bi.totals.booked=0;s.bi.daily=[];s.bi.recent=[];s.world.changedAt=s.day-60;
 s.pipeline.nextInbound=s.day+3;s.pipeline.lastWon=s.day-12;s.world.nextEvent=99999999;
 addPeople(G,s,kind==='B'?14:kind==='C'?28:24);
 // Synthetic career milestones are pre-existing at the fixture boundary; never silently promoted by a tick.
 const ids=s.team.map(p=>p.id);
 s.org.progression.appointments.push({id:ids[0],level:'lead',since:days-600});
 s.org.progression.appointments.push({id:ids[1],level:'manager',since:days-400});
 if(mature)s.org.progression.appointments.push({id:ids[2],level:'director',since:days-200});
 const specialist=s.team.find(p=>p.role.primary==='prod'&&!ids.slice(0,3).includes(p.id));
 if(specialist){specialist.s.prod=3.6;specialist.s.mkt=3.6;}
 // Purchased business lines have actual production eligibility checks; second line requires a staffed GM
 // and at least three previous deliveries on the first. This history is part of the synthetic opening snapshot.
 let launch=G.companyLaunchReadiness('product');
 assert.ok(launch.ready,'fixture first business is eligible: '+JSON.stringify(launch.checks));
 {const result=G.executiveLaunch('product');assert.ok(result,'first service launch failed: '+JSON.stringify({result,day:s.day,cash:s.cash,ev:s.ev,ready:G.companyLaunchReadiness('product'),lines:s.exec.lines,stored:!!G.load(),revision:s._saveRevision}));}
 assert.equal(G.unitActivate('product'),true);
 qualified(s.team[3]);assert.equal(G.unitAppoint('product',ids[3]),true);
 assert.equal(G.unitTransfer('product',ids[4]),true);
 s.exec.lines[0].delivered=Math.max(s.exec.lines[0].delivered||0,5);
 // A second new service requires an eligible specialist who does not belong to the first unit.
 const next=s.team.find(p=>!s.exec.units[0].staffIds.includes(p.id)&&p.role.primary==='mkt');
 if(next){next.s.mkt=3.8;next.s.prod=3.8;}
 launch=G.companyLaunchReadiness('marketing');
 assert.ok(launch.ready,'fixture second business eligible: '+JSON.stringify(launch.checks));
 assert.equal(G.executiveLaunch('marketing'),true);
 if(mature){
  assert.equal(G.unitActivate('marketing'),true);
  qualified(s.team[6]);assert.equal(G.unitAppoint('marketing',ids[6]),true);
  assert.equal(G.unitTransfer('marketing',ids[7]),true);
  for(const [role,idx] of [['hr',12],['cfo',13],['coo',14]]){
   qualified(s.team[idx]);assert.ok(G.executiveEligibility(role).ready,'executive '+role+' eligibility');
   assert.equal(G.executiveAppoint(role,ids[idx]),true);
   assert.equal(s.exec.officers[role].mandate,false,'no implicit delegation');
  }
 }
 if(kind==='B')assert.equal(G.propertyOpen('office'),true);
 else assert.equal(G.propertyOpen('hq'),true);
 // Commercial pipeline and directly earned signed work use the production new-deal pricing.
 for(let i=0;i<(mature?4:3);i++)G.createDeal();
 if(kind==='D'){
  // v22.2 saved contracts: missing version with immutable signed fee and original payment terms.
  for(const d of s.deals.slice(0,2)){delete d.pricingVersion;d.agreedFee=d.agreedFee+80;d.bookVal=d.agreedFee;d.paymentTerms=30;}
  s.bi.totals.booked=s.deals.reduce((n,d)=>n+d.bookVal,0);
 }
 for(const d of [...s.deals]){const worker=s.team.find(p=>p.t==='idle'&&p.role.auto&&!s.exec.units.some(u=>u.managerId===p.id)&&(!d.unitKey||s.exec.units.find(u=>u.key===d.unitKey)?.staffIds.includes(p.id)));
  if(worker)G.assign(d.id,worker.id);
 }
 money(s);
 if(kind==='D'){
  const before=s.deals.filter(d=>!Number.isFinite(d.pricingVersion)).map(d=>[d.id,d.agreedFee]);
  const initial={day:s.day,cash:s.cash,sites:JSON.stringify(s.exec.property.sites),units:JSON.stringify(s.exec.units),officers:JSON.stringify(s.exec.officers),people:s.team.map(p=>p.id)};
  G.save();const load=G.load();assert.ok(load,'grandfather load');G.set(load);
  assert.equal(load.day,initial.day);assert.equal(load.cash,initial.cash);
  assert.equal(JSON.stringify(load.exec.property.sites),initial.sites);
  assert.equal(JSON.stringify(load.exec.units),initial.units);
  assert.equal(JSON.stringify(load.exec.officers),initial.officers);
  assert.equal(JSON.stringify(Array.from(load.team,p=>p.id)),JSON.stringify(initial.people));
  for(const [id,fee] of before){const d=load.deals.find(x=>x.id===id);assert.equal(d.agreedFee,fee);assert.equal(d.pricingVersion,undefined);}
  const newcomer=G.createDeal();assert.equal(newcomer.pricingVersion,23);
  return{G,s:load,baseline:cash,fixture:'synthetic v22.2 historical contracts, existing owned terms, original mandates'};
 }
 return{G,s,baseline:cash,fixture:'synthetic pre-earned career, cash and service prerequisites'};
}
function snapshot(G,s,baseline,kind,policy,seed,elapsed){
 const t=s.bi.totals,c=s.bi.categoryTotals,units=s.exec.units||[];
 const unitCost=units.reduce((v,u)=>v+(u.payrollCost||0)+(u.directCost||0)+(u.sharedLaborCost||0)+(u.developmentCost||0),0);
 const unitRevenue=units.reduce((v,u)=>v+(u.revenue||0),0);
 const receivables=s.economy.invoices.filter(x=>x.status==='open').reduce((v,x)=>v+x.amount,0);
 const arrears=s.exec.property.sites.reduce((v,x)=>v+(x.arrears||0),0);
 const dailyPayroll=s.team.reduce((v,p)=>v+G.dailySalary(p),0);
 const property=G.propertySummary();
 const due=arrears+s.bi.unpaidPayroll+s.economy.loan+s.economy.interestDue;
 const cost=t.costs||0,rev=t.revenue||0,profit=rev-cost;
 const otherCashIn=t.cashIn-(rev-receivables);
 const r={scenario:kind,policy,seed,elapsed,day:s.day,people:s.team.length,rep:+s.rep.toFixed(2),
  booked:+t.booked.toFixed(2),openSigned:+s.deals.reduce((v,d)=>v+G.feeFor(d),0).toFixed(2),
  revenue:+rev.toFixed(2),receivables:+receivables.toFixed(2),cashCollections:+Math.max(0,rev-receivables).toFixed(2),
  cashIn:+t.cashIn.toFixed(2),cashOut:+t.cashOut.toFixed(2),
  payroll:+(c.payroll||0).toFixed(2),directLabor:+(t.laborAllocated||0).toFixed(2),
  totalCosts:+cost.toFixed(2),propertyCosts:+(c.property||0).toFixed(2),depreciation:+(c.depreciation||0).toFixed(2),
  unitRevenue:+unitRevenue.toFixed(2),unitCosts:+unitCost.toFixed(2),unitContribution:+(unitRevenue-unitCost).toFixed(2),
  groupProfit:+profit.toFixed(2),corporateRemainder:+((rev-unitRevenue)-(cost-unitCost)).toFixed(2),
  cash:+s.cash.toFixed(2),openingCash:baseline,cashResidual:money(s),
  unpaidPayroll:+s.bi.unpaidPayroll.toFixed(2),arrears:+arrears.toFixed(2),
  loan:+s.economy.loan.toFixed(2),interestDue:+s.economy.interestDue.toFixed(2),
  debtAndArrears:+due.toFixed(2),workingCapital:+(s.cash+receivables-due).toFixed(2),
  runwayDays:+(s.cash/Math.max(.01,dailyPayroll+property.daily)).toFixed(1),
  backlog:s.deals.length,delivered:t.delivered,missed:t.missed,
  utilization:t.deliveryEligibleDays>0?+(100*t.deliveryRoleWorkDays/t.deliveryEligibleDays).toFixed(1):null,
  propertyBook:+property.book.toFixed(2),propertyDaily:+property.daily.toFixed(2),
  hqAffordable:G.propertyReadiness('hq').ready,buildingAffordable:G.propertyReadiness('building').ready,
  hrEligible:G.executiveEligibility('hr').ready,cfoEligible:G.executiveEligibility('cfo').ready,cooEligible:G.executiveEligibility('coo').ready
 };
 assert.ok(r.revenue>=0&&Number.isFinite(r.cash)&&Number.isFinite(r.groupProfit),'finite financial result');
 assert.equal(new Set(s.team.map(p=>p.id)).size,s.team.length,'unique employee IDs');
 assert.ok(r.payroll<=r.totalCosts+.07,'one payroll expense, no second unit cash ledger');
 assert.ok(r.unitRevenue<=r.revenue+.07,'unit bookings cannot exceed earned group revenue');
 assert.ok(r.cashCollections<=r.cashIn+.07,'collections not greater than all cash in');
 assert.equal(r.day,kind==='A'?elapsed:(kind==='B'?180+elapsed:kind==='C'?4704+elapsed:2864+elapsed));
 return r;
}
function run(kind,policy,seed){
 const f=engine(seed),setup=seeded(f.G,kind,policy),G=setup.G,s=G.get();
 const initialIds=s.team.map(p=>p.id),initialAuthority=JSON.stringify(s.exec.officers);
 const start=s.day,rows=[];const first={building:null,hq:null,hr:null,cfo:null,coo:null};
 for(let n=1;n<=730;n++){
  const before=s.day;G.tick();assert.equal(s.day,before+1,'a game day must advance exactly once');
  if(new Set(s.team.map(p=>p.id)).size!==s.team.length)throw Error('duplicate staff IDs');
  const status={building:G.propertyReadiness('building').ready,hq:G.propertyReadiness('hq').ready,hr:G.executiveEligibility('hr').ready,cfo:G.executiveEligibility('cfo').ready,coo:G.executiveEligibility('coo').ready};
  for(const [k,v] of Object.entries(status))if(v&&first[k]===null)first[k]=n;
  if(horizons.includes(n)){
   rows.push(snapshot(G,s,setup.baseline,kind,policy,seed,n));
   const oldDay=s.day,oldCash=s.cash,oldDeals=s.deals.map(d=>[d.id,d.agreedFee,d.pricingVersion]);
   G.save();const loaded=G.load();assert.ok(loaded&&loaded.day===oldDay&&loaded.cash===oldCash,'reload day/cash persistence');
   assert.equal(JSON.stringify(Array.from(loaded.deals,d=>[d.id,d.agreedFee,d.pricingVersion])),JSON.stringify(oldDeals),'contract fee preservation');
   assert.equal(new Set(loaded.team.map(p=>p.id)).size,loaded.team.length);
   assert.equal(JSON.stringify(loaded.exec.units),JSON.stringify(s.exec.units));
   assert.equal(JSON.stringify(loaded.exec.property),JSON.stringify(s.exec.property));
   assert.equal(JSON.stringify(loaded.exec.officers),JSON.stringify(s.exec.officers));
   money(loaded);
  }
 }
 assert.ok(s.day>=start+730);
 if(kind==='C'||kind==='D')for(const role of ['hr','cfo','coo'])assert.equal(s.exec.officers[role].mandate,false,'no unapproved mandate '+role);
 return{rows,first,fixture:setup.fixture};
}
function main(){
 const out={meta:{engine:'Boss production index.html tick()',pricing:'v22.3 candidate',seeds,policies,horizons,measurements:'Since synthetic fixture start; amounts in in-game dollars. No owner Safari save.'},rows:[],firstAffordability:[],failures:[]};
 for(const scenario of ['A','B','C','D'])for(const policy of Object.keys(policies))for(const seed of seeds){
  try{const p=run(scenario,policy,seed);out.rows.push(...p.rows);out.firstAffordability.push({scenario,policy,seed,...p.first});}
  catch(error){out.failures.push({scenario,policy,seed,error:String(error.stack||error)});}
 }
 assert.equal(out.failures.length,0,JSON.stringify(out.failures,null,2));
 assert.equal(out.rows.length,108,'four fixtures × three playstyles × three seeds × three checkpoints');
 // Compare 1x/3x/8x clock presentation: equal production tick() days and financial results.
 const pace=[];for(const speed of [1,3,8]){
  const {G}=engine(777),f=seeded(G,'A','balanced');f.s.ui.speed=speed;
  for(let i=0;i<30;i++)G.tick();const s=f.s;
  pace.push({speed,day:s.day,cash:s.cash,revenues:s.bi.totals.revenue,costs:s.bi.totals.costs,backlog:s.deals.length});
 }
 assert.deepEqual(pace.map(({speed,...x})=>x),[pace[0],pace[0],pace[0]].map(({speed,...x})=>x),'pacing changes timer, not game-day economics');
 out.pace=pace;
 fs.mkdirSync('reports',{recursive:true});
 fs.writeFileSync('reports/v22-3a-economic-proof.json',JSON.stringify(out,null,2)+'\n');
 console.log('PASS v22.3A real engine 4 scenarios, 3 operating assumptions, 3 seeds, 30/180/730-day checkpoints: '+out.rows.length+' reconciled snapshots');
 console.log('PASS deterministic 1x/3x/8x tick parity; no second ledger, no implicit executive mandates, historical contract preservation');
 console.log('ARTIFACT reports/v22-3a-economic-proof.json');
 for(const row of out.rows.filter(r=>r.seed===seeds[0]&&r.policy==='balanced'))console.log('ECONOMIC',JSON.stringify(row));
}
main();
