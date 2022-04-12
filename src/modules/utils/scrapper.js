import puppeteer from 'puppeteer-core/lib/cjs/puppeteer/web'
import getDetailsLink from './details.js'
import Person from '../models/Person.js'
import getText from './text.js'
import scrapDetails from './scrapDetails.js'

const scrapProfile = async (page, profileLink) => {

    console.log("contact")

    const contactInformationLink = `${profileLink}/overlay/contact-info`
    await page.goto(contactInformationLink, { waitUntil: 'domcontentloaded' })
    await page.waitForXPath('//h1[contains(@id, "pv-contact-info")]')

    console.log("contact")

    const [fullnameHandle] = await page.$x('//h1[contains(@id, "pv-contact-info")]')
    const fullname = await getText(fullnameHandle)

    const [emailHandle] = await page.$x('//h3[text() = "Email"]/following-sibling::div')
    const email = await getText(emailHandle)

    console.log("1")

    const experienceDetailsLink = getDetailsLink(profileLink, 'experience')
    await page.goto(experienceDetailsLink, { waitUntil: 'load', timeout: 120000})
    const experience = await scrapDetails(page, 'experience')

    console.log("2")

    const educationDetailsLink = getDetailsLink(profileLink, 'education')
    await page.goto(educationDetailsLink, { waitUntil: 'load', timeout: 120000})
    const education = await scrapDetails(page, 'education')

    console.log("3")

    const profile = new Person(fullname, email, experience, education)

    return profile
}

export default scrapProfile