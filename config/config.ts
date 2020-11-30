// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Ant Design Pro',
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  exportStatic: {},
  // https://beta-pro.ant.design/docs/deploy-cn#%E9%83%A8%E7%BD%B2%E5%88%B0%E9%9D%9E%E6%A0%B9%E7%9B%AE%E5%BD%95
  base: '/dxy-dance/',
  publicPath: '/dxy-dance/',
  // chainWebpack(memo, { env, webpack, createCSSRule }) {
  //   // 设置 alias
  //   memo.plugin(AntdDayjsWebpackPlugin)
  // }
});
