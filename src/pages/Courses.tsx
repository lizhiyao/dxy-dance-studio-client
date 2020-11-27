import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import { getCourseTable } from '@/services/course';

const renderCell = (course: { id: any; name: any; type: any; teacher: any }) => {
  const { id, name, type, teacher } = course;
  const t = type === 2 ? '*' : '';
  return id ? (
    <div>
      <Tag color="geekblue" key={id}>
        {`${name} ${t}`}
      </Tag>
      <br />
      <Tag color="green" key={`${t}-${id}`}>
        {teacher}
      </Tag>
    </div>
  ) : null;
};

const columns = [
  {
    title: '课程时间',
    dataIndex: 'timeRange',
    key: '0',
    align: 'center',
  },
  {
    title: '星期一',
    dataIndex: '1',
    key: '1',
    align: 'center',
    render: renderCell,
  },
  {
    title: '星期二',
    dataIndex: '2',
    key: '2',
    align: 'center',
    render: renderCell,
  },
  {
    title: '星期三',
    dataIndex: '3',
    key: '3',
    align: 'center',
    render: renderCell,
  },
  {
    title: '星期四',
    key: '4',
    dataIndex: '4',
    align: 'center',
    render: renderCell,
  },
  {
    title: '星期五',
    key: '5',
    align: 'center',
    render: renderCell,
  },
];

const Courses = () => {
  const [courseTable, setCourseTable] = useState([]);

  useEffect(() => {
    const f = async () => {
      const ret = await getCourseTable();
      setCourseTable(ret.data);
    };

    f();
  }, []);

  return <Table bordered pagination={false} columns={columns} dataSource={courseTable} />;
};

export default Courses;
