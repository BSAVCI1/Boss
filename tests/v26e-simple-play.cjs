// v26E — test real data projection, mobile-ready simple screens and reversible detail controls.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),js=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(js);
const ids=["boss-settings-open","boss-settings-panel","boss-settings-close","boss-settings-speed",
"boss-settings-backup","boss-settings-reports","boss-settings-restart","boss-presentation-choices",
"boss-work-mission","boss-work-reports-toggle","boss-team-story","boss-team-faces","boss-team-options",
"boss-growth-options","boss-growth-back","boss-visual-empire","boss-team-people-panel","boss-team-hiring-panel"];
for(const id of ids)assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,"one "+id);
assert.ok(html.includes(".boss-simple-play #view-growth"),"simple Growth mode");
assert.ok(html.includes(".boss-simple-play #view-team"),"simple Team mode");
assert.ok(html.includes(".boss-simple-play #view-work"),"simple Work mode");
assert.ok(html.includes("#boss-settings-panel[hidden]"),"settings modal can close");
assert.ok(!/<script[^>]*src\s*=/.test(html),"offline single-file design");
const nodes=new Map(),storage=new Map();
function el(id){
 if(!nodes.has(id)){
  const classes=new Set();
  nodes.set(id,{id,innerHTML:"",textContent:"",value:"",hidden:false,open:false,
    dataset:{},style:{},attributes:{},children:[],parentElement:null,
    classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle(x,show){if(show)classes.add(x);else classes.delete(x)}},
    setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]},
    getAttribute(k){return this.attributes[k]},addEventListener(){},querySelector(){return null},querySelectorAll(){return []},
    scrollIntoView(){},focus(){},getContext(){return new Proxy({},{get:()=>()=>{}})},parentNode:{open:true}});
 }
 return nodes.get(id);
}
const env={document:{getElementById:el,querySelector:()=>el("q"),querySelectorAll:()=>[],
 body:el("body"),documentElement:el("html"),addEventListener(){}},
 window:{scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},
 setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Map,Set,console};
vm.createContext(env);
const bootstrap=js.indexOf("S=load();if(!S)fresh();");assert.ok(bootstrap>0);
vm.runInContext(js.slice(0,bootstrap)+"globalThis.G={fresh,state:()=>S,renderPlayMode,chooseGrowthFocus,chooseTeamFocus};})();",env,{timeout:10000});
const G=env.G;
const teamRoot=el("view-team"),growthRoot=el("view-growth");
for(const id of ["boss-team-story","boss-team-options","boss-team-people-panel","boss-team-hiring-panel","people-stories-panel","campus-panel","leadership-context-team"]){
 const item=el(id);item.parentElement=teamRoot;teamRoot.children.push(item);
}
for(const id of ["boss-visual-empire","boss-growth-options","factory-panel","growth-expand-businesses","growth-investments-property","acquisition-panel"]){
 const item=el(id);item.parentElement=growthRoot;growthRoot.children.push(item);
}
function check(label,fn){fn();console.log("PASS v26E "+label)}
check("New Founder boots in simple visual mode with truthfully saved employee portraits",()=>{
 G.fresh();const s=G.state(),snapshot=JSON.stringify(s);G.renderPlayMode();
 assert.equal(el("body").classList.contains("boss-simple-play"),true);
 assert.equal(el("body").classList.contains("boss-detailed-play"),false);
 assert.equal((el("boss-team-faces").innerHTML.match(/data-boss-person=/g)||[]).length,3);
 assert.ok(el("boss-work-title").textContent.includes("customer"));
 assert.equal(el("boss-team-people-panel").attributes["data-boss-team-visible"],undefined);
 assert.equal(el("factory-panel").attributes["data-boss-growth-visible"],undefined);
 assert.equal(JSON.stringify(s),snapshot,"render cannot alter cash, debt or saved state");
});
check("Team portraits lead to existing real people or hiring controls, never phantom jobs",()=>{
 const s=G.state();
 G.chooseTeamFocus("people");
 assert.equal(s.ui.teamFocus,"people");
 assert.equal(el("boss-team-people-panel").attributes["data-boss-team-visible"],"");
 assert.equal(el("boss-team-hiring-panel").attributes["data-boss-team-visible"],undefined);
 G.chooseTeamFocus("hiring");
 assert.equal(el("boss-team-hiring-panel").attributes["data-boss-team-visible"],"");
 assert.equal(s.team.length,3);
});
check("Growth world reveals just the actual factory, launch controls or whole original empire",()=>{
 const s=G.state();assert.equal(G.chooseGrowthFocus("factory-panel"),true);
 assert.equal(s.ui.growthFocus,"factory-panel");
 assert.equal(el("factory-panel").attributes["data-boss-growth-visible"],"");
 assert.equal(el("growth-expand-businesses").attributes["data-boss-growth-visible"],undefined);
 assert.equal(G.chooseGrowthFocus("growth-investments-property"),true);
 assert.equal(el("growth-investments-property").attributes["data-boss-growth-visible"],"");
 assert.equal(el("factory-panel").attributes["data-boss-growth-visible"],undefined);
 assert.equal(G.chooseGrowthFocus("all"),true);
 assert.equal(el("factory-panel").attributes["data-boss-growth-visible"],"");
 assert.equal(el("growth-expand-businesses").attributes["data-boss-growth-visible"],"");
 assert.equal(s.cash,90);
});
check("Detailed mode restores all panels without a reload or economic change",()=>{
 const s=G.state(),before=JSON.stringify({cash:s.cash,team:s.team,deals:s.deals});
 s.ui.playPresentation="detailed";G.renderPlayMode();
 assert.equal(el("body").classList.contains("boss-simple-play"),false);
 assert.equal(el("body").classList.contains("boss-detailed-play"),true);
 assert.equal(JSON.stringify({cash:s.cash,team:s.team,deals:s.deals}),before);
});
console.log("v26E simple-play/advanced-state compatibility checks complete.");
