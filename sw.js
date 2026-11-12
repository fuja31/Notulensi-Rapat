var C='notulensi-v1',FILES=['./','index.html','manifest.webmanifest','icon.svg','pdf.min.js','pdf.worker.min.js'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(FILES.map(function(f){return c.add(f).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
/* Utamakan internet (supaya selalu versi terbaru); jika lambat >3 detik atau gagal, pakai salinan tersimpan */
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;
 e.respondWith(new Promise(function(res){var done=false;
  var t=setTimeout(function(){caches.match(e.request).then(function(m){if(m&&!done){done=true;res(m)}})},3000);
  fetch(e.request).then(function(r){clearTimeout(t);var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)}).catch(function(){});if(!done){done=true;res(r)}})
  .catch(function(){clearTimeout(t);caches.match(e.request).then(function(m){if(!done){done=true;res(m||caches.match('index.html'))}})})}))});
