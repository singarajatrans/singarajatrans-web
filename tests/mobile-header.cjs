const assert=require('node:assert/strict');
module.exports=async function testMobileHeader(browser,url){
 for(const width of [320,360,390,412,430]){
  const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
  await page.goto(url,{waitUntil:'networkidle'});
  assert.equal(await page.locator('.reference-header').isVisible(),true);
  assert.equal(await page.locator('#search-panel').isVisible(),false);
  assert.equal(await page.locator('.reference-header').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(27, 195, 189)');
  assert.equal(await page.locator('.reference-filter').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(255, 150, 89)');
  assert.equal(await page.locator('.service-tabs button:visible').count(),4);
  assert.equal(await page.locator('.mobile-bottom-item:visible').count(),4);
  await page.locator('.reference-search').click();
  assert.equal(await page.locator('#search-panel').isVisible(),true);
  assert.equal(await page.locator('#origin').evaluate(el=>el===document.activeElement),true);
  await page.locator('[data-close-home-booking]').click();
  assert.equal(await page.locator('#search-panel').isVisible(),false);
  await page.locator('.reference-filter').click();
  assert.equal(await page.locator('.reference-filter').getAttribute('aria-expanded'),'true');
  await page.locator('[data-close-home-booking]').click();
  await page.locator('.reference-notification').click();
  assert.equal(await page.locator('#check-dialog').isVisible(),true);
  await page.keyboard.press('Escape');
  for(const action of ['favorites','account']){
   await page.locator('[data-bottom-nav='+action+']').dispatchEvent('click');
   assert.ok(await page.locator('.mobile-bottom-status').innerText());
  }
  await page.locator('[data-bottom-nav=trips]').click();
  assert.equal(await page.locator('#check-dialog').isVisible(),true);await page.keyboard.press('Escape');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.body.scrollWidth<=innerWidth),true);
  await page.close();console.log('PASS reference header, search opening/closing, keyboard focus, booking check and four-item navigation at '+width+'px');
 }
};
