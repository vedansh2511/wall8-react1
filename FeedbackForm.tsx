import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FeedbackFormProps {
  onClose: () => void;
}

export function FeedbackForm({ onClose }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission here
    console.log('Feedback submitted:', feedback);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Send Feedback</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Tell us what you think..."
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}