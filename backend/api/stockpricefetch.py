import pandas as pd
import numpy as np
from api.models import AssetPrices
from datetime import timedelta
from django.utils.timezone import now
from scipy.optimize import minimize

class Portfolio:
    def __init__(self, assets, period="5y", rang=1):
        #definiciones
        self.assets     = assets
        self.period     = period
        self.rang       = rang

        self.prices = self.get_prices()
        
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
