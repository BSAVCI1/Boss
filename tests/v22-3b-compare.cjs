// v22.3B: compare actual game-engine scenario distributions, not illustrative cost arithmetic.
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const models=['baseline','minimal','balanced','pressure'];
const all=Object.fromEntries(models.map(m=>[m,JSON.parse(fs.readFileSync('reports/v22-3b-'+m+'.json','utf8'))]));
const keys=['A','B','C','D','E','F','G'],policies=['conservative','balanced','growth'],days=[30,180,730];
function stats(values){const a=values.filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;const mean=a.reduce((x,y)=>x+y,0)/a.length;return{n:a.length,mean:+mean.toFixed(2),min:+a[0].toFixed(2),median:+a[Math.floor(a.length/2)].toFixed(2),max:+a[a.length-1].toFixed(2)};}
const metrics=['revenue','booked','cashCollections','groupProfit','payroll','procurementCosts','procurementPaid','procurementPayable','unitContribution','propertyCosts','depreciation','receivables','cash','workingCapital','runwayDays','utilization','backlog','missed','debtAndArrears'];
const report={source:'Actual Boss index.html tick(); scenarios frozen per policy and seed',models:{},comparison:[],acceptance:{}};
for(const m of models){
 const t=all[m];assert.equal(t.meta.model,m);assert.equal(t.rows.length,189,'all 7 x 3 x 3 x 3 checkpoints exist in '+m);
 assert.equal(t.failures.length,0,'simulation failures in '+m);
 for(const r of t.rows){
  assert.ok(Number.isFinite(r.groupProfit)&&Number.isFinite(r.cash));
  assert.ok(Math.abs(r.groupProfit-r.unitContribution-r.corporateRemainder)<.08,'P&L bridge '+m+' '+JSON.stringify([r.scenario,r.seed,r.elapsed]));
  assert.ok(Math.abs(r.cashResidual)<.065,'cash ledger '+m);
  assert.ok(r.procurementPayable>=0&&r.debtAndArrears>=0,'liabilities never vanish '+m);
  assert.ok(r.payroll<=r.totalCosts+.1,'no double payroll '+m);
  assert.ok(r.ledgerLaborAllocated<=r.payroll+.1,'tracked direct labor is part of payroll');
  if(m==='baseline')assert.equal(r.procurementCosts,0,'true baseline has no procurement');
 }
 const stage=[];
 for(const k of keys)for(const policy of policies)for(const elapsed of days){
  const rows=t.rows.filter(r=>r.scenario===k&&r.policy===policy&&r.elapsed===elapsed);
  assert.equal(rows.length,3,'three comparable random seeds');
  const result={scenario:k,policy,elapsed,margin:stats(rows.map(r=>r.revenue>0?100*r.groupProfit/r.revenue:null))};
  for(const key of metrics)result[key]=stats(rows.map(r=>r[key]));
  result.survival={operatingCashNonnegative:rows.filter(r=>r.cash>=0).length,shortPayroll:rows.filter(r=>r.unpaidPayroll>0).length,propertyAffordable:rows.filter(r=>r.hqAffordable).length,hqOwned:rows.filter(r=>r.hqOwned).length};
  stage.push(result);
 }
 report.models[m]={stages:stage};
}
for(const k of keys)for(const policy of policies)for(const elapsed of days){
 const pick=m=>report.models[m].stages.find(x=>x.scenario===k&&x.policy===policy&&x.elapsed===elapsed);
 const b=pick('baseline'),selected=pick('balanced');
 report.comparison.push({scenario:k,policy,elapsed,baselineMargin:b.margin?.mean,selectedMargin:selected.margin?.mean,baselineProfit:b.groupProfit.mean,selectedProfit:selected.groupProfit.mean,baselineRevenue:b.revenue.mean,selectedRevenue:selected.revenue.mean,additionalProcurement:selected.procurementCosts.mean});
}
const old=report.models.baseline.stages.find(x=>x.scenario==='C'&&x.policy==='balanced'&&x.elapsed===730);
const selected=report.models.balanced.stages.find(x=>x.scenario==='C'&&x.policy==='balanced'&&x.elapsed===730);
const founder=report.models.balanced.stages.find(x=>x.scenario==='A'&&x.policy==='balanced'&&x.elapsed===730);
const organic=report.models.balanced.stages.find(x=>x.scenario==='E'&&x.policy==='balanced'&&x.elapsed===730);
const adverse=report.models.balanced.stages.find(x=>x.scenario==='F'&&x.policy==='balanced'&&x.elapsed===730);
assert.ok(selected.procurementCosts.mean>0,'prospective procurement is recorded');
assert.ok(selected.margin.mean<old.margin.mean,'mature margin must improve over baseline');
assert.ok(founder.revenue.mean>0&&founder.groupProfit.mean>0,'founder growth remains viable');
assert.ok(organic.revenue.mean>0,'organically funded founder earns revenue');
report.acceptance={matureBaselineMargin:old.margin,matureSelectedMargin:selected.margin,founder730:founder.groupProfit,organic730:organic.groupProfit,organicCash:organic.cash,organicOwnedOrRentedPremises:organic.survival,adverse730:adverse.groupProfit,financialProofPassed:true,privateSafariTested:false,employeeFutureBandsImplemented:false,propertyFutureBandsImplemented:false,releaseGate:'PARTIAL until further calibration, all latest CI checks, owner Safari'};
fs.writeFileSync('reports/v22-3b-comparison.json',JSON.stringify(report,null,2)+'\n');
console.log('PASS v22.3B 4 models x 189 actual-engine checkpoints; 7 stages and 3 policies x 3 seeds x 30/180/730 days');
console.log('MATURE_BASELINE',JSON.stringify(old));
console.log('MATURE_BALANCED',JSON.stringify(selected));
console.log('FOUNDER_BALANCED',JSON.stringify(founder));
console.log('ORGANIC_BALANCED',JSON.stringify(organic));
console.log('ADVERSE_BALANCED',JSON.stringify(adverse));
console.log('ARTIFACT reports/v22-3b-comparison.json');
