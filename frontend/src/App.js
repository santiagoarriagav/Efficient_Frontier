import './App.css';

// import EfficientFrontier from './components/EfficientFrontier';
import EfficientFrontierChart from './components/EfficientFrontierChart';

function App() {
  const tickers = ["AAPL", "MSFT", "GOOG", "MMM"];

  return (
    <div className="App">
      <h1>Efficient Frontier</h1>
      <div>
        <GridItem title={"aaaa"}></GridItem>
        <GridItem title={"aaaa"}></GridItem>
      <EfficientFrontierChart tickers={tickers}></EfficientFrontierChart>
      </div>
    </div>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="App">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default App;
