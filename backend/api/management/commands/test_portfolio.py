from django.core.management.base import BaseCommand
from api.portfolio_optimizer import Portfolio  # o donde tengas tu clase

class Command(BaseCommand):
    help = "Test Portfolio logic"

    def handle(self, *args, **kwargs):
        pf = Portfolio(['AAPL', 'MSFT', "MMM", "PLTR"], period="2y", rang=30)
        print(pf.prices)
        print(pf.classic_returns())
