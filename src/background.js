import run from './scripts/scrapper.js'

chrome.runtime.onConnect.addListener(port => {
  if (port.name === "default") {
    port.onMessage.addListener(message => {
      chrome.tabs.create({ active: true, url: 'https://www.google.com' }, tab => (tab.id ? run(tab.id, message, port) : null));
    });
  }
});