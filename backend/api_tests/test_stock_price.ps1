# test_stock_api.ps1

# Define tickers
$tickers = @("AAPL", "MMM")

# Create JSON payload
$json = @{ tickers = $tickers } | ConvertTo-Json -Compress

# Send POST request
$response = Invoke-RestMethod -Method Post `
  -Uri "http://localhost:8000/api/stock-price-history/" `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body $json

# Show nicely formatted output
$response | ConvertTo-Json -Depth 3

# Optional: Save to file
$response | ConvertTo-Json -Depth 3 | Out-File -Encoding utf8 response.json

Write-Host "`n✅ Response saved to response.json"
