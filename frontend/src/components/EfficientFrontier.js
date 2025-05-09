import React, {useState, useEffect} from "react";
import axios from "axios";

export default function EfficientFrontier({tickers}) {
    const [weights, setWeights] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.post("http://localhost:8000/api/efficient-frontier/", {
                    tickers,
                });
                setWeights(res.data.weights);
            } catch (err) {
                console.error("API error", err);
            }
        };
        
        fetchData();
    }, [tickers]);

    return (
        <div>
            <h2>Optimal Weights</h2>

            <ul>
            {weights.map((portfolio, index) => (
                <div key={index}>
                    <h4>Portfolio {index + 1}</h4>
                    <ul>
                    
                    {portfolio.map((w, i) => (
                        <li key={i}>{tickers[i]}: {(w*100).toFixed(4) + "%"}</li>
                    ))}
                    </ul>
                </div>
                ))}
            </ul>
        </div>
    );
}