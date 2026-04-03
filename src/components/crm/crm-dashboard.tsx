import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Calendar, 
  Phone, 
  Mail,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from "lucide-react"

interface CRMDashboardProps {
  className?: string
}

export function CRMDashboard({ className }: CRMDashboardProps) {
  const stats = {
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
  }

  const recentActivities = [
    { id: '1', type: 'deal', title: 'Deal closed with Tech Corp', time: '2 hours ago', status: 'completed' },
    { id: '2', type: 'contact', title: 'New contact added: Sarah Johnson', time: '4 hours ago', status: 'new' },
    { id: '3', type: 'meeting', title: 'Meeting scheduled with ABC Inc', time: '6 hours ago', status: 'scheduled' },
    { id: '4', type: 'email', title: 'Campaign sent to 500 contacts', time: '1 day ago', status: 'sent' },
    { id: '5', type: 'task', title: 'Follow-up task completed', time: '2 days ago', status: 'completed' },
  ]

  const topCustomers = [
    { id: '1', name: 'Tech Corporation', revenue: 125000, deals: 12, status: 'active' },
    { id: '2', name: 'Startup Solutions', revenue: 89000, deals: 8, status: 'active' },
    { id: '3', name: 'Digital Agency', revenue: 67000, deals: 6, status: 'pending' },
    { id: '4', name: 'Cloud Services', revenue: 45000, deals: 4, status: 'active' },
  ]

  const upcomingEvents = [
    { id: '1', title: 'Sales Team Meeting', time: 'Today, 2:00 PM', type: 'meeting' },
    { id: '2', title: 'Client Call - Tech Corp', time: 'Tomorrow, 10:00 AM', type: 'call' },
    { id: '3', title: 'Product Demo', time: 'Tomorrow, 2:00 PM', type: 'demo' },
    { id: '4', title: 'Q2 Review', time: 'Friday, 3:00 PM', type: 'review' },
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-400">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-yellow-400 mb-1">
              ${(stats.totalRevenue / 1000000).toFixed(2)}M
            </div>
            <div className="flex items-center text-xs text-yellow-400/70">
              <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
              <span className="text-green-400">+{stats.revenueGrowth}%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-400">
              Active Deals
            </CardTitle>
            <Target className="h-4 w-4 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-yellow-400 mb-1">
              {stats.totalDeals}
            </div>
            <div className="flex items-center text-xs text-yellow-400/70">
              <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
              <span className="text-green-400">+{stats.dealsGrowth}%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-400">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-yellow-400 mb-1">
              {stats.conversionRate}%
            </div>
            <div className="flex items-center text-xs text-yellow-400/70">
              <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
              <span className="text-green-400">+{stats.conversionGrowth}%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-400">
              Active Contacts
            </CardTitle>
            <Users className="h-4 w-4 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-yellow-400 mb-1">
              {stats.activeContacts.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-yellow-400/70">
              <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
              <span className="text-green-400">+{stats.contactsGrowth}%</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-yellow-400 font-bold flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Activities
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border border-yellow-500/20 hover:border-yellow-400/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-400' :
                      activity.status === 'new' ? 'bg-blue-400' :
                      activity.status === 'scheduled' ? 'bg-purple-400' :
                      activity.status === 'sent' ? 'bg-cyan-400' :
                      'bg-gray-400'
                    } animate-pulse`}></div>
                    <div>
                      <p className="text-yellow-400 font-medium">{activity.title}</p>
                      <p className="text-yellow-400/60 text-sm">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-yellow-400 font-bold flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Events
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border border-yellow-500/20 hover:border-yellow-400/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      event.type === 'meeting' ? 'bg-purple-400' :
                      event.type === 'call' ? 'bg-orange-400' :
                      event.type === 'demo' ? 'bg-blue-400' :
                      'bg-gray-400'
                    }`}></div>
                    <div>
                      <p className="text-yellow-400 font-medium">{event.title}</p>
                      <p className="text-yellow-400/60 text-sm">{event.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-yellow-400 font-bold flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Top Customers
          </CardTitle>
          <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topCustomers.map((customer) => (
              <div key={customer.id} className="p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-400/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">
                    {customer.name}
                  </h3>
                  <Badge className={`${
                    customer.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                    'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                  }`}>
                    {customer.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-400/70">Revenue</span>
                    <span className="text-yellow-400 font-bold">${(customer.revenue / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-400/70">Deals</span>
                    <span className="text-yellow-400 font-bold">{customer.deals}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
