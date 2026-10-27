/* Mobile home discovery controls delegate to the existing booking controls. */
(()=>{'use strict';
 const mobile=matchMedia('(max-width:767px)');
 const buttons=[...document.querySelectorAll('[data-home-route]')];
 const toggle=document.querySelector('.reference-filter');
 document.addEventListener('pointerdown',event=>{
  const header=document.querySelector('#header');
  if(mobile.matches&&!header.contains(event.target)&&header.contains(document.activeElement))document.activeElement.blur();
 },{passive:true});
 function openBooking(focus=false){
  if(!mobile.matches)return;
  document.body.classList.add('home-booking-open');toggle.setAttribute('aria-expanded','true');
  if(focus){document.querySelector('#search-panel').scrollIntoView({behavior:'instant',block:'center'});document.querySelector('#origin').focus({preventScroll:true});}
 }
 function closeBooking(){document.body.classList.remove('home-booking-open');toggle.setAttribute('aria-expanded','false');document.querySelector('.reference-search').focus({preventScroll:true});}
 document.addEventListener('click',event=>{
  if(!mobile.matches)return;
  if(event.target.closest('[data-service],[data-route],[data-home-route],a[href="#pesan"],.reference-filter'))openBooking();
 },true);
 document.querySelector('.reference-search').addEventListener('click',event=>{event.preventDefault();openBooking(true)});
 toggle.addEventListener('click',()=>openBooking(true));
 document.querySelector('[data-close-home-booking]').addEventListener('click',closeBooking);
 document.querySelector('[data-reference-all]').addEventListener('click',event=>{
  if(!mobile.matches)return;event.preventDefault();
  const expanded=document.body.classList.toggle('home-show-all');event.currentTarget.setAttribute('aria-expanded',String(expanded));
 });
 document.querySelector('[data-reference-language]').addEventListener('click',()=>document.querySelector('[data-language="'+(document.documentElement.lang==='en'?'id':'en')+'"]').click());
 function syncPresentation(){
  document.querySelector('meta[name="theme-color"]').content=mobile.matches?'#0b7285':'#c85759';
  if(mobile.matches&&(location.hash==='#pesan'||new URLSearchParams(location.search).has('from')))openBooking();
 }
 mobile.addEventListener('change',syncPresentation);syncPresentation();
 function render(){
  const english=document.documentElement.lang==='en';
  for(const button of buttons){
   const [from,to]=button.dataset.homeRoute.split('|');
   const route=window.Singaraja.routes.find(route=>route.from===from&&route.to===to);
   button.querySelector('.home-popular-price').textContent=route?
    `${english?'From':'Mulai dari'} Rp${new Intl.NumberFormat('id-ID').format(route.price)} / ${english?'person':'orang'}`:'';
  }
 }
 buttons.forEach(button=>button.addEventListener('click',()=>{
  if(!mobile.matches)return;
  document.querySelector('#tab-shuttle').click();
  const [from,to]=button.dataset.homeRoute.split('|');
  for(const [id,value] of [['origin',from],['destination',to]]){
   const field=document.getElementById(id);field.value=value;
   field.dispatchEvent(new Event('change',{bubbles:true}));
  }
  document.querySelector('#pesan').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
  document.querySelector('#date').focus({preventScroll:true});
 }));
 new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 render();
})();
