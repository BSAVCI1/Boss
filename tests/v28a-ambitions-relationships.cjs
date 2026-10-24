// v28A — real two-employee ambition and mentorship engine tests.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),src=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(src,{filename:"boss-v28a.js"});
assert.equal((html.match(/id="boss-v28-ambition"/g)||[]).length,1);
const nodes=new Map(),store=new Map();let fail=false;
function el(id){if(!nodes.has(id))nodes.set(id,{id,innerHTML:"",textContent:"",value:"",hidden:false,disabled:false,checked:false,open:false,style:{},dataset:{},
 classList:{add(){},remove(){},toggle(){},contains(){return false}},
 setAttribute(){},removeAttribute(){},addEventListener(){},scrollIntoView(){},querySelector(){return null},querySelectorAll(){return []},
 getContext(){return new Proxy({},{get:()=>()=>{}})},parentNode:{open:true}});
 return nodes.get(id);
}
const env={document:{getElementById:el,querySelector:()=>el("q"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},
 window:{scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>{if(fail)throw Error("local save unavailable");store.set(k,v)}},
 requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},Date,Math,Map,Set,JSON,console};
vm.createContext(env);
const boot=src.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(src.slice(0,boot)+
 "globalThis.G={fresh,load,save,state:()=>S,ensureAmbitions,day:v28AmbitionDay,choose:v28AmbitionChoose,render:renderV28Ambition,pair:v28MentorPair};})();",env,{timeout:12000});
