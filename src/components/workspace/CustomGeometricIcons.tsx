import React from 'react';

// Custom geometric icon components that look unique and professional
export const GeometricIcons = {
  // AI Models - Neural network inspired
  aiModels: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <defs>
        <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="6" cy="6" r="2" fill="url(#aiGradient)" />
      <circle cx="18" cy="6" r="2" fill="url(#aiGradient)" />
      <circle cx="6" cy="18" r="2" fill="url(#aiGradient)" />
      <circle cx="18" cy="18" r="2" fill="url(#aiGradient)" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M8 6h8M6 8v8M16 8v8M8 18h8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  ),

  // Integrations - Connected hexagon
  integrations: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <defs>
        <linearGradient id="intGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M12 2l5.196 3v6L12 14l-5.196-3V5L12 2z" fill="url(#intGradient)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4" cy="12" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="20" cy="12" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="12" cy="20" r="2" fill="currentColor" opacity="0.7" />
      <path d="M6 12h4M14 12h4M12 14v4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  ),

  // Data Sources - Crystalline structure
  dataSources: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <defs>
        <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="url(#dataGradient)" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <polygon points="12,10 15,11.5 15,12.5 12,14 9,12.5 9,11.5" fill="currentColor" opacity="0.8" />
      <path d="M12 2v4M12 18v4M2 8.5l4 2.3M18 13.2l4-2.3M2 15.5l4-2.3M18 10.8l4 2.3" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  ),

  // Logic - Circuit pattern
  logic: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <defs>
        <linearGradient id="logicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect x="3" y="8" width="6" height="8" rx="2" fill="url(#logicGradient)" stroke="currentColor" strokeWidth="1.5" />
      <rect x="15" y="8" width="6" height="8" rx="2" fill="url(#logicGradient)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M9 12h3M12 12h3M6 6v2M18 6v2M6 16v2M18 16v2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
      <circle cx="18" cy="18" r="1" fill="currentColor" />
    </svg>
  ),

  // Utilities - Diamond grid
  utilities: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <defs>
        <linearGradient id="utilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M12 3l6 6-6 6-6-6 6-6z" fill="url(#utilGradient)" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7l3 3-3 3-3-3 3-3z" fill="currentColor" opacity="0.6" />
      <circle cx="5" cy="5" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="19" cy="5" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="5" cy="19" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="19" cy="19" r="1.5" fill="currentColor" opacity="0.5" />
      <path d="M5 5l2.5 2.5M16.5 7.5L19 5M5 19l2.5-2.5M16.5 16.5L19 19" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  ),

  // Communication - Wave pattern
  communication: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <defs>
        <linearGradient id="commGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9" fill="url(#commGradient)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M6.343 6.343l1.414 1.414M16.243 16.243l1.414 1.414M6.343 17.657l1.414-1.414M16.243 7.757l1.414-1.414" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  )
};

// Enhanced node template card component with geometric styling
export const GeometricNodeCard: React.FC<{
  template: any;
  onAddNode: (nodeData: any) => void;
  index: number;
}> = ({ template, onAddNode, index }) => {
  const IconComponent = GeometricIcons[template.category as keyof typeof GeometricIcons];
  
  return (
    <div
      className="group relative cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={() => onAddNode(template)}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Background with glassmorphism */}
      <div 
        className="relative p-4 rounded-xl border backdrop-blur-xl transition-all duration-300 group-hover:shadow-2xl overflow-hidden"
        style={{
          background: 'var(--glass-bg)',
          borderColor: `${template.color}40`,
          boxShadow: `0 4px 20px ${template.color}10`
        }}
      >
        {/* Animated background gradient */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${template.color}, transparent 70%)`
          }}
        />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div 
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            style={{
              background: `linear-gradient(90deg, transparent, ${template.color}20, transparent)`
            }}
          />
        </div>

        {/* Icon container */}
        <div className="relative z-10 flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{
              background: `linear-gradient(135deg, ${template.color}20, ${template.color}10)`,
              border: `1px solid ${template.color}30`,
              boxShadow: `0 4px 12px ${template.color}15`
            }}
          >
            {template.logo ? (
              <img 
                src={template.logo} 
                alt={`${template.label} logo`}
                className="w-5 h-5 object-contain animate-float"
                key={template.id}
              />
            ) : IconComponent ? (
              <IconComponent 
                className="w-5 h-5 transition-all duration-300 group-hover:scale-110" 
                style={{ color: template.color }}
              />
            ) : null}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 
              className="font-medium text-sm truncate group-hover:text-primary transition-colors duration-200"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {template.label}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-foreground transition-colors duration-200">
              {template.description}
            </p>
          </div>
        </div>

        {/* Floating accent dot */}
        <div 
          className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse-glow"
          style={{ 
            backgroundColor: template.color,
            boxShadow: `0 0 8px ${template.color}60`
          }}
        />
      </div>
    </div>
  );
};