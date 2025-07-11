import { useRef, useEffect } from 'react';
import { Terminal, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface WorkspaceLogsProps {
  logs: string[];
  onClear: () => void;
}

export const WorkspaceLogs = ({ logs, onClear }: WorkspaceLogsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const copyLogs = () => {
    navigator.clipboard.writeText(logs.join('\n'));
  };

  const getLogType = (log: string) => {
    if (log.includes('[ERROR]')) return 'error';
    if (log.includes('[WARNING]') || log.includes('[WARN]')) return 'warning';
    if (log.includes('[SUCCESS]')) return 'success';
    if (log.includes('[INFO]')) return 'info';
    return 'default';
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'success': return 'text-green-400';
      case 'info': return 'text-blue-400';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = () => {
    return new Date().toLocaleTimeString();
  };

  return (
    <div className="workspace-logs flex flex-col">
      <div className="p-3 border-b border-border bg-workspace-secondary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Execution Logs</h3>
            <span className="text-xs text-muted-foreground">
              {logs.length} entries
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyLogs}
              className="h-7 px-2"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-7 px-2"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-3" ref={scrollRef}>
        <div className="space-y-1 font-mono text-xs">
          {logs.length === 0 ? (
            <div className="text-muted-foreground italic">
              No logs yet. Run a workflow to see execution details.
            </div>
          ) : (
            logs.map((log, index) => {
              const logType = getLogType(log);
              const logColor = getLogColor(logType);
              
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 py-1 hover:bg-workspace-accent rounded px-2 -mx-2 transition-colors"
                >
                  <span className="text-muted-foreground text-[10px] mt-0.5 font-mono">
                    {formatTimestamp()}
                  </span>
                  <span className={`${logColor} flex-1 leading-relaxed`}>
                    {log}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};