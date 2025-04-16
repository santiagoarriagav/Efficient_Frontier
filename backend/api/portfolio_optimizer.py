import pandas as pd
import numpy as np
from api.models import AssetPrices
from datetime import timedelta
from django.utils.timezone import now

class Portfolio:
    def __init__(self, assets, period="5y", rang=30, RiskFreeYearly=0.04):
        #definiciones
        self.assets     = assets
        self.period     = period
        self.rang      = rang
        self.riskfree   = RiskFreeYearly

        self.prices = self.get_prices()

    def get_prices(self):
        days_back = self.years_to_days(self.period)
        cutoff_date = now().date() - timedelta(days=days_back)

        qs = AssetPrices.objects.filter(
            ticker__in=self.assets,
            date__gte=cutoff_date
            ).values("ticker", "date", "close")

        df = pd.DataFrame.from_records(qs)
        df_pivot = df.pivot(index="date", columns="ticker", values="close")
        return df_pivot

    def years_to_days(self, period_str):
        if period_str.endswith("y"):
            return int(period_str.replace("y", "")) * 252
        elif period_str.endswith("m"):
            return int(period_str.replace("m", "")) * 21
        else:
            raise ValueError("Unsupported period format")
        
    def classic_returns(self):
        """this would only take direct returns in the range with no adjustment, 
        and create a dataframe"""

        prices = self.prices
        forward_prices = prices.shift(-self.rang) 
        returns = (forward_prices / prices) - 1
        returns = returns[:-self.rang] #remove nans and 0
        return returns
        
    def smooth_classic_returns(self):
        
        return
