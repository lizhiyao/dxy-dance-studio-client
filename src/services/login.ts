import { request } from 'umi';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
}

export async function accountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/dance-api/login', {
    method: 'POST',
    data: params,
  });
}

export async function outLogin() {
  return request('/dance-api/logout');
}
