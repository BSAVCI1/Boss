// v26E: the illustrated company is primary; legacy financial/admin controls are available on request.
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm");
const html=fs.readFileSync("index.html","utf8"),code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(code,{filename:"boss-v26e.js"});
for(const id of ["boss-settings-open","boss-settings-close","boss-settings-panel","boss-settings-advanced",
 "export-save","boss-visual-empire","boss-growth-focus","boss-growth-choices","boss-growth-full","boss-growth-focus-caption"]){
 assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,"unique "+id);
}
assert.ok(html.indexOf('id="boss-visual-empire"')<html.indexOf('id="boss-growth-focus"'),"visual world first");
assert.ok(html.indexOf('id="export-save"')>html.indexOf('id="boss-settings-panel"'),"backup moved to Settings");
for(const id of ["factory-panel","growth-expand-businesses","growth-markets-customers","growth-investments-property","growth-research"])
 assert.ok(html.includes('id="'+id+'"'),"original management action must remain");
let adds=[],store=new Map(),nodes=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{id,hidden:id==="boss-settings-panel",innerHTML:"",textContent:"",value:"",checked:false,
 style:{},dataset:{},attributes:{},classList:{add(x){adds.push("add:"+x)},remove(x){adds.push("remove:"+x)},toggle(x,v){adds.push((v?"on:":"off:")+x)}},
 setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]},querySelectorAll(){return []},querySelector(){return null},
 addEventListener(){},getContext(){return new Proxy({},{get:()=>()=>{}})},parentNode:{open:true}});return nodes.get(id)}
const sandbox={document:{getElementById:el,querySelector:()=>el("query"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),addEventListener(){}},
 window:{scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
 setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Math,Date,Set,Map,JSON,console};
vm.createContext(sandbox);const boot=code.indexOf("S=load();if(!S)fresh();");assert.ok(boot>=0);
vm.runInContext(code.slice(0,boot)+"globalThis.G={fresh,load,state:()=>S,renderGrowthFocus,renderGameSettings,focus:BOSS_GROWTH_FOCUS,routes:BOSS_GROWTH_TARGETS};})();",sandbox);
const G=sandbox.G;
function check(label,fn){fn();console.log("PASS v26E "+label)}
check("Default new-game view emphasizes world, hides legacy operational groups but not actual values",()=>{
 G.fresh();const s=G.state(),before=JSON.stringify(s);adds=[];G.renderGrowthFocus();
 assert.ok(adds.includes("on:boss-growth-simple"));
 assert.equal(el("factory-panel").attributes["data-growth-area"],"factory");
 assert.equal(el("factory-panel").attributes["data-growth-show"],undefined);
 assert.equal(el("growth-expand-businesses").attributes["data-growth-show"],undefined);
 assert.equal(el("growth-markets-customers").attributes["data-growth-show"],undefined);
 assert.equal(JSON.stringify(s),before,"render is economic- and save-neutral");
});
check("Player chooses one real business area, not a list of all panels",()=>{
 const s=G.state();s.ui.growthFocus="businesses";G.renderGrowthFocus();
 assert.equal(el("growth-expand-businesses").attributes["data-growth-show"],"");
 assert.equal(el("acquisition-panel").attributes["data-growth-show"],"");
 assert.equal(el("factory-panel").attributes["data-growth-show"],undefined);
 assert.equal(el("growth-investments-property").attributes["data-growth-show"],undefined);
});
check("Visual factory and property routes expose canonical existing controls",()=>{
 const s=G.state();
 for(const [target,focus] of [["factory-panel","factory"],["property-panel","investments"],["growth-expand-businesses","businesses"],["acquisition-panel","businesses"]]){
  assert.equal(G.routes[target],focus);
  s.ui.growthFocus=focus;G.renderGrowthFocus();
  const panel=target==="property-panel"?"growth-investments-property":target;
  assert.equal(el(panel).attributes["data-growth-show"],"");
 }
});
check("Full detail preference exposes all original zones and persists in old save UI",()=>{
 const s=G.state();s.ui.advancedViews=true;G.renderGrowthFocus();
 assert.ok(adds.includes("off:boss-growth-simple"));
 for(const id of Object.keys(G.focus))assert.equal(el(id).attributes["data-growth-show"],"","original control "+id);
 assert.equal(el("boss-settings-advanced").checked,true);
 assert.equal(el("boss-growth-full").attributes["aria-pressed"],"true");
 const snapshot=JSON.stringify(s),restored=G.load(snapshot);assert.ok(restored);
 assert.equal(restored.ui.advancedViews,true);
 assert.equal(restored.ui.growthFocus,"businesses");
});
check("Legacy saves without focus settings remain simple without data migrations",()=>{
 G.fresh();const s=G.state();s.day=125;delete s.ui.advancedViews;delete s.ui.growthFocus;
 const before=JSON.stringify(s);G.renderGrowthFocus();
 assert.ok(adds.includes("on:boss-growth-simple"));
 assert.equal(JSON.stringify(s),before);
});
console.log("v26E settings/focus verification complete");
