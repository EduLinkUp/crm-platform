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
  DollarSign
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-yellow-400">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,215,0,0.08)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 mb-6 text-sm">
              <Rocket className="h-3 w-3 mr-1" />
              ADVANCED CRM SYSTEM
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-wider" 
                style={{ textShadow: '0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)' }}>
              NEONFLOW CRM
            </h1>
            <p className="text-xl md:text-2xl text-yellow-400/70 mb-8 max-w-3xl mx-auto">
              Transform your business with our cutting-edge CRM platform. 
              Manage contacts, track deals, and accelerate growth with AI-powered insights.
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

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4" 
                style={{ textShadow: '0 0 20px rgba(255,215,0,0.5)' }}>
              Powerful CRM Features
            </h2>
            <p className="text-xl text-yellow-400/70 max-w-2xl mx-auto">
              Everything you need to manage customer relationships and grow your business
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
                  Organize and manage all your contacts in one place with advanced filtering and search.
                </p>
                <ul className="text-left space-y-2 text-yellow-400/60 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Unlimited contacts</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Custom fields</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Import/Export</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-yellow-400 text-xl">Deal Pipeline</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-yellow-400/70 mb-4">
                  Track deals through your sales pipeline with visual boards and automated workflows.
                </p>
                <ul className="text-left space-y-2 text-yellow-400/60 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Kanban boards</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Deal tracking</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Revenue forecasting</li>
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
                </ul>
              </CardContent>
            </Card>
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
