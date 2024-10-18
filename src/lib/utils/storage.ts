export const STORAGE_KEY = {
  JARVIS_REDIRECT_URL: 'jarvis_redirect_url',
  JARVIS_CLIENT_ID: 'jarvis_client_id'
}

export const setRedirectUrl = (url: string)=> localStorage.setItem(STORAGE_KEY.JARVIS_REDIRECT_URL, url);

export const getRedirectUrl = ()=> localStorage.getItem(STORAGE_KEY.JARVIS_REDIRECT_URL);

export const removeRedirectUrl = ()=> localStorage.removeItem(STORAGE_KEY.JARVIS_REDIRECT_URL);

export const setClientId = (clientId: string) => localStorage.setItem(STORAGE_KEY.JARVIS_CLIENT_ID, clientId);

export const getClientId = ()=> localStorage.getItem(STORAGE_KEY.JARVIS_CLIENT_ID);

export const removeClientId = ()=> localStorage.removeItem(STORAGE_KEY.JARVIS_CLIENT_ID);

export const removeStorageKeys= ()=>{
  removeClientId();
  removeRedirectUrl();
}