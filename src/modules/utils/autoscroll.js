const autoscrollProfile = async (page) => {
    await page.evaluate(() => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    })
}

export default autoscrollProfile