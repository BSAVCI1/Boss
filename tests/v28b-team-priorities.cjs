// v28B — work-priority conflict is verified from actual two client assignments.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),source=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(source,{filename:"v28b-priorities.js"});
assert.equal((html.match(/id="boss-v28-friction"/g)||[]).length,1);
const nodes=new Map(),storage=new Map();let denyWrites=false;
function element(id){if(!nodes.has(id))nodes.set(id,{id,innerHTML:"",textContent:"",value:"",hidden:false,disabled:false,checked:false,open:false,style:{},dataset:{},
 classList:{add(){},remove(){},toggle(){},contains(){return false}},setAttribute(){},removeAttribute(){},addEventListener(){},scrollIntoView(){},
 querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},parentNode:{open:true}});
 return nodes.get(id);}
const host={document:{getElementById:element,querySelector:()=>element("q"),querySelectorAll:()=>[],
 body:element("body"),documentElement:element("html"),activeElement:null,addEventListener(){}},
 window:{scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>{if(denyWrites)throw Error("save interrupted");storage.set(k,v)}},
 requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},Date,Math,Map,Set,JSON,console};
vm.createContext(host);const boot=source.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(source.slice(0,boot)+
 "globalThis.G={fresh,load,state:()=>S,day:v28TeamPrioritiesDay,choose:v28ChoosePriority,render:renderV28TeamPriorities,pair:v28WorkPrioritiesPair,ensure:ensureTeamPriorities};})();",host,{timeout:15000});
const G=host.G,check=(title,fn)=>{fn();console.log("PASS v28B "+title)};
function fresh(){storage.clear();denyWrites=false;G.fresh();const s=G.state();s.ui.founderIntro="done";s.ambitions.offer=null;return s;}
function setup(){const s=fresh(),a=s.team[0],b=s.team[1];s.day=28;
 a.career.stress=73;a.career.satisfaction=46;b.career.stress=32;b.career.satisfaction=61;
 s.deals[0].w=a.id;a.t="d"+s.deals[0].id;s.deals[0].dl=5;
 s.deals[1].w=b.id;b.t="d"+s.deals[1].id;s.deals[1].dl=8;
 G.day();return s;}
