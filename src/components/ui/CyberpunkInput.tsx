import React from 'react';
import { cn } from '@/lib/utils';

interface CyberpunkInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const CyberpunkInput = React.forwardRef<HTMLInputElement, CyberpunkInputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-neon-yellow text-sm font-bold uppercase mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-yellow">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-cyber px-4 py-2 border-2 border-neon-yellow rounded',
              'text-white placeholder-gray-500 focus:outline-none focus:shadow-glow',
              'transition-all duration-300',
              error && 'border-neon-red',
              icon && 'pl-10',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-neon-red text-xs mt-1 font-semibold">{error}</p>
        )}
      </div>
    );
  }
);

CyberpunkInput.displayName = 'CyberpunkInput';

export default CyberpunkInput;
