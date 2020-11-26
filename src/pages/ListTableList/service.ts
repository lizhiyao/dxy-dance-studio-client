import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

// 获取全部课程
export async function getCourses(params?: TableListParams) {
  return request('/dance-api/courses', {
    params,
  }).then((ret) => ret.data);
}

export async function deleteCourse(id: number) {
  return request('/dance-api/auth/delete-course', {
    method: 'POST',
    data: {
      id,
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
