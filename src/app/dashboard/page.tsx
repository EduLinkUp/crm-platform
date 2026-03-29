'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, ShoppingCart, Target } from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  probability: number;
}

interface StageData {
  name: string;
  Deals: number;
  Value: number;
}

interface ScatterDataPoint {
  x: number;
  y: number;
  name: string;
}

interface Metrics {
  totalContacts: number;
  activeDeals: number;
  monthlyRevenue: number;
  conversionRate: number;
  dealsByStage: StageData[];
  scatterData: ScatterDataPoint[];
}

async function fetchMetrics(): Promise<Metrics> {
  const [contactsRes, dealsRes] = await Promise.all([
    fetch('/api/contacts'),
    fetch('/api/deals')
  ]);

  const contactsData = await contactsRes.json();
  const dealsData = await dealsRes.json();

  const contacts = contactsData.data || [];
  const deals = dealsData.data || [];

  const totalContacts = contacts.length;
  const activeDeals = deals.filter((d: Deal) => d.stage !== 'CLOSED_LOST').length;
  const monthlyRevenue = deals
    .filter((d: Deal) => d.stage === 'CLOSED_WON')
    .reduce((sum: number, d: Deal) => sum + d.value, 0);

  const totalLeads = deals.filter((d: Deal) => d.stage === 'LEAD').length;
  const closedDeals = deals.filter((d: Deal) => d.stage === 'CLOSED_WON').length;
  const conversionRate = totalLeads > 0 ? (closedDeals / totalLeads) * 100 : 0;

  const stageMap: Record<string, { count: number; value: number }> = {};
  deals.forEach((deal: Deal) => {
    if (!stageMap[deal.stage]) {
      stageMap[deal.stage] = { count: 0, value: 0 };
    }
    stageMap[deal.stage].count += 1;
    stageMap[deal.stage].value += deal.value;
  });

  const dealsByStage = Object.entries(stageMap).map(([stage, data]) => ({
    name: stage.replace(/_/g, ' '),
    Deals: data.count,
    Value: data.value
  }));

  const scatterData = deals.map((deal: Deal) => ({
    x: deal.probability,
    y: deal.value,
    name: deal.title
  }));

  return {
    totalContacts,
    activeDeals,
    monthlyRevenue,
    conversionRate,
    dealsByStage,
    scatterData
  };
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMetrics();
        setMetrics(data);
      } catch {
        setError('Failed to load dashboard metrics');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-cyan-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="text-center">
          <p className="text-red-400">{error || 'Failed to load metrics'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Real-time CRM analytics and metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Contacts */}
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-6 backdrop-blur-sm hover:border-opacity-60 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Total Contacts</p>
                <p className="text-3xl font-bold text-yellow-400 mt-2">{metrics.totalContacts}</p>
              </div>
              <Users className="text-yellow-400 opacity-50" size={32} />
            </div>
          </div>

          {/* Active Deals */}
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 bg-opacity-10 border border-pink-500 border-opacity-30 rounded-lg p-6 backdrop-blur-sm hover:border-opacity-60 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Active Deals</p>
                <p className="text-3xl font-bold text-pink-400 mt-2">{metrics.activeDeals}</p>
              </div>
              <ShoppingCart className="text-pink-400 opacity-50" size={32} />
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 bg-opacity-10 border border-cyan-500 border-opacity-30 rounded-lg p-6 backdrop-blur-sm hover:border-opacity-60 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Monthly Revenue</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">${(metrics.monthlyRevenue / 1000).toFixed(1)}K</p>
              </div>
              <TrendingUp className="text-cyan-400 opacity-50" size={32} />
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-500 bg-opacity-10 border border-purple-500 border-opacity-30 rounded-lg p-6 backdrop-blur-sm hover:border-opacity-60 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Conversion Rate</p>
                <p className="text-3xl font-bold text-purple-400 mt-2">{metrics.conversionRate.toFixed(1)}%</p>
              </div>
              <Target className="text-purple-400 opacity-50" size={32} />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pipeline by Stage */}
          <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-cyan-400 mb-4">Pipeline by Stage</h2>
            {metrics.dealsByStage.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics.dealsByStage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(51, 211, 153, 0.3)',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#06b6d4' }}
                  />
                  <Legend />
                  <Bar dataKey="Deals" fill="#fbbf24" opacity={0.8} />
                  <Bar dataKey="Value" fill="#ec4899" opacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">No deals data available</p>
            )}
          </div>

          {/* Deal Probability vs Value */}
          <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-cyan-400 mb-4">Deal Probability vs Value</h2>
            {metrics.scatterData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="x" name="Probability" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <YAxis dataKey="y" name="Value" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(51, 211, 153, 0.3)',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#06b6d4' }}
                  />
                  <Scatter name="Deals" data={metrics.scatterData} fill="#ec4899" />
                </ScatterChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">No deals data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
