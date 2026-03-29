'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Users, BarChart3, Activity, AlertCircle } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  user: { name: string; email: string };
  createdAt: string;
}

interface AdminStats {
  totalUsers: number;
  totalContacts: number;
  totalDeals: number;
  totalActivities: number;
}

export default function AdminDashboardPage() {
  const [userRole, setUserRole] = useState<string>('');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role || '');

    // Check if user is admin
    if (role !== 'ADMIN') {
      setError('Access denied: Admin privileges required');
      setLoading(false);
      return;
    }

    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError('');

      const userId = localStorage.getItem('userId') || '';
      const userRole = localStorage.getItem('userRole') || '';
      const userEmail = localStorage.getItem('userEmail') || '';
      const userName = localStorage.getItem('userName') || '';

      const headers = {
        'x-user-id': userId,
        'x-user-role': userRole,
        'x-user-email': userEmail,
        'x-user-name': userName,
      };

      // Fetch audit logs
      const auditResponse = await fetch('/api/audit-logs?limit=10', {
        headers,
      });

      if (auditResponse.ok) {
        const auditData = await auditResponse.json();
        setAuditLogs(auditData.data || []);
      }

      // Fetch basic stats
      const contactsResponse = await fetch('/api/contacts');
      const dealsResponse = await fetch('/api/deals');

      const contactsData = await contactsResponse.json();
      const dealsData = await dealsResponse.json();

      setStats({
        totalUsers: 1, // Would need dedicated endpoint
        totalContacts: contactsData.data?.length || 0,
        totalDeals: dealsData.data?.length || 0,
        totalActivities: 0, // Would need dedicated endpoint
      });
    } catch (err) {
      setError('Failed to load admin data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (userRole !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8 flex items-center justify-center">
        <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-8 max-w-md text-center">
          <AlertCircle className="text-red-400 mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold text-red-300 mb-2">Access Denied</h1>
          <p className="text-red-200">Admin privileges required to access this page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="text-cyan-400" size={32} />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-400">System administration and audit logs</p>
        </div>

        {error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <p className="text-cyan-400">Loading admin data...</p>
          </div>
        ) : stats ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 bg-opacity-10 border border-blue-500 rounded-lg p-6">
                <Users className="text-blue-400 mb-2" size={24} />
                <p className="text-gray-300 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-blue-400">{stats.totalUsers}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-700 bg-opacity-10 border border-green-500 rounded-lg p-6">
                <BarChart3 className="text-green-400 mb-2" size={24} />
                <p className="text-gray-300 text-sm">Total Contacts</p>
                <p className="text-2xl font-bold text-green-400">{stats.totalContacts}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-700 bg-opacity-10 border border-purple-500 rounded-lg p-6">
                <BarChart3 className="text-purple-400 mb-2" size={24} />
                <p className="text-gray-300 text-sm">Total Deals</p>
                <p className="text-2xl font-bold text-purple-400">{stats.totalDeals}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-700 bg-opacity-10 border border-orange-500 rounded-lg p-6">
                <Activity className="text-orange-400 mb-2" size={24} />
                <p className="text-gray-300 text-sm">Total Activities</p>
                <p className="text-2xl font-bold text-orange-400">{stats.totalActivities}</p>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Recent Audit Logs</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-cyan-400">User</th>
                      <th className="text-left py-3 px-4 text-cyan-400">Action</th>
                      <th className="text-left py-3 px-4 text-cyan-400">Entity</th>
                      <th className="text-left py-3 px-4 text-cyan-400">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.length > 0 ? (
                      auditLogs.map((log) => (
                        <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700 hover:bg-opacity-30">
                          <td className="py-3 px-4 text-gray-300">{log.user.name}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-cyan-500 bg-opacity-20 text-cyan-300 rounded text-xs">
                              {log.action}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {log.entityType} ({log.entityId.slice(0, 8)})
                          </td>
                          <td className="py-3 px-4 text-gray-400">
                            {new Date(log.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-gray-400">
                          No audit logs yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
