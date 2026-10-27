const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdirSync}=require('node:fs');
const {get}=require('node:http');
const pw=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const url='http://127.0.0.1:4180/';
const ready=()=>new Promise(resolve=>{const request=get(url,response=>{response.resume();resolve(response.statusCode===200)});request.on('error',()=>resolve(false));request.setTimeout(1000,()=>{request.destroy();resolve(false)})});
async function scroll(page,top){
 await page.evaluate(top=>{const surface=document.documentElement.classList.contains('native-page-scroll')?document.scrollingElement:document.body;surface.scrollTo({top,behavior:'instant'})},top);
 await page.waitForTimeout(180);
}
(async()=>{
 const server=spawn(process.env.PYTHON||(process.platform==='win32'?'python':'python3'),['-m','http.server','4180','--bind','127.0.0.1'],{stdio:'ignore'});
 mkdirSync('qa-output',{recursive:true});
 try{
  let available=false;
  for(let i=0;i<40;i++){if(await ready()){available=true;break}await new Promise(r=>setTimeout(r,100))}
  assert.ok(available,'Preview server did not start');
  for(const engine of ['chromium','webkit']){
   const browser=await pw[engine].launch({headless:true});
   try{
    for(const width of [360,390,412]){
     const context=await browser.newContext({viewport:{width,height:844},deviceScaleFactor:1,reducedMotion:'reduce'});
     const page=await context.newPage(),errors=[];
     page.on('pageerror',error=>errors.push(error.message));
     await page.goto(url,{waitUntil:'networkidle'});
     const geometry=await page.evaluate(()=>{
      const box=s=>{const r=document.querySelector(s).getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right}};
      return {hero:box('.hero'),panel:box('#search-panel'),services:box('.service-tabs'),overflow:document.body.scrollWidth>innerWidth||document.documentElement.scrollWidth>innerWidth};
     });
     assert.equal(geometry.overflow,false);
     assert.equal(await page.locator('#search-panel').isVisible(),false,'Booking starts collapsed to match the reference');
     assert.ok(geometry.services.top>=160&&geometry.services.top<200,'Service shortcuts follow the turquoise header');
     assert.equal(await page.locator('.reference-header').isVisible(),true);
     assert.equal(await page.locator('.route-card:visible').count(),2);
     const cards=await page.locator('.route-card:visible').all();
     assert.equal((await cards[0].boundingBox()).y,(await cards[1].boundingBox()).y);
     assert.equal(await page.locator('h1').count(),1);
     assert.equal(await page.locator('[data-bottom-nav=home]').getAttribute('aria-current'),'page');
     assert.equal(await page.locator('.route-old-price-row').first().isVisible(),false,'Unverified savings must stay hidden');
     assert.equal(await page.locator('.material-symbols-rounded').count(),0,'Bottom navigation must work without a remote icon font');
     await page.screenshot({path:`qa-output/home-v2-${engine}-${width}-top.png`});
     for(const top of [620,1150,1800]){
      await scroll(page,top);
      await page.screenshot({path:`qa-output/home-v2-${engine}-${width}-${top}.png`});
     }
     await page.locator('.destination-grid').evaluate(el=>el.scrollLeft=0);
     const firstDestination=await page.locator('.destination-card').first().boundingBox();
     assert.ok(firstDestination.x>=19,'First destination must not be clipped');
     const order=await page.locator('.route-section,.home-recommendation,.home-popular,.reviews-section,.destination-section').evaluateAll(els=>els.map(el=>({name:el.className,y:el.getBoundingClientRect().y})).sort((a,b)=>a.y-b.y).map(el=>el.name));
     assert.match(order[0],/route-section/);assert.match(order[1],/home-popular/);assert.match(order[2],/home-recommendation/);assert.match(order[3],/destination-section/);assert.match(order[4],/reviews-section/);
     for(const service of ['airport','charter','motor','shuttle']){
      await page.locator('#tab-'+service).click();
      assert.equal(await page.locator('#search-panel').getAttribute('aria-labelledby'),'tab-'+service);
      assert.equal(await page.locator('#motor-entry').isVisible(),service==='motor');
      const card=await page.locator('#tab-'+service).boundingBox();assert.ok(card.x>=19&&card.x+card.width<=width-19);
     }
     await page.locator('[data-route-favorite]').first().click();
     assert.equal(await page.locator('[data-route-favorite]').first().getAttribute('aria-pressed'),'true');
     await page.reload({waitUntil:'networkidle'});
     assert.equal(await page.locator('[data-route-favorite]').first().getAttribute('aria-pressed'),'true');
     await page.locator('[data-reference-all]').click();
     assert.ok(await page.locator('#route-cards .route-card:visible').count()>2);
     await page.locator('[data-reference-all]').click();
     assert.equal(await page.locator('#route-cards .route-card:visible').count(),2);
     await page.locator('[data-reference-language]').click();
     assert.equal(await page.locator('html').getAttribute('lang'),'en');
     assert.equal(await page.locator('#popular-heading').innerText(),'Popular routes');
     assert.match(await page.locator('.home-popular-price').first().innerText(),/^From Rp120.000/);
     await page.locator('[data-reference-language]').click();
     await page.locator('[data-home-route="Singaraja|Denpasar"]').click();
     assert.equal(await page.locator('#origin').inputValue(),'Singaraja');
     assert.equal(await page.locator('#destination').inputValue(),'Denpasar');
     await page.locator('[data-quick-date="1"]').click();
     const date=await page.locator('#date').inputValue();assert.ok(date);
     await Promise.all([page.waitForURL(/hasil=1/),page.locator('.search-button').click()]);
     await page.waitForLoadState('networkidle');
     assert.equal(await page.locator('.result-card').count(),2);
     assert.match(await page.locator('.result-price strong').first().innerText(),/120.000/);
     await page.locator('[data-select-trip]').first().click();
     await page.locator('#booking-form [name=name]').fill('Audit Mobile V2');
     await page.locator('#booking-form [name=phone]').fill('081234567890');
     await page.locator('#booking-form [name=pickup]').fill('Hotel Singaraja');
     await page.locator('#booking-form [name=dropoff]').fill('Denpasar');
     await page.locator('#booking-form button[type=submit]').click();
     const link=await page.locator('#booking-review a').getAttribute('href');
     assert.match(link,/^https:\/\/wa.me\/6281339392525\?text=/);
     assert.ok(decodeURIComponent(link).includes('Hotel Singaraja'));
     await page.keyboard.press('Escape');
     await page.locator('#edit-search').click();await page.waitForLoadState('networkidle');
     assert.equal(await page.locator('#date').inputValue(),date);
     for(const service of ['airport','charter']){
      await page.locator('#tab-'+service).click();
      await page.locator('#origin').selectOption(service==='airport'?'Bandara Ngurah Rai':'Singaraja');
      await page.locator('#destination').selectOption(service==='airport'?'Singaraja':'Denpasar');
      await Promise.all([page.waitForURL(/hasil=1/),page.locator('.search-button').click()]);
      await page.waitForLoadState('networkidle');
      assert.equal(await page.locator('.result-card').count(),service==='airport'?2:1);
      await page.locator('#edit-search').click();await page.waitForLoadState('networkidle');
     }
     await page.locator('[data-bottom-nav=trips]').click();
     assert.equal(await page.locator('#check-dialog').isVisible(),true);
     await page.keyboard.press('Escape');
     assert.deepEqual(errors,[]);
     await context.close();
     console.log(`PASS Home V2 ${engine} ${width}px: layout, navigation, favorites, filters, ID/EN, route selection, all booking services and WhatsApp review`);
    }
   }finally{await browser.close()}
  }
 }finally{server.kill()}
})().catch(error=>{console.error(error);process.exitCode=1});
