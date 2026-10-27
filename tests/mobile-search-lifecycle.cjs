const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {get}=require('node:http');
const pw=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const url='http://127.0.0.1:4175/';
const ready=()=>new Promise(resolve=>{get(url,r=>{r.resume();resolve(r.statusCode===200)}).on('error',()=>resolve(false))});
(async()=>{
 const server=spawn(process.platform==='win32'?'python':'python3',['-m','http.server','4175','--bind','127.0.0.1'],{stdio:'ignore'});
 try{
  for(let i=0;i<40;i++){if(await ready())break;await new Promise(r=>setTimeout(r,100))}
  for(const engine of (process.env.BROWSER_ENGINES||'chromium,webkit,firefox').split(',')){
   const browser=await pw[engine].launch({headless:true});
   try{
    for(const width of [320,390,430]){
     const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'}),errors=[];
     page.on('pageerror',e=>errors.push(e.message));
     await page.goto(url,{waitUntil:'networkidle'});
     await page.locator('.reference-search').click();
     await page.locator('#origin').selectOption('Singaraja');await page.locator('#destination').selectOption('Denpasar');
     await page.setViewportSize({width:1024,height:844});
     assert.equal(await page.locator('.reference-header').isVisible(),false);
     assert.equal(await page.locator('#search-panel').isVisible(),true);
     await page.setViewportSize({width,height:844});
     await page.locator('.reference-header').waitFor({state:'visible'});
     assert.equal(await page.locator('#origin').inputValue(),'Singaraja');
     assert.equal(await page.locator('#destination').inputValue(),'Denpasar');
     await page.locator('[data-close-home-booking]').click();
     await page.locator('[data-reference-all]').click();assert.ok(await page.locator('.route-card:visible').count()>2);
     await page.locator('[data-reference-all]').click();assert.equal(await page.locator('.route-card:visible').count(),2);
     await page.locator('[data-reference-language]').click();assert.equal(await page.locator('html').getAttribute('lang'),'en');
     await page.locator('.reference-search').click();assert.equal(await page.locator('#origin').inputValue(),'Singaraja');
     await page.reload({waitUntil:'networkidle'});await page.locator('.reference-header').waitFor({state:'visible'});
     assert.equal(await page.locator('#search-panel').isVisible(),false);
     assert.equal(await page.evaluate(()=>document.body.scrollWidth<=innerWidth&&document.documentElement.scrollWidth<=innerWidth),true);
     assert.deepEqual(errors,[]);await page.close();
     console.log('PASS reference lifecycle '+engine+' '+width+'px: breakpoint changes, field preservation, ID/EN, expansion, refresh and overflow');
    }
   }finally{await browser.close()}
  }
 }finally{server.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
