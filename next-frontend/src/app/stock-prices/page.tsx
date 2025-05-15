"use client";

import { useState } from 'react';
import StockPriceChart from '@/components/StockPricesFetch';

export default function StockPricePage() {
  const [tickerInput, setTickerInput] = useState('');
  const [tickers, setTickers] = useState<string[]>([]);
  const [prices, setPrices] = useState<Record<string, any[]>>({});

  const addTicker = () => {
    const clean = tickerInput.trim().toUpperCase();
    if (clean && !tickers.includes(clean)) {
      setTickers([...tickers, clean]);
    }
    setTickerInput('');
  };

  const removeTicker = (ticker: string) => {
    setTickers(tickers.filter(t => t !== ticker));
  };

  const fetchPrices = async () => {
    const res = await fetch("http://localhost:8000/api/stock-price-history/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickers }),
    });
    const json = await res.json();
    setPrices(json.prices);
  };



  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6, bg-amber-950">
      {/* LEFT: Input Panel */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Enter Tickers</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tickerInput}
            onChange={(e) => setTickerInput(e.target.value)}
            placeholder="e.g. AAPL"
            className="border px-3 py-2 w-full"
          />
          <button
            onClick={addTicker}
            className="bg-green-600 text-white px-3 py-2 rounded"
          >
            Add
          </button>
        </div>

        <ul className="mb-4 space-y-1">
          {tickers.map(t => (
            <li key={t} className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded text-black">
              <span>{t}</span>
              <button onClick={() => removeTicker(t)} className="text-red-500 hover:text-red-700">✕</button>
            </li>
          ))}
        </ul>

        <button
          onClick={fetchPrices}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fetch Prices
        </button>
      </div>

      {/* RIGHT: Chart */}
      <div className="md:col-span-2 bg-amber-100">
        {Object.keys(prices).length > 0 ? (
          <StockPriceChart data={prices} />
        ) : (
          <p className="text-gray-500">Enter tickers and fetch prices to view the chart.</p>
        )}
      </div>
    </div>
  );
}
