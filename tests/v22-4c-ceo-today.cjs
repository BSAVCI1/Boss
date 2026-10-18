// v22.4 CEO-experience smoke: actual unmodified game script and financially inert UI suggestions.
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const match of script.matchAll(/\$\("([^"]+)"\)/g))assert.ok(ids.has(match[1]),"Missing UI element: "+match[1]);
const store=new Map(),els=new Map();
function el(id){if(!els.has(id))els.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,open:false,hidden:false,disabled:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},getContext(){return new Proxy({},{get:()=>()=>{}})},querySelector(){return null},querySelectorAll(){return []},setAttribute(){},removeAttribute(){},scrollIntoView(){},focus(){},parentNode:{open:true}});return els.get(id);}
const sandbox={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},setTimeout:()=>1,clearTimeout(){},clearInterval(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Set,Map,console};
vm.createContext(sandbox);
const boot=script.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
const exposed="fresh,get:()=>S,set:v=>S=v,load,save,createDeal,feeFor,estimatedFee,worldIndicativeFee,worldTenderPreview,renderPipeline,renderCEODecisions,renderCEOFocus,ceoDecisionInventory,managementOps,renderBriefing,renderExecutiveWeekly,ceoPremisesOpportunity,propertyCapacity,propertyPeople,propertyReadiness,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,dailySalary,canonicalReporting,teamReportingGroups,renderOrgExplorer,clearCareerRequirements,coachCareerStatus,careerAction,ceoPropertyComparison,ceoPropertyAdvice,renderPropertyDecisionPreview,renderProperties,propertyOpen,propertyActive,propertySummary,propertyCapacity,executiveDecision";
vm.runInContext(script.slice(0,boot)+"globalThis.G={"+exposed+"};})();",sandbox,{timeout:5000});
const G=sandbox.G;
function fresh(){store.clear();G.fresh();return G.get();}
function staff(s,n){while(s.team.length<n){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);s.team.push(p);}}
function money(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.06,"Corporate cash ledger must reconcile");}
function test(name,callback){callback();console.log("PASS "+name);}

