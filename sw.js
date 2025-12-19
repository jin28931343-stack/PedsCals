const CACHE_NAME = 'pedscalc-v3';

// 注意：這裡的檔名必須與您的 HTML 實際檔名完全一致
const ASSETS = [
  './index.html',      // 主程式
  './manifest.json',   // 清單檔
  './Pedscals.png',    // 新增：加入圖片快取
  'https://cdn.tailwindcss.com', // 外部資源
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// 安裝 Service Worker 並快取資源
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 如果這裡有任何一個檔案網址錯誤 (404)，整個 Service Worker 就會安裝失敗
      return cache.addAll(ASSETS);
    })
  );
});

// 攔截請求，優先使用快取 (Offline First)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});




