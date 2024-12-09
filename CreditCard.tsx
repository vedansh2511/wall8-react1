import React from 'react';
import { CreditCard as CardIcon } from 'lucide-react';

interface CreditCardProps {
  balance: number;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  variant?: 'dark' | 'light' | 'accent';
}

export function CreditCard({ balance, cardNumber, cardHolder, expiryDate, variant = 'dark' }: CreditCardProps) {
  const baseClasses = "relative w-full p-6 rounded-xl transition-transform hover:scale-[1.02]";
  const variantClasses = {
    dark: "bg-teal-900 text-white",
    light: "bg-teal-50 text-teal-900",
    accent: "bg-rose-50 text-rose-900"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8">
            <CardIcon className="w-full h-full" />
          </div>
          <span className="font-semibold">VISA</span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-mono">{cardNumber.match(/.{1,4}/g)?.join(' ')}</span>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm opacity-75">Card Holder</p>
            <p className="font-medium">{cardHolder}</p>
          </div>
          <div>
            <p className="text-sm opacity-75">Expires</p>
            <p className="font-medium">{expiryDate}</p>
          </div>
        </div>
      </div>
      
      <div className="absolute right-6 bottom-6">
        <div className="flex space-x-1">
          <div className="w-6 h-6 rounded-full bg-white/20"></div>
          <div className="w-6 h-6 rounded-full bg-white/30"></div>
        </div>
      </div>
    </div>
  );
}