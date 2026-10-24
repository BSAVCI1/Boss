// v27A: playable leadership chapter and slow deliberate days with zero fictional economics.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const source=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(source,{filename:"boss-v27a.js"});
for(const id of ["speed-select","boss-week-skip","boss-game-calendar",
 "boss-v27-chapter","game-forward","boss-settings-panel"]){
 assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,id+" unique");
}
assert.ok(html.includes('value="1">1× · Story (30s/day)'));
// Do not accidentally reintroduce the old 2.4-second production day.
assert.ok(source.includes("const BOSS_DAY_MS=30000"));
assert.ok(source.includes("BOSS_DAY_MS/spd"));
const timers=[],store=new Map(),nodes=new Map(),queries=new Map();
function node(id){if(!nodes.has(id)){
 const classes=new Set();nodes.set(id,{id,innerHTML:"",textContent:"",value:"",hidden:false,
  dataset:{},attributes:{},open:false,style:{},listeners:{},children:[],
  setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]},
  classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle(x,on){on?classes.add(x):classes.delete(x)}},
  addEventListener(k,fn){this.listeners[k]=fn},scrollIntoView(){},
  getContext(){return new Proxy({},{get:()=>()=>{}})},querySelectorAll(){return []},parentNode:{open:true},
  closest(){return null}});
}return nodes.get(id);}
const body=node("body"),sandbox={
 document:{getElementById:node,querySelector:()=>node("q"),querySelectorAll:q=>queries.get(q)||[],body,documentElement:node("html"),addEventListener(){}},
 window:{scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
 setTimeout:(fn,delay)=>{timers.push(delay);return timers.length},clearTimeout(){},
 requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),console,Date,Math,Map,Set,JSON,confirm:()=>true
};
const root=node("view-team");
for(const id of ["view-intro","boss-team-story","boss-team-options","boss-team-people-panel","boss-team-hiring-panel","people-stories-panel"]){
 const e=node(id);e.classList.add(id==="view-intro"?"view-intro":"none");root.children.push(e);
}
queries.set("#view-work>.boss-work-advanced",[]);
vm.createContext(sandbox);
const boot=source.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0,"bootstrap boundary");
vm.runInContext(source.slice(0,boot)+
 "globalThis.G={fresh,load,state:()=>S,schedule,renderV27Chapter,chooseV27Leadership,v27TimeLabel,renderFounderStory,gameAdvanceDays,updateButtons,setPaused:v=>{paused=v},setSpeed:v=>{spd=v},getPaused:()=>paused};})();",sandbox);
const G=sandbox.G,check=(name,fn)=>{fn();console.log("PASS v27A "+name)};
check("fresh game records an unchosen story and original economic truth",()=>{
 G.fresh();const s=G.state();assert.equal(s.cash,90);assert.equal(s.day,0);
 assert.equal(s.team.length,3);assert.equal(s.deals.length,2);
 assert.equal(s.ui.v27Arc.choice,null);
});
check("week and weekday calendar advances seven real simulated days",()=>{
 assert.equal(G.v27TimeLabel(0),"Week 1 · Monday");
 assert.equal(G.v27TimeLabel(6),"Week 1 · Sunday");
 assert.equal(G.v27TimeLabel(7),"Week 2 · Monday");
 assert.equal(G.v27TimeLabel(30),"Week 5 · Wednesday");
});
check("founder chapter remains hidden before a legitimate first assignment",()=>{
 G.renderV27Chapter();
 assert.equal(node("boss-v27-chapter").hidden,true);
});
check("first customer assignment opens a genuine human CEO choice; render changes no finances",()=>{
 const s=G.state(),p=s.team[0],d=s.deals[0];
 s.ui.founderIntro="done";d.w=p.id;p.t="d"+d.id;
 const before=JSON.stringify(s);
 G.renderV27Chapter();
 assert.equal(node("boss-v27-chapter").hidden,false);
 const view=node("boss-v27-chapter").innerHTML;
 assert.ok(view.includes(p.n));assert.ok(view.includes("data-v27-choice"));
 assert.equal(JSON.stringify(s),before,"render is pure read-only");
});
check("three CEO choices change only real operating policies, not payroll/revenue/team/deals",()=>{
 for(const [choice,mode,target] of [["balanced","balanced",4],["growth","growth",6],["innovation","innovation",2]]){
  G.fresh();const s=G.state();s.ui.founderIntro="done";
  const ledger=JSON.stringify({cash:s.cash,team:s.team,deals:s.deals,rep:s.rep,economy:s.economy,day:s.day});
  assert.equal(G.chooseV27Leadership(choice),true);
  assert.equal(s.pipeline.mode,mode);assert.equal(s.pipeline.target,target);
  assert.equal(s.ui.v27Arc.choice,choice);
  assert.equal(s.ui.v27Arc.atCash,90);
  assert.equal(JSON.stringify({cash:s.cash,team:s.team,deals:s.deals,rep:s.rep,economy:s.economy,day:s.day}),ledger);
  assert.equal(G.chooseV27Leadership(choice),false,"prevent duplicate choices");
 }
});
check("story reflects genuine later deliveries and cash, not scripted prizes",()=>{
 G.fresh();const s=G.state();s.ui.founderIntro="done";
 assert.equal(G.chooseV27Leadership("balanced"),true);
 s.day=14;s.market.completed=1;s.cash=120;
 G.renderV27Chapter();const h=node("boss-v27-chapter").innerHTML;
 assert.ok(h.includes("Chapter two"));
 assert.ok(h.includes("14 days"));
 assert.ok(h.includes("1 real deliveries"));
 assert.ok(h.includes("Cash change"));
});
check("old saves without the v27 field remain safe and do not force a new chapter",()=>{
 const s=G.state();s.day=1000;delete s.ui.v27Arc;
 const before=JSON.stringify(s),restored=G.load(before);
 assert.equal(restored.day,1000);assert.equal(restored.ui.v27Arc,undefined);
 G.renderV27Chapter();assert.equal(node("boss-v27-chapter").hidden,true);
 assert.equal(restored.cash,s.cash);
});
check("day scheduling is 30s at Story, 10s Fast, and 3.75s Turbo",()=>{
 G.fresh();G.state().ui.founderIntro="done";
 for(const [speed,delay] of [[1,30000],[3,10000],[8,3750]]){
  G.setPaused(false);G.setSpeed(speed);timers.length=0;G.schedule();assert.ok(timers.includes(delay),speed+" at "+delay+" ms");
 }
});
check("End day advances exactly one economic day, advanced week skip retains max-seven",()=>{
 G.fresh();const s=G.state();s.ui.founderIntro="done";s.nextEv=99999;
 G.setPaused(true);G.gameAdvanceDays(1);assert.equal(s.day,1);
 G.gameAdvanceDays(7);assert.equal(s.day,8);
});
console.log("v27A story and realistic-day engine checks passed.");
