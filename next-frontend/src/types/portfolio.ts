export interface PortfolioPoint {
  id: number;
  weights: Record<string, number>; // or {[ticker: string]: number}
  return: number;
  stdev: number;
  sharpe: number;
}

export interface EfficientFrontierResponse {
  frontier: PortfolioPoint[];
}

export interface EfficientFrontierChartProps {
  tickers: string[];
}
