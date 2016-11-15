# Pushing notifications with custom payload through the server (NodeJS)

This project shows how to push notifications with dynamic payload using service worker. Actually it works on Chrome and Firefox Nightly.

<img src="https://raw.githubusercontent.com/ViniciusTavares/PushNotificationsWithPayload/master/images/notification_sample.png" alt="Push notification sample" />

###Required:

  * An activated FCM (Firebase Cloud Message) project
  * Server Key and Sender Id of FCM's project.  
  * NodeJS installed on your OS.
  * Chrome 4.X + or Firefox Nightly.
  * A HTTPS enviroment  ( I've used the Chrome web server enviroment and it's worked well )

Before we start running our project, let's create a project in FCM!

Go to: https://console.firebase.google.com/

Create a new project then click on it to open the overview page. Now we need to get the server key and the sender id. Click on the configuration icon (besides the project's name) then click on "Project configurations" option. Select "Cloud messaging" tag and... that is it! Now you can store yours keys.

Pay attention to change the keys in the project. Below I highlighted the main points where you should change them.

client/manifest.json
```
"gcm_sender_id": "your send id"
```

server/server.js
```
webPush.setGCMAPIKey('your server key');
```

The last point to pay attention is when the server will send the push notification. You need to set a valid endpoint and keys with its encrypted data.

server/server.js
```
const pushSubscription = {
  endpoint: 'a valid endpoint',
  keys: {
    auth: 'a valid auth value',
    p256dh: 'a valid p256dh value'
  }
};
```

You can get these values on subscrition promise:

client/main.js
```
console.log(JSON.stringify(subscription));
```

If you have any doubts I really recommend the official documentation for pushing notifications on Chrome. Take a look at the end of this file to see some very useful links.

Now, let's start our project!

Firstly we need to install all mandatory packages. Go to 'server' folder then run npm install command:
```
npm install
```

When all packages are installed, start the server and set a message to send to your notification using the web-push package.
```
node server.js 'Hello world'
```

The command above should activate the "push" event of your service worker. In this example, that event is ready to receive an object containing the url, body and title properties. For instance:

```
{
  title: 'Notification',
  body: 'Hello world',
  url: 'https://github.com/ViniciusTavares'
}
```

And... We have done it! :)

Finishing this file, below you can find some helpful links:

https://developers.google.com/web/fundamentals/getting-started/codelabs/push-notifications/ (oficial)  
https://developers.google.com/web/updates/2016/03/web-push-encryption  
https://github.com/web-push-libs/web-push  

A really want to thank Matt Gaunt (https://gauntface.com/blog) for his tutorials. They helped me a lot!
