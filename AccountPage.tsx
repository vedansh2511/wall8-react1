import React, { useState } from 'react';
import { Moon, Sun, LogOut, Trash2, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';
import { FeedbackForm } from './FeedbackForm';

export function AccountPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    console.log('Deleting account...');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold dark:text-white">Account Settings</h2>
        <p className="text-gray-500 dark:text-gray-400">Manage your account preferences</p>
      </div>

      {/* Email Display */}
      <div className="space-y-2">
        <label className="text-sm text-gray-500 dark:text-gray-400">Email Address</label>
        <p className="text-gray-900 dark:text-white">user@example.com</p>
      </div>

      {/* Settings List */}
      <div className="space-y-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="flex items-center space-x-3">
            {isDarkMode ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
            <span className="text-gray-700 dark:text-gray-200">Dark Mode</span>
          </div>
          <div className={`w-11 h-6 flex items-center rounded-full p-1 ${isDarkMode ? 'bg-teal-600' : 'bg-gray-300'}`}>
            <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${isDarkMode ? 'translate-x-5' : ''}`} />
          </div>
        </button>

        {/* Feedback Button */}
        <button
          onClick={() => setShowFeedbackForm(true)}
          className="w-full flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-200">Send Feedback</span>
        </button>

        {/* Delete Account Button */}
        <button
          onClick={handleDeleteAccount}
          className="w-full flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30"
        >
          <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-red-600 dark:text-red-400">Delete Account</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-200">Logout</span>
        </button>
      </div>

      {/* Feedback Form Modal */}
      {showFeedbackForm && <FeedbackForm onClose={() => setShowFeedbackForm(false)} />}
    </div>
  );
}