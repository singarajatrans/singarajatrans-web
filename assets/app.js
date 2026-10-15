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
 const labels={'#origin':['Asal','Origin'],'#destination':['Tujuan','Destination'],'#date':['Tanggal berangkat','Departure date'],'#time':['Waktu','Departure time'],'#private-time':['Jam penjemputan','Pickup time'],'#passengers':['Penumpang','Passengers'],'.mobile-menu':['Buka menu','Open menu'],'.previous':['Rute sebelumnya','Previous routes'],'.next':['Rute berikutnya','Next routes'],'.floating-chat':['Hubungi SINGARAJA TRANS melalui WhatsApp','Contact SINGARAJA TRANS on WhatsApp']};
 Object.entries(labels).forEach(([sel,vals])=>$(sel).setAttribute('aria-label',vals[language==='en'?1:0]));
 $$('[data-close-dialog]').forEach(b=>b.setAttribute('aria-label',t('Tutup','Close')));
 $$('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)));
 updateSelects();updateServiceCopy();renderRoutes();if(lastSearch)renderResults(false);
}
function updateSelects(){
 const list=service==='airport'?['Bandara Ngurah Rai',...Object.keys(C.airportFares)]:C.cities;
 const oldOrigin=$('#origin').value,oldDestination=$('#destination').value,oldPassengers=$('#passengers').value;
 ['origin','destination'].forEach(id=>{$('#'+id).innerHTML=`<option value="">${t('Pilih lokasi','Choose location')}</option>`+list.map(city=>`<option value="${escape(city)}">${escape(city)}</option>`).join('');});
 $('#origin').value=list.includes(oldOrigin)?oldOrigin:service==='airport'?'Bandara Ngurah Rai':'Singaraja';
 $('#destination').value=list.includes(oldDestination)?oldDestination:service==='airport'?'Singaraja':'Denpasar';
 if($('#origin').value===$('#destination').value)$('#destination').value=service==='airport'?'Singaraja':'Denpasar';
 const max=service==='charter'?6:12;
 $('#passengers').innerHTML=Array.from({length:max},(_,i)=>`<option value="${i+1}">${i+1} ${t('orang',i?'people':'person')}</option>`).join('');
 $('#passengers').value=Number(oldPassengers)>0&&Number(oldPassengers)<=max?oldPassengers:'1';
}
function updateServiceCopy(){
 $('#service-description').textContent=service==='shuttle'?t('Perjalanan sekali jalan, tarif per penumpang','One-way trips, priced per passenger'):service==='airport'?t('Antar jemput bandara privat, tarif per mobil','Private airport transfers, priced per vehicle'):t('Perjalanan privat sekali jalan, tarif per mobil','Private one-way trips, priced per vehicle');
 $('#time').hidden=service!=='shuttle';$('#time').disabled=service!=='shuttle';
 $('#private-time').hidden=service==='shuttle';$('#private-time').disabled=service==='shuttle';$('#private-time').required=service!=='shuttle';
}
function setService(next,{focus=false}={}){
 if(!['shuttle','airport','charter'].includes(next))return;
 service=next;
 $$('[role=tab]').forEach(tab=>{const active=tab.dataset.service===service;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
 $('#search-panel').setAttribute('aria-labelledby','tab-'+service);$('#search-error').hidden=true;
 updateSelects();updateServiceCopy();
 if(focus){$('#pesan').scrollIntoView({behavior:'smooth',block:'start'});$('#origin').focus({preventScroll:true});}
}
function renderRoutes(){
 const popular=[['Singaraja','Denpasar'],['Singaraja','Gilimanuk'],['Singaraja','Bandara Ngurah Rai'],['Denpasar','Karangasem'],['Denpasar','Gilimanuk']];
 $('#route-cards').innerHTML=popular.map(([from,to])=>{const r=C.routes.find(r=>r.from===from&&r.to===to);return `<article class="route-card"><span class="route-icon">${icon(to==='Bandara Ngurah Rai'?'plane':'bus')}</span><h3 class="route-path">${escape(from)} ${icon('arrow')} ${escape(to==='Bandara Ngurah Rai'?t('Bandara Ngurah Rai','Ngurah Rai Airport'):to)}</h3><p class="route-note">Travel Shuttle · ${t('Sekali jalan','One way')}</p><div class="route-price"><div><small>${t('Mulai dari','From')}</small><strong>${money(r.price)}</strong><small>/ ${t('orang','person')}</small></div><button type="button" class="text-button" data-route="${escape(from)}|${escape(to)}" aria-label="${escape(t('Pilih rute','Select route')+' '+from+' '+to)}">${t('Pilih rute','Select route')}${icon('arrow')}</button></div></article>`;}).join('');
}
function searchState(){return {service,from:$('#origin').value,to:$('#destination').value,date:$('#date').value,time:service==='shuttle'?$('#time').value:$('#private-time').value,passengers:Number($('#passengers').value)};}
function renderResults(scroll=true){
 const s=lastSearch,results=C.getOptions(s);$('#results').hidden=false;
 $('#results-summary').textContent=`${s.from} → ${s.to} · ${formatDate(s.date)} · ${s.passengers} ${t('penumpang','passengers')} · ${serviceName(s.service)}`;
 $('#result-list').innerHTML=results.length?results.map((r,i)=>`<article class="result-card">${r.kind!=='shuttle'?`<img src="assets/images/${r.kind==='minibus'?'fleet':'mpv'}.webp" alt="${escape(t('Ilustrasi pilihan armada','Illustrative fleet photo'))}" width="600" height="400">`:''}<div class="result-details"><h3>${escape(tripName(r.kind))}</h3><div class="result-schedule">${escape(r.time)} <small>WITA</small></div><p>${r.capacity?t('Kapasitas hingga '+r.capacity+' orang','Up to '+r.capacity+' passengers'):r.kind==='charter'?t('Jenis mobil & kapasitas dikonfirmasi admin','Vehicle type & capacity confirmed by our team'):t('Jadwal publikasi · sekali jalan','Published departure · one way')}</p><p>${r.kind==='shuttle'?t('Ketersediaan kursi dikonfirmasi admin','Seat availability confirmed by our team'):t('Foto ilustrasi armada · mobil + sopir + BBM','Illustrative fleet photo · vehicle + driver + fuel')}</p></div><div class="result-price"><div><strong>${money(r.kind==='shuttle'?r.total:r.price)}</strong><small>${r.kind==='shuttle'?`${s.passengers} × ${money(r.price)} / ${t('orang','person')}`:t('per mobil · tarif acuan','per vehicle · reference fare')}</small></div><button class="button primary" type="button" data-select-trip="${i}">${r.kind==='shuttle'?t('Pilih Perjalanan','Select Trip'):t('Pilih Mobil','Select Car')}</button></div></article>`).join(''):`<div class="empty-results"><h3>${t('Belum ada pilihan untuk pencarian ini','No matching trips for this search')}</h3><p>${t('Coba tanggal atau waktu lain. Tim kami juga dapat membantu mengecek alternatif rute dan armada.','Try another date or time. Our team can help you find alternative routes or vehicles.')}</p><a class="button outline" target="_blank" rel="noopener" href="${wa(t('Halo SINGARAJA TRANS, mohon bantu cek perjalanan: ','Hello SINGARAJA TRANS, please help me find a trip: ')+s.from+' → '+s.to+', '+s.date)}">${t('Tanyakan alternatif via WhatsApp','Ask about alternatives on WhatsApp')}</a></div>`;
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
$('#search-form').addEventListener('submit',e=>{
 e.preventDefault();const s=searchState(),error=$('#search-error');error.hidden=true;
 $('#date').min=C.baliDate();
 let msg='';
 if(s.from===s.to)msg=t('Asal dan tujuan harus berbeda.','Origin and destination must be different.');
 else if(s.date<C.baliDate())msg=t('Pilih tanggal hari ini atau setelahnya.','Please choose today or a later date.');
 else if(s.service==='airport'&&s.from!=='Bandara Ngurah Rai'&&s.to!=='Bandara Ngurah Rai')msg=t('Airport Transfer harus memiliki bandara sebagai asal atau tujuan.','Airport Transfer must start or end at the airport.');
 else if(s.service!=='shuttle'&&!C.validFuture(s.date,s.time))msg=t('Pilih waktu penjemputan yang belum lewat (WITA).','Choose a future pickup time (Bali time).');
 if(msg){error.textContent=msg;error.hidden=false;return;}
 lastSearch=s;renderResults();
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
$('#result-list').addEventListener('click',e=>{const b=e.target.closest('[data-select-trip]');if(b)openTrip(Number(b.dataset.selectTrip));});
$('#booking-review').addEventListener('click',e=>{if(e.target.id==='back-details'){$('#booking-review').hidden=true;$('#booking-form').hidden=false;$('#step-one').classList.add('current');$('#step-two').classList.remove('current');$('#booking-form input').focus();}});
$$('[data-service]').forEach(b=>b.addEventListener('click',()=>setService(b.dataset.service)));
$$('[data-pick-service]').forEach(b=>b.addEventListener('click',()=>setService(b.dataset.pickService,{focus:true})));
$$('[data-footer-service]').forEach(b=>b.addEventListener('click',()=>setService(b.dataset.footerService)));
$$('[data-language]').forEach(b=>b.addEventListener('click',()=>{language=b.dataset.language;translate();}));
$$('[data-check-booking]').forEach(b=>b.addEventListener('click',()=>{ $('#check-form').reset();$('#check-link')?.remove();showDialog('#check-dialog');}));
$$('[data-close-dialog]').forEach(b=>b.addEventListener('click',()=>closeDialog(b.closest('dialog'))));
$$('dialog').forEach(d=>{d.addEventListener('cancel',e=>{e.preventDefault();closeDialog(d);});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d);}});});
$('.mobile-menu').addEventListener('click',()=>{const open=$('.mobile-menu').getAttribute('aria-expanded')!=='true';$('.mobile-menu').setAttribute('aria-expanded',String(open));$('#navigation').classList.toggle('is-open',open);$('#header').classList.remove('is-hidden');});
$('#navigation').addEventListener('click',()=>{$('#navigation').classList.remove('is-open');$('.mobile-menu').setAttribute('aria-expanded','false');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#navigation').classList.remove('is-open');$('.mobile-menu').setAttribute('aria-expanded','false');}if(e.target.matches('[role=tab]')&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const tabs=$$('[role=tab]'),i=tabs.indexOf(e.target),next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;setService(tabs[next].dataset.service);tabs[next].focus();}});
$('.previous').addEventListener('click',()=>$('#route-cards').scrollBy({left:-$('#route-cards').clientWidth*.8,behavior:'smooth'}));
$('.next').addEventListener('click',()=>$('#route-cards').scrollBy({left:$('#route-cards').clientWidth*.8,behavior:'smooth'}));
$('#edit-search').addEventListener('click',()=>{setService(lastSearch.service);$('#origin').value=lastSearch.from;$('#destination').value=lastSearch.to;$('#date').value=lastSearch.date;$('#passengers').value=String(lastSearch.passengers);$(lastSearch.service==='shuttle'?'#time':'#private-time').value=lastSearch.time;$('#pesan').scrollIntoView({behavior:'smooth',block:'start'});$('#origin').focus({preventScroll:true});});
$('#terms-button').addEventListener('click',()=>{const first=$('#faq details');first.open=true;$('#faq').scrollIntoView({behavior:'smooth'});first.querySelector('summary').focus({preventScroll:true});});
let lastScroll=window.scrollY,ticking=false;
window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const y=Math.max(0,window.scrollY),focused=$('#header').contains(document.activeElement),menuOpen=$('.mobile-menu').getAttribute('aria-expanded')==='true';if(y<=100||y<lastScroll||focused||menuOpen)$('#header').classList.remove('is-hidden');else if(y>lastScroll+2)$('#header').classList.add('is-hidden');lastScroll=y;ticking=false;});},{passive:true});
$('#header').addEventListener('focusin',()=>$('#header').classList.remove('is-hidden'));
const mobile=window.matchMedia('(max-width:767px)');function updateFooter(){if(!mobile.matches){$$('.footer-group').forEach(d=>d.open=true);$('#navigation').classList.remove('is-open');$('.mobile-menu').setAttribute('aria-expanded','false');}else $$('.footer-group').forEach(d=>d.open=false);}mobile.addEventListener('change',updateFooter);updateFooter();
$('#year').textContent=new Date().getFullYear();$('#date').min=C.baliDate();$('#date').value=C.baliDate(new Date(Date.now()+86400000));setService('shuttle');translate();
})();
