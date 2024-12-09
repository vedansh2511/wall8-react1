import { useState } from 'react'
import { Search, Plus, Home, CreditCardIcon, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountPage } from './AccountPage'

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
]

function BalanceHeader({ totalBalance, percentageChange }: { totalBalance: number; percentageChange: number }) {
  return (
    <div className="bg-gradient-to-br from-primary to-primary-foreground text-primary-foreground p-6 rounded-b-3xl mb-6">
      <h2 className="text-lg font-medium mb-2">Total Balance</h2>
      <div className="text-4xl font-bold mb-2">${totalBalance.toLocaleString()}</div>
      <div className={`text-sm ${percentageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {percentageChange >= 0 ? '↑' : '↓'} {Math.abs(percentageChange)}% this month
      </div>
    </div>
  )
}

function CreditCard({ balance, cardNumber, cardHolder, expiryDate, variant }: {
  balance: number;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  variant: 'dark' | 'light' | 'accent';
}) {
  const bgColor = variant === 'dark' ? 'bg-gray-800' : variant === 'light' ? 'bg-gray-100' : 'bg-primary'
  const textColor = variant === 'light' ? 'text-gray-800' : 'text-white'

  return (
    <Card className={`${bgColor} ${textColor} overflow-hidden`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm opacity-80">Current Balance</p>
            <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
          </div>
          <CreditCardIcon className="w-8 h-8" />
        </div>
        <div className="mb-6">
          <p className="text-lg tracking-wider">{cardNumber.replace(/(\d{4})/g, '$1 ').trim()}</p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs opacity-80">Card Holder</p>
            <p className="font-medium">{cardHolder}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">Expires</p>
            <p className="font-medium">{expiryDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


export function HomePageComponent() {
  const [activeTab, setActiveTab] = useState('cards')
  const totalBalance = mockCards.reduce((sum, card) => sum + card.balance, 0)

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountPage />
      default:
        return (
          <>
            <BalanceHeader totalBalance={totalBalance} percentageChange={2.60} />
            <div className="px-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">
                  Credit Cards <span className="text-sm text-muted-foreground">({mockCards.length})</span>
                </h2>
                <Button size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
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
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background min-h-screen pb-20">
        <header className="flex justify-between items-center p-6 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <Button variant="ghost" size="icon">
            <div className="w-6 h-4 flex flex-col justify-between">
              <div className="h-0.5 w-6 bg-foreground"></div>
              <div className="h-0.5 w-4 bg-foreground"></div>
            </div>
          </Button>
          <h1 className="text-xl font-semibold">Wall8</h1>
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
        </header>

        {renderContent()}

        <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="home">
                <Home className="w-5 h-5" />
              </TabsTrigger>
              <TabsTrigger value="cards">
                <CreditCardIcon className="w-5 h-5" />
              </TabsTrigger>
              <TabsTrigger value="account">
                <User className="w-5 h-5" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  )
}