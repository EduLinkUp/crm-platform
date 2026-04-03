import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Menu, 
  X, 
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
  TrendingUp
} from "lucide-react"
import Link from "next/link"

interface CRMLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Deals", href: "/deals", icon: Target },
  { name: "Tasks", href: "/tasks", icon: Calendar },
  { name: "Email", href: "/email", icon: Mail },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function CRMLayout({ children, title, subtitle }: CRMLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-yellow-400 flex">
      {/* Sidebar */}
      <div className="w-64 bg-black/80 backdrop-blur-lg border-r border-yellow-500/30 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-yellow-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-yellow-400">NeonFlow</h1>
              <p className="text-xs text-yellow-400/60">CRM System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all duration-200 group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-yellow-500/30">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-black" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-400">John Doe</p>
              <p className="text-xs text-yellow-400/60">john@company.com</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black/80 backdrop-blur-lg border-b border-yellow-500/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h1 className="text-2xl font-bold text-yellow-400">{title}</h1>
              )}
              {subtitle && (
                <p className="text-yellow-400/60">{subtitle}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400/60" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-black/50 border border-yellow-500/30 rounded-lg text-yellow-400 placeholder-yellow-400/60 focus:outline-none focus:border-yellow-400/50 focus:bg-black/70 transition-all duration-200"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative text-yellow-400/70 hover:text-yellow-400">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* Quick Stats */}
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12%
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
