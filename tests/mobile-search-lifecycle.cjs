const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdirSync}=require('node:fs');
const pw=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const server=spawn('python3',['-m','http.server','4175','--bind','127.0.0.1'],{stdio:'ignore'});
 mkdirSync('qa-output',{recursive:true});
 const brandReference={},cornerReference={pixels:null};
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
      await p.clock.runFor(900);
      const brand=p.locator('.header-search-name');
      assert.equal(await brand.evaluate(e=>getComputedStyle(e).animationName),'header-brand-reveal','Brand reveal must run after every refresh, including reduced motion');
      assert.equal(await p.evaluate(()=>[...document.fonts].filter(f=>f.family.includes('ST Search')&&f.status==='loaded').length),2,'Both embedded wordmark faces must be loaded');
      assert.equal(await p.evaluate(()=>document.fonts.check('750 13px "ST Search Sans"','SINGARAJA')&&document.fonts.check('italic 600 14px "ST Search Serif"','TRANS')),true,'Bundled wordmark fonts must load');
      assert.match(await brand.evaluate(e=>getComputedStyle(e).fontFamily),/ST Search Sans/);
      assert.match(await p.locator('.header-brand-accent').evaluate(e=>getComputedStyle(e).fontFamily),/ST Search Serif/);
      const wordmark=await brand.boundingBox();
      assert.ok(wordmark.width<=await p.locator('.header-search-copy').evaluate(e=>e.clientWidth),'Wordmark must fit its search area');
      if(brandReference[width])assert.ok(Math.abs(wordmark.width-brandReference[width])<1,'Wordmark width differs across engines or motion settings');
      else brandReference[width]=wordmark.width;
      await p.screenshot({path:prefix+'-brand.png'});
      await p.clock.runFor(2600);
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
      // Compare the rendered contour itself, rather than just a radius declaration.
      await p.emulateMedia({reducedMotion:'reduce'});
      await p.evaluate(()=>{const surface=document.documentElement.classList.contains('native-page-scroll')?document.scrollingElement:document.body;surface.scrollTo({top:0,behavior:'instant'});});
      await p.clock.runFor(200);await new Promise(r=>setTimeout(r,30));
      await p.evaluate(()=>{const surface=document.documentElement.classList.contains('native-page-scroll')?document.scrollingElement:document.body;surface.scrollTo({top:720,behavior:'instant'});});
      for(let i=0;i<20;i++){
       await p.clock.runFor(200);await new Promise(r=>setTimeout(r,30));
       if(await p.evaluate(()=>document.querySelector('#header').classList.contains('is-hidden')&&getComputedStyle(document.documentElement,'::before').opacity==='1'))break;
      }
      assert.equal(await p.evaluate(()=>getComputedStyle(document.body).borderTopLeftRadius),'0px','Scroll layer must stay unclipped on every engine');
      assert.deepEqual(await p.evaluate(()=>{const s=getComputedStyle(document.documentElement,'::before');return [s.width,s.height,s.pointerEvents]}),['24px','24px','none']);
      await p.screenshot({path:prefix+'-radius.png'});
      await p.evaluate(()=>{const e=document.createElement('div');e.id='corner-qa-surface';e.style.cssText='position:fixed;inset:0;z-index:18;background:white;pointer-events:none';document.body.append(e);});
      async function corner(x){
       const png=await p.screenshot({clip:{x,y:0,width:24,height:24},scale:'css'});
       return p.evaluate(async data=>{const image=new Image();image.src=data;await image.decode();const canvas=document.createElement('canvas');canvas.width=canvas.height=24;const c=canvas.getContext('2d');c.drawImage(image,0,0);const pixels=c.getImageData(0,0,24,24).data;return Array.from({length:576},(_,i)=>pixels[i*4+1]<180?1:0);},'data:image/png;base64,'+png.toString('base64'));
      }
      const left=await corner(0),right=await corner(width-24);
      const painted=left.reduce((a,b)=>a+b,0);
      assert.ok(painted>100&&painted<150,'Corner mask must render the 24px circular contour: '+painted);
      assert.equal(left[0],1);assert.equal(left[575],0);
      const mirrored=right.map((_,i)=>right[Math.floor(i/24)*24+23-i%24]);
      assert.ok(left.filter((v,i)=>v!==mirrored[i]).length<=6,'Left and right corner contours differ');
      if(cornerReference.pixels)assert.ok(left.filter((v,i)=>v!==cornerReference.pixels[i]).length<=12,'Rendered corner contour differs across mobile engines');
      else cornerReference.pixels=left;

      console.log('PASS search lifecycle '+engine+' '+width+'px '+motion+': car, color, loop, booking, rotation, return, BFCache, preference change, refresh, bundled wordmark and matching corner pixels');
     }catch(error){
      console.error('Search diagnostic',engine,width,motion,await p.evaluate(()=>({width:innerWidth,mobile:matchMedia('(max-width:767px)').matches,headerDisplay:getComputedStyle(document.querySelector('.mobile-header-search')).display,hidden:document.hidden,reduced:matchMedia('(prefers-reduced-motion:reduce)').matches,classes:document.querySelector('.mobile-header-search').className,prompt:document.querySelector('.header-search-prompt').textContent})));
      await p.screenshot({path:prefix+'-failure.png'});throw error;
     }finally{await context.close();}
    }
   }finally{await browser.close();}
  }
 }finally{server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
