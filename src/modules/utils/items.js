const getDetailsItems = async (page) => {
    return await page.$x("(//section[.//h2[contains(@class, 't-20')]]/div[count(./../div)]//ul)[1]/li[.//a[contains(@href, 'company') or contains(@href, 'linkedin.com/search')]]//div[contains(@class, 'pvs-entity') and count(./div) = 2 and not(.//span[contains(@class, 'pvs-entity__path-node')])]")
}

export default getDetailsItems