from django.core.management.base import BaseCommand
from api.models import AssetPrices
import yfinance as yf

class Command(BaseCommand):
    help = 'Fetch historical prices and store in the database'

    def add_arguments(self, parser):
        parser.add_argument('ticker', type=str)
        parser.add_argument('--period', type=str, default='5y')

    def handle(self, *args, **options):
        ticker = options['ticker']
        period = options['period']
        self.stdout.write(f"Fetching data for {ticker} ({period})")
        
        data = yf.Ticker(ticker).history(period=period)
        for date, row in data.iterrows():
            AssetPrices.objects.update_or_create(
                ticker=ticker,
                date=date.date(),
                defaults={'close': row['Close']}
            )
        self.stdout.write(self.style.SUCCESS(f"Done saving data for {ticker}"))
