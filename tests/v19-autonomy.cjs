// Boss v18 CEO & leadership regression, offline single HTML, no npm dependencies.
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const javascript=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
assert.equal((html.match(/<script\b/g)||[]).length,1);
assert.ok(!/<(?:script|link|img)[^>]+(?:src|href)=["']https?:/.test(html),"External network dependency");
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const m of javascript.matchAll(/\$\("([^"]+)"\)/g))assert.ok(ids.has(m[1]),"Missing ID "+m[1]);
const elements=new Map(),store=new Map();
const el=id=>{if(!elements.has(id))elements.set(id,{id,innerHTML:"",textContent:"",value:"",open:false,hidden:false,checked:false,disabled:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},setAttribute(){},removeAttribute(){},querySelector(){return null},querySelectorAll(){return []},focus(){},getContext(){return new Proxy({},{get:()=>()=>{}})},parentNode:{open:true}});return elements.get(id)};
const sandbox={document:{getElementById:el,querySelector:()=>el("selector"),querySelectorAll:()=>[],documentElement:el("html"),body:el("body"),addEventListener(){}},window:{scrollY:0,innerWidth:390,addEventListener(){},scrollTo(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout:()=>{},getComputedStyle:()=>({getPropertyValue:()=>""}),clearInterval:()=>{},Math,Date,Map,Set,JSON,console};
vm.createContext(sandbox);
const boot=javascript.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0,"Missing boot");
vm.runInContext(javascript.slice(0,boot)+"globalThis.G={fresh,load,get:()=>S,set:x=>S=x,save,tick,gameChapter,gamePlan,gameRender,gameAdvanceDays,renderStructure,renderBriefing,refresh,navigate,ensureExecutive,executiveWeek,executiveProposal,executiveDecision,ceoDirection,draftExecutiveDirection,executiveShow,executiveLaunch,ceoLineFinish,createDeal,worldNewEvent,worldDay,worldEventChoice,renderIdeas,ideaProgressDay,delegateWork,orgChooseManager,feeFor,careerRoleSkill,orgChooseSubManager,orgSubManager,orgSubReports,orgDirectReports,orgChangePolicy,orgPlan,orgFunds,orgBudgetPeriod,orgRenewPlan,orgManagerDay,executiveAutonomous,assistantDecision,renderAssistantPolicy,choose,orgLeaderTitle,worldOfferTerms,worldOfferEligibility,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,dailySalary,renderOrganization};})();",sandbox,{timeout:3000});
const G=sandbox.G;
function fresh(){store.clear();G.fresh();el("lab-topic").value="learning";el("lab-duration").value="15";el("lab-forecast").value="25";el("lab-sector").value="hospitality";}

function test(name,fn){fn();console.log("PASS",name);}
function accounting(s){const b=s.bi.totals;assert.ok(Math.abs(s.bi.openingCash+b.cashIn-b.cashOut-s.cash)<.06,"Money not reconciled");}
function appoint(s,dept,p){p.department=dept;p.role.primary="lead";p.career.rank=Math.max(1,p.career.rank);s.org.departments[dept].managerId=p.id;p.t="coachteam";return p;}
function Smod(){return G.get().mod.cost;}

test("v19 additive authority plan on a clean game never spends until explicitly funded",()=>{
fresh();const s=G.get();for(const dept of ["commercial","delivery"]){const p=s.org.departments[dept].plan;
assert.equal(p.days,90);assert.equal(p.limits.training,0);assert.equal(p.hireSlots,0);assert.equal(p.payrollLimit,0);
assert.equal(s.org.departments[dept].subManagers.sales??null,null);}
accounting(s);
});
test("v18 saves migrate hierarchy and authority without changing historical agreements",()=>{
fresh();const old=G.get();old.day=2443;old.cash+=30000;old.bi.openingCash+=30000;old.rep=1708;old.market.completed=305;
old.deals[0].agreedFee=314;for(const d of Object.values(old.org.departments)){delete d.plan;delete d.subManagers;}
store.set("boss18",JSON.stringify(old));const original=store.get("boss18");
const s=G.load();assert.equal(s.day,2443);assert.equal(s.cash,old.cash);assert.equal(s.rep,1708);assert.equal(s.deals[0].agreedFee,314);assert.equal(s.org.departments.commercial.plan.days,90);
assert.equal(s.org.departments.delivery.subManagers.ops??null,null);assert.equal(store.get("boss18"),original);G.set(s);G.save();assert.ok(store.get("boss19"));assert.equal(store.get("boss18"),original);accounting(s);
});
test("CEO controls 90/180-day budgets, authority and numeric targets",()=>{
fresh();const s=G.get(),day=s.day;assert.ok(G.orgChangePolicy("commercial","days",180));
for(const [cat,value] of Object.entries({coaching:180,training:120,team:90,hiring:240,perAction:40,hireSlots:3,payrollLimit:9,leads:28}))assert.ok(G.orgChangePolicy("commercial",cat,value),cat);
assert.ok(G.orgChangePolicy("delivery","onTime",97));assert.equal(G.orgChangePolicy("delivery","onTime",111),false);
assert.equal(s.org.departments.commercial.plan.days,180);assert.equal(s.org.departments.commercial.plan.limits.coaching,180);
assert.equal(s.org.departments.commercial.target.leads,28);assert.equal(s.org.departments.delivery.target.onTime,97);
assert.equal(s.day,day);assert.ok(!G.orgFunds("commercial","training",41));accounting(s);
});
test("optional subordinate manager creates unique reporting hierarchy and payroll",()=>{
fresh();const s=G.get(),director=s.team[0],sub=s.team[1],worker=s.team[2];
director.department="commercial";director.career.xp=20;director.role.primary="lead";director.t="coachteam";s.org.departments.commercial.managerId=director.id;
sub.department="commercial";sub.role.primary="mkt";sub.career.xp=12;
worker.department="commercial";worker.role.primary="mkt";
const before=G.dailySalary(sub);
assert.ok(G.orgChooseSubManager("commercial","mkt",sub.id));
assert.equal(G.orgSubManager("commercial","mkt").id,sub.id);
assert.equal(G.orgSubReports("commercial","mkt").length,1);
assert.equal(G.orgSubReports("commercial","mkt")[0].id,worker.id);
assert.equal(G.orgDirectReports("commercial").length,1);
assert.ok(G.dailySalary(sub)>before);
G.executiveShow();assert.ok(el("ceo-direct-reports").innerHTML.includes("Marketing Manager"));
assert.ok(el("ceo-direct-reports").innerHTML.includes("#"+worker.id));
accounting(s);
});
test("director can train only inside approved budget and cash ledger",()=>{
fresh();const s=G.get(),manager=s.team[0],worker=s.team[1];manager.department="commercial";manager.role.primary="lead";manager.t="coachteam";s.org.departments.commercial.managerId=manager.id;
worker.department="commercial";worker.role.primary="sales";s.exec.priority="rd";s.day=28;
const p=s.org.departments.commercial.plan;p.limits.training=24;p.perAction=8;
const cash=s.cash,before=worker.s.sales;
G.executiveWeek();
assert.equal(s.exec.proposals.length,0);assert.equal(p.spent.training,8);
assert.equal(s.cash,cash-8);assert.ok(worker.s.sales>=before);assert.equal(s.exec.history[0].action,"delegated");accounting(s);
});
test("without training authority R&D raises one envelope request, not silent spending",()=>{
fresh();const s=G.get(),manager=s.team[0];manager.department="commercial";manager.role.primary="lead";s.org.departments.commercial.managerId=manager.id;s.exec.priority="rd";s.day=28;
const cash=s.cash;G.executiveWeek();const proposal=s.exec.proposals.find(p=>p.dept==="commercial");
assert.equal(proposal.type,"budget");assert.equal(s.cash,cash);assert.ok(G.executiveDecision(proposal.id,"approve"));
assert.ok(s.org.departments.commercial.plan.limits.training>=80);
assert.equal(s.cash,cash);accounting(s);
});
test("manager hiring respects headcount, cash, per-action and recurring payroll caps",()=>{
fresh();const s=G.get(),manager=s.team[0];manager.department="commercial";manager.role.primary="lead";s.org.departments.commercial.managerId=manager.id;
const p=s.org.departments.commercial.plan;p.limits.hiring=30;p.hireSlots=1;p.payrollLimit=1.5*Smod();p.perAction=30;
const cash=s.cash,headcount=s.team.length;assert.ok(G.executiveAutonomous("commercial",{type:"hire",cost:20}));
assert.equal(s.team.length,headcount+1);assert.equal(s.cash,cash-20);assert.equal(p.hires,1);
assert.equal(G.executiveAutonomous("commercial",{type:"hire",cost:20}),false);
accounting(s);
});
test("market opportunity acts on Today, full pipeline disables only lead-producing decisions",()=>{
fresh();const s=G.get();s.day=45;G.worldNewEvent();const ev=s.world.activeEvent;
G.executiveShow();assert.ok(el("exec-inbox").innerHTML.includes('data-world-event="act"'));
assert.ok(el("exec-inbox").innerHTML.includes('data-world-event="pass"'));
s.pipeline.leads=Array.from({length:12},(_,i)=>({id:100+i,client:"Lead "+i,sector:"retail",stage:"prospect",created:s.day,age:1}));
assert.equal(G.worldOfferEligibility(ev).allowed,false);assert.ok(G.worldOfferEligibility(ev).reason.includes("pipeline"));
s.world.activeEvent={...ev,type:"referrals"};assert.equal(G.worldOfferEligibility(s.world.activeEvent).allowed,true);
s.world.activeEvent={...ev,type:"slowdown"};assert.equal(G.worldOfferEligibility(s.world.activeEvent).allowed,true);
assert.ok(G.worldEventChoice("pass"));assert.equal(G.worldEventChoice("pass"),false);accounting(s);
});
test("larger tenders use scaled preparation expenses and do not modify signed contracts",()=>{
fresh();const s=G.get(),initialFee=G.feeFor(s.deals[0]);s.day=2443;s.rep=1708;s.market.completed=305;s.cash+=3000;s.bi.openingCash+=3000;
s.world.activeEvent={id:2443,opened:2443,until:2488,type:"tender",sector:"creative"};
const quote=G.worldOfferTerms(s.world.activeEvent);assert.ok(quote.cost>12);assert.ok(quote.fee>quote.cost);
const cash=s.cash;assert.ok(G.worldEventChoice("act"));assert.equal(s.cash,cash-quote.cost);
assert.equal(s.world.activeEvent,null);assert.equal(G.feeFor(s.deals[0]),initialFee);accounting(s);
});
test("expired budget stops delegation until explicit CEO renewal",()=>{
fresh();const s=G.get(),p=s.org.departments.commercial.plan;
p.limits.coaching=40;p.spent.coaching=12;p.hires=1;p.payrollAdded=1.5;p.amendments=1;
s.day=91;G.orgBudgetPeriod();
assert.equal(p.since,0,"Expiry must not silently restart authority");
assert.equal(p.spent.coaching,12);assert.equal(G.orgFunds("commercial","coaching",4),false);
assert.ok(G.orgRenewPlan("commercial"));
assert.equal(p.since,91);assert.equal(p.spent.coaching,0);
assert.equal(p.hires,0);assert.equal(p.amendments,0);assert.ok(G.orgFunds("commercial","coaching",4));
accounting(s);
});
test("730-day delegated coaching does not exceed budgets or corrupt cash",()=>{
fresh();const s=G.get(),manager=s.team[0];manager.department="commercial";manager.role.primary="lead";manager.t="coachteam";s.org.departments.commercial.managerId=manager.id;
s.org.departments.commercial.plan.limits.coaching=36;s.nextEv=99999;s.flow.focus=true;
for(let n=0;n<730;n++){if(s.ev)s.ev=null;G.tick();}
assert.equal(s.day,730);assert.ok(Number.isFinite(s.cash));assert.ok(s.org.departments.commercial.plan.spent.coaching<=36);accounting(s);
});
test("executive assistant automatic decisions honor cumulative spending limits",()=>{
fresh();const state=G.get(),assistant=state.team[0],worker=state.team[1],p=state.ops.policy;
assistant.t="assist";state.ops.assistantId=assistant.id;p.family=true;p.budget=10;p.totalBudget=5;p.days=90;p.since=0;p.spent=0;
const first={k:"family",a:worker.id,b:worker.id};
assert.equal(G.assistantDecision(first),0);
state.ev=first;const before=state.cash;G.choose(0,true);
assert.equal(p.spent,5);assert.equal(state.cash,before-5);
assert.equal(G.assistantDecision(first),null,"Cumulative budget must prevent a second payment");
state.day=90;assert.equal(G.assistantDecision(first),null,"Expired assistant authority must remain suspended");
G.renderAssistantPolicy();assert.ok(el("policy-budget-status").textContent.includes("EXPIRED"));accounting(state);
});
test("director-title promotion follows real management tiers, not hard-coded labels",()=>{
fresh();const s=G.get(),director=s.team[0],sub=s.team[1];
director.department="commercial";director.career.rank=1;director.role.primary="lead";s.org.departments.commercial.managerId=director.id;
assert.equal(G.orgLeaderTitle(director),"Department Manager");
sub.department="commercial";sub.role.primary="mkt";sub.career.xp=20;
assert.ok(G.orgChooseSubManager("commercial","mkt",sub.id));
assert.equal(G.orgLeaderTitle(director),"Director");
accounting(s);
});
test("quarterly director authority expires with one renewal request, renewed only on CEO approval",()=>{
fresh();const s=G.get(),director=s.team[0];director.department="commercial";director.role.primary="lead";s.org.departments.commercial.managerId=director.id;
const p=s.org.departments.commercial.plan;p.limits.coaching=24;p.spent.coaching=12;s.day=91;G.executiveWeek();
const req=s.exec.proposals.find(x=>x.dept==="commercial");assert.ok(req);assert.equal(req.type,"renew");
assert.equal(G.orgFunds("commercial","coaching",4),false);
assert.ok(G.executiveDecision(req.id,"approve"));assert.equal(p.since,91);assert.equal(p.spent.coaching,0);
assert.ok(G.orgFunds("commercial","coaching",4));accounting(s);
});
test("identical low-value weekly decisions are not repeatedly escalated",()=>{
fresh();const s=G.get(),director=s.team[0];director.department="commercial";director.role.primary="lead";s.org.departments.commercial.managerId=director.id;
s.day=7;G.executiveWeek();const proposal=s.exec.proposals[0];assert.equal(proposal.type,"training");
assert.ok(G.executiveDecision(proposal.id,"decline"));s.day=14;G.executiveWeek();
assert.equal(s.exec.proposals.length,0);accounting(s);
});
console.log("Boss v19 organizational autonomy regressions passed.");
