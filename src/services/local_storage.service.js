const JWT_TOKEN_KEY = 'JWT_TOKEN'

const getToken = () => {
    return window.localStorage.getItem(JWT_TOKEN_KEY)
}

const saveToken = (token) => {
    window.localStorage.setItem(JWT_TOKEN_KEY, token)
}

const destroyToken = () => {
    window.localStorage.removeItem(JWT_TOKEN_KEY)
}

export { getToken, saveToken, destroyToken }