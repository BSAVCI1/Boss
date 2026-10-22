// v26A first-day narrative and CEO cosmetic state regression; real underlying engine.
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm");
const html=fs.readFileSync("index.html","utf8");
const code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(code,{filename:"boss-v26a-founder-story.js"});
for(const id of ["boss-founder-intro","boss-intro-content","boss-founder-hero","boss-ceo-face","boss-office-scene","boss-story-next","boss-story-detail-toggle","boss-work-guide"]){
 assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,"unique "+id);
}
assert.ok(html.includes('data-founder-look'));
assert.ok(!/<script[^>]+src\s*=/.test(html),"offline, single-file game must remain independent of network");
const store=new Map(),elements=new Map();
function el(id){if(!elements.has(id))elements.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,disabled:false,hidden:false,
style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},
addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},setAttribute(){},removeAttribute(){},parentNode:{open:true}});return elements.get(id)}
let pendingTimers=0;
const env={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},
window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},
setTimeout:()=>{pendingTimers++;return pendingTimers},clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Set,Map,console};
vm.createContext(env);
const boot=code.indexOf("S=load();if(!S)fresh();");
assert.ok(boot>0,"engine bootstrap entry");
vm.runInContext(code.slice(0,boot)+
"globalThis.G={fresh,load,save,state:()=>S,ceoPortrait,renderFounderIntro,schedule,markPause:x=>paused=x,ensureViewState};})();",env,{timeout:15000});
const G=env.G;
const fresh=()=>{store.clear();G.fresh();return G.state()};
function test(name,fn){fn();console.log("PASS v26A "+name)}
test("First launch starts with real team and real projects, no new spend",()=>{
 const s=fresh();assert.equal(s.day,0);assert.equal(s.cash,90);assert.equal(s.team.length,3);assert.equal(s.deals.length,2);
 assert.equal(s.ui.founderIntro,"choose");assert.equal(s.ui.ceoLook,0);
 assert.equal(new Set(s.team.map(x=>x.id)).size,3);assert.equal(s.exec.lines.length,0);
 assert.equal(s.market.completed,0);assert.equal(s.factory.installed,false);
});
test("Portrait styles are self-contained and differ visibly",()=>{
 const pics=[0,1,2].map(i=>G.ceoPortrait(i));assert.ok(pics.every(x=>x.includes("<svg")&&x.includes("</svg>")));
 assert.equal(new Set(pics).size,3);assert.ok(pics.every(x=>!x.includes("<image")&&!x.includes("href=")&&!x.includes("src=")));
});
test("Character cosmetic state survives serialization without changing economics",()=>{
 const s=fresh(),econ=JSON.stringify({cash:s.cash,bi:s.bi,team:s.team,deals:s.deals});
 s.ui.ceoLook=2;s.ui.ceoName="Test CEO";s.ui.founderIntro="assign";s.ui.storyDetails=true;
 const restored=G.load(JSON.stringify(s));assert.ok(restored);assert.equal(restored.ui.ceoLook,2);
 assert.equal(restored.ui.ceoName,"Test CEO");assert.equal(restored.ui.founderIntro,"assign");
 assert.equal(restored.ui.storyDetails,true);assert.equal(JSON.stringify({cash:restored.cash,bi:restored.bi,team:restored.team,deals:restored.deals}),econ);
});
test("New player's introduction cannot silently advance game clock",()=>{
 const s=fresh();G.markPause(false);pendingTimers=0;G.schedule();assert.equal(pendingTimers,0);
 for(const phase of ["choose","brief","assign"]){s.ui.founderIntro=phase;G.schedule();assert.equal(pendingTimers,0,phase)}
 s.ui.founderIntro="done";G.schedule();assert.equal(pendingTimers,1);
});
test("Old saved games without the tutorial marker never receive an involuntary introduction",()=>{
 const s=fresh();delete s.ui.founderIntro;delete s.ui.ceoLook;delete s.ui.ceoName;s.day=250;
 const restored=G.load(JSON.stringify(s));assert.ok(restored);
 assert.equal(restored.ui.founderIntro,undefined);assert.equal(restored.day,250);
 assert.ok(G.ceoPortrait(restored.ui.ceoLook||0).includes("<svg"));
});
console.log("v26A story-first and non-economic-state checks passed.");
