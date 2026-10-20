/* Mobile bottom navigation presentation only. No new routing, auth, or booking state. */
(function(){'use strict';
const mobile=matchMedia('(max-width:767px)');
const nav=document.querySelector('.mobile-bottom-nav');
if(!nav)return;
const items=[...nav.querySelectorAll('[data-bottom-nav]')];
const status=nav.querySelector('.mobile-bottom-status');
const checkDialog=document.querySelector('#check-dialog');
const topNav=document.querySelector('#navigation');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const tracked=[
 ['#rute','explore'],
 ['#layanan','explore'],
 ['#wisata','explore'],
 ['#ulasan','explore'],
 ['#faq','explore']
].map(([selector,name])=>({el:document.querySelector(selector),name})).filter(entry=>entry.el);
let previous='home';
let animationTimer;
let scrollFrame;
const pageScrollTop=()=>mobile.matches&&!document.documentElement.classList.contains('native-page-scroll')?document.body.scrollTop:window.scrollY;

function current(){return items.find(item=>item.getAttribute('aria-current')==='page')?.dataset.bottomNav||'home';}
function setCurrent(name){
 const prior=current();
 items.forEach(item=>{
  const active=item.dataset.bottomNav===name;
  if(active)item.setAttribute('aria-current','page');
  else item.removeAttribute('aria-current');
  item.classList.toggle('is-nav-live',active&&mobile.matches);
 });
 items.forEach(item=>item.classList.remove('is-nav-animating'));
 clearTimeout(animationTimer);
 const active=items.find(item=>item.dataset.bottomNav===name);
 if(active&&prior!==name&&mobile.matches&&!reducedMotion.matches){
  void active.offsetWidth;
  active.classList.add('is-nav-animating');
  animationTimer=setTimeout(()=>active.classList.remove('is-nav-animating'),700);
 }
}
function unavailable(name){
 status.textContent=name==='favorites'?'Favorit belum tersedia.':'Akun belum tersedia.';
}
function syncFromScroll(){
 scrollFrame=0;
 if(!mobile.matches||checkDialog?.open)return;
 const y=pageScrollTop();
 const marker=y+(innerHeight*.42);
 let next='home';
 for(const entry of tracked){
  const top=entry.el.getBoundingClientRect().top+y;
  if(top<=marker)next=entry.name;
 }
 setCurrent(next);
}
function queueScrollSync(){
 if(scrollFrame)return;
 scrollFrame=requestAnimationFrame(syncFromScroll);
}
function syncFromMenuHash(hash){
 if(!mobile.matches||checkDialog?.open)return;
 if(['#layanan','#rute','#wisata','#ulasan','#faq'].includes(hash))setCurrent('explore');
 else if(!hash||hash==='#main'||hash==='#pesan')setCurrent('home');
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

topNav?.addEventListener('click',event=>{
 const link=event.target.closest('a[href]');
 if(!link)return;
 syncFromMenuHash(new URL(link.href,location.href).hash);
});
addEventListener('hashchange',()=>syncFromMenuHash(location.hash));
addEventListener('scroll',queueScrollSync,{passive:true});
document.body.addEventListener('scroll',queueScrollSync,{passive:true});
addEventListener('resize',queueScrollSync,{passive:true});

checkDialog?.addEventListener('close',()=>{
 if(current()==='trips')setCurrent(previous);
 queueScrollSync();
});

function syncMode(){
 if(!mobile.matches){
  items.forEach(item=>{item.removeAttribute('aria-current');item.classList.remove('is-nav-live','is-nav-animating');});
  return;
 }
 syncFromMenuHash(location.hash);
 queueScrollSync();
 if(!items.some(item=>item.getAttribute('aria-current')==='page'))setCurrent('home');
}
mobile.addEventListener('change',syncMode);
syncMode();
})();