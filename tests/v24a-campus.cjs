// v24A: actual Boss campus and canonical reporting, no replicated engine.
"use strict";const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8"),code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
new vm.Script(code,{filename:"boss-v24a-real-campus.js"});
for(const id of ["campus-panel","campus-sites","campus-plan","campus-report-tree","campus-tree-panel"])
 assert.equal((html.match(new RegExp('id="'+id+'"',"g"))||[]).length,1,id);
const store=new Map(),nodes=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,hidden:false,open:false,disabled:false,
 style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},
 events:{},addEventListener(name,fn){this.events[name]=fn},querySelector(){return null},querySelectorAll(){return []},
 getContext(){return new Proxy({},{get:()=>()=>{}})},setAttribute(){},removeAttribute(){},scrollIntoView(){},focus(){},
 parentNode:{open:true}});return nodes.get(id);}
const env={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],body:el("body"),
 documentElement:el("html"),activeElement:null,addEventListener(){}},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},
 localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},
 setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Set,Map,console};
vm.createContext(env);const boot=code.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
vm.runInContext(code.slice(0,boot)+"globalThis.G={fresh,save,load,state:()=>S,campusRender,campusSites,campusSiteInfo,campusZones,"+
 "canonicalReporting,propertyPeople,propertyCapacity,propertyActive,ensureProperties,createPerson,ensureCareer,ensureRole,"+
 "ensureDepartment,ensurePerformance,select:(site,id)=>{campusScope=site;campusSelectedId=id;campusRender(true)}};})();",env,{timeout:12000});
const G=env.G;
function reset(){store.clear();G.fresh();return G.state();}
function add(s,role="sales",dept="commercial"){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);p.role.primary=role;p.department=dept;s.team.push(p);return p;}
function test(name,fn){fn();console.log("PASS v24A "+name);}
test("Founder: live seats, no phantom building, canonical employees, visualization is read-only",()=>{
 const s=reset(),before=JSON.stringify(s);G.campusRender(true);
 assert.ok(el("campus-plan").innerHTML.includes("Distributed founder workspace"));
 assert.ok(el("campus-plan").innerHTML.includes("3 of "+G.propertyCapacity()+" places used"));
 assert.ok(!el("campus-plan").innerHTML.includes("Owned office building"));
 assert.equal(G.campusSites().length,1);assert.equal(G.canonicalReporting().entries.length,3);
 assert.equal(JSON.stringify(s),before);
});
test("Site move to actual recorded owned building changes seats and inactive premises remain inactive",()=>{
 const s=reset();s.exec.property.sites.push({id:991,type:"studio",status:"inactive",location:"regional",dayCost:1.32,
 boost:1.02,since:0,book:0,investment:75,arrears:0,unitKey:null});
 s.exec.property.sites.push({id:992,type:"building",status:"active",location:"central",dayCost:1.56,
 boost:1.08,since:0,book:1800,investment:1800,arrears:0,unitKey:null});
 const before=JSON.stringify(s);G.campusRender(true);
 assert.ok(el("campus-plan").innerHTML.includes("Owned office building"));
 assert.ok(el("campus-plan").innerHTML.includes("City center"));
 assert.ok(el("campus-plan").innerHTML.includes("3 of 40 places used"));
 assert.ok(el("campus-plan").innerHTML.includes("Other recorded properties"));
 assert.equal(JSON.stringify(s),before);
});
test("Real GM unit and specialists have unique IDs, unique workplace and true supervisor",()=>{
 const s=reset(),gm=add(s,"lead"),staff=add(s,"mkt");
 s.exec.lines.push({key:"marketing",since:0,spent:120});
 s.exec.units.push({key:"marketing",managerId:gm.id,staffIds:[gm.id,staff.id],delivered:0,plan:{},reviews:[]});
 G.ensureProperties(s);
 const entries=G.canonicalReporting().entries;
 assert.equal(new Set(entries.map(e=>e.p.id)).size,s.team.length);
 assert.equal(entries.find(x=>x.p.id===staff.id).supervisor,gm.id);
 assert.equal(G.propertyPeople("marketing").length,2);assert.equal(G.propertyPeople().length,3);
 G.select("unit:marketing",staff.id);
 assert.ok(el("campus-plan").innerHTML.includes("2 of 6 places used"));
 assert.ok(el("campus-plan").innerHTML.includes("Reports to: "+gm.n));
 assert.ok(el("campus-report-tree").innerHTML.includes("CEO · company owner"));
 const before=JSON.stringify(s);G.campusRender(true);assert.equal(JSON.stringify(s),before);
});
test("Actual 12/8-seat overcrowding is shown and never spends cash or changes payroll",()=>{
 const s=reset(),cash=s.cash,bi=JSON.stringify(s.bi.totals);
 for(let i=0;i<9;i++)add(s,i%2?"sales":"prod",i%2?"commercial":"operations");
 G.campusRender(true);
 assert.ok(el("campus-plan").innerHTML.includes("Overcrowding reduces future work productivity"));
 assert.ok(el("campus-sites").innerHTML.includes("OVER CAPACITY"));
 assert.ok(el("campus-plan").innerHTML.includes("12 of "+G.propertyCapacity()+" places used"));
 assert.equal(s.cash,cash);assert.equal(JSON.stringify(s.bi.totals),bi);
});
test("Executive Assistant actual reporting, person selection, legacy save/load and no render mutations",()=>{
 const s=reset();s.ops.assistantId=s.team[0].id;
 const before=JSON.stringify(s);
 G.select("corporate",s.team[0].id);
 assert.ok(el("campus-plan").innerHTML.includes("Executive Assistant"));
 assert.ok(el("campus-plan").innerHTML.includes("Reports to: CEO"));
 assert.ok(el("campus-report-tree").innerHTML.includes("Vacant executive positions"));
 assert.equal(JSON.stringify(s),before);
 assert.equal(G.save(),true);
 const restored=G.load(JSON.stringify(s));
 assert.equal(JSON.stringify(restored.team.map(p=>p.id)),JSON.stringify(s.team.map(p=>p.id)));
 assert.equal(restored.ops.assistantId,s.ops.assistantId);
});
test("Clickable campus site and employee drilldown never mutate company data",()=>{
 const s=reset(),before=JSON.stringify(s);G.campusRender(true);
 const click=el("campus-panel").events.click;assert.equal(typeof click,"function");
 click({target:{closest:()=>({dataset:{campusSite:"corporate"}})}});
 click({target:{closest:()=>({dataset:{campusPerson:String(s.team[1].id)}})}});
 assert.ok(el("campus-plan").innerHTML.includes(s.team[1].n));
 assert.equal(JSON.stringify(s),before);
});
