'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar, 
  MoreHorizontal,
  Star,
  TrendingUp,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import { CustomerCard } from "@/components/crm/customer-card"

// Mock data for demonstration
const contacts = [
  {
    id: '1',
    name: 'Tech Corporation',
    revenue: 125000,
    deals: 12,
    status: 'active' as const,
    lastContact: '2 days ago',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 123-4567',
  },
  {
    id: '2',
    name: 'Startup Solutions',
    revenue: 89000,
    deals: 8,
    status: 'active' as const,
    lastContact: '1 week ago',
    email: 'info@startupsolutions.com',
    phone: '+1 (555) 987-6543',
  },
  {
    id: '3',
    name: 'Digital Agency',
    revenue: 67000,
    deals: 6,
    status: 'pending' as const,
    lastContact: '3 days ago',
    email: 'hello@digitalagency.com',
    phone: '+1 (555) 456-7890',
  },
  {
    id: '4',
    name: 'Cloud Services',
    revenue: 45000,
    deals: 4,
    status: 'active' as const,
    lastContact: '5 days ago',
    email: 'support@cloudservices.com',
    phone: '+1 (555) 234-5678',
  },
  {
    id: '5',
    name: 'Marketing Pro',
    revenue: 34000,
    deals: 3,
    status: 'inactive' as const,
    lastContact: '2 weeks ago',
    email: 'team@marketingpro.com',
    phone: '+1 (555) 345-6789',
  },
  {
    id: '6',
    name: 'Data Analytics',
    revenue: 78000,
    deals: 7,
    status: 'active' as const,
    lastContact: '1 day ago',
    email: 'sales@dataanalytics.com',
    phone: '+1 (555) 678-9012',
  },
]

export default function ContactsPage() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('crm_user')
    if (!user) {
      router.push("/login")
    }
  }, [router])

  const stats = {
    totalContacts: contacts.length,
    activeContacts: contacts.filter(c => c.status === 'active').length,
    totalRevenue: contacts.reduce((sum, c) => sum + c.revenue, 0),
    avgDealsPerContact: Math.round(contacts.reduce((sum, c) => sum + c.deals, 0) / contacts.length),
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
                CONTACTS
              </h1>
              <p className="text-yellow-400/70 text-lg">
                Manage your customer relationships and track interactions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-400">
                  Total Contacts
                </CardTitle>
                <Users className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-yellow-400 mb-1">
                  {stats.totalContacts}
                </div>
                <div className="flex items-center text-xs text-yellow-400/70">
                  <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
                  <span className="text-green-400">12%</span> from last month
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-400">
                  Active Contacts
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-yellow-400 mb-1">
                  {stats.activeContacts}
                </div>
                <div className="flex items-center text-xs text-yellow-400/70">
                  <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
                  <span className="text-green-400">8%</span> from last month
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-400">
                  Total Revenue
                </CardTitle>
                <Star className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-yellow-400 mb-1">
                  ${(stats.totalRevenue / 1000).toFixed(0)}k
                </div>
                <div className="flex items-center text-xs text-yellow-400/70">
                  <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
                  <span className="text-green-400">23%</span> from last month
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-400">
                  Avg Deals/Contact
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-yellow-400 mb-1">
                  {stats.avgDealsPerContact}
                </div>
                <div className="flex items-center text-xs text-yellow-400/70">
                  <ArrowDown className="w-3 h-3 mr-1 text-red-400" />
                  <span className="text-red-400">3%</span> from last month
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
                placeholder="Search contacts..."
                className="pl-10 pr-4 py-2 bg-black/50 border border-yellow-500/30 rounded-lg text-yellow-400 placeholder-yellow-400/60 focus:outline-none focus:border-yellow-400/50 focus:bg-black/70 transition-all duration-200 w-full"
              />
            </div>
            <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              {stats.activeContacts} Active
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
              {contacts.filter(c => c.status === 'pending').length} Pending
            </Badge>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
              {contacts.filter(c => c.status === 'inactive').length} Inactive
            </Badge>
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <CustomerCard
              key={contact.id}
              id={contact.id}
              name={contact.name}
              revenue={contact.revenue}
              deals={contact.deals}
              status={contact.status}
              lastContact={contact.lastContact}
              email={contact.email}
              phone={contact.phone}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
            Load More Contacts
          </Button>
        </div>
      </div>
    </div>
  )
}
