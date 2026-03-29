'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if logged in, otherwise to login
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-cyber-darker flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl font-bold text-neon-yellow mb-4 animate-pulse">
          CRM SYSTEM
        </div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
