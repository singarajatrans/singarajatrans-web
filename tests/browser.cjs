const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdirSync}=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const server=spawn('python3',['-m','http.server','4173','--bind','127.0.0.1'],{stdio:'ignore'});
 let browser;
 try{
  for(let i=0;i<40;i++){try{if((await fetch('http://127.0.0.1:4173/')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
  browser=await chromium.launch({headless:true});mkdirSync('qa-output',{recursive:true});
  for(const width of [320,390,768,1024,1440]){
   const page=await browser.newPage({viewport:{width,height:900}}),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
   assert.equal(await page.evaluate(()=>document.body.dataset.service),'shuttle');assert.match(await page.locator('#hero-title').innerText(),/Travel Shuttle/);
   assert.equal(await page.evaluate(()=>Number(getComputedStyle(document.querySelector('.hero-service-shuttle')).opacity)>.4),true,'Shuttle hero inactive at '+width);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Overflow at '+width);
   if(width<768){assert.equal(await page.locator('.swap-fields').isVisible(),true);assert.equal(await page.locator('.languages button:visible').count(),1);assert.equal(await page.locator('.languages').evaluate(el=>getComputedStyle(el).height),'26px');assert.equal(await page.locator('.language-flag').first().evaluate(el=>getComputedStyle(el).borderRadius),'50%');assert.equal(await page.locator('.origin-field .field-icon-mobile use').getAttribute('href'),'#pin');assert.equal(await page.locator('.destination-field .field-icon-mobile use').getAttribute('href'),'#pin');assert.equal(await page.locator('.date-field .field-icon-mobile use').getAttribute('href'),'#field-calendar');assert.equal(await page.locator('.passenger-field').isVisible(),false);assert.equal(await page.locator('.trip-mode label').first().evaluate(el=>getComputedStyle(el).borderRadius),'10px');assert.equal(await page.locator('.date-field .field-label').innerText(),'Tanggal Perjalanan');assert.equal(await page.locator('#origin').inputValue(),'');assert.equal(await page.locator('#destination').inputValue(),'');assert.equal(await page.locator('#date').inputValue(),'');assert.equal(await page.locator('.origin-field').evaluate(el=>el.classList.contains('has-value')),false);assert.equal(await page.locator('.date-field').evaluate(el=>el.classList.contains('has-value')),false);await page.screenshot({path:`qa-output/home-empty-${width}.png`});await page.locator('#origin').selectOption('Singaraja');await page.locator('#destination').selectOption('Denpasar');await page.locator('.swap-fields').click();assert.equal(await page.locator('.swap-fields').evaluate(el=>el.classList.contains('is-swapping')),true);assert.equal(await page.locator('#origin').inputValue(),'Denpasar');assert.equal(await page.locator('#destination').inputValue(),'Singaraja');await page.locator('.swap-fields').click();assert.equal(await page.locator('#origin').inputValue(),'Singaraja');assert.equal(await page.locator('#destination').inputValue(),'Denpasar');await page.locator('[data-quick-date="0"]').click();assert.equal(await page.locator('#date').inputValue(),await page.evaluate(()=>window.Singaraja.baliDate()));assert.match(await page.locator('.date-display').innerText(),/^\d{1,2} \S{3}, \d{4}$/);await page.locator('[data-quick-date="1"]').click();assert.equal(await page.locator('#date').inputValue(),await page.evaluate(()=>window.Singaraja.baliDate(new Date(Date.now()+86400000))));}
   await page.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
   await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
   assert.equal(await page.evaluate(()=>new Set([...document.querySelectorAll('[id]')].map(e=>e.id)).size===document.querySelectorAll('[id]').length),true,'Duplicate IDs');
   await page.screenshot({path:`qa-output/home-${width}.png`,fullPage:true});
   await page.locator('#origin').selectOption('Singaraja');await page.locator('#destination').selectOption('Singaraja');
   await page.locator('.search-button').click();assert.equal(await page.locator('#search-error').isVisible(),true);
   await page.locator('#destination').selectOption('Denpasar');await page.locator('#passengers').selectOption('2');
   await Promise.all([page.waitForURL(/hasil=1/),page.locator('.search-button').click()]);await page.waitForLoadState('networkidle');const resultCount=await page.locator('.result-card').count();if(resultCount!==2){const debug=await page.evaluate(()=>{const p=new URLSearchParams(location.search),s={service:p.get('service'),from:p.get('from'),to:p.get('to'),date:p.get('date'),time:p.get('time')||'',passengers:Number(p.get('passengers'))};return {url:location.href,bodyService:document.body.dataset.service,values:{origin:document.querySelector('#origin')?.value,destination:document.querySelector('#destination')?.value,date:document.querySelector('#date')?.value,time:document.querySelector('#time')?.value,passengers:document.querySelector('#passengers')?.value},state:s,options:window.Singaraja?.getOptions(s),resultsHidden:document.querySelector('#results')?.hidden,resultHtml:document.querySelector('#result-list')?.innerHTML};});console.error('RESULT DEBUG',JSON.stringify(debug));}assert.equal(resultCount,2);
   assert.match(await page.locator('.result-price strong').first().innerText(),/240\.000/);
   await page.locator('[data-select-trip]').first().click();assert.equal(await page.locator('#booking-dialog').isVisible(),true);
   await page.locator('[name=name]').fill('<img src=x onerror=alert(1)>');await page.locator('#booking-form [name=phone]').fill('081234567890');
   await page.locator('[name=pickup]').fill('Hotel Singaraja');await page.locator('[name=dropoff]').fill('Denpasar');await page.locator('#booking-form button[type=submit]').click();
   assert.equal(await page.locator('#booking-review img').count(),0,'Unsafe user HTML');
   assert.equal(await page.locator('#booking-review a').getAttribute('href').then(x=>x.startsWith('https://wa.me/6281339392525?text=')),true);
   const modalBox=await page.locator('#booking-dialog').boundingBox();assert.ok(modalBox.y>=0&&modalBox.y+modalBox.height<=900,'Modal clipped at '+width);
   await page.screenshot({path:`qa-output/review-${width}.png`});
   await page.keyboard.press('Escape');assert.equal(await page.locator('#booking-dialog').isVisible(),false);
   await page.locator('#edit-search').click();await page.locator('#tab-airport').click();await page.waitForTimeout(650);
   assert.equal(await page.evaluate(()=>document.body.dataset.service),'airport');assert.match(await page.locator('#hero-title').innerText(),/Airport Transfer/);assert.equal(await page.evaluate(()=>Number(getComputedStyle(document.querySelector('.hero-service-airport')).opacity)>.4),true,'Airport hero inactive at '+width);
   await page.locator('#origin').selectOption('Bandara Ngurah Rai');await page.locator('#destination').selectOption('Singaraja');await page.locator('#passengers').selectOption('7');
   await page.locator('.search-button').click();assert.equal(await page.locator('.result-card').count(),1);assert.match(await page.locator('.result-details h3').innerText(),/Mini Bus/);
   await page.locator('#edit-search').click();await page.locator('#tab-charter').click();await page.waitForTimeout(650);
   assert.equal(await page.evaluate(()=>document.body.dataset.service),'charter');assert.match(await page.locator('#hero-title').innerText(),/Charter Drop/);assert.equal(await page.evaluate(()=>Number(getComputedStyle(document.querySelector('.hero-service-charter')).opacity)>.4),true,'Charter hero inactive at '+width);
   assert.equal(await page.locator('#passengers').inputValue(),'1');await page.locator('#origin').selectOption('Singaraja');await page.locator('#destination').selectOption('Denpasar');
   await page.locator('.search-button').click();assert.equal(await page.locator('.result-card').count(),1);
   await page.screenshot({path:`qa-output/charter-${width}.png`,fullPage:true});
   await page.locator('#edit-search').click();await page.locator('#tab-shuttle').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#tab-airport').getAttribute('aria-selected'),'true');
   await page.locator(width<768?'.languages button[aria-pressed=true]':'[data-language=en]').click();assert.equal(await page.locator('html').getAttribute('lang'),'en');if(width<768){assert.equal(await page.locator('.languages button[aria-pressed=true]').getAttribute('data-language'),'en');assert.equal(await page.locator('.languages button[aria-pressed=true]').evaluate(el=>getComputedStyle(el).flexDirection),'row-reverse');}assert.match(await page.locator('h1').innerText(),/Airport Transfer/);assert.match(await page.locator('#hero-subtitle').innerText(),/Private Ngurah Rai/);
   await page.locator(width<768?'.languages button[aria-pressed=true]':'[data-language=id]').click();
   if(width<768){await page.locator('.mobile-menu').click();assert.equal(await page.locator('#navigation').isVisible(),true);await page.keyboard.press('Escape');assert.equal(await page.locator('#navigation').isVisible(),false);}
   await page.locator('#faq details').first().locator('summary').click();assert.equal(await page.locator('#faq details').first().getAttribute('open')!==null,true);
   await page.locator('.footer-group').last().evaluate(d=>d.open=true);await page.locator('[data-check-booking]').last().click();await page.locator('[name=code]').fill('ST-12345');await page.locator('#check-form [name=phone]').fill('081234567890');await page.locator('#check-form button').click();assert.equal(await page.locator('#check-link').isVisible(),true);await page.keyboard.press('Escape');
   await page.setViewportSize({width:width===390?1440:390,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Overflow on resize');
   await page.reload();await page.waitForLoadState('networkidle');assert.equal(await page.locator('#tab-charter').getAttribute('aria-selected'),'true');assert.deepEqual(errors,[]);
   await page.close();console.log('PASS: responsive, booking, tabs, language, validation, resize and refresh at '+width+'px');
  }
 }finally{if(browser)await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
