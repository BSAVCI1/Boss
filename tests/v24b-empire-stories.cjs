// v24B — direct execution of real offline Boss engine, earned stories, financed CEO decisions.
"use strict";const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(code,{filename:"boss-v24b-empire-stories.js"});
for(const id of ["empire-panel","empire-world","people-stories-panel","people-stories","people-story-today"])
 assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,id);
const store=new Map(),els=new Map();let fail=false;
function el(id){if(!els.has(id))els.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,open:false,hidden:false,disabled:false,
 style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},events:{},
 addEventListener(name,fn){this.events[name]=fn},querySelector(){return null},querySelectorAll(){return []},
 getContext(){return new Proxy({},{get:()=>()=>{}})},setAttribute(){},removeAttribute(){},
 scrollIntoView(){},focus(){},parentNode:{open:true}});
 return els.get(id);}
const env={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],
 body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},
 window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>{if(fail)throw Error("storage blocked");store.set(k,v)},removeItem:k=>store.delete(k)},
 setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),
 Date,Math,JSON,Set,Map,console};
vm.createContext(env);const boot=code.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(code.slice(0,boot)+
 "globalThis.G={fresh,load,save,state:()=>S,empireAssets,empireRender,empireDetails,"+
 "ensurePeopleStories,peopleStoryDay,peopleStoryChoose,peopleStoryEvidence,peopleStoriesRender,capitalFacts,"+
 "ensureProperties,canonicalReporting,selected:(key)=>{empirePick=key;empireSignature='';empireRender()}};})();",env,{timeout:12000});
