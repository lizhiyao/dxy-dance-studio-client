import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'DXY Dance Studio',
  pwa: false,
  logo: 'https://img1.dxycdn.com/2020/1127/268/3958360705116989443-22.png',
  iconfontUrl: '',
};

export default Settings;
