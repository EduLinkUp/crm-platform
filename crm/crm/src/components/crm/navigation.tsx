import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  Users, 
  Target, 
  Phone, 
  Mail, 
  Calendar, 
  BarChart3, 
  Settings, 
  Search,
  Bell,
  User,
  LogOut,
  Zap,
  TrendingUp,
  Activity,
  Menu
} from "lucide-react"

export function ModernNavigation() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">NeonFlow CRM</h1>
            <p className="text-xs text-gray-500">Professional CRM System</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/dashboard"
            className="modern-nav-link active"
          >
            <Home className="w-4 h-4 mr-2" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/contacts"
            className="modern-nav-link"
          >
            <Users className="w-4 h-4 mr-2" />
            <span>Contacts</span>
          </Link>
          <Link
            href="/deals"
            className="modern-nav-link"
          >
            <Target className="w-4 h-4 mr-2" />
            <span>Deals</span>
          </Link>
          <Link
            href="/analytics"
            className="modern-nav-link"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            <span>Analytics</span>
          </Link>
          <Link
            href="/tasks"
            className="modern-nav-link"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span>Tasks</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden text-gray-600 hover:text-gray-900">
          <Menu className="w-5 h-5" />
        </Button>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="modern-input pl-10 pr-4 w-64"
              />
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-2">
            <Badge className="modern-badge-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12%
            </Badge>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john@company.com</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
