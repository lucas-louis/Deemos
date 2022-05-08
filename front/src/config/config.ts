import * as env from 'env-var';

export const REACT_APP_STARTON_BASE_URL = env.get('REACT_APP_STARTON_BASE_URL').required().asString();
export const REACT_APP_STARTON_API_KEY = env.get('REACT_APP_STARTON_API_KEY').required().asString();
export const REACT_APP_STARTON_CONTRACT_URI = env.get('REACT_APP_STARTON_CONTRACT_URI').required().asString();
export const REACT_APP_BASE_URI = env.get('REACT_APP_BASE_URI').required().asString();
export const REACT_APP_BACKEND = env.get('REACT_APP_BACKEND').required().asString();
export const REACT_APP_SIGNER_WALLET = env.get('REACT_APP_SIGNER_WALLET').required().asString();
