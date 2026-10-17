// Real Chromium mobile-width smoke. Uses the browser pre-installed on GitHub hosted Ubuntu runners.
const assert=require("node:assert/strict"),fs=require("node:fs"),os=require("node:os"),path=require("node:path"),cp=require("node:child_process");
const browser=["/usr/bin/google-chrome","/usr/bin/chromium","/usr/bin/chromium-browser"].find(x=>fs.existsSync(x));
assert.ok(browser,"A real Chromium browser is required for viewport smoke (not a DOM mock)");
const html=fs.readFileSync("index.html","utf8");
const instrumentation=String.raw`
window.addEventListener("error",e=>{window.__mobileErrors=(window.__mobileErrors||[]).concat(String(e.message||"unknown error"))});
document.addEventListener("DOMContentLoaded",()=>{
 const result={width:window.innerWidth,views:[],errors:[],checks:{}};
 try{
  const byId=id=>document.getElementById(id);
  const nav=document.querySelector(".bottom-nav");
  result.checks.navPresent=!!nav;
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
  result.errors=(window.__mobileErrors||[]);
 }catch(e){result.errors.push(String(e.stack||e));}
 document.title="BOSS_QA:"+btoa(unescape(encodeURIComponent(JSON.stringify(result))));
});
`;
const file=path.join(fs.mkdtempSync(path.join(os.tmpdir(),"boss-mobile-")),"index.html");
fs.writeFileSync(file,html.replace("</body>","<script>"+instrumentation+"</script></body>"));
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
  for(let i=0;i<75;i++){
   try{const result=await send("Runtime.evaluate",{expression:"document.title",returnByValue:true});title=result.result?.value||"";if(title.startsWith("BOSS_QA:"))break;}catch{}
   await sleep(150);
  }
  assert.ok(title.startsWith("BOSS_QA:"),"UI smoke script did not finish");
  const outcome=JSON.parse(Buffer.from(title.slice(8),"base64").toString("utf8"));
  console.log("Mobile browser verification:",JSON.stringify(outcome));
  assert.ok(outcome.width>=385&&outcome.width<=395,"Unexpected viewport, no mobile acceptance: "+outcome.width);
  assert.equal(outcome.views.length,4,"All four tabs must navigate");
  assert.equal(outcome.checks.navPresent,true);
  assert.equal(outcome.checks.navInViewport,true);
  assert.equal(outcome.checks.customBudgets,true);
  assert.equal(outcome.checks.optionalManagers,true);
  assert.equal(outcome.checks.noVisibleUndefined,true);
  assert.deepEqual(outcome.errors,[]);
  console.log("PASS real Chromium near-390px Boss mobile UI smoke");
 }finally{try{ws?.close()}catch{}chrome.kill("SIGTERM");await sleep(250);try{fs.rmSync(profile,{recursive:true,force:true,maxRetries:10,retryDelay:150})}catch(err){console.warn("Temporary Chrome profile cleanup deferred:",err.code)}}
}
runBrowser().catch(err=>{console.error(err);process.exitCode=1});
