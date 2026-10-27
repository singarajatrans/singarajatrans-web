const assert=require('node:assert/strict');
module.exports=async function testMobileHeader(browser,url){
 require('node:fs').mkdirSync('qa-output',{recursive:true});
 for(const width of [360,390,412]){
  const p=await browser.newPage({viewport:{width,height:844},hasTouch:true,isMobile:true,ignoreHTTPSErrors:true}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.clock.install();await p.clock.pauseAt(new Date(Date.now()+1000));
  await p.goto(url,{waitUntil:'networkidle'});
  const search=p.locator('.mobile-header-search');
  assert.equal(await search.evaluate(e=>e.offsetHeight),42);
  assert.equal(await p.locator('.header-search-mark').count(),0,'Search header must not contain the old logo');
  assert.equal(await p.locator('.header-search-name').evaluate(e=>getComputedStyle(e).color),await search.evaluate(e=>getComputedStyle(e).getPropertyValue('--mock-red').trim()).then(v=>v==='#c85759'?'rgb(200, 87, 89)':v));
  assert.equal(await p.locator('.header-search-icon').evaluate(e=>getComputedStyle(e).width),'21px');
  assert.equal(await p.locator('.header-search-prompt').evaluate(e=>getComputedStyle(e).fontWeight),'500');
  assert.equal(await p.locator('.header-search-brand').isVisible(),true);
  assert.equal(await p.locator('.brand').isVisible(),true);assert.equal(await p.locator('.mobile-menu').isVisible(),false);
  await p.clock.runFor(900);assert.ok(await search.evaluate(e=>{const n=parseFloat(e.style.getPropertyValue('--brand-unrevealed'));return n>40&&n<60;}));
  assert.notEqual(await p.locator('.header-search-name').evaluate(e=>getComputedStyle(e).clipPath),'none');
  await p.screenshot({path:`qa-output/header-brand-reveal-${width}.png`});
  await p.clock.runFor(1900);
  assert.equal(await search.evaluate(e=>e.classList.contains('is-wiping')),false);
  await p.clock.runFor(450);const start=await search.evaluate(e=>[parseFloat(e.style.getPropertyValue('--car-x')),parseFloat(e.style.getPropertyValue('--brand-erased'))]);
  await p.screenshot({path:`/tmp/header-opening-${width}.png`});
  assert.equal(await p.locator('.header-search-car').isVisible(),true,'Car must be visible during the wipe');
  assert.equal(await p.locator('.header-car-chassis>path').first().evaluate(e=>getComputedStyle(e).fill),await p.locator('#header').evaluate(e=>getComputedStyle(e).backgroundColor),'Car body must match the header red');
  await p.clock.runFor(450);const mid=await search.evaluate(e=>[parseFloat(e.style.getPropertyValue('--car-x')),parseFloat(e.style.getPropertyValue('--brand-erased'))]);
  assert.ok(mid[0]<start[0]&&mid[1]>start[1],'Wipe must follow car right to left');await p.screenshot({path:`qa-output/header-car-motion-${width}.png`});
  assert.equal(await p.locator('.header-car-wheel').first().evaluate(e=>getComputedStyle(e).animationName),'header-car-wheel');
  assert.equal(await p.locator('.header-car-chassis').evaluate(e=>getComputedStyle(e).animationName),'header-car-suspension');
  assert.equal(await p.locator('.header-car-smoke').count(),3);
  assert.equal(await p.locator('.header-car-smoke').first().evaluate(e=>getComputedStyle(e).animationName),'header-car-exhaust');
  await p.clock.runFor(1800);assert.equal(await p.locator('.header-search-brand').isVisible(),false);
  const firstTyped=await p.locator('.header-search-prompt').innerText();
  assert.ok(firstTyped.length>0&&firstTyped.length<'Cari Travel Shuttle'.length&&'Cari Travel Shuttle'.startsWith(firstTyped),'First prompt must type from the left after the car passes');
  assert.equal(await p.locator('.header-search-car').isVisible(),false);
  await p.screenshot({path:`qa-output/header-first-typing-${width}.png`});
  await p.clock.runFor(2600);assert.equal(await p.locator('.header-search-prompt').innerText(),'Cari Travel Shuttle');
  // Reference behavior: erase from the right, pause, then type the next phrase.
  const prompt=p.locator('.header-search-prompt'),full='Cari Travel Shuttle';
  const searchBox=await search.boundingBox();
  await p.clock.runFor(1200);const deleting=await prompt.innerText();
  assert.ok(deleting.length>0&&deleting.length<full.length&&full.startsWith(deleting),'Prompt must erase letters from the right');
  assert.equal(await search.getAttribute('aria-label'),full,'Accessible label must remain a complete phrase');
  await p.screenshot({path:`qa-output/header-typewriter-delete-${width}.png`});
  await p.clock.runFor(1200);const typing=await prompt.innerText(),next='Cari Airport Transfer';
  assert.ok(typing.length>0&&typing.length<next.length&&next.startsWith(typing),'Next prompt must type progressively');
  assert.equal(await search.getAttribute('aria-label'),next);
  assert.deepEqual(await search.boundingBox(),searchBox,'Typing must not resize the search header');
  assert.equal(await prompt.evaluate(e=>getComputedStyle(e,'::after').width),'2px');
  await p.screenshot({path:`qa-output/header-typewriter-type-${width}.png`});
  await p.clock.runFor(1800);assert.equal(await prompt.innerText(),next);
  const serviceList=['shuttle','airport','charter','motor'];
  const shape=await p.locator('.service-tabs button').evaluateAll(a=>a.map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return [r.width,r.height,s.borderRadius,s.padding,s.gap]}));
  shape.forEach(s=>assert.deepEqual(s,shape[0]));assert.equal(shape[0][1],104);
  const row=p.locator('.service-tabs');
  const firstEdge=(await p.locator('#tab-shuttle').boundingBox()).x;
  assert.equal(firstEdge,20);
  assert.equal(await row.evaluate(e=>getComputedStyle(e).columnGap),'8px');
  for(const tab of await row.locator('button').all()){
   const box=await tab.boundingBox();assert.ok(box.x>=20&&box.x+box.width<=width-19);
  }
  assert.equal(await p.locator('#tab-shuttle').evaluate(e=>getComputedStyle(e,'::after').content),'none');
  const panel=await p.locator('#search-panel').boundingBox();
  assert.ok(panel.y+panel.height<(await row.boundingBox()).y,'Services follow the floating booking widget');

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
  assert.equal(await row.evaluate(e=>e.scrollLeft),0,'All four service choices fit without scrolling');
  // Existing language buttons toggle directly, without a new route or a dropdown.
  const originalURL=p.url();await p.locator('.languages button[aria-pressed=true]').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('html').getAttribute('lang'),'en');assert.equal(p.url(),originalURL);assert.equal(await p.evaluate(()=>document.activeElement.dataset.language),'en');
  assert.equal(await p.locator('.language-code:visible').count(),0);assert.equal(await p.locator('.language-chevron:visible').count(),0);
  await p.keyboard.press('Enter');assert.equal(await p.locator('html').getAttribute('lang'),'id');assert.equal(await p.evaluate(()=>document.activeElement.dataset.language),'id');await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.classList.contains('mobile-header-share')),true);
  const actions=await p.locator('.languages,.mobile-header-action').evaluateAll(a=>a.map(e=>[e.offsetWidth,e.offsetHeight]));assert.equal(actions.length,2,'Language toggle and mobile header action must both exist');assert.deepEqual(actions,[[42,42],[42,42]]);
  // Each animated prompt is clicked at its real index, then must keep cycling while booking receives focus.
  const promptLabels=['Cari Travel Shuttle','Cari Airport Transfer','Cari Sewa Mobil','Cari Sewa Motor','Cari rute, kota, atau tujuan…'];
  await p.reload({waitUntil:'networkidle'});await p.clock.runFor(5500);
  await p.locator('#tab-shuttle').click();
  assert.equal(await search.evaluate(e=>e.classList.contains('has-typewriter')),true,'Touching a service must not stop header typing');
  for(let step=0;step<300&&await prompt.innerText()!==promptLabels[4];step++)await p.clock.runFor(100);
  assert.equal(await prompt.innerText(),promptLabels[4]);
  for(let step=0;step<100&&await prompt.innerText()!==promptLabels[0];step++)await p.clock.runFor(100);
  assert.equal(await prompt.innerText(),promptLabels[0],'Final prompt must loop back to the first phrase');

  for(let index=0;index<5;index++){
   await p.reload({waitUntil:'networkidle'});await p.clock.runFor(5500);
   for(let step=0;step<400&&await prompt.innerText()!==promptLabels[index];step++)await p.clock.runFor(100);
   assert.equal(await prompt.innerText(),promptLabels[index]);
   const label=await search.getAttribute('aria-label');await search.click();await p.clock.runFor(600);
   const selectedService=await p.locator('body').getAttribute('data-service');
   if(selectedService!==(serviceList[index]||'shuttle')){
    await p.screenshot({path:`qa-output/header-shortcut-failure-${width}-${index}.png`});
    console.log('Header shortcut diagnostic',await search.evaluate(e=>({label:e.getAttribute('aria-label'),prompt:e.querySelector('.header-search-prompt').textContent,service:document.body.dataset.service,active:document.activeElement.id,header:document.querySelector('#header').className,url:location.href})));
   }
   assert.equal(selectedService,serviceList[index]||'shuttle',label);
   assert.equal(await p.evaluate(()=>document.activeElement.id||document.activeElement.closest('#motor-entry')?.id),index===3?'motor-entry':'origin');
   assert.equal(await search.evaluate(e=>e.classList.contains('has-typewriter')),true,'Booking shortcut must keep the typewriter active');
   await p.clock.runFor(6000);assert.notEqual(await search.getAttribute('aria-label'),label,'Header typing must continue after opening booking');
  }
  // Share native, clipboard fallback, and manual fallback; no external message is sent.
  await p.reload({waitUntil:'networkidle'});
  await p.evaluate(()=>Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{window.sharedPage=data;}}));
  await p.locator('.mobile-header-share').click();assert.equal(await p.evaluate(()=>window.sharedPage.url),p.url());
  await p.evaluate(()=>{Object.defineProperty(navigator,'share',{configurable:true,value:undefined});Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{window.copiedLink=value;}}});});
  await p.locator('.mobile-header-share').click();assert.equal(await p.evaluate(()=>window.copiedLink),p.url());assert.equal(await p.locator('.mobile-header-share use').getAttribute('href'),'#check');await p.clock.runFor(2500);assert.equal(await p.locator('.mobile-header-share use').getAttribute('href'),'#share');
  await search.focus();await p.locator('[data-check-booking]').first().evaluate(e=>e.click());await p.keyboard.press('Escape');await p.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:undefined}));await p.locator('.mobile-header-share').click();assert.equal(await p.locator('#mobile-share-dialog').evaluate(e=>e.open),true);assert.equal(await p.locator('#mobile-share-url').inputValue(),p.url());await p.keyboard.press('Escape');await p.clock.resume();await p.waitForFunction(()=>!document.querySelector('#mobile-share-dialog').open&&document.activeElement.classList.contains('mobile-header-share'));assert.equal(await p.evaluate(()=>document.activeElement.classList.contains('mobile-header-share')),true,'Share dialog must restore its own trigger after another dialog');
  await p.locator('.mobile-header-search').focus();assert.equal(await search.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
  assert.equal(await search.evaluate(e=>e.classList.contains('has-typewriter')),true,'Sharing and focusing search must preserve typing');
  const beforeShareTyping=await p.locator('.header-search-prompt').innerText();await p.clock.runFor(6000);assert.notEqual(await p.locator('.header-search-prompt').innerText(),beforeShareTyping,'Share feedback must not cancel the typewriter timer');
  assert.equal(await p.evaluate(()=>document.body.scrollWidth<=innerWidth&&document.documentElement.scrollWidth<=innerWidth),true);assert.deepEqual(errors,[]);
  await p.emulateMedia({reducedMotion:'reduce'});await p.reload({waitUntil:'networkidle'});await p.clock.runFor(3500);assert.equal(await p.locator('.header-search-car').isVisible(),true,'Opening car must still be available with reduced motion');await p.clock.runFor(4000);assert.equal(await p.locator('.header-search-brand').isVisible(),false);assert.equal(await search.evaluate(e=>e.classList.contains('has-typewriter')),true);assert.equal(await prompt.evaluate(e=>getComputedStyle(e,'::after').animationName),'none');
  // Reduced motion keeps all four service choices visible.
  await p.locator('#tab-motor').evaluate(e=>e.click());
  let previousScroll=await row.evaluate(e=>e.scrollLeft);
  for(const service of ['charter','airport','shuttle','airport','charter','motor']){
   await p.locator('#tab-'+service).evaluate(e=>e.click());
   const scroll=await row.evaluate(e=>e.scrollLeft);assert.equal(scroll,0,'Service grid must fit without horizontal scrolling');previousScroll=scroll;
   assert.equal(await p.locator('#search-panel').getAttribute('aria-labelledby'),'tab-'+service);
  }
  await p.close();console.log('PASS mobile header: opening/wipe, shortcuts, geometry, carousel, language, share, focus and reduced motion at '+width);
 }
};




