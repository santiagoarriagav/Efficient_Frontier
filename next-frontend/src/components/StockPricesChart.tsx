"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // Enables time scale support using date-fns

// Register Chart.js components
ChartJS.register(
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  Legend
);

// Define the expected shape of the data
type PricePoint = {
  date: string;
  price: number;
};

type Props = {
  data: Record<string, PricePoint[]>; // e.g. { AAPL: [...], MSFT: [...] }
};

// Helper to assign a color per ticker
function getColorForTicker(ticker: string): string {
  const predefined: Record<string, string> = {
    AAPL: '#1f77b4',
    MSFT: '#ff7f0e',
    GOOGL: '#2ca02c',
    AMZN: '#d62728',
    META: '#9467bd',
    TSLA: '#8c564b',
  };

  // If not predefined, generate one using HSL
  if (!predefined[ticker]) {
    predefined[ticker] = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
  }

  return predefined[ticker];
}

export default function StockPriceChart({ data }: Props) {
  const chartData = {
    datasets: Object.entries(data).map(([ticker, points]) => {
      const color = getColorForTicker(ticker);
      return {
        label: ticker,
        data: points.map(p => ({ x: p.date, y: p.price })),
        borderColor: color,
        backgroundColor: color,
        pointBackgroundColor: color,
        pointBorderColor: color,
        borderWidth: 2,
        fill: false,
      };
    }),
  };

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: { mode: 'nearest', intersect: false },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'PPP',
            },
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price (USD)',
            },
            ticks: {
              callback: function (value) {
                return `$${value}`;
              },
            },
          },
        },
      }}
    />
  );
}