const G=env.G;
function check(name,fn){fn();console.log("PASS v28A "+name);}
function fresh(){fail=false;store.clear();G.fresh();G.state().ui.founderIntro="done";return G.state();}
function prepare(){
 const s=fresh(),learner=s.team[0],mentor=s.team[1],third=s.team[2];
 learner.career.goal="growth";learner.career.satisfaction=42;learner.s.sales=1.1;
 mentor.career.satisfaction=88;mentor.s.sales=2.4;
 third.career.satisfaction=90;third.s.sales=1.02;
 s.day=14;G.day();assert.equal(s.ambitions.offer?.menteeId,learner.id);
 assert.equal(s.ambitions.offer?.mentorId,mentor.id);
 return s;
}
function balanced(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.09,"no phantom money");}
check("new Founder has no fake colleague promise or new assets",()=>{
 const s=fresh(),before=JSON.stringify(s);
 assert.equal(s.day,0);assert.equal(s.ambitions.offer,null);
 assert.equal(s.ambitions.relations.length,0);
 G.render();assert.equal(el("boss-v28-ambition").hidden,true);
 assert.equal(JSON.stringify(s),before);balanced(s);
});
check("earned Day14 ambition depends on actual staff, career goal and demonstrated skill gap",()=>{
 const s=prepare(),offer=s.ambitions.offer,before=JSON.stringify(s);
 assert.equal(offer.day,14);assert.equal(offer.skill,"sales");
 assert.equal(offer.goal,"growth");assert.equal(offer.satisfaction,42);
 G.render();const h=el("boss-v28-ambition").innerHTML;
 assert.equal(el("boss-v28-ambition").hidden,false);
 assert.ok(h.includes(s.team[0].n)&&h.includes(s.team[1].n));
 assert.ok(h.includes('data-v28-action="mentor"'));
 assert.ok(h.includes('data-v28-action="recognize"'));
 assert.ok(h.includes('data-v28-action="defer"'));
 assert.equal(JSON.stringify(s),before,"render not mutate company or cash");
 balanced(s);
});
check("recognition is real bounded morale/satisfaction without purchased training or cash",()=>{
 const s=prepare(),id=s.ambitions.offer.id,learner=s.team[0],cash=s.cash;
 const before=learner.career.satisfaction,mood=learner.mood;
 assert.equal(G.choose(id,"recognize"),true);
 assert.equal(s.ambitions.offer,null);
 assert.equal(learner.career.satisfaction,before+4);
 assert.equal(learner.mood,mood+3);assert.equal(s.cash,cash);
 assert.equal(s.ambitions.history.at(-1).action,"recognize");
 assert.equal(G.choose(id,"recognize"),false);
 balanced(s);
});
check("defer is a genuine consequence-free decision with anti-spam cooldown",()=>{
 const s=prepare(),id=s.ambitions.offer.id,cash=s.cash,skill=s.team[0].s.sales;
 assert.equal(G.choose(id,"defer"),true);
 assert.equal(s.ambitions.relations.length,0);assert.equal(s.cash,cash);assert.equal(s.team[0].s.sales,skill);
 s.day=28;G.day();assert.equal(s.ambitions.offer,null,"no every-two-week spam");
 balanced(s);
});
check("mentorship starts without instant skill, XP, or wage change; real two-people pair",()=>{
 const s=prepare(),id=s.ambitions.offer.id,skill=s.team[0].s.sales,cash=s.cash;
 assert.equal(G.choose(id,"mentor"),true);
 assert.equal(s.ambitions.offer,null);
 const r=s.ambitions.relations[0];assert.equal(r.status,"active");assert.equal(r.days,0);
 assert.equal(r.menteeId,s.team[0].id);assert.equal(r.mentorId,s.team[1].id);
 assert.equal(s.team[0].s.sales,skill);assert.equal(s.cash,cash);
 G.render();assert.ok(el("boss-v28-ambition").innerHTML.includes("0/7 actual"));
 balanced(s);
});
check("busy customer assignment pauses mentorship: no fake learning days",()=>{
 const s=prepare(),id=s.ambitions.offer.id;assert.equal(G.choose(id,"mentor"),true);
 const r=s.ambitions.relations[0],skill=s.team[0].s.sales;
 s.team[0].t="d"+s.deals[0].id;s.day=15;G.day();
 assert.equal(r.days,0);assert.equal(s.team[0].s.sales,skill);
 s.team[0].t="idle";s.team[1].t="study";s.day=16;G.day();
 assert.equal(r.days,0);
 s.team[1].t="idle";s.day=17;G.day();
 assert.equal(r.days,1);assert.ok(s.team[0].s.sales>skill);
 G.day();assert.equal(r.days,1,"same game day counted once only");
 balanced(s);
});
check("seven qualified days complete relationship with modest earned skill and career practice",()=>{
 const s=prepare(),id=s.ambitions.offer.id,cash=s.cash;
 assert.equal(G.choose(id,"mentor"),true);
 const r=s.ambitions.relations[0],start=s.team[0].s.sales,coachBefore=s.team[1].career.practice.coaching;
 for(let day=15;day<=21;day++){s.day=day;G.day();}
 assert.equal(r.status,"completed");assert.equal(r.days,7);assert.equal(r.endDay,21);
 assert.ok(s.team[0].s.sales>start&&s.team[0].s.sales<start+.32);
 assert.equal(s.team[0].career.practice.learning,7);
 assert.equal(s.team[1].career.practice.coaching,coachBefore+7);
 assert.equal(s.cash,cash);
 assert.equal(r.gained,+(s.team[0].s.sales-start).toFixed(4));
 G.render();assert.ok(el("boss-v28-ambition").innerHTML.includes("7/7 actual"));
 balanced(s);
});
check("mentor departed ends safely without inventing a replacement worker",()=>{
 const s=prepare();assert.equal(G.choose(s.ambitions.offer.id,"mentor"),true);
 const r=s.ambitions.relations[0];s.team=s.team.filter(p=>p.id!==r.mentorId);
 s.day=15;G.day();assert.equal(r.status,"interrupted");assert.equal(r.days,0);
 balanced(s);
});
check("unavailable employees cannot create a new offer or fake mentor",()=>{
 const s=fresh();s.team[0].career.satisfaction=99;s.team[1].career.satisfaction=99;s.team[2].career.satisfaction=99;
 s.day=14;G.day();assert.equal(s.ambitions.offer,null);
});
check("failed persistent write rolls back career and relational decision",()=>{
 const s=prepare(),id=s.ambitions.offer.id,snapshot=JSON.stringify(s);
 fail=true;assert.equal(G.choose(id,"mentor"),false);fail=false;
 assert.equal(JSON.stringify(G.state()),snapshot);
 balanced(G.state());
});
check("historical save is backward-compatible and has no forced onboarding",()=>{
 const s=fresh();s.day=953;delete s.ambitions;
 const old=JSON.stringify(s);const loaded=G.load(old);
 assert.equal(loaded.day,953);assert.equal(loaded.ambitions.offer,null);
 assert.equal(loaded.ambitions.relations.length,0);assert.equal(loaded.team.length,3);
});
console.log("v28A authentic person and mentorship tests complete.");
