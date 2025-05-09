from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from backend.portfolio_optimizer import Portfolio

class EfficientFrontierView(APIView):
    def post(self, request):
        tickers = request.data.get("tickers", [])
        if len(tickers) < 2:
            return Response({"error": "At least two tickers are required."}, status=400)

        portfolio = Portfolio(tickers, rang=365)

        summaries = portfolio.get_graph_data() 

        return Response({"frontier": summaries}, status=status.HTTP_200_OK)
