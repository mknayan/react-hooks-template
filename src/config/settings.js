let ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT

export const PUBLIC_URL = process.env.PUBLIC_URL;

// Tokens
const API_TOKEN_LIVE = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IkxJVkUi.FPCKiT3oLsG_LN03a4ea8ZGSO3Drxe6jK70skLWaddM';
const API_TOKEN_TEST = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IkxJVkUi.FPCKiT3oLsG_LN03a4ea8ZGSO3Drxe6jK70skLWaddM';

const production = {
    API_BASE_URL: "https://reserve.simplyeloped.com/api",
    API_TOKEN: API_TOKEN_LIVE,
}

const staging = {
    API_BASE_URL: "https://simplyeloped.io/apps/simplyeloped/demo/api",
    API_TOKEN: API_TOKEN_TEST,
}

const local = {
    API_BASE_URL: "http://localhost/Instalogic/cbcommerce/src/api",
    API_TOKEN: API_TOKEN_TEST,
}

export const CONFIG = ENVIRONMENT === 'production' ? production : (ENVIRONMENT === 'staging' ? staging : local);
