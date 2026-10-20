const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdirSync}=require('node:fs');
const {webkit,devices}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const server=spawn('python3',['-m','http.server','4174','--bind','127.0.0.1'],{stdio:'ignore'});
 let browser;
 try{
  for(let i=0;i<40;i++){try{if((await fetch('http://127.0.0.1:4174/')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
  browser=await webkit.launch({headless:true});mkdirSync('qa-output',{recursive:true});
  for(const device of ['iPhone SE','iPhone 13','iPhone 14 Pro Max']){
   const context=await browser.newContext({...devices[device]});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   try{
    await page.goto('http://127.0.0.1:4174/',{waitUntil:'networkidle'});
    const width=await page.evaluate(()=>innerWidth);
    assert.equal(await page.evaluate(()=>document.documentElement.classList.contains('native-page-scroll')),true);
    assert.equal(await page.evaluate(()=>getComputedStyle(document.body).position),'static');
    assert.equal(await page.evaluate(()=>document.scrollingElement===document.documentElement),true);
    // Exercise the native scroll surface and repeated direction reversals.
    // Desktop WebKit cannot reproduce physical iPhone touch momentum or Safari toolbar animation.
    for(let turn=0;turn<4;turn++){
     await page.evaluate(()=>window.scrollTo({top:720,behavior:'instant'}));
     await page.waitForFunction(()=>scrollY>600&&document.querySelector('#header').classList.contains('is-hidden'));
     const down=await page.evaluate(()=>scrollY);
     assert.equal(await page.evaluate(()=>document.body.scrollTop),0,'Body must not be a second scroller');
     assert.equal(await page.evaluate(()=>getComputedStyle(document.body).borderTopLeftRadius),'0px');
     await page.evaluate(()=>window.scrollBy({top:-180,behavior:'instant'}));
     await page.waitForFunction(()=>!document.querySelector('#header').classList.contains('is-hidden')&&Math.abs(document.querySelector('#header').getBoundingClientRect().top)<1);
     assert.ok(await page.evaluate(y=>scrollY<y-150,down));
     assert.ok(Math.abs((await page.locator('#header').boundingBox()).y)<1);
     const nav=await page.locator('.mobile-bottom-nav').boundingBox();
     assert.ok(Math.abs(nav.y+nav.height-await page.evaluate(()=>innerHeight))<2);
     await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
     await page.waitForFunction(()=>scrollY===0&&Math.abs(document.querySelector('#header').getBoundingClientRect().top)<1);
     assert.ok(Math.abs((await page.locator('#header').boundingBox()).y)<1);
    }
    // Scrolling after Safari's usable viewport changes must keep the same scroll owner.
    const viewport=page.viewportSize();
    await page.setViewportSize({width:viewport.width,height:viewport.height-100});
    await page.evaluate(()=>window.scrollTo({top:900,behavior:'instant'}));
    await page.waitForFunction(()=>scrollY>800);
    await page.setViewportSize(viewport);
    await page.evaluate(()=>window.scrollBy({top:-200,behavior:'instant'}));
    await page.waitForFunction(()=>!document.querySelector('#header').classList.contains('is-hidden')&&Math.abs(document.querySelector('#header').getBoundingClientRect().top)<1);
    await page.locator('[data-bottom-nav="explore"]').click();
    await page.waitForFunction(()=>document.querySelector('[data-bottom-nav="explore"]').getAttribute('aria-current')==='page');
    await page.locator('[data-bottom-nav="trips"]').click();
    await page.waitForFunction(()=>document.querySelector('#check-dialog').open);
    await page.keyboard.press('Escape');
    await page.waitForFunction(()=>!document.querySelector('#check-dialog').open&&!document.body.classList.contains('modal-open'));
    await page.locator('[data-bottom-nav="home"]').click();
    await page.waitForFunction(()=>scrollY<100);
    await page.locator('#tab-airport').click();
    assert.equal(await page.locator('#tab-airport').getAttribute('aria-selected'),'true');
    assert.equal(await page.locator('#origin').inputValue(),'Bandara Ngurah Rai');
    await page.locator('#tab-shuttle').click();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    assert.deepEqual(errors,[]);
    await page.screenshot({path:'qa-output/ios-native-scroll-'+width+'.png'});
    console.log('PASS WebKit '+device+': native scroll, reversals, viewport resize, header, navigation and booking tabs');
   }catch(error){
    console.error('iOS scroll diagnostic',device,await page.evaluate(()=>({y:scrollY,bodyY:document.body.scrollTop,headerTop:document.querySelector('#header').getBoundingClientRect().top,hidden:document.querySelector('#header').classList.contains('is-hidden'),root:getComputedStyle(document.documentElement).overflowY,body:getComputedStyle(document.body).position})));
    await page.screenshot({path:'qa-output/ios-scroll-failure-'+device.replaceAll(' ','-')+'.png'});throw error;
   }finally{await context.close();}
  }
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
