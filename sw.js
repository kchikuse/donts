self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(clients.claim());
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const quoteIndex = event.notification.data
    ? event.notification.data.quoteIndex
    : undefined;

  event.waitUntil(
    clients.matchAll({ type: "window" }).then(function (clientList) {
      if (clientList.length > 0) {
        clientList[0].focus();
        clientList[0].postMessage({
          type: "NOTIFICATION_CLICK",
          quoteIndex: quoteIndex,
        });
        return;
      }

      return clients.openWindow("/");
    })
  );
});
