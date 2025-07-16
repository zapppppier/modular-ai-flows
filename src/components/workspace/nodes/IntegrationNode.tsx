import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Circle } from 'lucide-react';

interface IntegrationNodeData {
  label?: string;
  description?: string;
  type?: string;
  connected?: boolean;
  status?: 'connected' | 'disconnected' | 'error';
  icon?: React.ComponentType<any>;
  logo?: string;
  color?: string;
}

export const IntegrationNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as IntegrationNodeData;
  const IconComponent = nodeData.icon || Circle;
  const nodeColor = nodeData.color || 'hsl(var(--node-integration))';
  
  const getStatusIcon = () => {
    switch (nodeData.status) {
      case 'connected':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return <Circle className="w-3 h-3 text-muted-foreground" />;
    }
  };

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
          className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300"
          style={{ 
            backgroundColor: nodeData.logo ? '#ffffff' : `${nodeColor}20`, 
            color: nodeColor,
            border: `1px solid ${nodeColor}40`,
            boxShadow: `0 4px 12px ${nodeColor}20`
          }}
        >
          {nodeData.logo ? (
            <img 
              src={nodeData.logo} 
              alt={`${nodeData.label} logo`}
              className="w-6 h-6 object-contain animate-float"
            />
          ) : (
            <IconComponent className="w-5 h-5 animate-float" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-200">
              {nodeData.label || 'Integration'}
            </h3>
            <div className="animate-bounce-gentle">
              {getStatusIcon()}
            </div>
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
            Integration
          </Badge>
        </div>
      </div>
      
      {/* Node Description */}
      {nodeData.description && (
        <p className="text-xs text-muted-foreground leading-relaxed relative z-10 group-hover:text-foreground transition-colors duration-200">
          {nodeData.description}
        </p>
      )}
      
      {/* Status indicator */}
      <div className="flex items-center gap-2 mt-2 relative z-10">
        <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
          Status:
        </div>
        <div 
          className="text-xs font-medium animate-pulse-glow"
          style={{ color: nodeData.status === 'connected' ? '#10b981' : nodeData.status === 'error' ? '#ef4444' : '#6b7280' }}
        >
          {nodeData.status || 'disconnected'}
        </div>
      </div>
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-4 !h-4 !bg-primary !border-2 !border-workspace !transition-all !duration-200 hover:!scale-125 hover:!shadow-lg"
        style={{ boxShadow: `0 0 10px ${nodeColor}40` }}
      />
      
      {/* Integration status indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        <div 
          className="w-3 h-3 rounded-full animate-pulse-glow"
          style={{ 
            backgroundColor: nodeData.status === 'connected' ? '#10b981' : nodeData.status === 'error' ? '#ef4444' : nodeColor,
            boxShadow: `0 0 8px ${nodeData.status === 'connected' ? '#10b981' : nodeData.status === 'error' ? '#ef4444' : nodeColor}60`
          }}
        />
      </div>
    </div>
  );
});