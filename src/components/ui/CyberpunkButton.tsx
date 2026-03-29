import React from 'react';
import { cn } from '@/lib/utils';

interface CyberpunkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
}

const CyberpunkButton = React.forwardRef<HTMLButtonElement, CyberpunkButtonProps>(
  ({ className, variant = 'primary', size = 'md', glowing = true, ...props }, ref) => {
    const baseStyles = 'font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden';
    
    const variantStyles = {
      primary: 'bg-neon-yellow text-cyber-dark hover:shadow-glow-lg border-2 border-neon-yellow',
      secondary: 'bg-neon-red text-white hover:shadow-glow-red-lg border-2 border-neon-red',
      danger: 'bg-neon-red text-white hover:shadow-glow-red-lg border-2 border-neon-red',
      ghost: 'bg-transparent text-neon-yellow border-2 border-neon-yellow hover:bg-neon-yellow hover:text-cyber-dark',
    };

    const sizeStyles = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          glowing && variant !== 'ghost' && 'shadow-glow animate-glow',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      >
        {/* Glow effect background */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
        {props.children}
      </button>
    );
  }
);

CyberpunkButton.displayName = 'CyberpunkButton';

export default CyberpunkButton;
