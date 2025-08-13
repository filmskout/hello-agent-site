'use client';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function TimeSeriesChart({ labels, data, title }: { labels: string[]; data: number[]; title: string }) {
  return <Line data={{ labels, datasets: [{ label: title, data, fill: true }] }} />;
}
