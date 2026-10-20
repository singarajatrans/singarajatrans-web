/* Mobile presentation only. Booking and language continue through the existing controls. */
(function(){'use strict';
const mobile=matchMedia('(max-width:767px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
const search=document.querySelector('.mobile-header-search'),brand=search.querySelector('.header-search-brand'),prompt=search.querySelector('.header-search-prompt'),copy=search.querySelector('.header-search-copy');
const share=document.querySelector('.mobile-header-share'),dialog=document.querySelector('#mobile-share-dialog'),status=document.querySelector('.mobile-share-status');
const services=['shuttle','airport','charter','motor',null];
const messages={id:['Cari Travel Shuttle','Cari Airport Transfer','Cari Sewa Mobil','Cari Sewa Motor','Cari rute, kota, atau tujuan…'],en:['Find Travel Shuttle','Find Airport Transfer','Find Car Rental','Find Motorbike Rental','Search routes, cities, or destinations…']};
let index=4,started=false,stopped=false,timer=0,frame=0,shareTimer=0,phase='opening';
const en=()=>document.documentElement.lang==='en';
const text=(id,english)=>en()?english:id;
function cancel(){clearTimeout(timer);cancelAnimationFrame(frame);}
function renderPrompt(next=index){
 index=next;phase='prompt';search.classList.remove('is-wiping','is-opening');brand.hidden=true;prompt.hidden=false;
 prompt.textContent=messages[en()?'en':'id'][index];search.setAttribute('aria-label',prompt.textContent);
}
function typePrompt(next){
 if(stopped||!mobile.matches)return;
 renderPrompt(next);const letters=Array.from(prompt.textContent);prompt.textContent='';let count=0;
 function type(){
  if(stopped||!mobile.matches)return;
  prompt.textContent=letters.slice(0,++count).join('');
  timer=setTimeout(count<letters.length?type:cycle,count<letters.length?110:1800);
 }
 type();
}
function cycle(){
 if(stopped||!mobile.matches)return;
 const remaining=Array.from(prompt.textContent);
 function erase(){
  if(stopped||!mobile.matches)return;
  remaining.pop();prompt.textContent=remaining.join('');
  if(remaining.length){timer=setTimeout(erase,35);return;}
  timer=setTimeout(()=>typePrompt((index+1)%messages.id.length),180);
 }
 erase();
}
function wipe(){
 phase='wipe';search.classList.remove('is-opening');search.classList.add('is-wiping');const start=performance.now();
 function tick(now){
  if(stopped||!mobile.matches)return;
  const progress=Math.min(1,(now-start)/2300),ease=progress*progress*(3-2*progress),width=copy.clientWidth,x=width+20-(width+40)*ease;
  search.style.setProperty('--car-opacity',Math.min(1,progress*8,(1-progress)*8));search.style.setProperty('--car-x',x+'px');search.style.setProperty('--brand-erased',Math.max(0,width-x)+'px');
  if(progress<1)frame=requestAnimationFrame(tick);
  else{search.classList.remove('is-wiping');typePrompt(0);}
 }
 frame=requestAnimationFrame(tick);
}
function labels(){
 if(!mobile.matches)return;
 document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-label',button.dataset.language==='id'?'Switch to English':'Ganti ke Bahasa Indonesia'));
 share.setAttribute('aria-label',text('Bagikan halaman','Share page'));
 document.querySelector('#mobile-share-title').textContent=text('Bagikan halaman','Share page');
 dialog.querySelector('label').textContent=text('Salin tautan halaman','Copy page link');
 document.querySelector('#mobile-share-help').textContent=text('Pilih tautan lalu salin melalui menu perangkat Anda.','Select the link and copy it using your device menu.');
 dialog.querySelector('[data-share-close]').setAttribute('aria-label',text('Tutup','Close'));
 if(phase==='prompt'){cancel();renderPrompt();if(!stopped)timer=setTimeout(cycle,1800);}
}
function openBrand(){
 cancel();phase='opening';
 search.classList.remove('is-opening','is-wiping');brand.hidden=false;prompt.hidden=true;
 search.style.setProperty('--brand-erased','0px');search.style.setProperty('--car-opacity','0');
 search.setAttribute('aria-label',text('SINGARAJA TRANS — buka pencarian','SINGARAJA TRANS — open search'));
 search.style.setProperty('--brand-unrevealed','100%');search.classList.add('is-opening');
 const start=performance.now();
 function reveal(now){
  if(stopped||!mobile.matches||phase!=='opening')return;
  const progress=Math.min(1,(now-start)/1800);
  search.style.setProperty('--brand-unrevealed',((1-progress)*100)+'%');
  if(progress<1)frame=requestAnimationFrame(reveal);
 }
 frame=requestAnimationFrame(reveal);timer=setTimeout(wipe,3000);
}
function start(){
 if(!mobile.matches||started&&!stopped)return;
 labels();
 const returning=started;started=true;stopped=false;cancel();
 search.classList.add('has-typewriter');
 // Search motion is explicitly requested; keep typing and the opening car available in reduced-motion mode.
 // CSS still suppresses extra shaking, wheel/smoke effects and caret flashing in that mode.
 if(returning&&phase==='prompt'){typePrompt(index);return;}
 openBrand();
}
// These listeners are registered once; desktop handlers return without doing anything.
document.addEventListener('pointerdown',event=>{
 // A touch gesture in the page leaves header controls, so keyboard-focus protection must not pin the header.
 const header=document.querySelector('#header');
 if(mobile.matches&&!header.contains(event.target)&&header.contains(document.activeElement))document.activeElement.blur();
},{passive:true});
// Translation swaps the visible language button; retain keyboard focus on that button.
document.querySelector('.languages').addEventListener('click',event=>{if(mobile.matches&&event.detail===0)document.querySelector('.languages button[aria-pressed=true]').focus({preventScroll:true});});
search.addEventListener('click',event=>{
 if(!mobile.matches)return;event.preventDefault();
 const service=services[index];if(service)document.querySelector('#tab-'+service).click();
 document.querySelector('#pesan').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
 const target=document.body.dataset.service==='motor'?document.querySelector('#motor-entry a'):document.querySelector('#origin');
 target.focus({preventScroll:true});
});
async function fallbackShare(){
 const url=location.href;
 try{
  if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
  await navigator.clipboard.writeText(url);clearTimeout(shareTimer);share.querySelector('use').setAttribute('href','#check');status.textContent=text('Tautan berhasil disalin.','Link copied.');
  share.setAttribute('aria-label',status.textContent);shareTimer=setTimeout(()=>{share.querySelector('use').setAttribute('href','#share');share.setAttribute('aria-label',text('Bagikan halaman','Share page'));},2400);
 }catch{
  document.querySelector('#mobile-share-url').value=url;dialog.showModal();document.body.classList.add('modal-open');document.querySelector('#mobile-share-url').select();
 }
}
share.addEventListener('click',async()=>{
 if(!mobile.matches)return;
 try{if(navigator.share)await navigator.share({title:document.title,url:location.href});else await fallbackShare();}
 catch(error){if(error.name!=='AbortError')await fallbackShare();}
});
dialog.querySelector('[data-share-close]').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(mobile.matches)share.focus({preventScroll:true});});
new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
function syncMode(){
 if(mobile.matches){start();return;}
 cancel();stopped=true;search.classList.remove('has-typewriter');if(started)renderPrompt(4);
 document.querySelectorAll('[data-language]').forEach(button=>button.removeAttribute('aria-label'));
 if(dialog.open)dialog.close();
}
mobile.addEventListener('change',syncMode);
// Safari can deliver viewport resize and media-query changes in separate turns.
window.addEventListener('resize',syncMode,{passive:true});
function resume(){
 if(!mobile.matches||!started||document.hidden)return;
 stopped=false;cancel();search.classList.add('has-typewriter');
 if(phase==='prompt')typePrompt(index);
 else if(phase==='wipe')wipe();
 else openBrand();
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();else resume();});
window.addEventListener('pageshow',event=>{if(event.persisted)resume();});
start();
})();
