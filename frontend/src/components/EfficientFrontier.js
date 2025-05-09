import React, {useState, useEffect} from "react";
import axios from "axios";

export default function EfficientFrontier({tickers}) {
    const [frontier, setFrontier] = useState([]);

     useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.post("http://localhost:8000/api/efficient-frontier/", { tickers,})
                .then(res => {
                    setFrontier(res.data.frontier);
                })
            } catch (err) {
                console.error("API error", err);
            }
        };
        
        fetchData();
    }, []);

    return (
        <div>
            <h2>Efficient Frontier</h2>
            {frontier.map((p, idx) => (
            <div key={idx}>
                <h4>Portfolio {idx + 1}</h4>
                <ul>
                {Object.entries(p.weights).map(([ticker, weight]) => (
                    <li key={ticker}>{ticker}: {(weight * 100).toFixed(2)}%</li>
                ))}
                </ul>
                <p>Return: {(p.return * 100).toFixed(2)}%</p>
                <p>Stdev: {(p.stdev * 100).toFixed(2)}%</p>
                <p>Sharpe: {p.sharpe.toFixed(2)}</p>
                <hr />
            </div>
            ))}
        </div>
    );
}