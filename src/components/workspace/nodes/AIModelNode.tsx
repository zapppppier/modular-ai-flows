import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Badge } from '@/components/ui/badge';

// Import brand logos
import openaiLogo from '@/assets/logos/openai-logo.png';
import claudeLogo from '@/assets/logos/claude-logo.png';
import geminiLogo from '@/assets/logos/gemini-logo.png';
import grokLogo from '@/assets/logos/grok-logo.png';
import deepseekLogo from '@/assets/logos/deepseek-logo.png';

interface AIModelNodeData {
  label?: string;
  model?: string;
  agentName?: string;
  modelType?: string;
  description?: string;
}

const modelLogos: { [key: string]: string } = {
  openai: openaiLogo,
  claude: claudeLogo,
  gemini: geminiLogo,
  grok: grokLogo,
  deepseek: deepseekLogo,
};

const modelColors: { [key: string]: string } = {
  openai: 'hsl(var(--openai))',
  claude: 'hsl(var(--claude))',
  gemini: 'hsl(var(--gemini))',
  grok: 'hsl(var(--grok))',
  deepseek: 'hsl(var(--deepseek))',
};

export const AIModelNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as AIModelNodeData;
  const logoSrc = modelLogos[nodeData.model || 'openai'] || modelLogos.openai;
  const modelColor = modelColors[nodeData.model || 'openai'] || 'hsl(var(--primary))';

  return (
    <div 
      className={`
        relative backdrop-blur-xl border-2 rounded-xl p-4 min-w-[200px] 
        transition-all duration-300 group overflow-hidden
        ${selected 
          ? 'border-primary shadow-intense scale-105' 
          : 'border-border/50 hover:border-primary/50 hover:scale-102 hover:-translate-y-1'
        }
      `}
      style={{
        background: `var(--glass-bg)`,
        boxShadow: selected ? 'var(--shadow-intense)' : 'var(--glass-shadow)',
      }}
    >
      {/* Animated background glow */}
      <div 
        className="absolute inset-0 rounded-xl opacity-20 group-hover:opacity-40 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${modelColor}, transparent 70%)`
        }}
      />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-4 !h-4 !bg-primary !border-2 !border-workspace !transition-all !duration-200 hover:!scale-125 hover:!shadow-lg"
        style={{ boxShadow: `0 0 10px ${modelColor}40` }}
      />
      
      {/* Node Header */}
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center p-2 group-hover:scale-110 transition-all duration-300"
          style={{ 
            background: `linear-gradient(135deg, ${modelColor}20, ${modelColor}10)`,
            border: `1px solid ${modelColor}40`,
            boxShadow: `0 4px 12px ${modelColor}20`
          }}
        >
          <img 
            src={logoSrc} 
            alt={`${nodeData.model} logo`}
            className="w-full h-full object-contain animate-float"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-200">
            {nodeData.agentName || nodeData.label || 'AI Agent'}
          </h3>
          <Badge 
            variant="outline" 
            className="text-xs mt-1 animate-pulse-glow"
            style={{ 
              borderColor: modelColor, 
              color: modelColor,
              background: `${modelColor}10`
            }}
          >
            {nodeData.modelType || nodeData.model || 'AI Model'}
          </Badge>
        </div>
      </div>
      
      {/* Node Description */}
      {nodeData.description && (
        <p className="text-xs text-muted-foreground leading-relaxed relative z-10 group-hover:text-foreground transition-colors duration-200">
          {nodeData.description}
        </p>
      )}
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-4 !h-4 !bg-primary !border-2 !border-workspace !transition-all !duration-200 hover:!scale-125 hover:!shadow-lg"
        style={{ boxShadow: `0 0 10px ${modelColor}40` }}
      />
      
      {/* Model status indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        <div 
          className="w-3 h-3 rounded-full animate-pulse-glow"
          style={{ 
            backgroundColor: modelColor,
            boxShadow: `0 0 8px ${modelColor}60`
          }}
        />
        <div className="w-1 h-1 rounded-full bg-green-400 animate-bounce-gentle" />
      </div>
    </div>
  );
});