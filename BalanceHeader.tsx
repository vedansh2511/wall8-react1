import React from 'react';
import { TrendingUp } from 'lucide-react';

interface BalanceHeaderProps {
  totalBalance: number;
  percentageChange: number;
}

export function BalanceHeader({ totalBalance, percentageChange }: BalanceHeaderProps) {
  const isPositive = percentageChange > 0;

  return (
    <div className="p-6 space-y-2">
      <h2 className="text-gray-500 text-lg">Total Balance</h2>
      <div className="flex items-end space-x-2">
        <span className="text-4xl font-bold">${totalBalance.toLocaleString()}</span>
        <span className="text-2xl text-gray-400">.00</span>
      </div>
      <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        <TrendingUp className="w-4 h-4" />
        <span className="text-sm font-medium">{percentageChange}% than last week</span>
      </div>
    </div>
  );
}