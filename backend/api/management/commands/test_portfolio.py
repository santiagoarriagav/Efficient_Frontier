from django.core.management.base import BaseCommand
from api.portfolio_optimizer import Portfolio  # o donde tengas tu clase

class Command(BaseCommand):
    help = "Test Portfolio logic"

    def handle(self, *args, **kwargs):
        pf = Portfolio(['AAPL', 'MSFT', "MMM", "PLTR", "BNB"], period="2y", rang=30)
        prices = pf.prices
        classic_returns = pf.classic_returns_annualized()
        annualized_returns = pf.annualize_returns(classic_returns)

        print(prices)
        print(classic_returns)
        print(annualized_returns)
