// v26C1: authentic CEO room reads saved executives; all old finance/control surfaces remain.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(code);
for(const id of ["boss-executive-room","boss-room-people","boss-room-tabs","boss-room-all",
"ceo-priority-card","executive-inbox-panel","today-ceo-tools","management-policy-center","ceo-records","capital-today"]){
 assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,"existing and new unique "+id);
}
const map=new Map(),data=new Map();
function el(id){if(!map.has(id))map.set(id,{id,innerHTML:"",textContent:"",hidden:false,open:false,
 value:"",dataset:{},classList:{add(){},remove(){},toggle(){}},attributes:{},
 setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]},
 querySelectorAll(){return []},addEventListener(){},getContext(){return new Proxy({},{get:()=>()=>{}})},parentNode:{open:true}});
 return map.get(id)}
const sandbox={document:{getElementById:el,querySelector:()=>el("query"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),addEventListener(){}},
window:{scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)},setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,
getComputedStyle:()=>({getPropertyValue:()=>""}),Math,Date,Map,Set,JSON,console};
vm.createContext(sandbox);
const boot=code.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(code.slice(0,boot)+"globalThis.G={fresh,state:()=>S,renderCEOOffice,ceoPortrait};})();",sandbox);
const G=sandbox.G;function check(name,fn){fn();console.log("PASS v26C1 "+name)}
check("Fresh Founder board shows real CEO with four honest vacant seats",()=>{
 G.fresh();const s=G.state();s.ui.storyDetails=true;
 const before=JSON.stringify(s);G.renderCEOOffice();const room=el("boss-room-people").innerHTML;
 assert.equal((room.match(/class="boss-exec-seat"/g)||[]).length,5);
 assert.equal((room.match(/boss-exec-vacant/g)||[]).length,4);
 assert.ok(room.includes("Assistant")&&room.includes("CFO")&&room.includes("COO")&&room.includes("CHRO"));
 assert.equal(el("boss-executive-room").hidden,false);
 assert.equal(el("ceo-priority-card").attributes["data-mgmt-show"],undefined,"conversation starts without legacy cards");
 assert.equal(el("capital-today").attributes["data-mgmt-show"],undefined);
 assert.equal(JSON.stringify(s),before,"rendering never mutates payroll, cash, appointments or progress");
});
check("Real appointed CFO and assistant gain named faces, without adding employees",()=>{
 const s=G.state();s.ops.assistantId=s.team[0].id;s.exec.officers.cfo.id=s.team[1].id;
 const before=JSON.stringify(s);G.renderCEOOffice();const room=el("boss-room-people").innerHTML;
 assert.ok(room.includes(s.team[0].n)&&room.includes(s.team[1].n));
 assert.equal((room.match(/boss-exec-vacant/g)||[]).length,2);
 assert.equal(JSON.stringify(s),before);
});
check("Leadership, business and records each expose original read-only detail modules",()=>{
 const s=G.state();
 for(const [room,id,hiddenId] of [["leadership","today-ceo-tools","ceo-priority-card"],["business","capital-today","executive-inbox-panel"],["records","ceo-records","factory-today"]]){
  s.ui.managementRoom=room;s.ui.managementTopic=id;const before=JSON.stringify(s);G.renderCEOOffice();
  assert.equal(el(id).attributes["data-mgmt-show"],"",room+" shows "+id);
  assert.equal(el(hiddenId).attributes["data-mgmt-show"],undefined,room+" hides "+hiddenId);
  assert.equal(JSON.stringify(s),before);
 }
});
check("Detail mode restores all old panels, visual mode can close without deleting values",()=>{
 const s=G.state();s.ui.managementRoom="all";G.renderCEOOffice();
 assert.equal(el("management-policy-center").attributes["data-mgmt-show"],"");
 assert.equal(el("executive-inbox-panel").attributes["data-mgmt-show"],"");
 s.ui.storyDetails=false;G.renderCEOOffice();
 assert.equal(el("boss-executive-room").hidden,true);
});
console.log("v26C1 visual board and preservation checks passed");
