const getDetailsLink = (profileLink, detailsName) => {
    return `${profileLink}/details/${detailsName.toLowerCase()}`
}

export default getDetailsLink