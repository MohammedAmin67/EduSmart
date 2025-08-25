import React, { useState } from "react";

const SettingsPanel = () => {
  // Example state for notifications toggle
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
      
      {/* User Preferences */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Preferences</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700">Enable Notifications</span>
          {/* Improved toggle switch */}
          <button
            type="button"
            aria-pressed={notifications}
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${notifications ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${notifications ? "translate-x-7" : "translate-x-1"}`}
            />
          </button>
        </div>
      </div>

      {/* Account Management */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Account</h3>
        <button
          className="bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-2 rounded-lg shadow hover:from-red-500 hover:to-red-700 hover:shadow-lg transition-all duration-150 font-semibold tracking-wide flex items-center gap-2 active:scale-95 outline-none focus:ring-2 focus:ring-red-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;