"use client";

import { useState } from 'react';
import StockPriceChart from '@/components/StockPricesChart';

export default function StockPriceWrapper() {
  const [tickers, setTickers] = useState<string[]>(Array(8).fill(''));
  const [prices, setPrices] = useState<Record<string, any[]>>({});

  const handleChange = (index: number, value: string) => {
    const newTickers = [...tickers];
    newTickers[index] = value.toUpperCase();
    setTickers(newTickers);
  };

  const fetchPrices = async () => {
    const filtered = tickers.filter(t => t.trim() !== '');
    if (filtered.length < 1) {
      alert("Please enter at least one ticker.");
      return;
    }

    const res = await fetch("http://localhost:8000/api/stock-price-history/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickers: filtered }),
    });
    const json = await res.json();
    setPrices(json.prices);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevents accidental form submission
      fetchPrices();
    }
  };

  return (
    <div className="bg-[#2c1f1a] text-[#ede0d4] min-h-screen p-6">
      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {/* LEFT: Fixed 10-input field list */}
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
            onClick={fetchPrices}
            className="bg-[#a0522d] hover:bg-[#d2691e] text-white px-4 py-2 rounded w-full"
          >
            Fetch Prices
          </button>
        </div>

        {/* RIGHT: Chart display */}
        <div className="md:col-span-2 bg-[#3b2f2a] border border-[#4a3a32] rounded-lg p-6">
          {Object.keys(prices).length > 0 ? (
            <StockPriceChart data={prices} />
          ) : (
            <p className="text-[#bfa89e]">Enter tickers and press Enter or click Fetch to view the chart.</p>
          )}
        </div>
      </div>
    </div>
  );
}
