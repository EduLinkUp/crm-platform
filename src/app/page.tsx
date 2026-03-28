import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  Rocket, 
  Shield, 
  Users, 
  TrendingUp, 
  CreditCard,
  Activity,
  ArrowRight,
  CheckCircle
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-cyber-black text-neon-yellow">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge variant="neon" className="mb-6 text-sm">
              <Rocket className="h-3 w-3 mr-1" />
              NEXT-GENERATION SAAS PLATFORM
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="glitch" data-text="NEONFLOW">NEONFLOW</span>
            </h1>
            <p className="text-xl md:text-2xl text-neon-yellow/80 mb-8 max-w-3xl mx-auto">
              Advanced multi-tenant SaaS analytics platform with cyberpunk aesthetics. 
              Built for the future of enterprise collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup">
                <Button variant="neon" size="lg" className="text-lg px-8 py-4">
                  <Zap className="h-5 w-5 mr-2" />
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 text-neon-yellow border-neon-yellow hover:bg-neon-yellow hover:text-cyber-black">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-neon-yellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 glitch" data-text="FEATURES">
              FEATURES
            </h2>
            <p className="text-xl text-neon-yellow/80">
              Everything you need to scale your SaaS business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-neon-yellow shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-neon-yellow to-neon-red flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-cyber-black" />
                </div>
                <CardTitle className="text-neon-yellow">Multi-Tenancy</CardTitle>
                <CardDescription className="text-neon-yellow/70">
                  Isolated workspaces with enterprise-grade security and custom domains
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-neon-yellow shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-neon-yellow to-neon-red flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-cyber-black" />
                </div>
                <CardTitle className="text-neon-yellow">Subscription Management</CardTitle>
                <CardDescription className="text-neon-yellow/70">
                  Flexible pricing tiers with Stripe integration and automated billing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-neon-yellow shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-neon-yellow to-neon-red flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-cyber-black" />
                </div>
                <CardTitle className="text-neon-yellow">Role-Based Access</CardTitle>
                <CardDescription className="text-neon-yellow/70">
                  Granular permissions with NextAuth.js and secure API endpoints
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-neon-yellow shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-neon-yellow to-neon-red flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-cyber-black" />
                </div>
                <CardTitle className="text-neon-yellow">Real-time Analytics</CardTitle>
                <CardDescription className="text-neon-yellow/70">
                  Advanced usage tracking and insights per tenant with customizable dashboards
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-neon-yellow shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-neon-yellow to-neon-red flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-cyber-black" />
                </div>
                <CardTitle className="text-neon-yellow">API Rate Limiting</CardTitle>
                <CardDescription className="text-neon-yellow/70">
                  Tier-based rate limiting with automatic scaling and fair usage policies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-neon-yellow shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-neon-yellow to-neon-red flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-cyber-black" />
                </div>
                <CardTitle className="text-neon-yellow">Feature Flags</CardTitle>
                <CardDescription className="text-neon-yellow/70">
                  Dynamic feature toggles per subscription tier for gradual rollouts
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 border-t border-neon-yellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 glitch" data-text="PRICING">
              PRICING
            </h2>
            <p className="text-xl text-neon-yellow/80">
              Choose the perfect plan for your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-neon-yellow shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-neon-yellow">Starter</CardTitle>
                <div className="text-3xl font-bold text-neon-yellow">$9.99</div>
                <CardDescription className="text-neon-yellow/70">per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">5 Team Members</span>
                  </div>
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">100 API Calls/month</span>
                  </div>
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">Basic Analytics</span>
                  </div>
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">Email Support</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-neon-yellow border-neon-yellow hover:bg-neon-yellow hover:text-cyber-black">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-neon-yellow shadow-neon-yellow hover:shadow-neon-yellow transition-all duration-300 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge variant="neon" className="text-xs">POPULAR</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-neon-yellow">Pro</CardTitle>
                <div className="text-3xl font-bold text-neon-yellow">$29.99</div>
                <CardDescription className="text-neon-yellow/70">per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">25 Team Members</span>
                  </div>
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">1,000 API Calls/month</span>
                  </div>
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">Advanced Analytics</span>
                  </div>
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">Priority Support</span>
                  </div>
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">Custom Integrations</span>
                  </div>
                </div>
                <Button variant="neon" className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-neon-yellow shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-neon-yellow">Enterprise</CardTitle>
                <div className="text-3xl font-bold text-neon-yellow">$99.99</div>
                <CardDescription className="text-neon-yellow/70">per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">Unlimited Team Members</span>
                  </div>
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">10,000 API Calls/month</span>
                  </div>
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">Real-time Analytics</span>
                  </div>
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">24/7 Phone Support</span>
                  </div>
                  <div className="flex items-center text-neon-yellow">
                    <CheckCircle className="h-4 w-4 mr-2 text-neon-red" />
                    <span className="text-sm">Custom Features</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-neon-yellow border-neon-yellow hover:bg-neon-yellow hover:text-cyber-black">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-neon-yellow/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 glitch" data-text="READY TO START?">
            READY TO START?
          </h2>
          <p className="text-xl text-neon-yellow/80 mb-8">
            Join thousands of teams already using NeonFlow to scale their businesses
          </p>
          <Link href="/auth/signup">
            <Button variant="neon" size="lg" className="text-lg px-8 py-4">
              <Rocket className="h-5 w-5 mr-2" />
              Start Your Free Trial
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
