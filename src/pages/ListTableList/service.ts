import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

// 获取全部课程
export async function getCourses(params?: TableListParams) {
  return request('/dance-api/courses', {
    params,
  }).then((ret) => ret.data);
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function updateCourse(params: TableListItem) {
  return request('/dance-api/auth/update-course', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
