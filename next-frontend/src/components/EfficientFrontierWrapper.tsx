"use client";

import { useState } from 'react';
import FrontierChart from '@/components/EfficientFrontierChart';

export default function EfficientFrontierWrapper() {
  const [tickers, setTickers] = useState<string[]>(Array(8).fill(''));
  const [data, setData] = useState<any[]>([]);

  const handleChange = (index: number, value: string) => {
    const newTickers = [...tickers];
    newTickers[index] = value.toUpperCase();
    setTickers(newTickers);
  };

  const handleFetch = async () => {
    const filtered = tickers.filter(t => t.trim() !== '');
    if (filtered.length < 2) {
      alert("Please enter at least two tickers.");
      return;
    }

    const res = await fetch("http://localhost:8000/api/efficient-frontier/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickers: filtered }),
    });

    const json = await res.json();
    setData(json.frontier);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevents accidental form submission
      handleFetch();
    }
  };

  
  return (
    <div className="bg-[#2c1f1a] text-[#ede0d4] min-h-screen px-6 py-8">
      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* LEFT: Ticker Input Fields */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-[#fefae0]">Enter up to 10 Tickers</h2>

          <div className="space-y-3 mb-6">
            {tickers.map((ticker, index) => (
              <input
                key={index}
                value={ticker}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ticker ${index + 1}`}
                className="bg-[#3b2f2a] border border-[#4a3a32] text-[#ede0d4] placeholder:text-[#bfa89e] px-3 py-2 w-full rounded focus:outline-none"
              />
            ))}
          </div>

          <button
            onClick={handleFetch}
            className="bg-[#a0522d] hover:bg-[#d2691e] text-white px-4 py-2 rounded w-full"
          >
            Generate Frontier
          </button>
        </div>

        {/* RIGHT: Chart */}
        <div className="md:col-span-2 bg-[#3b2f2a] rounded-lg p-6 border border-[#4a3a32]">
          {data.length > 0 ? (
            <FrontierChart data={data} />
          ) : (
            <div className="text-[#bfa89e]">
              Fill at least 2 tickers to generate the chart.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
