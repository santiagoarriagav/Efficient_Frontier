import EfficientFrontierSection from "@/components/EfficientFrontierWrapper";


export const metadata = {
title: "FinTools - Efficient Frontier",
description: "Get the efficient frontier for multiple assets",
};

export default function EfficientFrontierPage() {
  return (
    <div className="bg-[#2c1f1a] text-[#ede0d4] min-h-screen p-6">
      <h1 className="mx-auto">Efficient Frontier Graph</h1>
      <EfficientFrontierSection />
    </div>
  );
}
