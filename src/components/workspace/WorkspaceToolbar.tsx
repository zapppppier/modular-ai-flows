import { Play, Square, Save, Download, Upload, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface WorkspaceToolbarProps {
  onRun: () => void;
  onSave: () => void;
  isRunning: boolean;
}

export const WorkspaceToolbar = ({ onRun, onSave, isRunning }: WorkspaceToolbarProps) => {
  return (
    <div className="workspace-toolbar p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold text-primary">AI Flow Builder</h1>
        <Badge variant="secondary" className="text-xs">
          Beta
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant={isRunning ? "destructive" : "default"}
          size="sm"
          onClick={onRun}
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          {isRunning ? (
            <>
              <Square className="w-4 h-4" />
              Stop
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run
            </>
          )}
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button variant="outline" size="sm" onClick={onSave}>
          <Save className="w-4 h-4" />
        </Button>
        
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4" />
        </Button>
        
        <Button variant="outline" size="sm">
          <Upload className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};