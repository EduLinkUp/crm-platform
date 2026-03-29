'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

interface Deal {
  id: string;
  title: string;
  stage: string;
  value: number;
  probability: number;
  expectedCloseDate: string;
  contact: {
    firstName: string;
    lastName: string;
    company: string;
  };
  user: {
    name: string;
  };
}

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/deals');
      if (!response.ok) throw new Error('Failed to fetch deals');
      const data = await response.json();
      setDeals(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load deals');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate metrics
  const totalPipeline = deals.reduce((sum, deal) => sum + deal.value, 0);
  const totalDeals = deals.length;
  const avgDealSize = totalDeals > 0 ? totalPipeline / totalDeals : 0;

  // Group deals by stage for chart
  const pipelineByStage = [
    { stage: 'LEAD', deals: deals.filter(d => d.stage === 'LEAD').length, value: deals.filter(d => d.stage === 'LEAD').reduce((sum, d) => sum + d.value, 0) },
    { stage: 'PROSPECT', deals: deals.filter(d => d.stage === 'PROSPECT').length, value: deals.filter(d => d.stage === 'PROSPECT').reduce((sum, d) => sum + d.value, 0) },
    { stage: 'PROPOSAL', deals: deals.filter(d => d.stage === 'PROPOSAL').length, value: deals.filter(d => d.stage === 'PROPOSAL').reduce((sum, d) => sum + d.value, 0) },
    { stage: 'NEGOTIATION', deals: deals.filter(d => d.stage === 'NEGOTIATION').length, value: deals.filter(d => d.stage === 'NEGOTIATION').reduce((sum, d) => sum + d.value, 0) },
    { stage: 'CLOSED_WON', deals: deals.filter(d => d.stage === 'CLOSED_WON').length, value: deals.filter(d => d.stage === 'CLOSED_WON').reduce((sum, d) => sum + d.value, 0) },
  ];

  const dealData = deals.map(deal => ({
    name: deal.title,
    probability: deal.probability,
    value: deal.value,
  }));

  return (
    <div className="min-h-screen p-8" style={{background: 'linear-gradient(135deg, #0a0e27 0%, #1a0f3f 50%, #0a0e27 100%)'}}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-yellow-300 mb-2" style={{textShadow: '0 0 20px rgba(255, 255, 0, 0.6)'}}>
            SALES PIPELINE
          </h1>
          <p className="text-cyan-300">Track deals through every stage</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-cyan-300">Loading deals...</div>
          </div>
        ) : (
          <>
            {/* Pipeline Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-lg border border-yellow-500/50 bg-slate-900/50 backdrop-blur-sm transition hover:border-opacity-100" style={{boxShadow: '0 0 20px rgba(255, 255, 0, 0.3)'}}>
                <div className="text-center">
                  <p className="text-gray-400 text-sm uppercase mb-2">Total Pipeline Value</p>
                  <p className="text-3xl font-bold text-yellow-300">${(totalPipeline / 1000).toFixed(0)}K</p>
                </div>
              </div>
              <div className="p-6 rounded-lg border border-pink-500/50 bg-slate-900/50 backdrop-blur-sm transition hover:border-opacity-100" style={{boxShadow: '0 0 20px rgba(255, 0, 127, 0.3)'}}>
                <div className="text-center">
                  <p className="text-gray-400 text-sm uppercase mb-2">Total Deals</p>
                  <p className="text-3xl font-bold text-pink-300">{totalDeals}</p>
                </div>
              </div>
              <div className="p-6 rounded-lg border border-cyan-500/50 bg-slate-900/50 backdrop-blur-sm transition hover:border-opacity-100" style={{boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)'}}>
                <div className="text-center">
                  <p className="text-gray-400 text-sm uppercase mb-2">Avg Deal Size</p>
                  <p className="text-3xl font-bold text-cyan-300">${(avgDealSize / 1000).toFixed(0)}K</p>
                </div>
              </div>
            </div>

            {/* Pipeline by Stage */}
            <div className="p-6 rounded-lg border border-yellow-500/50 bg-slate-900/50 backdrop-blur-sm" style={{boxShadow: '0 0 20px rgba(255, 255, 0, 0.2)'}}>
              <h2 className="text-2xl font-bold text-yellow-300 mb-6 uppercase">Pipeline by Stage</h2>
              {pipelineByStage.some(s => s.deals > 0) ? (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={pipelineByStage}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2f4a" />
                    <XAxis dataKey="stage" stroke="#FFFF00" />
                    <YAxis stroke="#FFFF00" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0a0e27', border: '2px solid #FFFF00' }}
                      labelStyle={{ color: '#FFFF00' }}
                    />
                    <Legend />
                    <Bar dataKey="deals" fill="#FFFF00" name="Number of Deals" />
                    <Bar dataKey="value" fill="#FF0080" name="Value ($)" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-gray-400">No deals yet</div>
              )}
            </div>

            {/* Deal Analysis */}
            {dealData.length > 0 && (
              <div className="p-6 rounded-lg border border-pink-500/50 bg-slate-900/50 backdrop-blur-sm" style={{boxShadow: '0 0 20px rgba(255, 0, 127, 0.2)'}}>
                <h2 className="text-2xl font-bold text-pink-300 mb-6 uppercase">Deal Probability vs Value</h2>
                <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2f4a" />
                    <XAxis dataKey="probability" stroke="#FF0080" label={{ value: 'Probability (%)', position: 'insideBottom', offset: -10 }} />
                    <YAxis dataKey="value" stroke="#FF0080" label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0a0e27', border: '2px solid #FF0080' }}
                      labelStyle={{ color: '#FF0080' }}
                    />
                    <Scatter name="Deals" data={dealData} fill="#FF0080" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Detailed Deals List */}
            <div className="p-6 rounded-lg border border-cyan-500/50 bg-slate-900/50 backdrop-blur-sm overflow-auto" style={{boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)'}}>
              <h2 className="text-2xl font-bold text-cyan-300 mb-6 uppercase">All Deals ({deals.length})</h2>
              {deals.length === 0 ? (
                <div className="text-center py-8 text-gray-400">No deals yet. Create your first deal to get started.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-cyan-500/50">
                        <th className="px-4 py-3 text-left text-cyan-300 font-bold uppercase">Title</th>
                        <th className="px-4 py-3 text-left text-cyan-300 font-bold uppercase">Contact</th>
                        <th className="px-4 py-3 text-left text-cyan-300 font-bold uppercase">Stage</th>
                        <th className="px-4 py-3 text-right text-cyan-300 font-bold uppercase">Value</th>
                        <th className="px-4 py-3 text-center text-cyan-300 font-bold uppercase">Probability</th>
                        <th className="px-4 py-3 text-left text-cyan-300 font-bold uppercase">Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deals.map((deal) => (
                        <tr
                          key={deal.id}
                          className="border-b border-cyan-500/20 hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="px-4 py-3 font-semibold text-white">{deal.title}</td>
                          <td className="px-4 py-3 text-gray-400">
                            {deal.contact.firstName} {deal.contact.lastName}
                            <div className="text-xs text-gray-500">{deal.contact.company}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded text-xs font-bold uppercase border ${
                              deal.stage === 'CLOSED_WON'
                                ? 'bg-green-500/20 text-green-300 border-green-500/50'
                                : deal.stage === 'CLOSED_LOST'
                                ? 'bg-red-500/20 text-red-300 border-red-500/50'
                                : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                            }`}>
                              {deal.stage}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-cyan-300">${(deal.value / 1000).toFixed(0)}K</td>
                          <td className="px-4 py-3 text-center">
                            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full"
                                style={{ width: `${deal.probability}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-300 mt-1">{deal.probability}%</span>
                          </td>
                          <td className="px-4 py-3 text-gray-400">{deal.user.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
