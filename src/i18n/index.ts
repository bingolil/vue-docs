
import { createI18n } from "vue-i18n";
import { Locale } from "ant-design-vue/es/locale-provider";
import dayjs from "dayjs"; // antd-design-vue在vue.js3采用日期控件库为day.js
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import 'dayjs/locale/en-au';
import 'dayjs/locale/zh-cn';

import { StorageUtil } from "@/utils";
import { LANG } from "@/constant";

/**
 * 获取antd 语言信息并处理时间类组件的国际化
 * @param lang 语言类型
 * @returns 
 */
export const getUILocale = (lang = StorageUtil.getLang()): Locale => {
  switch (lang) {
    case LANG.zhCn:
      dayjs.locale('zh-cn');
      return zhCN;
    case LANG.enUs:
      dayjs.locale('en');
      return enUS;
    default:
      dayjs.locale('zh-cn');
      return zhCN;
  }
}

/** 创建i18n国际化 */
export const i18n = createI18n({
  locale: StorageUtil.getLang(),
  messages: {
    'zh-CN': require('@/assets/i18n/zh-CN.json'),
    'en-US': require('@/assets/i18n/en-US.json')
  }
});

