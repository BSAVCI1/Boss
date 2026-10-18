// v22.4 CEO-experience smoke: actual unmodified game script and financially inert UI suggestions.
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const html=fs.readFileSync("index.html","utf8");
const script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const match of script.matchAll(/\$\("([^"]+)"\)/g))assert.ok(ids.has(match[1]),"Missing UI element: "+match[1]);
const store=new Map(),els=new Map();
function el(id){if(!els.has(id))els.set(id,{id,innerHTML:"",textContent:"",value:"",checked:false,open:false,hidden:false,disabled:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},getContext(){return new Proxy({},{get:()=>()=>{}})},querySelector(){return null},querySelectorAll(){return []},setAttribute(){},removeAttribute(){},scrollIntoView(){},focus(){},parentNode:{open:true}});return els.get(id);}
const sandbox={document:{getElementById:el,querySelector:()=>el("x"),querySelectorAll:()=>[],body:el("body"),documentElement:el("html"),activeElement:null,addEventListener(){}},window:{innerWidth:390,scrollY:0,scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},setTimeout:()=>1,clearTimeout(){},clearInterval(){},requestAnimationFrame:()=>1,getComputedStyle:()=>({getPropertyValue:()=>""}),Date,Math,JSON,Set,Map,console};
vm.createContext(sandbox);
const boot=script.indexOf("S=load();if(!S)fresh();");assert.ok(boot>0);
const exposed="fresh,get:()=>S,set:v=>S=v,load,save,createDeal,feeFor,estimatedFee,worldIndicativeFee,worldTenderPreview,renderPipeline,renderCEODecisions,renderCEOFocus,ceoDecisionInventory,managementOps,renderBriefing,renderExecutiveWeekly,ceoPremisesOpportunity,propertyCapacity,propertyPeople,propertyReadiness,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,dailySalary";
vm.runInContext(script.slice(0,boot)+"globalThis.G={"+exposed+"};})();",sandbox,{timeout:5000});
const G=sandbox.G;
function fresh(){store.clear();G.fresh();return G.get();}
function staff(s,n){while(s.team.length<n){const p=G.createPerson();G.ensureCareer(p);G.ensureRole(p);G.ensureDepartment(p);G.ensurePerformance(p,s.day);s.team.push(p);}}
function money(s){assert.ok(Math.abs(s.bi.openingCash+s.bi.totals.cashIn-s.bi.totals.cashOut-s.cash)<.06,"Corporate cash ledger must reconcile");}
function test(name,callback){callback();console.log("PASS "+name);}
test("new company keeps its first contracts and reasonable comparable lead estimates",()=>{
 const s=fresh(),before=s.deals.map(G.feeFor),cash=s.cash;
 const lead={id:42,client:"Nova Cafe",sector:"hospitality",preference:"trust"};
 const quote=G.worldTenderPreview(lead);
 assert.ok(Number.isFinite(quote.feeHint)&&quote.feeHint>0);
 assert.equal(quote.feeHint,G.worldIndicativeFee(lead));
 assert.deepEqual(s.deals.map(G.feeFor),before);assert.equal(s.cash,cash);money(s);
});
test("established 4704-day game shows price estimate near real new signed deal not outdated $199",()=>{
 const s=fresh();s.day=4704;s.rep=3657;s.cash+=4_000_000;s.bi.openingCash+=4_000_000;s.market.completed=689;
 s.market.open=["hospitality","retail","creative"];s.market.focus="creative";
 s.exec.lines=[{key:"product",since:200,delivered:130},{key:"marketing",since:250,delivered:127}];
 const lead={id:19,client:"Atlas Print",sector:"creative",preference:"quality",stage:"negotiation",created:4700};
 const preview=G.worldTenderPreview(lead),originalCash=s.cash;
 const d=G.createDeal("Atlas Print",0,"creative"),fee=G.feeFor(d);
 assert.ok(preview.feeHint>1000,"bid estimate must include reputation and service modifiers");
 assert.ok(Math.abs(fee-preview.feeHint)/fee<.2,"signed fee and indicative fee should be commercially comparable");
 assert.equal(originalCash,s.cash);
 s.pipeline.leads=[lead];G.renderPipeline();
 assert.ok(el("pipeline-details").innerHTML.includes("Estimated signed-fee range"));
 assert.ok(el("pipeline-details").innerHTML.includes("scope dependent"));
 money(s);
});
test("filled C-suite no longer prompts CEO to appoint the same role",()=>{
 const s=fresh();staff(s,18);s.market.completed=50;s.exec.units=[];
 s.exec.officers.hr.id=s.team[4].id;s.exec.officers.cfo.id=s.team[5].id;s.exec.officers.coo.id=s.team[6].id;
 G.renderCEODecisions();const html=el("ceo-action-center").innerHTML;
 assert.ok(!html.includes("Executive structure recommendation"));
 assert.ok(!html.includes("Unfilled executive offices"));
 money(s);
});
test("oversized corporate office appears as CEO strategic decision and never automatically spends cash",()=>{
 const s=fresh();staff(s,19);s.exec.property.baselineCapacity=12;
 s.day=4704;s.market.completed=100;s.cash+=10000;s.bi.openingCash+=10000;
 s.org.progression.appointments.push({id:s.team[0].id,level:"lead",since:0},{id:s.team[1].id,level:"manager",since:0});
 const cash=s.cash,options=G.ceoPremisesOpportunity();
 assert.equal(options.people,19);assert.equal(options.capacity,12);
 assert.ok(options.best==="office"||options.best==="building");
 G.renderCEOFocus();
 const text=el("ceo-priority-content").innerHTML;
 assert.ok(text.includes("workplace crowding"));assert.ok(text.includes("19 people"));assert.ok(text.includes("Compare premises and decide"));
 assert.equal(s.cash,cash);assert.equal(s.exec.property.sites.length,0);
 G.save();const after=G.load();assert.equal(after.day,4704);assert.equal(after.cash,cash);money(after);
});
test("EA weekly report starts decision-first; complete performance remains an optional disclosure",()=>{
 const s=fresh();el("ea-weekly-report").open=true;
 G.renderExecutiveWeekly();
 const html=el("ea-weekly-body").innerHTML;
 assert.ok(html.includes("Executive summary"));
 assert.ok(html.includes("Top recommendations"));
 assert.ok(html.includes("Full operating report"));
 assert.ok(html.includes("data-ea-full"));
 assert.ok(!html.includes("data-ea-full open"),"full report should initially be collapsed");
 money(s);
});
test("operational review topics do not call themselves CEO approval requests",()=>{
 const s=fresh();
 s.deals[0].w=null;G.renderBriefing();
 const intro=el("brief-summary").textContent,heading=el("brief-headline").textContent;
 assert.ok(!intro.includes("decisions requiring CEO attention"));
 assert.ok(heading.includes("operational")||heading.includes("on track"));
 money(s);
});
test("CEO headline includes true required reviews without counting optional bids",()=>{
 const s=fresh(),cash=s.cash,headcount=s.team.length,oldFees=s.deals.map(G.feeFor);
 G.renderCEOFocus();assert.ok(el("ceo-priority-content").innerHTML.includes("0 CEO approvals pending"));
 const ops=G.managementOps();
 ops.requests.push({id:991,status:"open",cost:20,payroll:1.5,dept:"commercial",reason:"new work"});
 s.exec.unitRequests.push({id:992,key:"marketing",status:"open",cost:20,payroll:1.5,managerId:null,reason:"staffing request"});
 s.exec.proposals.push({id:993,type:"training",dept:"commercial",cost:8,benefit:"Skill growth",risk:"Uncertain"});
 let inv=G.ceoDecisionInventory();assert.equal(inv.approvals,3);
 G.renderCEOFocus();
 const html=el("ceo-priority-content").innerHTML;
 assert.ok(html.includes("3 CEO approvals pending"));
 assert.ok(html.includes('data-ceo-nav="decisions"'));
 assert.ok(!html.includes("optional market opportunity"));
 s.world.activeEvent={id:1,type:"referrals",opened:s.day,until:s.day+20,sector:"hospitality"};
 inv=G.ceoDecisionInventory();assert.equal(inv.approvals,3);
 assert.equal(inv.optional,true);
 G.renderCEOFocus();const marketHTML=el("ceo-priority-content").innerHTML;
 assert.ok(marketHTML.includes("3 CEO approvals pending"));
 assert.ok(marketHTML.includes("1 optional market opportunity"));
 assert.equal(s.cash,cash);assert.equal(s.team.length,headcount);
 assert.deepEqual(s.deals.map(G.feeFor),oldFees);money(s);
});
test("Optional market opportunity is excluded from mandatory approval count",()=>{
 const s=fresh();
 s.world.activeEvent={id:1,type:"referrals",opened:s.day,until:s.day+20,sector:"hospitality"};
 G.renderCEODecisions();const html=el("ceo-action-center").innerHTML;
 assert.ok(html.includes("0 approvals here · 1 optional opportunity"));
 assert.ok(html.includes("Market opportunity · optional"));
 assert.equal(G.ceoDecisionInventory().approvals,0);
 money(s);
});
console.log("v22.4 CEO experience batches 1-3 regression passed");
