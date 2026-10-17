// Boss v19 regression: multi-layer organization, delegated funds, opportunities and legacy economics.
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),start=html.indexOf("<script>")+8,end=html.lastIndexOf("</script>");
const js=html.slice(start,end);
assert.ok(start>7&&end>start);
assert.equal((html.match(/<script\b/g)||[]).length,1,"one offline script");
assert.ok(!/<(?:script|link|img)[^>]+(?:src|href)=["']https?:/.test(html));
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const m of js.matchAll(/\$\("([^"]+)"\)/g))assert.ok(ids.has(m[1]),"Missing HTML element "+m[1]);
const els=new Map(),saved=new Map();
function el(id){if(!els.has(id))els.set(id,{id,innerHTML:"",textContent:"",value:"",open:false,hidden:false,checked:false,disabled:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},setAttribute(){},removeAttribute(){},querySelector(){return null},querySelectorAll(){return []},focus(){},getContext(){return new Proxy({},{get:()=>()=>{}})},parentNode:{open:true}});return els.get(id)}
const sandbox={document:{getElementById:el,querySelector:()=>el("selector"),querySelectorAll:()=>[],documentElement:el("html"),body:el("body"),addEventListener(){}},window:{scrollY:0,innerWidth:390,addEventListener(){},scrollTo(){}},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)},requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout:()=>{},getComputedStyle:()=>({getPropertyValue:()=>""}),clearInterval:()=>{},Math,Date,Map,Set,JSON,console};
vm.createContext(sandbox);
const boot=js.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
const exportNames="fresh,load,get:()=>S,set:x=>S=x,save,tick,refresh,orgPlan,orgChangePolicy,orgChooseManager,orgChooseSubManager,orgSubManager,orgSubReports,orgDirectReports,orgManager,orgEffective,orgFunds,orgSpend,orgBudgetPeriod,orgRenewPlan,orgManagerDay,orgAutonomousTeamDay,executiveWeek,executiveProposal,executiveDecision,executiveAutonomous,executiveShow,worldNewEvent,worldOfferTerms,worldOfferEligibility,worldEventChoice,worldRender,dailySalary,feeFor";
vm.runInContext(js.slice(0,boot)+"globalThis.G={"+exportNames+"};})();",sandbox,{timeout:4000});
const G=sandbox.G;
function test(name,run){run();console.log("PASS",name)}
function fresh(){saved.clear();G.fresh();el("lab-topic").value="learning";el("lab-duration").value="15";el("lab-forecast").value="25";el("lab-sector").value="hospitality";return G.get()}
function fund(s,amount){s.cash+=amount;s.bi.openingCash+=amount}
function balanced(s){const b=s.bi.totals;assert.ok(Math.abs(s.bi.openingCash+b.cashIn-b.cashOut-s.cash)<0.06,"Accounting disagreement")}
function manager(s,dept,p){p.department=dept;p.role.primary="lead";p.career.rank=Math.max(1,p.career.rank);p.t="coachteam";s.org.departments[dept].managerId=p.id;return p}
function worker(s,dept,role){const p=s.team.find(x=>x.department===dept&&x.role.primary===role&&x.career.rank===0);return p}
test("v19 initializes saved opt-in hierarchy and delegated policy",()=>{
 const s=fresh(),p=G.orgPlan("commercial");
 assert.equal(p.days,90);assert.equal(p.limits.training,0);assert.equal(p.limits.coaching,24);
 assert.equal(s.org.departments.commercial.subManagers.sales,null);assert.equal(s.org.departments.delivery.subManagers.ops,null);balanced(s);
});
test("legacy boss18 imports additively without rewriting signed fees",()=>{
 const s=fresh();s.day=2443;s.rep=1708;s.market.completed=321;const signed=G.feeFor(s.deals[0]);delete s.org.departments.commercial.plan;delete s.org.departments.commercial.subManagers;
 saved.set("boss18",JSON.stringify(s));const existing=saved.get("boss18");const restored=G.load();
 assert.equal(restored.day,2443);assert.equal(restored.rep,1708);assert.equal(G.feeFor(restored.deals[0]),signed);
 assert.equal(restored.org.departments.commercial.subManagers.sales,null);assert.equal(restored.org.departments.commercial.plan.days,90);assert.equal(saved.get("boss18"),existing);
});
test("custom positive numeric coaching/training/team/hiring budgets and targets",()=>{
 const s=fresh();
 for(const [k,v] of [["coaching",321],["training",120],["team",200],["hiring",110],["perAction",45],["hireSlots",2],["payrollLimit",7.5],["leads",27]])assert.ok(G.orgChangePolicy("commercial",k,v),k);
 assert.ok(G.orgChangePolicy("delivery","onTime",98));
 const p=G.orgPlan("commercial");assert.equal(p.limits.coaching,321);assert.equal(p.limits.hiring,110);assert.equal(p.hireSlots,2);
 assert.equal(s.org.departments.commercial.target.leads,27);assert.equal(s.org.departments.delivery.target.onTime,98);
 assert.equal(G.orgChangePolicy("commercial","training",-1),false);
 assert.equal(G.orgChangePolicy("delivery","onTime",101),false);balanced(s);
});
test("authorization requires explicit renewal at 90 / 180 days",()=>{
 const s=fresh();G.orgChangePolicy("commercial","training",120);G.orgChangePolicy("commercial","perAction",30);
 s.day=90;G.orgBudgetPeriod();assert.equal(G.orgFunds("commercial","training",8),false);
 const old=G.orgPlan("commercial").since;assert.equal(old,0);
 assert.ok(G.orgRenewPlan("commercial"));assert.equal(G.orgPlan("commercial").since,90);
 assert.equal(G.orgFunds("commercial","training",8),true);
 assert.ok(G.orgChangePolicy("commercial","days",180));assert.equal(G.orgPlan("commercial").days,180);balanced(s);
});
test("appoint a Sales Manager without duplicating reporting and keep salaries explicit",()=>{
 const s=fresh();fund(s,100);
 const director=manager(s,"commercial",s.team[0]),sales=s.team[1],marketing=s.team[2];
 sales.department="commercial";sales.role.primary="sales";sales.career.rank=1;
 marketing.department="commercial";marketing.role.primary="mkt";
 const before=G.dailySalary(sales);
 assert.equal(G.orgChooseSubManager("commercial","sales",sales.id),true);
 assert.equal(G.orgSubManager("commercial","sales").id,sales.id);
 assert.equal(G.orgDirectReports("commercial").some(p=>p.id===sales.id),true);
 assert.equal(G.orgSubReports("commercial","sales").some(p=>p.id===sales.id),false);
 assert.equal(G.dailySalary(sales)-before,0.5);
 assert.equal(G.orgChooseSubManager("commercial","mkt",sales.id),false);
 G.executiveShow();
 assert.ok(el("ceo-direct-reports").innerHTML.includes("Sales Manager"));
 assert.ok(el("ceo-direct-reports").innerHTML.includes("#"+sales.id));balanced(s);
});
test("manager coaching spends only within CEO-authorized budget",()=>{
 const s=fresh();fund(s,80);const m=manager(s,"commercial",s.team[0]),p=s.team[1];p.department="commercial";p.role.primary="sales";p.career.stress=70;
 G.orgChangePolicy("commercial","coaching",4);G.orgChangePolicy("commercial","perAction",4);
 s.day=7;const cash=s.cash;G.orgManagerDay(m);
 assert.equal(s.cash,cash-4);assert.equal(G.orgPlan("commercial").spent.coaching,4);
 s.day=14;G.orgManagerDay(m);assert.equal(s.cash,cash-4);balanced(s);
});
test("autonomous training uses allocated amount and does not create CEO requests",()=>{
 const s=fresh();fund(s,80);const m=manager(s,"commercial",s.team[0]),p=s.team[1];p.department="commercial";p.role.primary="sales";
 G.orgChangePolicy("commercial","training",16);G.orgChangePolicy("commercial","perAction",8);
 s.day=7;const cash=s.cash;G.executiveWeek();
 assert.equal(s.exec.proposals.length,0);
 assert.equal(s.cash,cash-8);assert.equal(G.orgPlan("commercial").spent.training,8);
 assert.equal(s.exec.history[0].action,"delegated");balanced(s);
});
test("blanket hiring authorizes one hire and tracks real payroll with ledger",()=>{
 const s=fresh();fund(s,400);manager(s,"commercial",s.team[0]);
 G.orgChangePolicy("commercial","hiring",40);G.orgChangePolicy("commercial","perAction",20);
 G.orgChangePolicy("commercial","hireSlots",1);G.orgChangePolicy("commercial","payrollLimit",2);
 s.pipeline.leads=Array.from({length:9},(_,i)=>({id:100+i,stage:"qualified",client:"C"+i,sector:"hospitality"}));
 s.day=7;const length=s.team.length,before=s.cash;G.executiveWeek();
 assert.equal(s.team.length,length+1);assert.equal(s.cash,before-20);
 assert.equal(G.orgPlan("commercial").hires,1);assert.ok(G.orgPlan("commercial").payrollAdded>0);
 assert.equal(s.exec.proposals.length,0);assert.equal(s.exec.history[0].proposal,"hire");balanced(s);
});
test("overspend and exhausted headcount remain CEO decisions",()=>{
 const s=fresh();fund(s,150);manager(s,"commercial",s.team[0]);G.orgChangePolicy("commercial","hiring",20);G.orgChangePolicy("commercial","perAction",20);
 G.orgChangePolicy("commercial","hireSlots",0);G.orgChangePolicy("commercial","payrollLimit",3);
 assert.equal(G.executiveAutonomous("commercial",{type:"hire",cost:20}),false);
 assert.equal(G.orgPlan("commercial").spent.hiring,0);balanced(s);
});
test("growth supports department manager appointments to address span of control",()=>{
 const s=fresh();fund(s,300);const director=manager(s,"commercial",s.team[0]);
 for(let i=0;i<7;i++){const p={...s.team[1],id:100+i,n:"Rep "+i,department:"commercial",role:{...s.team[1].role,primary:"sales"},career:{...s.team[1].career,rank:i===0?1:0,xp:i===0?12:1},t:"idle"};s.team.push(p)}
 s.day=7;const proposal=G.executiveProposal("commercial");
 assert.ok(proposal);assert.equal(proposal.type,"submanager");
 G.executiveWeek();const req=s.exec.proposals.find(x=>x.type==="submanager");assert.ok(req);
 assert.ok(G.executiveDecision(req.id,"approve"));assert.ok(G.orgSubManager("commercial","sales"));
 assert.ok(G.orgDirectReports("commercial").length<7);balanced(s);
});
test("referrals can be accepted with full 12-lead pipeline",()=>{
 const s=fresh();fund(s,40);s.pipeline.leads=Array.from({length:12},(_,i)=>({id:i+10}));
 s.world.activeEvent={id:1,type:"referrals",opened:1,until:100};
 assert.equal(G.worldOfferEligibility(s.world.activeEvent).allowed,true);
 const before=s.cash;
 assert.ok(G.worldEventChoice("act"));assert.equal(s.cash,before-10);
 assert.equal(s.pipeline.leads.length,12);balanced(s);
});
test("market research can be accepted with full pipeline, but tender cannot",()=>{
 const s=fresh();fund(s,90);s.pipeline.leads=Array.from({length:12},(_,i)=>({id:i+10}));
 s.world.activeEvent={id:5,type:"slowdown",opened:5,until:100};
 assert.equal(G.worldOfferEligibility(s.world.activeEvent).allowed,true);
 assert.ok(G.worldEventChoice("act"));assert.equal(s.world.activeEvent,null);
 s.world.activeEvent={id:6,type:"tender",opened:6,until:101,sector:"hospitality"};
 assert.equal(G.worldOfferEligibility(s.world.activeEvent).allowed,false);
 G.executiveShow();assert.ok(el("exec-inbox").innerHTML.includes("pipeline full"));
 assert.ok(G.worldEventChoice("pass"));balanced(s);
});
test("large reputation increases tender preparation cost; expenses reconcile",()=>{
 const s=fresh();fund(s,500);const ev={id:11,type:"tender",opened:11,until:80,sector:"hospitality"};
 const c1=G.worldOfferTerms(ev).cost;
 s.rep=1708;s.market.completed=305;
 const quote=G.worldOfferTerms(ev);assert.ok(quote.cost>c1);
 s.world.activeEvent=ev;const cash=s.cash;
 assert.ok(G.worldEventChoice("act"));assert.equal(s.cash,cash-quote.cost);
 assert.equal(s.pipeline.leads.at(-1).source,"major tender");balanced(s);
});
test("Today inbox offers inline market Act and Pass",()=>{
 const s=fresh();fund(s,25);s.world.activeEvent={id:7,type:"referrals",opened:7,until:70};
 G.executiveShow();const txt=el("exec-inbox").innerHTML;
 assert.ok(txt.includes('data-world-event="act"'));assert.ok(txt.includes('data-world-event="pass"'));assert.ok(!txt.includes("Review opportunity →"));
});
test("730-day autonomous simulated activity keeps cash reconciled, no hidden revenue",()=>{
 const s=fresh();const m=manager(s,"commercial",s.team[0]),p=s.team[1];p.department="commercial";p.role.primary="sales";
 G.orgChangePolicy("commercial","training",24);G.orgChangePolicy("commercial","coaching",48);G.orgChangePolicy("commercial","perAction",8);
 s.nextEv=999999;s.flow.focus=true;
 for(let n=0;n<730;n++){if(s.ev)s.ev=null;G.tick()}
 assert.equal(s.day,730);assert.ok(Number.isFinite(s.cash));assert.ok(G.orgPlan("commercial").spent.training<=24);
 balanced(s);G.save();assert.equal(JSON.parse(saved.get("boss18")).day,730);
});
console.log("Boss v19 autonomy and market regression checks passed.");
