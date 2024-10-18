export const AUTH_KEY = {
  TOKEN: 'jarvis_cx_app_token',
  REFRESH_TOKEN: 'jarvis_cx_app_refresh_token',
  DATA: 'jarvis_cx_app_auth_data',
};

export const setToken = (token: string) => localStorage.setItem(AUTH_KEY.TOKEN, token);

export const getToken = () => localStorage.getItem(AUTH_KEY.TOKEN);

export const removeToken = () => localStorage.removeItem(AUTH_KEY.TOKEN);

export const setRefreshToken = (token: string) => localStorage.setItem(AUTH_KEY.REFRESH_TOKEN, token);

export const getRefreshToken = () => localStorage.getItem(AUTH_KEY.REFRESH_TOKEN);

export const removeRefreshToken = () => localStorage.removeItem(AUTH_KEY.REFRESH_TOKEN);

export const removeTokens = () => {
  removeToken();
  removeRefreshToken();
};
