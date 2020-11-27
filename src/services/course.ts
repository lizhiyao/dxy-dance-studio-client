import { request } from 'umi';

export async function getCourseTable() {
  return request('/dance-api/course-table');
}
