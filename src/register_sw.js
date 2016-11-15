window.addEventListener('load', function(event) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(function(registration) {
            console.info('[App:Registration] Successfully registered ServiceWorker with scope: ', registration.scope);
            // Push Notification
            var authKey="AIzaSyDR4ls7dzk7fXYbBOA50ws-jZ9-UsGulog";
            if(location.hostname!="localhost") {
                console.info("[App:Push] Denied activation because of hostname. "
                             +"Host name is required to be \"localhost\". ");
            } else {
                Notification.requestPermission(function(permission) {
                    if(permission !== 'denied') {
                        console.info('[App:Push] Successfully enabeled Push Notification.');

                        navigator.serviceWorker.ready.then(function(registration){
                            registration.pushManager.subscribe({userVisibleOnly: true}).then(function(subscription){
                                console.info('[App:Push] Successfully registed to GCM. This is the commnd for sending Push Notification.');
                                console.info('curl --header "Authorization: key='+authKey+'"'
                                             +' --header "Content-Type: application/json" '
                                             +' https://android.googleapis.com/gcm/send -d "{\\"registration_ids\\":[\\"'
                                             +subscription.endpoint.replace("https://android.googleapis.com/gcm/send/", "")+'\\"\]}"');
                            });
                        });

                    }
                    else {
                        console.error('[App:Push] Filed to enabele Push Notification. Check your browser configuration.');
                    }
                });
            }
        }).catch(function(err) {
            console.error('[App:Registration] ServiceWorker registration failed.', err);
        });       
    }
});
