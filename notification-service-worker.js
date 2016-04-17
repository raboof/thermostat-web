console.log('Started', self);

self.addEventListener('push', function(event) {
  console.log('Push message received ;)', event);
  var title = 'Verwarming uitzetten?';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'Is het geen tijd de verwarming uit te zetten?'
  }));
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'http://pi.bzzt.net/temp';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
