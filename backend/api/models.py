from django.db import models

# Create your models here.

class AssetPrices(models.Model):
    ticker = models.CharField(max_length=10)
    date = models.DateField()
    close = models.FloatField()

    class Meta:
        unique_together = ("ticker", "date")
    
    def __str__(self):
        return f"{self.ticker} - {self.date}"