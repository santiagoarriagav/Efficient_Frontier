import logo from './logo.svg';
import './App.css';

import EfficientFrontier from './components/EfficientFrontier';

function App() {
  const tickers = ["AAPL", "MSFT", "GOOG"];

  return (
    <div className="App">
      <h1>Efficient Frontier</h1>
      <EfficientFrontier tickers={tickers}></EfficientFrontier>
    </div>
  );
}

export default App;
