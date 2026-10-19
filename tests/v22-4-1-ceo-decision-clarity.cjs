// v22.4.1 CEO decisions: real production game engine in an isolated VM.
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const code=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
const boot=code.indexOf("S=load();if(!S)fresh();");
assert.ok(boot>0);
const store=new Map(),els=new Map();
function el(id){if(!els.has(id))els.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,open:false,hidden:false,disabled:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},getContext(){return new Proxy({},{get:()=>()=>{}})},querySelector(){return null},querySelectorAll(){return []},setAttribute(){},removeAttribute(){},scrollIntoView(){},focus(){},parentNode:{open:true}});return els.get(id);}
const box={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Set,Map,console};
vm.createContext(box);
vm.runInContext(code.slice(0,boot)+"globalThis.G={fresh,load,save,get:()=>S,set:x=>S=x,worldEventChoice,worldOfferTerms,worldRender,executiveShow,renderCEOFocus,renderCEODecisions,ceoStrategyReview,companyLaunchReadiness,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,dailySalary};})();",box,{timeout:8000});
const G=box.G;
function fresh(){store.clear();G.fresh();return G.get();}
function ledger(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.07,"Cash and ledger diverged");}
function test(title,run){run();console.log("PASS v22.4.1 "+title);}
function addPeople(s,n){while(s.team.length<n){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);s.team.push(p);}}

test("referral offer has exactly one Take/Pass pair and $10 only once",()=>{
 const s=fresh();s.world.activeEvent={id:1,opened:s.day,type:"referrals",sector:s.market.focus,until:s.day+30};
 const cash=s.cash,out=s.bi.totals.cashOut;
 G.renderCEODecisions();G.executiveShow();el("world-panel").open=true;G.worldRender();
 const action=el("ceo-action-center").innerHTML,secondary=el("exec-inbox").innerHTML,growth=el("world-event").innerHTML;
 assert.equal((action.match(/Take opportunity/g)||[]).length,1);
 assert.equal((action.match(/>Pass</g)||[]).length,1);
 assert.ok(action.includes("$10")&&action.includes("30 game days"));
 assert.ok(!secondary.includes("Take opportunity")&&!growth.includes("Take opportunity"));
 assert.ok(!secondary.includes("data-world-event=")&&!growth.includes("data-world-event="));
 assert.equal(G.worldEventChoice("act"),true);
 assert.equal(s.cash,cash-10);assert.equal(s.bi.totals.cashOut,out+10);
 assert.equal(s.world.boostUntil,s.day+30);assert.equal(s.world.activeEvent,null);
 assert.equal(G.worldEventChoice("act"),false);
 assert.equal(s.bi.totals.cashOut,out+10);ledger(s);
 const restored=G.load(JSON.stringify(s));assert.equal(restored.world.activeEvent,null);
 assert.equal(restored.cash,cash-10);
});
test("Pass is free and persists after reloading",()=>{
 const s=fresh(),before=s.cash,out=s.bi.totals.cashOut;
 s.world.activeEvent={id:2,opened:s.day,type:"referrals",sector:s.market.focus,until:s.day+30};
 assert.equal(G.worldEventChoice("pass"),true);
 assert.equal(s.cash,before);assert.equal(s.bi.totals.cashOut,out);
 assert.equal(G.load(JSON.stringify(s)).world.activeEvent,null);ledger(s);
});
test("earned $120 launch is recommended only once with direct launch interface",()=>{
 const s=fresh();addPeople(s,8);s.market.completed=20;s.rep=50;s.cash+=50000;s.bi.openingCash+=50000;
 s.org.progression.appointments.push({id:s.team[1].id,level:"lead",since:1});
 s.team[2].s.mkt=5;el("service-line-select").value="marketing";
 assert.equal(G.companyLaunchReadiness("marketing").ready,true);
 const saved=JSON.stringify(s);
 G.renderCEOFocus();
 const cards=el("ceo-priority-content").innerHTML;
 assert.ok(cards.includes("Launch another business"));
 assert.ok(cards.includes("Review business launch"));
 assert.ok(cards.includes('data-ceo-nav="launch"'));
 assert.ok(!cards.includes("Next company chapter"),"One launch decision, not two");
 assert.equal(JSON.stringify(s),saved,"A strategy recommendation must not charge launch costs");
 ledger(s);
});
test("stable strategy maintenance, overdue reviews and unmandated officers",()=>{
 const s=fresh();addPeople(s,16);s.day=4900;s.exec.priority="profit";s.exec.priorityDay=4800;
 s.cash+=50000;s.bi.openingCash+=50000;
 for(const [i,role] of ["hr","cfo","coo"].entries()){s.exec.officers[role].id=s.team[4+i].id;s.exec.officers[role].mandate=true;s.exec.officers[role].authoritySince=4700;}
 const before=JSON.stringify(s);
 const r=G.ceoStrategyReview();
 assert.equal(r.change,false);assert.ok(r.trigger.includes("90-day"));
 assert.ok(r.evidence.every(x=>x.includes("no active")),"Expired mandates cannot be represented as active");
 G.renderCEOFocus();const focus=el("ceo-priority-content").innerHTML;
 assert.ok(focus.includes("Maintain Strengthen profitability"));
 assert.ok(focus.includes("Commercial acquisition approach")&&focus.includes("GM unit strategy"));
 assert.equal(JSON.stringify(s),before);
 ledger(s);
});
test("material liquidity deterioration supports a change but cannot authorize it",()=>{
 const s=fresh();s.day=4900;s.exec.priority="grow";s.exec.priorityDay=4890;
 const fixed=s.team.reduce((v,p)=>v+G.dailySalary(p),0);
 const next=fixed*3,diff=next-s.cash;s.cash=next;s.bi.openingCash+=diff;
 const before=JSON.stringify(s);
 const r=G.ceoStrategyReview();
 assert.equal(r.change,true);assert.equal(r.suggested,"profit");
 assert.ok(r.reason.includes("payroll and premises"));
 G.renderCEOFocus();assert.ok(el("ceo-priority-content").innerHTML.includes("Consider Strengthen profitability"));
 assert.equal(JSON.stringify(s),before,"No automatic approval or changing CEO direction");
 assert.equal(s.exec.priority,"grow");ledger(s);
});
assert.ok(html.includes('id="ceo-more-accountable"')&&html.includes("reconcileCEOContent(root,html)"));
assert.ok(html.includes('data-ceo-nav="commercial"')&&html.includes('data-ceo-nav="sector"')&&html.includes('data-ceo-nav="unit"'));
console.log("v22.4.1 targeted financial, strategy, authorization and duplicate-control checks passed");
