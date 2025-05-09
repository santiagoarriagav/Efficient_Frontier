import logo from './logo.svg';
import './App.css';

import EfficientFrontier from './components/EfficientFrontier';
import EfficientFrontierChart from './components/EfficientFrontierChart';

function App() {
  const tickers = ["AAPL", "MSFT", "GOOG", "MMM"];

  return (
    <div className="App">
      <h1>Efficient Frontier</h1>
      <EfficientFrontierChart tickers={tickers}></EfficientFrontierChart>
    </div>
  );
}

export default App;
