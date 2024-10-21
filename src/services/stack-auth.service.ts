import { AxiosResponse } from 'axios';

import request from '../lib/utils/stack-axios';

export const getCurrentUser = () => request.get('/api/v1/users/me');

export const updateMe = (updateData: object) => request.patch('/api/v1/users/me', { ...updateData });

export const refresh = async (): Promise<AxiosResponse> =>
  request.post(
    `/api/v1/auth/sessions/current/refresh`,
    {},
    {
      // Disable retry on token refreshing request
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _unretryable: true,
    }
  );
