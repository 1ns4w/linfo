import puppeteer from 'puppeteer-core/lib/cjs/puppeteer/web'
import { ExtensionDebuggerTransport } from 'puppeteer-extension-transport'

const initBrowser = async (tabId) => {
      
    const extensionTransport = await ExtensionDebuggerTransport.create(tabId)
    const browser = await puppeteer.connect({ transport: extensionTransport, defaultViewport: null })
    const [page] = await browser.pages()
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    const title = await page.title()
    if (title.includes("Feed")) return page
    alert("Inicie sesión y vuelva a utilizar la extensión")
    await page.close()

}

export default initBrowser