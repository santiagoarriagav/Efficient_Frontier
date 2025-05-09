import pandas as pd
import numpy as np
from api.models import AssetPrices
from datetime import timedelta
from django.utils.timezone import now
from scipy.optimize import minimize

class Portfolio:
    def __init__(self, assets, period="5y", rang=365, RiskFreeYearly=0.04, return_type="classic"):
        #definiciones
        self.assets     = assets
        self.period     = period
        self.rang       = rang
        self.riskfree   = RiskFreeYearly

        self.prices = self.get_prices()
    
        match return_type:
            case "classic":
                self.returns = self.classic_returns_annualized()
            case "smooth":
                self.returns = self.smooth_classic_returns()
        
        #make the data from returns
        self.cov_matrix = self.returns.cov()
        self.mean_returns = self.returns.mean()
        print(self.mean_returns)

        #calling the functions
        self.efficient_frontier_weights()
        
    def get_prices(self):
        days_back = self.years_to_days(self.period)
        cutoff_date = now().date() - timedelta(days=days_back)

        qs = AssetPrices.objects.filter(
            ticker__in=self.assets,
            date__gte=cutoff_date
            ).values("ticker", "date", "close")

        df = pd.DataFrame.from_records(qs)
        df_pivot = df.pivot(index="date", columns="ticker", values="close").sort_index().dropna()
        return df_pivot

    def years_to_days(self, period_str):
        if period_str.endswith("y"):
            return int(period_str.replace("y", "")) * 252
        elif period_str.endswith("m"):
            return int(period_str.replace("m", "")) * 21
        else:
            raise ValueError("Unsupported period format")
        
    def classic_returns_annualized(self):
        """Take classic returns, and annualized"""

        prices = self.prices
        forward_prices = prices.shift(-self.rang) 
        returns = (forward_prices / prices) - 1
        returns = returns[:-self.rang] #remove nans and 0
        annualized_returns = (1 + returns)**(252/self.rang) - 1
        
        return annualized_returns
        
    def smooth_classic_returns(self):
        
        return
    
    def full_portfolio_performance(self, weights):
        weights = np.matrix(weights)
        rf = self.riskfree
        mean_returns = self.mean_returns
        cov_matrix = self.cov_matrix

        PortReturn = np.dot(weights, mean_returns)
        variance = np.dot(np.dot(weights, cov_matrix),weights.T)
        PortStDev = np.sqrt(variance)
        
        sharpe = (PortReturn - rf) / PortStDev

        return {"PortReturn": PortReturn, "PortStDev": PortStDev, "PortSharpe": sharpe}
    
    def PortReturn(self, weights):
        mean_returns = self.mean_returns
        PortReturn = np.dot(weights, mean_returns)
        return PortReturn
    
    def PortStDev(self, weights):
        weights = np.matrix(weights)
        cov_matrix = self.cov_matrix
        variance = np.dot(np.dot(weights.T, cov_matrix),weights)
        PortStDev = np.sqrt(variance)
        return PortStDev
    
    def PortSharpe(self, weights):
        weights = np.matrix(weights)
        rf = self.riskfree
        mean_returns = self.mean_returns
        cov_matrix = self.cov_matrix

        PortReturn = np.dot(weights, mean_returns)
        variance = np.dot(np.dot(weights.T, cov_matrix),weights)
        PortStDev = np.sqrt(variance)
        
        sharpe = (PortReturn - rf) / PortStDev
        return sharpe
    
    def efficient_frontier_weights(self, trials=20):
        mean_returns = self.mean_returns.values.flatten()
        num_assets = len(mean_returns)
        bounds = tuple((0, 1) for _ in range(num_assets))

        #weights = np.matrix()
        cov_matrix = self.cov_matrix
        
        initial = num_assets * [1. / num_assets]

        target_returns = np.linspace(min(self.mean_returns), 
                                     max(self.mean_returns), trials)
        efficient_weights   = []

        for target in target_returns:
            constraints = (
                    {'type': 'eq', 'fun': lambda w: np.sum(w) - 1},
                    {'type': 'eq', 'fun': lambda w: np.dot(w, mean_returns) - target}
                )

            result = minimize(
                lambda w: np.dot(np.dot(w.T, cov_matrix),w),
                initial,
                method='SLSQP',
                constraints=constraints,
                bounds=bounds
                )
            
            if result.success:
                efficient_weights.append(np.round(result.x,6))
            else:
                print(f"Optimization failed for target return: {target}")
        
        self.efficient_weights  = efficient_weights
        return None
    
    def get_graph_data(self):
        
        summaries = []

        counter = 0
        for weights in self.efficient_weights:
            performance = self.full_portfolio_performance(weights)
            summary = {
                "name": f"Portfolio {counter}",
                "weights": dict(zip(self.assets, weights)),
                "return": float(performance["PortReturn"]),
                "stdev": float(performance["PortStDev"]),
                "sharpe": float(performance["PortSharpe"]),
            }
            summaries.append(summary)
            counter += 1

        return summaries


