// v27C: earned trophies are pure projections of authentic saved game state.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(code,{filename:"boss-v27c-achievements.js"});
for(const id of ["boss-v27-awards","boss-v27-award-grid","boss-v27-award-count","boss-v27-award-proof","boss-v27-award-next"])
 assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,id);
assert.ok(html.includes("boss-v27-wall"),"trophies alter the actual visible illustrated CEO workplace");
const nodes=new Map(),store=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{id,innerHTML:"",textContent:"",hidden:false,value:"",checked:false,open:false,style:{},dataset:{},
 classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},setAttribute(){},
 removeAttribute(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},
 parentNode:{open:true}});return nodes.get(id);}
const sandbox={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],
 body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},
 window:{scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
 requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},Date,Math,JSON,Set,Map,console};
vm.createContext(sandbox);const boot=code.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(code.slice(0,boot)+
 "globalThis.G={fresh,load,save,state:()=>S,project:v27EarnedAwards,wall:v27AwardWall,render:renderV27Awards,focus:x=>selectedV27Award=x};})();",sandbox,{timeout:12000});
const G=sandbox.G,fresh=()=>{store.clear();G.fresh();G.state().ui.founderIntro="done";return G.state();};
function test(label,fn){fn();console.log("PASS v27C "+label);}
function count(s){return G.project().filter(a=>a.earned).length;}
test("starter office shows only locked memories and no fabricated property",()=>{
 const s=fresh(),old=JSON.stringify(s);
 assert.equal(count(s),0);
 assert.equal(G.wall(),"");
 G.render();assert.equal(el("boss-v27-awards").hidden,false);
 assert.ok(el("boss-v27-award-count").textContent.includes("0 / 6"));
 assert.ok(el("boss-v27-award-grid").innerHTML.includes("🔒"));
 assert.equal(JSON.stringify(s),old,"purely visual render");
});
test("the first true customer completion puts one framed trophy on the CEO wall",()=>{
 const s=fresh();s.market.completed=1;const cash=s.cash;
 assert.equal(count(s),1);assert.ok(G.wall().includes("📜"));
 G.render();assert.ok(el("boss-v27-award-count").textContent.includes("1 / 6"));
 assert.equal(s.cash,cash);
});
test("three deliveries unlock a separate award; no cash or reputation is invented",()=>{
 const s=fresh();s.market.completed=3;const cash=s.cash,rep=s.rep;
 assert.equal(count(s),2);assert.ok(G.wall().includes("📜"));assert.ok(G.wall().includes("🏅"));
 G.render();assert.equal(s.cash,cash);assert.equal(s.rep,rep);
});
test("five actual employees give earned team award, three colleagues remain locked",()=>{
 const s=fresh();s.team.push({...s.team[0],id:s.pid++,n:"New colleague"});
 assert.equal(count(s),0);
 s.team.push({...s.team[1],id:s.pid++,n:"Fifth colleague"});
 assert.equal(count(s),1);assert.equal(G.project().find(x=>x.id==="team").earned,true);
});
test("an inactive and unit-tagged site cannot create corporate-office trophy",()=>{
 const s=fresh();s.exec.property.sites.push({id:432,status:"inactive",type:"office",unitKey:null});
 s.exec.property.sites.push({id:433,status:"active",type:"office",unitKey:"marketing"});
 assert.equal(G.project().find(x=>x.id==="site").earned,false);
 s.exec.property.sites.push({id:434,status:"active",type:"office",unitKey:null});
 assert.equal(G.project().find(x=>x.id==="site").earned,true);
});
test("service line and factory badges require canonical paid installations",()=>{
 const s=fresh();
 s.exec.lines.push({key:"marketing",spent:120,since:s.day});
 assert.equal(G.project().find(x=>x.id==="line").earned,true);
 assert.equal(G.project().find(x=>x.id==="plant").earned,false);
 s.factory.installed=true;s.factory.siteId=712;
 assert.equal(G.project().find(x=>x.id==="plant").earned,false,"inactive or missing factory site is not active production");
 s.exec.property.sites.push({id:712,status:"active",type:"office",unitKey:null});
 assert.equal(G.project().find(x=>x.id==="plant").earned,true);
 assert.ok(G.wall().includes("🏪"));assert.ok(G.wall().includes("🏭"));
});
test("achievement inspection never edits the employee roster or cash ledger",()=>{
 const s=fresh();s.market.completed=3;s.team.push({...s.team[0],id:s.pid++},{...s.team[0],id:s.pid++});
 const baseline=JSON.stringify(s);G.focus("trust");G.render();G.focus("site");G.render();G.focus("line");G.render();
 assert.equal(JSON.stringify(s),baseline);
 assert.ok(el("boss-v27-award-proof").textContent.includes("Locked"));
});
test("previous saved firms gain accurate derived badges, without any migration or forced new purchase",()=>{
 const s=fresh();s.day=932;s.market.completed=42;const raw=JSON.stringify(s);
 const old=G.load(raw);assert.equal(old.day,932);assert.equal(old.market.completed,42);
 assert.equal(G.project().filter(x=>x.earned).length,2);
 assert.equal(JSON.stringify(old),raw);
});
test("opening intro hides gallery and historical progress remains unchanged",()=>{
 const s=fresh();s.ui.founderIntro="choose";const old=JSON.stringify(s);
 G.render();assert.equal(el("boss-v27-awards").hidden,true);assert.equal(JSON.stringify(s),old);
});
console.log("v27C actual company milestone tests complete.");
