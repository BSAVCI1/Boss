// v22.3C4 — organic Day-0 founder to genuine HQ eligibility; no fixture cash, staff, completed work or promotions.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8'),original=html.slice(html.indexOf('<script>')+8,html.lastIndexOf('</script>'));
const boot=original.indexOf('S=load();if(!S)fresh();');
assert.ok(boot>0,'load the live production simulation, not a mock economy');
const seeds=[20261018,41],strategies=['corporate-first','balanced-expansion','early-service'],horizons=[30,180,365,730,1095,1460];
const rate='const rate=d.serviceLine?(d.serviceTier>=3?.24:.20):(d.tier>=3?.18:.10);';
const units='const externalUnits=d.serviceLine?1.1:.65;';
const signing='d.economicVersion=1;d.externalProcurementQuote=contractProcurementQuote(d);';
assert.ok(original.includes(rate)&&original.includes(units)&&original.includes(signing),'exact calibrated code anchors');
assert.ok(original.includes('function ladderDevelopDay(')&&original.includes('function ladderTrainingEligible('),'actual production leadership rules');
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
 const names='fresh,load,save,get:()=>S,assign,bestIdle,tick,propertyReadiness,propertyQuote,ladderEvaluation,ladderPromote,ladderNext,companyLaunchReadiness,executiveLaunch,unitActivate,unitAppoint,unitTransfer,unitGMEligible,unitStaffEligible,unitOfPerson,ladderNode,searchCandidates,hireCandidate,propertyOpen,dailySalary,propertyPeople,ladderTrainingEligible,ladderStartTraining,managerCompetence';
 const modelBoot=script.indexOf('S=load();if(!S)fresh();');assert.ok(modelBoot>0,'model-specific bootstrap must be located after quote replacement');
 vm.runInContext(script.slice(0,modelBoot)+'globalThis.G={'+names+'};})();',sandbox,{timeout:10000});
 return{G:sandbox.G,el};
}
function cashCheck(s){const residual=s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash;assert.ok(Math.abs(residual)<.065,'actual cash ledger identity day '+s.day+': '+residual);return +residual.toFixed(3);}
function liability(s){return s.bi.unpaidPayroll+(s.economy.procurementPayable||0)+s.economy.loan+s.economy.interestDue+s.exec.property.sites.reduce((v,p)=>v+(p.arrears||0),0);}
function teamLedger(s){return {id:s.team.map(p=>p.id),salaries:s.team.map(p=>p.id+':'+p.career.rank+':'+p.role.primary),units:JSON.stringify(s.exec.units),sites:JSON.stringify(s.exec.property.sites),officers:JSON.stringify(s.exec.officers),appointments:JSON.stringify(s.org.progression.appointments),deals:JSON.stringify(s.deals.map(d=>[d.id,d.agreedFee,d.pricingVersion,d.economicVersion,d.externalProcurementQuote]))};}
function verifyReload(G,s){const before=teamLedger(s);const day=s.day,cash=s.cash;G.save();const saved=G.load();assert.ok(saved,'actual historical save must load');assert.equal(saved.day,day);assert.equal(saved.cash,cash);assert.equal(JSON.stringify(saved.team.map(p=>p.id)),JSON.stringify(before.id));assert.equal(JSON.stringify(saved.exec.units),before.units);assert.equal(JSON.stringify(saved.exec.property.sites),before.sites);assert.equal(JSON.stringify(saved.exec.officers),before.officers);assert.equal(JSON.stringify(saved.org.progression.appointments),before.appointments);assert.equal(JSON.stringify(saved.deals.map(d=>[d.id,d.agreedFee,d.pricingVersion,d.economicVersion,d.externalProcurementQuote])),before.deals);cashCheck(saved);}
function view(G,s,model,seed,elapsed){
 const payable=s.economy.procurementPayable||0,property=G.propertyReadiness('hq'),cost=s.bi.categoryTotals,price=G.propertyQuote('hq'),dailyPayroll=s.team.reduce((v,p)=>v+G.dailySalary(p),0);
 const appointments=s.org.progression.appointments,record={model,seed,elapsed,day:s.day,openingCash:s.bi.openingCash,cashCollected:+s.bi.totals.cashIn.toFixed(2),cashPaid:+s.bi.totals.cashOut.toFixed(2),totalCosts:+s.bi.totals.costs.toFixed(2),
  revenue:+s.bi.totals.revenue.toFixed(2),groupProfit:+(s.bi.totals.revenue-s.bi.totals.costs).toFixed(2),cash:+s.cash.toFixed(2),
  payroll:+(cost.payroll||0).toFixed(2),hiringCost:+(cost.recruiting||0).toFixed(2),trainingCost:+(cost.development||0).toFixed(2),procurement:+(cost.procurement||0).toFixed(2),procurementPayable:+payable.toFixed(2),
  propertyCosts:+(cost.property||0).toFixed(2),receivables:+s.economy.invoices.filter(x=>x.status==='open').reduce((v,z)=>v+z.amount,0).toFixed(2),
  liabilities:+liability(s).toFixed(2),runwayDays:+(s.cash/Math.max(.01,dailyPayroll+s.exec.property.sites.filter(z=>z.status==='active').reduce((v,z)=>v+z.dayCost,0))).toFixed(2),
  employees:s.team.length,corporate:G.propertyPeople().length,lead:appointments.filter(x=>x.level==='lead').length,
  managers:appointments.filter(x=>x.level==='manager').length,seniors:appointments.filter(x=>x.level==='senior').length,
  directors:appointments.filter(x=>x.level==='director').length,units:s.exec.units.filter(u=>s.team.some(p=>p.id===u.managerId)).length,
  deliveries:s.market.completed,backlog:s.deals.filter(d=>!d.biCompleted).length,managedUnitKeys:s.exec.units.filter(u=>s.team.some(p=>p.id===u.managerId)).map(u=>u.key),hqCashThreshold:+property.required.toFixed(2),hqPrice:price.price,hqCashReady:property.checks.at(-1).met,
  hqEligible:property.ready,hqOwned:s.exec.property.sites.some(x=>x.type==='hq'&&x.status!=='sold'),
  unmet:property.checks.filter(x=>!x.met).map(x=>x.label),cashResidual:cashCheck(s)};
 assert.equal(record.openingCash,90,'founder cash may not be injected');
 assert.equal(new Set(s.team.map(p=>p.id)).size,s.team.length,'unique real employees');
 assert.ok(record.cash>=-.005,'no artificial overdraft');
 assert.ok(record.procurementPayable>=-.005,'vendor payable preserved');
 assert.ok(record.payroll<=s.bi.totals.costs+.065,'do not double count payroll');
 return record;
}

