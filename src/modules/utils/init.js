import puppeteer from 'puppeteer-core/lib/cjs/puppeteer/web'
import { ExtensionDebuggerTransport } from 'puppeteer-extension-transport'

const initBrowser = async (tabId) => {
      
    const extensionTransport = await ExtensionDebuggerTransport.create(tabId)
    const browser = await puppeteer.connect({ transport: extensionTransport, defaultViewport: null })
    const [page] = await browser.pages()
    await page.goto('https://www.linkedin.com/', { waitUntil: 'domcontentloaded' })
    const title = await page.title()
    if (title.includes("registro")) {
        alert("Inicie sesión y vuelva a utilizar la extensión")
        await page.close()
    }
    else {
        return page
    }

}

export default initBrowser