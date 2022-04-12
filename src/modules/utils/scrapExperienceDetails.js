import Detail from "../models/Detail.js"
import getDetailsItems from "./items.js"
import getText from "./text.js"

const scrapExperienceDetails = async (page) => {

    const detailsItems = await getDetailsItems(page)
    
    let detailsData = []

    for (const item of detailsItems) {

        const [itemWithHistory] = await item.$x('(.)/../../../../../../../../../div[1][./a]')

        if (itemWithHistory) {
            const [companyHandle] = await itemWithHistory.$x(".//span[contains(@class, 't-bold')]/span[@aria-hidden]")
            const company = await getText(companyHandle)
            const [positionHandle] = await item.$x(".//span[contains(@class, 't-bold')]/span[@aria-hidden]")
            const position = await getText(positionHandle)
            const [durationInfoHandle] = await item.$x(".//span[contains(@class, 't-normal')]/span[@aria-hidden]")
            const durationInfo = (await getText(durationInfoHandle)).split(' · ');
            const totalDuration = durationInfo[1]
            const durationRange = durationInfo[0].split(' - ')
            detailsData.push(new Detail(company, position, totalDuration, durationRange[0], durationRange[durationRange.length - 1]))
        }

        else {
            const [companyHandle] = await item.$x("(.//span[contains(@class, 't-normal')]/span[@aria-hidden])[1]")
            const [company] = (await getText(companyHandle)).split(' · ');
            const [positionHandle] = await item.$x(".//span[contains(@class, 't-bold')]/span[@aria-hidden]")
            const position = await getText(positionHandle)
            const [durationInfoHandle] = await item.$x("(.//span[contains(@class, 't-normal')]/span[@aria-hidden])[2]")
            const durationInfo = (await getText(durationInfoHandle)).split(' · ');
            const totalDuration = durationInfo[1]
            const durationRange = durationInfo[0].split(' - ')
            detailsData.push(new Detail(company, position, totalDuration, durationRange[0], durationRange[durationRange.length - 1]))
        }
    }
            
    return detailsData
}

export default scrapExperienceDetails