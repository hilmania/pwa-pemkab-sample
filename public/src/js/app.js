var deferredPrompt;
var enableNotificationsButtons = document.querySelector('.enable-notifications');

// Mendaftarkan Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('Service worker registered!');  
        })
        .catch(function(err) {
            console.log(err)
        });
}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

function askForNotificationPermission(){
    Notification.requestPermission(function(result){
        console.log('User Choice', result);
        if (result !== 'granted') {
            console.log('No notification permission granted!');
        } else {

        }
    });
}

if ('Notification' in window) {
    for (var i = 0; i < enableNotificationsButtons.length; i++) {
        enableNotificationsButtons[i].style.display = 'inline-block';
        enableNotificationsButtons[i].addEventListener('click');
    }
}

// Contoh promise >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// var promise = new Promise(function(resolve, reject) {
//     setTimeout(function() {
//         // resolve('This is executed once the timer is done');
//         reject({code:500, message: "An error occorred!"});
//         // console.log('once the timer is done');
//     }, 3000);
// });

// promise.then(function(text){
//     return text;
// }).then(function(newText) {
//     console.log(newText);
// }).catch(function(err){
//     console.log(err.code, err.message);
// });
// End contoh promise >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Contoh AJAX call menggunakan XMLHttpRequest()
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://httpbin.org/ip');
// xhr.responseType = 'json';

// xhr.onload = function() {
//     console.log(xhr.response);
// };

// xhr.onerror = function() {
//     console.log('Error!');
// }

// xhr.send();

// Contoh fetch data dari API ==============
// fetch('https://httpbin.org/ip')
//     .then(function(response) {
//         console.log(response);
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     })
//     .catch(function(err){
//         console.log(err);
//     });

// fetch('https://httpbin.org/post', {
//         method: 'POST',
//         headers: {
//             'Content-Type' : 'application/json',
//             'Accept': 'application/json'
//         },
//         mode: 'cors',
//         body: JSON.stringify({message: 'Does this work?'})
//     }).then(function(response) {
//         console.log(response);
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     })
//     .catch(function(err){
//         console.log(err);
//     });

// console.log('After setTimeOut()');