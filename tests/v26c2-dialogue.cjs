// v26C2: the management experience is a playable, authentic conversation, not a wall of reports.
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm");
const html=fs.readFileSync("index.html","utf8"),script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(script,{filename:"boss-v26c2.js"});
for(const id of ["boss-executive-room","boss-conversation","boss-conversation-face","boss-conversation-name",
 "boss-conversation-words","boss-topic-actions","boss-topic-back","boss-room-close","boss-room-all"]){
 assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,"UI element "+id);
}
const elements=new Map(),saveMap=new Map();
function el(id){if(!elements.has(id))elements.set(id,{id,innerHTML:"",textContent:"",hidden:false,open:false,value:"",style:{},attributes:{},dataset:{},
 classList:{add(){},remove(){},toggle(){}},setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]},
 addEventListener(){},querySelectorAll(){return []},getContext(){return new Proxy({},{get:()=>()=>{}})},parentNode:{open:true}});return elements.get(id)}
const context={document:{getElementById:el,querySelector:()=>el("q"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),addEventListener(){}},
window:{scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>saveMap.get(k)||null,setItem:(k,v)=>saveMap.set(k,v)},
setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Math,Date,Map,Set,JSON,console};
vm.createContext(context);
const boot=script.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(script.slice(0,boot)+"globalThis.G={fresh,state:()=>S,renderCEOOffice,ceoConversation,renderCEOConversation,topics:BOSS_MGMT_TOPICS};})();",context,{timeout:10000});
const G=context.G;
function check(label,fn){fn();console.log("PASS v26C2 "+label)}
check("Founder enters a real story, not a card stack",()=>{
 G.fresh();const s=G.state();s.ui.storyDetails=true;
 const before=JSON.stringify(s);G.renderCEOOffice();
 assert.equal(el("boss-executive-room").hidden,false);
 assert.ok(el("boss-conversation-words").textContent.length>15);
 assert.equal(el("ceo-priority-card").attributes["data-mgmt-show"],undefined);
 assert.equal(el("executive-inbox-panel").attributes["data-mgmt-show"],undefined);
 assert.ok(el("boss-topic-actions").innerHTML.includes("data-boss-topic"));
 assert.ok(el("boss-conversation-name").textContent.length>0);
 assert.equal(JSON.stringify(s),before,"purely visual, no payroll/save/cash mutations");
});
check("Only selected real action is exposed, and its original HTML remains intact",()=>{
 const s=G.state(),before=JSON.stringify(s);
 s.ui.managementTopic="ceo-priority-card";G.renderCEOOffice();
 assert.equal(el("ceo-priority-card").attributes["data-mgmt-show"],"");
 assert.equal(el("executive-inbox-panel").attributes["data-mgmt-show"],undefined);
 assert.equal(el("capital-today").attributes["data-mgmt-show"],undefined);
 assert.ok(el("boss-topic-actions").innerHTML.includes('aria-pressed="true"'));
 assert.equal(JSON.stringify(s),JSON.stringify({...JSON.parse(before),ui:{...JSON.parse(before).ui,managementTopic:"ceo-priority-card"}}));
});
check("CFO conversation uses appointed person, true cash and zero fabricated leaders",()=>{
 const s=G.state();s.cash=137;s.exec.officers.cfo.id=s.team[1].id;
 const before=JSON.stringify(s);s.ui.managementRoom="business";s.ui.managementSpeaker="CFO";s.ui.managementTopic=null;
 G.renderCEOOffice();
 const dialog=G.ceoConversation("business");
 assert.equal(dialog.who,s.team[1].n);
 assert.ok(dialog.words.includes("137")&&dialog.words.includes("completed"));
 assert.equal(el("capital-today").attributes["data-mgmt-show"],undefined);
 assert.equal((el("boss-room-people").innerHTML.match(/boss-exec-vacant/g)||[]).length,3);
 assert.equal(s.team.length,3);
 assert.equal(s.cash,137);
});
check("CFO vacancy cannot impersonate a real CFO",()=>{
 const s=G.state();s.exec.officers.cfo.id=null;s.ui.managementSpeaker="CFO";
 const dialog=G.ceoConversation("business");
 assert.equal(dialog.key,"CEO");
 assert.ok(dialog.words.includes("137"),"player still receives real status");
});
check("Every room has actual topic targets and full-details fallback",()=>{
 const s=G.state();const names=Object.keys(G.topics);
 assert.equal(names.length,4);
 const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
 for(const room of names){assert.ok(G.topics[room].length>=3);for(const topic of G.topics[room])assert.ok(ids.has(topic[0]),room+":"+topic[0]);}
 s.ui.managementRoom="all";G.renderCEOOffice();
 assert.equal(el("ceo-priority-card").attributes["data-mgmt-show"],"");
 assert.equal(el("management-policy-center").attributes["data-mgmt-show"],"");
 assert.equal(el("boss-conversation").hidden,true);
});
console.log("v26C2 complete: story-driven focused navigation with authentic data and preserved management controls");
