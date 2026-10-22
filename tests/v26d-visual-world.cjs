// v26D: read-only living world, never substitutes images for actual game assets.
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm");
const html=fs.readFileSync("index.html","utf8"),js=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(js,{filename:"boss-v26d.js"});
for(const id of ["boss-visual-empire","boss-world-facts","boss-world-filter","boss-world-visual","boss-world-tiles","boss-world-detail"]){
 assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,"unique "+id);
}
const nodes=new Map(),store=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{id,innerHTML:"",textContent:"",hidden:false,open:false,value:"",style:{},dataset:{},attributes:{},tagName:"DIV",
 classList:{add(){},remove(){},toggle(){}},setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]},
 addEventListener(){},querySelectorAll(){return []},querySelector(){return null},getContext(){return new Proxy({},{get:()=>()=>{}})},parentNode:{open:true}});
 return nodes.get(id)}
const environment={document:{getElementById:el,querySelector:()=>el("q"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),addEventListener(){}},
window:{scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Math,Date,Map,Set,JSON,console};
vm.createContext(environment);const boot=js.indexOf("S=load();if(!S)fresh();");assert.ok(boot>=0);
vm.runInContext(js.slice(0,boot)+"globalThis.G={fresh,state:()=>S,getVisualWorldState,renderVisualWorld,visualWorldBuilding};})();",environment,{timeout:10000});
const G=environment.G;function check(name,fn){fn();console.log("PASS v26D "+name)}
check("New Founder world is honest: no phantom buildings, businesses, factories or investments",()=>{
 G.fresh();const s=G.state(),before=JSON.stringify(s),w=G.getVisualWorldState();
 assert.equal(w.places.length,1);
 assert.equal(w.places[0].kind,"shared");assert.ok(w.places[0].note.includes("No office"));
 assert.equal(w.businesses.length,0);assert.equal(w.factories.length,0);
 assert.equal(w.sites.length,0);assert.equal(w.people.length,3);
 G.renderVisualWorld();assert.ok(el("boss-world-tiles").innerHTML.includes('data-world-asset="shared"'));
 assert.ok(el("boss-world-detail").innerHTML.includes("No office"));
 assert.equal(JSON.stringify(s),before,"world renderer cannot create or spend assets");
});
check("Business and factory tabs show truthful locked states",()=>{
 const s=G.state(),base=JSON.stringify(s);
 s.ui.visualWorldFilter="factory";G.renderVisualWorld();
 assert.ok(el("boss-world-tiles").innerHTML.includes("No physical machine"));
 s.ui.visualWorldFilter="businesses";G.renderVisualWorld();
 assert.ok(el("boss-world-tiles").innerHTML.includes("launch your first real service"));
 const expected=JSON.parse(base);delete expected.ui.visualWorldFilter;
 const actual=JSON.parse(JSON.stringify(s));delete actual.ui.visualWorldFilter;
 assert.equal(JSON.stringify(actual),JSON.stringify(expected));
});
check("Active corporate HQ and satellite appear, inactive properties stay invisible",()=>{
 const s=G.state();
 s.exec.property.sites.push({id:41,type:"hq",status:"active",unitKey:null});
 s.exec.property.sites.push({id:42,type:"satellite",status:"active",unitKey:"marketing"});
 s.exec.property.sites.push({id:43,type:"building",status:"sold",unitKey:null});
 const before=JSON.stringify(s),w=G.getVisualWorldState();
 assert.equal(w.sites.length,2);
 assert.equal(w.places.length,2);assert.ok(w.places.some(x=>x.kind==="hq"));
 assert.ok(w.places.some(x=>x.kind==="satellite"));
 assert.ok(!w.places.some(x=>x.id==="site-43"));assert.ok(!w.places.some(x=>x.kind==="shared"));
 s.ui.visualWorldFilter="places";G.renderVisualWorld();
 assert.ok(el("boss-world-tiles").innerHTML.includes('data-world-asset="site-41"'));
 assert.ok(!el("boss-world-tiles").innerHTML.includes("site-43"));
 assert.equal(s.cash,90);
});
check("Launched lines, paid toolkits and acquisitions generate visibly distinct actual game assets",()=>{
 const s=G.state();
 s.exec.lines.push({key:"marketing",since:s.day,delivered:5});
 s.exec.units.push({key:"marketing",since:s.day,staffIds:[s.team[0].id],managerId:s.team[0].id});
 s.economy.invested.operations=true;
 s.acquisitions.owned.push({id:"orbital",name:"Orbit Co",day:s.day});
 const before=JSON.stringify(s),w=G.getVisualWorldState();
 assert.equal(w.businesses.length,3);
 assert.ok(w.businesses.some(x=>x.id==="line-marketing"&&x.note.includes("5 delivered")));
 assert.ok(w.businesses.some(x=>x.id==="tool-operations"));
 assert.ok(w.businesses.some(x=>x.id==="acq-orbital"));
 assert.equal(JSON.stringify(s),before);
 s.ui.visualWorldFilter="businesses";G.renderVisualWorld();
 assert.ok(el("boss-world-tiles").innerHTML.includes("Marketing studio"));
 assert.ok(el("boss-world-tiles").innerHTML.includes("Orbit Co"));
});
check("Factory only appears when purchased; physical inventory and real worker are not invented",()=>{
 const s=G.state();s.ui.visualWorldFilter="factory";
 s.factory.installed=true;s.factory.siteId=41;s.factory.raw=7;s.factory.finished=3;s.factory.totalBuilt=5;s.factory.totalSold=2;
 const before=JSON.stringify(s),w=G.getVisualWorldState();
 assert.equal(w.factories.length,1);assert.ok(w.factories[0].note.includes("5 kits produced"));
 assert.ok(w.factories[0].subtitle.includes("Materials 7")&&w.factories[0].subtitle.includes("Finished 3"));
 G.renderVisualWorld();
 assert.ok(el("boss-world-tiles").innerHTML.includes("Your production line"));
 assert.ok(el("boss-world-detail").innerHTML.includes("No eligible active operator"));
 assert.equal(JSON.stringify(s),before);
});
check("Illustrations are pure bundled SVG with no remote images",()=>{
 for(const kind of ["shared","office","hq","factory","marketing","product","operations","technology","acquired","toolkit"]){
  const svg=G.visualWorldBuilding(kind,0);
  assert.ok(svg.startsWith("<svg")&&svg.includes("</svg>"));
  assert.ok(!svg.includes("<image")&&!svg.includes("href=")&&!svg.includes("src="),kind);
 }
 assert.ok(html.includes('data-world-go')&&html.includes("boss-world-tile"));
 assert.ok(!/<script[^>]*src\s*=/.test(html),"single file retained");
});
console.log("v26D evidence: visual world uses only canonical saved game state and retains legacy finances");
