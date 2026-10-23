// v26E2: Work/Team character scenes are truthful, focusable, and reversible.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),source=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(source,{filename:"boss-v26e2.js"});
for(const id of ["boss-work-mission","boss-work-title","boss-work-primary","boss-work-reports-toggle",
 "boss-team-story","boss-team-faces","boss-team-summary","boss-team-options",
 "boss-team-people-panel","boss-team-hiring-panel","people-stories-panel","campus-panel"]){
 assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,id+" uniquely present");
}
assert.ok(html.includes("boss-team-scene-simple"),"simple Work/Team visibility styles");
const store=new Map(),nodes=new Map(),queries=new Map();
function node(id){if(!nodes.has(id)){
 const classes=new Set();
 nodes.set(id,{id,innerHTML:"",textContent:"",value:"",hidden:false,dataset:{},open:false,attributes:{},style:{},children:[],
 setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]},
 classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle(x,on){if(on)classes.add(x);else classes.delete(x)}},
 addEventListener(){},scrollIntoView(){},getContext(){return new Proxy({},{get:()=>()=>{}})},querySelectorAll(){return []},parentNode:{open:true}});
}return nodes.get(id)}
const body=node("body");
const sandbox={document:{getElementById:node,querySelector:()=>node("q"),querySelectorAll:q=>queries.get(q)||[],body,documentElement:node("html"),addEventListener(){}},
 window:{scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
 setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),console,Date,Math,Map,Set,JSON};
const root=node("view-team");
for(const id of ["view-intro","boss-team-story","boss-team-options","boss-team-people-panel","boss-team-hiring-panel","campus-panel","people-stories-panel","leadership-context-team"]){
 const e=node(id);e.classList.add(id==="view-intro"?"view-intro":id==="leadership-context-team"?"leadership-context":"no-class");root.children.push(e);
}
queries.set("#view-work>.boss-work-advanced",[node("work-finance-section"),node("work-assets-section")]);
vm.createContext(sandbox);
const boot=source.indexOf("S=load();if(!S)fresh();");
assert.ok(boot>0);
vm.runInContext(source.slice(0,boot)+"globalThis.G={fresh,load,state:()=>S,renderWorkTeamScenes,focusTeamScene};})();",sandbox);
const G=sandbox.G;
function check(title,fn){fn();console.log("PASS v26E2 "+title)}
check("New game begins with 3 real visible portraits and customer mission, not financial dashboard",()=>{
 G.fresh();const s=G.state(),before=JSON.stringify(s);
 G.renderWorkTeamScenes();
 assert.ok(body.classList.contains("boss-team-scene-simple"));
 assert.equal((node("boss-team-faces").innerHTML.match(/data-boss-person=/g)||[]).length,3);
 assert.ok(node("boss-work-title").textContent.includes("customer"));
 assert.equal(node("boss-team-people-panel").attributes["data-team-visible"],undefined);
 assert.equal(node("work-finance-section").attributes["data-work-visible"],undefined);
 assert.equal(JSON.stringify(s),before,"scene must never mutate the economy");
});
check("Team can focus genuine colleagues then existing recruitment; other panels stay hidden",()=>{
 const s=G.state();G.focusTeamScene("people");
 assert.equal(s.ui.teamFocus,"people");assert.equal(node("boss-team-people-panel").attributes["data-team-visible"],"");
 assert.equal(node("boss-team-hiring-panel").attributes["data-team-visible"],undefined);
 G.focusTeamScene("hiring");
 assert.equal(node("boss-team-hiring-panel").attributes["data-team-visible"],"");
 assert.equal(node("boss-team-people-panel").attributes["data-team-visible"],undefined);
 assert.equal(s.team.length,3);
});
check("Detailed mode from Settings exposes old controls, and Simple remains reversible",()=>{
 const s=G.state(),before=JSON.stringify({cash:s.cash,team:s.team,deals:s.deals});
 s.ui.advancedViews=true;G.renderWorkTeamScenes();
 assert.equal(body.classList.contains("boss-team-scene-simple"),false);
 assert.equal(JSON.stringify({cash:s.cash,team:s.team,deals:s.deals}),before);
 s.ui.advancedViews=false;G.renderWorkTeamScenes();assert.ok(body.classList.contains("boss-team-scene-simple"));
});
check("Existing saved games retain their earned progress and can choose new visuals",()=>{
 const s=G.state();s.day=450;s.ui.teamFocus="campus";
 const copy=JSON.stringify(s),restored=G.load(copy);
 assert.equal(restored.day,450);assert.equal(restored.ui.teamFocus,"campus");
 assert.equal(restored.team.length,3);assert.equal(restored.cash,s.cash);
});
console.log("v26E2 Work and Team visual-player checks passed.");
