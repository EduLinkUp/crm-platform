'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BarChart3, Users, Brain, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/dashboard/contacts', label: 'Contacts', icon: Users },
    { href: '/dashboard/pipeline', label: 'Sales Pipeline', icon: Brain },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-darker via-cyber to-cyber-darker">
      {/* Background glow effect */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-yellow rounded-full filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-red rounded-full filter blur-3xl opacity-10" />
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <aside
          className={cn(
            'bg-cyber-darker border-r-2 border-neon-yellow transition-all duration-300',
            sidebarOpen ? 'w-64' : 'w-20'
          )}
        >
          {/* Logo */}
          <div className="p-4 border-b-2 border-neon-yellow">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-neon-yellow rounded flex items-center justify-center text-cyber-dark font-bold text-lg">
                ▸
              </div>
              {sidebarOpen && <span className="text-neon-yellow font-bold text-lg">CRM</span>}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded transition-all duration-300',
                    'text-sm font-semibold uppercase tracking-wider',
                    active
                      ? 'bg-neon-yellow text-cyber-dark shadow-glow'
                      : 'text-neon-yellow border-2 border-transparent hover:border-neon-yellow'
                  )}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <button
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded transition-all duration-300',
                'text-neon-red border-2 border-neon-red hover:bg-neon-red hover:text-cyber-dark',
                'font-semibold uppercase text-sm'
              )}
            >
              <LogOut size={20} />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="bg-cyber-darker border-b-2 border-neon-yellow px-6 py-4 sticky top-0 z-40 shadow-glow">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-neon-yellow hover:shadow-glow p-2 rounded transition-all"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div className="flex items-center gap-4">
                <div className="px-4 py-2 border-2 border-neon-yellow rounded text-neon-yellow text-sm">
                  👤 User Name
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-gradient-to-b from-neon-yellow via-neon-red to-transparent animation-scan" />
    </div>
  );
};

export default MainLayout;
