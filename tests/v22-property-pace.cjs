// v21.5: live new-game gates, earned expansion, CEO guidance and monthly manager evidence.
// Unlike historical suites, this loads the actual unmodified release script.
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
assert.equal((html.match(/<script\b/g)||[]).length,1);
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const m of script.matchAll(/\$\("([^"]+)"\)/g))assert.ok(ids.has(m[1]),"Missing "+m[1]);
const elements=new Map(),store=new Map();
function el(id){if(!elements.has(id))elements.set(id,{id,innerHTML:"",textContent:"",value:"",open:false,hidden:false,checked:false,disabled:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},getContext(){return new Proxy({},{get:()=>()=>{}})},querySelector(){return null},querySelectorAll(){return []},setAttribute(){},removeAttribute(){},focus(){},scrollIntoView(){},parentNode:{open:true}});return elements.get(id);}
const sandbox={document:{getElementById:el,querySelector:()=>el("selector"),querySelectorAll:()=>[],documentElement:el("html"),body:el("body"),addEventListener(){},activeElement:null},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},clearInterval(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Math,Date,Set,Map,JSON,console};
vm.createContext(sandbox);
const boot=script.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
const methods="fresh,load,get:()=>S,set:x=>S=x,save,executiveLaunch,companyLaunchReadiness,companyDirection,renderLaunchGuide,gameRender,renderBriefing,renderExecutiveWeekly,unitActivate,unitAppoint,unitTransfer,dailySalary,createDeal,feeFor,tick,managementOps,managementSetHiringPolicy,unitStaffingDay,unitDelegateWork,renderCEODecisions,unitRecordInput,unitRequestDecision,unitOfPerson,propertyOpen,propertyClose,propertyActivate,propertyPayArrears,propertyDay,propertySell,propertySummary,propertyReadiness,propertyQuote,propertyWorkMultiplier,propertyOccupancy,propertyCapacity,renderProperties,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance";
vm.runInContext(script.slice(0,boot)+"globalThis.G={"+methods+"};})();",sandbox,{timeout:4000});
const G=sandbox.G;
function fresh(){store.clear();G.fresh();el("service-line-select").value="product";return G.get();}
function fund(s,amount){s.cash+=amount;s.bi.openingCash+=amount;}
function money(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.06,"single cash ledger must reconcile");}
function test(name,fn){fn();console.log("PASS",name);}
function firstReady(s){fund(s,1800);s.market.completed=5;s.rep=35;s.org.progression.appointments.push({id:s.team[0].id,level:"lead",since:s.day,successorId:null});s.team[1].s.prod=3;}


