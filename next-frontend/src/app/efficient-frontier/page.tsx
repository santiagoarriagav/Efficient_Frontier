import EfficientFrontierSection from "@/components/EfficientFrontierWrapper";


export const metadata = {
title: "FinTools - Efficient Frontier",
description: "Get the efficient frontier for multiple assets",
};

export default function EfficientFrontierPage() {
  return (
    <div className="bg-[#2c1f1a] text-[#ede0d4] min-h-screen p-6 mx-auto">
      <h1 className="mx-auto">Efficient Frontier Graph</h1>
      <h3>Efficient frontier</h3>
      <p>
        The efficient frontier is a concept from modern portfolio theory. It 
        represents a curve that shows the set of optimal portfolios that offer 
        the highest expected return for a given level of risk, or the lowest risk 
        for a given expected return. Any portfolio on the curve is considered 
        efficient, while portfolios below it are suboptimal.
      </p>
      <h3>Capital Allocation Line (CAL)</h3>
      <p>
        The Capital Allocation Line (CAL) is a straight line that represents combinations of a 
        risk-free asset and a risky portfolio. Its slope is the Sharpe Ratio of the risky portfolio. 
        The best CAL is the one that tangents the efficient frontier — this line shows the best 
        possib  le trade-off between risk and return.
      </p>
      <h3>Optimal Portfolio</h3>
      <p>
        The optimal portfolio is the tangency point between the CAL and the efficient frontier. It's the 
        best mix of risky assets that maximizes the Sharpe Ratio. Investors can then combine this portfolio 
        with the risk-free asset to match their own risk preference.
      </p>
      <EfficientFrontierSection />
    </div>
  );
}
