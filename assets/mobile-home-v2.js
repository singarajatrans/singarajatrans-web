/* Mobile home discovery controls delegate to the existing booking controls. */
(()=>{'use strict';
 const mobile=matchMedia('(max-width:767px)');
 const buttons=[...document.querySelectorAll('[data-home-route]')];
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
