'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  Users, 
  MoreHorizontal,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"

// Mock deals data
const deals = [
  {
    id: '1',
    title: 'Enterprise Software License',
    company: 'Tech Corporation',
    value: 125000,
    stage: 'closing',
    probability: 85,
    expectedClose: '2024-04-15',
    owner: 'John Smith',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Marketing Automation Platform',
    company: 'Startup Solutions',
    value: 89000,
    stage: 'proposal',
    probability: 60,
    expectedClose: '2024-04-20',
    owner: 'Sarah Johnson',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    title: 'Cloud Infrastructure Migration',
    company: 'Digital Agency',
    value: 67000,
    stage: 'discovery',
    probability: 25,
    expectedClose: '2024-05-01',
    owner: 'Mike Wilson',
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    title: 'Data Analytics Solution',
    company: 'Cloud Services',
    value: 45000,
    stage: 'negotiation',
    probability: 75,
    expectedClose: '2024-04-10',
    owner: 'Emily Davis',
    createdAt: '2024-02-10',
  },
  {
    id: '5',
    title: 'CRM Implementation',
    company: 'Marketing Pro',
    value: 34000,
    stage: 'qualification',
    probability: 40,
    expectedClose: '2024-04-25',
    owner: 'John Smith',
    createdAt: '2024-02-15',
  },
  {
    id: '6',
    title: 'E-commerce Platform',
    company: 'Data Analytics',
    value: 78000,
    stage: 'proposal',
    probability: 55,
    expectedClose: '2024-04-18',
    owner: 'Sarah Johnson',
    createdAt: '2024-02-20',
  },
]

const stageColors = {
  discovery: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  qualification: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  proposal: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  negotiation: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  closing: 'bg-green-500/20 text-green-400 border-green-500/50',
  won: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
  lost: 'bg-red-500/20 text-red-400 border-red-500/50',
}

const getProbabilityColor = (probability: number) => {
  if (probability >= 75) return 'text-green-400'
  if (probability >= 50) return 'text-yellow-400'
  if (probability >= 25) return 'text-orange-400'
  return 'text-red-400'
}

export default function DealsPage() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('crm_user')
    if (!user) {
      router.push("/login")
    }
  }, [router])

  const stats = {
    totalDeals: deals.length,
    totalValue: deals.reduce((sum, deal) => sum + deal.value, 0),
    avgProbability: Math.round(deals.reduce((sum, deal) => sum + deal.probability, 0) / deals.length),
    weightedValue: deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0),
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-6 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,215,0,0.08)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black text-yellow-400 mb-2 tracking-wider" 
                  style={{ textShadow: '0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)' }}>
                SALES PIPELINE
              </h1>
              <p className="text-yellow-400/70 text-lg">
                Track deals through your sales pipeline and forecast revenue
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
                <Plus className="w-4 h-4 mr-2" />
                Add Deal
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-400">
                  Total Deals
                </CardTitle>
                <Target className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-yellow-400 mb-1">
                  {stats.totalDeals}
                </div>
                <div className="flex items-center text-xs text-yellow-400/70">
                  <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
                  <span className="text-green-400">15%</span> from last month
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-400">
                  Pipeline Value
                </CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-yellow-400 mb-1">
                  ${(stats.totalValue / 1000).toFixed(0)}k
                </div>
                <div className="flex items-center text-xs text-yellow-400/70">
                  <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
                  <span className="text-green-400">28%</span> from last month
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-400">
                  Avg Probability
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-yellow-400 mb-1">
                  {stats.avgProbability}%
                </div>
                <div className="flex items-center text-xs text-yellow-400/70">
                  <ArrowDown className="w-3 h-3 mr-1 text-red-400" />
                  <span className="text-red-400">5%</span> from last month
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-400">
                  Weighted Value
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-yellow-400 mb-1">
                  ${(stats.weightedValue / 1000).toFixed(0)}k
                </div>
                <div className="flex items-center text-xs text-yellow-400/70">
                  <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
                  <span className="text-green-400">12%</span> from last month
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400/60" />
              <input
                type="text"
                placeholder="Search deals..."
                className="pl-10 pr-4 py-2 bg-black/50 border border-yellow-500/30 rounded-lg text-yellow-400 placeholder-yellow-400/60 focus:outline-none focus:border-yellow-400/50 focus:bg-black/70 transition-all duration-200 w-full"
              />
            </div>
            <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
              {deals.filter(d => d.stage === 'discovery').length} Discovery
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
              {deals.filter(d => d.stage === 'qualification').length} Qualification
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
              {deals.filter(d => d.stage === 'proposal').length} Proposal
            </Badge>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
              {deals.filter(d => d.stage === 'negotiation').length} Negotiation
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              {deals.filter(d => d.stage === 'closing').length} Closing
            </Badge>
          </div>
        </div>

        {/* Deals Table */}
        <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-yellow-400 font-bold">Pipeline Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-yellow-500/20">
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Deal</th>
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Company</th>
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Value</th>
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Stage</th>
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Probability</th>
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Expected Close</th>
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Owner</th>
                    <th className="text-left py-3 px-4 text-yellow-400/70 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal) => (
                    <tr key={deal.id} className="border-b border-yellow-500/10 hover:bg-yellow-500/5 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-yellow-400 font-medium">{deal.title}</p>
                          <p className="text-yellow-400/60 text-sm">Created {deal.createdAt}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-yellow-400">{deal.company}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-yellow-400 font-bold">${(deal.value / 1000).toFixed(0)}k</p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={stageColors[deal.stage as keyof typeof stageColors]}>
                          {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-yellow-500/20 rounded-full h-2 max-w-[100px]">
                            <div 
                              className={`h-2 rounded-full ${getProbabilityColor(deal.probability)}`}
                              style={{ width: `${deal.probability}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm ${getProbabilityColor(deal.probability)}`}>
                            {deal.probability}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center text-yellow-400/70">
                          <Calendar className="w-4 h-4 mr-1" />
                          {deal.expectedClose}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-yellow-400">{deal.owner}</p>
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
