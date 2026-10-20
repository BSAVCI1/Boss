// Real Chromium mobile-width smoke. Uses the browser pre-installed on GitHub hosted Ubuntu runners.
const assert=require("node:assert/strict"),fs=require("node:fs"),os=require("node:os"),path=require("node:path"),cp=require("node:child_process");
const browser=["/usr/bin/google-chrome","/usr/bin/chromium","/usr/bin/chromium-browser"].find(x=>fs.existsSync(x));
assert.ok(browser,"A real Chromium browser is required for viewport smoke (not a DOM mock)");
const html=fs.readFileSync("index.html","utf8");
const instrumentation=String.raw`
window.addEventListener("error",e=>{window.__mobileErrors=(window.__mobileErrors||[]).concat(String(e.message||"unknown error"))});
document.addEventListener("DOMContentLoaded",async()=>{
 for(let i=0;i<100&&!document.documentElement.dataset.bossReady;i++)await new Promise(r=>setTimeout(r,100));
 const result={width:window.innerWidth,views:[],errors:[],checks:{}};
 try{
  const byId=id=>document.getElementById(id);
  const nav=document.querySelector(".bottom-nav");
  result.checks.bootstrapComplete=document.documentElement.dataset.bossReady==="true";
  result.checks.navPresent=!!nav;
  // v22.4D browser acceptance for simplified but still accessible management.
  const strategy=byId("today-ceo-tools"),story=byId("company-story");
  result.checks.simplifiedToday=!!strategy&&!strategy.open&&!!story&&!story.open&&byId("game-forward")?.getClientRects().length>0&&!!byId("ceo-action-center");
  if(strategy){
   strategy.open=true;
   result.checks.disclosureOpens=document.querySelector("#executive-officers-panel")?.getClientRects().length>0;
   const officeCards=[...document.querySelectorAll(".ceo-office-grid > div")];
   const first=officeCards[0]?.getBoundingClientRect(),second=officeCards[1]?.getBoundingClientRect();
   result.checks.ceoHierarchyStacked=officeCards.length===2&&first.height>0&&second.height>0&&second.top>=first.bottom-1;
   strategy.open=false;
  }
  const customer=byId("work-customers"),rivals=byId("growth-rivals"),archive=byId("upgrade-archive");
  result.checks.simplifiedManagement=!!customer&&!customer.open&&!!rivals&&!rivals.open&&!!archive&&!archive.open&&!!byId("ideas");
  result.checks.noDuplicatedQuickActions=document.querySelectorAll("#game-forward,#game-primary").length===2;
  const navRect=nav?.getBoundingClientRect();
  result.checks.navInViewport=!!navRect&&navRect.top>=0&&navRect.bottom<=window.innerHeight+3;
  for(const view of ["today","team","growth","work"]){
   const button=document.querySelector('.bottom-nav button[data-view="'+view+'"]');
   if(!button)throw Error("missing nav "+view);
   button.click();
   const panel=byId("view-"+view);
   if(panel?.hidden)throw Error(view+" hidden after navigation");
   const scrollWidth=document.documentElement.scrollWidth;
   result.views.push({name:view,scrollWidth});
   if(scrollWidth>window.innerWidth+6)throw Error(view+" horizontal overflow "+scrollWidth+" / "+window.innerWidth);
   const clipped=[...panel.querySelectorAll("button,select,input")].filter(el=>{const b=el.getBoundingClientRect(),css=getComputedStyle(el);return b.width>8&&css.visibility!=="hidden"&&b.right>window.innerWidth+6;});
   if(clipped.length)throw Error(view+" clipped controls: "+clipped.slice(0,3).map(x=>x.id||x.name||x.tagName).join(","));
  }
  document.querySelector('.bottom-nav button[data-view="team"]').click();
  const org=byId("org-settings");if(org){org.open=true;org.dispatchEvent(new Event("toggle"));}
  result.checks.customBudgets=!!document.querySelector('[data-org-policy="training"]')&&!!document.querySelector('[data-org-policy="hiring"]');
  result.checks.optionalManagers=!!document.querySelector('[data-org-subrole="sales"]')&&!!document.querySelector('[data-org-subrole="ops"]');
  result.checks.noVisibleUndefined=!document.body.innerText.includes("undefined");
  result.checks.groupedPeople=document.querySelectorAll('#people details[data-team-group]').length>0;
  const weekly=document.querySelector('#ea-weekly-report');
  if(weekly){weekly.open=true;weekly.dispatchEvent(new Event('toggle'));}
  result.checks.executiveBriefing=!!weekly&&document.querySelector('#ea-weekly-body')?.textContent.includes('Direct-report briefing');
  result.checks.serviceBoard=!!document.querySelector('#business-lines')&&document.querySelector('#business-lines').textContent.includes('General business services');
  if(sessionStorage.getItem("boss-qa-reload")!=="1"){
   const field=(dept,name)=>document.querySelector('#org-controls input[data-org-dept="'+dept+'"][data-org-policy="'+name+'"]');
   const coaching=field("commercial","coaching"),hiring=field("delivery","hiring"),payroll=field("delivery","payrollLimit");
   if(!coaching||!hiring||!payroll)throw Error("Missing player-editable department budgets");
   coaching.focus();coaching.value="137";coaching.dispatchEvent(new Event("input",{bubbles:true}));
   hiring.focus();hiring.value="68";hiring.dispatchEvent(new Event("input",{bubbles:true}));
   payroll.focus();payroll.value="2.75";payroll.dispatchEvent(new Event("input",{bubbles:true}));
   const assistant=byId("policy-budget");assistant.focus();assistant.value="19";assistant.dispatchEvent(new Event("input",{bubbles:true}));
   byId("lab-topic").value="sector";byId("lab-topic").dispatchEvent(new Event("change",{bubbles:true}));
   byId("lab-duration").value="45";byId("lab-duration").dispatchEvent(new Event("change",{bubbles:true}));
   byId("lab-forecast").value="50";byId("lab-forecast").dispatchEvent(new Event("change",{bubbles:true}));
   byId("lab-sector").value="retail";byId("lab-sector").dispatchEvent(new Event("change",{bubbles:true}));
   byId("lab-hypothesis").value="Quality improves with targeted work";byId("lab-hypothesis").dispatchEvent(new Event("input",{bubbles:true}));
   byId("ceo-priority").value="people";byId("ceo-priority").dispatchEvent(new Event("change",{bubbles:true}));
   byId("speed-select").value="3";byId("speed-select").dispatchEvent(new Event("change",{bubbles:true}));
   byId("service-line-select").value="technology";byId("service-line-select").dispatchEvent(new Event("change",{bubbles:true}));
   const snap=JSON.parse(localStorage.getItem("boss20"));
   result.checks.immediateSettingsSaved=snap.org.departments.commercial.plan.limits.coaching===137&&
    snap.org.departments.delivery.plan.limits.hiring===68&&snap.org.departments.delivery.plan.payrollLimit===2.75&&snap.ops.policy.budget===19&&snap.lab.topic==="sector"&&
    snap.lab.sector==="retail"&&snap.lab.duration===45&&snap.lab.forecast===50&&
    snap.lab.hypothesis==="Quality improves with targeted work"&&snap.ui.pendingCEO==="people"&&snap.ui.speed===3&&snap.ui.selectedService==="technology"&&snap.exec.priority==="grow";
   result.checks.visibleSaveStatus=byId("save-state")?.textContent.includes("Saved Day");
   result.errors=(window.__mobileErrors||[]);
   // Build a synthetic funded company without affecting any real player save.
   const funded=JSON.parse(localStorage.getItem("boss20"));
   funded.cash+=500;funded.bi.openingCash+=500;
   // Synthetic browser fixture: earn the first-service prerequisites before exercising IndexedDB launch persistence.
   funded.market.completed=Math.max(5,funded.market.completed);funded.rep=Math.max(35,funded.rep);
   const productSpecialist=funded.team.find(p=>p.role?.primary==="prod");if(productSpecialist)productSpecialist.s.prod=Math.max(3,productSpecialist.s.prod);
   if(!funded.org.progression.appointments.some(n=>n.level==="lead"))funded.org.progression.appointments.push({id:funded.team[0].id,level:"lead",since:funded.day,successorId:null});
   localStorage.setItem("boss20",JSON.stringify(funded));
   sessionStorage.setItem("boss-qa-pre-refresh",JSON.stringify(result));
   sessionStorage.setItem("boss-qa-reload","1");
   location.reload();return;
  }
  const first=JSON.parse(sessionStorage.getItem("boss-qa-pre-refresh"));
  result.checks.immediateSettingsSaved=first.checks.immediateSettingsSaved;
  result.checks.visibleSaveStatus=first.checks.visibleSaveStatus;
  const loaded=JSON.parse(localStorage.getItem("boss20"));
  result.checks.reloadSettingsPersisted=loaded.org.departments.commercial.plan.limits.coaching===137&&
   loaded.org.departments.delivery.plan.limits.hiring===68&&loaded.org.departments.delivery.plan.payrollLimit===2.75&&loaded.ops.policy.budget===19&&
   loaded.lab.topic==="sector"&&loaded.lab.sector==="retail"&&loaded.lab.duration===45&&loaded.lab.forecast===50&&
   loaded.lab.hypothesis==="Quality improves with targeted work"&&loaded.ui.pendingCEO==="people"&&loaded.ui.speed===3&&loaded.ui.selectedService==="technology"&&loaded.exec.priority==="grow"&&
   document.querySelector('#org-controls input[data-org-dept="commercial"][data-org-policy="coaching"]')?.value==="137"&&
   byId("policy-budget")?.value==="19"&&byId("ceo-priority")?.value==="people"&&
   byId("speed-select")?.value==="3"&&byId("service-line-select")?.value==="technology";
  result.errors=(window.__mobileErrors||[]).concat(first.errors||[]);
  if(sessionStorage.getItem("boss-qa-quota")!=="1"){
   const dayBefore=loaded.day;
   sessionStorage.setItem("boss-qa-before-idb",JSON.stringify({...result,dayBefore}));
   const original=Storage.prototype.setItem;
   Storage.prototype.setItem=function(k,v){if(k==="boss20")throw new DOMException("Full local storage","QuotaExceededError");return original.call(this,k,v);};
   try{
    document.querySelector('.bottom-nav button[data-view="today"]').click();
    byId("game-forward").click();
   }finally{Storage.prototype.setItem=original;}
   sessionStorage.setItem("boss-qa-quota","1");
   let confirmed=false;
   for(let i=0;i<90;i++){
    if(byId("save-state")?.textContent.startsWith("Saved Day ")&&byId("save-state")?.textContent.includes("extended device storage")){confirmed=true;break;}
    await new Promise(r=>setTimeout(r,100));
   }
   sessionStorage.setItem("boss-qa-indexed-saved",confirmed?"1":"0");
   let businessCommitted=false;
   if(confirmed){
    byId("service-line-select").value="technology";
    byId("launch-service-line").click();
    for(let i=0;i<90;i++){
     const business=byId("business-lines")?.textContent||"";
     if(business.includes("Technology advisory")&&byId("save-state")?.textContent.startsWith("Saved Day ")){
      businessCommitted=true;break;
     }
     await new Promise(r=>setTimeout(r,100));
    }
   }
   sessionStorage.setItem("boss-qa-indexed-line-saved",businessCommitted?"1":"0");
   location.reload();return;
  }
  const previous=JSON.parse(sessionStorage.getItem("boss-qa-before-idb"));
  result.checks.immediateSettingsSaved=previous.checks.immediateSettingsSaved;
  result.checks.reloadSettingsPersisted=previous.checks.reloadSettingsPersisted;
  result.checks.visibleSaveStatus=previous.checks.visibleSaveStatus;
  result.checks.bootstrapComplete=previous.checks.bootstrapComplete;
  result.checks.indexedFallbackCommitted=sessionStorage.getItem("boss-qa-indexed-saved")==="1";
   result.checks.indexedLineCommitted=sessionStorage.getItem("boss-qa-indexed-line-saved")==="1";
  const oldLocal=JSON.parse(localStorage.getItem("boss20"));
  const restoredDay=Number(byId("day").textContent.replace("Day ",""));
  result.checks.indexedFallbackReload=Number.isFinite(restoredDay)&&restoredDay>previous.dayBefore&&restoredDay>oldLocal.day;
  result.checks.indexedDayEvidence={before:previous.dayBefore,local:oldLocal.day,restored:restoredDay,status:byId("save-state")?.textContent};
   const db=await new Promise(resolve=>{const request=indexedDB.open("BossSafeProgress",1);request.onsuccess=()=>resolve(request.result);request.onerror=()=>resolve(null);});
   let recovered=null;
   if(db)recovered=await new Promise(resolve=>{const tx=db.transaction("game","readonly"),request=tx.objectStore("game").get("boss20");request.onsuccess=()=>resolve(JSON.parse(request.result?.payload||"null"));request.onerror=()=>resolve(null);});
   result.checks.indexedLineNoDoubleCharge=!!recovered&&recovered.exec.lines.filter(x=>x.key==="technology").length===1&&
    recovered.bi.totals.investments===120&&recovered.exec.lines.find(x=>x.key==="technology").spent===120&&
    byId("business-lines")?.textContent.includes("Technology advisory");
   if(sessionStorage.getItem("boss-qa-v21")!=="1"){
    const activate=document.querySelector('#business-units button[data-unit-action="activate"][data-unit-key="technology"]');
    result.checks.unitButtonVisible=!!activate;
    if(activate)activate.click();
    let committed=false;
    for(let i=0;i<90;i++){
     if(document.querySelector('#business-units details[data-unit-open="technology"]')&&byId("save-state")?.textContent.startsWith("Saved Day ")&&byId("save-state")?.textContent.includes("extended device storage")){committed=true;break;}
     await new Promise(r=>setTimeout(r,100));
    }
    result.checks.unitActivationCommitted=committed;
    sessionStorage.setItem("boss-qa-v21-result",JSON.stringify(result));
    sessionStorage.setItem("boss-qa-v21","1");
    location.reload();return;
   }
   const prevV21=JSON.parse(sessionStorage.getItem("boss-qa-v21-result"));
   result.checks={...prevV21.checks,...result.checks};
   result.errors=result.errors.concat(prevV21.errors||[]);
   result.checks.unitActivationReloaded=!!recovered&&recovered.exec.units.filter(u=>u.key==="technology").length===1&&
    recovered.bi.totals.investments===120&&recovered.exec.lines.filter(x=>x.key==="technology").length===1&&
    byId("business-units")?.textContent.includes("operating unit");

   if(sessionStorage.getItem("boss-qa-v212")!=="1"){
    document.querySelector('.bottom-nav button[data-view="growth"]').click();
    const details=document.querySelector('#business-units details[data-unit-open="technology"]');
    if(!details)throw Error("v21.2 unit controls missing");
    details.open=true;
    const readUnit=()=>new Promise(resolve=>{
      const r=indexedDB.open("BossSafeProgress",1);
      r.onsuccess=()=>{const q=r.result.transaction("game","readonly").objectStore("game").get("boss20");q.onsuccess=()=>resolve(JSON.parse(q.result?.payload||"null")?.exec?.units?.find(u=>u.key==="technology"));q.onerror=()=>resolve(null)};
      r.onerror=()=>resolve(null);
    });
    let ok=true;
    const revenue=byId("unit-revenue-technology"),coaching=byId("unit-coaching-technology");
    if(!revenue||!coaching)throw Error("unit authority fields missing");
    const originalRevenue=Number((await readUnit())?.plan?.revenueTarget||0);
    revenue.focus();
    for(const partial of ["3","30","300","3000","30000","300000"]){
     revenue.value=partial;revenue.dispatchEvent(new Event("input",{bubbles:true}));
    }
    await new Promise(r=>setTimeout(r,800));
    result.checks.multiDigitDraftStable=revenue.isConnected&&byId("unit-revenue-technology")===revenue&&revenue.value==="300000";
    result.checks.draftDoesNotCommit=(await readUnit())?.plan?.revenueTarget===originalRevenue;
    for(const [id,value] of [["unit-coaching-technology",12],["unit-peraction-technology",4],["unit-quality-technology",88]]){
      const input=byId(id);if(!input){ok=false;break;}
      input.focus();input.value=String(value);input.dispatchEvent(new Event("input",{bubbles:true}));
    }
    if(ok)document.querySelector('#business-units button[data-unit-action="apply-draft"][data-unit-key="technology"]')?.click();
    let saved=false;
    for(let i=0;i<100;i++){
      const unit=await readUnit();
      if(unit?.plan?.coachingLimit===12&&unit?.plan?.perAction===4&&unit?.plan?.qualityTarget===88&&unit?.plan?.revenueTarget===300000){saved=true;break;}
      await new Promise(r=>setTimeout(r,100));
    }
    result.checks.unitAuthoritySaved=ok&&saved;
    sessionStorage.setItem("boss-qa-v212-result",JSON.stringify(result));
    sessionStorage.setItem("boss-qa-v212","1");
    location.reload();return;
   }
   const v212prev=JSON.parse(sessionStorage.getItem("boss-qa-v212-result"));
   result.checks={...v212prev.checks,...result.checks};
   result.errors=result.errors.concat(v212prev.errors||[]);
   // v21.3.1: exercise a real native SELECT during multiple live game updates.
   document.querySelector('.bottom-nav button[data-view="growth"]').click();
   const unitDetails=document.querySelector('#business-units details[data-unit-open="technology"]');
   if(unitDetails)unitDetails.open=true;
   const gmPicker=byId("unit-gm-technology"),workerPicker=byId("unit-employee-technology");
   if(!gmPicker||!workerPicker)throw Error("GM and teammate selectors are required");
   const originalGMValue=gmPicker.value,originalWorkerValue=workerPicker.value;
   const pickerDay=Number(byId("day")?.textContent?.replace("Day ",""));
   gmPicker.focus();gmPicker.dispatchEvent(new Event("pointerdown",{bubbles:true}));
   await new Promise(r=>setTimeout(r,1600)); // More than three active 3x simulation ticks.
   result.checks.nativeGMDropdownStable=gmPicker===byId("unit-gm-technology")&&gmPicker.isConnected&&gmPicker.value===originalGMValue;
   result.checks.nativeTeammateDropdownStable=workerPicker===byId("unit-employee-technology")&&workerPicker.isConnected&&workerPicker.value===originalWorkerValue;
   const liveDay=Number(JSON.parse(localStorage.getItem("boss20")||"null")?.day);
   result.checks.tickDuringPickerContext={dayBefore:pickerDay,dayAfter:liveDay,pausedControl:byId("pause")?.textContent,saveStatus:byId("save-state")?.textContent,modalOpen:!byId("modal")?.hidden};
   const savedDay=Number((byId("save-state")?.textContent||"").match(/Saved Day (\d+)/)?.[1]);
   result.checks.tickContinuesDuringPicker=liveDay>pickerDay||savedDay>pickerDay;
   gmPicker.dispatchEvent(new Event("change",{bubbles:true}));
   await new Promise(r=>setTimeout(r,1050)); // UI catches up after mobile picker dismissal.
   result.checks.nativePickerReconciled=!!byId("unit-gm-technology")&&!!byId("unit-employee-technology");
   const selectTeammate=byId("unit-employee-technology");
   const eligible=[...selectTeammate.options].find(option=>option.value!=="");
   if(!eligible)throw Error("QA company requires one eligible available teammate");
   selectTeammate.focus();selectTeammate.value=eligible.value;
   selectTeammate.dispatchEvent(new Event("change",{bubbles:true}));
   await new Promise(r=>setTimeout(r,1100));
   result.checks.teammateDraftSurvivesRepaint=byId("unit-employee-technology")?.value===eligible.value;

   const qualityField=byId("unit-quality-technology"),authorityDetails=qualityField?.closest("details.aux-details");
   if(!qualityField)throw Error("Unit quality field missing");
   if(authorityDetails)authorityDetails.open=true;
   qualityField.focus();qualityField.value="8";qualityField.dispatchEvent(new Event("input",{bubbles:true}));
   await new Promise(r=>setTimeout(r,1200));
   result.checks.partialUnitNumericProtected=qualityField.isConnected&&byId("unit-quality-technology")===qualityField&&qualityField.value==="8";
   qualityField.value="88";qualityField.dispatchEvent(new Event("input",{bubbles:true}));qualityField.blur();
   await new Promise(r=>setTimeout(r,1000));
   result.checks.unitAuthorityDisclosureRetained=byId("unit-quality-technology")?.closest("details.aux-details")?.open===true;
   // v22.0.1: more than one nested operating-unit accordion must survive several real game ticks.
   const unitBefore=document.querySelector('#business-units details[data-unit-open="technology"]');
   const supportBefore=unitBefore?.querySelector("details.aux-details");
   const scorecardBefore=byId("unit-quality-technology")?.closest("details.aux-details");
   if(supportBefore&&scorecardBefore){supportBefore.open=true;scorecardBefore.open=true;}
   await new Promise(r=>setTimeout(r,2500)); // Three live 3x game-day timers should request a unit re-render.
   const unitAfter=document.querySelector('#business-units details[data-unit-open="technology"]');
   const nestedAfter=[...(unitAfter?.querySelectorAll("details.aux-details")||[])];
   result.checks.allGMAuthoritySectionsRetained=!!unitAfter?.open&&nestedAfter.length>=3&&
    nestedAfter[0].open===true&&!!byId("unit-quality-technology")?.closest("details.aux-details")?.open;
   // v22.2: new CEO executive controls preserve nested disclosure state while game days advance.
   document.querySelector('.bottom-nav button[data-view="today"]').click();
   const executivePanels=[...document.querySelectorAll('#executive-officers details[data-executive-panel]')];
   if(executivePanels.length!==3)throw Error("Expected three earned executive leadership sections");
   executivePanels[0].open=true;executivePanels[1].open=true;
   await new Promise(r=>setTimeout(r,2000));
   const preserved=[...document.querySelectorAll('#executive-officers details[data-executive-panel]')];
   result.checks.executivePanelsStable=preserved.length===3&&preserved[0].open===true&&preserved[1].open===true;
   result.checks.executiveNoAutomaticCEOAppointment=!!byId("executive-officer-count")?.textContent?.includes("0/3 appointed");
   // v21.4c: corporate manager budget remains editable throughout a live mobile refresh.
   document.querySelector('.bottom-nav button[data-view="team"]').click();
   const leadershipDetails=byId("leadership-details");if(leadershipDetails)leadershipDetails.open=true;
    const hiringField=byId("management-hire-budget"),slotsField=byId("management-hire-slots");
   if(!hiringField||!slotsField)throw Error("Manager hiring authorization fields missing");
   const hiringPanel=hiringField.closest("details.aux-details");
   if(hiringPanel)hiringPanel.open=true;
   hiringField.focus();
   for(const part of ["1","12","120","1200"]){hiringField.value=part;hiringField.dispatchEvent(new Event("input",{bubbles:true}));}
   await new Promise(r=>setTimeout(r,800));
   result.checks.managerHiringDraftStable=hiringField.isConnected&&byId("management-hire-budget")===hiringField&&hiringField.value==="1200";
   result.checks.managerHiringStillRequiresApply=!!(hiringPanel?.open)&&slotsField.isConnected;
   const policySnapshot=await new Promise(resolve=>{
     const q=indexedDB.open("BossSafeProgress",1);
     q.onerror=()=>resolve(null);
     q.onsuccess=()=>{
       const request=q.result.transaction("game","readonly").objectStore("game").get("boss20");
       request.onsuccess=()=>{try{resolve(JSON.parse(request.result?.payload||"null")?.org?.progression?.operations||null)}catch{resolve(null)}};
       request.onerror=()=>resolve(null);
     };
   });
   result.checks.managerHiringBudgetNotAutoCommitted=policySnapshot?.hireBudget===0;
   hiringField.blur();
   await new Promise(r=>setTimeout(r,800));
   const restoredUnit=recovered?.exec?.units.find(u=>u.key==="technology");
   result.checks.unitAuthorityReloaded=restoredUnit?.plan?.revenueTarget===300000&&restoredUnit?.plan?.coachingLimit===12&&
    restoredUnit.plan.perAction===4&&restoredUnit.plan.qualityTarget===88&&
    restoredUnit.plan.spent===0&&recovered.bi.totals.investments===120&&
    byId("unit-coaching-technology")?.value==="12"&&byId("unit-quality-technology")?.value==="88";

 }catch(e){result.errors.push(String(e.stack||e));}
 document.title="BOSS_QA:"+btoa(unescape(encodeURIComponent(JSON.stringify(result))));
});
`;
const file=path.join(fs.mkdtempSync(path.join(os.tmpdir(),"boss-mobile-")),"index.html");
const qaHtml=html.replace("S=load();if(!S)fresh();",`window.__bossQA={state:()=>S,tick:()=>{const before=paused;paused=false;try{tick()}finally{paused=before;clearTimeout(clock)}},renderCEOFocus,renderCEODecisions,pause:()=>{paused=true;clearTimeout(clock)},speed:value=>{spd=value},resetEditShield:()=>{editingActive=false;editingControl=null;editingCooldownUntil=0;if(document.activeElement?.matches?.(EDITABLE_CONTROL))document.activeElement.blur()},grow:n=>{while(S.team.length<n){const p=createPerson();ensureCareer(p);ensureRole(p);ensureDepartment(p);ensurePerformance(p,S.day);S.team.push(p);}structural='';renderStructure();refresh()}};S=load();if(!S)fresh();`);
fs.writeFileSync(file,qaHtml.replace("</body>","<script>"+instrumentation+"</script></body>"));
const profile=fs.mkdtempSync(path.join(os.tmpdir(),"boss-cdp-"));
const args=["--headless=new","--no-sandbox","--disable-gpu","--disable-dev-shm-usage","--hide-scrollbars","--allow-file-access-from-files","--remote-debugging-port=0","--user-data-dir="+profile,"about:blank"];
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const http=require("node:http");
function getJson(url){
 return new Promise((resolve,reject)=>{
  const req=http.get(url,res=>{let raw="";res.on("data",x=>raw+=x);res.on("end",()=>{try{resolve(JSON.parse(raw))}catch(e){reject(e)}})});req.on("error",reject);req.setTimeout(2000,()=>req.destroy(new Error("HTTP timed out")));
 });
}
async function runBrowser(){
 assert.ok(globalThis.WebSocket,"Enable global browser WebSocket: node --experimental-websocket");
 const chrome=cp.spawn(browser,args,{stdio:["ignore","ignore","pipe"]});
 let stderr="";chrome.stderr.on("data",b=>{stderr=(stderr+b.toString()).slice(-2500)});
 let ws;
 try{
  let tabs,port=0;
  const portFile=path.join(profile,"DevToolsActivePort");
  for(let i=0;i<130;i++){
   if(fs.existsSync(portFile)){const candidate=Number(fs.readFileSync(portFile,"utf8").split(String.fromCharCode(10))[0]);if(candidate>0)port=candidate;}
   if(port){try{tabs=await getJson("http://127.0.0.1:"+port+"/json");if(tabs?.length)break;}catch{}}
   if(chrome.exitCode!==null)break;
   await sleep(150);
  }
  assert.ok(tabs?.length,"Chromium DevTools did not open: "+stderr);
  const tab=tabs.find(x=>x.type==="page")||tabs[0];
  ws=new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{const wait=setTimeout(()=>reject(new Error("CDP connection timeout")),8000);ws.addEventListener("open",()=>{clearTimeout(wait);resolve()},{once:true});ws.addEventListener("error",()=>{clearTimeout(wait);reject(new Error("CDP WebSocket failed"))},{once:true})});
  const pending=new Map();let id=0;
  ws.addEventListener("message",ev=>{try{const msg=JSON.parse(ev.data);if(msg.id&&pending.has(msg.id)){pending.get(msg.id)(msg);pending.delete(msg.id);}}catch{}});
  function send(method,params={}){
   return new Promise((resolve,reject)=>{const seq=++id;const timer=setTimeout(()=>{pending.delete(seq);reject(new Error("CDP timeout "+method))},10000);
    pending.set(seq,msg=>{clearTimeout(timer);if(msg.error)reject(Error(method+": "+JSON.stringify(msg.error)));else resolve(msg.result)});
    ws.send(JSON.stringify({id:seq,method,params}));
   });
  }
  await send("Page.enable");await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await send("Page.navigate",{url:"file://"+file});
  let title="";
  for(let i=0;i<195;i++){
   try{const result=await send("Runtime.evaluate",{expression:"document.title",returnByValue:true});title=result.result?.value||"";if(title.startsWith("BOSS_QA:"))break;}catch{}
   await sleep(150);
  }
  assert.ok(title.startsWith("BOSS_QA:"),"UI smoke script did not finish");
  const outcome=JSON.parse(Buffer.from(title.slice(8),"base64").toString("utf8"));
  console.log("Mobile browser verification:",JSON.stringify(outcome));
  assert.ok(outcome.width>=385&&outcome.width<=395,"Unexpected viewport, no mobile acceptance: "+outcome.width);
  assert.equal(outcome.views.length,4,"All four tabs must navigate");
  assert.equal(outcome.checks.bootstrapComplete,true,"Boss asynchronous save recovery bootstrap must complete");
  assert.equal(outcome.checks.navPresent,true);
   assert.equal(outcome.checks.simplifiedToday,true,"CEO dashboard and simulation actions visible without opening dossiers");
   assert.equal(outcome.checks.disclosureOpens,true,"Advanced CEO offices must expand");
   assert.equal(outcome.checks.simplifiedManagement,true,"Customer, rival and research archive should start collapsed");
   assert.equal(outcome.checks.noDuplicatedQuickActions,true,"Only one set of fast simulation actions");
  assert.equal(outcome.checks.navInViewport,true);
  assert.equal(outcome.checks.ceoHierarchyStacked,true,"CEO hierarchy must stack as full-width mobile rows");
  assert.equal(outcome.checks.customBudgets,true);
  assert.equal(outcome.checks.optionalManagers,true);
  assert.equal(outcome.checks.noVisibleUndefined,true);
  assert.equal(outcome.checks.groupedPeople,true,"Team must show reporting-line groups at 390px");
  assert.equal(outcome.checks.executiveBriefing,true,"EA weekly report must provide actual content");
  assert.equal(outcome.checks.serviceBoard,true,"Portfolio page must show consolidated services");
  assert.equal(outcome.checks.immediateSettingsSaved,true,"Typing must immediately save budgets and other player fields");
  assert.equal(outcome.checks.reloadSettingsPersisted,true,"Real Chromium refresh must keep all edited settings and pending CEO draft");
  assert.equal(outcome.checks.visibleSaveStatus,true,"Save confirmation should be visible");
  assert.equal(outcome.checks.indexedFallbackCommitted,true,"Quota failure must save full company to IndexedDB");
  assert.equal(outcome.checks.indexedFallbackReload,true,"After reload Boss must use newer IndexedDB day, not stale local day");
  assert.equal(outcome.checks.indexedLineCommitted,true,"Business purchase in IndexedDB mode must commit before confirmation");
  assert.equal(outcome.checks.indexedLineNoDoubleCharge,true,"Paid line must survive reload with one $120 investment and no duplicates");
  assert.equal(outcome.checks.unitButtonVisible,true,"Existing paid service must offer free unit conversion");
  assert.equal(outcome.checks.unitActivationCommitted,true,"Conversion must commit to fallback storage before confirmation");
  assert.equal(outcome.checks.unitActivationReloaded,true,"After reload exactly one unit remains and no $120 fee was repeated");
   assert.equal(outcome.checks.unitAuthoritySaved,true,"GM budget limits must confirm in extended storage");
  assert.equal(outcome.checks.multiDigitDraftStable,true,"Full six-digit GM revenue input must retain the original DOM field");
  assert.equal(outcome.checks.draftDoesNotCommit,true,"Partial numeric drafts must never silently authorize or post budget changes");
   assert.equal(outcome.checks.unitAuthorityReloaded,true,"GM budget and quality goal must survive mobile reload without a new purchase");
  assert.equal(outcome.checks.nativeGMDropdownStable,true,"Opened GM native picker must not be replaced by game ticks");
  assert.equal(outcome.checks.nativeTeammateDropdownStable,true,"Dedicated colleague picker must keep DOM identity");
  assert.equal(outcome.checks.tickContinuesDuringPicker,true,"Game must progress and durably save while native selector stays open, including IndexedDB fallback");
  assert.equal(outcome.checks.nativePickerReconciled,true,"UI should refresh after select completes");
  assert.equal(outcome.checks.partialUnitNumericProtected,true,"Partial unit budget edits must not be overwritten mid-typing");
  assert.equal(outcome.checks.teammateDraftSurvivesRepaint,true,"Chosen teammate must remain selected until Transfer is clicked");
  assert.equal(outcome.checks.unitAuthorityDisclosureRetained,true,"Editing must not collapse the authority panel");
  assert.equal(outcome.checks.allGMAuthoritySectionsRetained,true,"All open GM subsections must remain expanded across live repaints");
  assert.equal(outcome.checks.executivePanelsStable,true,"HR and CFO executive panels must remain open through simulated mobile game ticks");
  assert.equal(outcome.checks.executiveNoAutomaticCEOAppointment,true,"A migrated company must not invent CEO-approved executive appointments");
  assert.equal(outcome.checks.managerHiringDraftStable,true,"Manager recruitment budget must allow uninterrupted multi-digit typing");
  assert.equal(outcome.checks.managerHiringStillRequiresApply,true,"Manager policy disclosure and slots must remain editable");
  assert.equal(outcome.checks.managerHiringBudgetNotAutoCommitted,true,"Typing manager hiring budget must not authorize money until Apply is pressed");
  assert.deepEqual(outcome.errors,[]);
  await send("Emulation.setDeviceMetricsOverride",{width:414,height:896,deviceScaleFactor:1,mobile:true});
  await sleep(150);
  const layout=await send("Runtime.evaluate",{expression:"(()=>{const c=[...document.querySelector('.ceo-office-grid').children];return{width:innerWidth,stacked:c.length===2&&c[1].getBoundingClientRect().top>=c[0].getBoundingClientRect().bottom-1,overflow:document.documentElement.scrollWidth>innerWidth+6}})()",returnByValue:true});
  assert.equal(layout.result.value.width,414);
  assert.equal(layout.result.value.stacked,true,"CEO reporting cards must remain stacked at 414px");
  assert.equal(layout.result.value.overflow,false,"No horizontal overflow at 414px");
  console.log("Boss 414px mobile layout verification:",JSON.stringify(layout.result.value));
  // v22.4B: actual Chromium pixels, not synthetic or DOM-only screenshots.
  // Existing input, tick, reload and IndexedDB assertions above remain mandatory.
  const evidenceDir=path.join("reports","v22-4b-mobile");
  fs.mkdirSync(evidenceDir,{recursive:true});
  async function capturePeople(width,height,kind){
    await send("Emulation.setDeviceMetricsOverride",{width,height,deviceScaleFactor:1,mobile:true});
    // Navigation scrolls to top asynchronously. Wait before scrolling to evidence.
    await send("Runtime.evaluate",{expression:"document.querySelector('.bottom-nav button[data-view=\"team\"]').click()",returnByValue:true});
    await sleep(240);
    const prep=await send("Runtime.evaluate",{expression:kind==="organization"?
     "(()=>{const root=document.getElementById('org-explorer');return {people:document.querySelectorAll('#people details[data-employee-id]').length,tree:!!root&&root.textContent.includes('CEO'),width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+6}})()":
     "(()=>{const g=document.querySelector('#people details[data-team-group]');if(g)g.open=true;const p=g?.querySelector('details[data-employee-id]');if(p)p.open=true;const c=p?.querySelector('details[data-career-id]');if(c)c.open=true;const x=p?.querySelector('.org-career-glance');return {people:document.querySelectorAll('#people details[data-employee-id]').length,career:!!x&&x.textContent.includes('Employment grade'),width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+6,blockedPromotionHidden:!p?.querySelector('button[data-career=\"promote\"]')||p.querySelector('button[data-career=\"promote\"]').hidden}})()",
      returnByValue:true});
    const info=prep.result?.value;
    assert.equal(info.width,width,"Wrong mobile screenshot viewport");
    assert.equal(info.overflow,false,"People view horizontal overflow");
    assert.ok(info.people>0,"Actual browser roster is empty");
    assert.equal(info[kind==="organization"?"tree":"career"],true,"Actual people view missing "+kind);
    if(kind==="career")assert.equal(info.blockedPromotionHidden,true,"Unmet promotion must be hidden");
    await sleep(140);
    const selector=kind==="organization"?"#org-explorer":"#people .org-career-glance";
    const scrollExpression="(()=>{const target=document.querySelector("+JSON.stringify(selector)+");if(!target)return null;document.documentElement.style.scrollBehavior='auto';document.body.style.scrollBehavior='auto';const y=window.scrollY+target.getBoundingClientRect().top-165;window.scrollTo({top:Math.max(0,y),behavior:'instant'});const b=target.getBoundingClientRect();return{scrollY:window.scrollY,targetTop:b.top,targetBottom:b.bottom,viewport:innerHeight}})()";
    const scroll=await send("Runtime.evaluate",{expression:scrollExpression,returnByValue:true});
    assert.ok(scroll.result?.value,"Screenshot target not found");
    await sleep(250);
    const visibility=await send("Runtime.evaluate",{expression:"(()=>{const b=document.querySelector("+JSON.stringify(selector)+")?.getBoundingClientRect();return b?{top:b.top,bottom:b.bottom,scrollY:window.scrollY}:null})()",returnByValue:true});
    const rect=visibility.result?.value;
    assert.ok(rect&&rect.top>=0&&rect.top<height-105,"Screenshot target must actually be visible: "+JSON.stringify(rect));
    if(kind==="career")assert.ok(rect.scrollY>400,"Career screenshot cannot be the top of Team view");
    const shot=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false,fromSurface:true});
    const filename=path.join(evidenceDir,"boss-"+kind+"-"+width+"px.png");
    assert.ok(shot.data?.length>1500,"Empty Chromium evidence");
    fs.writeFileSync(filename,Buffer.from(shot.data,"base64"));
    console.log("PASS screenshot "+filename+" · "+JSON.stringify(info));
  }
  await capturePeople(390,844,"organization");
  await capturePeople(390,844,"career");
  await capturePeople(414,896,"organization");
  await capturePeople(414,896,"career");
  // v22.4C actual mobile screenshot proof; the browser runs the real game and original save mechanics.
  async function captureCEO(width,height,page){
   await send("Emulation.setDeviceMetricsOverride",{width,height,deviceScaleFactor:1,mobile:true});
   const init=page==="today"?
     "(()=>{document.querySelector('.bottom-nav button[data-view=\"today\"]').click();return document.getElementById('ceo-priority-content').textContent})()":
     "(()=>{document.querySelector('.bottom-nav button[data-view=\"growth\"]').click();document.getElementById('property-options').open=true;const b=document.querySelector('#property-purchase-options button[data-property-action=\"preview\"][data-property-key=\"office\"]');if(!b)throw Error('No property comparison action');b.click();return document.getElementById('property-decision-preview').textContent})()";
   const initResult=await send("Runtime.evaluate",{expression:init,returnByValue:true,awaitPromise:true});
   const content=initResult.result?.value||"";
   assert.ok(content.includes(page==="today"?"CEO approvals pending":"CEO approval preview"),"Missing real "+page+" decision experience: "+JSON.stringify(initResult).slice(0,700));
   if(page==="property")assert.ok(content.includes("One-time cash out")&&content.includes("Payroll + premises runway after"),"No real quote breakdown");
   await sleep(240);
   const selector=page==="today"?"#ceo-priority-card":"#property-decision-preview";
   const moved=await send("Runtime.evaluate",{expression:"(()=>{const t=document.querySelector("+JSON.stringify(selector)+");if(!t||t.hidden)return null;document.documentElement.style.scrollBehavior='auto';document.body.style.scrollBehavior='auto';window.scrollTo({top:Math.max(0,window.scrollY+t.getBoundingClientRect().top-12),behavior:'instant'});return{width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth+6}})()",returnByValue:true});
   assert.ok(moved.result?.value,"Cannot scroll to "+page);
   assert.equal(moved.result.value.overflow,false,"CEO "+page+" horizontal overflow "+width);
   assert.equal(moved.result.value.width,width);
   await sleep(200);
   const rect=await send("Runtime.evaluate",{expression:"(()=>{const t=document.querySelector("+JSON.stringify(selector)+");const b=t.getBoundingClientRect();return {top:b.top,bottom:b.bottom,scrollY:window.scrollY}})()",returnByValue:true});
   assert.ok(rect.result?.value?.top>=0&&rect.result.value.top<height-100,"CEO "+page+" screenshot target not in viewport "+JSON.stringify(rect.result?.value));
   const shot=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false,fromSurface:true});
   assert.ok(shot.data?.length>1500,"Screenshot absent "+page);
   const dir=path.join("reports","v22-4c-mobile");fs.mkdirSync(dir,{recursive:true});
   const filename=path.join(dir,"boss-"+(page==="today"?"ceo-today":"office-comparison")+"-"+width+"px.png");
   fs.writeFileSync(filename,Buffer.from(shot.data,"base64"));
   console.log("PASS v22.4C real screenshot "+filename+" "+JSON.stringify({viewport:width,target:rect.result.value}));
  }
  await captureCEO(390,844,"today");
  await captureCEO(390,844,"property");
  await captureCEO(414,896,"today");
  await captureCEO(414,896,"property");
  // v22.4D real Chromium screenshots at both required mobile widths.
  const uxDir=path.join("reports","v22-4d-mobile");fs.mkdirSync(uxDir,{recursive:true});
  for(const [width,height] of [[390,844],[414,896]]){
   await send("Emulation.setDeviceMetricsOverride",{width,height,deviceScaleFactor:1,mobile:true});
   for(const tab of ["today","growth"]){
    const selector=tab==="today"?"#ceo-priority-card":"#ideas";
    const navSelector='.bottom-nav button[data-view="'+tab+'"]';
    await send("Runtime.evaluate",{expression:"document.querySelector("+JSON.stringify(navSelector)+").click()",returnByValue:true});
    await sleep(240);
    const expression="(()=>{const t=document.querySelector("+JSON.stringify(selector)+");if(!t)return null;document.documentElement.style.scrollBehavior='auto';window.scrollTo({top:Math.max(0,window.scrollY+t.getBoundingClientRect().top-12),behavior:'instant'});return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+6,top:t.getBoundingClientRect().top,archiveOpen:document.getElementById('upgrade-archive').open,active:!!document.getElementById('ideas').textContent}})()";
    const state=await send("Runtime.evaluate",{expression,returnByValue:true}),check=state.result?.value;
    assert.ok(check&&check.width===width&&!check.overflow&&check.active,"v22.4D mobile target invalid "+JSON.stringify(check));
    await sleep(210);
    const shot=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false,fromSurface:true});
    assert.ok(shot.data?.length>1500,"Missing v22.4D screenshot");
    const filename=path.join(uxDir,"boss-simplified-"+tab+"-"+width+"px.png");
    fs.writeFileSync(filename,Buffer.from(shot.data,"base64"));
    console.log("PASS v22.4D real screenshot "+filename+" "+JSON.stringify(check));
   }
  }

  // v22.4.1: actual game engine and DOM nodes through 21 live day ticks at three speeds.
  const ceoDir=path.join("reports","v22-4-1-mobile");fs.mkdirSync(ceoDir,{recursive:true});
  for(const [width,height] of [[390,844],[414,896]]){
   await send("Emulation.setDeviceMetricsOverride",{width,height,deviceScaleFactor:1,mobile:true});
   const logic=String.raw`(async()=>{
    document.querySelector('.bottom-nav button[data-view="today"]').click();
    const qa=window.__bossQA,s=qa.state();qa.pause();qa.resetEditShield();
    qa.grow(9);
    s.day=4900;s.nextEv=999999;s.world.nextEvent=999999;s.ev=null;
    s.cash+=10000;s.bi.openingCash+=10000;
    for(const [i,role] of ["hr","cfo","coo"].entries()){
     const o=s.exec.officers[role];o.id=s.team[4+i].id;o.mandate=true;o.authoritySince=4895;
    }
    s.world.activeEvent={id:4900,opened:4900,until:4950,type:"referrals",sector:s.market.focus};
    qa.renderCEOFocus();qa.renderCEODecisions();
    const panel=document.getElementById("ceo-more-accountable");
    if(!panel)throw Error("More accountable leaders missing");
    const summaries=document.querySelectorAll("#ceo-action-center button[data-ceo-action=opportunity]");
    if(summaries.length!==2||document.querySelectorAll("#exec-inbox button[data-world-event]").length)
     throw Error("Duplicate market decisions");
    panel.open=true;
    const summary=panel.querySelector("summary");summary.setAttribute("tabindex","0");summary.focus();
    const day=s.day;
    const checks=[];
    for(const speed of [1,3,8]){
     qa.speed(speed);
     for(let n=0;n<7;n++){
      const dayBefore=s.day;
      for(let attempts=0;attempts<100&&s.day===dayBefore;attempts++){
       qa.tick();
       await new Promise(r=>setTimeout(r,40)); // IndexedDB write acknowledgment precedes next tick.
      }
      if(s.day!==dayBefore+1)throw Error("A real game day failed to commit at "+speed+"x: "+dayBefore+" → "+s.day);
     }
     checks.push({speed,day:s.day,open:panel.open,same:document.getElementById("ceo-more-accountable")===panel,focus:document.activeElement===summary});
    }
    return{checks,advanced:s.day-day===21,stillOpen:panel.open,same:document.getElementById("ceo-more-accountable")===panel,focus:document.activeElement===summary,
      overflow:document.documentElement.scrollWidth>innerWidth+6,review:!!document.getElementById("ceo-strategy-review"),
      actionable:document.querySelectorAll("#ceo-action-center button[data-ceo-action=opportunity]").length};
   })()`;
   const response=await send("Runtime.evaluate",{expression:logic,returnByValue:true,awaitPromise:true});
   if(response.exceptionDetails)throw Error("v22.4.1 browser fixture failure: "+JSON.stringify(response.exceptionDetails));
   const result=response.result?.value;console.log("v22.4.1 actual browser CEO ticks",JSON.stringify(result));
   assert.ok(result?.advanced&&result.stillOpen&&result.same&&result.focus&&!result.overflow&&result.review,
     "CEO disclosures/focus/overflow failed after 21 real game days");
   assert.ok(result.checks.every(x=>x.open&&x.same&&x.focus),"A 1x/3x/8x tick unmounted leaders panel");
   assert.equal(result.actionable,2,"Only one market acceptance/rejection pair allowed");
   for(const kind of ["overview","strategy"]){
    const selector=kind==="overview"?"#ceo-priority-card":"#ceo-strategy-review";
    await send("Runtime.evaluate",{expression:"(()=>{const t=document.querySelector("+JSON.stringify(selector)+");const y=window.scrollY+t.getBoundingClientRect().top-8;window.scrollTo(0,Math.max(0,y));return t.getBoundingClientRect().top})()",returnByValue:true});
    await sleep(200);
    const shot=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false,fromSurface:true});
    assert.ok(shot.data?.length>1500,"Missing real Chromium screenshot");
    const filename=path.join(ceoDir,"boss-"+kind+"-"+width+"px.png");
    fs.writeFileSync(filename,Buffer.from(shot.data,"base64"));
    console.log("PASS v22.4.1 screenshot "+filename);
   }
  }
  // v22.5A1: genuine owner-size Chromium policy UX. Interact solely via the
  // production DOM controls; management functions live inside the game's IIFE.
  const policyDir=path.join("reports","v22-5a1-mobile");fs.mkdirSync(policyDir,{recursive:true});
  for(const [width,height] of [[390,844],[414,896]]){
   await send("Emulation.setDeviceMetricsOverride",{width,height,deviceScaleFactor:1,mobile:true});
   for(const stage of ["selection","comparison","approval"]){
    const expression=String.raw`(async()=>{
     const stage=__BOSS_STAGE__,preset=innerWidth===390?"balanced":"aggressive";
     document.querySelector('.bottom-nav button[data-view="today"]').click();
     const qa=window.__bossQA;qa.pause();qa.resetEditShield();
     const s=qa.state(),root=document.getElementById("management-policy-center");
     if(!root)throw Error("Missing CEO Today management policy center");
     const saved=async()=>{
       const local=JSON.parse(localStorage.getItem("boss20")||"null");
       // Boss may have switched to its verified IndexedDB fallback earlier
       // in this same real Chromium regression; localStorage is then stale.
       const indexed=await new Promise(resolve=>{
         const open=indexedDB.open("BossSafeProgress",1);
         open.onerror=()=>resolve(null);
         open.onsuccess=()=>{
           const db=open.result;
           if(!db.objectStoreNames.contains("game")){db.close();resolve(null);return;}
           const req=db.transaction("game","readonly").objectStore("game").get("boss20");
           req.onsuccess=()=>{let v=null;try{v=JSON.parse(req.result?.payload||"null")}catch{}db.close();resolve(v)};
           req.onerror=()=>{db.close();resolve(null)};
         };
       });
       return indexed&&Number(indexed._saveRevision)>Number(local?._saveRevision||0)?indexed:local;
     };
     const scopes=x=>JSON.stringify({
       hiring:x.org.progression.operations.hireBudget,
       slots:x.org.progression.operations.hireSlots,
       payroll:x.org.progression.authorityDaily,
       departments:Object.fromEntries(Object.entries(x.org.departments).map(([k,v])=>[k,v.plan])),
       units:x.exec.units.map(u=>({key:u.key,plan:u.plan})),
       assistant:x.ops.policy,
       policy:x.org.managementPolicy||null
     });
     const history=x=>JSON.stringify({
       cash:x.cash,team:x.team.map(p=>[p.id,p.n,p.salary]),
       totals:x.bi.totals,contracts:x.deals.map(d=>[d.id,d.agreedFee]),
       property:x.exec.property
     });
     const review=()=>root.querySelector("details[data-management-review]");
     const button=selector=>{
       const b=root.querySelector(selector);
       if(!b||b.disabled)throw Error("Missing or disabled policy action: "+selector);
       b.click();
     };
     // The only direct QA reads are state snapshots; every policy operation
     // must use real user-visible controls.
     if(stage==="selection"){
       const priorSave=await saved();
       if(!priorSave)throw Error("No durable company available before policy selection");
       window.__policyUiProof={
         savedScopes:scopes(priorSave),savedHistory:history(priorSave),
         liveScopes:scopes(s),liveHistory:history(s),saveRevision:s._saveRevision
       };
       const disclosure=review();
       if(!disclosure)throw Error("Review management policy is missing");
       if(!disclosure.open)disclosure.querySelector("summary").click();
       if(!disclosure.open)throw Error("Review disclosure did not open");
       if(!root.querySelector('button[data-management-preset="conservative"]')||
          !root.querySelector('button[data-management-preset="balanced"]')||
          !root.querySelector('button[data-management-preset="aggressive"]')||
          !root.querySelector('button[data-management-preset="custom"]'))
          throw Error("All four choices must be available");
     }else if(stage==="comparison"){
       const prior=window.__policyUiProof;
       if(!prior)throw Error("Selection baseline not captured");
       button('button[data-management-preset="'+preset+'"]');
       if(!root.textContent.includes("Proposed limits")||
          !root.textContent.includes("Maximum possible new commitments"))
          throw Error("CEO financial comparison not shown");
       const afterSelection=await saved();
       if(scopes(s)!==prior.liveScopes||history(s)!==prior.liveHistory||
          scopes(afterSelection)!==prior.savedScopes||history(afterSelection)!==prior.savedHistory)
          throw Error("Selecting a management preset changed active authorities or history");
       // Verify that the actual Cancel button leaves both saved and active
       // limits untouched. Re-select for the approval screenshot.
       button('button[data-management-action="cancel"]');
       const afterCancel=await saved();
       if(scopes(s)!==prior.liveScopes||scopes(afterCancel)!==prior.savedScopes)
          throw Error("Cancel changed saved or in-memory management permissions");
       button('button[data-management-preset="'+preset+'"]');
       if(!root.querySelector('button[data-management-action="approve"]'))
          throw Error("CEO approval action missing from comparison");
     }else{
       const prior=window.__policyUiProof;
       if(!prior)throw Error("Comparison baseline missing");
       button('button[data-management-action="approve"]');
       // Atomic approval can complete asynchronously after IndexedDB commits.
       for(let n=0;n<40&&!root.textContent.includes("CEO policy saved");n++)
         await new Promise(resolve=>setTimeout(resolve,100));
       const savedNow=await saved();
       if(s.org.managementPolicy?.preset!==preset||
          savedNow.org.managementPolicy?.preset!==preset)
          throw Error("CEO confirmation did not durably authorize Balanced policy");
       if(history(s)!==prior.liveHistory||history(savedNow)!==prior.savedHistory)
          throw Error("Approval incorrectly spent money or changed historic company records");
       if(scopes(s)===prior.liveScopes||scopes(savedNow)===prior.savedScopes)
          throw Error("CEO confirmation did not apply the proposed permissions");
       if(s.org.progression.operations.hireSlots!==savedNow.org.progression.operations.hireSlots||
          s.org.progression.authorityDaily!==savedNow.org.progression.authorityDaily)
          throw Error("Confirmed authority disagrees with saved authority");
       if(!root.textContent.includes("CEO policy saved"))
          throw Error("Actual approved-policy status not displayed");
       const disclosure=review();if(disclosure&&!disclosure.open)disclosure.querySelector("summary").click();
     }
     const d=review();
     if(!d?.open)throw Error("Policy details unexpectedly closed");
     document.documentElement.style.scrollBehavior="auto";
     window.scrollTo(0,Math.max(0,window.scrollY+root.getBoundingClientRect().top-9));
     return {
       stage,width:innerWidth,visible:root.getClientRects().length>0,
       overflow:document.documentElement.scrollWidth>innerWidth+6,
       current:root.textContent.includes("Current:"),
       preview:!!root.querySelector('button[data-management-action="approve"]'),
       approved:s.org.managementPolicy?.preset===preset,
       policySaved:(await saved())?.org?.managementPolicy?.preset===preset,
       errors:window.__mobileErrors||[]
     };
    })()`.replace("__BOSS_STAGE__",JSON.stringify(stage));
    const state=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});
    if(state.exceptionDetails)throw Error("v22.5A1 actual UI regression: "+JSON.stringify(state.exceptionDetails));
    const check=state.result?.value;
    assert.ok(check?.visible&&check?.current&&!check?.overflow&&check.width===width,
      "Policy viewport or authority display failed "+JSON.stringify(check));
    assert.equal(check.errors.length,0,"Browser reported policy errors");
    if(stage==="comparison")assert.equal(check.preview,true,"No CEO policy comparison");
    if(stage==="approval")assert.ok(check.approved&&check.policySaved,"CEO policy was not committed");
    await sleep(220);
    const shot=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false,fromSurface:true});
    assert.ok(shot.data?.length>1500,"Policy screenshot missing");
    const filename=path.join(policyDir,"boss-policy-"+stage+"-"+width+"px.png");
    fs.writeFileSync(filename,Buffer.from(shot.data,"base64"));
    console.log("PASS v22.5A1 owner-size browser "+filename+" "+JSON.stringify(check));
   }
  }

  // v22.5A2: genuine Chromium before/after at both supported iPhone widths.
  // Baseline comes from the exact main source fetched by CI; no fabricated mock.
  const baselineFile=path.resolve("reports/v22-5a2-before.html");
  assert.ok(fs.existsSync(baselineFile),"CI must preserve main-branch baseline HTML");
  const simpleDir=path.resolve("reports/v22-5a2-mobile");
  fs.mkdirSync(simpleDir,{recursive:true});
  for(const [width,height] of [[390,844],[414,896]]){
   await send("Emulation.setDeviceMetricsOverride",{width,height,deviceScaleFactor:1,mobile:true});
   for(const stage of ["before","after"]){
    await send("Page.navigate",{url:"file://"+(stage==="before"?baselineFile:file)});
    for(let i=0;i<100;i++){
     const r=await send("Runtime.evaluate",{expression:"document.documentElement.dataset.bossReady==='true'&&document.querySelector('.bottom-nav button[data-view=work]')!==null",returnByValue:true});
     if(r.result?.value)break;
     await sleep(100);
    }
    for(const [tab,selector] of [
     ["work",stage==="before"?"#view-work section[aria-labelledby=deals-title]":"#work-finance-snapshot"],
     ["team","#org-explorer"],
     ["growth",stage==="before"?"#view-growth section[aria-labelledby=market-title]":"#growth-expand-businesses"]
    ]){
     const result=await send("Runtime.evaluate",{expression:"(()=>{const nav=document.querySelector('.bottom-nav button[data-view="+tab+"]');if(!nav)throw Error('Missing tab');nav.click();return true})()",returnByValue:true});
     if(result.exceptionDetails)throw Error("Missing actual navigation "+tab);
     await sleep(250);
     // The newly navigated file can exist in the DOM before its game handler
     // is attached. Require actual active tab after a genuine nav click.
     for(let attempt=0;attempt<12;attempt++){
      const visibleView=await send("Runtime.evaluate",{expression:"document.getElementById('view-"+tab+"')?.hidden===false",returnByValue:true});
      if(visibleView.result?.value)break;
      await sleep(150);
      await send("Runtime.evaluate",{expression:"document.querySelector('.bottom-nav button[data-view="+tab+"]').click()",returnByValue:true});
     }
     const probe=await send("Runtime.evaluate",{expression:"(()=>{const el=document.querySelector("+JSON.stringify(selector)+");if(!el)return null;document.documentElement.style.scrollBehavior='auto';window.scrollTo({top:Math.max(0,window.scrollY+el.getBoundingClientRect().top-12),behavior:'instant'});const b=el.getBoundingClientRect();return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+6,visible:!!el.getClientRects().length,top:b.top,text:el.innerText.slice(0,180),uniqueIds:document.querySelectorAll('[id]').length===new Set([...document.querySelectorAll('[id]')].map(x=>x.id)).size,headings:[...document.querySelectorAll('#view-growth .boss-primary-section>h2')].map(x=>x.textContent),hierarchy:document.getElementById('org-explorer')?.innerText||''}})()",returnByValue:true});
     const info=probe.result?.value;
     assert.ok(info&&info.visible&&info.width===width&&!info.overflow&&info.uniqueIds,"v22.5A2 mobile layout: "+JSON.stringify(info));
     if(stage==="after"&&tab==="work")assert.ok(info.text.includes("Cash")&&info.text.includes("Receivables"),"Work financial summary missing");
     if(stage==="after"&&tab==="team")assert.ok(!info.hierarchy.includes(" #"),"Primary organization still exposes employee numbers");
     if(stage==="after"&&tab==="growth")assert.deepEqual(info.headings,["1. Expand businesses","2. Markets and customers","3. Investments and property"]);
     await sleep(170);
     const screenshot=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false,fromSurface:true});
     assert.ok(screenshot.data?.length>1500,"Empty v22.5A2 screenshot");
     const name=path.join(simpleDir,"boss-"+stage+"-"+tab+"-"+width+"px.png");
     fs.writeFileSync(name,Buffer.from(screenshot.data,"base64"));
     console.log("PASS v22.5A2 actual "+name+" "+JSON.stringify({width,overflow:info.overflow,headings:info.headings}));
    }
   }
  }

  // v22.5B: live Chromium screenshots of real state-driven recommendations at both iPhone widths.
  const cultureDir=path.resolve("reports/v22-5b-mobile");fs.mkdirSync(cultureDir,{recursive:true});
  for(const [width,height] of [[390,844],[414,896]]){
   await send("Emulation.setDeviceMetricsOverride",{width,height,deviceScaleFactor:1,mobile:true});
   await send("Page.navigate",{url:"file://"+file});
   for(let n=0;n<90;n++){
    const loaded=await send("Runtime.evaluate",{expression:"document.documentElement.dataset.bossReady==='true'&&!!window.__bossQA",returnByValue:true});
    if(loaded.result?.value)break;await sleep(100);
   }
   const scenario=await send("Runtime.evaluate",{expression:"(()=>{const qa=window.__bossQA;if(!qa)return null;qa.pause();qa.resetEditShield();qa.grow(8);const s=qa.state();s.cash+=100000;s.bi.openingCash+=100000;s.day=500;s.hr.lastTeamDay=-99;s.hr.culture.lastAny=-99;for(const p of s.team){p.mood=37;p.loy=42;p.career.stress=21;}qa.renderCEOFocus();qa.renderCEODecisions();document.querySelector('.bottom-nav button[data-view=today]').click();const detail=document.querySelector('[data-people-culture] details');if(detail)detail.open=true;const panel=document.querySelector('[data-people-culture]');if(panel)window.scrollTo({top:window.scrollY+panel.getBoundingClientRect().top-16,behavior:'instant'});return{width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+6,card:!!panel,choices:panel?.querySelectorAll('button[data-kind]').length,eligible:panel?.querySelectorAll('button[data-kind]:not([disabled])').length,visible:!!panel?.getClientRects().length}})()",returnByValue:true});
   const v=scenario.result?.value;assert.ok(v&&v.width===width&&!v.overflow&&v.card&&v.choices===3&&v.eligible===3&&v.visible,"v22.5B culture mobile setup "+JSON.stringify(v));
   await sleep(200);
   const shot=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false,fromSurface:true});
   assert.ok(shot.data?.length>1500,"Missing real v22.5B culture screenshot");
   const name=path.join(cultureDir,"boss-culture-recommendation-"+width+"px.png");
   fs.writeFileSync(name,Buffer.from(shot.data,"base64"));
   console.log("PASS v22.5B live culture "+name+" "+JSON.stringify(v));
  }
  console.log("PASS real Chromium near-390px Boss mobile UI smoke");
 }finally{try{ws?.close()}catch{}chrome.kill("SIGTERM");await sleep(250);try{fs.rmSync(profile,{recursive:true,force:true,maxRetries:10,retryDelay:150})}catch(err){console.warn("Temporary Chrome profile cleanup deferred:",err.code)}}
}
runBrowser().catch(err=>{console.error(err);process.exitCode=1});
