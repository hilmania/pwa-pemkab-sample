var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

const sharedMomentsArea = document.querySelector('#shared-moments');
const form = document.forms.create_post;

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult){
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === 'dismissed') {
        console.log('User cancelled installation');
      } else {
        console.log('User added to home screen');
      }
    });

    deferredPrompt = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

//cache on demand
function onSaveButtonClicked(event) {
  console.log('clicked');
  if ('caches' in window){
    caches.open('user-requested')
      .then(function(cache) {
        cache.add('https://httpbin.org/get');
        cache.add('/src/images/sf-boat.jpg');
      });
  }
}

function clearcards() {
  while(sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}
function createCard(data){
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
  var cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  // cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
  cardTitle.style.backgroundImage = 'url(' + data.image +')';

  cardTitle.style.backgroundSize = 'cover';
  cardTitle.style.height = '180px';
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement('h2');
  cardTitleTextElement.style.color = 'white';
  cardTitleTextElement.className = 'mdl-card__title-text';
  // cardTitleTextElement.textContent = 'San Francisco Trip';
  cardTitleTextElement.textContent = data.title;

  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  // cardSupportingText.textContent = 'In San Francisco';
  cardSupportingText.textContent = data.location;
  cardSupportingText.style.textAlign = 'center';
  
  //advanced caching
  // var cardSaveButton = document.createElement('button');
  // cardSaveButton.textContent = 'Save';
  // cardSaveButton.addEventListener('click', onSaveButtonClicked);
  // cardSupportingText.appendChild(cardSaveButton);
  //end 
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

function updateUI(data) {
  for (var i = 0; i < data.length; i++) {
    createCard(data[i]);
  }
}

var url = 'https://httpbin.org/post';
var urlRemote = 'https://pwa-pemkab.firebaseio.com/posts.json';
var networkDataReceived = false;

// fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   },
//   body: JSON.stringify({
//     message: 'Some message'
//   })
// })
//   .then(function(res) {
//     return res.json();
//   })
//   .then(function(data) {
//     networkDataReceived = true;
//     console.log('From web', data);
//     clearcards();
//     createCard();
//   });

  fetch(urlRemote)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      networkDataReceived = true;
      console.log('From web', data);
      var dataArray = [];
      for (var key in data) {
        dataArray.push(data[key]);
      }
      console.log(dataArray);
      updateUI(dataArray);
      // clearcards();
      // createCard();
    });

if ('caches' in window){
  caches.match(urlRemote)
    .then(function(response){
      if (response) {
        return response.json();
      }
    })
    .then(function(data) {
      console.log('From cache ', data);
      if (!networkDataReceived) {
        var dataArray = [];
        for (var key in data) {
          dataArray.push(data[key]);
        }
        updateUI(dataArray);
        // clearcards();
        // createCard();
      }
    });
}


