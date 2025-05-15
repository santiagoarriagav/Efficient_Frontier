export interface StockPriceChartPoint {
  id: number;
  ticker: string; 
  date: Date;
  value: number;
}

export interface StockPriceChartPointResponse {
  frontier: StockPriceChartPoint[];
}

export interface StockPriceChartPointProps {
  tickers: string[];
}


