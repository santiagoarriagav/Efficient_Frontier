from django.contrib import admin
from .models import AssetPrices

# Register your models here.

@admin.register(AssetPrices)
class AssetPricesAdmin(admin.ModelAdmin):
    list_display = ("ticker", "date", "close")
    list_filter = ("ticker")