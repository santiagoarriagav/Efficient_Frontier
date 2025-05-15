import yfinance as yf
import pandas as pd
from datetime import timedelta
from django.utils.timezone import now
from time import sleep
from tqdm import tqdm
from django.core.management.base import BaseCommand
from api.models import AssetPrices


class Command(BaseCommand):
    help = "Batch download missing prices for all tickers"

    def handle(self, *args, **kwargs):
        self.stdout.write("🔄 Fetching tickers...")
        tickers = list(AssetPrices.objects.values_list('ticker', flat=True).distinct())
        ticker_to_start = {}

        for ticker in tickers:
            last = AssetPrices.objects.filter(ticker=ticker).order_by('-date').first()
            ticker_to_start[ticker] = last.date + timedelta(days=1) if last else pd.to_datetime("2010-01-01")

        # Optional: batch in groups of 50
        batch_size = 50
        updated = 0
        failed_tickers = []
        for i in tqdm(range(0, len(tickers), batch_size), desc="Batch"):
            try:
                batch = tickers[i:i+batch_size]
                min_start_date = min(ticker_to_start[t] for t in batch)
                print(min_start_date)
                self.stdout.write(f"📥 Fetching batch {i//batch_size+1} for {len(batch)} tickers")

                df = yf.download(batch, start=min_start_date)
                if df.empty:
                    self.stdout.write(self.style.WARNING(f"⚠️ No data returned for batch {i//batch_size+1}"))
                    continue
                sleep(1)
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"❌ Error with {ticker}: {e}"))
                failed_tickers.append({'ticker': ticker, 'error': str(e)})  

        self.stdout.write(self.style.SUCCESS(f"✅ Finished. Total new prices added: {updated}"))
    
        if failed_tickers:
            timestamp = now().strftime("%Y-%m-%d_%H-%M-%S")
            df_failed = pd.DataFrame(failed_tickers)
            df_failed.to_csv(f"failed_tickers_{timestamp}.csv", index=False)
            self.stdout.write(self.style.WARNING(f"⚠️ Saved {len(failed_tickers)} failed tickers to failed_tickers_{timestamp}.csv"))
        else:
            self.stdout.write(self.style.SUCCESS("✅ No failed tickers!"))