/* Actual engine + explicit player strategy. All cash, employees, seniority,
   contract completion, GM staffing, and assets arise from real state transitions. */
function simulate(seed,strategy,horizon){
 const {G,el}=makeEngine(seed,'balanced');G.fresh();const s=G.get();
 assert.equal(s.day,0);assert.equal(s.cash,90);assert.equal(s.team.length,3);assert.equal(s.market.completed,0);
 assert.equal(s.bi.openingCash,90);
 const policies={
  'corporate-first':{cadence:20,limit:42,reserve:60,launchDay:540,launchCash:10000,secondCash:12000},
  'balanced-expansion':{cadence:20,limit:42,reserve:60,launchDay:300,launchCash:4500,secondCash:7500},
  'early-service':{cadence:25,limit:27,reserve:80,launchDay:90,launchCash:2000,secondCash:5000}
 };
 const policy=policies[strategy];assert.ok(policy);
 // An explicit founder strategy rather than injected external demand/projects.
 s.nextEv=99999999;s.world.nextEvent=99999999;s.pipeline.mode='growth';s.pipeline.target=6;
 s.world.strategy='volume';s.economy.pricing='competitive';s.economy.terms=14;
 G.assign(s.deals[0].id,s.team[1].id);G.assign(s.deals[1].id,s.team[2].id);
 const first={hire:null,lead:null,manager:null,senior:null,director:null,
  firstBusiness:null,firstGM:null,secondBusiness:null,secondGM:null,
  hqCash:null,hqEligible:null,hqPurchase:null};
 const checkpoints=[],decisions=[],lastFailure={},daySnapshots=[];
 let purchase=null,courseStarts=0,trainingCompletes=0,hires=0,assignedPersonDays=0,staffedPersonDays=0;
 const capture=(day)=>{
  const v=view(G,s,strategy,seed,day);
  v.workAssignmentUtilizationPct=staffedPersonDays?+(assignedPersonDays/staffedPersonDays*100).toFixed(2):0;
  v.completionCount=s.market.completed;
  v.unitRevenue=s.exec.units.map(u=>({key:u.key,gm:u.managerId,staff:u.staffIds.length,revenue:+(u.revenue||0).toFixed(2)}));
  v.gmCount=s.exec.units.filter(u=>s.team.some(p=>p.id===u.managerId)).length;
  v.trainingStarts=courseStarts;v.trainingCompletions=trainingCompletes;v.hires=hires;
  checkpoints.push(v);verifyReload(G,s);
  console.log('C4_CHECKPOINT '+JSON.stringify({strategy,seed,...v}));
 };
 for(let day=1;day<=horizon;day++){
  // Player applies genuine contract staffing based on employee availability.
  if(day===1||day%3===0){let assigned=0;
   for(const d of s.deals.filter(d=>!d.w)){
    if(assigned>=3)break;const p=G.bestIdle(d);
    if(p){G.assign(d.id,p.id);if(d.w===p.id)assigned++;}
   }
  }
  // Paid recruiting never exceeds CEO-selected headcount and required wage reserve.
  const baseWage=()=>s.team.reduce((a,p)=>a+G.dailySalary(p),0);
  if(day%policy.cadence===0&&s.team.length<policy.limit&&s.cash>600+baseWage()*policy.reserve){
   el('hire-skill').value=['prod','mkt','sales','ops'][Math.floor(s.team.length/2)%4];
   G.searchCandidates();const c=s.hr.pool[0];
   if(c&&s.cash>c.fee+baseWage()*policy.reserve){
    const before=s.team.length,cash=s.cash;G.hireCandidate(c.id);
    if(s.team.length===before+1){hires++;assert.ok(s.cash<cash,'recruitment paid');if(first.hire===null)first.hire=day;
     if(decisions.length<180)decisions.push({day,type:'paidHire',id:s.team.at(-1).id,fee:c.fee});}
   }
  }
  if(day%63===0){
   const p=s.org.progression.appointments.map(x=>s.team.find(y=>y.id===x.id)).find(p=>p&&G.ladderTrainingEligible(p));
   if(p){const before=s.cash;
    if(G.ladderStartTraining(p.id)){assert.ok(s.cash<before,'course paid by CEO');courseStarts++;
     if(decisions.length<180)decisions.push({day,type:'paidStudy',id:p.id});}
   }
  }
  if(day%7===0){
   const next=G.ladderNext();
   if(next?.ready&&G.ladderPromote(next.level,next.candidateId,true)){
    if(first[next.level]===null)first[next.level]=day;
    if(decisions.length<180)decisions.push({day,type:'legitimatePromotion',level:next.level,id:next.candidateId});
   }
  }
  // Optional CEO-approved premises as staffing expands. Property costs and recurring
  // upkeep are posted by the real engine, never waived by this harness.
  const corpNow=G.propertyPeople().length;
  const premises=s.exec.property.sites.find(z=>z.status==='active'&&!z.unitKey);
  const target=corpNow>=26?'building':corpNow>=14?'office':corpNow>=8?'studio':null;
  if(target&&premises?.type!==target&&!(premises?.type==='hq')
    &&(target==='building'?s.cash>12000:target==='office'?s.cash>5000:s.cash>2000)){
   const gate=G.propertyReadiness(target),quote=G.propertyQuote(target);
   if(gate.ready&&s.cash>quote.price+baseWage()*policy.reserve){
    const beforeCash=s.cash,beforeSites=s.exec.property.sites.length;
    if(G.propertyOpen(target)){
     assert.ok(Math.abs(beforeCash-s.cash-quote.price)<.065,'real property acquisition cost');
     assert.equal(s.exec.property.sites.length,beforeSites+1,'real premises record');
     if(decisions.length<180)decisions.push({day,type:'approvedPremises',property:target,cost:quote.price});
    }
   }else lastFailure.premises=gate.checks.filter(c=>!c.met).map(c=>c.label);
  }
  // Do not launch early in a corporate-first scenario; actual readiness is authoritative.
  if(day>=policy.launchDay&&!s.exec.lines.some(x=>x.key==='product')
     &&s.cash>policy.launchCash){
   const ready=G.companyLaunchReadiness('product');
   if(ready.ready){
    const before=s.cash;if(G.executiveLaunch('product')){
     assert.ok(Math.abs(before-s.cash-120)<.065,'actual $120 investment');
     first.firstBusiness=day;if(decisions.length<180)decisions.push({day,type:'paidLaunch',unit:'product'});
    }
   }else lastFailure.product=ready.checks.filter(c=>!c.met).map(c=>c.label);
  }
  if(s.exec.lines.some(x=>x.key==='product')&&!s.exec.units.some(u=>u.key==='product'))
   assert.equal(G.unitActivate('product'),true,'genuine first unit');
  // Preserve leadership bench when appointing GMs; protect real client deliveries.
  for(const u of s.exec.units.filter(u=>!u.managerId)){
   const p=s.team.find(p=>p.t==='idle'&&!G.ladderNode(p.id)&&G.unitGMEligible(p,u.key)&&!G.unitOfPerson(p.id));
   if(p&&G.unitAppoint(u.key,p.id)){
    const key=u.key==='product'?'firstGM':'secondGM';
    if(first[key]===null)first[key]=day;
    if(decisions.length<180)decisions.push({day,type:'realGM',unit:u.key,id:p.id});
   }
  }
  for(const u of s.exec.units.filter(u=>u.managerId&&!u.staffIds.some(id=>id!==u.managerId))){
   const p=s.team.find(p=>p.t==='idle'&&!G.ladderNode(p.id)&&p.id!==u.managerId&&G.unitStaffEligible(p,u.key));
   if(p&&G.unitTransfer(u.key,p.id)&&decisions.length<180)decisions.push({day,type:'unitSpecialist',unit:u.key,id:p.id});
  }
  if(s.exec.lines.some(x=>x.key==='product')&&!s.exec.lines.some(x=>x.key==='marketing')
     &&s.cash>policy.secondCash){
   const ready=G.companyLaunchReadiness('marketing');
   if(ready.ready){
    const before=s.cash;if(G.executiveLaunch('marketing')){
     assert.ok(Math.abs(before-s.cash-120)<.065,'paid second launch');
     first.secondBusiness=day;if(decisions.length<180)decisions.push({day,type:'paidLaunch',unit:'marketing'});
    }
   }else lastFailure.marketing=ready.checks.filter(c=>!c.met).map(c=>c.label);
  }
  if(s.exec.lines.some(x=>x.key==='marketing')&&!s.exec.units.some(u=>u.key==='marketing'))
   assert.equal(G.unitActivate('marketing'),true,'genuine second unit');
  // Revisit newly created units without manufacturing a manager or delivery.
  for(const u of s.exec.units.filter(u=>!u.managerId)){
   const p=s.team.find(p=>p.t==='idle'&&!G.ladderNode(p.id)&&G.unitGMEligible(p,u.key)&&!G.unitOfPerson(p.id));
   if(p&&G.unitAppoint(u.key,p.id)){const k=u.key==='product'?'firstGM':'secondGM';if(first[k]===null)first[k]=day;}
  }
  for(const u of s.exec.units.filter(u=>u.managerId&&!u.staffIds.some(id=>id!==u.managerId))){
   const p=s.team.find(p=>p.t==='idle'&&!G.ladderNode(p.id)&&p.id!==u.managerId&&G.unitStaffEligible(p,u.key));
   if(p)G.unitTransfer(u.key,p.id);
  }
  const check=G.propertyReadiness('hq'),finance=check.checks.at(-1);
  if(finance.met&&first.hqCash===null)first.hqCash=day;
  if(check.ready&&!purchase){
   first.hqEligible=day;
   assert.ok(check.checks.every(c=>c.met),'HQ actual full milestone qualification');
   const beforeCash=s.cash,quote=G.propertyQuote('hq');
   const beforeSites=s.exec.property.sites.length;
   assert.equal(G.propertyOpen('hq'),true,'explicit synthetic CEO approval; no automatic production purchase');
   assert.ok(Math.abs(beforeCash-s.cash-quote.price)<.065,'one-time HQ cash debit');
   assert.equal(s.exec.property.sites.length,beforeSites+1,'one asset recorded');
   assert.equal(s.exec.property.sites.filter(x=>x.type==='hq'&&x.status==='active').length,1,'single HQ');
   purchase={day,paid:quote.price,beforeCash:+beforeCash.toFixed(2),afterCash:+s.cash.toFixed(2)};
   first.hqPurchase=day;verifyReload(G,s);
   assert.equal(G.propertyOpen('hq'),false,'cannot duplicate already owned active HQ');
  }
  staffedPersonDays+=s.team.length;
  assignedPersonDays+=new Set(s.deals.filter(d=>d.w).map(d=>d.w)).size;
  const beforeDay=s.day,beforeComplete=s.team.reduce((n,p)=>n+Object.keys(p.career.leadershipCourses||{}).length,0);
  G.tick();assert.equal(s.day,beforeDay+1,'one real game day');
  trainingCompletes+=Math.max(0,s.team.reduce((n,p)=>n+Object.keys(p.career.leadershipCourses||{}).length,0)-beforeComplete);
  assert.equal(new Set(s.team.map(p=>p.id)).size,s.team.length,'never duplicate employees');
  assert.ok(s.cash>=-.005,'no cash injected and negative treasury');
  if(day===730||day===1460)cashCheck(s);
  if(horizons.includes(day)){capture(day);}
 }
 if(!purchase)assert.equal(s.exec.property.sites.some(z=>z.type==='hq'&&z.status!=='sold'),false,'no unauthorized HQ');
 const result={seed,strategy,first,hires,courseStarts,trainingCompletes,purchase,
  checkpoints,lastFailure,decisions,
  closingBlocker:G.propertyReadiness('hq').checks.filter(c=>!c.met).map(c=>({label:c.label,detail:c.detail||null})),
  closingUnits:s.exec.units.map(u=>({key:u.key,gm:u.managerId,staff:u.staffIds,delivered:s.exec.lines.find(x=>x.key===u.key)?.delivered||0}))};
 cashCheck(s);verifyReload(G,s);
 return result;
}
function stats(values){const a=values.filter(Number.isFinite).sort((x,y)=>x-y);return a.length?{mean:+(a.reduce((p,q)=>p+q,0)/a.length).toFixed(2),median:+a[Math.floor(a.length/2)].toFixed(2),min:a[0],max:a.at(-1)}:null;}

