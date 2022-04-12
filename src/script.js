const button =  document.getElementById("button")

button.addEventListener("click", () => {    
    const keyword = document.getElementById("keyword").value
    let port = chrome.runtime.connect({ name: "default" })
    port.postMessage(keyword)
})