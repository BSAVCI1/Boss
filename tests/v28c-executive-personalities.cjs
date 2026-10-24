// v28C — truthful recurring executive personas are driven by canonical game facts.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),source=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(source,{filename:"v28c-executive-personalities.js"});
assert.match(html,/boss-seat-focus/);
assert.equal((html.match(/function ceoConversation\(room\)/g)||[]).length,1);
const nodes=new Map(),store=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{id,innerHTML:"",textContent:"",value:"",hidden:false,disabled:false,style:{},dataset:{},
 classList:{add(){},remove(){},toggle(){}},setAttribute(){},removeAttribute(){},addEventListener(){},getContext(){return new Proxy({},{get:()=>()=>{}})},
 querySelector(){return null},querySelectorAll(){return []},scrollIntoView(){},parentNode:{open:true}});
 return nodes.get(id);}
const host={document:{getElementById:el,querySelector:()=>el("q"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},
 window:{scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
 requestAnimationFrame:()=>1,setTimeout:()=>1,clearTimeout(){},Date,Math,Map,Set,JSON,console};
vm.createContext(host);
const boot=source.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0,"game bootstrap anchor must exist");
vm.runInContext(source.slice(0,boot)+
 "globalThis.G={fresh,state:()=>S,conversation:ceoConversation,status:v28cOfficerStatus,impact:v28cOfficerImpact,managementOps};})();",host,{timeout:15000});
const G=host.G;
function fresh(){store.clear();G.fresh();const s=G.state();s.ui.founderIntro="done";s.day=35;return s;}
function check(title,fn){fn();console.log("PASS v28C "+title);}
check("founder without executives gets no fabricated CFO/COO/CHRO speaker",()=>{
 const s=fresh();s.ui.managementSpeaker="CFO";const before=JSON.stringify(s),v=G.conversation("business");
 assert.equal(v.key,"CEO");assert.equal(JSON.stringify(s),before);
});
check("CFO shows real cash and 30-day reserve without granting a mandate",()=>{
 const s=fresh(),c=s.team[2];s.exec.officers.cfo.id=c.id;s.exec.officers.cfo.mandate=false;
 s.ui.managementSpeaker="CFO";const before=JSON.stringify(s),v=G.conversation("business");
 assert.equal(v.key,"CFO");assert.ok(v.words.includes("Thirty-day payroll and premises reserve"));
 assert.ok(v.words.includes("mandate"));assert.match(v.status,/ADVISORY/);
 assert.equal(JSON.stringify(s),before);
});
check("CFO role speaks as authorized only when active and 90-day mandate valid",()=>{
 const s=fresh();s.exec.officers.cfo.id=s.team[2].id;s.exec.officers.cfo.mandate=true;
 s.exec.officers.cfo.authoritySince=0;s.ui.managementSpeaker="CFO";
 assert.match(G.conversation("business").status,/AUTHORIZED/);
 s.day=95;assert.match(G.conversation("business").status,/ADVISORY/);
});
check("COO reports actual customer assignment and attributed temporary sharing",()=>{
 const s=fresh(),p=s.team[2];s.exec.officers.coo.id=p.id;s.exec.officers.coo.mandate=true;s.exec.officers.coo.authoritySince=0;
 s.ui.managementSpeaker="COO";G.managementOps().history.unshift({day:s.day,kind:"shared",role:"COO",employeeId:s.team[1].id});
 const before=JSON.stringify(s),v=G.conversation("leadership");
 assert.equal(v.key,"COO");assert.ok(v.words.includes(s.team[1].n));assert.match(v.impact,/real specialist-sharing action/);
 assert.equal(JSON.stringify(s),before);
});
check("CHRO responds to true role-recorded mediation and real people, no phantom effects",()=>{
 const s=fresh(),p=s.team[2],a=s.team[0],b=s.team[1];s.exec.officers.hr.id=p.id;
 s.exec.officers.hr.mandate=true;s.exec.officers.hr.authoritySince=0;
 s.exec.officers.hr.history.unshift({day:s.day,action:"priority-mediation",employeeId:a.id,peerId:b.id,cost:0});
 s.ui.managementSpeaker="CHRO";const cash=s.cash,before=JSON.stringify(s),v=G.conversation("leadership");
 assert.equal(v.key,"CHRO");assert.ok(v.words.includes(a.n)&&v.words.includes(b.n));
 assert.match(v.impact,/1 mediations/);assert.match(v.status,/AUTHORIZED/);
 assert.equal(s.cash,cash);assert.equal(JSON.stringify(s),before);
});
check("assistant reports real approvals without mutating historical save",()=>{
 const s=fresh();s.ops.assistantId=s.team[0].id;s.ui.managementSpeaker="Assistant";const before=JSON.stringify(s),v=G.conversation("decisions");
 assert.equal(v.key,"Assistant");assert.match(v.status,/BRIEFING ONLY/);assert.equal(JSON.stringify(s),before);
});
console.log("v28C executive personas evidence and permission checks complete.");
