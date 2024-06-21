const { getCountAction, incrementAction, resetAction } = require("../../services/actions")


const verifyOpenAd = async () => {
    const count = await getCountAction()
    if (count === 10) {
        await resetAction()
        return true
    }
    await incrementAction(count + 1)
    return false
}

export { verifyOpenAd }