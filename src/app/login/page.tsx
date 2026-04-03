'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, EyeOff, Activity, Shield, AlertTriangle } from 'lucide-react'

export default function ModernLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Simple in-memory authentication
      if (email === 'admin@neonflow.com' && password === 'password123') {
        // Store user info in localStorage
        localStorage.setItem('crm_user', JSON.stringify({
          id: 'demo-user-1',
          email: 'admin@neonflow.com',
          name: 'Demo Admin',
          role: 'ADMIN',
        }))
        
        // Redirect to dashboard
        router.push('/dashboard')
      } else if (email && password.length >= 8) {
        // Allow any email with password >= 8 chars for demo
        localStorage.setItem('crm_user', JSON.stringify({
          id: Date.now().toString(),
          email: email,
          name: email.split('@')[0],
          role: 'USER',
        }))
        
        router.push('/dashboard')
      } else {
        setError('Invalid credentials. Use admin@neonflow.com / password123 or any email with 8+ character password')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md p-6">
        <Card className="modern-card shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              NeonFlow CRM
            </CardTitle>
            <p className="text-gray-600">
              Professional CRM System
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="modern-input w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="modern-input w-full pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
              
              <Button
                type="submit"
                className="modern-button w-full py-3 text-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="text-center space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</p>
                <p className="text-xs text-blue-700"><strong>Email:</strong> admin@neonflow.com</p>
                <p className="text-xs text-blue-700"><strong>Password:</strong> password123</p>
                <p className="text-xs text-blue-600 mt-2">Or any email with 8+ character password</p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <Link href="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8">
          <Badge className="modern-badge-success px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Secure Authentication
          </Badge>
        </div>
      </div>
    </div>
  )
}
