# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import now
from datetime import timedelta

from .models import AssetPrices
from .serializers import AssetPriceSerializer, PortfolioGraphSerializer


from api.components.portfolio_optimizer import Portfolio

class EfficientFrontierView(APIView):
    def post(self, request):
        tickers = request.data.get("tickers", [])
        if len(tickers) < 2:
            return Response({"error": "At least two tickers are required."}, status=400)

        portfolio = Portfolio(tickers, rang=365)
        summaries = portfolio.get_graph_data()  # list of dicts

        serializer = PortfolioGraphSerializer(summaries, many=True)
        return Response({"frontier": serializer.data}, status=200)

class StockPricesView(APIView):
    def post(self, request):
        tickers = request.data.get("tickers", [])
        if not tickers:
            return Response({"error": "No tickers provided."}, status=status.HTTP_400_BAD_REQUEST)

        # Get prices for last 1 year (can make period dynamic if needed)
        cutoff_date = now().date() - timedelta(days=365)
        qs = AssetPrices.objects.filter(
            ticker__in=tickers,
            date__gte=cutoff_date
        ).order_by("date")

        serialized = AssetPriceSerializer(qs, many=True).data

        # Group by ticker, and format as chart-ready JSON
        grouped = {}
        for row in serialized:
            ticker = row["ticker"]
            if ticker not in grouped:
                grouped[ticker] = []
            grouped[ticker].append({
                "date": row["date"],
                "price": float(row["close"])
            })

        # Optional: if only one ticker, return flat list
        if len(tickers) == 1:
            return Response({"prices": grouped[tickers[0]]}, status=status.HTTP_200_OK)

        return Response({"prices": grouped}, status=status.HTTP_200_OK)
        
