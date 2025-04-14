

class Portfolio:
    def __init__(self, assets, period="5y", range=30, RiskFreeYearly=0.04):
        #definiciones
        self.assets     = assets
        self.period     = period
        self.range      = range
        self.riskfree   = RiskFreeYearly

        def classic_returns():
            """this would only take direct returns in the range with no adjustment, 
            and create a dataframe"""

            return
        
        def smooth_classic_returns():
            
            return