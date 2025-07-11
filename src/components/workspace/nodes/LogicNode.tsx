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
          <h3 className="font-semibold text-sm text-foreground">
            {nodeData.label || 'Logic Node'}
          </h3>
          <Badge 
            variant="outline" 
            className="text-xs mt-1"
            style={{ borderColor: nodeColor, color: nodeColor }}
          >
            Logic
          </Badge>
        </div>
      </div>
      
      {/* Node Description */}
      {nodeData.description && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {nodeData.description}
        </p>
      )}
      
      {/* Output Handles - Logic nodes can have multiple outputs */}
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        className="!w-3 !h-3 !bg-green-500 !border-2 !border-workspace"
        style={{ top: '60%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        className="!w-3 !h-3 !bg-red-500 !border-2 !border-workspace"
        style={{ top: '80%' }}
      />
      
      {/* Logic indicator dot */}
      <div 
        className="absolute top-2 right-2 w-2 h-2 rounded-full"
        style={{ backgroundColor: nodeColor }}
      />
    </div>
  );
});