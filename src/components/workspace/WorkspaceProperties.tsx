import { useState } from 'react';
import { Node } from '@xyflow/react';
import { Settings, TestTube, Play, Info, ChevronDown, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface WorkspacePropertiesProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, data: any) => void;
}

export const WorkspaceProperties = ({ selectedNode, onUpdateNode }: WorkspacePropertiesProps) => {
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(['basic', 'config']);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleTestNode = async () => {
    if (!selectedNode || !testInput) return;
    
    setIsTesting(true);
    setTestOutput('Processing...');
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      setTestOutput(`✅ Response from ${selectedNode.data.label}:\n\nProcessed: "${testInput}"\n\nThis is a simulated response for testing the node configuration. The node appears to be working correctly with the current settings.`);
      setIsTesting(false);
    }, 2000);
  };

  if (!selectedNode) {
    return (
      <div className="workspace-properties flex flex-col h-full">
        <div className="p-6 border-b border-border/50">
          <h2 className="text-lg font-semibold text-muted-foreground tracking-tight">Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-muted/20 flex items-center justify-center">
              <Settings className="w-8 h-8 opacity-40" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">No Node Selected</p>
              <p className="text-xs opacity-60">Select a node to view and edit its properties</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const PropertySection = ({ 
    id, 
    title, 
    description, 
    icon: Icon, 
    children, 
    defaultOpen = false 
  }: {
    id: string;
    title: string;
    description?: string;
    icon?: React.ComponentType<any>;
    children: React.ReactNode;
    defaultOpen?: boolean;
  }) => {
    const isOpen = openSections.includes(id);
    
    return (
      <Collapsible open={isOpen} onOpenChange={() => toggleSection(id)}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={`
              w-full justify-between px-4 py-3 h-auto text-left transition-all duration-200
              ${isOpen ? 'bg-accent/30' : 'hover:bg-accent/20'}
            `}
          >
            <div className="flex items-center gap-3">
              {Icon && <Icon className="w-4 h-4 text-primary/70" />}
              <div>
                <div className="text-sm font-medium text-foreground tracking-tight">{title}</div>
                {description && (
                  <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
                )}
              </div>
            </div>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            ) : (
              <ChevronRight className="w-4 h-4 transition-transform duration-200" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="px-4 pb-4">
          <div className="mt-3 space-y-4">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const FormField = ({ 
    label, 
    description, 
    required = false, 
    children 
  }: {
    label: string;
    description?: string;
    required?: boolean;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label className="text-xs font-medium text-foreground tracking-wide">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div className="workspace-properties flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Node Properties</h2>
            <p className="text-xs text-muted-foreground mt-1">Configure and test your node</p>
          </div>
          <Badge 
            variant="outline" 
            className="text-xs font-medium tracking-wide"
            style={{
              borderColor: (selectedNode.data?.color as string) || 'hsl(var(--border))',
              color: (selectedNode.data?.color as string) || 'hsl(var(--foreground))'
            }}
          >
            {selectedNode.type}
          </Badge>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-0">
          {/* Basic Properties */}
          <PropertySection 
            id="basic" 
            title="Basic Settings" 
            description="Configure the fundamental properties of this node"
            icon={Settings}
          >
            <FormField 
              label="Agent Name" 
              description="A unique name to identify this node in your workflow"
              required
            >
              <Input
                value={String(selectedNode.data.agentName || selectedNode.data.label || '')}
                onChange={(e) => onUpdateNode(selectedNode.id, { agentName: e.target.value })}
                className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50 transition-all duration-200"
                placeholder="Enter a descriptive name..."
              />
            </FormField>
            
            <FormField 
              label="Description" 
              description="Describe what this node does in your workflow"
            >
              <Textarea
                value={String(selectedNode.data.description || '')}
                onChange={(e) => onUpdateNode(selectedNode.id, { description: e.target.value })}
                className="min-h-[70px] text-sm resize-none bg-workspace-secondary/30 border-border/50 focus:border-primary/50 transition-all duration-200"
                placeholder="Describe what this node does..."
              />
            </FormField>
          </PropertySection>

          <Separator className="bg-border/30" />

          {/* Model-specific properties */}
          {selectedNode.type === 'aiModel' && (
            <>
              <PropertySection 
                id="config" 
                title="Model Configuration" 
                description="Configure AI model parameters and behavior"
                icon={Zap}
              >
                <FormField 
                  label="Model Type" 
                  description="Select the specific AI model to use"
                  required
                >
                  <Select
                    value={String(selectedNode.data.modelType || '')}
                    onValueChange={(value) => onUpdateNode(selectedNode.id, { modelType: value })}
                  >
                    <SelectTrigger className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50">
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
                </FormField>
                
                <FormField 
                  label="Temperature" 
                  description="Controls randomness in responses (0 = deterministic, 2 = very random)"
                >
                  <Input
                    type="number"
                    min="0"
                    max="2"
                    step="0.1"
                    value={Number(selectedNode.data.temperature || 0.7)}
                    onChange={(e) => onUpdateNode(selectedNode.id, { temperature: parseFloat(e.target.value) })}
                    className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                  />
                </FormField>
                
                <FormField 
                  label="Max Tokens" 
                  description="Maximum length of the generated response"
                >
                  <Input
                    type="number"
                    min="1"
                    max="4000"
                    value={Number(selectedNode.data.maxTokens || 1000)}
                    onChange={(e) => onUpdateNode(selectedNode.id, { maxTokens: parseInt(e.target.value) })}
                    className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                  />
                </FormField>
                
                <FormField 
                  label="System Prompt" 
                  description="Instructions that define the AI's behavior and role"
                >
                  <Textarea
                    value={String(selectedNode.data.systemPrompt || '')}
                    onChange={(e) => onUpdateNode(selectedNode.id, { systemPrompt: e.target.value })}
                    className="min-h-[90px] text-sm resize-none bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                    placeholder="You are a helpful AI assistant..."
                  />
                </FormField>
              </PropertySection>

              <Separator className="bg-border/30" />
            </>
          )}

          {/* Test Node Section */}
          <PropertySection 
            id="testing" 
            title="Test Node" 
            description="Validate your node configuration with test inputs"
            icon={TestTube}
          >
            <FormField 
              label="Test Input" 
              description="Enter sample data to test how this node processes it"
            >
              <Textarea
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="min-h-[70px] text-sm resize-none bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                placeholder="Enter test input to validate node configuration..."
              />
            </FormField>
            
            <Button
              onClick={handleTestNode}
              disabled={!testInput || isTesting}
              className={`
                w-full h-9 text-sm transition-all duration-200
                ${isTesting ? 'animate-pulse' : 'hover:scale-[1.02]'}
              `}
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
              <FormField 
                label="Test Output" 
                description="Results from your test input"
              >
                <div className="p-4 bg-muted/50 rounded-lg border border-border/30">
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                    {testOutput}
                  </pre>
                </div>
              </FormField>
            )}
          </PropertySection>
        </div>
      </ScrollArea>
    </div>
  );
};