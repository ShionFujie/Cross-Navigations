chrome.commands.onCommand.addListener(command => {
  if (command == "Focus capital input")
    executeScriptWithJQuery("js/content.js");
});

function executeScriptWithJQuery(file) {
  chrome.tabs.executeScript({ file: "lib/jquery-3.4.1.min.js" }, () => {
    chrome.tabs.executeScript({ file });
  });
}
