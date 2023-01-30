// alert message shown while shifting the tabs
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
      alert("You switched to tab: "+ tab.url);
    });
  });

// continues alert message shown when multiple tabs are opened.
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // check if more than one tab is open
    if (tabId > 1) {
      // show popup message
      alert("You have more than one tab open!");
    }
  });


  //blocks the person from opening new tab
  chrome.tabs.onCreated.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.remove(tabs[0].id);
    });
  });


//Capturing user information in local storage 
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');  // creating a new storage
  }
  
  var userEmail = localStorage.getItem('userEmail');
  if (!userEmail) {
    userEmail = prompt('Please enter your email address');
    localStorage.setItem('userEmail', userEmail);     //Get user email
  }
  
  fetch('https://api.ipify.org/?format=json') // ip address for particular websites that we mention
  .then(response => response.json())
  .then(data => console.log(data.ip));  


  var userName = localStorage.getItem('userName');
  if (!userName) {
    userName = prompt('Please enter your name');
    localStorage.setItem('userName', userName);   //Get user name
  }

  localStorage.clear(); // for debuging purpose just clearing the local storage



