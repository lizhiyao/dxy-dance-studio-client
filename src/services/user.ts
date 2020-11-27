import { request } from 'umi';

export async function queryCurrent() {
  return request('/dance-api/auth/get-current-user');
}
