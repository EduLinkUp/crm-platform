'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'SALESPERSON',
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
      console.error('Signup failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0a0e27 0%, #1a0f3f 50%, #0a0e27 100%)'}}>
      {/* Neon glow orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-slate-900/80 rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/50 backdrop-blur-xl" style={{boxShadow: '0 0 40px rgba(0, 212, 255, 0.3), 0 0 80px rgba(255, 0, 255, 0.2)'}}>
          
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
                <h1 className="text-3xl font-bold text-white">Create Account</h1>
                <p className="text-cyan-300/80 mt-2">Join our platform today</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm font-medium">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-sm font-medium">
                  {success}
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-cyan-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full pl-20 pr-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition"
                    style={{boxShadow: 'inset 0 0 10px rgba(0, 212, 255, 0.1)'}}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-cyan-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-20 pr-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition"
                    style={{boxShadow: 'inset 0 0 10px rgba(0, 212, 255, 0.1)'}}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-cyan-300">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-20 pr-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition"
                    style={{boxShadow: 'inset 0 0 10px rgba(0, 212, 255, 0.1)'}}
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-cyan-300">Account Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition"
                  style={{boxShadow: 'inset 0 0 10px rgba(0, 212, 255, 0.1)'}}
                >
                  <option value="SALESPERSON">Salesperson</option>
                  <option value="MANAGER">Manager</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
                <p className="text-xs text-cyan-300/60">Choose your role to set permissions</p>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-cyan-500/50 text-cyan-400 mt-1 flex-shrink-0"
                />
                <label className="text-sm text-slate-300">
                  I agree to the{' '}
                  <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 font-medium">
                    Terms
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-black font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95 mt-6"
                style={{boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'}}
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-4 w-4">⟳</span>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create account</span>
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

            {/* Sign in */}
            <div className="text-center space-y-3">
              <p className="text-slate-400">Already have an account?</p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 w-full justify-center py-3 border-2 border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-800/50 rounded-lg transition font-semibold text-cyan-300"
              >
                <span>Sign in</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
