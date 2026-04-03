import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { ModernNavigation } from "@/components/crm/navigation"
import { DashboardClient } from "@/components/dashboard-client"

export const metadata: Metadata = {
  title: "Dashboard - NeonFlow CRM",
  description: "Professional CRM Dashboard",
}

// Mock data for dashboard
const getDashboardData = async (userId: string) => {
  const user = {
    id: userId,
    email: 'admin@neonflow.com',
    name: 'Demo Admin',
  }

  const metrics = {
    organizationCount: 12,
    totalApiCalls: 45678,
    storageUsed: 234,
    totalRevenue: 245000,
    activeUsers: 890,
    conversionRate: 24.8,
    customerSatisfaction: 87.3,
    dealsInPipeline: 45,
  }

  // Recent activities for CRM
  const recentActivities = [
    { id: '1', type: 'lead', title: 'New lead from Tech Corp', time: '2 hours ago', status: 'new' },
    { id: '2', type: 'deal', title: 'Deal closed with StartupX', time: '4 hours ago', status: 'won' },
    { id: '3', type: 'contact', title: 'Contact updated: John Doe', time: '6 hours ago', status: 'updated' },
    { id: '4', type: 'meeting', title: 'Meeting scheduled with ABC Inc', time: '1 day ago', status: 'scheduled' },
    { id: '5', type: 'email', title: 'Campaign sent to 500 contacts', time: '2 days ago', status: 'sent' },
  ]

  // Top customers
  const topCustomers = [
    { id: '1', name: 'Tech Corporation', revenue: 125000, deals: 12, status: 'active' },
    { id: '2', name: 'Startup Solutions', revenue: 89000, deals: 8, status: 'active' },
    { id: '3', name: 'Digital Agency', revenue: 67000, deals: 6, status: 'pending' },
    { id: '4', name: 'Cloud Services', revenue: 45000, deals: 4, status: 'active' },
  ]

  return {
    user,
    metrics,
    recentActivities,
    topCustomers,
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login")
  }

  const data = await getDashboardData(session.user.id)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ModernNavigation />
      <DashboardClient data={data} />
    </div>
  )
}
