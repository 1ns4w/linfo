import puppeteer from 'puppeteer-core/lib/cjs/puppeteer/web'

const findProfiles = async (page, keyword) => {
    
    await page.goto(`https://www.linkedin.com/search/results/people/?keywords=${keyword}`, { waitUntil: 'load', timeout: 90000 })
    const profiles = await page.$x('//a[contains(@class, "app-aware-link") and ./span]')

    let profileLinks = []

    for (const profile of profiles) {
        const profileLink = await profile.evaluate(node => node.href.split('?')[0])
        profileLinks.push(profileLink)
    }
    return profileLinks
}

export default findProfiles