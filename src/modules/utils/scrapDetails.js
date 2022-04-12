import scrapEducationDetails from "./scrapEducationDetails.js"
import scrapExperienceDetails from "./scrapExperienceDetails.js"

const scrapDetails = async (page, detailsName) => {

    let details = {
        'education': scrapEducationDetails,
        'experience': scrapExperienceDetails
    }

    return details[detailsName](page)

}

export default scrapDetails