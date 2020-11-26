import React from 'react';
import { Modal } from 'antd';
import { ProFormText, StepsForm, ProFormRadio, ProFormTimePicker } from '@ant-design/pro-form';
import * as moment from 'moment';
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
  <StepsForm
    stepsProps={{
      size: 'small',
    }}
    stepsFormRender={(dom, submitter) => {
      return (
        <Modal
          width={640}
          destroyOnClose
          title="规则配置"
          visible={props.updateModalVisible}
          footer={submitter}
          onCancel={() => props.onCancel()}
        >
          {dom}
        </Modal>
      );
    }}
    onFinish={() => {
      console.log('props.values', props.values);
      return props.onSubmit(props.values);
    }}
  >
    <StepsForm.StepForm
      initialValues={{
        name: props.values.name,
        teacher: props.values.teacher,
        type: props.values.type,
      }}
      title="课程基本信息"
    >
      <ProFormText
        name="name"
        label="课程名称"
        rules={[{ required: true, message: '请输入课程名称！' }]}
      />
      <ProFormText
        name="teacher"
        label="授课老师"
        rules={[{ required: true, message: '请输入授课老师名字！' }]}
      />
      <ProFormRadio.Group
        name="type"
        label="规则类型"
        options={[
          {
            value: 1,
            label: '基础课',
          },
          {
            value: 2,
            label: '进阶课',
          },
        ]}
        rules={[{ required: true, message: '请选择课程类型！' }]}
      />
    </StepsForm.StepForm>
    <StepsForm.StepForm
      initialValues={{
        dayOfTheWeek: props.values.dayOfTheWeek,
        // ProFormTimePicker 内部使用 moment.js，尝试使用 day.js 未成功 https://ant.design/docs/react/replace-moment-cn，所以继续使用 moment
        startTime: moment(props.values.startTime, moment.HTML5_FMT.TIME_SECONDS),
        endTime: moment(props.values.endTime, moment.HTML5_FMT.TIME_SECONDS),
      }}
      title="课程时间"
    >
      <ProFormRadio.Group
        name="dayOfTheWeek"
        label="星期几"
        options={[
          {
            value: 1,
            label: '星期一',
          },
          {
            value: 2,
            label: '星期二',
          },
          {
            value: 3,
            label: '星期三',
          },
          {
            value: 4,
            label: '星期四',
          },
          {
            value: 5,
            label: '星期五',
          },
        ]}
      />
      <ProFormTimePicker
        name="startTime"
        label="开始时间"
        rules={[{ required: true, message: '请选择开始时间！' }]}
      />
      <ProFormTimePicker
        name="endTime"
        label="结束时间"
        rules={[{ required: true, message: '请选择开始时间！' }]}
      />
    </StepsForm.StepForm>
    <StepsForm.StepForm
      initialValues={{
        address: props.values.address,
      }}
      title="课程地点"
    >
      <ProFormText
        name="address"
        label="上课地址"
        width="l"
        rules={[{ required: true, message: '请输入上课地址！' }]}
      />
    </StepsForm.StepForm>
  </StepsForm>
);

export default UpdateForm;
