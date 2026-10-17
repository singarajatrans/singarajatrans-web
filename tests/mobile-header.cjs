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
  const row=p.locator('.service-tabs');assert.equal(Math.round((await row.boundingBox()).x),0);const firstEdge=(await p.locator('#tab-shuttle').boundingBox()).x;assert.ok(firstEdge>=16&&firstEdge<=17);
  assert.equal(await row.evaluate(e=>getComputedStyle(e).columnGap),'8px');
  const peek=await p.locator('#tab-motor').boundingBox();assert.ok(peek.x<width&&peek.x+peek.width>width,'Next service must peek into the rail');
  assert.equal(await p.locator('#tab-shuttle').evaluate(e=>getComputedStyle(e,'::after').width),'26px');assert.equal(await p.locator('#tab-shuttle').evaluate(e=>getComputedStyle(e,'::after').height),'10px');
  assert.equal((await p.locator('#search-panel').boundingBox()).y-(await p.locator('#tab-shuttle').boundingBox()).y-88,14);
  // Inspect the rendered junction: white across the seam and red along the pointer curve.
  const activeBox=await p.locator('#tab-shuttle').boundingBox();
  const notchPng=await p.screenshot({clip:{x:Math.floor(activeBox.x+activeBox.width/2-16),y:Math.floor(activeBox.y+activeBox.height-4),width:32,height:14}});
  const junction=await p.evaluate(async data=>{
   const image=new Image();image.src=data;await image.decode();const canvas=document.createElement('canvas');canvas.width=32;canvas.height=14;const context=canvas.getContext('2d');context.drawImage(image,0,0,32,14);const pixels=context.getImageData(0,0,32,14).data;
   const pixel=(x,y)=>Array.from(pixels.slice((y*32+x)*4,(y*32+x)*4+3));
   const seamWhite=[3,4,5].every(y=>[13,14,15,16,17,18,19].every(x=>pixel(x,y).every(c=>c>245)));
   const borderedCurve=Array.from({length:13},(_,i)=>i+10).every(x=>Array.from({length:8},(_,i)=>i+5).some(y=>{const [r,g,b]=pixel(x,y);return r-g>25&&g<175&&b<185;}));
   return {seamWhite,borderedCurve};
  },'data:image/png;base64,'+notchPng.toString('base64'));
  assert.deepEqual(junction,{seamWhite:true,borderedCurve:true},'Notch must join without a seam and carry the active border');

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
  const previous=await p.locator('#tab-shuttle').boundingBox();assert.ok(previous.x<0&&previous.x+previous.width>0,'Previous service must peek at the opposite end');assert.ok(last.x+last.width/2>width*.6,'Last service must not be forced to center');
  assert.equal(Math.round(await row.evaluate(e=>e.scrollLeft)),await row.evaluate(e=>e.scrollWidth-e.clientWidth));
  // Existing language buttons toggle directly, without a new route or a dropdown.
  const originalURL=p.url();await p.locator('.languages button[aria-pressed=true]').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('html').getAttribute('lang'),'en');assert.equal(p.url(),originalURL);assert.equal(await p.evaluate(()=>document.activeElement.dataset.language),'en');
  assert.equal(await p.locator('.language-code:visible').count(),0);assert.equal(await p.locator('.language-chevron:visible').count(),0);
  await p.keyboard.press('Enter');assert.equal(await p.locator('html').getAttribute('lang'),'id');assert.equal(await p.evaluate(()=>document.activeElement.dataset.language),'id');await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.classList.contains('mobile-header-share')),true);
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
  await p.locator('.mobile-header-share').click();assert.equal(await p.evaluate(()=>window.copiedLink),p.url());assert.equal(await p.locator('.mobile-header-share use').getAttribute('href'),'#check');await p.clock.runFor(2500);assert.equal(await p.locator('.mobile-header-share use').getAttribute('href'),'#share');
  await search.focus();await p.locator('[data-check-booking]').first().evaluate(e=>e.click());await p.keyboard.press('Escape');await p.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:undefined}));await p.locator('.mobile-header-share').click();assert.equal(await p.locator('#mobile-share-dialog').evaluate(e=>e.open),true);assert.equal(await p.locator('#mobile-share-url').inputValue(),p.url());await p.keyboard.press('Escape');await p.clock.resume();await p.waitForFunction(()=>!document.querySelector('#mobile-share-dialog').open&&document.activeElement.classList.contains('mobile-header-share'));assert.equal(await p.evaluate(()=>document.activeElement.classList.contains('mobile-header-share')),true,'Share dialog must restore its own trigger after another dialog');
  await p.locator('.mobile-header-search').focus();assert.equal(await search.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
  assert.equal(await p.evaluate(()=>document.body.scrollWidth<=innerWidth&&document.documentElement.scrollWidth<=innerWidth),true);assert.deepEqual(errors,[]);
  await p.emulateMedia({reducedMotion:'reduce'});await p.reload({waitUntil:'networkidle'});assert.equal(await p.locator('.header-search-brand').isVisible(),false);await p.clock.runFor(15000);assert.match(await search.getAttribute('aria-label'),/rute/);assert.equal(await search.evaluate(e=>e.classList.contains('is-wiping')),false);
  // Reduced motion also keeps distinct landing points, including Motor → Mobil.
  await p.locator('#tab-motor').evaluate(e=>e.click());
  let previousScroll=await row.evaluate(e=>e.scrollLeft);
  for(const service of ['charter','airport','shuttle','airport','charter','motor']){
   await p.locator('#tab-'+service).evaluate(e=>e.click());
   const scroll=await row.evaluate(e=>e.scrollLeft);assert.ok(Math.abs(scroll-previousScroll)>5,'Carousel did not move to '+service);previousScroll=scroll;
   assert.equal(await p.locator('#search-panel').getAttribute('aria-labelledby'),'tab-'+service);
  }
  await p.close();console.log('PASS mobile header: opening/wipe, shortcuts, geometry, carousel, language, share, focus and reduced motion at '+width);
 }
};
