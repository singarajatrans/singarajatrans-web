const assert=require('node:assert/strict');
module.exports=async function testMobileHeader(browser,url){
 for(const width of [360,390,412]){
  const p=await browser.newPage({viewport:{width,height:844},hasTouch:true,isMobile:true,ignoreHTTPSErrors:true}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.clock.install();await p.clock.pauseAt(new Date(Date.now()+1000));
  await p.goto(url,{waitUntil:'networkidle'});
  const search=p.locator('.mobile-header-search');
  assert.equal(await search.evaluate(e=>e.offsetHeight),40);
  assert.equal(await p.locator('.header-search-mark img').getAttribute('src'),'assets/images/logo.png');
  assert.equal(await p.locator('.header-search-brand').isVisible(),true);
  assert.equal(await p.locator('.brand').isVisible(),false);assert.equal(await p.locator('.mobile-menu').isVisible(),false);
  await p.clock.runFor(2800);assert.equal(await search.evaluate(e=>e.classList.contains('is-wiping')),false);
  await p.clock.runFor(450);const start=await search.evaluate(e=>[parseFloat(e.style.getPropertyValue('--car-x')),parseFloat(e.style.getPropertyValue('--brand-erased'))]);
  await p.screenshot({path:`/tmp/header-opening-${width}.png`});
  await p.clock.runFor(450);const mid=await search.evaluate(e=>[parseFloat(e.style.getPropertyValue('--car-x')),parseFloat(e.style.getPropertyValue('--brand-erased'))]);
  assert.ok(mid[0]<start[0]&&mid[1]>start[1],'Wipe must follow car right to left');await p.screenshot({path:`/tmp/header-wipe-${width}.png`});
  await p.clock.runFor(900);assert.equal(await p.locator('.header-search-brand').isVisible(),false);assert.equal(await p.locator('.header-search-prompt').innerText(),'Cari Travel Shuttle');
  const serviceList=['shuttle','airport','charter','motor'];
  const shape=await p.locator('.service-tabs button').evaluateAll(a=>a.map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return [r.width,r.height,s.borderRadius,s.padding,s.gap]}));
  shape.forEach(s=>assert.deepEqual(s,shape[0]));assert.equal(shape[0][1],88);
  const row=p.locator('.service-tabs');assert.equal(Math.round((await row.boundingBox()).x),16);const firstEdge=(await p.locator('#tab-shuttle').boundingBox()).x;assert.ok(firstEdge>=16&&firstEdge<=17);
  await p.locator('#tab-airport').click();await p.clock.runFor(500);await new Promise(r=>setTimeout(r,450));
  // Selecting a service uses its existing state and preserves every card's geometry.
  for(const service of ['airport','charter','motor','shuttle']){
   await p.locator('#tab-'+service).evaluate(e=>e.click());await p.clock.runFor(500);await new Promise(r=>setTimeout(r,450));
   assert.equal(await p.locator('body').getAttribute('data-service'),service);
   assert.equal(await p.locator('#search-panel').getAttribute('aria-labelledby'),'tab-'+service);
   assert.equal(await p.locator('#search-form').isVisible(),service!=='motor');
   assert.equal(await p.locator('#motor-entry').isVisible(),service==='motor');
   const box=await p.locator('#tab-'+service).boundingBox();assert.ok(box.x>=15&&box.x+box.width<=width-15,'Active card clipped: '+service+' '+JSON.stringify(box));
   assert.deepEqual(await p.locator('.service-tabs button').evaluateAll(a=>a.map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return [r.width,r.height,s.borderRadius,s.padding,s.gap]})),shape);
   await p.screenshot({path:`/tmp/header-card-${width}-${service}.png`});
  }
  await p.locator('#tab-motor').evaluate(e=>e.click());await p.clock.runFor(500);await new Promise(r=>setTimeout(r,450));const last=await p.locator('#tab-motor').boundingBox();assert.ok(Math.abs(width-firstEdge-last.x-last.width)<1);
  // Existing language buttons toggle directly, without a new route or a dropdown.
  const originalURL=p.url();await p.locator('.languages button[aria-pressed=true]').click();assert.equal(await p.locator('html').getAttribute('lang'),'en');assert.equal(p.url(),originalURL);
  assert.equal(await p.locator('.language-code:visible').count(),0);assert.equal(await p.locator('.language-chevron:visible').count(),0);
  await p.locator('.languages button[aria-pressed=true]').click();assert.equal(await p.locator('html').getAttribute('lang'),'id');
  const actions=await p.locator('.languages,.mobile-header-action').evaluateAll(a=>a.map(e=>[e.offsetWidth,e.offsetHeight]));assert.deepEqual(actions,[[40,40],[40,40],[40,40]]);
  // Each animated prompt is clicked at its real index, then must stop cycling.
  for(let index=0;index<5;index++){
   await p.reload({waitUntil:'networkidle'});await p.clock.runFor(4600+index*2800);
   const label=await search.getAttribute('aria-label');await search.click();await p.clock.runFor(600);
   assert.equal(await p.locator('body').getAttribute('data-service'),serviceList[index]||'shuttle',label);
   assert.equal(await p.evaluate(()=>document.activeElement.id||document.activeElement.closest('#motor-entry')?.id),index===3?'motor-entry':'origin');
   await p.clock.runFor(6000);assert.equal(await search.getAttribute('aria-label'),label,'Animation continued after interaction');
  }
  // Share native, clipboard fallback, and manual fallback; no external message is sent.
  await p.reload({waitUntil:'networkidle'});
  await p.evaluate(()=>Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{window.sharedPage=data;}}));
  await p.locator('.mobile-header-share').click();assert.equal(await p.evaluate(()=>window.sharedPage.url),p.url());
  await p.evaluate(()=>{Object.defineProperty(navigator,'share',{configurable:true,value:undefined});Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{window.copiedLink=value;}}});});
  await p.locator('.mobile-header-share').click();assert.equal(await p.evaluate(()=>window.copiedLink),p.url());
  await p.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:undefined}));await p.locator('.mobile-header-share').click();assert.equal(await p.locator('#mobile-share-dialog').evaluate(e=>e.open),true);assert.equal(await p.locator('#mobile-share-url').inputValue(),p.url());await p.keyboard.press('Escape');
  await p.locator('.mobile-header-search').focus();assert.equal(await search.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
  assert.equal(await p.evaluate(()=>document.body.scrollWidth<=innerWidth&&document.documentElement.scrollWidth<=innerWidth),true);assert.deepEqual(errors,[]);
  await p.emulateMedia({reducedMotion:'reduce'});await p.reload({waitUntil:'networkidle'});assert.equal(await p.locator('.header-search-brand').isVisible(),false);await p.clock.runFor(15000);assert.match(await search.getAttribute('aria-label'),/rute/);assert.equal(await search.evaluate(e=>e.classList.contains('is-wiping')),false);
  await p.close();console.log('PASS mobile header: opening/wipe, shortcuts, geometry, carousel, language, share, focus and reduced motion at '+width);
 }
};
