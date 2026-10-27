/* PWA registration only; booking data and business state are never cached here. */
(()=>{'use strict';if(!('serviceWorker' in navigator))return;addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{}),{once:true});})();
