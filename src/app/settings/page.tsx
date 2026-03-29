'use client';

import React, { useState } from 'react';
import { Settings, User, Bell, Lock, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="text-cyan-400" size={32} />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600">
              Settings
            </h1>
          </div>
          <p className="text-gray-400">Manage your CRM preferences and account</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'profile'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <User className="inline mr-2" size={18} />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'notifications'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Bell className="inline mr-2" size={18} />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'security'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Lock className="inline mr-2" size={18} />
            Security
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Profile Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={typeof window !== 'undefined' ? localStorage.getItem('userName') || '' : ''}
                  disabled
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={typeof window !== 'undefined' ? localStorage.getItem('userEmail') || '' : ''}
                  disabled
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Role</label>
                <input
                  type="text"
                  defaultValue={typeof window !== 'undefined' ? localStorage.getItem('userRole') || '' : ''}
                  disabled
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300 disabled:opacity-50"
                />
              </div>

              <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded p-4 mt-6">
                <p className="text-blue-300 text-sm">💡 Profile information is managed through your account. Contact administrator to make changes.</p>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Notification Preferences</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 hover:bg-gray-700 rounded cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <div>
                  <p className="text-gray-200 font-medium">Deal Updates</p>
                  <p className="text-gray-400 text-sm">Get notified when deals move to new stages</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 hover:bg-gray-700 rounded cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <div>
                  <p className="text-gray-200 font-medium">New Contacts</p>
                  <p className="text-gray-400 text-sm">Get notified when new contacts are added</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 hover:bg-gray-700 rounded cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <div>
                  <p className="text-gray-200 font-medium">Daily Summary</p>
                  <p className="text-gray-400 text-sm">Receive a daily summary of your activities</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Security Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-3">Change Password</h3>
                <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-200 transition">
                  Update Password
                </button>
              </div>

              <hr className="border-gray-700" />

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-3">Two-Factor Authentication</h3>
                <p className="text-gray-400 mb-3">Add an extra layer of security to your account</p>
                <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded text-white transition font-medium">
                  Enable 2FA
                </button>
              </div>

              <hr className="border-gray-700" />

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-3">Session Management</h3>
                <p className="text-gray-400 mb-3">You are currently logged in. Click below to logout.</p>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded text-white transition font-medium flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
