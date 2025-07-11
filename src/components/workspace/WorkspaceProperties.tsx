import { useState } from 'react';
import { Node } from '@xyflow/react';
import { Settings, TestTube, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface WorkspacePropertiesProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, data: any) => void;
}

export const WorkspaceProperties = ({ selectedNode, onUpdateNode }: WorkspacePropertiesProps) => {
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  const handleTestNode = async () => {
    if (!selectedNode || !testInput) return;
    
    setIsTesting(true);
    setTestOutput('Processing...');
    
    // Simulate API call
    setTimeout(() => {
      setTestOutput(`Mock response from ${selectedNode.data.label}:\n\nProcessed: "${testInput}"\n\nThis is a simulated response for testing the node configuration.`);
      setIsTesting(false);
    }, 2000);
  };

  if (!selectedNode) {
    return (
      <div className="workspace-properties flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground">Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Settings className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Select a node to view properties</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="workspace-properties flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Node Properties</h2>
          <Badge variant="outline" className="text-xs">
            {selectedNode.type}
          </Badge>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Basic Properties */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Basic Settings</h3>
            
            <div className="space-y-2">
              <Label htmlFor="node-name" className="text-xs">Agent Name</Label>
              <Input
                id="node-name"
                value={String(selectedNode.data.agentName || selectedNode.data.label || '')}
                onChange={(e) => onUpdateNode(selectedNode.id, { agentName: e.target.value })}
                className="h-8 text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="node-description" className="text-xs">Description</Label>
              <Textarea
                id="node-description"
                value={String(selectedNode.data.description || '')}
                onChange={(e) => onUpdateNode(selectedNode.id, { description: e.target.value })}
                className="min-h-[60px] text-sm resize-none"
                placeholder="Describe what this node does..."
              />
            </div>
          </div>

          {/* Model-specific properties */}
          {selectedNode.type === 'aiModel' && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Model Configuration</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="model-type" className="text-xs">Model Type</Label>
                  <Select
                    value={String(selectedNode.data.modelType || '')}
                    onValueChange={(value) => onUpdateNode(selectedNode.id, { modelType: value })}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      <SelectItem value="grok">Grok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="temperature" className="text-xs">Temperature</Label>
                  <Input
                    id="temperature"
                    type="number"
                    min="0"
                    max="2"
                    step="0.1"
                    value={Number(selectedNode.data.temperature || 0.7)}
                    onChange={(e) => onUpdateNode(selectedNode.id, { temperature: parseFloat(e.target.value) })}
                    className="h-8 text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-tokens" className="text-xs">Max Tokens</Label>
                  <Input
                    id="max-tokens"
                    type="number"
                    min="1"
                    max="4000"
                    value={Number(selectedNode.data.maxTokens || 1000)}
                    onChange={(e) => onUpdateNode(selectedNode.id, { maxTokens: parseInt(e.target.value) })}
                    className="h-8 text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="system-prompt" className="text-xs">System Prompt</Label>
                  <Textarea
                    id="system-prompt"
                    value={String(selectedNode.data.systemPrompt || '')}
                    onChange={(e) => onUpdateNode(selectedNode.id, { systemPrompt: e.target.value })}
                    className="min-h-[80px] text-sm resize-none"
                    placeholder="You are a helpful AI assistant..."
                  />
                </div>
              </div>
            </>
          )}

          {/* Test Node Section */}
          <Separator />
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              Test Node
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="test-input" className="text-xs">Test Input</Label>
              <Textarea
                id="test-input"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="min-h-[60px] text-sm resize-none"
                placeholder="Enter test input to validate node configuration..."
              />
            </div>
            
            <Button
              onClick={handleTestNode}
              disabled={!testInput || isTesting}
              className="w-full h-8 text-sm"
              variant="outline"
            >
              {isTesting ? (
                <>Testing...</>
              ) : (
                <>
                  <Play className="w-3 h-3 mr-2" />
                  Test Node
                </>
              )}
            </Button>
            
            {testOutput && (
              <div className="space-y-2">
                <Label className="text-xs">Test Output</Label>
                <div className="p-3 bg-muted rounded-md">
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">
                    {testOutput}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};