"use client";
import { useState } from 'react';
import FrontierChart from '@/components/EfficientFrontierChart';

export default function FrontierPage() {
  const [tickerInput, setTickerInput] = useState('');
  const [tickers, setTickers] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

  const addTicker = () => {
    const cleanTicker = tickerInput.trim().toUpperCase();
    if (!cleanTicker) return;
    if (tickers.includes(cleanTicker)) return;

    setTickers([...tickers, cleanTicker]);
    setTickerInput('');
  };

  const removeTicker = (ticker: string) => {
    setTickers(tickers.filter(t => t !== ticker));
  };

  const handleFetch = async () => {
    if (tickers.length < 2) {
      alert("Please enter at least two tickers.");
      return;
    }

    const res = await fetch("http://localhost:8000/api/efficient-frontier/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickers }),
    });

    const json = await res.json();
    setData(json.frontier);
  };

  return (
    <div className="bg-zinc-100 text-zinc-900 min-h-screen px-6 py-8">
      {/* LEFT: Ticker Input Form */}
      <div className="md:col-span-1">
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
          {tickers.map(ticker => (
            <li key={ticker} className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded text-black">
              <span>{ticker}</span>
              <button
                onClick={() => removeTicker(ticker)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={handleFetch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate Frontier
        </button>
      </div>

      {/* RIGHT: Chart */}
      <div className="md:col-span-2">
        {data.length > 0 ? (
          <FrontierChart data={data} />
        ) : (
          <div className="text-gray-500">Add tickers and click "Generate Frontier" to see the chart.</div>
        )}
      </div>
    </div>
  );
}
