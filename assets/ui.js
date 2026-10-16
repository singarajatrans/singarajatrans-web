(function(root){'use strict';

const one=(selector,scope=document)=>scope.querySelector(selector);
const all=(selector,scope=document)=>[...scope.querySelectorAll(selector)];

function softHaptic(duration=10){
 if(typeof navigator==='undefined'||!('vibrate' in navigator))return false;
 try{return Boolean(navigator.vibrate(duration));}catch{return false;}
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
 feedbackInvalidFields
};
})(typeof window!=='undefined'?window:globalThis);
