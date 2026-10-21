(function(root){'use strict';

const one=(selector,scope=document)=>scope.querySelector(selector);
const all=(selector,scope=document)=>[...scope.querySelectorAll(selector)];

function softHaptic(duration=10){
 if(typeof navigator==='undefined'||!('vibrate' in navigator))return false;
 try{return Boolean(navigator.vibrate(duration));}catch{return false;}
}

function bindTapHaptics(){
 document.addEventListener('click',event=>{
  const target=event.target.closest('#search-form button[type="submit"],.mobile-bottom-item');
  if(!target)return;
  softHaptic();
 },{passive:true});
}

function initReviewCarousel(){
 const grid=one('.review-grid');
 const mobile=window.matchMedia('(max-width:767px)');
 if(!grid||!mobile.matches)return;
 const cards=all('.review-card',grid);
 if(cards.length<2)return;

 let indicator=one('.review-indicator',grid.parentElement);
 if(!indicator){
  indicator=document.createElement('div');
  indicator.className='review-indicator';
  indicator.setAttribute('aria-label','Navigasi ulasan pelanggan');
  grid.insertAdjacentElement('afterend',indicator);
 }

 let active=0;
 const scrollToCard=(index,behavior='smooth')=>{
  const card=cards[index];
  if(!card)return;
  const gridRect=grid.getBoundingClientRect();
  const cardRect=card.getBoundingClientRect();
  const left=grid.scrollLeft+(cardRect.left-gridRect.left);
  grid.scrollTo({left,behavior});
 };

 indicator.replaceChildren(...cards.map((card,index)=>{
  const button=document.createElement('button');
  button.type='button';
  button.setAttribute('aria-label',`Tampilkan ulasan ${index+1} dari ${cards.length}`);
  button.setAttribute('aria-pressed',index===0?'true':'false');
  button.addEventListener('click',()=>scrollToCard(index));
  return button;
 }));

 const buttons=all('button',indicator);
 const update=()=>{
  const gridRect=grid.getBoundingClientRect();
  const center=gridRect.left+gridRect.width/2;
  let nearest=Infinity;
  cards.forEach((card,index)=>{
   const rect=card.getBoundingClientRect();
   const distance=Math.abs((rect.left+rect.width/2)-center);
   if(distance<nearest){nearest=distance;active=index;}
  });
  buttons.forEach((button,index)=>button.setAttribute('aria-pressed',index===active?'true':'false'));
 };

 let frame=0;
 grid.addEventListener('scroll',()=>{
  if(frame)return;
  frame=requestAnimationFrame(()=>{frame=0;update();});
 },{passive:true});
 window.addEventListener('resize',update,{passive:true});

 const autoplay=window.setInterval(()=>{
  if(document.hidden||!mobile.matches)return;
  scrollToCard((active+1)%cards.length);
 },4000);
 window.addEventListener('pagehide',()=>window.clearInterval(autoplay),{once:true});
 update();
}

function fieldControl(field){
 if(!field)return null;
 return field.querySelector('select:not([hidden]),input:not([hidden]),textarea:not([hidden])');
}

function clearInvalidField(field){
 if(!field)return;
 field.classList.remove('field-invalid','field-invalid-shake');
}

function syncField(field){
 if(!field)return false;
 const control=fieldControl(field);
 const hasValue=Boolean(control&&control.value);
 field.classList.toggle('has-value',hasValue);
 if(hasValue)clearInvalidField(field);
 return hasValue;
}

function syncFields(scope=document){
 all('.field',scope).forEach(syncField);
}

function clearInvalidFields(scope=document){
 all('.field.field-invalid',scope).forEach(clearInvalidField);
}

function restartClass(element,className,duration=360){
 if(!element)return;
 element.classList.remove(className);
 void element.offsetWidth;
 element.classList.add(className);
 window.setTimeout(()=>element.classList.remove(className),duration);
}

function feedbackInvalidFields(ids,{scope=document,haptic=true,duration=360}={}){
 clearInvalidFields(scope);
 const fields=[];
 ids.forEach(id=>{
  const control=one('#'+id,scope)||document.getElementById(id);
  const field=control?.closest('.field');
  if(!field)return;
  field.classList.add('field-invalid');
  restartClass(field,'field-invalid-shake',duration);
  fields.push(field);
 });
 if(fields.length&&haptic)softHaptic();
 return fields;
}

root.SingarajaUI={
 one,
 all,
 softHaptic,
 fieldControl,
 syncField,
 syncFields,
 clearInvalidField,
 clearInvalidFields,
 restartClass,
 feedbackInvalidFields,
 bindTapHaptics
};
bindTapHaptics();
initReviewCarousel();
})(typeof window!=='undefined'?window:globalThis);
