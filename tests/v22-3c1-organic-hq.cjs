// v22.3C1 — organic Day-0 founder to genuine HQ eligibility; no fixture cash, staff, completed work or promotions.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8'),original=html.slice(html.indexOf('<script>')+8,html.lastIndexOf('</script>'));
const boot=original.indexOf('S=load();if(!S)fresh();');
assert.ok(boot>0,'load the live production simulation, not a mock economy');
const seeds=[20261018,41,73003],models=['baseline','balanced','pressure'],horizons=[30,180,730];
const rate='const rate=d.serviceLine?(d.serviceTier>=3?.24:.20):(d.tier>=3?.18:.10);';
const units='const externalUnits=d.serviceLine?1.1:.65;';
const signing='d.economicVersion=1;d.externalProcurementQuote=contractProcurementQuote(d);';
assert.ok(original.includes(rate)&&original.includes(units)&&original.includes(signing),'exact calibrated code anchors');
function makeEngine(seed,model){
 let script=original;
 if(model==='baseline')script=script.replace(signing,'d.economicVersion=0;d.externalProcurementQuote=0;');
 if(model==='pressure')script=script.replace(rate,'const rate=d.serviceLine?(d.serviceTier>=3?.56:.48):(d.tier>=3?.42:.32);').replace(units,'const externalUnits=d.serviceLine?2.0:1.4;');
 assert.ok(model==='balanced'||script!==original,'economic stress variation inserted');
 const store=new Map(),elements=new Map();function el(id){
  if(!elements.has(id))elements.set(id,{id,innerHTML:'',textContent:'',value:'',checked:false,disabled:false,open:false,hidden:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},setAttribute(){},removeAttribute(){},focus(){},scrollIntoView(){},parentNode:{open:true},contains(){return false}});
  return elements.get(id);
 }
 let value=seed>>>0;const rng=Object.create(Math);rng.random=()=>{value=(Math.imul(1664525,value)+1013904223)>>>0;return value/4294967296;};
 const sandbox={document:{getElementById:el,querySelector:()=>el('x'),querySelectorAll:()=>[],documentElement:el('html'),body:el('body'),activeElement:null,addEventListener(){}},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},clearInterval(){},getComputedStyle:()=>({getPropertyValue:()=>''}),Math:rng,Date,JSON,Set,Map,console};
 vm.createContext(sandbox);
 const names='fresh,load,save,get:()=>S,assign,bestIdle,tick,propertyReadiness,propertyQuote,ladderEvaluation,ladderPromote,ladderNext,companyLaunchReadiness,executiveLaunch,unitActivate,unitAppoint,unitTransfer,unitGMEligible,unitStaffEligible,unitOfPerson,ladderNode,searchCandidates,hireCandidate,propertyOpen,dailySalary,propertyPeople';
 vm.runInContext(script.slice(0,boot)+'globalThis.G={'+names+'};})();',sandbox,{timeout:10000});
 return{G:sandbox.G,el};
}
function cashCheck(s){const residual=s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash;assert.ok(Math.abs(residual)<.065,'actual cash ledger identity day '+s.day+': '+residual);return +residual.toFixed(3);}
function liability(s){return s.bi.unpaidPayroll+(s.economy.procurementPayable||0)+s.economy.loan+s.economy.interestDue+s.exec.property.sites.reduce((v,p)=>v+(p.arrears||0),0);}
function teamLedger(s){return {id:s.team.map(p=>p.id),salaries:s.team.map(p=>p.id+':'+p.career.rank+':'+p.role.primary),units:JSON.stringify(s.exec.units),sites:JSON.stringify(s.exec.property.sites),officers:JSON.stringify(s.exec.officers),appointments:JSON.stringify(s.org.progression.appointments),deals:JSON.stringify(s.deals.map(d=>[d.id,d.agreedFee,d.pricingVersion,d.economicVersion,d.externalProcurementQuote]))};}
function verifyReload(G,s){const before=teamLedger(s);const day=s.day,cash=s.cash;G.save();const saved=G.load();assert.ok(saved,'actual historical save must load');assert.equal(saved.day,day);assert.equal(saved.cash,cash);assert.equal(JSON.stringify(saved.team.map(p=>p.id)),JSON.stringify(before.id));assert.equal(JSON.stringify(saved.exec.units),before.units);assert.equal(JSON.stringify(saved.exec.property.sites),before.sites);assert.equal(JSON.stringify(saved.exec.officers),before.officers);assert.equal(JSON.stringify(saved.org.progression.appointments),before.appointments);assert.equal(JSON.stringify(saved.deals.map(d=>[d.id,d.agreedFee,d.pricingVersion,d.economicVersion,d.externalProcurementQuote])),before.deals);cashCheck(saved);}
function view(G,s,model,seed,elapsed){
 const payable=s.economy.procurementPayable||0,property=G.propertyReadiness('hq'),cost=s.bi.categoryTotals,price=G.propertyQuote('hq'),dailyPayroll=s.team.reduce((v,p)=>v+G.dailySalary(p),0);
 const appointments=s.org.progression.appointments,record={model,seed,elapsed,day:s.day,openingCash:s.bi.openingCash,
  revenue:+s.bi.totals.revenue.toFixed(2),groupProfit:+(s.bi.totals.revenue-s.bi.totals.costs).toFixed(2),cash:+s.cash.toFixed(2),
  payroll:+(cost.payroll||0).toFixed(2),procurement:+(cost.procurement||0).toFixed(2),procurementPayable:+payable.toFixed(2),
  propertyCosts:+(cost.property||0).toFixed(2),receivables:+s.economy.invoices.filter(x=>x.status==='open').reduce((v,z)=>v+z.amount,0).toFixed(2),
  liabilities:+liability(s).toFixed(2),runwayDays:+(s.cash/Math.max(.01,dailyPayroll+s.exec.property.sites.filter(z=>z.status==='active').reduce((v,z)=>v+z.dayCost,0))).toFixed(2),
  employees:s.team.length,corporate:G.propertyPeople().length,lead:appointments.filter(x=>x.level==='lead').length,
  managers:appointments.filter(x=>x.level==='manager').length,seniors:appointments.filter(x=>x.level==='senior').length,
  directors:appointments.filter(x=>x.level==='director').length,units:s.exec.units.filter(u=>s.team.some(p=>p.id===u.managerId)).length,
  deliveries:s.market.completed,hqCashThreshold:+property.required.toFixed(2),hqPrice:price.price,hqCashReady:property.checks.at(-1).met,
  hqEligible:property.ready,hqOwned:s.exec.property.sites.some(x=>x.type==='hq'&&x.status!=='sold'),
  unmet:property.checks.filter(x=>!x.met).map(x=>x.label),cashResidual:cashCheck(s)};
 assert.equal(record.openingCash,90,'founder cash may not be injected');
 assert.equal(new Set(s.team.map(p=>p.id)).size,s.team.length,'unique real employees');
 assert.ok(record.cash>=-.005,'no artificial overdraft');
 assert.ok(record.procurementPayable>=-.005,'vendor payable preserved');
 assert.ok(record.payroll<=s.bi.totals.costs+.065,'do not double count payroll');
 return record;
}
function simulate(seed,model){
 const {G,el}=makeEngine(seed,model);G.fresh();const s=G.get();
 assert.equal(s.day,0);assert.equal(s.cash,90);assert.equal(s.team.length,3);assert.equal(s.market.completed,0);
 const originalIds=s.team.map(p=>p.id),first={hire:null,lead:null,manager:null,senior:null,director:null,firstBusiness:null,firstGM:null,secondBusiness:null,secondGM:null,hqCash:null,hqEligible:null,hqPurchase:null};
 // CEO selected growth/demand strategy; market events are disabled as in the established reproducible E scenario.
 s.nextEv=99999999;s.world.nextEvent=99999999;s.pipeline.mode='growth';s.pipeline.target=6;
 s.world.strategy='volume';s.economy.pricing='competitive';s.economy.terms=14;
 G.assign(s.deals[0].id,s.team[1].id);G.assign(s.deals[1].id,s.team[2].id);
 const checkpoints=[],decisions=[];let purchase=null;
 for(let n=1;n<=730;n++){
  // Real CEO review at three-day intervals, using production job suitability and authorization.
  if(n===1||n%3===0){let approvals=0;for(const d of s.deals.filter(x=>!x.w)){
   if(approvals>=3)break;const p=G.bestIdle(d);if(p){G.assign(d.id,p.id);if(d.w===p.id)approvals++;}
  }}
  // No artificial employees: search real candidate pool, pay hiring fees, keep 80 payroll days in liquid cash.
  if(n%25===0&&s.team.length<27&&s.cash>750+s.team.reduce((v,p)=>v+G.dailySalary(p),0)*80){
   el('hire-skill').value=['prod','mkt','sales','ops'][Math.floor(s.team.length/2)%4];
   G.searchCandidates();const c=s.hr.pool[0];
   if(c&&s.cash>c.fee+s.team.reduce((v,p)=>v+G.dailySalary(p),0)*80){
    const people=s.team.length;G.hireCandidate(c.id);
    if(s.team.length>people){if(first.hire===null)first.hire=n;decisions.push({day:n,type:'recruited',fee:c.fee,id:s.team.at(-1).id});}
   }
  }
  // Explicit CEO exception approval only when the REAL progression/experience/treasury gates say ready.
  if(n%7===0){const next=G.ladderNext();if(next?.ready&&G.ladderPromote(next.level,next.candidateId,true)){
   if(first[next.level]===null)first[next.level]=n;
   decisions.push({day:n,type:'leadership',level:next.level,id:next.candidateId});
  }}
  if(!s.exec.lines.length&&s.cash>2000&&G.companyLaunchReadiness('product').ready&&G.executiveLaunch('product')){first.firstBusiness=n;decisions.push({day:n,type:'firstBusiness'});}
  if(s.exec.lines.some(x=>x.key==='product')&&!s.exec.units.some(u=>u.key==='product'))assert.equal(G.unitActivate('product'),true);
  for(const u of s.exec.units.filter(u=>!u.managerId)){
   const c=s.team.find(p=>p.t==='idle'&&G.unitGMEligible(p,u.key)&&!G.unitOfPerson(p.id));
   if(c&&G.unitAppoint(u.key,c.id)){if(first[u.key==='product'?'firstGM':'secondGM']===null)first[u.key==='product'?'firstGM':'secondGM']=n;decisions.push({day:n,type:'appointedGM',unit:u.key,id:c.id});}
  }
  for(const u of s.exec.units.filter(u=>u.managerId&&!u.staffIds.some(id=>id!==u.managerId))){
   const specialist=s.team.find(p=>p.t==='idle'&&G.unitStaffEligible(p,u.key)&&!G.ladderNode(p.id)&&p.id!==u.managerId);
   if(specialist&&G.unitTransfer(u.key,specialist.id))decisions.push({day:n,type:'unitSpecialist',unit:u.key,id:specialist.id});
  }
  if(s.exec.lines.length===1&&s.cash>5000&&G.companyLaunchReadiness('marketing').ready&&G.executiveLaunch('marketing')){first.secondBusiness=n;decisions.push({day:n,type:'secondBusiness'});}
  if(s.exec.lines.some(x=>x.key==='marketing')&&!s.exec.units.some(u=>u.key==='marketing'))assert.equal(G.unitActivate('marketing'),true);
  const hq=G.propertyReadiness('hq');const finance=hq.checks.at(-1);
  if(finance.met&&first.hqCash===null)first.hqCash=n;
  if(hq.ready&&!purchase){
   first.hqEligible=n;const opening=s.cash,before=JSON.stringify(s.exec.property.sites),quote=G.propertyQuote('hq');
   assert.ok(G.propertyOpen('hq'),'real CEO authorized property purchase when ALL rules true');
   assert.ok(Math.abs(s.cash-(opening-quote.price))<.065,'HQ purchase debited exactly once');
   assert.ok(s.exec.property.sites.some(p=>p.type==='hq'&&p.status==='active'&&p.price===quote.price),'HQ asset and terms persisted');
   assert.ok(JSON.stringify(s.exec.property.sites)!==before);
   purchase={day:n,paid:quote.price,siteCount:s.exec.property.sites.length,cashAfter:+s.cash.toFixed(2)};
   first.hqPurchase=n;verifyReload(G,s);
  }
  const start=s.day;G.tick();assert.equal(s.day,start+1,'one actual simulation day must advance');
  assert.equal(new Set(s.team.map(p=>p.id)).size,s.team.length);
  if(horizons.includes(n)){checkpoints.push(view(G,s,model,seed,n));verifyReload(G,s);}
 }
 assert.deepEqual(s.team.filter(p=>originalIds.includes(p.id)).map(p=>p.id),originalIds.filter(id=>s.team.some(p=>p.id===id)),'original IDs remain unless real departure');
 if(!purchase)assert.equal(s.exec.property.sites.some(x=>x.type==='hq'&&x.status!=='sold'),false,'no HQ may appear without the actual permitted purchase');
 return {model,seed,first,purchase,checkpoints,decisions:decisions.slice(0,125),closingBlocker:G.propertyReadiness('hq').checks.filter(x=>!x.met)};
}
function stats(values){const a=values.filter(Number.isFinite).sort((x,y)=>x-y);return a.length?{mean:+(a.reduce((p,q)=>p+q,0)/a.length).toFixed(2),median:+a[Math.floor(a.length/2)].toFixed(2),min:a[0],max:a.at(-1)}:null;}
const out={meta:{version:'v22.3C1',source:'Actual production Boss index.html and tick()',openingCapital:90,models,seeds,horizons,policy:'Explicit CEO growth strategy and paid periodic hires; 80-day salary reserve, paid $120 launches, real promotion/GM eligibility, no synthetic employees or milestones',ownerSafariTested:false},runs:[],summary:[],failures:[]};
for(const model of models)for(const seed of seeds){
 try{const r=simulate(seed,model);out.runs.push(r);console.log('ORGANIC',JSON.stringify({model,seed,first:r.first,final:r.checkpoints.at(-1),blocker:r.closingBlocker}));}
 catch(error){out.failures.push({model,seed,error:String(error.stack||error)});}
}
assert.equal(out.failures.length,0,JSON.stringify(out.failures,null,2));
assert.equal(out.runs.length,9);
for(const model of models)for(const elapsed of horizons){
 const rows=out.runs.filter(r=>r.model===model).map(r=>r.checkpoints.find(x=>x.elapsed===elapsed));
 const s={model,elapsed,seedCount:rows.length};
 for(const k of ['revenue','groupProfit','cash','payroll','procurement','procurementPayable','propertyCosts','receivables','liabilities','runwayDays','employees','corporate','lead','managers','seniors','directors','units','deliveries','hqCashThreshold'])s[k]=stats(rows.map(x=>x[k]));
 s.hqEligible=rows.filter(x=>x.hqEligible).length;s.hqOwned=rows.filter(x=>x.hqOwned).length;
 out.summary.push(s);
}
fs.mkdirSync('reports',{recursive:true});
fs.writeFileSync('reports/v22-3c1-organic-hq.json',JSON.stringify(out,null,2)+'\n');
console.log('PASS v22.3C1: nine actual-engine 730d earned-only founder replays, 27 checkpoints, strict milestone and finance audit; HQ cannot be purchased without full gates');
