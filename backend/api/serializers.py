# api/serializers.py
from rest_framework import serializers
from .models import AssetPrices

class AssetPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetPrices
        fields = ['ticker', 'date', 'close']

class PortfolioGraphSerializer(serializers.Serializer):
    name = serializers.CharField()
    weights = serializers.DictField(child=serializers.FloatField())
    return_ = serializers.FloatField(source="return")
    stdev = serializers.FloatField()
    sharpe = serializers.FloatField()
