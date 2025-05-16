// src/app/stock-prices/page.tsx
import StockPriceChartSection from "@/components/StockPricesWrapper";


export const metadata = {
title: "FinTools - Stock Prices",
description: "View and analyze historical stock prices",
};

export default function StockPricePage() {
  return (
    <div className="bg-[#2c1f1a] text-[#ede0d4] min-h-screen p-6">
      <h1 className="mx-auto">Stock Price Graph</h1>
      <StockPriceChartSection />
    </div>
  );
}
