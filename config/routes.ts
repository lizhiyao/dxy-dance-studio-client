export default [
  // 登录
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  // 课表
  {
    path: '/courses',
    name: 'courses',
    icon: 'smile',
    component: './Courses',
  },
  {
    path: '/admin/courses',
    name: 'manage-courses',
    icon: 'crown',
    access: 'canVisit',
    component: './CourseList',
  },
  {
    path: '/',
    redirect: '/courses',
  },
  {
    component: './404',
  },
];
