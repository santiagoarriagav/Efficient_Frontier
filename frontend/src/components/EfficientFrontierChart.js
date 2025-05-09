import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Floating tooltip for return, risk, sharpe
const CustomTooltip = ({ active, payload }) => {
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

export default function EfficientFrontierChart({ tickers }) {
  const [frontierData, setFrontierData] = useState([]);
  const [selected, setSelected] = useState(null);
  const chartRef = useRef();

  useEffect(() => {
    axios.post("http://localhost:8000/api/efficient-frontier/", { tickers })
      .then(res => setFrontierData(res.data.frontier))
      .catch(err => console.error("API error:", err));
  }, [tickers]);

  const chartData = frontierData.map((p, idx) => ({
    ...p,
    id: idx + 1,
    risk: p.stdev,
    return: p.return,
    sharpe: p.sharpe
  }));

  // 🔍 Global listener to detect click outside chart
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chartRef.current && !chartRef.current.contains(e.target)) {
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
                  setSelected(e.payload);
                }
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {selected && selected.weights && (
        <div style={{
          marginTop: "1rem",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "15px",
          width: "300px"
        }}>
          <h4>Portfolio {selected.id}</h4>
          <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
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
