import { request } from 'umi';

export async function queryCurrent() {
  return request('/dance-api/get-current-user');
}
