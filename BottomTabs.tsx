// import { Link } from "react-router-dom";
// import { HomeIcon, CreditCardIcon, StarIcon, UserIcon } from "lucide-react"; // Adjust based on the icon library you're using

// const BottomTabs = () => {
//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10 p-4 flex justify-between items-center">
//       <Link to="/dashboard" className="flex flex-col items-center">
//         <HomeIcon className="h-6 w-6 text-primary" />
//         <span className="text-sm">Dashboard</span>
//       </Link>
//       <Link to="/my-cards" className="flex flex-col items-center">
//         <CreditCardIcon className="h-6 w-6 text-primary" />
//         <span className="text-sm">My Cards</span>
//       </Link>
//       <Link to="/best-card" className="flex flex-col items-center">
//         <StarIcon className="h-6 w-6 text-primary" />
//         <span className="text-sm">Best Card</span>
//       </Link>
//       <Link to="/account" className="flex flex-col items-center">
//         <UserIcon className="h-6 w-6 text-primary" />
//         <span className="text-sm">Account</span>
//       </Link>
//     </div>
//   );
// };

// export default BottomTabs;

import { CreditCard, BarChart2, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NavigationTab({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'home', icon: BarChart2, label: 'Dashboard' },
    { id: 'cards', icon: CreditCard, label: 'My Cards' },
    { id: 'bestCard', icon: CreditCard, label: 'Best Card' },
    { id: 'account', icon: User, label: 'Account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-6 py-2">
        <div className="flex justify-between items-center">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center p-2 ${
                activeTab === id ? 'text-teal-600' : 'text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
