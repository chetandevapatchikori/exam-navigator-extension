# eLitmus-Assignment-examnavigator
+ The chrome extension was named as Exam Navigator which helps in preventing cheating during exams.

steps :
+ create a json file
+ load the images from the images folder
```javascript

{
    "manifest_version": 2,
    "name": "exam navigator",
    "description": "preventing cheating during exams",
    "version": "1.0",
    "icons": {
        "16": "/images/icon16.png",
        "48": "/images/icon48.png",
        "128": "/images/icon128.png"
    },

     "content_scripts":[
        {
            "matches": [
                "<all_urls>"
            ],
            "js": ["content.js"]

        }
    ],

    "background":{
        "scripts": ["background.js"]
    },

    "browser_action":{
        "default_icon": "cn.png"
    }
}
```
+ create a js file with the name background
```javascript

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


```
---
---
### 1. Extension should work only in selected URLs(test page) during a certain time/trigger.
+ To make the extention to work on particular urls  i have used  matches and stored required urls in manifesto.js (here i have kept for all).
```javascript
    "content_scripts":[
        {
            "matches": [
                "<all_urls>"
            ],
            "js": ["content.js"]

        }
    ],
```
---
### 2. The browser should open in full screen mode.
``` javascript
		// Function for full screen activation
		function activate(ele) {
			if (ele.requestFullscreen) {
				ele.requestFullscreen();
			}
		}

		// Function for full screen activation
		function deactivate() {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
```
---
### 3. Pop up should be shown when someone switches between 2 tabs or Application.
+ In the background.js it should observe whether a person is switching the tab while writing the exam and show alert message  as “You switched to tab – “. 
```javascript
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
      alert("You switched to tab: "+ tab.url);
    });
  });

```
----
### 4. More than one tab can’t be opened.
+ Later we need to check if more than one tab is open i.e., if  (tabId > 1) it should show popup message which shows alert message as “You have more than one tab open!”
```javascript
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tabId > 1) {
      alert("You have more than one tab open!");
    }
  });

```
+ restricted from opening new tab
```javascript
  chrome.tabs.onCreated.addListener(function(tab) {
        chrome.tabs.query({active: true, currentWindow: true},  function(tabs) {
        chrome.tabs.remove(tabs[0].id);
        });
    });

```
---
### 6. Should do requirement check initially when extension is activated: a. Audio b. Camera c. Internet Stability
+ a web page will be loaded for checking i.e., checkACI.html(file in code section)
---
### 7. Capture the user related information in local storage.(e.g. IP, requirements check)
+ created a local storage
+ storing the mail name and ip address of mentioned browser
```javascript
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
```