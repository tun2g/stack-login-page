import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';

import { refresh } from '@/services/stack-auth.service';

import { appConfigs } from '../app-config';

import { getRefreshToken, getToken, setToken } from './auth';

type StackAuthRequestHeaders = AxiosRequestHeaders & {
  'X-Stack-Access-Type': 'client' | 'server';
  'X-Stack-Project-Id': string;
  'X-Stack-Publishable-Client-Key': string;
  'X-Stack-Access-Token'?: string;
  'X-Stack-Refresh-Token'?: string;
};

const instance = axios.create({
  baseURL: `${appConfigs.stack.apiUrl}`,
});

const requestAuthInterceptor = (req: AxiosRequestConfig): InternalAxiosRequestConfig => {
  if (req.url?.includes('/auth/refresh')) {
    return req as InternalAxiosRequestConfig;
  }

  const token = getToken();
  const refreshToken = getRefreshToken();

  if (token) {
    return {
      ...req,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${token}`,
        'X-Stack-Access-Type': 'client',
        'X-Stack-Project-Id': appConfigs.stack.projectId,
        'X-Stack-Publishable-Client-Key': appConfigs.stack.publishableClientKey,
        'X-Stack-Access-Token': token,
        ...(refreshToken && { 'X-Stack-Refresh-Token': refreshToken }),
      } as StackAuthRequestHeaders,
    };
  }

  return req as InternalAxiosRequestConfig;
};

const responseAuthInterceptor = (res: AxiosResponse) => res;

const responseAuthErrorInterceptor = async (error: AxiosError) => {
  const { response, config } = error;
  const status = response?.status;

  // NOTE: Config may include the `_unretryable` property, which was passed via Axios request.
  if (status === HttpStatusCode.Unauthorized && !(config as any)._unretryable) {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      try {
        const refreshResponse = await refresh();

        const { access_token: accessToken } = refreshResponse.data;

        if (accessToken) {
          setToken(accessToken);

          // Prevent infinite loop on the resumed request
          (config as any)._unretryable = true;
          return await instance(config!);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
  }

  return Promise.reject(error);
};

instance.interceptors.request.use(requestAuthInterceptor);
instance.interceptors.response.use(responseAuthInterceptor, responseAuthErrorInterceptor);

export default instance;
