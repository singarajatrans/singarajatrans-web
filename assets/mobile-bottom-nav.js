/* Mobile bottom navigation presentation only. No new routing, auth, or booking state. */
(function(){'use strict';
const mobile=matchMedia('(max-width:767px)');
const nav=document.querySelector('.mobile-bottom-nav');
if(!nav)return;
const items=[...nav.querySelectorAll('[data-bottom-nav]')];
const status=nav.querySelector('.mobile-bottom-status');
const checkDialog=document.querySelector('#check-dialog');
let previous='home';

function current(){return items.find(item=>item.getAttribute('aria-current')==='page')?.dataset.bottomNav||'home';}
function setCurrent(name){
 items.forEach(item=>{
  if(item.dataset.bottomNav===name)item.setAttribute('aria-current','page');
  else item.removeAttribute('aria-current');
 });
}
function unavailable(name){
 status.textContent=name==='favorites'?'Favorit belum tersedia.':'Akun belum tersedia.';
}

nav.addEventListener('click',event=>{
 if(!mobile.matches)return;
 const item=event.target.closest('[data-bottom-nav]');
 if(!item)return;
 const name=item.dataset.bottomNav;
 if(item.getAttribute('aria-disabled')==='true'){
  event.preventDefault();
  unavailable(name);
  return;
 }
 if(name==='trips'){
  previous=current();
  setCurrent('trips');
  return;
 }
 if(name==='home'||name==='explore')setCurrent(name);
});

checkDialog?.addEventListener('close',()=>{if(current()==='trips')setCurrent(previous);});

function syncMode(){
 if(!mobile.matches){items.forEach(item=>item.removeAttribute('aria-current'));return;}
 if(!items.some(item=>item.getAttribute('aria-current')==='page'))setCurrent('home');
}
mobile.addEventListener('change',syncMode);
syncMode();
})();