const out={meta:{version:'v22.3C4',source:'Actual production game index.html, tick and original CEO actions',
 openingCapital:90,procurement:'balanced actual prospective quote',seeds,strategies,horizons,
 policy:'3 explicitly distinct player decisions; no artificial cash/workforce/qualifications/deliveries; real hiring/course/launch payment',
 utilizationDefinition:'sampled assigned contract people / total staffed person-days; not occupied operational capacity',
 ownerSafariTested:false},runs:[],summary:[],failures:[]};
for(const strategy of strategies)for(const seed of seeds){
 // Feasible second-seed check through 730 days; full 1460 for principal seed.
 const horizon=seed===seeds[0]?1460:730;
 try{const r=simulate(seed,strategy,horizon);out.runs.push(r);
  console.log('C4_FINAL '+JSON.stringify({strategy,seed,first:r.first,last:r.checkpoints.at(-1),blocks:r.closingBlocker,purchase:r.purchase,launchBlockers:r.lastFailure}));
 }catch(e){out.failures.push({strategy,seed,error:String(e.stack||e)});}
}
for(const strategy of strategies)for(const day of horizons){
 const rows=out.runs.filter(r=>r.strategy===strategy).map(r=>r.checkpoints.find(x=>x.day===day)).filter(Boolean);
 if(!rows.length)continue;
 const entry={strategy,day,n:rows.length};
 for(const k of ['revenue','groupProfit','cash','cashCollected','cashPaid','totalCosts','payroll','hiringCost',
 'trainingCost','procurement','procurementPayable','propertyCosts','receivables','liabilities',
 'runwayDays','employees','corporate','lead','managers','seniors','directors','units','deliveries',
 'backlog','workAssignmentUtilizationPct','hqCashThreshold'])entry[k]=stats(rows.map(r=>r[k]));
 entry.hqEligible=rows.filter(r=>r.hqEligible).length;
 entry.hqOwned=rows.filter(r=>r.hqOwned).length;
 out.summary.push(entry);
}
fs.mkdirSync('reports',{recursive:true});
fs.writeFileSync('reports/v22-3c4-integrated-growth.json',JSON.stringify(out,null,2)+'\n');
assert.equal(out.failures.length,0,JSON.stringify(out.failures,null,2));
assert.equal(out.runs.length,strategies.length*seeds.length,'all scenarios really executed');
console.log('PASS v22.3C4: six earned founder actual-engine strategy runs, 3 full 1460d and 3 seed-41 730d, strict finance/HQ/save checks; eligibility is measured and may remain blocked');
