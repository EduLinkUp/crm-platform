import React from 'react';
import { cn } from '@/lib/utils';

interface CyberpunkCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowing?: boolean;
  variant?: 'yellow' | 'red' | 'purple';
  title?: string;
}

const CyberpunkCard = React.forwardRef<HTMLDivElement, CyberpunkCardProps>(
  ({ className, glowing = true, variant = 'yellow', title, children, ...props }, ref) => {
    const glowColors = {
      yellow: 'shadow-glow border-neon-yellow',
      red: 'shadow-glow-red border-neon-red',
      purple: 'shadow-neon border-purple-500',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-cyber-darker border-2 rounded-lg p-6 backdrop-blur-sm',
          'hover:shadow-lg transition-all duration-300',
          glowing && glowColors[variant],
          'relative overflow-hidden',
          className
        )}
        {...props}
      >
        {/* Top glow line */}
        <div
          className={cn(
            'absolute top-0 left-0 right-0 h-px bg-gradient-to-r',
            variant === 'yellow' ? 'from-transparent via-neon-yellow to-transparent' : 
            variant === 'red' ? 'from-transparent via-neon-red to-transparent' :
            'from-transparent via-purple-500 to-transparent'
          )}
        />

        {title && (
          <h3 className={cn(
            'text-lg font-bold uppercase tracking-wider mb-4 pb-3 border-b-2',
            variant === 'yellow' ? 'text-neon-yellow border-neon-yellow' :
            variant === 'red' ? 'text-neon-red border-neon-red' :
            'text-purple-500 border-purple-500'
          )}>
            {title}
          </h3>
        )}
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

CyberpunkCard.displayName = 'CyberpunkCard';

export default CyberpunkCard;
