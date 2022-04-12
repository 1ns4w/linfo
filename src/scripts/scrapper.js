import puppeteer from 'puppeteer-core/lib/esm/puppeteer/web'
import initBrowser from '../modules/utils/init.js'
import findProfiles from '../modules/utils/find.js'
import scrapProfile from '../modules/utils/scrapper.js'
import { db } from '../modules/services/db.js'

const run = async (tabId, keyword) => {

  try {

    const [browser, page] = await initBrowser(tabId)

    if (!page) {
      await browser.close()
      console.log("User not logged in")
      return
    }

    const profilesLinks = await findProfiles(page, keyword)
    console.log("Scrapping profiles...")

    for (const profileLink of profilesLinks) {
      const scrappedProfile = await scrapProfile(page, profileLink)
      console.log(scrappedProfile)
      await db.person.add(scrappedProfile);
    }

    console.log("Profiles saved!")
    await browser.close();
  } 
  
  catch (error) {
    console.log("Scrapping interrupted")
  }

}

export default run
