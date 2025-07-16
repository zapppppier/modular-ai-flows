import { useState, useEffect } from 'react';
import { Node } from '@xyflow/react';
import { 
  Settings, TestTube, Play, Info, ChevronDown, ChevronRight, Zap, Key, Wifi, WifiOff, DollarSign, Clock,
  GitBranch, Database, Filter, Globe, Link, FileText, Timer, FileSearch, 
  Eye, Shield, Save, Cable, Code, AlertTriangle, Gauge
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useOpenAI } from '@/hooks/useOpenAI';
import { useToast } from '@/hooks/use-toast';

interface WorkspacePropertiesProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, data: any) => void;
}

export const WorkspaceProperties = ({ selectedNode, onUpdateNode }: WorkspacePropertiesProps) => {
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [streamOutput, setStreamOutput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(['basic', 'config']);
  const { toast } = useToast();

  // OpenAI hook with current node settings
  const openAIOptions = selectedNode?.type === 'aiModel' ? {
    model: String(selectedNode.data.modelType || 'gpt-3.5-turbo'),
    temperature: Number(selectedNode.data.temperature || 0.7),
    maxTokens: Number(selectedNode.data.maxTokens || 1000),
    systemPrompt: String(selectedNode.data.systemPrompt || '')
  } : {};

  const { 
    isLoading, 
    isConnected, 
    lastResult, 
    error, 
    testConnection, 
    testNode,
    streamResponse,
    clearError
  } = useOpenAI(openAIOptions);

  // Test connection on component mount
  useEffect(() => {
    if (selectedNode?.type === 'aiModel') {
      testConnection();
    }
  }, [selectedNode?.type, testConnection]);

  // Show error toasts
  useEffect(() => {
    if (error) {
      toast({
        title: "API Error",
        description: error,
        variant: "destructive",
      });
      clearError();
    }
  }, [error, toast, clearError]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleTestNode = async () => {
    if (!selectedNode || !testInput) return;
    
    if (selectedNode.type === 'aiModel') {
      // Real OpenAI API call
      const result = await testNode(testInput);
      if (result) {
        setTestOutput(`✅ Response from ${selectedNode.data.agentName || selectedNode.data.label}:

${result.output}

📊 Stats:
• Tokens: ${result.tokens}
• Cost: $${result.cost.toFixed(4)}
• Duration: ${result.duration}ms
• Model: ${result.model}`);

        toast({
          title: "Test Successful",
          description: `Response generated in ${result.duration}ms using ${result.tokens} tokens`,
        });
      }
    } else {
      // Fallback for non-AI nodes
      setTestOutput(`✅ Response from ${selectedNode.data.label}:\n\nProcessed: "${testInput}"\n\nThis is a simulated response for testing the node configuration.`);
    }
  };

  const handleStreamTest = async () => {
    if (!selectedNode || !testInput || selectedNode.type !== 'aiModel') return;
    
    setIsStreaming(true);
    setStreamOutput('');
    setTestOutput('');
    
    try {
      const stream = streamResponse(testInput, (chunk) => {
        setStreamOutput(prev => prev + chunk);
      });

      for await (const chunk of stream) {
        // Chunks are handled by the callback above
      }
      
      toast({
        title: "Streaming Complete",
        description: "Real-time response finished",
      });
    } catch (err) {
      toast({
        title: "Streaming Failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsStreaming(false);
    }
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

          {/* API Status for AI Models */}
          {selectedNode.type === 'aiModel' && (
            <>
              <PropertySection 
                id="api" 
                title="API Status" 
                description="OpenAI API connection and usage information"
                icon={Key}
              >
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/30">
                  <div className="flex items-center gap-3">
                    {isConnected === null ? (
                      <Wifi className="w-4 h-4 text-muted-foreground animate-pulse" />
                    ) : isConnected ? (
                      <Wifi className="w-4 h-4 text-green-500" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-destructive" />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {isConnected === null ? 'Testing connection...' :
                         isConnected ? 'Connected to OpenAI' : 'Connection failed'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isConnected === null ? 'Checking API key...' :
                         isConnected ? 'API key is valid' : 'Check your API configuration'}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={testConnection}
                    size="sm"
                    variant="outline"
                    disabled={isLoading}
                    className="text-xs"
                  >
                    {isLoading ? 'Testing...' : 'Test'}
                  </Button>
                </div>

                {lastResult && (
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-foreground">Last API Call Stats</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 p-2 bg-muted/10 rounded-lg">
                        <DollarSign className="w-3 h-3 text-green-500" />
                        <div>
                          <p className="text-xs font-medium">${lastResult.cost.toFixed(4)}</p>
                          <p className="text-xs text-muted-foreground">Cost</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted/10 rounded-lg">
                        <Clock className="w-3 h-3 text-blue-500" />
                        <div>
                          <p className="text-xs font-medium">{lastResult.duration}ms</p>
                          <p className="text-xs text-muted-foreground">Duration</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </PropertySection>

              <Separator className="bg-border/30" />

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
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
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

          {/* Node-specific Configuration */}
          {selectedNode.type === 'logic' && (
            <>
              <PropertySection 
                id="logic-config" 
                title="Logic Configuration" 
                description="Configure conditional logic and data processing rules"
                icon={GitBranch}
              >
                <FormField 
                  label="Logic Type" 
                  description="Select the type of logic operation"
                  required
                >
                  <Select
                    value={String(selectedNode.data.logicType || 'condition')}
                    onValueChange={(value) => onUpdateNode(selectedNode.id, { logicType: value })}
                  >
                    <SelectTrigger className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50">
                      <SelectValue placeholder="Select logic type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="condition">If/Then Condition</SelectItem>
                      <SelectItem value="switch">Switch/Case</SelectItem>
                      <SelectItem value="loop">Loop/Iterate</SelectItem>
                      <SelectItem value="filter">Data Filter</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                
                <FormField 
                  label="Condition Expression" 
                  description="Define the logic condition (e.g., input.value > 100)"
                >
                  <Textarea
                    value={String(selectedNode.data.condition || '')}
                    onChange={(e) => onUpdateNode(selectedNode.id, { condition: e.target.value })}
                    className="min-h-[60px] text-sm resize-none bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                    placeholder="input.value > 100 && input.status === 'active'"
                  />
                </FormField>
                
                <FormField 
                  label="True Output Path" 
                  description="Data transformation for true condition"
                >
                  <Input
                    value={String(selectedNode.data.trueOutput || '')}
                    onChange={(e) => onUpdateNode(selectedNode.id, { trueOutput: e.target.value })}
                    className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                    placeholder="Continue to next node"
                  />
                </FormField>
                
                <FormField 
                  label="False Output Path" 
                  description="Data transformation for false condition"
                >
                  <Input
                    value={String(selectedNode.data.falseOutput || '')}
                    onChange={(e) => onUpdateNode(selectedNode.id, { falseOutput: e.target.value })}
                    className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                    placeholder="Redirect to error handler"
                  />
                </FormField>
              </PropertySection>

              <Separator className="bg-border/30" />
            </>
          )}

          {selectedNode.type === 'integration' && (
            <>
              <PropertySection 
                id="integration-config" 
                title="Integration Configuration" 
                description="Configure external service connections and API settings"
                icon={Globe}
              >
                <FormField 
                  label="Service Type" 
                  description="Select the external service to integrate with"
                  required
                >
                  <Select
                    value={String(selectedNode.data.serviceType || 'api')}
                    onValueChange={(value) => onUpdateNode(selectedNode.id, { serviceType: value })}
                  >
                    <SelectTrigger className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api">REST API</SelectItem>
                      <SelectItem value="webhook">Webhook</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="file">File System</SelectItem>
                      <SelectItem value="email">Email Service</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                
                <FormField 
                  label="Endpoint URL" 
                  description="The complete URL for the API endpoint"
                  required
                >
                  <Input
                    value={String(selectedNode.data.endpoint || '')}
                    onChange={(e) => onUpdateNode(selectedNode.id, { endpoint: e.target.value })}
                    className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                    placeholder="https://api.example.com/v1/data"
                  />
                </FormField>
                
                <FormField 
                  label="HTTP Method" 
                  description="Select the HTTP method for API calls"
                >
                  <Select
                    value={String(selectedNode.data.method || 'GET')}
                    onValueChange={(value) => onUpdateNode(selectedNode.id, { method: value })}
                  >
                    <SelectTrigger className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                
                <FormField 
                  label="Authentication" 
                  description="API authentication configuration"
                >
                  <Textarea
                    value={String(selectedNode.data.auth || '')}
                    onChange={(e) => onUpdateNode(selectedNode.id, { auth: e.target.value })}
                    className="min-h-[60px] text-sm resize-none bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                    placeholder="Bearer token, API key, or other auth headers"
                  />
                </FormField>
                
                <FormField 
                  label="Request Headers" 
                  description="Additional headers to include in requests (JSON format)"
                >
                  <Textarea
                    value={String(selectedNode.data.headers || '')}
                    onChange={(e) => onUpdateNode(selectedNode.id, { headers: e.target.value })}
                    className="min-h-[60px] text-sm resize-none bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                    placeholder='{"Content-Type": "application/json", "X-Custom-Header": "value"}'
                  />
                </FormField>
              </PropertySection>

              <Separator className="bg-border/30" />
            </>
          )}

          {selectedNode.type === 'utility' && (
            <>
              <PropertySection 
                id="utility-config" 
                title="Utility Configuration" 
                description="Configure utility function parameters and behavior"
                icon={Settings}
              >
                <FormField 
                  label="Utility Type" 
                  description="Select the type of utility operation"
                  required
                >
                  <Select
                    value={String(selectedNode.data.utilityType || 'delay')}
                    onValueChange={(value) => onUpdateNode(selectedNode.id, { utilityType: value })}
                  >
                    <SelectTrigger className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50">
                      <SelectValue placeholder="Select utility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delay">Delay/Timer</SelectItem>
                      <SelectItem value="formatter">Data Formatter</SelectItem>
                      <SelectItem value="validator">Data Validator</SelectItem>
                      <SelectItem value="logger">Logger</SelectItem>
                      <SelectItem value="counter">Counter</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                
                <FormField 
                  label="Configuration" 
                  description="Utility-specific configuration parameters"
                >
                  <Textarea
                    value={String(selectedNode.data.config || '')}
                    onChange={(e) => onUpdateNode(selectedNode.id, { config: e.target.value })}
                    className="min-h-[70px] text-sm resize-none bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                    placeholder="Configuration parameters (JSON format or simple values)"
                  />
                </FormField>
                
                <FormField 
                  label="Output Format" 
                  description="Define how the output should be formatted"
                >
                  <Select
                    value={String(selectedNode.data.outputFormat || 'json')}
                    onValueChange={(value) => onUpdateNode(selectedNode.id, { outputFormat: value })}
                  >
                    <SelectTrigger className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="text">Plain Text</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xml">XML</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                
                <FormField 
                  label="Error Handling" 
                  description="Define how errors should be handled"
                >
                  <Select
                    value={String(selectedNode.data.errorHandling || 'stop')}
                    onValueChange={(value) => onUpdateNode(selectedNode.id, { errorHandling: value })}
                  >
                    <SelectTrigger className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stop">Stop Execution</SelectItem>
                      <SelectItem value="continue">Continue with Default</SelectItem>
                      <SelectItem value="retry">Retry Operation</SelectItem>
                      <SelectItem value="skip">Skip and Continue</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </PropertySection>

              <Separator className="bg-border/30" />
            </>
          )}

          {selectedNode.type === 'data' && (
            <>
              <PropertySection 
                id="data-config" 
                title="Data Source Configuration" 
                description="Configure data source connection and query parameters"
                icon={Database}
              >
                <FormField 
                  label="Data Source Type" 
                  description="Select the type of data source"
                  required
                >
                  <Select
                    value={String(selectedNode.data.sourceType || 'database')}
                    onValueChange={(value) => onUpdateNode(selectedNode.id, { sourceType: value })}
                  >
                    <SelectTrigger className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50">
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="file">File (CSV/JSON)</SelectItem>
                      <SelectItem value="api">API Endpoint</SelectItem>
                      <SelectItem value="memory">In-Memory Data</SelectItem>
                      <SelectItem value="stream">Data Stream</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                
                <FormField 
                  label="Connection String" 
                  description="Database connection string or file path"
                  required
                >
                  <Input
                    value={String(selectedNode.data.connectionString || '')}
                    onChange={(e) => onUpdateNode(selectedNode.id, { connectionString: e.target.value })}
                    className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                    placeholder="postgresql://user:pass@host:port/db or /path/to/file.csv"
                  />
                </FormField>
                
                <FormField 
                  label="Query/Filter" 
                  description="SQL query or data filter expression"
                >
                  <Textarea
                    value={String(selectedNode.data.query || '')}
                    onChange={(e) => onUpdateNode(selectedNode.id, { query: e.target.value })}
                    className="min-h-[70px] text-sm resize-none bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                    placeholder="SELECT * FROM users WHERE active = true"
                  />
                </FormField>
                
                <FormField 
                  label="Batch Size" 
                  description="Number of records to process at once"
                >
                  <Input
                    type="number"
                    min="1"
                    max="10000"
                    value={Number(selectedNode.data.batchSize || 100)}
                    onChange={(e) => onUpdateNode(selectedNode.id, { batchSize: parseInt(e.target.value) })}
                    className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                  />
                </FormField>
                
                <FormField 
                  label="Cache Duration" 
                  description="How long to cache results (in minutes)"
                >
                  <Input
                    type="number"
                    min="0"
                    max="1440"
                    value={Number(selectedNode.data.cacheDuration || 0)}
                    onChange={(e) => onUpdateNode(selectedNode.id, { cacheDuration: parseInt(e.target.value) })}
                    className="h-9 text-sm bg-workspace-secondary/30 border-border/50 focus:border-primary/50"
                    placeholder="0 = no cache"
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
            
            <div className="flex gap-2">
              <Button
                onClick={handleTestNode}
                disabled={!testInput || isLoading}
                className={`
                  flex-1 h-9 text-sm transition-all duration-200
                  ${isLoading ? 'animate-pulse' : 'hover:scale-[1.02]'}
                `}
                variant="outline"
              >
                {isLoading ? (
                  <>Testing...</>
                ) : (
                  <>
                    <Play className="w-3 h-3 mr-2" />
                    Test Node
                  </>
                )}
              </Button>
              
              {selectedNode?.type === 'aiModel' && (
                <Button
                  onClick={handleStreamTest}
                  disabled={!testInput || isStreaming}
                  className={`
                    flex-1 h-9 text-sm transition-all duration-200
                    ${isStreaming ? 'animate-pulse' : 'hover:scale-[1.02]'}
                  `}
                  variant="outline"
                >
                  {isStreaming ? (
                    <>Streaming...</>
                  ) : (
                    <>
                      <Zap className="w-3 h-3 mr-2" />
                      Stream
                    </>
                  )}
                </Button>
              )}
            </div>
            
            {(testOutput || streamOutput) && (
              <FormField 
                label={isStreaming ? "Live Response Stream" : "Test Output"} 
                description={isStreaming ? "Real-time AI response" : "Results from your test input"}
              >
                <div className="p-4 bg-muted/50 rounded-lg border border-border/30">
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                    {isStreaming ? streamOutput : testOutput}
                    {isStreaming && <span className="animate-pulse">|</span>}
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