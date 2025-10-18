import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import type { WalletBalanceUiProps } from "@/types/overview.type";

const WalletBalanceUi: React.FC<WalletBalanceUiProps> = ({
  balance,
  loading,
  role,
}) => {
  const [displayedBalance, setDisplayedBalance] = useState(0);
  const [prevBalance, setPrevBalance] = useState(0);
  const [trendDirection, setTrendDirection] = useState<'up' | 'down' | 'same'>('same');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Initialize with the current balance if available
    if (balance !== undefined && displayedBalance === 0) {
      setDisplayedBalance(balance);
      setPrevBalance(balance);
    }
  }, [balance, displayedBalance]);

  useEffect(() => {
    if (balance !== undefined && balance !== prevBalance) {
      // Determine trend direction
      if (balance > prevBalance) {
        setTrendDirection('up');
      } else if (balance < prevBalance) {
        setTrendDirection('down');
      } else {
        setTrendDirection('same');
      }
      
      setPrevBalance(balance);
      
      // Animate the balance change with improved logic
      const duration = 1000; // ms
      const startValue = displayedBalance;
      const change = balance - startValue;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + change * easeOutQuart;
        
        setDisplayedBalance(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayedBalance(balance); // Ensure exact value at the end
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [balance, displayedBalance, prevBalance]);

  return (
    <Card 
      className="relative flex items-center justify-between bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10 ${isHovered ? 'animate-ping' : ''}`}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        
        {/* Floating circles */}
        <div className={`absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-white/10 transition-all duration-1000 ${isHovered ? 'translate-x-2 translate-y-2' : ''}`}></div>
        <div className={`absolute bottom-1/3 right-1/3 w-4 h-4 rounded-full bg-white/10 transition-all duration-1000 ${isHovered ? '-translate-x-2 -translate-y-2' : ''}`}></div>
      </div>
      
      <div className="relative z-10 w-full flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <CardTitle className="text-lg font-semibold text-white">
              {role === "ADMIN" ? "Capital Balance" : "Wallet Balance"}
            </CardTitle>
            {trendDirection === 'up' && (
              <TrendingUp size={18} className="text-green-300 animate-bounce" />
            )}
            {trendDirection === 'down' && (
              <TrendingDown size={18} className="text-red-300 animate-pulse" />
            )}
          </div>
          
          {loading ? (
            <div className="flex items-center gap-2 ">
              <RefreshCw size={24} className="animate-spin" />
              <p className="text-2xl font-bold">Loading...</p>
            </div>
          ) : (
            <p className="text-4xl font-bold text-white tracking-tight">
              ${displayedBalance.toFixed(2)}
            </p>
          )}
        </div>
        
        <div className="relative z-10 ml-4">
          <div className={`relative transition-transform duration-300 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
            <Wallet 
              size={48} 
              className={`drop-shadow-md ${trendDirection === 'up' ? 'text-green-300' : trendDirection === 'down' ? 'text-red-300' : ''}`}
            />
            {!loading && trendDirection !== 'same' && (
              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${trendDirection === 'up' ? 'bg-green-400 animate-ping' : 'bg-red-400 animate-ping'}`}></div>
            )}
          </div>
        </div>
      </div>
      
      {/* Shine effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] transition-transform duration-1000 ${isHovered ? 'translate-x-[100%]' : ''}`}></div>
    </Card>
  );
};

export default WalletBalanceUi;