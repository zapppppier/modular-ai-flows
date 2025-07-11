import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Bot, Brain, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AIModelNodeData {
  label?: string;
  model?: string;
  agentName?: string;
  modelType?: string;
  description?: string;
}

const modelIcons: { [key: string]: React.ComponentType<any> } = {
  openai: Bot,
  claude: Brain,
  gemini: Bot,
  grok: Zap,
  deepseek: Brain,
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
  const IconComponent = modelIcons[nodeData.model || 'openai'] || Bot;
  const modelColor = modelColors[nodeData.model || 'openai'] || 'hsl(var(--primary))';

  return (
    <div 
      className={`
        relative bg-card border-2 rounded-lg p-4 min-w-[200px] transition-all duration-200
        ${selected ? 'border-primary shadow-glow' : 'border-border hover:border-accent'}
      `}
      style={{
        background: `linear-gradient(135deg, hsl(var(--card)), hsl(var(--workspace-accent)))`,
      }}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-primary !border-2 !border-workspace"
      />
      
      {/* Node Header */}
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="w-8 h-8 rounded-md flex items-center justify-center"
          style={{ 
            backgroundColor: `${modelColor}20`, 
            color: modelColor,
            border: `1px solid ${modelColor}40`
          }}
        >
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-foreground">
            {nodeData.agentName || nodeData.label || 'AI Agent'}
          </h3>
          <Badge 
            variant="outline" 
            className="text-xs mt-1"
            style={{ borderColor: modelColor, color: modelColor }}
          >
            {nodeData.modelType || nodeData.model || 'AI Model'}
          </Badge>
        </div>
      </div>
      
      {/* Node Description */}
      {nodeData.description && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {nodeData.description}
        </p>
      )}
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-primary !border-2 !border-workspace"
      />
      
      {/* Model indicator dot */}
      <div 
        className="absolute top-2 right-2 w-2 h-2 rounded-full"
        style={{ backgroundColor: modelColor }}
      />
    </div>
  );
});