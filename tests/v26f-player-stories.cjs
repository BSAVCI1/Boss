// v26F — real customer mission and selected human characters; no fabricated state.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const source=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(source,{filename:"boss-v26f.js"});
for(const id of ["boss-team-story","boss-team-faces","boss-teammate-scene",
 "boss-work-summary","boss-team-people-panel","boss-team-hiring-panel"]){
 assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,"unique "+id);
}
const store=new Map(),nodes=new Map(),queries=new Map();
function node(id){
 if(!nodes.has(id)){
  const classes=new Set();
  nodes.set(id,{id,innerHTML:"",textContent:"",value:"",hidden:false,dataset:{},open:false,
   attributes:{},listeners:{},style:{},children:[],parentNode:{open:true},
   setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]},
   classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),
    toggle(x,on){if(on)classes.add(x);else classes.delete(x)}},
   addEventListener(k,fn){this.listeners[k]=fn},scrollIntoView(){this.scrolled=true},
   getContext(){return new Proxy({},{get:()=>()=>{}})},querySelectorAll(){return []},
   closest(){return null}});
 }
 return nodes.get(id);
}
const body=node("body"),record=node("record"),group=node("group");record.closest=()=>group;
const sandbox={
 document:{getElementById:node,querySelector:q=>q.startsWith('#people details[data-employee-id=')?record:node("q"),
  querySelectorAll:q=>queries.get(q)||[],body,documentElement:node("html"),addEventListener(){}},
 window:{scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
 setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,
 getComputedStyle:()=>({getPropertyValue:()=>""}),console,Date,Math,Map,Set,JSON
};
const team=node("view-team");
for(const id of ["view-intro","boss-team-story","boss-team-options","boss-teammate-scene",
 "boss-team-people-panel","boss-team-hiring-panel","campus-panel","people-stories-panel","leadership-context-team"]){
 const e=node(id);
 e.classList.add(id==="view-intro"?"view-intro":"no-class");
 if(id!=="boss-teammate-scene")team.children.push(e);
}
queries.set("#view-work>.boss-work-advanced",[node("work-finance-section")]);
vm.createContext(sandbox);
const boot=source.indexOf("S=load();if(!S)fresh();");
assert.ok(boot>0,"actual engine boot entry");
vm.runInContext(source.slice(0,boot)+
 "globalThis.G={fresh,load,state:()=>S,renderWorkTeamScenes,renderFocusedTeammate,focusTeammate,focusTeamScene};})();",sandbox);
const G=sandbox.G;
const check=(name,fn)=>{fn();console.log("PASS v26F "+name)};
check("real waiting customer and project are in first Work mission, rendering is read-only",()=>{
 G.fresh();const s=G.state(),before=JSON.stringify(s),waiting=s.deals.find(d=>!d.w);
 assert.ok(waiting);
 G.renderWorkTeamScenes();
 assert.ok(node("boss-work-summary").textContent.includes(waiting.cl),"canonical customer name");
 assert.ok(node("boss-work-summary").textContent.includes(String(waiting.dl)),"real time left");
 assert.equal(JSON.stringify(s),before,"no simulation mutation on rendering");
});
check("portrait chooses its actual teammate, not an unrelated People panel",()=>{
 const s=G.state(),p=s.team[0],before=JSON.stringify(s);
 const handler=node("boss-team-story").listeners.click;assert.equal(typeof handler,"function");
 handler({target:{closest:()=>({dataset:{bossPerson:String(p.id)}})}});
 assert.equal(node("boss-teammate-scene").hidden,false);
 assert.ok(node("boss-teammate-scene").innerHTML.includes(p.n));
 assert.ok(node("boss-team-faces").innerHTML.includes('data-boss-person="'+p.id+'" aria-pressed="true"'));
 assert.equal(node("boss-team-people-panel").attributes["data-team-visible"],undefined,
  "portrait should keep visual story visible without opening card wall");
 assert.equal(JSON.stringify(s),before,"selecting a face changes no saved game data");
});
check("actual assigned contract replaces idle teammate story when project changes",()=>{
 const s=G.state(),p=s.team[0],d=s.deals[0],originalWorker=d.w,originalTask=p.t;
 d.w=p.id;p.t="d"+d.id;
 G.renderWorkTeamScenes();
 const card=node("boss-teammate-scene").innerHTML;
 assert.ok(card.includes(d.cl),"selected person's actual customer");
 assert.ok(card.includes(String(d.dl)),"selected person's actual deadline");
 d.w=originalWorker;p.t=originalTask;
});
check("career action opens the selected real employee's existing management controls",()=>{
 const s=G.state(),p=s.team[0];
 const handler=node("boss-team-story").listeners.click;
 handler({target:{closest:()=>({dataset:{bossOpenCareer:String(p.id)}})}});
 assert.equal(s.ui.teamFocus,"people");
 assert.equal(node("boss-team-people-panel").attributes["data-team-visible"],"");
 assert.equal(record.open,true);assert.equal(group.open,true);assert.equal(record.scrolled,true);
});
check("deleted teammate never appears in a stale selected story",()=>{
 const s=G.state(),p=s.team.shift();
 G.renderFocusedTeammate();
 assert.equal(node("boss-teammate-scene").hidden,true);
 s.team.unshift(p);
 G.renderFocusedTeammate();
 assert.equal(node("boss-teammate-scene").hidden,false);
});
check("old game compatibility and detailed operations remain available",()=>{
 const s=G.state();s.day=4704;s.ui.advancedViews=true;
 const frozen=JSON.stringify({cash:s.cash,deals:s.deals,team:s.team,day:s.day});
 G.renderWorkTeamScenes();
 assert.equal(body.classList.contains("boss-team-scene-simple"),false);
 assert.equal(JSON.stringify({cash:s.cash,deals:s.deals,team:s.team,day:s.day}),frozen);
 const restored=G.load(JSON.stringify(s));
 assert.equal(restored.day,4704);
 assert.equal(restored.team.length,s.team.length);
});
console.log("v26F actual-engine customer and teammate interaction tests complete.");