const balance=s=>assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.09);
check("new founder sees no imaginary conflict or employee argument",()=>{
 const s=fresh(),old=JSON.stringify(s);G.render();
 assert.equal(s.teamPriorities.pending,null);assert.equal(element("boss-v28-friction").hidden,true);
 assert.equal(JSON.stringify(s),old);balance(s);
});
check("real two-customer commitments and measured stress yield one named priority dilemma on Day28",()=>{
 const s=setup(),x=s.teamPriorities.pending;
 assert.ok(x);assert.equal(x.employeeId,s.team[0].id);assert.equal(x.peerId,s.team[1].id);
 assert.equal(x.firstClient,s.deals[0].cl);assert.equal(x.secondClient,s.deals[1].cl);
 const old=JSON.stringify(s),cash=s.cash;G.render();
 const card=element("boss-v28-friction").innerHTML;
 assert.equal(element("boss-v28-friction").hidden,false);
 assert.ok(card.includes(s.team[0].n)&&card.includes(s.team[1].n));
 assert.ok(card.includes(s.deals[0].cl)&&card.includes(s.deals[1].cl));
 assert.ok(card.includes('data-v28-resolution="align"')&&card.includes('data-v28-resolution="recovery"')&&card.includes('data-v28-resolution="delivery"'));
 assert.equal(JSON.stringify(s),old);assert.equal(s.cash,cash);balance(s);
});
check("align priorities gives modest bounded real relief, no phantom cash or project mutation",()=>{
 const s=setup(),id=s.teamPriorities.pending.id,a=s.team[0],b=s.team[1],cash=s.cash,deals=JSON.stringify(s.deals);
 assert.equal(G.choose(id,"align"),true);
 assert.equal(a.career.stress,69);assert.equal(b.career.stress,28);
 assert.equal(a.career.satisfaction,48);assert.equal(b.career.satisfaction,63);
 assert.equal(s.teamPriorities.pending,null);assert.equal(s.teamPriorities.history.at(-1).decision,"align");
 assert.equal(G.choose(id,"align"),false);assert.equal(s.cash,cash);
 assert.equal(JSON.stringify(s.deals),deals);balance(s);
});
check("protect recovery pauses actual person delivery for three days without creating or hiring staff",()=>{
 const s=setup(),a=s.team[0],id=s.teamPriorities.pending.id,cash=s.cash,before=JSON.stringify(s.deals);
 assert.equal(G.choose(id,"recovery"),true);
 assert.equal(a.career.recoveryDays,3);assert.equal(a.career.stress,65);
 assert.equal(a.career.satisfaction,51);
 assert.equal(JSON.stringify(s.deals),before);assert.equal(s.cash,cash);balance(s);
});
check("prioritize delivery has a transparent measured wellbeing cost",()=>{
 const s=setup(),a=s.team[0],id=s.teamPriorities.pending.id,cash=s.cash;
 assert.equal(G.choose(id,"delivery"),true);
 assert.equal(a.career.stress,75);assert.equal(a.career.satisfaction,43);
 assert.equal(s.teamPriorities.history.at(-1).decision,"delivery");assert.equal(s.cash,cash);balance(s);
});
check("authorized active HR officer resolves routine tension autonomously and logs authority",()=>{
 const s=fresh(),a=s.team[0],b=s.team[1],hr=s.team[2];
 s.day=28;a.career.stress=75;b.career.stress=35;
 s.deals[0].w=a.id;a.t="d"+s.deals[0].id;s.deals[0].dl=4;
 s.deals[1].w=b.id;b.t="d"+s.deals[1].id;s.deals[1].dl=7;
 s.exec.officers.hr.id=hr.id;s.exec.officers.hr.mandate=true;s.exec.officers.hr.authoritySince=0;
 const cash=s.cash;
 G.day();
 assert.equal(s.teamPriorities.pending,null,"authorized HR leaves no CEO decision");
 assert.equal(s.teamPriorities.history.at(-1).decision,"officer");
 assert.ok(s.teamPriorities.history.at(-1).actor.includes(hr.n));
 assert.equal(a.career.stress,69);assert.equal(b.career.stress,29);
 assert.equal(s.exec.officers.hr.history[0].action,"priority-mediation");
 assert.equal(s.cash,cash);balance(s);
});
check("without HR mandate the same real issue escalates to CEO",()=>{
 const s=fresh(),a=s.team[0],b=s.team[1],hr=s.team[2];
 s.day=28;a.career.stress=76;s.deals[0].w=a.id;s.deals[0].dl=4;s.deals[1].w=b.id;s.deals[1].dl=8;
 s.exec.officers.hr.id=hr.id;s.exec.officers.hr.mandate=false;s.exec.officers.hr.authoritySince=0;
 G.day();assert.ok(s.teamPriorities.pending);assert.equal(s.teamPriorities.history.length,0);
});
check("fake scenario is not offered without two live assigned jobs and meaningful measured strain",()=>{
 const s=fresh();s.day=28;s.team[0].career.stress=93;G.day();
 assert.equal(s.teamPriorities.pending,null);
 s.day=42;s.deals[0].w=s.team[0].id;s.deals[1].w=s.team[1].id;
 s.team[0].career.stress=35;s.deals[0].dl=4;s.deals[1].dl=5;
 G.day();assert.equal(s.teamPriorities.pending,null);
});
check("reassignment invalidates stale request and cooldown prevents duplicate dramatization",()=>{
 const s=setup(),pending=s.teamPriorities.pending;
 s.deals[0].w=null;s.day=29;G.day();
 assert.equal(s.teamPriorities.pending,null);
 assert.equal(s.teamPriorities.history.at(-1).decision,"withdrawn");
 s.deals[0].w=s.team[0].id;s.day=42;G.day();
 assert.equal(s.teamPriorities.pending,null);
});
check("storage failure rolls back employee stress and the actual proposal",()=>{
 const s=setup(),id=s.teamPriorities.pending.id,copy=JSON.stringify(s);
 denyWrites=true;assert.equal(G.choose(id,"recovery"),false);denyWrites=false;
 assert.equal(JSON.stringify(G.state()),copy);balance(G.state());
});
check("historical saved game safely initializes empty bounded optional priorities",()=>{
 const s=fresh();s.day=955;delete s.teamPriorities;
 const old=G.load(JSON.stringify(s));assert.equal(old.day,955);
 assert.equal(old.teamPriorities.pending,null);assert.equal(old.teamPriorities.history.length,0);
});
console.log("v28B real-team priorities and delegated HR verification complete.");
