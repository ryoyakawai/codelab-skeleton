/* sw.js */
var CACHE_NAME = 'codelabs-webmidi-cache';
var urlsToCache = [
    './step.en-us.html',
    './step.ja-jp.html',
    './step.zh-cn.html',
    './index.html',
    './index.html?en-us',
    './index.html?ja-jp',
    './index.html?zh-cn',
    './manifest.json',
    './download/test_x-webmidi.zip'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
          return cache.addAll(urlsToCache);
      })
  );
});

if(location.hostname!="localhost") {
    console.info("[App:Push] Denied activation because of hostname. "
                 +"Host name is required to be \"localhost\". ");
} else {
    self.addEventListener('fetch', function(event) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                if (response) {
                    //console.log("[return cache] ", (response.url).split("/").pop());
                    return response;
                }
                var fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(function(response) {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                });
            })
        );
    });

    // Event Listener for when browser is recieving Push Notification (a)
    /*
    self.addEventListener('push', function(event) {
        console.log('Received a push message', event);
        var title = 'Yay a message.';
        var body = 'We have received a push message.';
        var icon = './images/webmidi-js-144x144.png';
        var tag = 'simple-push-demo-notification-tag';

        event.waitUntil(
            self.registration.showNotification(title, {
                body: body,
                icon: icon,
                tag: tag
            })
        );
    });
    */

    // Event Listener for when browser is recieving Push Notification (b)
    // http://kaiinui.hatenablog.com/entry/2015/04/28/163044
    self.addEventListener('push', function(event) {
        console.info("[Event:Push Listener] ", event);
        var message_filename="prepared_message.json";
        event.waitUntil(self.registration.pushManager.getSubscription().then(function(subscription) {
            var url=location.pathname.split("/");
            url.pop();
            url=location.protocol+"//"+location.host+(location.port ? ':'+location.port : '')+url.join("/")+"/"+message_filename;
            return fetch(url).then(function(response) {
                return response.json().then(function(json) {
                    console.info("[Event:Recieved Data]", json);
                    var promises = [];
                    promises.push(self.registration.showNotification(json.notifications.title, {
                        body: json.notifications.body,
                        icon: json.notifications.icon,
                        tag: json.notifications.tag
                    }));
                    return Promise.all(promises);
                });
            });
        }));
    });

    // Event Listener for when notification is clicked
    self.addEventListener('notificationclick', function(event) {
        event.notification.close();
        event.waitUntil(
            clients.matchAll({ type: 'window' }).then(function(event) {
                var out;
                var url=location.pathname.split('/');
                url.pop();
                url=location.protocol+'//'+location.hostname+(location.port ? ':'+location.port : '')+url.join('/')+'/index.html';
                for(var i=0 ; i<event.length ; i++) {
                    var c=event[i];
                    if(((c.url==url) || (c.url==url+'index.html')) && ('focus' in c)) {
                        return c.focus();
                    }
                }
                if(clients.openWindow) {
                    return clients.openWindow('./');
                }
            })
        );
    }, false);

    console.info("[App:Push] Successfully added eventlisteners for when recieving notification. ");

}
