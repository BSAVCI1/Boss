// Boss v17 game-first UX regression, offline single HTML, no npm dependencies.
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
vm.runInContext(javascript.slice(0,boot)+"globalThis.G={fresh,load,get:()=>S,set:x=>S=x,save,tick,gameChapter,companyMilestone,gamePlan,gameRender,gameAdvanceDays,renderStructure,renderBriefing,refresh,navigate};})();",sandbox,{timeout:3000});
const G=sandbox.G;
function fresh(){store.clear();G.fresh();el("lab-topic").value="learning";el("lab-duration").value="15";el("lab-forecast").value="25";el("lab-sector").value="hospitality";}
function test(name,fn){try{fn();console.log("PASS",name);}catch(e){console.error("FAILED",name);throw e;}}
test("work begins with projects, detailed reports remain optional",()=>{
const work=html.slice(html.indexOf('id="view-work"'),html.indexOf('id="view-team"'));
assert.ok(work.indexOf('id="deals-title"')<work.indexOf('id="performance-panel"'));
assert.ok(work.indexOf('id="pipeline-title"')<work.indexOf('id="economy-panel"'));
assert.ok(work.includes('id="work-records"'));
});
test("team begins with humans before manager spreadsheets",()=>{const t=html.slice(html.indexOf('id="view-team"'),html.indexOf('id="view-growth"'));assert.ok(t.indexOf('id="team-title"')<t.indexOf('id="organization-title"'));assert.ok(t.includes('id="team-organization"'));});
test("all game-first surfaces and accessible fallback tools exist",()=>{for(const id of ["game-goal","game-goal-bar","game-primary","game-forward","game-rivals","game-journey","game-story","game-toast","ceo-records","work-records","team-organization","office","performance-panel","coach-mode","bi-finance-panel"])assert.ok(ids.has(id),id);assert.ok(html.indexOf('id="game-desk"')<html.indexOf('id="ceo-records"'));});
test("new game has real introductory mission and no invented reward",()=>{fresh();const s=G.get();assert.equal(G.gameChapter(),"Founder");assert.ok(G.gamePlan()[0].includes("first"));const prior=s.cash,rep=s.rep;G.gameRender();assert.ok(el("game-goal").textContent.length>5);assert.equal(s.cash,prior);assert.equal(s.rep,rep);});
test("mission responds to actual staffing and client outcomes",()=>{fresh();const s=G.get();assert.ok(G.gamePlan()[0].includes("Assign"));s.deals[0].w=s.team[0].id;s.deals[1].w=s.team[1].id;assert.ok(G.gamePlan()[0].includes("Finish"));s.market.completed=2;assert.equal(G.gameChapter(),"Founder");assert.ok(G.gamePlan()[0].includes("three"));s.market.completed=3;assert.equal(G.companyMilestone(),"Small agency");assert.equal(G.gameChapter(),"Founder");});
test("late game company milestone depends on earned metrics, not elapsed days",()=>{fresh();const s=G.get();s.day=2000;assert.equal(G.gameChapter(),"Founder");s.market.completed=35;s.team.push(...Array.from({length:9},()=>({...s.team[0],id:s.pid++})));assert.notEqual(G.companyMilestone(),"Founder");assert.equal(G.gameChapter(),"Founder");});
test("skip button advances at most seven days while preserving accounting",()=>{fresh();const s=G.get();s.nextEv=999999;s.flow.focus=true;G.gameAdvanceDays();assert.equal(s.day,7);const v=s.bi.totals;assert.ok(Math.abs(s.bi.openingCash+v.cashIn-v.cashOut-s.cash)<.06);});
test("skip respects a pending CEO event",()=>{fresh();const s=G.get();s.ev={k:"fake",a:s.team[0].id,b:s.team[1].id};G.gameAdvanceDays();assert.equal(s.day,0);});
test("v16.1 migration keeps historical team, signed fee and decision journal",()=>{fresh();const s=G.get();s.day=200;s.team[0].n="Veteran";s.deals[0].agreedFee=347;s.coach.journal.push({title:"Decision retained",day:4});store.set("boss161",JSON.stringify(s));const old=store.get("boss161"),newState=G.load();assert.equal(newState.team[0].n,"Veteran");assert.equal(newState.deals[0].agreedFee,347);assert.ok(newState.coach.journal.some(x=>x.title==="Decision retained"));G.set(newState);G.save();assert.ok(store.get("boss20"));assert.equal(store.get("boss161"),old);});
test("company journey derives achievements from existing saved history",()=>{fresh();const s=G.get();s.market.completed=3;el("game-journey").open=true;G.gameRender();assert.ok(el("game-journey-map").innerHTML.includes("Small agency"));assert.ok(el("game-journey-map").innerHTML.includes("locked"));});
test("520-day economic replay remains finite and reconciled",()=>{fresh();const s=G.get();s.nextEv=999999;s.flow.focus=true;for(let i=0;i<520;i++){if(s.ev)s.ev=null;G.tick();}assert.equal(s.day,520);const t=s.bi.totals;assert.ok(Number.isFinite(s.cash));assert.ok(Math.abs(s.bi.openingCash+t.cashIn-t.cashOut-s.cash)<.06);});
console.log("Boss v17 game-first regressions passed.");
