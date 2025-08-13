export type Locale = 'en' | 'zh-CN';

export const dictionaries: Record<Locale, Record<string, string>> = {
  'zh-CN': {
    dashboard: '数据总览',
    accounts: '账号',
    videos: '视频',
    imports: '导入数据(CSV)',
    alerts: '告警规则',
    settings: '设置',
    addAccount: '添加账号',
  },
  en: {
    dashboard: 'Dashboard',
    accounts: 'Accounts',
    videos: 'Videos',
    imports: 'Import CSV',
    alerts: 'Alerts',
    settings: 'Settings',
    addAccount: 'Add account',
  },
};

export const defaultLocale: Locale = 'zh-CN';

export function t(locale: Locale, key: string): string {
  return dictionaries[locale][key] || key;
}
