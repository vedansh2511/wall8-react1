import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { CreditCard } from './CreditCard';
import { BalanceHeader } from './BalanceHeader';
import { NavigationTab } from './BottomTabs';
import { AccountPage } from './AccountPage';
import { ThemeProvider } from '@/context/ThemeContext';

const mockCards = [
  {
    id: 1,
    balance: 14850,
    cardNumber: '4580763435068920',
    cardHolder: 'Michele Joana',
    expiryDate: '12/25',
    variant: 'dark' as const,
  },
  {
    id: 2,
    balance: 3750,
    cardNumber: '4539782165890123',
    cardHolder: 'Michele Joana',
    expiryDate: '12/25',
    variant: 'light' as const,
  },
  {
    id: 3,
    balance: 2380,
    cardNumber: '4916385274169032',
    cardHolder: 'Michele Joana',
    expiryDate: '12/26',
    variant: 'accent' as const,
  },
];

function Home() {
  const [activeTab, setActiveTab] = useState('cards');
  const totalBalance = mockCards.reduce((sum, card) => sum + card.balance, 0);

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountPage />;
      default:
        return (
          <>
            <BalanceHeader totalBalance={totalBalance} percentageChange={2.60} />
            <div className="px-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium dark:text-white">
                  Credit Cards <span className="text-sm text-gray-400 dark:text-gray-500">({mockCards.length})</span>
                </h2>
                <button className="p-2 bg-teal-900 text-white rounded-full hover:bg-teal-800">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {mockCards.map((card) => (
                  <CreditCard
                    key={card.id}
                    balance={card.balance}
                    cardNumber={card.cardNumber}
                    cardHolder={card.cardHolder}
                    expiryDate={card.expiryDate}
                    variant={card.variant}
                  />
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 min-h-screen pb-20">
          <header className="flex justify-between items-center p-6">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <div className="w-6 h-4 flex flex-col justify-between">
                <div className="h-0.5 w-6 bg-gray-900 dark:bg-white"></div>
                <div className="h-0.5 w-4 bg-gray-900 dark:bg-white"></div>
              </div>
            </button>
            <h1 className="text-xl font-semibold dark:text-white">Wall8</h1>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Search className="w-6 h-6 dark:text-white" />
            </button>
          </header>

          {renderContent()}
          <NavigationTab activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Home;
