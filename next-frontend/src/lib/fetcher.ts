export async function postEfficientFrontier(tickers: string[]) {
  const res = await fetch("http://localhost:8000/api/efficient-frontier/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tickers }),
  });

  if (!res.ok) throw new Error("Failed to fetch frontier data");
  return res.json();
}
