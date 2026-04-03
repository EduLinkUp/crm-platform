"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  Brain,
  Shield
} from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { data: session, status } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-neon-yellow bg-cyber-black/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="h-8 w-8 text-neon-yellow animate-neon-pulse" />
              <div className="absolute inset-0 blur-xl bg-neon-yellow/30 animate-cyber-glow" />
            </div>
            <span className="text-xl font-bold text-neon-yellow glitch" data-text="NEONFLOW">
              NEONFLOW
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {session && (
              <>
                <Link href="/dashboard" className="text-neon-yellow hover:text-neon-red transition-colors">
                  Dashboard
                </Link>
                <Link href="/organizations" className="text-neon-yellow hover:text-neon-red transition-colors">
                  <Users className="h-5 w-5" />
                </Link>
                <Link href="/billing" className="text-neon-yellow hover:text-neon-red transition-colors">
                  Billing
                </Link>
                <Link href="/settings" className="text-neon-yellow hover:text-neon-red transition-colors">
                  <Settings className="h-5 w-5" />
                </Link>
              </>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="h-8 w-8 bg-cyber-gray rounded-full animate-pulse" />
            ) : session ? (
              <div className="flex items-center space-x-3">
                <Badge variant="neon" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  {session.user.role}
                </Badge>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-neon-yellow to-neon-red flex items-center justify-center">
                    <span className="text-cyber-black font-bold text-sm">
                      {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-neon-yellow text-sm hidden lg:block">
                    {session.user.name || session.user.email}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-neon-red border-neon-red hover:bg-neon-red hover:text-cyber-black"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin">
                  <Button variant="outline" className="text-neon-yellow border-neon-yellow hover:bg-neon-yellow hover:text-cyber-black">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="neon" className="bg-gradient-to-r from-neon-yellow to-neon-red">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neon-yellow hover:bg-neon-yellow/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neon-yellow/20">
            <div className="flex flex-col space-y-4">
              {session && (
                <>
                  <Link href="/dashboard" className="text-neon-yellow hover:text-neon-red">
                    Dashboard
                  </Link>
                  <Link href="/organizations" className="text-neon-yellow hover:text-neon-red">
                    Organizations
                  </Link>
                  <Link href="/billing" className="text-neon-yellow hover:text-neon-red">
                    Billing
                  </Link>
                  <Link href="/settings" className="text-neon-yellow hover:text-neon-red">
                    Settings
                  </Link>
                </>
              )}
              {!session ? (
                <>
                  <Link href="/auth/signin">
                    <Button variant="outline" className="w-full text-neon-yellow border-neon-yellow hover:bg-neon-yellow hover:text-cyber-black">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="neon" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                  className="w-full text-neon-red border-neon-red hover:bg-neon-red hover:text-cyber-black"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
