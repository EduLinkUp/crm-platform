import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  Rocket, 
  Shield, 
  Users, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  Target,
  BarChart3,
  Star,
  Clock,
  DollarSign,
  Calendar,
  Activity,
  Settings,
  Search,
  Bell,
  Filter
} from "lucide-react"

export default function CRMShowcase() {
  return (
    <div className="min-h-screen bg-black text-yellow-400">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,215,0,0.08)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 mb-6 text-sm">
              <Rocket className="h-3 w-3 mr-1" />
              ENTERPRISE CRM SOLUTION
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-wider" 
                style={{ textShadow: '0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)' }}>
              NEONFLOW CRM
            </h1>
            <p className="text-xl md:text-2xl text-yellow-400/70 mb-8 max-w-3xl mx-auto">
              Transform your business with our cutting-edge CRM platform. 
              Complete customer relationship management with advanced analytics and automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signin">
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 text-lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
              </Link>
              <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 px-8 py-3 text-lg">
                <Shield className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CRM Features Overview */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4" 
                style={{ textShadow: '0 0 20px rgba(255,215,0,0.5)' }}>
              Complete CRM Solution
            </h2>
            <p className="text-xl text-yellow-400/70 max-w-2xl mx-auto">
              Everything you need to manage customer relationships, track sales, and grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-yellow-400 text-xl">Contact Management</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-yellow-400/70 mb-4">
                  Organize and manage all your contacts with advanced filtering and search capabilities.
                </p>
                <ul className="text-left space-y-2 text-yellow-400/60 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Unlimited contacts</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Custom fields</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Import/Export</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Contact history</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-yellow-400 text-xl">Sales Pipeline</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-yellow-400/70 mb-4">
                  Track deals through your sales pipeline with visual boards and automated workflows.
                </p>
                <ul className="text-left space-y-2 text-yellow-400/60 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Kanban boards</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Deal tracking</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Revenue forecasting</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Stage automation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-yellow-400 text-xl">Analytics</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-yellow-400/70 mb-4">
                  Get insights into your business performance with comprehensive analytics and reporting.
                </p>
                <ul className="text-left space-y-2 text-yellow-400/60 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Real-time dashboards</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Custom reports</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Data export</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Performance metrics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-yellow-400 text-xl">Email Marketing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-yellow-400/70 mb-4">
                  Create and send targeted email campaigns with built-in templates and automation.
                </p>
                <ul className="text-left space-y-2 text-yellow-400/60 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Email templates</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Campaign tracking</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Auto-responders</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> A/B testing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-yellow-400 text-xl">Call Center</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-yellow-400/70 mb-4">
                  Manage calls and communications with integrated telephony and call tracking.
                </p>
                <ul className="text-left space-y-2 text-yellow-400/60 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Call logging</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Call recording</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> VoIP integration</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Call analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-yellow-400 text-xl">Task Management</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-yellow-400/70 mb-4">
                  Stay organized with task management, reminders, and team collaboration tools.
                </p>
                <ul className="text-left space-y-2 text-yellow-400/60 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Task tracking</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Team collaboration</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Deadline reminders</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Progress tracking</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CRM Interface Preview */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4" 
                style={{ textShadow: '0 0 20px rgba(255,215,0,0.5)' }}>
              Professional Interface
            </h2>
            <p className="text-xl text-yellow-400/70 max-w-2xl mx-auto">
              Modern, intuitive CRM interface with powerful features and beautiful design
            </p>
          </div>

          {/* Navigation Preview */}
          <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-400">NeonFlow CRM</h3>
                    <p className="text-xs text-yellow-400/60">Enterprise Solution</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400/60" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 bg-black/50 border border-yellow-500/30 rounded-lg text-yellow-400 placeholder-yellow-400/60 w-64"
                    />
                  </div>
                  <Button variant="ghost" className="relative text-yellow-400/70">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <Link href="#" className="text-yellow-400/70 hover:text-yellow-400">Dashboard</Link>
                <Link href="#" className="text-yellow-400/70 hover:text-yellow-400">Contacts</Link>
                <Link href="#" className="text-yellow-400/70 hover:text-yellow-400">Deals</Link>
                <Link href="#" className="text-yellow-400/70 hover:text-yellow-400">Analytics</Link>
                <Link href="#" className="text-yellow-400/70 hover:text-yellow-400">Tasks</Link>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="text-yellow-400 font-bold">Dashboard Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-yellow-400/70">Total Revenue</span>
                        <DollarSign className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div className="text-2xl font-black text-yellow-400">$2.4M</div>
                      <div className="text-xs text-green-400">+23.5% from last month</div>
                    </div>
                    <div className="p-4 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-yellow-400/70">Active Deals</span>
                        <Target className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div className="text-2xl font-black text-yellow-400">156</div>
                      <div className="text-xs text-green-400">+18.2% from last month</div>
                    </div>
                    <div className="p-4 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-yellow-400/70">Conversion Rate</span>
                        <TrendingUp className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div className="text-2xl font-black text-yellow-400">24.8%</div>
                      <div className="text-xs text-green-400">+5.3% from last month</div>
                    </div>
                    <div className="p-4 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-yellow-400/70">Active Contacts</span>
                        <Users className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div className="text-2xl font-black text-yellow-400">3,420</div>
                      <div className="text-xs text-green-400">+12.7% from last month</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="text-yellow-400 font-bold">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div>
                        <p className="text-yellow-400 text-sm">Deal closed with Tech Corp</p>
                        <p className="text-yellow-400/60 text-xs">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div>
                        <p className="text-yellow-400 text-sm">New contact added</p>
                        <p className="text-yellow-400/60 text-xs">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <div>
                        <p className="text-yellow-400 text-sm">Meeting scheduled</p>
                        <p className="text-yellow-400/60 text-xs">6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-yellow-400 mb-2">
                10K+
              </div>
              <p className="text-yellow-400/70">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-yellow-400 mb-2">
                50M+
              </div>
              <p className="text-yellow-400/70">Contacts Managed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-yellow-400 mb-2">
                $2B+
              </div>
              <p className="text-yellow-400/70">Revenue Generated</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-yellow-400 mb-2">
                99.9%
              </div>
              <p className="text-yellow-400/70">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-4" 
              style={{ textShadow: '0 0 20px rgba(255,215,0,0.5)' }}>
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-yellow-400/70 mb-8">
            Join thousands of businesses using NeonFlow CRM to accelerate growth and build stronger customer relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 px-8 py-3 text-lg">
              <ArrowRight className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
