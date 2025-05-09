from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from backend.portfolio_optimizer import Portfolio

class EfficientFrontierView(APIView):
    def post(self, request):
        tickers = request.data.get("tickers", [])

        portfolio = Portfolio(tickers)

        optimal_weights = portfolio.efficient_frontier_weights() 
        return Response({"weights": optimal_weights}, status=status.HTTP_200_OK)
