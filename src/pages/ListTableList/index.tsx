import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data.d';
import { getCourses, updateCourse } from './service';

dayjs.extend(customParseFormat);

/**
 * 添加节点
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在添加');
  try {
    const { data, error } = await updateCourse({ ...fields, id: fields.id || 0 });
    hide();
    if (data) {
      message.success('添加成功');
      return true;
    }
    throw new Error(error);
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: '课程名称',
      dataIndex: 'name',
    },
    {
      title: '授课老师',
      dataIndex: 'teacher',
      sorter: true,
    },
    {
      title: '课程类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        1: {
          text: '基础课',
        },
        2: {
          text: '进阶课',
        },
      },
      renderText: (val) => {
        let typeStr = '未知';
        if (val === 1) {
          typeStr = '基础课';
        } else if (val === 2) {
          typeStr = '进阶课';
        }
        return typeStr;
      },
    },
    {
      title: '星期几',
      dataIndex: 'dayOfTheWeek',
      valueType: 'select',
      valueEnum: {
        1: {
          text: '星期一',
        },
        2: {
          text: '星期二',
        },
        3: {
          text: '星期三',
        },
        4: {
          text: '星期四',
        },
        5: {
          text: '星期五',
        },
      },
      sorter: true,
      renderText: (val) => {
        let dayStr = 'X';
        if (val === 1) {
          dayStr = '一';
        } else if (val === 2) {
          dayStr = '二';
        } else if (val === 3) {
          dayStr = '三';
        } else if (val === 4) {
          dayStr = '四';
        } else if (val === 5) {
          dayStr = '五';
        }
        return `星期${dayStr}`;
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      valueType: 'time',
      renderText: (val) => dayjs(val, 'HH:mm:ss').format(),
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: 'time',
      renderText: (val) => dayjs(val, 'HH:mm:ss').format(),
    },
    {
      title: '上课地址',
      dataIndex: 'address',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            handleUpdateModalVisible(true);
            setStepFormValues(record);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            handleUpdateModalVisible(true);
            setStepFormValues(record);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      {/* 课程列表 */}
      <ProTable<TableListItem>
        headerTitle="课程列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button key="1" type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => getCourses({ ...params, sorter, filter })}
        columns={columns}
      />

      {/* 新增课程 */}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const course = {
              ...value,
              type: Number(value.type),
              dayOfTheWeek: Number(value.dayOfTheWeek),
            };

            const success = await handleUpdate(course);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>

      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            console.log(value);
            // const course = {
            //   ...value,
            //   id: this.props.value.id,
            // };
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
