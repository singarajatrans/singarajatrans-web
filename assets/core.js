/* Published reference data, verified 15 October 2026. No live inventory. */
(function(root){'use strict';
const cities=['Singaraja','Denpasar','Gilimanuk','Bandara Ngurah Rai','Ubud','Karangasem'];
const routes=[];
function add(from,to,price,charter,times){routes.push({from,to,price,charter,times:times.split(',')});}
add('Singaraja','Denpasar',120000,600000,'09:00,16:00');
add('Singaraja','Gilimanuk',100000,500000,'21:00');
add('Singaraja','Bandara Ngurah Rai',130000,650000,'09:00,16:00');
add('Singaraja','Ubud',220000,1100000,'09:00,16:00');
add('Singaraja','Karangasem',250000,1250000,'09:00');
add('Denpasar','Singaraja',120000,600000,'09:00,16:00');
add('Denpasar','Gilimanuk',200000,850000,'09:00,20:00');
add('Denpasar','Ubud',100000,500000,'10:00,17:00');
add('Denpasar','Karangasem',130000,650000,'10:00,17:00');
add('Gilimanuk','Singaraja',100000,500000,'07:00');
add('Gilimanuk','Denpasar',200000,850000,'02:00,14:00');
add('Gilimanuk','Bandara Ngurah Rai',200000,850000,'02:00,14:00');
add('Gilimanuk','Ubud',300000,950000,'02:00');
add('Gilimanuk','Karangasem',330000,1100000,'02:00');
add('Bandara Ngurah Rai','Gilimanuk',200000,850000,'09:00,20:00');
add('Bandara Ngurah Rai','Singaraja',130000,650000,'09:00,16:00');
add('Bandara Ngurah Rai','Ubud',100000,500000,'10:00,17:00');
add('Bandara Ngurah Rai','Karangasem',130000,650000,'10:00,17:00');
add('Ubud','Gilimanuk',300000,950000,'19:00');
add('Ubud','Singaraja',220000,1100000,'12:00');
add('Ubud','Denpasar',120000,600000,'12:00,19:00');
add('Ubud','Bandara Ngurah Rai',130000,650000,'12:00,19:00');
add('Ubud','Karangasem',100000,500000,'12:00,19:00');
add('Karangasem','Gilimanuk',330000,1100000,'17:00');
add('Karangasem','Singaraja',250000,1250000,'10:00');
add('Karangasem','Denpasar',120000,600000,'10:00,17:00');
add('Karangasem','Bandara Ngurah Rai',130000,650000,'10:00,17:00');
const airportFares={Singaraja:[650000,1200000],Lovina:[650000,1200000],Amed:[650000,1200000],Kuta:[200000,500000],Legian:[200000,500000],Jimbaran:[200000,500000],Seminyak:[250000,600000],Sanur:[250000,600000],Kerobokan:[250000,600000],'Nusa Dua':[250000,600000],Pecatu:[275000,650000],Uluwatu:[275000,650000],Canggu:[300000,700000],Ubud:[500000,700000],'Ubud Utara':[550000,750000],'Tanah Lot':[550000,750000],Karangasem:[650000,850000],'Padang Bai':[650000,850000],Candidasa:[700000,900000],Pemuteran:[800000,1400000],Tejakula:[800000,1400000]};
function baliDate(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Makassar',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
function validFuture(date,time,now=new Date()){const d=new Date(date+'T'+time+':00+08:00');return /^\d{4}-\d{2}-\d{2}$/.test(date)&&/^([01]\d|2[0-3]):[0-5]\d$/.test(time)&&Number.isFinite(d.getTime())&&baliDate(d)===date&&d>now;}
function softHaptic(){
 if(typeof navigator==='undefined'||!('vibrate' in navigator))return false;
 try{return Boolean(navigator.vibrate(10));}catch{return false;}
}
function getOptions(s,now=new Date()){
 if(!s||s.from===s.to||!Number.isInteger(s.passengers)||s.passengers<1||s.passengers>12||!/^\d{4}-\d{2}-\d{2}$/.test(s.date)||s.date<baliDate(now))return [];
 if(s.service==='airport'){
  const other=s.from==='Bandara Ngurah Rai'?s.to:s.to==='Bandara Ngurah Rai'?s.from:null;
  const fares=airportFares[other];if(!fares||!validFuture(s.date,s.time,now))return [];
  return [{kind:'mpv',capacity:6,price:fares[0]},{kind:'minibus',capacity:12,price:fares[1]}].filter(x=>s.passengers<=x.capacity).map(x=>({...x,time:s.time,total:x.price}));
 }
 const route=routes.find(x=>x.from===s.from&&x.to===s.to);if(!route)return [];
 if(s.service==='charter')return s.passengers<=6&&validFuture(s.date,s.time,now)?[{kind:'charter',price:route.charter,total:route.charter,time:s.time}]:[];
 if(s.service!=='shuttle')return [];
 return route.times.filter(time=>validFuture(s.date,time,now)).filter(time=>!s.time||(s.time==='morning'?time<'12:00':s.time==='afternoon'?time>='12:00'&&time<'18:00':s.time==='evening'&&time>='18:00')).map(time=>({kind:'shuttle',price:route.price,total:route.price*s.passengers,time}));
}
root.Singaraja={cities,routes,airportFares,baliDate,validFuture,getOptions,softHaptic};
})(typeof window!=='undefined'?window:globalThis);
