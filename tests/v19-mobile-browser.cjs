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
const args=["--headless=new","--no-sandbox","--disable-gpu","--disable-dev-shm-usage","--hide-scrollbars","--allow-file-access-from-files","--force-device-scale-factor=1","--window-size=390,844","--virtual-time-budget=3000","--dump-dom","file://"+file];
const r=cp.spawnSync(browser,args,{encoding:"utf8",timeout:30000,maxBuffer:10*1024*1024});
if(r.error)throw r.error;
assert.equal(r.status,0,"Chromium failed: "+(r.stderr||"").slice(-1300));
const m=(r.stdout||"").match(/<title>BOSS_QA:([^<]+)<\/title>/);
assert.ok(m,"Mobile instrument did not complete: "+(r.stderr||"").slice(-1200));
const outcome=JSON.parse(Buffer.from(m[1],"base64").toString("utf8"));
console.log("Mobile browser verification:",JSON.stringify(outcome));
assert.ok(outcome.width>=370&&outcome.width<=430,"Unexpected viewport; cannot claim 390px layout: "+outcome.width);
assert.equal(outcome.views.length,4,"All four tabs must navigate");
assert.equal(outcome.checks.navPresent,true);
assert.equal(outcome.checks.navInViewport,true);
assert.equal(outcome.checks.customBudgets,true);
assert.equal(outcome.checks.optionalManagers,true);
assert.equal(outcome.checks.noVisibleUndefined,true);
assert.deepEqual(outcome.errors,[]);
console.log("PASS real Chromium near-390px Boss mobile UI smoke");
