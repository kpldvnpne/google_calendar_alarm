const REFRESH_TOKEN_LOCALSTORAGE_KEY = 'refreshToken';
const ACCESS_TOKEN_LOCALSTORAGE_KEY = 'accessToken';
const SCOPE_LOCALSTORAGE_KEY = 'scope';
const EXPIRY_DATE_LOCALSTORAGE_KEY = 'expiryDate';

function saveTokensAndScope({refreshToken, accessToken, scope, expiresIn}) {
    localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, refreshToken);
    localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
    localStorage.setItem(SCOPE_LOCALSTORAGE_KEY, scope);

    const currentTime = new Date();
    const expiryDate = new Date(currentTime.getTime() + 1000 * expiresIn);
    localStorage.setItem(EXPIRY_DATE_LOCALSTORAGE_KEY, expiryDate);
}

function getTokensAndScope() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
    const scope = localStorage.getItem(SCOPE_LOCALSTORAGE_KEY);
    const expiryDate = localStorage.getItem(EXPIRY_DATE_LOCALSTORAGE_KEY);

    return {refreshToken, scope, expiryDate, accessToken};
}

export {saveTokensAndScope, getTokensAndScope};