const subscribeButton = document.getElementById('subscribeBtn');
const subscriptionResultParagraph = document.getElementById('subscriptionResultParagraph');

let isSubscribed = false;
let swRegistration = null;

navigator.serviceWorker.register('scripts/sw.js')
.then(function(swReg) {
  console.log('Service Worker is registered', swReg);

  swRegistration = swReg;
  initialiseUI();
});

function initialiseUI() {
  subscribeButton.addEventListener('click', function() {
    subscribeButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    var subscribeMessage = 'User is subscribed';
    isSubscribed = !(subscription === null);

    if (!isSubscribed) {
      subscribeMessage =  'User isn\'t subscribed.';
    }
    else {
          console.log(JSON.stringify(subscription));
    }
    subscriptionResultParagraph.innerText = subscribeMessage;
    updateBtn();
  });
}

function updateBtn() {
  if (isSubscribed) {
    subscribeButton.textContent = 'Unsubscribe now';

  } else {
    subscribeButton.textContent = 'Subscribe now';
  }
  subscribeButton.disabled = false;
}

function subscribeUser() {
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true
  })
  .then(function(subscription) {
    subscriptionResultParagraph.innerText = 'User is subscribed!';
    console.log(JSON.stringify(subscription));
    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('An error has occured!', err);
    subscriptionResultParagraph.innerText = 'An error has occured';
    updateBtn();
  });
}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    var unsubscribeMessage = 'User is unsubscribed.';
    subscriptionResultParagraph.innerText = unsubscribeMessage;
    isSubscribed = false;
    updateBtn();
  });
}
