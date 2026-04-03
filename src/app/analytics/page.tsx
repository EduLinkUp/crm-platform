'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ModernNavigation } from "@/components/crm/navigation"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Calendar,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Download,
  Filter
} from "lucide-react"

// Mock analytics data
const analyticsData = {
  overview: {
    totalRevenue: 2450000,
    revenueGrowth: 23.5,
    totalDeals: 156,
    dealsGrowth: 18.2,
    conversionRate: 24.8,
    conversionGrowth: 5.3,
    activeContacts: 3420,
    contactsGrowth: 12.7,
    customerSatisfaction: 87.3,
    satisfactionGrowth: 3.2,
  },
  monthlyRevenue: [
    { month: 'Jan', revenue: 180000 },
    { month: 'Feb', revenue: 195000 },
    { month: 'Mar', revenue: 210000 },
    { month: 'Apr', revenue: 225000 },
    { month: 'May', revenue: 240000 },
    { month: 'Jun', revenue: 255000 },
  ],
  topPerformers: [
    { name: 'Sarah Johnson', deals: 24, revenue: 450000, conversion: 28.5 },
    { name: 'Mike Wilson', deals: 18, revenue: 320000, conversion: 22.3 },
    { name: 'Emily Davis', deals: 15, revenue: 280000, conversion: 31.2 },
    { name: 'John Smith', deals: 12, revenue: 195000, conversion: 19.8 },
  ],
  dealStages: [
    { stage: 'Discovery', count: 45, value: 680000 },
    { stage: 'Qualification', count: 32, value: 480000 },
    { stage: 'Proposal', count: 28, value: 520000 },
    { stage: 'Negotiation', count: 18, value: 340000 },
    { stage: 'Closing', count: 12, value: 280000 },
  ],
}

export default function AnalyticsPage() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('crm_user')
    if (!user) {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ModernNavigation />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black text-yellow-400 mb-2 tracking-wider" 
                  style={{ textShadow: '0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)' }}>
                ANALYTICS
              </h1>
              <p className="text-yellow-400/70 text-lg">
                Comprehensive insights into your CRM performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-yellow-400 mb-1">
                ${(analyticsData.overview.totalRevenue / 1000000).toFixed(2)}M
              </div>
              <div className="flex items-center text-xs text-yellow-400/70">
                <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
                <span className="text-green-400">+{analyticsData.overview.revenueGrowth}%</span> from last period
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">
                Total Deals
              </CardTitle>
              <Target className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-yellow-400 mb-1">
                {analyticsData.overview.totalDeals}
              </div>
              <div className="flex items-center text-xs text-yellow-400/70">
                <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
                <span className="text-green-400">+{analyticsData.overview.dealsGrowth}%</span> from last period
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">
                Conversion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-yellow-400 mb-1">
                {analyticsData.overview.conversionRate}%
              </div>
              <div className="flex items-center text-xs text-yellow-400/70">
                <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
                <span className="text-green-400">+{analyticsData.overview.conversionGrowth}%</span> from last period
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">
                Customer Satisfaction
              </CardTitle>
              <Users className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-yellow-400 mb-1">
                {analyticsData.overview.customerSatisfaction}%
              </div>
              <div className="flex items-center text-xs text-yellow-400/70">
                <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
                <span className="text-green-400">+{analyticsData.overview.satisfactionGrowth}%</span> from last period
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-yellow-400 font-bold">Monthly Revenue</CardTitle>
              <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.monthlyRevenue.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-yellow-400/70">{month.month}</span>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-yellow-500/20 rounded-full h-2">
                        <div 
                          className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                          style={{ width: `${(month.revenue / 255000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-yellow-400 font-bold">
                        ${(month.revenue / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deal Stages */}
          <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-yellow-400 font-bold">Pipeline by Stage</CardTitle>
              <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.dealStages.map((stage) => (
                  <div key={stage.stage} className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-400 font-medium">{stage.stage}</p>
                      <p className="text-yellow-400/60 text-sm">{stage.count} deals</p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-bold">
                        ${(stage.value / 1000).toFixed(0)}k
                      </p>
                      <p className="text-yellow-400/60 text-sm">pipeline value</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-yellow-400 font-bold">Top Performers</CardTitle>
            <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-yellow-500/20">
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Deals</th>
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Revenue</th>
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Conversion</th>
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.topPerformers.map((performer, index) => (
                    <tr key={performer.name} className="border-b border-yellow-500/10 hover:bg-yellow-500/5 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                            <span className="text-black font-bold text-sm">
                              {performer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <span className="text-yellow-400">{performer.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-yellow-400 font-bold">{performer.deals}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-yellow-400 font-bold">
                          ${(performer.revenue / 1000).toFixed(0)}k
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-yellow-500/20 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                performer.conversion >= 25 ? 'bg-green-400' :
                                performer.conversion >= 20 ? 'bg-yellow-400' :
                                'bg-orange-400'
                              }`}
                              style={{ width: `${performer.conversion * 3}%` }}
                            ></div>
                          </div>
                          <span className="text-yellow-400 text-sm">{performer.conversion}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
