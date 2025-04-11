from django.core.management.base import BaseCommand
from api.models import AssetPrices
import yfinance as yf
import pandas as pd
from tqdm import tqdm
import time

class Command(BaseCommand):
    help = "Bulk load historical prices for multiple tickers into AssetPrices"

    def add_arguments(self, parser):
        parser.add_argument('--tickers_file', type=str, help="Path to text file with tickers")
        parser.add_argument('--period', type=str, default='5y', help="Yahoo Finance period, e.g., 1y, 5y, max")
        parser.add_argument('--batch_size', type=int, default=50, help="Number of tickers per download batch")

    def handle(self, *args, **options):
        file_path = options['tickers_file']
        period = options['period']
        batch_size = options['batch_size']

        def chunks(lst, n):
            for i in range(0, len(lst), n):
                yield lst[i:i + n]

        # Load ticker list
        with open(file_path, 'r') as f:
            tickers = [line.strip().upper() for line in f if line.strip()]
        tickers = list(set(tickers))
        self.stdout.write(f"Loaded {len(tickers)} unique tickers")

        failed = []

        for batch in tqdm(chunks(tickers, batch_size), total=len(tickers)//batch_size + 1, desc="Downloading batches"):
            try:
                data = yf.download(
                    tickers=batch,
                    period=period,
                    group_by='ticker',
                    auto_adjust=True,
                    threads=True,
                    progress=False
                )

                for ticker in batch:
                    try:
                        df = data[ticker] if len(batch) > 1 else data
                        if "Close" not in df.columns:
                            raise Exception("Missing 'Close' column")
                        df = df.reset_index()[['Date', 'Close']].dropna()
                        bulk = [
                            AssetPrices(ticker=ticker, date=row['Date'], close=row['Close'])
                            for _, row in df.iterrows()
                        ]
                        AssetPrices.objects.bulk_create(bulk, ignore_conflicts=True)
                    except Exception as e:
                        failed.append(ticker)
                        self.stderr.write(self.style.ERROR(f"[{ticker}] failed: {e}"))

                time.sleep(1.5)  # Respectful pause to avoid Yahoo rate limits

            except Exception as e:
                failed.extend(batch)
                self.stderr.write(self.style.ERROR(f"[Batch error] {e}"))

        if failed:
            with open("failed_tickers.txt", "w") as f:
                f.writelines([t + '\n' for t in failed])
            self.stdout.write(self.style.WARNING(f"⚠️  {len(failed)} tickers failed. See failed_tickers.txt"))
        else:
            self.stdout.write(self.style.SUCCESS("✅ All tickers processed successfully."))
