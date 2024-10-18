import { AxiosResponse } from "axios";
import request from '../lib/utils/stack-axios';


export const getMe = ()=> request.get('/api/v1/users/me')

export const updateMe = (updateData: object)=> request.patch('/api/v1/users/me', {...updateData})

export const refresh = async (): Promise<AxiosResponse> =>
  request.get(`/api/v1/auth/sessions/current/refresh`, {
    // Disable retry on token refreshing request
    // @ts-ignore
    _unretryable: true,
  });