"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from "recharts";
import { StockPriceChartPoint, StockPriceChartPointResponse, StockPriceChartPointProps } from "@/types/stock_prices_chart";

// Custom tooltip typed with TooltipProps
const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<any, string>) => {
  if (active && payload && payload.length > 0) {
    const { return: expectedReturn, risk, sharpe } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p><strong>Return:</strong> {(expectedReturn * 100).toFixed(2)}%</p>
        <p><strong>Risk:</strong> {(risk * 100).toFixed(2)}%</p>
        <p><strong>Sharpe Ratio:</strong> {sharpe.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function EfficientFrontierChart({ tickers }: StockPriceChartPointProps) {
  const [frontierData, setFrontierData] = useState<StockPriceChartPoint []>([]);
  const [selected, setSelected] = useState<StockPriceChartPoint | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios.post("http://localhost:8000/api/stock-price-history/", { tickers })
      .then(res => setFrontierData(res.data.frontier))
      .catch(err => console.error("API error:", err));
  }, [tickers]);

  const chartData = frontierData.map((p, idx) => ({
    id: idx + 1,
    ticker: p.ticker,
    date: p.date,
    values: p.value
  }));

  // Detect clicks outside the chart area to clear selection
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chartRef.current && !chartRef.current.contains(e.target as Node)) {
        setSelected(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="risk"
              name="Standard Deviation"
              tickFormatter={(v) => (v * 100).toFixed(1) + '%'}
            />
            <YAxis
              type="number"
              dataKey="return"
              name="Expected Return"
              tickFormatter={(v) => (v * 100).toFixed(1) + '%'}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
            <Scatter
              name="Portfolios"
              data={chartData}
              fill="#8884d8"
              onClick={(e) => {
                if (e && e.payload) {
                  setSelected(e.payload as PortfolioPoint);
                }
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {selected && selected.weights && (
        <div className="mt-4 bg-gray-100 border border-gray-300 rounded p-4 w-[300px]">
          <h4 className="font-semibold mb-2">Portfolio {selected.id}</h4>
          <ul className="list-disc ml-4 text-sm">
            {Object.entries(selected.weights).map(([ticker, weight]) => (
              <li key={ticker}>
                {ticker}: {(weight * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
