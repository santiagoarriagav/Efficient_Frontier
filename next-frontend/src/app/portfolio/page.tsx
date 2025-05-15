import EfficientFrontierChart from "@/components/EfficientFrontierChart";


export const metadata = {
  title: "Efficient frontier chart",
  description: "descripcion",
};

export default function PortfolioPage() {
  return (
    <>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Portfolio Optimizer</h1>
      <EfficientFrontierChart tickers={["AAPL", "MSFT", "GOOG"]} />
    </div>
    </>
  );
}
