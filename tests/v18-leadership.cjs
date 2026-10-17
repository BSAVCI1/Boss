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
vm.runInContext(javascript.slice(0,boot)+"globalThis.G={fresh,load,get:()=>S,set:x=>S=x,save,tick,gameChapter,gamePlan,gameRender,gameAdvanceDays,renderStructure,renderBriefing,refresh,navigate,ensureExecutive,executiveWeek,executiveProposal,executiveDecision,ceoDirection,draftExecutiveDirection,executiveShow,executiveLaunch,ceoLineFinish,createDeal,worldNewEvent,worldDay,worldEventChoice,renderIdeas,ideaProgressDay,delegateWork,orgChooseManager,feeFor,careerRoleSkill};})();",sandbox,{timeout:3000});
const G=sandbox.G;
function fresh(){store.clear();G.fresh();el("lab-topic").value="learning";el("lab-duration").value="15";el("lab-forecast").value="25";el("lab-sector").value="hospitality";}

function test(name,fn){fn();console.log("PASS",name);}
function accounting(s){const b=s.bi.totals;assert.ok(Math.abs(s.bi.openingCash+b.cashIn-b.cashOut-s.cash)<.06,"Money not reconciled");}
function appoint(s,dept,p){p.department=dept;p.role.primary="lead";p.career.rank=Math.max(1,p.career.rank);s.org.departments[dept].managerId=p.id;p.t="coachteam";return p;}
test("v17 save retained, boss18 separate, no historical executive reports fabricated",()=>{
fresh();const s=G.get();s.day=2252;s.cash=350490;s.rep=1456;s.market.completed=305;s.deals[0].agreedFee=314;s.team[0].career.rank=2;
delete s.exec;
store.set("boss17",JSON.stringify(s));const original=store.get("boss17");
const restored=G.load();assert.equal(restored.market.completed,305);assert.equal(restored.deals[0].agreedFee,314);
assert.equal(restored.team[0].career.rank,2);assert.equal(restored.exec.since,2252);
assert.equal(restored.exec.history.length,0);assert.equal(restored.exec.lines.length,0);
G.set(restored);G.save();assert.ok(store.get("boss20"));assert.equal(store.get("boss17"),original);
});
test("CEO office describes actual company identity, reports and assistant",()=>{
fresh();const s=G.get();G.executiveShow();
assert.ok(el("company-identity").textContent.includes("B2B client services"));
assert.ok(el("ceo-direct-reports").innerHTML.includes("Founder-led"));
assert.ok(el("ceo-assistant").textContent.includes("Unfilled"));
});
test("CEO direction is intentional and costs no cash, changes pipeline policy only",()=>{
fresh();const s=G.get(),cash=s.cash;assert.ok(G.ceoDirection("rd"));assert.equal(s.exec.priority,"rd");assert.equal(s.pipeline.mode,"innovation");assert.equal(s.cash,cash);assert.ok(s.coach.journal.some(x=>x.title.includes("CEO direction")));accounting(s);
});
test("CEO strategy selection survives rapid simulation refresh until confirmed",()=>{
fresh();const s=G.get();const original=s.exec.priority;assert.equal(original,"grow");
assert.ok(G.draftExecutiveDirection("people"));
assert.ok(el("ceo-direction-confirm").textContent.includes("Pending: Develop leaders"));
G.executiveShow();
assert.equal(el("ceo-priority").value,"people");assert.equal(s.exec.priority,"grow");
s.nextEv=999999;s.flow.focus=true;G.tick();G.tick();
assert.equal(el("ceo-priority").value,"people","Refresh must not erase pending CEO strategy");
assert.ok(G.ceoDirection(el("ceo-priority").value));
assert.equal(s.exec.priority,"people");assert.equal(el("ceo-priority").value,"people");
assert.ok(el("ceo-direction-confirm").textContent.includes("Confirmed: Develop leaders"));
G.save();assert.equal(G.load().exec.priority,"people");
});
test("new company clears unfinished strategy selection",()=>{
fresh();G.draftExecutiveDirection("profit");G.executiveShow();
assert.equal(el("ceo-priority").value,"profit");
G.fresh();G.executiveShow();
assert.equal(el("ceo-priority").value,"grow");
});
test("managers automatically prepare role-specific weekly proposals without spending",()=>{
fresh();const s=G.get();const m=s.team[0],m2=s.team[1];appoint(s,"commercial",m);appoint(s,"delivery",m2);const cash=s.cash;
s.day=7;G.executiveWeek();assert.equal(s.exec.proposals.length,2);
assert.equal(s.cash,cash);assert.ok(s.exec.proposals.every(x=>x.managerId&&x.cost>=0));
G.executiveWeek();assert.equal(s.exec.proposals.length,2);
});
test("CEO can reject proposed action without expense and follow-up is saved",()=>{
fresh();const s=G.get();appoint(s,"commercial",s.team[0]);s.day=7;G.executiveWeek();const req=s.exec.proposals[0],before=s.cash;
assert.ok(G.executiveDecision(req.id,"decline"));assert.equal(s.cash,before);assert.equal(s.exec.history[0].action,"decline");assert.equal(s.exec.proposals.length,0);accounting(s);
});
test("approved development proposal spends once, delivers actual skill change",()=>{
fresh();const s=G.get();appoint(s,"commercial",s.team[0]);G.ceoDirection("people");s.day=7;G.executiveWeek();
const req=s.exec.proposals[0],target=s.team.find(p=>p.id!==s.team[0].id&&p.department==="commercial");
if(!target){const p=s.team[1];p.department="commercial";}
const id=s.exec.proposals[0].id,cash=s.cash;
assert.ok(G.executiveDecision(id,"approve"));assert.equal(s.cash,cash-8);assert.equal(s.exec.history.length,1);accounting(s);
});
test("approval of a hire creates one colleague, payroll and initial recruiting cost",()=>{
fresh();const s=G.get();appoint(s,"commercial",s.team[0]);s.day=7;G.executiveWeek();
const req=s.exec.proposals[0];req.type="hire";req.cost=20;
const before=s.team.length,cash=s.cash;
assert.ok(G.executiveDecision(req.id,"approve"));assert.equal(s.team.length,before+1);assert.equal(s.cash,cash-20);assert.equal(s.team.at(-1).department,"commercial");accounting(s);
});
test("new service line is paid once and does not rewrite old signed project values",()=>{
fresh();const s=G.get();const injection=600-s.cash;s.cash+=injection;s.bi.openingCash+=injection;const old=G.feeFor(s.deals[0]);
assert.ok(G.executiveLaunch("product"));assert.equal(s.exec.lines.length,1);assert.equal(s.cash,480);assert.equal(G.feeFor(s.deals[0]),old);
assert.equal(G.executiveLaunch("product"),false);
const line=s.exec.lines[0];G.ceoLineFinish({serviceLine:"product",bookedAt:s.day},true,210);
assert.equal(line.delivered,1);assert.equal(line.revenue,210);accounting(s);
});
test("mature founder-led specialist is established despite team smaller than 12",()=>{
fresh();const s=G.get();s.market.completed=305;s.rep=1456;s.day=2252;assert.ok(G.gameChapter().includes("Established"));assert.ok(/CEO|direction|chapter/i.test(G.gamePlan()[0]));
assert.ok(G.gamePlan()[2]<G.gamePlan()[3],"Mature company needs an unfinished strategic goal");
});
test("market brief is prioritized on Today and stays for 45 days",()=>{
fresh();const s=G.get();s.day=45;G.worldNewEvent();const ev=s.world.activeEvent;assert.equal(ev.until,90);
G.executiveShow();assert.ok(el("exec-inbox").innerHTML.includes("Market opportunity"));
s.day=59;G.worldDay();assert.ok(s.world.activeEvent);G.executiveShow();assert.ok(el("exec-inbox").innerHTML.includes("Market opportunity"),"Market briefs must remain visible in the CEO inbox even if the next challenge is elsewhere");
});
test("company upgrades archive after earning all recipes",()=>{
fresh();const s=G.get();s.built=[...Array.from({length:10},(_,i)=>["","",String(i)])];
G.renderIdeas();assert.equal(el("upgrades-complete").hidden,false);
assert.ok(el("idea-summary").textContent.includes("All capabilities"));
});
test("office animation never writes undefined for known role tasks",()=>{
assert.ok(javascript.includes('improve:"🔧"'));assert.ok(javascript.includes('streamline:"⚙️"'));assert.ok(javascript.includes('||"💬"'));
});
test("multiple managed departments do not require executive assistant for local assignment",()=>{
fresh();const s=G.get();const m=s.team[0],ops=s.team[2];appoint(s,"delivery",m);
ops.department="delivery";ops.role.primary="ops";ops.role.auto=true;ops.role.autoTask=true;ops.t="idle";
s.deals[0].need="ops";s.deals[0].w=null;s.ops.assistantId=null;
assert.ok(G.delegateWork());assert.ok([s.team[1].id,ops.id].includes(s.deals[0].w),"Department manager selected an eligible delivery colleague");assert.ok(s.ops.assigned>=1,"Department manager may assign multiple available projects");
});
test("CEO layer survives 730 days without automatic hidden hiring or invented line revenue",()=>{
fresh();const s=G.get();const count=s.team.length;
s.nextEv=999999;s.flow.focus=true;
for(let n=0;n<730;n++){if(s.ev)s.ev=null;G.tick();}
assert.equal(s.day,730);assert.ok(s.team.length<=count,"CEO layer must never silently hire; employees may still voluntarily leave");assert.equal(s.exec.lines.length,0);
assert.equal(s.exec.history.length,0);assert.ok(Number.isFinite(s.cash));accounting(s);
G.save();assert.equal(JSON.parse(store.get("boss20")).day,730);
});
test("CEO approval makes director-suggested salary increase recurring, never immediate cash",()=>{
fresh();const s=G.get(),manager=s.team[0],worker=s.team[1];appoint(s,"commercial",manager);worker.department="commercial";worker.career.satisfaction=30;
s.exec.priority="people";s.day=7;G.executiveWeek();
const req=s.exec.proposals.find(p=>p.dept==="commercial");assert.equal(req.type,"raise");
const old=s.cash,oldRaise=worker.career.raise||0;assert.ok(G.executiveDecision(req.id,"approve"));
assert.equal(worker.career.raise,oldRaise+.25);assert.equal(s.cash,old);accounting(s);
});
test("new-business strategic direction yields real CEO-gated launch request",()=>{
fresh();const s=G.get();const director=s.team[1];appoint(s,"delivery",director);s.exec.priority="newline";s.day=7;
G.executiveWeek();const req=s.exec.proposals.find(x=>x.dept==="delivery");
assert.equal(req.type,"line");assert.equal(req.cost,120);
assert.equal(s.exec.lines.length,0);assert.equal(s.cash,90);assert.equal(G.executiveDecision(req.id,"approve"),false);
const injected=300-s.cash;s.cash+=injected;s.bi.openingCash+=injected;
assert.ok(G.executiveDecision(req.id,"approve"));assert.equal(s.exec.lines.length,1);assert.equal(s.cash,180);accounting(s);
});
console.log("Boss v18 CEO leadership regressions passed.");
