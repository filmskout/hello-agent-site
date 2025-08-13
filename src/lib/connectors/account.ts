export interface DailyAccountMetric {
  accountId: string;
  followers?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  timestamp: Date;
}

export interface AccountMetricsConnector {
  fetchDailyAccountMetrics(accountId: string, platform: string, from: Date, to: Date): Promise<DailyAccountMetric[]>;
}

export const placeholderAccountConnector: AccountMetricsConnector = {
  async fetchDailyAccountMetrics() {
    console.warn('AccountMetricsConnector not implemented. Configure official API.');
    return [];
  },
};
