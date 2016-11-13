self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');

  var eventData = event.data ? JSON.parse(event.data.text()) : {};

  if(eventData.title) {
    var options = {
      body: eventData.body,
      icon: 'http://www.freeiconspng.com/uploads/github-logo-icon-20.png',
      tag: 'custom-tag',
      data: eventData.url
    }

    event.waitUntil(self.registration.showNotification(eventData.title,options));
  }
  else {
    console.error('Invalid push! Have you sent the correct format? For istance: { body: \'anyBody\', data: \'anyUrl\', title: \'anyTitle\' } ');
  }
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  // Android doesn't close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients.matchAll({
      type: "window"
    })
    .then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == '/' && 'focus' in client)
        return client.focus();
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data);
      }
    })
  );
});