const G=env.G;function fresh(){fail=false;store.clear();G.fresh();return G.state();}
function test(name,fn){fn();console.log("PASS v24B "+name);}
function cashOK(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.09,"cash ledger must reconcile");}
function fund(s,amount){s.cash+=amount;s.bi.openingCash+=amount;}
test("Founder has truthful empire, 0 phantom owned sites, zero story spam and read-only views",()=>{
 const s=fresh(),before=JSON.stringify(s);G.empireRender();G.peopleStoriesRender();
 assert.equal(G.empireAssets().length,1);
 assert.ok(el("empire-world").innerHTML.includes("Corporate workplace"));
 assert.ok(el("empire-world").innerHTML.includes("0 recorded active/inactive properties"));
 assert.ok(!el("empire-world").innerHTML.includes("Acquired competitor asset"));
 assert.ok(el("people-stories").innerHTML.includes("No unresolved"));
 assert.equal(JSON.stringify(s),before);cashOK(s);
});
test("World differentiates active and inactive properties, managed unit, acquired competitor and financial lot",()=>{
 const s=fresh(),u={key:"marketing",managerId:s.team[0].id,staffIds:[s.team[0].id,s.team[1].id],delivered:3,revenue:250,plan:{},reviews:[]};
 s.exec.lines.push({key:"marketing",spent:120,since:s.day});s.exec.units.push(u);
 s.exec.property.sites.push({id:512,type:"office",location:"central",status:"active",unitKey:null,since:s.day,
  dayCost:3.9,boost:1.06,investment:220,book:190,arrears:0});
 s.exec.property.sites.push({id:513,type:"building",location:"park",status:"inactive",unitKey:null,since:s.day,
  dayCost:1.2,boost:1.06,investment:1800,book:1700,arrears:0});
 s.acquisitions.owned.push({id:"harbor",name:"Harbor & Co.",sector:"hospitality",day:0,lastDay:0,price:600,risk:15,
  health:77,daily:1.5,payable:3,paidIntegration:4,integrationCost:4});
 s.capital.lots.push({id:100,kind:"reserve",day:0,lastDay:0,basis:120,value:125});
 const assets=G.empireAssets();
 assert.equal(assets.length,6);
 assert.equal(new Set(assets.map(a=>a.key)).size,assets.length);
 const before=JSON.stringify(s);G.selected("property:513");
 assert.ok(el("empire-world").innerHTML.includes("Not active; staff work elsewhere"));
 G.selected("unit:marketing");assert.ok(el("empire-world").innerHTML.includes("GM "+s.team[0].n));
 G.selected("acquired:harbor");assert.ok(el("empire-world").innerHTML.includes("No employee headcount"));
 G.selected("capital:100");assert.ok(el("empire-world").innerHTML.includes("Mark changes are not liquid cash"));
 assert.equal(JSON.stringify(s),before);cashOK(s);
});
test("Real employee strain opens one bounded story at Day14 and never changes stats on render",()=>{
 const s=fresh();s.day=14;s.team[0].career.stress=83;const before=JSON.stringify(s);
 G.peopleStoriesRender();assert.equal(JSON.stringify(s),before);
 G.peopleStoryDay();assert.equal(s.peopleStories.items.length,1);
 const story=s.peopleStories.items[0];assert.equal(story.kind,"strain");assert.equal(story.personId,s.team[0].id);
 G.peopleStoryDay();assert.equal(s.peopleStories.items.length,1);
 s.day=28;G.peopleStoryDay();assert.equal(s.peopleStories.items.length,1,"pending CEO decision prevents spam");
 G.peopleStoriesRender();assert.ok(el("people-stories").innerHTML.includes(s.team[0].n));
 cashOK(s);
});
test("CEO acknowledges real strain for free, no skill or career jump, saved exactly once",()=>{
 const s=fresh();s.day=14;s.team[0].career.stress=81;G.peopleStoryDay();
 const id=s.peopleStories.items[0].id,before=s.cash,rank=s.team[0].career.rank,exp=s.team[0].career.xp;
 assert.equal(G.peopleStoryChoose(id,"acknowledge"),true);
 assert.equal(G.peopleStoryChoose(id,"acknowledge"),false);
 assert.equal(s.peopleStories.items[0].status,"acknowledged");
 assert.equal(s.cash,before);assert.equal(s.team[0].career.rank,rank);assert.equal(s.team[0].career.xp,exp);
 assert.ok(s.team[0].career.stress<81);cashOK(s);
});
test("Paid CEO recovery uses only surplus, ledger posts once, improves real stress",()=>{
 const s=fresh();fund(s,3000);s.day=14;s.team[0].career.stress=88;G.peopleStoryDay();
 const id=s.peopleStories.items[0].id,cash=s.cash,cost=s.bi.totals.costs,mood=s.team[0].mood;
 assert.equal(G.peopleStoryChoose(id,"support"),true);
 assert.equal(s.cash,cash-6);assert.equal(s.bi.totals.costs,cost+6);
 assert.equal(s.bi.totals.cashOut,6);assert.ok(s.team[0].mood>mood);
 assert.equal(s.team[0].career.stress,66);
 assert.equal(G.peopleStoryChoose(id,"support"),false);
 assert.equal(s.peopleStories.items[0].cost,6);cashOK(s);
});
test("Founder without 30-day reserve cannot authorize a paid story, or another type's support",()=>{
 const s=fresh();s.day=14;s.team[0].career.stress=80;G.peopleStoryDay();
 const id=s.peopleStories.items[0].id,cash=s.cash;
 assert.equal(G.peopleStoryChoose(id,"support"),false);assert.equal(s.cash,cash);
 assert.equal(s.peopleStories.items[0].status,"open");cashOK(s);
});
test("Actual coaching and completed on-time customer work become separate earned stories only",()=>{
 const s=fresh();s.team[1].career.practice.coaching=9;s.team[2].perf.completed=3;s.team[2].perf.onTime=2;
 s.day=14;G.peopleStoryDay();assert.equal(s.peopleStories.items[0].kind,"mentor");
 assert.equal(G.peopleStoryChoose(s.peopleStories.items[0].id,"acknowledge"),true);
 s.day=28;G.peopleStoryDay();assert.equal(s.peopleStories.items.at(-1).kind,"client");
 assert.equal(G.peopleStoryChoose(s.peopleStories.items.at(-1).id,"support"),false);
 assert.equal(s.peopleStories.items.length,2);
});
test("Failed persistent write cannot charge cash or resolve a story, legacy saves gain empty journal",()=>{
 const s=fresh();delete s.peopleStories;G.ensurePeopleStories(s);assert.equal(s.peopleStories.items.length,0);
 fund(s,4000);s.day=14;s.team[0].career.stress=90;G.peopleStoryDay();
 const snapshot=JSON.stringify(s),id=s.peopleStories.items[0].id;
 fail=true;assert.equal(G.peopleStoryChoose(id,"support"),false);fail=false;
 assert.equal(JSON.stringify(G.state()),snapshot);cashOK(G.state());
 assert.equal(G.save(),true);
 const loaded=G.load(JSON.stringify(G.state()));assert.equal(loaded.peopleStories.items[0].id,id);
 assert.equal(loaded.peopleStories.items[0].status,"open");
});
