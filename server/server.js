const express = require('express');
const webPush = require('web-push');

var app = express();

// set bellow with your FCM API KEY.
webPush.setGCMAPIKey('AIzaSyAm71zHHcG0vEGJlpQe4QTUN7YS9k-Z8b8');

// in this example I used a simple static data. Just change the data below by your subscription object retrieved from client on subscrition event.
// You can get the subscrition values converting the subscrition object to string by JSON.stringify(subscription).
// Find for "console.log(JSON.stringify(subscription));" in main.js.
// Even tough you might planning a strategy to save the subscriptons on any storage.
const pushSubscription = {
  endpoint: '',
  keys: {
    auth: '',
    p256dh: ''
  }
};

// Example of a valid options:
// const pushSubscription = {
//   endpoint: 'https://android.googleapis.com/gcm/send/f7IsqlLnqzs:APA91bFDa_ApUBXKrJARG9Z4FrGpc7s_oDUHLDfPVF-SkyqZUQS9ano1o61X9myTrbJ6oHqEAYeMASiZDnxywcXnCdQh-dpvVKXRL1Q5kDarDtYLWRPIsXj0S1DD1BpL6yWQV_QKr8u4',
//   keys: {
//     auth: 'C0HyyYrEAKsl5W-H0pGGsg==',
//     p256dh: 'BCJ4kCmnZTv7NPsBlCtFuMCICkW1FlMD5DNwqk3AJgv9WEO7qd2WboVQsuWyeGcMbuzWYzhh_kIlDkeeJLlzH-I='
//   }
// };

var payloadMessage = process.argv[2]  ? process.argv[2] :  'Hey! I\'m a dynamic payload!'

var data = { title: 'Notification', 'body': payloadMessage, url: 'https://github.com/ViniciusTavares' };

webPush.sendNotification(pushSubscription, JSON.stringify(data)).then(function(res){
  console.log('Push has succeed sent!'); 
}).catch(function(error) {
  console.log(error);
});

app.listen(6000);
