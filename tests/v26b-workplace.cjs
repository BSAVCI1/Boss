// v26B visual campus: authentic state only, zero purchases or invisible employees.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(code);
const nodes=new Map(),store=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{id,innerHTML:"",textContent:"",value:"",style:{},dataset:{},hidden:false,classList:{add(){},remove(){},toggle(){},contains(){return false}},
setAttribute(){},addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},parentNode:{open:true}});return nodes.get(id)}
const env={document:{getElementById:el,querySelector:()=>el("q"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),addEventListener(){}},
window:{scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Math,Date,Map,Set,JSON,console};
vm.createContext(env);const boot=code.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(code.slice(0,boot)+"globalThis.G={fresh,state:()=>S,renderFounderStory};})();",env);
const G=env.G;
function check(title,fn){fn();console.log("PASS v26B "+title)}
check("Fresh startup only displays actual employees, no phantom sites, businesses or machines",()=>{
 G.fresh();const s=G.state(),before=JSON.stringify(s);G.renderFounderStory();
 const scene=el("boss-office-scene").innerHTML,caption=el("boss-scene-caption").textContent;
 assert.ok(scene.includes("boss-room-stage startup"));
 assert.ok(scene.includes("3 people")&&scene.includes("0 sites"));
 assert.ok(scene.includes("data-world-nav"));
 assert.ok(!scene.includes("🏭")&&!scene.includes("🏬"));
 assert.ok(caption.includes("no owned site"));
 assert.equal(JSON.stringify(s),before,"UI must not mutate game");
});
check("Actual active property, launched services, funded tools and installed factory become visible",()=>{
 const s=G.state();s.ui.founderIntro="done";
 s.exec.property.sites.push({id:800,type:"building",status:"active"});s.exec.lines.push({key:"marketing",since:s.day});
 s.economy.invested.operations=true;s.factory.installed=true;s.factory.siteId=800;
 const before=JSON.stringify(s);G.renderFounderStory();const scene=el("boss-office-scene").innerHTML;
 assert.ok(scene.includes("boss-room-stage hq")&&scene.includes("1 sites")&&scene.includes("🏭")&&scene.includes("🏬")&&scene.includes("⚙️"));
 assert.equal(JSON.stringify(s),before,"display must remain read-only");
});
check("Inactive premises no longer appear and factory is not falsely operated",()=>{
 const s=G.state();s.exec.property.sites[0].status="inactive";G.renderFounderStory();
 const scene=el("boss-office-scene").innerHTML;
 assert.ok(scene.includes("boss-room-stage startup")&&scene.includes("0 sites"));
 assert.ok(!scene.includes("🏭"),"factory requires actual active site");
});
console.log("v26B workplace checks complete");
