import { Play, Square, Save, Download, Upload, Settings, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface WorkspaceToolbarProps {
  onRun: () => void;
  onSave: () => void;
  onClear: () => void;
  isRunning: boolean;
}

export const WorkspaceToolbar = ({ onRun, onSave, onClear, isRunning }: WorkspaceToolbarProps) => {
  return (
    <div className="workspace-toolbar p-3 flex items-center justify-between relative z-10">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center animate-float">
            <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            AI Flow Builder
          </h1>
        </div>
        <Badge variant="secondary" className="text-xs animate-pulse-glow border-primary/30 text-primary">
          Beta
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant={isRunning ? "destructive" : "default"}
          size="sm"
          onClick={onRun}
          disabled={isRunning}
          className={`
            flex items-center gap-2 transition-all duration-300 
            ${isRunning ? 'animate-pulse-glow' : 'hover:scale-105 hover:shadow-lg'}
            backdrop-blur-sm
          `}
        >
          {isRunning ? (
            <>
              <Square className="w-4 h-4 animate-bounce-gentle" />
              Stop
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run
            </>
          )}
        </Button>
        
        <Separator orientation="vertical" className="h-6 bg-border/50" />
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSave}
          className="hover:scale-105 transition-all duration-200 backdrop-blur-sm hover:bg-accent/80"
        >
          <Save className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="hover:scale-105 transition-all duration-200 backdrop-blur-sm hover:bg-accent/80"
        >
          <Download className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="hover:scale-105 transition-all duration-200 backdrop-blur-sm hover:bg-accent/80"
        >
          <Upload className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 bg-border/50" />
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onClear}
          className="hover:scale-105 transition-all duration-200 backdrop-blur-sm hover:bg-destructive/80 hover:text-destructive-foreground"
          title="Clear Canvas"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 bg-border/50" />
        
        <Button 
          variant="outline" 
          size="sm"
          className="hover:scale-105 transition-all duration-200 backdrop-blur-sm hover:bg-accent/80"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};