test("v22.4C fresh founder sees honest company cash, operating result and next chapter",()=>{
 const s=fresh(),serialized=JSON.stringify(s),cash=s.cash;
 const inv=G.ceoDecisionInventory();
 assert.equal(inv.approvals,0);
 G.renderCEOFocus();
 const html=el("ceo-priority-content").innerHTML;
 for(const part of ["Available cash · not profit","Cumulative tracked operating","CEO approvals pending","Managed by my team","Next company chapter","Strategic priority"]){
  assert.ok(html.includes(part),"Missing CEO Today: "+part);
 }
 assert.ok(html.includes("Founder-led operations"),"No imaginary delegated executives in founder view");
 assert.ok(html.includes("0 CEO approvals pending"));
 assert.equal(s.cash,cash);assert.equal(JSON.stringify(s),serialized,"Today projection must never touch save");
 money(s);
});
test("v22.4C developing CEO distinguishes pending hiring from handled work",()=>{
 const s=fresh();staff(s,12);s.market.completed=25;s.day=270;
 s.cash+=50000;s.bi.openingCash+=50000;
 const manager=s.team[4];manager.department="commercial";manager.role.primary="lead";s.org.departments.commercial.managerId=manager.id;
 G.managementOps().requests.push({id:8801,status:"open",cost:20,payroll:1.5,dept:"commercial",reason:"Capacity gap"});
 const before=JSON.stringify(s),decision=G.ceoDecisionInventory();assert.equal(decision.approvals,1);
 G.renderCEOFocus();const html=el("ceo-priority-content").innerHTML;
 assert.ok(html.includes("1 CEO approvals pending"));assert.ok(html.includes("Capacity gap"));assert.ok(html.includes("$20 once"));assert.ok(html.includes('data-ceo-nav="decisions"'));
 assert.ok(html.includes(manager.n),"Manager identity must be sourced from actual saved appointment");
 assert.equal(JSON.stringify(s),before,"Read-only CEO overview cannot change game state");money(s);
});
test("v22.4C matured Day 4704 capacity, property cash and recurring runway are exact read-only quotes",()=>{
 const s=fresh();staff(s,19);s.day=4704;s.market.completed=689;s.exec.property.baselineCapacity=12;
 s.cash+=4_000_000;s.bi.openingCash+=4_000_000;
 s.org.progression.appointments.push({id:s.team[0].id,level:"lead",since:50},{id:s.team[1].id,level:"manager",since:120});
 s.exec.officers.hr.id=s.team[10].id;s.exec.officers.cfo.id=s.team[11].id;s.exec.officers.coo.id=s.team[12].id;
 const snapshot=JSON.stringify(s),cash=s.cash,comparison=G.ceoPropertyComparison("office");
 assert.ok(comparison.check.ready,"Office lease must meet real readiness rules");
 assert.equal(comparison.people,19);assert.equal(comparison.currentSeats,12);assert.equal(comparison.def.capacity,24);
 assert.equal(comparison.seatsGained,12);assert.equal(comparison.quote.price,220);assert.equal(comparison.quote.dayCost,3);
 assert.equal(comparison.cashAfter,cash-220);
 assert.equal(comparison.premisesAfter,3);
 const totalPayroll=s.team.reduce((n,p)=>n+G.dailySalary(p),0);
 assert.ok(Math.abs(comparison.afterDays-(cash-220)/(totalPayroll+3))<.001);
 const advisors=G.ceoPropertyAdvice(comparison);
 assert.equal(advisors.length,3,"Real filled executives may provide grounded commentary");
 assert.ok(advisors.some(x=>x.includes("CFO")&&x.includes("remaining cash")));
 assert.ok(advisors.some(x=>x.includes("COO")&&x.includes("12 additional seats")));
 assert.ok(advisors.some(x=>x.includes("HR")&&x.includes("19 corporate")));
 G.renderCEOFocus();const today=el("ceo-priority-content").innerHTML;
 assert.ok(today.includes("workplace crowding"));
 assert.ok(today.includes("19 people"));
 assert.ok(today.includes("Compare premises and decide"));
 G.renderProperties();const opts=el("property-purchase-options").innerHTML;
 assert.ok(opts.includes('data-property-action="preview"'));
 assert.ok(!opts.includes('data-property-action="open"'),"Direct purchase must be inaccessible from comparison list");
 assert.ok(opts.includes("post-deal cash"));
 assert.equal(JSON.stringify(s),snapshot,"Property quotes and CEO Today may not mutate company history");
 assert.equal(s.exec.property.sites.length,0,"A quote cannot buy a property");
 money(s);
});
test("v22.4C property blockers remain visible without fabricated officer narratives",()=>{
 const s=fresh(),before=JSON.stringify(s),p=G.ceoPropertyComparison("hq");
 assert.equal(p.check.ready,false);assert.ok(p.check.checks.some(x=>!x.met));
 assert.equal(G.ceoPropertyAdvice(p).length,0);
 assert.equal(p.def.capacity,80);
 G.renderProperties();const html=el("property-purchase-options").innerHTML;
 assert.ok(html.includes("Inspect missing prerequisites"));
 assert.equal(JSON.stringify(s),before);
 assert.equal(s.cash,90);money(s);
});
test("v22.4C quote no-op on legacy contract and manager roster, and approved count excludes eligible promotion",()=>{
 const s=fresh(),fees=s.deals.map(G.feeFor),before=JSON.stringify(s);
 const c=G.ceoPropertyComparison("studio"),h=G.ceoPropertyComparison("hq");
 assert.ok(c&&h);assert.deepEqual(s.deals.map(G.feeFor),fees);
 assert.equal(JSON.stringify(s),before);
 assert.equal(G.ceoDecisionInventory().approvals,0);
 const roster=G.canonicalReporting();assert.equal(new Set(roster.entries.map(x=>x.p.id)).size,s.team.length);
 money(s);
});

test("v22.4C authorized office transaction debits cash and ledger exactly once",()=>{
 const s=fresh();staff(s,19);s.day=4704;s.market.completed=50;s.exec.property.baselineCapacity=12;
 s.cash+=25000;s.bi.openingCash+=25000;
 s.org.progression.appointments.push({id:s.team[0].id,level:"lead",since:5});
 const option=G.ceoPropertyComparison("office"),startCash=s.cash,priorOut=s.bi.totals.cashOut;
 assert.ok(option.check.ready,"Fixture must meet existing leasing gates");
 assert.equal(s.exec.property.sites.length,0,"Preview must be non-spending");
 const opened=G.propertyOpen("office");
 assert.equal(opened,true,"Legitimate existing property purchase path must succeed");
 assert.equal(s.cash,startCash-option.quote.price,"One real corporate debit");
 assert.equal(s.bi.totals.cashOut,priorOut+option.quote.price,"Cash ledger must post exact same debit");
 assert.equal(s.exec.property.sites.filter(x=>x.status==="active").length,1);
 assert.equal(G.propertyActive().type,"office");assert.equal(G.propertyCapacity(),24);
 assert.equal(G.propertyOpen("office"),false,"Repeated same active purchase cannot charge twice");
 assert.equal(s.cash,startCash-option.quote.price);
 money(s);
});
test("v22.4C ineligible headquarters transaction remains rejected and cash-safe",()=>{
 const s=fresh(),before=JSON.stringify(s);
 assert.equal(G.propertyOpen("hq"),false);
 assert.equal(JSON.stringify(s),before,"Rejected property approval may not mutate saved records");
 money(s);
});
console.log("v22.4C CEO Today/property pure projection and real game read-only tests passed");
