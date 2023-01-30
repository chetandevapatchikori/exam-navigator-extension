var myExtension = new ChromeExtension();

// Create a listener for the browser action
myExtension.browserAction.onClicked.addListener(function(tab) {
    // Open a new tab and navigate to the desired webpage
    chrome.tabs.create({
        url: "http://www.example.com"
    });
});