function staff(s,total){
 while(s.team.length<total){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);s.team.push(p);}
}
function credits(s){return s.bi.totals.cashOut;}
test("v22 new company starts distributed with zero property costs and unchanged corporate history",()=>{
 const s=fresh();assert.equal(s.exec.property.sites.length,0);assert.equal(s.exec.property.baselineCapacity,8);
 assert.equal(G.propertySummary().daily,0);assert.equal(G.propertyReadiness("studio").ready,false);
 assert.equal(G.propertyOpen("studio"),false);assert.equal(s.cash,90);money(s);
});
test("earned serviced suite: setup once, daily rent once, recurring payments and reload",()=>{
 const s=fresh();fund(s,900);staff(s,5);s.market.completed=5;
 const cash=s.cash,expense=s.bi.totals.costs;assert.equal(G.propertyOpen("studio"),true);
 assert.equal(s.cash,cash-75);assert.equal(s.bi.totals.costs,expense+75);
 assert.equal(G.propertyOpen("studio"),false);assert.equal(s.exec.property.sites.length,1);
 assert.equal(G.propertyCapacity(),12);assert.ok(G.propertyWorkMultiplier(s.team[1])>1);
 const before=s.cash,out=credits(s);G.propertyDay();assert.equal(s.cash,before-1.5);assert.equal(credits(s),out+1.5);
 G.save();const loaded=G.load();assert.equal(loaded.exec.property.sites.length,1);assert.equal(loaded.exec.property.sites[0].type,"studio");
 assert.equal(loaded.day,s.day);money(s);
});
test("building investment only after measured workforce and manager; lease stops at relocation",()=>{
 const s=fresh();fund(s,12000);staff(s,12);s.market.completed=25;
 s.org.progression.appointments.push({id:s.team[0].id,level:"manager",since:s.day},{id:s.team[1].id,level:"lead",since:s.day});
 assert.equal(G.propertyOpen("studio"),true);assert.equal(G.propertyOpen("building"),true);
 const sites=s.exec.property.sites;
 assert.equal(sites.length,2);assert.equal(sites[0].status,"closed");
 assert.equal(sites[1].type,"building");assert.equal(sites[1].status,"active");
 assert.equal(s.bi.totals.investments,1800);
 assert.equal(G.propertySummary().book,1800);assert.equal(G.propertySummary().daily,1.2);
 const oldCash=s.cash;G.propertyDay();assert.ok(Math.abs(s.cash-(oldCash-1.2))<.001);
 assert.equal(G.propertyOpen("building"),false);
 assert.equal(G.propertyClose(sites[1].id),false,"owned buildings cannot be abandoned as expired leases");
 money(s);
});
test("owned office persists when moving to another lease; reactivation never recharges investment",()=>{
 const s=fresh();fund(s,15000);staff(s,13);s.market.completed=35;
 s.org.progression.appointments.push({id:s.team[0].id,level:"manager",since:s.day},{id:s.team[1].id,level:"lead",since:s.day});
 assert.equal(G.propertyOpen("building"),true);const old=s.exec.property.sites[0];
 assert.equal(G.propertyOpen("office"),true);assert.equal(old.status,"inactive");
 const invested=s.bi.totals.investments,cash=s.cash;
 assert.equal(G.propertyActivate(old.id),true);
 assert.equal(s.cash,cash);assert.equal(s.bi.totals.investments,invested);
 assert.equal(s.exec.property.sites[1].status,"closed");money(s);
});
test("unit-specific satellite does not duplicate GM payroll or corporate ownership",()=>{
 const s=fresh();firstReady(s);s.deals=[];
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0],worker=s.team[1];gm.career.rank=1;
 assert.equal(G.unitAppoint("product",gm.id),true);assert.equal(G.unitTransfer("product",worker.id),true);
 const before=S=>S.team.reduce((n,p)=>n+G.dailySalary(p),0),payroll=before(s);
 const companyCapacity=G.propertyCapacity();
 assert.equal(G.propertyOpen("satellite","product"),true);
 assert.equal(G.propertyCapacity(),companyCapacity);assert.equal(G.propertyCapacity("product"),10);
 assert.equal(before(s),payroll,"leasing cannot hire or reprice salaries");
 const unit=G.propertyOccupancy(worker);assert.equal(unit.unitKey,"product");
 assert.equal(s.exec.units[0].staffIds.includes(worker.id),true);money(s);
});
test("unpaid rent becomes transparent arrears and settlement is cash-only, not a double expense",()=>{
 const s=fresh();fund(s,900);staff(s,5);s.market.completed=5;
 assert.equal(G.propertyOpen("studio"),true);
 const cash=s.cash;s.cash=0;s.bi.openingCash-=cash;
 const exp=s.bi.totals.costs,out=credits(s);G.propertyDay();
 assert.equal(s.exec.property.sites[0].arrears,1.5);
 assert.equal(s.bi.totals.costs,exp+1.5);assert.equal(credits(s),out);
 fund(s,10);const accrual=s.bi.totals.costs;
 assert.equal(G.propertyPayArrears(),true);
 assert.equal(s.exec.property.sites[0].arrears,0);
 assert.equal(s.bi.totals.costs,accrual);assert.equal(credits(s),out+1.5);
 money(s);
});
test("grandfathered day 2864 save migrates without fake property purchases, rent or lost businesses",()=>{
 const s=fresh();firstReady(s);assert.equal(G.executiveLaunch("product"),true);
 s.day=2864;const cash=s.cash,investment=s.bi.totals.investments,lines=JSON.stringify(s.exec.lines);
 delete s.exec.property;G.save();const restored=G.load();
 assert.equal(restored.day,2864);assert.equal(restored.cash,cash);
 assert.equal(restored.bi.totals.investments,investment);
 assert.equal(JSON.stringify(restored.exec.lines),lines);
 assert.equal(restored.exec.property.sites.length,0);
 assert.equal(restored.exec.property.baselineCapacity,8);
 money(restored);
});
test("asset roadmap shows floorplan, ownership, exact costs and capacity without extra expenses",()=>{
 const s=fresh();fund(s,900);staff(s,5);s.market.completed=5;
 G.renderProperties();
 assert.ok(el("property-overview").innerHTML.includes("Distributed headquarters"));
 assert.ok(el("property-purchase-options").innerHTML.includes("Serviced office suite"));
 const cash=s.cash;G.renderProperties();assert.equal(s.cash,cash);money(s);
});

