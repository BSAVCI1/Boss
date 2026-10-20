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
const methods="fresh,load,get:()=>S,set:x=>S=x,save,executiveLaunch,companyLaunchReadiness,companyDirection,renderLaunchGuide,gameRender,renderBriefing,renderExecutiveWeekly,managementReviewMonth,managementOps,unitActivate,unitAppoint,unitTransfer,dailySalary,createDeal,feeFor,tick";
vm.runInContext(script.slice(0,boot)+"globalThis.G={"+methods+"};})();",sandbox,{timeout:4000});
const G=sandbox.G;
function fresh(){store.clear();G.fresh();el("service-line-select").value="product";return G.get();}
function fund(s,amount){s.cash+=amount;s.bi.openingCash+=amount;}
function money(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.06,"single cash ledger must reconcile");}
function test(name,fn){fn();console.log("PASS",name);}
function firstReady(s){fund(s,1800);s.market.completed=5;s.rep=35;s.org.progression.appointments.push({id:s.team[0].id,level:"lead",since:s.day,successorId:null});s.team[1].s.prod=3;}
test("fresh 3-person company refuses locked purchase with no financial or save changes",()=>{
 const s=fresh(),cash=s.cash,ledger=JSON.stringify(s.bi.totals),day=s.day;
 assert.equal(G.companyLaunchReadiness("product").ready,false);
 assert.ok(G.companyLaunchReadiness("product").checks.some(x=>!x.met));
 assert.equal(G.executiveLaunch("product"),false);
 assert.equal(s.exec.lines.length,0);assert.equal(s.cash,cash);
 assert.equal(JSON.stringify(s.bi.totals),ledger);assert.equal(s.day,day);money(s);
 G.renderLaunchGuide();assert.equal(el("launch-service-line").disabled,true);
 assert.ok(el("company-launch-status").textContent.includes("Locked"));
});
test("qualified first service requires real milestone flags, charges once and survives reload",()=>{
 const s=fresh();firstReady(s);
 assert.equal(G.companyLaunchReadiness("product").ready,true);
 G.renderLaunchGuide();assert.equal(el("launch-service-line").disabled,false);
 const before=s.cash,paid=s.bi.totals.investments;
 assert.equal(G.executiveLaunch("product"),true);
 assert.equal(s.cash,before-120);assert.equal(s.bi.totals.investments,paid+120);
 assert.equal(G.executiveLaunch("product"),false);
 const saved=G.load();assert.equal(saved.exec.lines.length,1);assert.equal(saved.exec.lines[0].spent,120);assert.equal(saved.day,s.day);
 assert.ok(G.companyLaunchReadiness("marketing").checks.some(x=>x.label.includes("Deliver 3 projects")&&!x.met));
 money(s);
});
test("second independent business is gated by measured first-line delivery and a staffed GM",()=>{
 const s=fresh();firstReady(s);s.deals=[];
 assert.equal(G.executiveLaunch("product"),true);
 s.team[2].s.mkt=3;
 assert.equal(G.companyLaunchReadiness("marketing").ready,false);
 s.exec.lines[0].delivered=3;
 assert.equal(G.companyLaunchReadiness("marketing").ready,false,"profits alone cannot substitute for a staffed GM");
 assert.equal(G.unitActivate("product"),true);
 s.team[0].career.rank=1;
 assert.equal(G.unitAppoint("product",s.team[0].id),true);
 assert.equal(G.unitTransfer("product",s.team[1].id),true);
 assert.equal(G.companyLaunchReadiness("marketing").ready,true);
 assert.equal(G.executiveLaunch("marketing"),true);
 assert.equal(s.exec.lines.length,2);
 assert.equal(new Set(s.exec.lines.map(x=>x.key)).size,2);money(s);
 assert.equal(G.companyLaunchReadiness("operations").ready,false,"third business must earn additional management milestones");
});
test("old purchased services survive a strict-gated migration with no historical reprice",()=>{
 const s=fresh();firstReady(s);assert.equal(G.executiveLaunch("product"),true);
 s.day=2642;s.rep=1;s.market.completed=0;
 const cash=s.cash,invested=s.bi.totals.investments,line=JSON.stringify(s.exec.lines);
 G.save();
 const reloaded=G.load();G.set(reloaded);
 assert.equal(reloaded.day,2642);assert.equal(reloaded.cash,cash);
 assert.equal(JSON.stringify(reloaded.exec.lines),line);
 assert.equal(reloaded.bi.totals.investments,invested);
 assert.equal(G.executiveLaunch("marketing"),false);
 assert.equal(reloaded.exec.lines.length,1);money(reloaded);
});
test("CEO Today and Growth explain the next actual missing milestone",()=>{
 const s=fresh();
 const advice=G.companyDirection();
 assert.equal(advice.stage,"Founder");assert.ok(advice.unmet.length>0);
 G.renderLaunchGuide();assert.ok(el("company-unlock-guide").innerHTML.includes("Locked"));
 G.gameRender();assert.ok(el("company-stage-today").innerHTML.includes("Company milestone"),"Business launch milestone stays distinct from v22.6 leadership maturity");
 assert.ok(el("game-chapter").textContent.includes("Founder"));
 money(s);
});
test("monthly corporate leadership scorecards start at baseline and remain cost-neutral",()=>{
 const s=fresh();fund(s,1000);const mgr=s.team[0],worker=s.team[1];
 worker.department=mgr.department; // Scorecard scope is the leader's own functional department.
 s.org.progression.appointments.push({id:mgr.id,level:"manager",since:0});
 s.day=30;const cash=s.cash,costs=s.bi.totals.cashOut;
 G.managementReviewMonth();
 let cards=G.managementOps().scorecards.filter(x=>x.personId===mgr.id);
 assert.equal(cards.length,1);assert.equal(cards[0].completed,null);
 G.managementReviewMonth();assert.equal(G.managementOps().scorecards.filter(x=>x.personId===mgr.id).length,1);
 worker.perf.completed=(worker.perf.completed||0)+2;s.day=60;G.managementReviewMonth();
 cards=G.managementOps().scorecards.filter(x=>x.personId===mgr.id);
 assert.equal(cards.length,2);assert.equal(cards[0].completed,2);
 assert.equal(s.cash,cash);assert.equal(s.bi.totals.cashOut,costs);
 G.save();const saved=G.load();assert.equal(saved.org.progression.operations.scorecards.length,G.managementOps().scorecards.length);
 money(s);
});
console.log("Boss v21.5 strict progression and accountability checks passed.");
