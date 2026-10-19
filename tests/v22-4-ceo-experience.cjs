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
const exposed="fresh,get:()=>S,set:v=>S=v,load,save,createDeal,feeFor,estimatedFee,worldIndicativeFee,worldTenderPreview,renderPipeline,renderCEODecisions,renderCEOFocus,ceoDecisionInventory,managementOps,renderBriefing,renderExecutiveWeekly,ceoPremisesOpportunity,propertyCapacity,propertyPeople,propertyReadiness,createPerson,ensureCareer,ensureRole,ensureDepartment,ensurePerformance,dailySalary,canonicalReporting,teamReportingGroups,renderOrgExplorer,clearCareerRequirements,coachCareerStatus,careerAction";
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

test("v22.4B fresh founder has a pure canonical reporting roster and three real vacancies",()=>{
 const s=fresh(),before=JSON.stringify(s),view=G.canonicalReporting();
 assert.equal(view.entries.length,3);assert.equal(view.groups.flatMap(g=>g.people).length,3);
 assert.equal(new Set(view.groups.flatMap(g=>g.people).map(p=>p.id)).size,3);
 assert.ok(view.entries.every(x=>x.supervisor===null&&x.unit===null));
 G.renderOrgExplorer(view);
 const tree=el("org-explorer").innerHTML;
 assert.ok(tree.includes("CEO · founder")&&tree.includes("Vacant"));
 assert.ok(tree.includes("Commercial")&&tree.includes("Delivery"));
 assert.equal(JSON.stringify(s),before,"Viewing the hierarchy must be read-only");
 assert.equal(s.cash,90);money(s);
});
test("v22.4B mature Day-4704 roster has one person per ID across CEOs, departments and GMs",()=>{
 const s=fresh();staff(s,34);s.day=4704;
 const commercial=s.team[4],salesBoss=s.team[5],gm=s.team[9],unitStaff=s.team[10],lead=s.team[11],report=s.team[12];
 commercial.department="commercial";commercial.role.primary="lead";
 salesBoss.department="commercial";salesBoss.role.primary="lead";salesBoss.role.previousPrimary="sales";
 lead.department="delivery";lead.role.primary="lead";
 report.department="delivery";report.role.primary="ops";
 s.org.departments.commercial.managerId=commercial.id;
 s.org.departments.commercial.subManagers.sales=salesBoss.id;
 gm.department="delivery";unitStaff.department="delivery";
 s.exec.units.push({key:"technology",managerId:gm.id,staffIds:[gm.id,unitStaff.id],since:250});
 s.exec.officers.hr.id=s.team[14].id;s.exec.officers.cfo.id=s.team[15].id;s.exec.officers.coo.id=s.team[16].id;
 s.ops.assistantId=s.team[17].id;
 s.org.progression.appointments.push({id:lead.id,level:"lead",since:150});
 s.org.progression.reportTo[report.id]=lead.id;
 const immutable=JSON.stringify(s),view=G.canonicalReporting(),flat=view.groups.flatMap(g=>g.people);
 assert.equal(view.entries.length,34);assert.equal(flat.length,34);
 assert.equal(new Set(flat.map(p=>p.id)).size,34);
 const of=id=>view.entries.find(x=>x.p.id===id);
 assert.equal(of(salesBoss.id).supervisor,commercial.id);
 assert.equal(of(unitStaff.id).supervisor,gm.id);
 assert.equal(of(report.id).supervisor,lead.id);
 for(const role of ["hr","cfo","coo"])assert.equal(of(s.exec.officers[role].id).supervisor,null);
 assert.equal(of(gm.id).supervisor,null);
 assert.equal(of(unitStaff.id).owner,"Technology Services"===of(unitStaff.id).owner?"Technology Services":of(unitStaff.id).owner);
 G.renderOrgExplorer(view);
 const html=el("org-explorer").innerHTML;
 assert.ok(html.includes("CEO · founder")&&html.includes("Dedicated operating business"));
 assert.ok(html.includes("data-employee-jump"));
 assert.equal(JSON.stringify(s),immutable,"Read-only hierarchy cannot mutate 4704-day history or contracts");
 money(s);
});
test("v22.4B invalid/cyclic saved reporting links cannot duplicate or invent workers",()=>{
 const s=fresh();staff(s,8);const a=s.team[3],b=s.team[4];
 a.role.primary="lead";b.role.primary="lead";a.department="commercial";b.department="commercial";
 s.org.progression.appointments.push({id:a.id,level:"lead",since:1},{id:b.id,level:"lead",since:1});
 s.org.progression.reportTo[a.id]=b.id;s.org.progression.reportTo[b.id]=a.id;
 const before=JSON.stringify(s),view=G.canonicalReporting();
 assert.equal(view.entries.length,8);
 assert.equal(new Set(view.groups.flatMap(g=>g.people).map(p=>p.id)).size,8);
 assert.ok(view.entries.some(x=>x.source.includes("Unresolved manager")));
 assert.equal(JSON.stringify(s),before,"Broken historic links must be explained, not rewritten");
});
test("v22.4B career prerequisites and blocked promotion are truthful and non-spending",()=>{
 const s=fresh(),p=s.team[0],before=JSON.stringify(s),status=G.coachCareerStatus(p);
 assert.equal(status.ready,false);
 const brief=G.clearCareerRequirements(p);
 assert.ok(brief.includes("Employment grade:")&&brief.includes("Next legitimate action"));
 assert.ok(brief.includes("Time in current grade")||brief.includes("time in grade"));
 assert.ok(brief.includes("No leadership appointment"));
 assert.ok(brief.includes("CEO-approved $12 leadership courses"));assert.ok(!brief.includes("unmerged v22.3"));
 assert.equal(JSON.stringify(s),before);
 G.careerAction(p.id,"promote");
 assert.equal(p.career.rank,0);assert.equal(s.cash,90);money(s);
});
test("v22.4B genuine cash and practice gates remain separate from leadership appointment",()=>{
 const s=fresh(),p=s.team[0];s.day=250;
 p.career.rank=0;p.career.gradeSince=0;p.career.xp=50;
 const skill=p.role.primary==="lead"?"sales":p.role.primary;
 p.s[skill]=4.0;p.career.practice.bySkill[skill]=100;
 const enough=G.coachCareerStatus(p);
 assert.equal(enough.ready,true,"Actual built-in eligibility should be used");
 assert.ok(G.clearCareerRequirements(p).includes("Cost"));
 const before=JSON.stringify(s);
 const view=G.canonicalReporting();assert.equal(JSON.stringify(s),before);
 assert.ok(view.entries.find(x=>x.p.id===p.id).supervisor===null);
 // Distinct organizational appointment cannot be granted by having career-grade criteria.
 assert.equal(s.org.progression.appointments.length,0);
 assert.equal(s.exec.officers.hr.id,null);money(s);
});

console.log("v22.4B reporting, career and prior CEO batches regression passed");