test("office location quotes preserve actual signed prices and future-work effects",()=>{
 const s=fresh();fund(s,2000);staff(s,5);s.market.completed=5;
 s.ui.propertyLocation="central";assert.equal(G.propertyQuote("studio").price,94);
 assert.equal(G.propertyQuote("studio").dayCost,1.95);
 assert.equal(G.propertyOpen("studio"),true);
 const site=s.exec.property.sites[0],benefit=G.propertyWorkMultiplier(s.team[2]);
 assert.equal(site.location,"central");assert.equal(site.price,94);
 assert.equal(site.dayCost,1.95);assert.ok(benefit>1.04);
 s.ui.propertyLocation="regional";assert.equal(G.propertyQuote("studio").price,64);
 assert.equal(site.price,94);assert.equal(site.dayCost,1.95,"existing lease cannot be repriced by changing future selection");
 const cash=s.cash;G.propertyDay();assert.ok(Math.abs(s.cash-(cash-1.95))<.001);money(s);
});
test("property depreciates without cash charge, then sold unused asset records cash receipt and book loss",()=>{
 const s=fresh();fund(s,12000);staff(s,13);s.market.completed=30;
 s.org.progression.appointments.push({id:s.team[0].id,level:"manager",since:0},{id:s.team[1].id,level:"lead",since:0});
 assert.equal(G.propertyOpen("building"),true);
 s.day=90;const cash=s.cash,op=s.bi.totals.costs,invest=s.bi.totals.investments;
 G.propertyDay();const site=s.exec.property.sites[0];
 assert.equal(site.book,1773);assert.equal(s.bi.totals.investments,invest);
 assert.ok(Math.abs(s.cash-(cash-1.2))<.001);
 assert.ok(Math.abs(s.bi.totals.costs-op-28.2)<.001);
 assert.equal(G.propertyOpen("office"),true);assert.equal(site.status,"inactive");
 const before=s.cash,cost=s.bi.totals.costs,received=s.bi.totals.cashIn;
 assert.equal(G.propertySell(site.id),true);
 assert.equal(site.status,"sold");assert.equal(site.book,0);
 assert.ok(Math.abs(s.cash-before-1631.16)<.001);
 assert.ok(Math.abs(s.bi.totals.cashIn-received-1631.16)<.001);
 assert.ok(Math.abs(s.bi.totals.costs-cost-141.84)<.001);
 assert.equal(G.propertySell(site.id),false);
 assert.equal(G.propertySummary().book,0);money(s);
});
test("730-day rented headquarters books exactly one daily property expense without duplicate salaries",()=>{
 const s=fresh();fund(s,150000);staff(s,13);s.market.completed=35;s.flow.focus=true;s.nextEv=999999;s.deals=[];
 s.org.progression.appointments.push({id:s.team[0].id,level:"lead",since:0});
 assert.equal(G.propertyOpen("office"),true);
 const teamCount=s.team.length,rent=3;
 const before=s.bi.categoryTotals.property||0;
 for(let i=0;i<730;i++)G.tick();
 assert.equal(s.day,730);assert.equal(s.team.length,teamCount);
 assert.ok(Math.abs((s.bi.categoryTotals.property||0)-before-730*rent)<.001);
 assert.equal(G.propertySummary().daily,3);
 money(s);G.save();assert.equal(G.load().day,730);
});

test("v22 game pace runs 30 game days in 72/24/9 seconds at 1×/3×/8×",()=>{
 assert.ok(script.includes("2400/spd"));
 assert.ok(script.includes("S.day-S.flow.lastInterruptDay>=28"));
 assert.ok(!script.includes("Date.now()-S.flow.lastInterruptAt>=45000"));
});
test("v22 180-day staffed benchmark stays bounded and ledger consistent",()=>{
 const s=fresh();fund(s,120000);staff(s,24);s.flow.focus=true;s.nextEv=999999;s.deals=[];s.pipeline.auto=false;
 const start=Date.now();for(let i=0;i<180;i++)G.tick();const elapsed=Date.now()-start;
 assert.equal(s.day,180);assert.ok(elapsed<25000,"180 game-day CPU runtime "+elapsed+"ms exceeded guardrail");
 assert.ok(Number.isFinite(s.cash));money(s);
 console.log("PACE v22 benchmark 24 employees × 180 simulation days = "+elapsed+" ms CPU, UI/calendar excluded");
});

