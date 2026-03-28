import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  Users, 
  TrendingUp, 
  CreditCard, 
  Activity,
  AlertTriangle,
  Rocket,
  Shield
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dashboard - NeonFlow",
  description: "Your SaaS analytics dashboard",
}

async function getDashboardData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      organizationUsers: {
        include: {
          organization: true,
        },
      },
      subscriptions: {
        where: {
          status: "ACTIVE",
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      usageRecords: {
        where: {
          periodStart: {
            gte: new Date(new Date().setDate(new Date().getDate() - 30)),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 100,
      },
    },
  })

  if (!user) {
    redirect("/auth/signin")
  }

  const organizations = user.organizationUsers.map((ou: any) => ou.organization)
  const subscription = user.subscriptions[0]
  
  // Calculate usage metrics
  const totalApiCalls = user.usageRecords
    .filter((record: any) => record.metric === "api_calls")
    .reduce((sum: number, record: any) => sum + record.quantity, 0)
    
  const totalStorage = user.usageRecords
    .filter((record: any) => record.metric === "storage")
    .reduce((sum: number, record: any) => sum + record.quantity, 0)

  return {
    user,
    organizations,
    subscription,
    metrics: {
      totalApiCalls,
      totalStorage,
      organizationCount: organizations.length,
    },
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const data = await getDashboardData(session.user.id)

  return (
    <div className="min-h-screen bg-cyber-black text-neon-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-yellow mb-2 glitch" data-text="DASHBOARD">
            DASHBOARD
          </h1>
          <p className="text-neon-yellow/70">
            Welcome back, {data.user.name || data.user.email}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-neon-yellow shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neon-yellow">
                Organizations
              </CardTitle>
              <Users className="h-4 w-4 text-neon-yellow animate-neon-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-yellow">
                {data.metrics.organizationCount}
              </div>
              <p className="text-xs text-neon-yellow/70 mt-1">
                Active workspaces
              </p>
            </CardContent>
          </Card>

          <Card className="border-neon-yellow shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neon-yellow">
                API Calls
              </CardTitle>
              <Activity className="h-4 w-4 text-neon-yellow animate-neon-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-yellow">
                {data.metrics.totalApiCalls.toLocaleString()}
              </div>
              <p className="text-xs text-neon-yellow/70 mt-1">
                Last 30 days
              </p>
            </CardContent>
          </Card>

          <Card className="border-neon-yellow shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neon-yellow">
                Storage Used
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-neon-yellow animate-neon-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-yellow">
                {(data.metrics.totalStorage / 1024).toFixed(1)} MB
              </div>
              <p className="text-xs text-neon-yellow/70 mt-1">
                Total usage
              </p>
            </CardContent>
          </Card>

          <Card className="border-neon-yellow shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neon-yellow">
                Subscription
              </CardTitle>
              <CreditCard className="h-4 w-4 text-neon-yellow animate-neon-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-yellow">
                {data.subscription?.tier || "FREE"}
              </div>
              <p className="text-xs text-neon-yellow/70 mt-1">
                Current plan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Organizations */}
          <Card className="lg:col-span-2 border-neon-yellow shadow-cyber-border">
            <CardHeader>
              <CardTitle className="text-neon-yellow flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Your Organizations
              </CardTitle>
              <CardDescription className="text-neon-yellow/70">
                Manage your workspaces and team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data.organizations.length > 0 ? (
                <div className="space-y-4">
                  {data.organizations.map((org: any) => (
                    <div
                      key={org.id}
                      className="flex items-center justify-between p-4 border border-neon-yellow/20 rounded-lg hover:border-neon-yellow transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-neon-yellow to-neon-red flex items-center justify-center">
                          <Rocket className="h-5 w-5 text-cyber-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neon-yellow">{org.name}</h3>
                          <p className="text-sm text-neon-yellow/70">{org.slug}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-neon-yellow border-neon-yellow hover:bg-neon-yellow hover:text-cyber-black">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-neon-yellow/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neon-yellow mb-2">
                    No Organizations Yet
                  </h3>
                  <p className="text-neon-yellow/70 mb-4">
                    Create your first organization to start collaborating with your team.
                  </p>
                  <Link href="/organizations/new">
                    <Button variant="neon" className="bg-gradient-to-r from-neon-yellow to-neon-red">
                      Create Organization
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subscription Status */}
          <Card className="border-neon-yellow shadow-cyber-border">
            <CardHeader>
              <CardTitle className="text-neon-yellow flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Subscription Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.subscription ? (
                <>
                  <div className="text-center">
                    <Badge variant="neon" className="mb-2">
                      {data.subscription.tier}
                    </Badge>
                    <p className="text-sm text-neon-yellow/70">
                      Active since {new Date(data.subscription.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neon-yellow/70">Status</span>
                      <Badge variant="success" className="text-xs">ACTIVE</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neon-yellow/70">Renews</span>
                      <span className="text-neon-yellow">
                        {new Date(data.subscription.currentPeriodEnd).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <Link href="/billing">
                    <Button variant="outline" className="w-full text-neon-yellow border-neon-yellow hover:bg-neon-yellow hover:text-cyber-black">
                      Manage Subscription
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="text-center">
                  <AlertTriangle className="h-12 w-12 text-neon-yellow/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neon-yellow mb-2">
                    No Active Subscription
                  </h3>
                  <p className="text-neon-yellow/70 mb-4">
                    Upgrade to unlock premium features and increase your limits.
                  </p>
                  <Link href="/billing">
                    <Button variant="neon" className="bg-gradient-to-r from-neon-yellow to-neon-red">
                      Upgrade Now
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
