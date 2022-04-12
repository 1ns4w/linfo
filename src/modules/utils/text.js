const getText = async (element) => {
    return await element?.evaluate(node => node.textContent.match(/[^\s|\n]+/ig).join(' '))
}

export default getText