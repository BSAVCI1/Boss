// Boss v15 offline smoke suite. No dependencies beyond Node.js.
const fs=require("node:fs"),vm=require("node:vm"),a=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),js=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
a.equal((html.match(/<script\b/g)||[]).length,1);
a.ok(!/<(?:script|link|img)[^>]+(?:src|href)=["']https?:/.test(html));
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const m of js.matchAll(/\$\("([^"]+)"\)/g))a.ok(ids.has(m[1]),"Unknown ID "+m[1]);
const elements=new Map(),data=new Map();
const el=id=>{if(!elements.has(id))elements.set(id,{id,open:false,innerHTML:"",textContent:"",value:"",disabled:false,hidden:false,checked:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},getContext(){return new Proxy({},{get:()=>()=>{}})},querySelector(){return null},querySelectorAll(){return []},focus(){},parentNode:{open:true}});return elements.get(id)};
const sandbox={document:{getElementById:el,querySelector:()=>el("selector"),querySelectorAll:()=>[],documentElement:el("html"),body:el("body"),addEventListener(){}},window:{addEventListener(){},scrollY:0,scrollTo(){},innerWidth:380},localStorage:{getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)},requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout:()=>{},getComputedStyle:()=>({getPropertyValue:()=>""}),Math,Date,Map,Set,JSON,console};
vm.createContext(sandbox);
const boot=js.indexOf("S=load();if(!S)fresh();");a.ok(boot>0);
vm.runInContext(js.slice(0,boot)+"globalThis.G={fresh,get:()=>S,set:s=>S=s,load,save,tick,createDeal,economyInvoice,economyDay,economyBorrow,economyRepay,economyEarlyCollection,economyInvest,economyChangePolicy,feeFor,coachCareerStatus,coachSnap,coachDecision,coachFollowups,renderSkillMap};})();",sandbox,{timeout:3000});
const G=sandbox.G;
const fresh=()=>{data.clear();G.fresh();el("lab-topic").value="learning";el("lab-duration").value="15";el("lab-forecast").value="25";el("lab-sector").value="hospitality"};
const cashCheck=s=>a.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.05,"cash ledger mismatch");
function test(name,fn){fn();console.log("PASS",name);}
test("new game",()=>{fresh();const s=G.get();a.equal(s.cash,90);a.equal(s.team.length,3);a.equal(s.deals.length,2);});
test("save migration",()=>{fresh();const s=G.get();s.day=90;s.team[0].n="Keep";s.deals[0].agreedFee=222;delete s.economy;data.set("boss141",JSON.stringify(s));const m=G.load();a.equal(m.team[0].n,"Keep");a.equal(m.deals[0].agreedFee,222);a.equal(m.economy.since,90);a.ok(m.deals.every(d=>d.paymentTerms===0));});
test("contract price locking",()=>{fresh();const s=G.get(),price=G.feeFor(s.deals[0]);G.economyChangePolicy("pricing","premium");s.day=2;G.economyChangePolicy("terms","30");const d=G.createDeal();a.equal(d.termPriceFactor,1.08);a.equal(d.priceFactor,1.1);a.equal(G.feeFor(s.deals[0]),price);});
test("invoice and collection",()=>{fresh();const s=G.get();s.day=1;const i=G.economyInvoice(G.createDeal(),100);a.equal(i.status,"open");a.equal(s.bi.totals.revenue,100);a.equal(s.cash,90);s.day=8;G.economyDay();a.equal(i.status,"paid");a.equal(s.cash,190);cashCheck(s);});
test("early settlement no duplicate revenue",()=>{fresh();const s=G.get();s.day=1;G.economyInvoice(G.createDeal(),100);G.economyEarlyCollection();a.equal(s.bi.totals.revenue,100);a.equal(s.bi.totals.costs,3);a.equal(s.cash,187);cashCheck(s);});
test("credit interest",()=>{fresh();const s=G.get();G.economyBorrow();s.day=1;G.economyDay();const cost=s.bi.totals.costs;G.economyRepay();a.equal(s.bi.totals.costs,cost);cashCheck(s);});
test("capital versus expense",()=>{fresh();const s=G.get();G.economyInvest("operations");a.equal(s.cash,25);a.equal(s.bi.totals.costs,0);cashCheck(s);});
test("career skill relevance and training",()=>{fresh();const s=G.get(),p=s.team[0];p.career.xp=10;p.s.sales=1.1;p.s.ops=7;a.equal(G.coachCareerStatus(p).ready,false);p.career.trainingFocus="sales";p.t="study";p.role.auto=false;s.flow.focus=true;s.pipeline.auto=false;s.ops.policy.assign=false;const x=p.s.sales;G.tick();a.ok(p.s.sales>x);p.s.sales=1.9;a.equal(G.coachCareerStatus(p).ready,true);});
test("365-day reconciliation and decision review",()=>{fresh();const s=G.get();G.coachDecision("Test",G.coachSnap(),"",null,7);s.flow.focus=true;s.nextEv=999999;for(let i=0;i<365;i++){if(s.ev)s.ev=null;G.tick();}a.equal(s.day,365);a.ok(s.coach.journal[0].follow);cashCheck(s);});
test("mobile skills disclosure",()=>{fresh();G.renderSkillMap();a.equal(el("skills-map").innerHTML,"");el("skills-panel").open=true;G.renderSkillMap();a.ok(el("skills-map").innerHTML.includes("Find Sales talent"));});
console.log("Boss v15: all 10 regression checks passed.");
