/* Mobile presentation only. Booking and language continue through the existing controls. */
(function(){'use strict';
const mobile=matchMedia('(max-width:767px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
const search=document.querySelector('.mobile-header-search'),brand=search.querySelector('.header-search-brand'),prompt=search.querySelector('.header-search-prompt'),copy=search.querySelector('.header-search-copy');
const share=document.querySelector('.mobile-header-share'),dialog=document.querySelector('#mobile-share-dialog'),status=document.querySelector('.mobile-share-status');
const services=['shuttle','airport','charter','motor',null];
const messages={id:['Cari Travel Shuttle','Cari Airport Transfer','Cari Sewa Mobil','Cari Sewa Motor','Cari rute, kota, atau tujuan…'],en:['Find Travel Shuttle','Find Airport Transfer','Find Car Rental','Find Motorbike Rental','Search routes, cities, or destinations…']};
let index=4,started=false,stopped=false,timer=0,frame=0,phase='opening';
const en=()=>document.documentElement.lang==='en';
const text=(id,english)=>en()?english:id;
function cancel(){clearTimeout(timer);cancelAnimationFrame(frame);}
function renderPrompt(next=index){
 index=next;phase='prompt';search.classList.remove('is-wiping');brand.hidden=true;prompt.hidden=false;
 prompt.textContent=messages[en()?'en':'id'][index];search.setAttribute('aria-label',prompt.textContent);
 // Restart only the small text fade; no layout or booking state changes.
 prompt.style.animation='none';void prompt.offsetWidth;prompt.style.animation='';
}
function cycle(){renderPrompt((index+1)%messages.id.length);timer=setTimeout(cycle,2800);}
function stop(){
 if(!mobile.matches||stopped)return;
 stopped=true;cancel();if(phase!=='prompt')renderPrompt(4);
 search.classList.remove('is-wiping');
}
function wipe(){
 phase='wipe';search.classList.add('is-wiping');const start=performance.now();
 function tick(now){
  if(stopped||!mobile.matches)return;
  const progress=Math.min(1,(now-start)/1500),ease=progress*progress*(3-2*progress),width=copy.clientWidth,x=width+20-(width+40)*ease;
  search.style.setProperty('--car-opacity',Math.min(1,progress*8,(1-progress)*8));search.style.setProperty('--car-x',x+'px');search.style.setProperty('--brand-erased',Math.max(0,width-x)+'px');
  if(progress<1)frame=requestAnimationFrame(tick);
  else{search.classList.remove('is-wiping');renderPrompt(0);timer=setTimeout(cycle,2800);}
 }
 frame=requestAnimationFrame(tick);
}
function labels(){
 if(!mobile.matches)return;
 document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-label',button.dataset.language==='id'?'Switch to English':'Ganti ke Bahasa Indonesia'));
 share.setAttribute('aria-label',text('Bagikan halaman','Share page'));
 document.querySelector('.mobile-header-placeholder').setAttribute('aria-label',text('Menu tambahan belum tersedia','Additional menu not available yet'));
 document.querySelector('#mobile-share-title').textContent=text('Bagikan halaman','Share page');
 dialog.querySelector('label').textContent=text('Salin tautan halaman','Copy page link');
 document.querySelector('#mobile-share-help').textContent=text('Pilih tautan lalu salin melalui menu perangkat Anda.','Select the link and copy it using your device menu.');
 dialog.querySelector('[data-share-close]').setAttribute('aria-label',text('Tutup','Close'));
 if(phase==='prompt')renderPrompt();
}
function start(){
 if(!mobile.matches)return;
 labels();if(started)return;started=true;
 if(reduced.matches||document.body.classList.contains('results-page')){stopped=true;renderPrompt(4);return;}
 brand.hidden=false;prompt.hidden=true;search.setAttribute('aria-label',text('SINGARAJA TRANS — buka pencarian','SINGARAJA TRANS — open search'));
 timer=setTimeout(wipe,3000);
}
// These listeners are registered once; desktop handlers return without doing anything.
['pointerdown','keydown','wheel'].forEach(type=>document.addEventListener(type,stop,{passive:true}));
search.addEventListener('focus',stop);
search.addEventListener('click',event=>{
 if(!mobile.matches)return;event.preventDefault();stop();
 const service=services[index];if(service)document.querySelector('#tab-'+service).click();
 document.querySelector('#pesan').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
 const target=document.body.dataset.service==='motor'?document.querySelector('#motor-entry a'):document.querySelector('#origin');
 target.focus({preventScroll:true});
});
async function fallbackShare(){
 const url=location.href;
 try{
  if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
  await navigator.clipboard.writeText(url);clearTimeout(timer);share.querySelector('use').setAttribute('href','#check');status.textContent=text('Tautan berhasil disalin.','Link copied.');
  share.setAttribute('aria-label',status.textContent);timer=setTimeout(()=>{share.querySelector('use').setAttribute('href','#share');share.setAttribute('aria-label',text('Bagikan halaman','Share page'));},2400);
 }catch{
  document.querySelector('#mobile-share-url').value=url;dialog.showModal();document.body.classList.add('modal-open');document.querySelector('#mobile-share-url').select();
 }
}
share.addEventListener('click',async()=>{
 if(!mobile.matches)return;stop();
 try{if(navigator.share)await navigator.share({title:document.title,url:location.href});else await fallbackShare();}
 catch(error){if(error.name!=='AbortError')await fallbackShare();}
});
dialog.querySelector('[data-share-close]').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
mobile.addEventListener('change',()=>{if(mobile.matches)start();else{cancel();stopped=true;if(started)renderPrompt(4);document.querySelectorAll('[data-language]').forEach(button=>button.removeAttribute('aria-label'));if(dialog.open)dialog.close();}});
reduced.addEventListener('change',()=>{if(reduced.matches)stop();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
start();
})();
