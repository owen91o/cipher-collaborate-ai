import React from 'react';
import { Shield, Lock, Brain, Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon - FHE + AI inspired design */}
      <div className={`${sizeClasses[size]} relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
        
        {/* Main shield with lock */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className={`${iconSizes[size]} text-white drop-shadow-lg`} />
        </div>
        
        {/* Overlay elements for FHE/AI theme */}
        <div className="absolute top-1 right-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-1 left-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-300"></div>
        </div>
        
        {/* Neural network pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 40 40" className="w-full h-full">
            <defs>
              <pattern id="neural" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="0.5" fill="white" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural)"/>
          </svg>
        </div>
      </div>

      {showText && (
        <div>
          <h1 className={`${textSizes[size]} font-bold text-foreground`}>
            Cipher Collaborate AI
          </h1>
          <p className="text-sm text-muted-foreground">
            Privacy-First AI Training
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
