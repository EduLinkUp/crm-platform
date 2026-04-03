import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Users, 
  Target, 
  BarChart3, 
  TrendingUp, 
  Zap, 
  ArrowRight,
  Shield,
  CheckCircle,
  Star,
  Phone,
  Mail,
  Calendar
} from "lucide-react"

export default function ModernLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              NeonFlow CRM
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional CRM System for Modern Business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button className="modern-button text-lg px-8 py-4">
                  <Zap className="h-5 w-5 mr-2" />
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="modern-button-outline text-lg px-8 py-4">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete CRM Solution
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Everything you need to manage customer relationships and grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="modern-card hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">
                  Contact Management
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Organize and manage all your contacts with advanced filtering and search capabilities.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Unlimited contacts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom fields
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Import/Export
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Contact history
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="modern-card hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">
                  Sales Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Track deals through your sales pipeline with visual boards and automated workflows.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Kanban boards
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Deal tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Revenue forecasting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Stage automation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="modern-card hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-gray-900">
                  Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Get insights into your business performance with comprehensive analytics and reporting.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Real-time metrics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom reports
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Data export
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Performance tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="modern-card hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-gray-900">
                  Email Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Create and send targeted email campaigns with built-in templates and automation.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Email templates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Campaign tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Auto-responders
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    A/B testing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="modern-card hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-gray-900">
                  Task Management
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Stay organized with task management, reminders, and team collaboration tools.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Task tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Team collaboration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Deadline reminders
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Join the businesses that rely on NeonFlow CRM for their success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-2">
                10K+
              </div>
              <p className="text-gray-600">
                Active Users
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-600 mb-2">
                50M+
              </div>
              <p className="text-gray-600">
                Contacts Managed
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-600 mb-2">
                $2B+
              </div>
              <p className="text-gray-600">
                Revenue Generated
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-orange-600 mb-2">
                99.9%
              </div>
              <p className="text-gray-600">
                Uptime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of businesses using NeonFlow CRM to accelerate growth and build stronger customer relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg">
                <Zap className="h-5 w-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 text-lg">
                <ArrowRight className="h-5 w-5 ml-2" />
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2024 NeonFlow CRM. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                <Shield className="w-3 h-3 mr-1" />
                Secure Platform
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                <Star className="w-3 h-3 mr-1" />
                Enterprise Ready
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
