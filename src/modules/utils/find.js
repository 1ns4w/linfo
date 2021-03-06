import puppeteer from 'puppeteer-core/lib/cjs/puppeteer/web'

const findProfiles = async (page, keyword) => {
    
    const searchURL = `https://www.linkedin.com/search/results/people/?keywords=${keyword}`
    await page.goto(searchURL, { waitUntil: 'domcontentloaded' })
    await page.waitForXPath('//a[contains(@class, "app-aware-link") and ./span]')
    const profiles = await page.$x('//a[contains(@class, "app-aware-link") and ./span]')

    let profileLinks = []

    for (const profile of profiles) {
        const profileLink = await profile.evaluate(node => node.href.split('?')[0])
        profileLinks.push(profileLink)
    }
    return profileLinks
}

export default findProfiles