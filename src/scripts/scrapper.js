import puppeteer from 'puppeteer-core/lib/esm/puppeteer/web'
import initBrowser from '../modules/utils/init.js'
import findProfiles from '../modules/utils/find.js'
import scrapProfile from '../modules/utils/scrapper.js'
import { db } from '../modules/services/db.js'

// show an alert
const run = async (tabId, keyword) => {

  const page = await initBrowser(tabId)
  const profilesLinks = await findProfiles(page, keyword)

  console.log("Scrapping profiles...")

  for (const profileLink of profilesLinks) {
    const scrappedProfile = await scrapProfile(page, profileLink)
    console.log(scrappedProfile)
    await db.person.add(scrappedProfile);
  }

  console.log("Profiles saved!")

  await page.close();
}

export default run
