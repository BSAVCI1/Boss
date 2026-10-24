// v27B — authentic real-employee conversations on CEO Today; no phantom payroll or story rewards.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),js=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(js,{filename:"v27b-people.js"});
assert.equal((html.match(/id="boss-v27-person"/g)||[]).length,1);
const store=new Map(),nodes=new Map();let fail=false;
function el(id){if(!nodes.has(id))nodes.set(id,{id,innerHTML:"",textContent:"",value:"",hidden:false,checked:false,open:false,disabled:false,style:{},dataset:{},
 events:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},
 addEventListener(name,fn){this.events[name]=fn},setAttribute(){},removeAttribute(){},
 querySelector(){return null},querySelectorAll(){return []},scrollIntoView(){},
 getContext(){return new Proxy({},{get:()=>()=>{}})},parentNode:{open:true}});
 return nodes.get(id);}
const env={document:{getElementById:el,querySelector:()=>el("q"),querySelectorAll:()=>[],
 body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},
 window:{scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>{if(fail)throw Error("storage disabled");store.set(k,v)}},
 setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),
 Date,Math,Map,Set,JSON,console};
vm.createContext(env);const boot=js.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(js.slice(0,boot)+"globalThis.G={fresh,load,save,state:()=>S,ensurePeopleStories,peopleStoryDay,peopleStoryChoose,renderV27PeopleRoom,capitalFacts};})();",env,{timeout:12000});
const G=env.G,test=(name,fn)=>{fn();console.log("PASS v27B "+name)},fresh=()=>{fail=false;store.clear();G.fresh();G.state().ui.founderIntro="done";return G.state();};
const balance=s=>assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.09);
test("no fictional colleague card on day zero or old save without any earned story",()=>{
 const s=fresh(),before=JSON.stringify(s);G.renderV27PeopleRoom();
 assert.equal(el("boss-v27-person").hidden,true);
 assert.equal(JSON.stringify(s),before);
 delete s.peopleStories;G.ensurePeopleStories(s);G.renderV27PeopleRoom();
 assert.equal(el("boss-v27-person").hidden,true);balance(s);
});
test("unfinished founder intro cannot show an unrelated meeting",()=>{
 const s=fresh();s.day=14;s.team[0].career.stress=85;G.peopleStoryDay();
 s.ui.founderIntro="assign";G.renderV27PeopleRoom();
 assert.equal(el("boss-v27-person").hidden,true);
});
test("Day14 real workload opens visible named conversation with exact canonical evidence",()=>{
 const s=fresh();s.day=14;s.team[0].career.stress=85;const cash=s.cash;
 G.peopleStoryDay();assert.equal(s.peopleStories.items.length,1);
 const event=s.peopleStories.items[0],before=JSON.stringify(s);
 G.renderV27PeopleRoom();const h=el("boss-v27-person").innerHTML;
 assert.equal(el("boss-v27-person").hidden,false);
 assert.equal(event.kind,"strain");assert.ok(h.includes(s.team[0].n));
 assert.ok(h.includes(event.context));
 assert.ok(h.includes('data-v27-people-id="'+event.id+'"'));
 assert.ok(h.includes('data-v27-people-choice="acknowledge"'));
 assert.ok(h.includes('data-v27-people-choice="support"'));
 assert.equal(JSON.stringify(s),before,"rendering may not spend cash or change the person");
 assert.equal(s.cash,cash);balance(s);
});
test("acknowledge is free and resolves a single event through existing real-person authority",()=>{
 const s=fresh();s.day=14;s.team[0].career.stress=81;G.peopleStoryDay();
 const story=s.peopleStories.items[0],id=story.id,priorCash=s.cash,oldStress=s.team[0].career.stress;
 assert.equal(G.peopleStoryChoose(id,"acknowledge"),true);
 assert.equal(story.status,"acknowledged");assert.equal(story.cost,0);
 assert.equal(s.cash,priorCash);assert.ok(s.team[0].career.stress<oldStress);
 assert.equal(G.peopleStoryChoose(id,"acknowledge"),false);
 G.renderV27PeopleRoom();
 assert.ok(el("boss-v27-person").innerHTML.includes("Recognized"));
 assert.ok(el("boss-v27-person").innerHTML.includes("Cash cost:"));
 balance(s);
});
test("supported employee shows actual paid recovery, exact single ledger booking",()=>{
 const s=fresh();s.cash+=3000;s.bi.openingCash+=3000;
 s.day=14;s.team[0].career.stress=90;G.peopleStoryDay();
 const story=s.peopleStories.items[0],before=s.cash,out=s.bi.totals.cashOut;
 G.renderV27PeopleRoom();assert.ok(!el("boss-v27-person").innerHTML.includes('data-v27-people-choice="support" disabled'));
 assert.equal(G.peopleStoryChoose(story.id,"support"),true);
 assert.equal(story.status,"supported");
 assert.equal(s.cash,before-6);assert.equal(s.bi.totals.cashOut,out+6);
 assert.equal(s.team[0].career.stress,68);
 G.renderV27PeopleRoom();
 const h=el("boss-v27-person").innerHTML;
 assert.ok(h.includes("Support delivered"));assert.ok(h.includes("Cash cost:"));
 assert.ok(h.includes("68/100"));
 assert.equal(G.peopleStoryChoose(story.id,"support"),false,"no second charge");
 balance(s);
});
test("unaffordable recovery is disabled but free recognition remains available",()=>{
 const s=fresh();s.day=14;s.team[0].career.stress=82;G.peopleStoryDay();
 G.renderV27PeopleRoom();const h=el("boss-v27-person").innerHTML;
 assert.ok(h.includes("insufficient available cash"));
 assert.equal(G.peopleStoryChoose(s.peopleStories.items[0].id,"support"),false);
 assert.equal(s.peopleStories.items[0].status,"open");balance(s);
});
test("mentoring and customer outcome types use genuine evidence, not paid strain action",()=>{
 for(const kind of ["mentor","client"]){
  const s=fresh();s.day=14;
  if(kind==="mentor")s.team[1].career.practice.coaching=7;
  else {s.team[1].perf.completed=2;s.team[1].perf.onTime=2;}
  G.peopleStoryDay();const story=s.peopleStories.items[0];assert.equal(story.kind,kind);
  G.renderV27PeopleRoom();const h=el("boss-v27-person").innerHTML;
  assert.ok(h.includes(s.team[1].n));
  assert.ok(!h.includes('data-v27-people-choice="support"'));
  assert.equal(G.peopleStoryChoose(story.id,"support"),false);
  assert.equal(G.peopleStoryChoose(story.id,"acknowledge"),true);
  balance(s);
 }
});
test("settled personal consequence disappears after seven game days but remains saved",()=>{
 const s=fresh();s.day=14;s.team[0].career.stress=86;G.peopleStoryDay();
 assert.equal(G.peopleStoryChoose(s.peopleStories.items[0].id,"acknowledge"),true);
 s.day=22;G.renderV27PeopleRoom();
 assert.equal(el("boss-v27-person").hidden,true);
 assert.equal(s.peopleStories.items[0].status,"acknowledged");
});
test("storage failure restores employee, event status and finance without a ghost success",()=>{
 const s=fresh();s.cash+=3000;s.bi.openingCash+=3000;
 s.day=14;s.team[0].career.stress=90;G.peopleStoryDay();
 const before=JSON.stringify(s),id=s.peopleStories.items[0].id;
 fail=true;assert.equal(G.peopleStoryChoose(id,"support"),false);
 fail=false;assert.equal(JSON.stringify(G.state()),before);balance(G.state());
});
console.log("v27B human-story tests complete.");
