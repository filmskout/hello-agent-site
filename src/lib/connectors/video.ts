export interface DailyVideoMetric {
  videoId: string;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  timestamp: Date;
}

export interface VideoMetricsConnector {
  fetchDailyVideoMetrics(videoId: string, platform: string, from: Date, to: Date): Promise<DailyVideoMetric[]>;
}

export const placeholderVideoConnector: VideoMetricsConnector = {
  async fetchDailyVideoMetrics() {
    console.warn('VideoMetricsConnector not implemented. Configure official API.');
    return [];
  },
};
