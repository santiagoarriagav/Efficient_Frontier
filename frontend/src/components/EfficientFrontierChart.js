import {useState, useEffect} from "react";
import axios from "axios";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Label, Legend
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const portfolio = payload[0].payload;
    const { return: expectedReturn, risk, sharpe, weights = {} } = portfolio;

    return (
      <div style={{
        backgroundColor: "white",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        maxWidth: "250px"
      }}>
        
        <p><strong>Return:</strong> {(expectedReturn * 100).toFixed(2)}%</p>
        <p><strong>Risk:</strong> {(risk * 100).toFixed(2)}%</p>
        <p><strong>Sharpe Ratio:</strong> {sharpe.toFixed(2)}</p>
        <hr />
        <p><strong>Weights:</strong></p>
        <ul style={{ paddingLeft: "1em", margin: 0 }}>
          {Object.entries(weights).map(([ticker, weight]) => (
            <li key={ticker}>
              {ticker}: {(weight * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};


export default function EfficientFrontierChart({ tickers }) {
  const [frontier, setFrontier] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:8000/api/efficient-frontier/", { tickers })
      .then(res => setFrontier(res.data.frontier));
  }, []);

  const chartData = frontier.map(portfolio => ({
    weights: portfolio.weights,
    risk: portfolio.stdev,
    return: portfolio.return,
    sharpe: portfolio.sharpe
  }));
  

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid vertical_points={[0.1,0.2,0.3]} />
        <XAxis
          type="number"
          dataKey="risk"
          name="Standard Deviation"
          unit=""
          tickFormatter={(v) => (v * 100).toFixed(1) + '%'}
          domain={["dataMin - 0.01", "dataMax + 0.01"]}
          tickCount={10}>
          <Label value="aaa"/>
        </XAxis>
        <YAxis
          type="number"
          dataKey="return"
          name="Expected Return"
          unit=""
          tickFormatter={(v) => (v * 100).toFixed(1) + '%'}
          domain={["dataMin - 0.1", "dataMax + 0.1"]}
          tickCount={7}>
          <Label value="bb"/>
        </YAxis>
        <Tooltip content={<CustomTooltip />}/>
        <Legend />
        <Scatter name="Portfolios" data={chartData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
