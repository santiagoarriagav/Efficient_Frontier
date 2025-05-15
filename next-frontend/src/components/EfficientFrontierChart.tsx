"use client";

// components/FrontierChart.tsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
  Legend,
  LineElement
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Title, Legend);

type FrontierPoint = {
  name: string;
  return_: number;
  stdev: number;
  sharpe: number;
};

export default function FrontierChart({ data }: { data: FrontierPoint[] }) {
  const chartData = {
    labels: data.map(p => p.name),
    datasets: [
      {
        label: 'Efficient Frontier',
        data: data.map(p => ({ x: p.stdev, y: p.return_ })),
        pointRadius: 5,
        pointHoverRadius: 6,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        showLine: false,
      },
    ],
  };

  return (
    <div className="p-4">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: context => {
                  const point = data[context.dataIndex];
                  return `${point.name}: Return=${point.return_.toFixed(2)}, Risk=${point.stdev.toFixed(2)}, Sharpe=${point.sharpe.toFixed(2)}`;
                },
              },
            },
            title: {
              display: true,
              text: 'Efficient Frontier',
            },
          },
          scales: {
            x: {
              type: "linear", 
              title: { display: true, text: 'Volatility (Std Dev)' } },
            y: { 
              type: "linear",
              title: { display: true, text: 'Expected Return' } },
          },
        }}
      />
    </div>
  );
}
