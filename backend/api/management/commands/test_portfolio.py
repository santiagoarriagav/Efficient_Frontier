from django.core.management.base import BaseCommand
from api.portfolio_optimizer import Portfolio  # o donde tengas tu clase

class Command(BaseCommand):
    help = "Test Portfolio logic"

    def handle(self, *args, **kwargs):

        test_assets = ['AAPL', 'MSFT', "MMM", "PLTR", "BNB"]
        pf = Portfolio(test_assets, period="2y")
        
        #print tests
        prices = pf.prices
        classic_returns = pf.classic_returns_annualized()
        efficient_weights = pf.efficient_frontier_weights()
        

        print(prices)
        print(classic_returns)
        print(efficient_weights)

