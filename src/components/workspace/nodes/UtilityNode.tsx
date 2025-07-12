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
        return <div className="w-3 h-3 rounded-full bg-green-500" />;
      case 'waiting':
        return <Clock className="w-3 h-3 text-amber-500 animate-pulse" />;
      default:
        return <Pause className="w-3 h-3 text-muted-foreground" />;
    }
  };

  return (
    <div 
      className={`
        relative bg-card border-2 rounded-lg p-4 min-w-[180px] transition-all duration-200
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
            backgroundColor: `${nodeColor}20`, 
            color: nodeColor,
            border: `1px solid ${nodeColor}40`
          }}
        >
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-foreground">
              {nodeData.label || 'Utility'}
            </h3>
            {getStatusIcon()}
          </div>
          <Badge 
            variant="outline" 
            className="text-xs mt-1"
            style={{ borderColor: nodeColor, color: nodeColor }}
          >
            Utility
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
      
      {/* Utility indicator dot */}
      <div 
        className="absolute top-2 right-2 w-2 h-2 rounded-full"
        style={{ backgroundColor: nodeColor }}
      />
    </div>
  );
});