test("v22 saved authority drafts survive browser reload without silently approving new spending",()=>{
 const s=fresh();firstReady(s);s.deals=[];assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const cap=s.org.progression.authorityDaily;
 s.ui.authorityDrafts.leadership="7.50";s.ui.authorityDrafts.recruitBudget="1000";s.ui.authorityDrafts.recruitSlots="3";
 G.unitRecordInput({dataset:{unitKey:"product",unitField:"coachingLimit"},value:"125"});
 G.save();const loaded=G.load();
 assert.equal(loaded.ui.authorityDrafts.leadership,"7.50");
 assert.equal(loaded.ui.authorityDrafts.recruitBudget,"1000");
 assert.equal(loaded.ui.authorityDrafts.recruitSlots,"3");
 assert.equal(loaded.ui.unitFieldDrafts.product.coachingLimit,"125");
 assert.equal(loaded.org.progression.authorityDaily,cap,"drafts must not grant financial authority");
 assert.equal(loaded.exec.units[0].plan.coachingLimit,0);
 money(loaded);
});
test("v22 GM and department manager grant qualified 30-day idle specialist without a second salary",()=>{
 const s=fresh();firstReady(s);s.deals=[];staff(s,5);
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0],dedicated=s.team[1],leader=s.team[2],corporate=s.team[3];
 gm.career.rank=1;assert.equal(G.unitAppoint("product",gm.id),true);assert.equal(G.unitTransfer("product",dedicated.id),true);
 leader.department="delivery";s.org.progression.appointments.push({id:leader.id,level:"manager",since:s.day});
 corporate.department="delivery";corporate.role.primary="prod";corporate.role.auto=true;corporate.t="idle";corporate.s.prod=5;
 for(let i=0;i<3;i++)G.createDeal("Unit demand "+i);
 const cash=s.cash,team=s.team.length,salaries=s.team.reduce((n,p)=>n+G.dailySalary(p),0);
 assert.equal(G.unitStaffingDay(),true);
 const shared=G.managementOps().shared.find(x=>x.unitKey==="product"&&x.employeeId===corporate.id);
 assert.ok(shared&&shared.approvedBy===leader.id&&shared.until===s.day+30);
 assert.equal(s.cash,cash);assert.equal(s.team.length,team);assert.equal(G.unitOfPerson(corporate.id),null);
 assert.equal(s.team.reduce((n,p)=>n+G.dailySalary(p),0),salaries);
 G.unitDelegateWork();
 assert.ok(s.deals.filter(d=>d.unitKey==="product"&&d.w).length>=2,"GM can allocate dedicated and shared workers");
 assert.equal(G.unitStaffingDay(),false,"same-day repeated review cannot allocate another specialist");
 money(s);
});
test("v22 unit hire uses CEO-approved shared slot and dollar caps with 21 payroll days",()=>{
 const s=fresh();firstReady(s);s.deals=[];staff(s,4);
 assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0],worker=s.team[1],leader=s.team[2];
 gm.career.rank=1;assert.equal(G.unitAppoint("product",gm.id),true);assert.equal(G.unitTransfer("product",worker.id),true);
 leader.department="delivery";s.org.progression.appointments.push({id:leader.id,level:"manager",since:s.day});
 s.team[3].department="commercial";s.team[3].t="study"; // No idle Product specialist exists for a free temporary allocation.
 assert.equal(G.managementSetHiringPolicy(40,2),true);
 G.createDeal("Shortage A");G.createDeal("Shortage B");G.createDeal("Shortage C");
 const cash=s.cash,people=s.team.length,spent=G.managementOps().hireSpent;
 assert.equal(G.unitStaffingDay(),true);
 const req=s.exec.unitRequests.find(r=>r.key==="product");
 assert.ok(req);assert.equal(req.status,"delegated");
 assert.equal(s.team.length,people+1);assert.equal(s.cash,cash-20);
 assert.equal(G.managementOps().hireSpent,spent+20);assert.equal(G.managementOps().hires,1);
 assert.equal(G.unitRequestDecision(req.id,"approve"),false,"no duplicate CEO approval or second charge");
 money(s);
});
test("v22 CEO decision center offers a working escalation when recruitment slots are zero",()=>{
 const s=fresh();firstReady(s);s.deals=[];assert.equal(G.executiveLaunch("product"),true);assert.equal(G.unitActivate("product"),true);
 const gm=s.team[0];gm.career.rank=1;assert.equal(G.unitAppoint("product",gm.id),true);
 G.createDeal("GM unit project 1");G.createDeal("GM unit project 2");
 assert.equal(G.unitStaffingDay(),true);
 const req=s.exec.unitRequests.find(r=>r.key==="product"&&r.status==="open");
 assert.ok(req);
 G.renderCEODecisions();const panel=el("ceo-action-center").innerHTML;
 assert.ok(panel.includes("Approve unit hire"));
 assert.ok(panel.includes('data-ceo-action="unit-approve"'));
 assert.equal(G.unitRequestDecision(req.id,"approve"),true);
 assert.equal(req.status,"approved");
 G.renderCEODecisions();assert.ok(!el("ceo-action-center").innerHTML.includes("Approve unit hire"));
 money(s);
});
console.log("Boss v22 property, save, accounting and pacing validations passed.");
