const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdirSync}=require('node:fs');
const pw=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const server=spawn('python3',['-m','http.server','4175','--bind','127.0.0.1'],{stdio:'ignore'});
 mkdirSync('qa-output',{recursive:true});
 try{
  for(let i=0;i<40;i++){try{if((await fetch('http://127.0.0.1:4175/')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
  for(const engine of ['chromium','webkit','firefox']){
   const browser=await pw[engine].launch({headless:true});
   try{
    for(const [width,motion] of [[320,'no-preference'],[390,'no-preference'],[430,'no-preference'],[390,'reduce']]){
     const profile={...pw.devices[engine==='webkit'?'iPhone 13':'Pixel 7'],viewport:{width,height:844},deviceScaleFactor:1,reducedMotion:motion};
     if(engine==='firefox')delete profile.isMobile;
     const context=await browser.newContext(profile),p=await context.newPage(),errors=[];
     p.on('pageerror',e=>errors.push(e.message));
     const prefix='qa-output/search-lifecycle-'+engine+'-'+width+'-'+motion;
     try{
      await p.clock.install();await p.clock.pauseAt(new Date(Date.now()+1000));
      await p.goto('http://127.0.0.1:4175/',{waitUntil:'networkidle'});
      const search=p.locator('.mobile-header-search'),prompt=p.locator('.header-search-prompt');
      const active=()=>search.evaluate(e=>e.classList.contains('has-typewriter'));
      async function progress(message){const initial=await prompt.innerText();for(let i=0;i<12;i++){await p.clock.runFor(400);if(await prompt.innerText()!==initial)return;}assert.fail(message);}
      await p.clock.runFor(3500);
      assert.equal(await p.locator('.header-search-car').isVisible(),true,'Opening car missing: '+engine+'/'+motion);
      const carX=await search.evaluate(e=>parseFloat(e.style.getPropertyValue('--car-x')));
      await p.clock.runFor(400);
      assert.ok(await search.evaluate((e,x)=>parseFloat(e.style.getPropertyValue('--car-x'))<x,carX),'Car must advance');
      assert.equal(await p.locator('.header-car-chassis>path').first().evaluate(e=>getComputedStyle(e).fill),await p.locator('#header').evaluate(e=>getComputedStyle(e).backgroundColor));
      await p.screenshot({path:prefix+'-car.png'});
      await p.clock.runFor(4000);
      assert.equal(await active(),true);
      assert.equal(await prompt.isVisible(),true);
      assert.equal(await p.locator('.header-search-car').isVisible(),false);
      for(let step=0;step<45&&await prompt.innerText()!=='Cari rute, kota, atau tujuan…';step++)await p.clock.runFor(1000);
      assert.equal(await prompt.innerText(),'Cari rute, kota, atau tujuan…','Last phrase must be reached');
      for(let step=0;step<12&&await prompt.innerText()!=='Cari Travel Shuttle';step++)await p.clock.runFor(500);
      assert.equal(await prompt.innerText(),'Cari Travel Shuttle','Last phrase must loop to first');
      await search.click();await p.clock.runFor(6000);
      assert.equal(await p.locator('body').getAttribute('data-service'),'shuttle');
      assert.equal(await active(),true,'Booking interaction stopped typing');
      assert.notEqual(await search.getAttribute('aria-label'),'Cari Travel Shuttle');

      // Crossing the mobile breakpoint, as with phone rotation, must not permanently stop typing.
      await p.setViewportSize({width:900,height:430});await p.clock.runFor(300);
      assert.equal(await search.isVisible(),false);
      await p.setViewportSize({width,height:844});
      for(let i=0;i<20;i++){await p.clock.runFor(200);await new Promise(r=>setTimeout(r,50));if(await active())break;}
      assert.equal(await search.isVisible(),true);assert.equal(await active(),true);
      let before=await prompt.innerText();await p.clock.runFor(2500);
      assert.notEqual(await prompt.innerText(),before,'Typing did not restart after rotation');

      // Simulate the document lifecycle notifications; these do not emulate real Safari toolbar/touch physics.
      await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
      before=await prompt.innerText();await p.clock.runFor(4000);
      assert.equal(await prompt.innerText(),before,'Hidden page must suspend its timers');
      await p.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
      await progress('Return to browser did not resume typing');
      before=await prompt.innerText();
      await p.evaluate(()=>dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));
      await progress('BFCache restore did not resume typing');

      // Changing the system motion preference must not leave this explicitly requested search feature frozen.
      await p.emulateMedia({reducedMotion:motion==='reduce'?'no-preference':'reduce'});
      await progress('Motion preference change froze search');
      await p.reload({waitUntil:'networkidle'});await p.clock.runFor(3500);
      assert.equal(await p.locator('.header-search-car').isVisible(),true,'Refresh must replay the opening car');
      await p.clock.runFor(4500);assert.equal(await active(),true);
      assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
      assert.deepEqual(errors,[]);
      await p.screenshot({path:prefix+'-typing.png'});
      console.log('PASS search lifecycle '+engine+' '+width+'px '+motion+': car, color, loop, booking, rotation, return, BFCache, preference change and refresh');
     }catch(error){
      console.error('Search diagnostic',engine,width,motion,await p.evaluate(()=>({width:innerWidth,mobile:matchMedia('(max-width:767px)').matches,headerDisplay:getComputedStyle(document.querySelector('.mobile-header-search')).display,hidden:document.hidden,reduced:matchMedia('(prefers-reduced-motion:reduce)').matches,classes:document.querySelector('.mobile-header-search').className,prompt:document.querySelector('.header-search-prompt').textContent})));
      await p.screenshot({path:prefix+'-failure.png'});throw error;
     }finally{await context.close();}
    }
   }finally{await browser.close();}
  }
 }finally{server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
