// v27D: daily pacing & authentic one-day outcome evidence, no extra economic ticks.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const src=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(src,{filename:"v27d-daily-pace.js"});
for(const id of ["boss-v27-day","boss-v27-day-prompt","boss-v27-day-facts","boss-v27-day-phase",
 "boss-v27-day-remaining","boss-v27-day-progress","boss-v27-day-summary","boss-v27-day-work","boss-v27-day-team"])
 assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,id+" exists once");
assert.ok(src.includes('setInterval(updateV27DayClock,1000)')&&src.includes('clock=setTimeout(()=>{v27AdvanceAndReport();schedule();},BOSS_DAY_MS/spd)'));
const nodes=new Map(),storage=new Map(),timeouts=[];
function el(id){
 if(!nodes.has(id)){
  const classes=new Set();nodes.set(id,{id,innerHTML:"",textContent:"",hidden:false,open:false,checked:false,disabled:false,value:"",dataset:{},style:{},
   classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle(x,b){b?classes.add(x):classes.delete(x)}},
   addEventListener(){},setAttribute(){},removeAttribute(){},querySelector(){return null},querySelectorAll(){return []},
   getContext(){return new Proxy({},{get:()=>()=>{}})},parentNode:{open:true}});
 }
 return nodes.get(id);
}
const env={document:{getElementById:el,querySelector:()=>el("q"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},
 window:{scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},
 setTimeout:(f,delay)=>{timeouts.push(delay);return timeouts.length},clearTimeout(){},
 requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),console,Date,Math,Map,Set,JSON
};
vm.createContext(env);const boot=src.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(src.slice(0,boot)+
 "globalThis.G={fresh,load,state:()=>S,today:v27TodayData,render:renderV27DailyBrief,clock:updateV27DayClock,"+
 "advance:v27AdvanceAndReport,gameAdvanceDays,schedule,report:()=>v27LastDayReport,setTick:fn=>tick=fn,"+
 "setPaused:x=>paused=x,setSpeed:x=>spd=x,deadline:()=>v27DayDueAt};})();",env,{timeout:12000});
const G=env.G,test=(name,fn)=>{fn();console.log("PASS v27D "+name)};
test("brand-new founder sees no premature clock or fantasy task",()=>{
 G.fresh();const s=G.state(),before=JSON.stringify(s);G.render();
 assert.equal(el("boss-v27-day").hidden,true);assert.equal(JSON.stringify(s),before);
 assert.equal(s.day,0);assert.equal(s.cash,90);
});
test("real unassigned customer is named and no company money changes on rendering",()=>{
 G.fresh();const s=G.state();s.ui.founderIntro="done";const before=JSON.stringify(s);
 G.render();const text=el("boss-v27-day-prompt").textContent;
 assert.equal(el("boss-v27-day").hidden,false);
 assert.ok(text.includes(s.deals[0].cl),text);
 assert.ok(el("boss-v27-day-facts").innerHTML.includes("awaiting colleague"));
 assert.equal(JSON.stringify(s),before);
});
test("assigned work and overburdened colleagues are derived from actual current records",()=>{
 G.fresh();const s=G.state();s.ui.founderIntro="done";
 const assigned=s.deals[0];assigned.w=s.team[0].id;s.team[0].t="d"+assigned.id;
 G.render();assert.ok(el("boss-v27-day-prompt").textContent.includes(s.deals[1].cl));
 s.deals[1].w=s.team[1].id;s.team[1].t="d"+s.deals[1].id;
 G.render();assert.ok(el("boss-v27-day-prompt").textContent.includes(s.team[0].n));
 s.team[2].career.stress=85;G.render();
 assert.ok(el("boss-v27-day-facts").innerHTML.includes("1 needing workload attention"));
});
test("paused game day shows stopped time, not fake calendar progress",()=>{
 G.fresh();const s=G.state();s.ui.founderIntro="done";G.setPaused(true);
 G.schedule();G.render();
 assert.equal(G.deadline(),null);
 assert.ok(el("boss-v27-day-phase").textContent.includes("paused"));
 assert.ok(el("boss-v27-day-remaining").textContent.includes("stopped"));
});
test("the clock preserves the approved 30/10/3.75 second single tick",()=>{
 G.fresh();G.state().ui.founderIntro="done";
 for(const [speed,ms] of [[1,30000],[3,10000],[8,3750]]){
  G.setSpeed(speed);G.setPaused(false);timeouts.length=0;G.schedule();
  assert.equal(timeouts.at(-1),ms);
  assert.ok(G.deadline()>=Date.now()+ms-2000);
  assert.ok(el("boss-v27-day-remaining").textContent.includes("s until next"));
 }
});
test("one actual tick result generates one transparent day-end report, not a fabricated salary",()=>{
 G.fresh();const s=G.state();s.ui.founderIntro="done";
 G.setTick(()=>{s.day+=1;s.cash=83.5;s.market.completed=1;s.rep=3;});
 const old=JSON.stringify(s);
 G.advance();
 assert.equal(s.day,1);assert.equal(s.cash,83.5);
 assert.equal(G.report().cash,-6.5);assert.equal(G.report().completed,1);
 assert.equal(G.report().reputation,3);
 assert.ok(el("boss-v27-day-summary").innerHTML.includes("Day 1 finished"));
 assert.ok(el("boss-v27-day-summary").innerHTML.includes("6.5"));
 assert.ok(el("boss-v27-day-summary").innerHTML.includes("1 real customer"));
 assert.equal(JSON.stringify(s),JSON.stringify({...JSON.parse(old),day:1,cash:83.5,rep:3,market:{...JSON.parse(old).market,completed:1}}));
});
test("manual Finish day advances once, while advanced seven-day helper is retained",()=>{
 G.fresh();const s=G.state();s.ui.founderIntro="done";G.setPaused(true);
 G.setTick(()=>{s.day+=1;s.cash-=4;});
 G.gameAdvanceDays(1);assert.equal(s.day,1);assert.equal(G.report().cash,-4);
 G.gameAdvanceDays();assert.equal(s.day,8);
 assert.equal(G.report().day,8);assert.equal(G.report().cash,-4);
});
test("historical mature company gets real day brief without save migration",()=>{
 G.fresh();const s=G.state();s.day=923;s.market.completed=48;s.ui.founderIntro="done";
 const saved=JSON.stringify(s),loaded=G.load(saved);assert.equal(loaded.day,923);
 const before=JSON.stringify(loaded);G.render();
 assert.equal(JSON.stringify(loaded),before);assert.equal(G.report().day,8); // ephemeral recap belongs to previous test, never written into save
 assert.ok(el("boss-v27-day-facts").innerHTML.includes("actual staff"));
});
console.log("v27D day rhythm regression completed.");
