self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(clients.claim());
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const message = {
    type: "NOTIFICATION_CLICK",
    quoteIndex: event.notification.data
      ? event.notification.data.quoteIndex
      : undefined,
  };

  event.waitUntil(
    clients.matchAll({ type: "window" }).then(function (clientList) {
      if (clientList.length > 0) {
        clientList[0].focus();
        clientList[0].postMessage(message);
        return;
      }

      // If no client is open, open window
      return clients.openWindow("/").then(() => {
        // Wait a bit for the page to load before sending message
        setTimeout(() => {
          self.clients.matchAll({ type: "window" }).then(function (windows) {
            if (windows.length > 0) {
              windows[0].postMessage(message);
            }
          });
        }, 1000);
      });
    })
  );
});
