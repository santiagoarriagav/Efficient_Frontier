from django.core.management.base import BaseCommand
from api.components.portfolio_optimizer import Portfolio
import pandas as pd


class Command(BaseCommand):
    help = "Test Portfolio logic"

    def handle(self, *args, **kwargs):
        
        a = pd.read_csv("data/iwv-etf-constituents-07-24-2025.csv")
        assets = a.iloc[:,0].to_list()
        assets = [item for item in assets if '/' not in str(item) and '.' not in str(item) and "^" not in str(item)]
        test_assets = assets

        #test_assets = ['AAPL', 'MSFT', "MMM", "PLTR", "BNB"]

        pf = Portfolio(test_assets, period="5y", rang=1, return_type="classic", RiskFreeYearly=0.08)

        #To csv
        pf.efficient_frontier_weights(trials=10)
        metrics = pf.get_graph_data()
        pd.DataFrame(metrics).to_csv("data/test_metrics.csv", encoding='utf-8', index=True)

        index = [i["name"] for i in metrics]
        weights = [i["weights"] for i in metrics]
        pd.DataFrame(index=index, columns=test_assets, data=weights).to_csv("data/test_weights.csv", encoding='utf-8', index=True)
