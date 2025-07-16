import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Badge } from '@/components/ui/badge';
import { Settings, Clock, Play, Pause } from 'lucide-react';

interface UtilityNodeData {
  label?: string;
  description?: string;
  type?: string;
  status?: 'idle' | 'running' | 'completed' | 'waiting';
  icon?: React.ComponentType<any>;
  color?: string;
}

export const UtilityNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as UtilityNodeData;
  const IconComponent = nodeData.icon || Settings;
  const nodeColor = nodeData.color || 'hsl(var(--node-utility))';
  
  const getStatusIcon = () => {
    switch (nodeData.status) {
      case 'running':
        return <Play className="w-3 h-3 text-blue-500 animate-pulse" />;
      case 'completed':
        return <div className="w-3 h-3 rounded-full bg-green-500 animate-bounce-gentle" />;
      case 'waiting':
        return <Clock className="w-3 h-3 text-amber-500 animate-pulse" />;
      default:
        return <Pause className="w-3 h-3 text-muted-foreground" />;
    }
  };

  return (
    <div 
      className={`
        relative backdrop-blur-xl border-2 rounded-xl p-4 min-w-[180px] 
        transition-all duration-300 group overflow-hidden neural-pattern
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
          background: `radial-gradient(circle at 50% 50%, ${nodeColor}, transparent 70%)`
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
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-200">
              {nodeData.label || 'Utility'}
            </h3>
            {getStatusIcon()}
          </div>
          <Badge 
            variant="outline" 
            className="text-xs mt-1 animate-pulse-glow"
            style={{ 
              borderColor: nodeColor, 
              color: nodeColor,
              background: `${nodeColor}10`
            }}
          >
            Utility
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
        style={{ boxShadow: `0 0 10px ${nodeColor}40` }}
      />
      
      {/* Utility indicator dot */}
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