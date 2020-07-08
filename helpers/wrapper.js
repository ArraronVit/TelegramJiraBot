import fetch from 'node-fetch'

const WrapperError = {
    INTERNAL_ERROR: 'WRAPPER_INTERNAL_ERROR'
}

const getRequest = async (url, token) => {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Basic ${new Buffer(token).toString('base64')}`,
            Accept: 'application/json'
        }
    }
    try {
        const response = await fetch(
            url,
            options
        )
        return await response.json()
    } catch {
        throw WrapperError.INTERNAL_ERROR
    }
}

export default { getRequest }
