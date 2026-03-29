'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Check } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('demo@crm.com');
  const [password, setPassword] = useState('Demo@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store user info in localStorage
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userRole', data.user.role);

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0a0e27 0%, #1a0f3f 50%, #0a0e27 100%)'}}>
      {/* Neon glow orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-slate-900/80 rounded-2xl overflow-hidden border border-cyan-500/50 shadow-2xl backdrop-blur-xl" style={{boxShadow: '0 0 40px rgba(0, 212, 255, 0.3), 0 0 80px rgba(255, 0, 255, 0.2)'}}>
          
          {/* Header gradient - neon */}
          <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

          {/* Content */}
          <div className="p-8 space-y-8">
            
            {/* Logo & Title */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg" style={{boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)'}}>
                  <span className="text-white text-2xl font-bold">⚡</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                <p className="text-cyan-300/80 mt-2">Sign in to your CRM account</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-cyan-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-20 pr-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition"
                    style={{boxShadow: 'inset 0 0 10px rgba(0, 212, 255, 0.1)'}}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-cyan-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-20 pr-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition"
                    style={{boxShadow: 'inset 0 0 10px rgba(0, 212, 255, 0.1)'}}
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-cyan-500/50 text-cyan-400" />
                  <span>Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-cyan-400 hover:text-cyan-300 font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-black font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
                style={{boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'}}
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-4 w-4">⟳</span>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cyan-500/30" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-slate-900/80 text-cyan-400/60 text-sm font-medium">Or continue with</span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="py-2.5 border border-cyan-500/30 rounded-lg hover:bg-slate-800/50 hover:border-cyan-400/60 transition font-medium text-cyan-300 text-sm">
                Google
              </button>
              <button type="button" className="py-2.5 border border-pink-500/30 rounded-lg hover:bg-slate-800/50 hover:border-pink-400/60 transition font-medium text-pink-300 text-sm">
                Microsoft
              </button>
            </div>

            {/* Sign up */}
            <div className="text-center space-y-3">
              <p className="text-slate-400">Don&apos;t have an account?</p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 w-full justify-center py-3 border-2 border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-800/50 rounded-lg transition font-semibold text-cyan-300"
              >
                <span>Create account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Info box */}
        <div className="mt-6 p-5 bg-slate-800/60 rounded-xl border border-cyan-500/30 backdrop-blur-sm" style={{boxShadow: '0 0 15px rgba(0, 212, 255, 0.15)'}}>
          <p className="text-sm font-semibold text-cyan-300 mb-3">Demo Credentials</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Email: </span>
                <span className="font-mono font-semibold text-cyan-300">demo@crm.com</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Password: </span>
                <span className="font-mono font-semibold text-pink-300">Demo@123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-cyan-400/50 mt-6">
          Enterprise Grade • Secure • Trusted
        </p>
      </div>
    </div>
  );
}
