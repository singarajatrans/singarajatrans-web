(function(){'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],C=window.Singaraja;
let language='id',service='shuttle',lastSearch=null,selectedTrip=null,lastFocused=null;
const t=(id,en)=>language==='en'?en:id;
const escape=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const icon=n=>`<svg aria-hidden="true"><use href="#${n}"/></svg>`;
const money=n=>'Rp'+new Intl.NumberFormat('id-ID').format(n);
const formatDate=d=>new Intl.DateTimeFormat(language==='en'?'en-GB':'id-ID',{dateStyle:'long',timeZone:'Asia/Makassar'}).format(new Date(d+'T12:00:00+08:00'));
const serviceName=s=>({shuttle:'Travel Shuttle',airport:'Airport Transfer',charter:'Charter Drop'}[s]);
const tripName=k=>({shuttle:'Travel Shuttle',mpv:'MPV',minibus:t('Mini Bus','Minibus'),charter:t('Mobil privat','Private car')}[k]);
const wa=text=>'https://wa.me/6281339392525?text='+encodeURIComponent(text);
const sourceFare='https://www.singarajatrans.com/tarif-jadwal-travel/';
function translate(){
 $$('[data-en]').forEach(el=>{if(!el.dataset.id)el.dataset.id=el.innerHTML;el.innerHTML=language==='en'?el.dataset.en:el.dataset.id;});
 document.documentElement.lang=language;
 document.title=t('SINGARAJA TRANS — Travel Shuttle & Transportasi Bali','SINGARAJA TRANS — Bali Shuttle & Private Transport');
 const labels={'#origin':['Asal','Origin'],'#destination':['Tujuan','Destination'],'#date':['Tanggal Perjalanan','Travel date'],'#time':['Waktu','Departure time'],'#private-time':['Jam penjemputan','Pickup time'],'#passengers':['Penumpang','Passengers'],'.mobile-menu':['Buka menu','Open menu'],'.swap-fields':['Tukar asal dan tujuan','Swap origin and destination'],'.previous':['Rute sebelumnya','Previous routes'],'.next':['Rute berikutnya','Next routes'],'.floating-chat':['Hubungi SINGARAJA TRANS melalui WhatsApp','Contact SINGARAJA TRANS on WhatsApp']};
 Object.entries(labels).forEach(([sel,vals])=>$(sel).setAttribute('aria-label',vals[language==='en'?1:0]));
 $$('[data-close-dialog]').forEach(b=>b.setAttribute('aria-label',t('Tutup','Close')));
 $$('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)));
 updateSelects();updateServiceCopy();syncFloatingFields();renderRoutes();if(lastSearch)renderResults(false);
}
function updateSelects(){
 const list=service==='airport'?['Bandara Ngurah Rai',...Object.keys(C.airportFares)]:C.cities;
 const oldOrigin=$('#origin').value,oldDestination=$('#destination').value,oldPassengers=$('#passengers').value;
 ['origin','destination'].forEach(id=>{$('#'+id).innerHTML=`<option value="">${t('Pilih lokasi','Choose location')}</option>`+list.map(city=>`<option value="${escape(city)}">${escape(city)}</option>`).join('');});
 if(service==='airport'){
  const airport='Bandara Ngurah Rai',hasAirport=oldOrigin===airport||oldDestination===airport;
  $('#origin').value=hasAirport?oldOrigin:airport;
  $('#destination').value=hasAirport?oldDestination:(oldOrigin&&oldOrigin!==airport?oldOrigin:'Singaraja');
  if($('#origin').value===$('#destination').value)$('#destination').value=$('#origin').value===airport?'Singaraja':airport;
 }else{
  const mobilePlaceholder=window.matchMedia('(max-width:767px)').matches;
  $('#origin').value=list.includes(oldOrigin)?oldOrigin:(mobilePlaceholder?'':'Singaraja');
  $('#destination').value=list.includes(oldDestination)?oldDestination:(mobilePlaceholder?'':'Denpasar');
  if($('#origin').value&&$('#origin').value===$('#destination').value)$('#destination').value='Denpasar';
 }
 const max=service==='charter'?6:12;
 $('#passengers').innerHTML=Array.from({length:max},(_,i)=>`<option value="${i+1}">${i+1} ${t('orang',i?'people':'person')}</option>`).join('');
 $('#passengers').value=Number(oldPassengers)>0&&Number(oldPassengers)<=max?oldPassengers:'1';
 syncFloatingFields();
}
function syncFloatingFields(){
 $$('.field').forEach(field=>{const control=field.querySelector('select:not([hidden]),input:not([hidden])');field.classList.toggle('has-value',Boolean(control&&control.value));});
 const value=$('#date').value,months=language==='en'?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']:['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
 $('.date-display').textContent=value?`${Number(value.slice(8,10))} ${months[Number(value.slice(5,7))-1]}, ${value.slice(0,4)}`:'';
}
function updateServiceCopy(){
 const desktopHero={
  shuttle:[t('Travel Shuttle Bali<br>lebih mudah','Travel Shuttle Bali<br>made easier'),t('Perjalanan shuttle antarkota di Bali dengan jadwal teratur.','Scheduled shuttle journeys between Bali destinations.')],
  airport:[t('Airport Transfer Bali<br>lebih mudah','Airport Transfer Bali<br>made easier'),t('Antar jemput Bandara Ngurah Rai dengan mobil privat sesuai jadwal Anda.','Private Ngurah Rai Airport transfers arranged around your schedule.')],
  charter:[t('Charter Drop Bali<br>lebih mudah','Charter Drop Bali<br>made easier'),t('Mobil privat sekali jalan untuk perjalanan Anda di Bali.','Private one-way transport for your journey across Bali.')]
 };
 const mobileHero={
  shuttle:[t('Travel Shuttle Bali','Travel Shuttle Bali'),t('Travel shuttle antarkota.','Intercity travel shuttle.')],
  airport:[t('Airport Transfer Bali','Airport Transfer Bali'),t('Antar jemput privat Bandara Ngurah Rai.','Private Ngurah Rai Airport transfers.')],
  charter:[t('Charter Drop Bali','Charter Drop Bali'),t('Mobil privat langsung ke tujuan.','Private cars direct to your destination.')]
 };
 const hero=(window.matchMedia('(max-width:767px)').matches?mobileHero:desktopHero)[service];
 $('#hero-title').innerHTML=hero[0];$('#hero-subtitle').textContent=hero[1];
 $('#service-description').textContent=service==='shuttle'?t('Perjalanan sekali jalan, tarif per penumpang','One-way trips, priced per passenger'):service==='airport'?t('Antar jemput bandara privat, tarif per mobil','Private airport transfers, priced per vehicle'):t('Perjalanan privat sekali jalan, tarif per mobil','Private one-way trips, priced per vehicle');
 $('#time').hidden=service!=='shuttle';$('#time').disabled=service!=='shuttle';
 $('#private-time').hidden=service==='shuttle';$('#private-time').disabled=service==='shuttle';$('#private-time').required=service!=='shuttle';
 $('#search-button-label').textContent=service==='shuttle'?t('Cari Perjalanan','Find a trip'):t('Cari Mobil','Find a car');
 syncQuickDates();
}
function quickDate(offset){return C.baliDate(new Date(Date.now()+offset*86400000));}
function syncQuickDates(){
 $$('[data-quick-date]').forEach(b=>b.setAttribute('aria-pressed',String($('#date').value===quickDate(Number(b.dataset.quickDate)))));
}
function setService(next,{focus=false}={}){
 if(!['shuttle','airport','charter'].includes(next))return;
 service=next;document.body.dataset.service=service;
 $$('[role=tab]').forEach(tab=>{const active=tab.dataset.service===service;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
 $('#search-panel').setAttribute('aria-labelledby','tab-'+service);$('#search-error').hidden=true;
 if(lastSearch&&lastSearch.service!==service)$('#results').hidden=true;
 updateSelects();updateServiceCopy();
 if(focus){$('#pesan').scrollIntoView({behavior:'smooth',block:'start'});$('#origin').focus({preventScroll:true});}
}
let routeFilter='all';
function renderRoutes(){
 const popular=[['Singaraja','Denpasar'],['Singaraja','Gilimanuk'],['Singaraja','Bandara Ngurah Rai'],['Denpasar','Karangasem'],['Denpasar','Gilimanuk']];
 const visuals={
  'Singaraja|Denpasar':'assets/images/jatiluwih.webp',
  'Singaraja|Gilimanuk':'assets/images/lovina.webp',
  'Singaraja|Bandara Ngurah Rai':'assets/images/hero.webp',
  'Denpasar|Karangasem':'assets/images/jatiluwih.webp',
  'Denpasar|Gilimanuk':'assets/images/lovina.webp'
 };
 const cards=popular.filter(([from,to])=>routeFilter==='all'||from===routeFilter||to===routeFilter).map(([from,to])=>{
  const r=C.routes.find(r=>r.from===from&&r.to===to);if(!r)return '';
  const key=from+'|'+to,img=visuals[key]||'assets/images/hero.webp',airport=to==='Bandara Ngurah Rai';
  const labelTo=airport?t('Bandara','Airport'):to;
  return `<article class="route-card" data-from="${escape(from)}" data-to="${escape(to)}"><img class="route-photo" src="${img}" alt="${escape(t('Ilustrasi rute ','Route illustration ')+from+' '+labelTo)}" width="600" height="400" loading="lazy"><div class="route-card-body"><h3 class="route-path"><span>${escape(from)}</span>${icon('arrow')}<span>${escape(labelTo)}</span></h3><p class="route-note">${icon(airport?'plane':'car')}<span>${airport?'Airport Transfer':'Travel Shuttle'}</span></p><div class="route-fare"><small>${t('Mulai dari','From')}</small><div><strong>${money(r.price)}</strong><span>/ ${airport?t('mobil','vehicle'):t('orang','person')}</span></div></div><button type="button" class="button primary route-select" data-route="${escape(from)}|${escape(to)}">${t('Pilih Rute','Choose Route')} <span aria-hidden="true">→</span></button></div></article>`;
 }).join('');
 $('#route-cards').innerHTML=cards;
 if($('#route-cards'))$('#route-cards').scrollLeft=0;
}
function searchState(){return {service,from:$('#origin').value,to:$('#destination').value,date:$('#date').value,time:service==='shuttle'?$('#time').value:$('#private-time').value,passengers:Number($('#passengers').value)};}
function searchParams(s,results=false){const p=new URLSearchParams({service:s.service,from:s.from,to:s.to,date:s.date,time:s.time,passengers:String(s.passengers)});if(results)p.set('hasil','1');return p;}
function openSearchResult(s){location.assign(location.pathname+'?'+searchParams(s,true).toString());}
function retag(el,tag){if(!el||el.tagName===tag.toUpperCase())return el;const n=document.createElement(tag);[...el.attributes].forEach(a=>n.setAttribute(a.name,a.value));n.innerHTML=el.innerHTML;el.replaceWith(n);return n;}
function setResultsSemanticMode(){retag($('#hero-title'),'h2');retag($('#results-heading'),'h1');}
function restoreSearchState(){
 const p=new URLSearchParams(location.search);if(!p.has('service'))return;
 const s={service:p.get('service'),from:p.get('from')||'',to:p.get('to')||'',date:p.get('date')||'',time:p.get('time')||'',passengers:Number(p.get('passengers'))||1};
 if(!['shuttle','airport','charter'].includes(s.service)||!s.from||!s.to||!s.date)return;
 setService(s.service);$('#origin').value=s.from;$('#destination').value=s.to;$('#date').value=s.date;$('#passengers').value=String(s.passengers);$(s.service==='shuttle'?'#time':'#private-time').value=s.time;syncFloatingFields();
 if(p.get('hasil')==='1'){lastSearch=s;document.body.classList.add('results-page');setResultsSemanticMode();renderResults(false);}
}
function renderResults(scroll=true){
 const s=lastSearch,results=C.getOptions(s);$('#results').hidden=false;
 $('#results-heading').textContent=`${s.from} → ${s.to}`;$('#results-summary').textContent=`${formatDate(s.date)} · ${s.passengers} ${t('penumpang','passengers')}`;
 const cards=results.map((r,i)=>{
  const image=r.kind==='mpv'||r.kind==='charter'?'assets/images/mpv.webp':'assets/images/fleet.webp';
  const price=r.kind==='shuttle'?r.total:r.price;
  const unit=r.kind==='shuttle'?`${s.passengers} × ${money(r.price)} / ${t('orang','person')}`:t('per mobil · tarif acuan','per vehicle · reference fare');
  const capacity=r.capacity?t('Hingga '+r.capacity+' penumpang','Up to '+r.capacity+' passengers'):r.kind==='charter'?t('Mobil privat untuk rombongan','Private car for your group'):t('Jadwal publikasi','Published schedule');
  return `<article class="result-card"><img src="${image}" alt="${escape(t('Ilustrasi armada ','Vehicle illustration ')+tripName(r.kind))}" width="600" height="400"><div class="result-details"><span class="result-status">${r.kind==='shuttle'?t('Travel Shuttle','Travel Shuttle'):t('Privat','Private')}</span><h3>${escape(tripName(r.kind))}</h3><div class="result-schedule">${escape(r.time)} <small>WITA</small></div><p>${capacity}</p><p>${r.kind==='shuttle'?t('Ketersediaan kursi dikonfirmasi admin','Seat availability confirmed by our team'):t('Jemput & antar ke alamat · sekali jalan','Address pickup & drop-off · one way')}</p></div><div class="result-price"><div><strong>${money(price)}</strong><small>${unit}</small></div><button class="button primary" type="button" data-select-trip="${i}">${r.kind==='shuttle'?t('Pilih Perjalanan','Select Trip'):t('Pilih Mobil','Select Car')} <span aria-hidden="true">→</span></button></div></article>`;
 }).join('');
 if(cards)$('#result-list').innerHTML=cards;
 else{
  const route=C.routes.find(r=>r.from===s.from&&r.to===s.to);
  const charterLink=route&&s.service==='shuttle'&&s.passengers<=6?`<a class="button outline" href="${location.pathname}?${searchParams({...s,service:'charter',time:'09:00'}).toString()}#pesan">${t('Lihat Charter Drop','View Charter Drop')}</a>`:'';
  $('#result-list').innerHTML=`<div class="empty-results"><span class="empty-icon">${icon('calendar')}</span><div><h3>${t('Belum menemukan pilihan yang sesuai','No matching option found')}</h3><p>${t('Coba tanggal atau waktu lain, atau ubah detail pencarian.','Try another date or time, or edit your search details.')}</p></div><button type="button" class="button primary" data-edit-empty>${t('Ubah Pencarian','Edit Search')}</button>${charterLink}</div>`;
 }
 if(scroll)$('#results').scrollIntoView({behavior:'smooth',block:'start'});
}
function showDialog(id){lastFocused=document.activeElement;$(id).showModal();document.body.classList.add('modal-open');}
function closeDialog(dialog){dialog.close();document.body.classList.remove('modal-open');if(lastFocused&&document.contains(lastFocused))lastFocused.focus({preventScroll:true});}
function openTrip(index){
 const options=C.getOptions(lastSearch),option=options[index];if(!option)return;
 selectedTrip={...lastSearch,...option};$('#booking-form').reset();$('#booking-form').hidden=false;$('#booking-review').hidden=true;
 $('#step-one').classList.add('current');$('#step-two').classList.remove('current');
 $('#booking-trip').innerHTML=`<strong>${escape(selectedTrip.from)} → ${escape(selectedTrip.to)}</strong><p>${escape(formatDate(selectedTrip.date))} · ${escape(selectedTrip.time)} WITA · ${selectedTrip.passengers} ${t('penumpang','passengers')}</p><p>${escape(tripName(selectedTrip.kind))} · ${t('Total acuan','Reference total')}: <strong>${money(selectedTrip.total)}</strong></p>`;
 showDialog('#booking-dialog');
}
function buildRequest(d){
 const s=selectedTrip;
 return [t('Halo SINGARAJA TRANS, saya ingin mengajukan pemesanan:','Hello SINGARAJA TRANS, I would like to request a booking:'),serviceName(s.service),`${s.from} → ${s.to}`,`${formatDate(s.date)} · ${s.time} WITA`,`${t('Armada/layanan','Vehicle/service')}: ${tripName(s.kind)}`,`${t('Penumpang','Passengers')}: ${s.passengers}`,`${t('Tarif acuan total','Reference total')}: ${money(s.total)}`,`${t('Nama','Name')}: ${d.name}`,`WhatsApp: ${d.phone}`,`${t('Alamat jemput','Pickup address')}: ${d.pickup}`,`${t('Alamat tujuan','Drop-off address')}: ${d.dropoff}`,`${t('Catatan','Notes')}: ${d.notes||'-'}`,t('Mohon konfirmasi ketersediaan, harga akhir, dan metode pembayaran yang tersedia.','Please confirm availability, the final fare, and available payment methods.')].join('\n');
}
function animateInvalidSearchFields(ids){
 if(!ids.length)return;
 const widget=$('.booking-widget');if(!widget)return;
 widget.classList.remove('widget-invalid-shake');
 void widget.offsetWidth;
 widget.classList.add('widget-invalid-shake');
 if('vibrate' in navigator)navigator.vibrate(35);
 window.setTimeout(()=>widget.classList.remove('widget-invalid-shake'),560);
}
$('#search-form').addEventListener('submit',e=>{
 e.preventDefault();const s=searchState(),error=$('#search-error');error.hidden=true;
 $('#date').min=C.baliDate();
 let msg='',invalidIds=[];
 if(!s.from||!s.to){msg=t('Pilih asal dan tujuan.','Choose an origin and destination.');if(!s.from)invalidIds.push('origin');if(!s.to)invalidIds.push('destination');}
 else if(s.from===s.to){msg=t('Asal dan tujuan harus berbeda.','Origin and destination must be different.');invalidIds=['origin','destination'];}
 else if(!s.date){msg=t('Pilih tanggal perjalanan.','Choose a travel date.');invalidIds=['date'];}
 else if(s.date<C.baliDate()){msg=t('Pilih tanggal hari ini atau setelahnya.','Please choose today or a later date.');invalidIds=['date'];}
 else if(s.service==='airport'&&s.from!=='Bandara Ngurah Rai'&&s.to!=='Bandara Ngurah Rai'){msg=t('Airport Transfer harus memiliki bandara sebagai asal atau tujuan.','Airport Transfer must start or end at the airport.');invalidIds=['origin','destination'];}
 else if(s.service!=='shuttle'&&!C.validFuture(s.date,s.time)){msg=t('Pilih waktu penjemputan yang belum lewat (WITA).','Choose a future pickup time (Bali time).');invalidIds=['private-time'];}
 if(msg){animateInvalidSearchFields(invalidIds);error.textContent=msg;error.hidden=false;return;}
 openSearchResult(s);
});
$('#booking-form').addEventListener('submit',e=>{
 e.preventDefault();const data=Object.fromEntries(new FormData(e.target));
 for(const key of ['name','phone','pickup','dropoff']){data[key]=data[key].trim();if(!data[key]){const input=e.target.elements[key];input.setCustomValidity(t('Mohon isi bagian ini.','Please complete this field.'));input.reportValidity();input.addEventListener('input',()=>input.setCustomValidity(''),{once:true});return;}}
 const digits=data.phone.replace(/\D/g,'');if(digits.length<9||digits.length>15){const input=e.target.elements.phone;input.setCustomValidity(t('Masukkan nomor WhatsApp yang valid (9–15 digit).','Enter a valid WhatsApp number (9–15 digits).'));input.reportValidity();input.addEventListener('input',()=>input.setCustomValidity(''),{once:true});return;}
 if(!C.validFuture(selectedTrip.date,selectedTrip.time)){closeDialog($('#booking-dialog'));$('#search-error').textContent=t('Jadwal sudah lewat. Silakan cari ulang.','This departure has passed. Please search again.');$('#search-error').hidden=false;$('#pesan').scrollIntoView();return;}
 const rows=[[t('Nama','Name'),data.name],['WhatsApp',data.phone],[t('Alamat jemput','Pickup'),data.pickup],[t('Alamat tujuan','Drop-off'),data.dropoff],[t('Catatan','Notes'),data.notes||'—'],[t('Tarif acuan total','Reference total'),money(selectedTrip.total)]];
 $('#booking-review').innerHTML=`<dl class="review-list">${rows.map(([k,v])=>`<div><dt>${escape(k)}</dt><dd>${escape(v)}</dd></div>`).join('')}</dl><p class="notice">${t('Ini adalah permintaan pemesanan. Ketersediaan, harga akhir, dan metode pembayaran (termasuk COD bila tersedia) akan dikonfirmasi admin. Belum ada pesanan atau pembayaran yang dibuat.','This is a booking request. Availability, the final fare, and payment methods (including cash to the driver where available) are confirmed by our team. No booking or payment has been created.')}</p><div class="review-actions"><a class="button primary" href="${wa(buildRequest(data))}" target="_blank" rel="noopener">${icon('chat')}${t('Kirim permintaan via WhatsApp','Send request via WhatsApp')}</a><button class="text-button" type="button" id="back-details">${t('← Ubah detail','← Edit details')}</button></div>`;
 $('#booking-form').hidden=true;$('#booking-review').hidden=false;$('#step-one').classList.remove('current');$('#step-two').classList.add('current');$('#booking-dialog').scrollTop=0;$('#booking-review a').focus({preventScroll:true});
});
$('#check-form').addEventListener('submit',e=>{
 e.preventDefault();const d=Object.fromEntries(new FormData(e.target));
 const existing=$('#check-link');if(existing)existing.remove();
 const link=document.createElement('a');link.id='check-link';link.className='button outline';link.target='_blank';link.rel='noopener';link.textContent=t('Buka WhatsApp untuk verifikasi','Open WhatsApp to verify');link.href=wa(t('Halo, mohon cek pesanan saya.','Hello, please check my booking.')+'\n'+t('Kode booking','Booking code')+': '+d.code.trim()+'\nWhatsApp: '+d.phone.trim());e.target.appendChild(link);link.focus();
});
$('#check-form').addEventListener('input',()=>$('#check-link')?.remove());
$('#route-cards').addEventListener('click',e=>{const b=e.target.closest('[data-route]');if(!b)return;setService('shuttle');const [from,to]=b.dataset.route.split('|');$('#origin').value=from;$('#destination').value=to;$('#pesan').scrollIntoView({behavior:'smooth',block:'start'});$('#date').focus({preventScroll:true});});
$('.route-filters')?.addEventListener('click',e=>{const b=e.target.closest('[data-route-filter]');if(!b)return;routeFilter=b.dataset.routeFilter;$$('[data-route-filter]').forEach(x=>x.classList.toggle('active',x===b));renderRoutes();});
$('[data-results-back]')?.addEventListener('click',()=>$('#edit-search').click());
$('#result-list').addEventListener('click',e=>{const b=e.target.closest('[data-select-trip]');if(b){openTrip(Number(b.dataset.selectTrip));return;}if(e.target.closest('[data-edit-empty]'))$('#edit-search').click();});
$('#booking-review').addEventListener('click',e=>{if(e.target.id==='back-details'){$('#booking-review').hidden=true;$('#booking-form').hidden=false;$('#step-one').classList.add('current');$('#step-two').classList.remove('current');$('#booking-form input').focus();}});
$$('[data-service]').forEach(b=>b.addEventListener('click',()=>setService(b.dataset.service)));
$$('[data-pick-service]').forEach(b=>b.addEventListener('click',()=>setService(b.dataset.pickService,{focus:true})));
$$('[data-footer-service]').forEach(b=>b.addEventListener('click',()=>setService(b.dataset.footerService)));
$$('[data-quick-date]').forEach(b=>b.addEventListener('click',()=>{$('#date').value=quickDate(Number(b.dataset.quickDate));syncQuickDates();$('#date').dispatchEvent(new Event('change',{bubbles:true}));}));
$('#date').addEventListener('change',syncQuickDates);
$('#search-form').addEventListener('input',syncFloatingFields);$('#search-form').addEventListener('change',syncFloatingFields);
$('.swap-fields').addEventListener('click',()=>{const from=$('#origin').value,to=$('#destination').value;if(!from||!to)return;const button=$('.swap-fields'),stack=$('.field-stack');button.classList.remove('is-swapping');stack.classList.remove('is-swapping');void button.offsetWidth;button.classList.add('is-swapping');stack.classList.add('is-swapping');$('#origin').value=to;updateSelects();$('#destination').value=from;syncFloatingFields();$('#origin').dispatchEvent(new Event('change',{bubbles:true}));$('#destination').dispatchEvent(new Event('change',{bubbles:true}));setTimeout(()=>{button.classList.remove('is-swapping');stack.classList.remove('is-swapping');},360);});
$$('[data-language]').forEach(b=>b.addEventListener('click',()=>{language=window.matchMedia('(max-width:767px)').matches&&b.dataset.language===language?(language==='id'?'en':'id'):b.dataset.language;translate();}));
window.matchMedia('(max-width:767px)').addEventListener('change',updateServiceCopy);
$$('[data-check-booking]').forEach(b=>b.addEventListener('click',()=>{ $('#check-form').reset();$('#check-link')?.remove();showDialog('#check-dialog');}));
$$('[data-close-dialog]').forEach(b=>b.addEventListener('click',()=>closeDialog(b.closest('dialog'))));
$$('dialog').forEach(d=>{d.addEventListener('cancel',e=>{e.preventDefault();closeDialog(d);});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d);}});});
$('.mobile-menu').addEventListener('click',()=>{const open=$('.mobile-menu').getAttribute('aria-expanded')!=='true';$('.mobile-menu').setAttribute('aria-expanded',String(open));$('#navigation').classList.toggle('is-open',open);$('#header').classList.remove('is-hidden');});
$('#navigation').addEventListener('click',()=>{$('#navigation').classList.remove('is-open');$('.mobile-menu').setAttribute('aria-expanded','false');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#navigation').classList.remove('is-open');$('.mobile-menu').setAttribute('aria-expanded','false');}if(e.target.matches('[role=tab]')&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const tabs=$$('[role=tab]'),i=tabs.indexOf(e.target),next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;setService(tabs[next].dataset.service);tabs[next].focus();}});
$('.previous').addEventListener('click',()=>$('#route-cards').scrollBy({left:-$('#route-cards').clientWidth*.8,behavior:'smooth'}));
$('.next').addEventListener('click',()=>$('#route-cards').scrollBy({left:$('#route-cards').clientWidth*.8,behavior:'smooth'}));
$('#edit-search').addEventListener('click',()=>{const p=searchParams(lastSearch);location.assign(location.pathname+'?'+p.toString()+'#pesan');});
$('#terms-button')?.addEventListener('click',()=>{const first=$('#faq details');first.open=true;$('#faq').scrollIntoView({behavior:'smooth'});first.querySelector('summary').focus({preventScroll:true});});
const bookingVisibility=new IntersectionObserver(entries=>{$('.floating-chat').classList.toggle('is-over-booking',entries.some(e=>e.isIntersecting));});bookingVisibility.observe($('.search-button'));
let lastScroll=window.scrollY,ticking=false;
window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const y=Math.max(0,window.scrollY),focused=$('#header').contains(document.activeElement),menuOpen=$('.mobile-menu').getAttribute('aria-expanded')==='true';if(y<=100||y<lastScroll||focused||menuOpen)$('#header').classList.remove('is-hidden');else if(y>lastScroll+2)$('#header').classList.add('is-hidden');lastScroll=y;ticking=false;});},{passive:true});
$('#header').addEventListener('focusin',()=>$('#header').classList.remove('is-hidden'));
const mobile=window.matchMedia('(max-width:767px)');function updateFooter(){$$('.footer-group').forEach(d=>d.open=true);if(!mobile.matches){$('#navigation').classList.remove('is-open');$('.mobile-menu').setAttribute('aria-expanded','false');}}mobile.addEventListener('change',updateFooter);updateFooter();
$('#year').textContent=new Date().getFullYear();$('#date').min=C.baliDate();$('#date').value=window.matchMedia('(max-width:767px)').matches?'':C.baliDate(new Date(Date.now()+86400000));setService('shuttle');translate();restoreSearchState();
})();
