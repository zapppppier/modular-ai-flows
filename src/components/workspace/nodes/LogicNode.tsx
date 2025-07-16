import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { GitBranch, Database, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LogicNodeData {
  label?: string;
  description?: string;
  type?: string;
}

const logicIcons: { [key: string]: React.ComponentType<any> } = {
  condition: GitBranch,
  'data-store': Database,
  filter: Filter,
};

export const LogicNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as LogicNodeData;
  const IconComponent = logicIcons[nodeData.type || 'condition'] || GitBranch;
  const nodeColor = 'hsl(var(--node-logic))';

  return (
    <div 
      className={`
        relative border-2 rounded-xl p-4 min-w-[180px] transition-all duration-300 group overflow-hidden neural-pattern backdrop-blur-xl
        ${selected ? 'border-primary shadow-2xl scale-105' : 'border-border/50 hover:border-primary/50 hover:scale-102 hover:-translate-y-1'}
      `}
      style={{
        background: `var(--gradient-circuit), linear-gradient(135deg, hsl(var(--card) / 0.8), hsl(var(--workspace-accent) / 0.6))`,
        boxShadow: selected ? 'var(--shadow-intense)' : 'var(--glass-shadow)',
      }}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-4 !h-4 !bg-primary !border-2 !border-workspace !transition-all !duration-200 hover:!scale-125 hover:!shadow-lg"
        style={{ boxShadow: `0 0 10px ${nodeColor}40` }}
      />
      
      {/* Node Header */}
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center p-2 group-hover:scale-110 transition-all duration-300 hexagon-glow"
          style={{ 
            background: `var(--gradient-hexagon), linear-gradient(135deg, ${nodeColor}20, ${nodeColor}10)`,
            border: `1px solid ${nodeColor}30`,
            boxShadow: `0 4px 12px ${nodeColor}20`
          }}
        >
          <IconComponent className="w-5 h-5 animate-crystalline-pulse" style={{ color: nodeColor }} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-200">
            {nodeData.label || 'Logic Node'}
          </h3>
          <Badge 
            variant="outline" 
            className="text-xs mt-1 animate-pulse-glow"
            style={{ 
              borderColor: nodeColor, 
              color: nodeColor,
              background: `${nodeColor}10`
            }}
          >
            Logic
          </Badge>
        </div>
      </div>
      
      {/* Node Description */}
      {nodeData.description && (
        <p className="text-xs text-muted-foreground leading-relaxed relative z-10 group-hover:text-foreground transition-colors duration-200">
          {nodeData.description}
        </p>
      )}
      
      {/* Output Handles - Logic nodes can have multiple outputs */}
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        className="!w-4 !h-4 !bg-green-500 !border-2 !border-workspace !transition-all !duration-200 hover:!scale-125 hover:!shadow-lg"
        style={{ top: '60%', boxShadow: '0 0 10px hsl(var(--connection-success) / 0.4)' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        className="!w-4 !h-4 !bg-red-500 !border-2 !border-workspace !transition-all !duration-200 hover:!scale-125 hover:!shadow-lg"
        style={{ top: '80%', boxShadow: '0 0 10px hsl(var(--connection-error) / 0.4)' }}
      />
      
      {/* Logic indicator dot */}
      <div 
        className="absolute top-3 right-3 w-3 h-3 rounded-full animate-pulse-glow"
        style={{ 
          backgroundColor: nodeColor,
          boxShadow: `0 0 8px ${nodeColor}60`
        }}
      />
    </div>
  );
});