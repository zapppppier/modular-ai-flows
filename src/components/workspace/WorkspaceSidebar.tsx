import { useState } from 'react';
import { 
  Bot, 
  Brain, 
  Code, 
  FileText, 
  Image, 
  Database, 
  GitBranch,
  ChevronDown,
  ChevronRight,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface NodeTemplate {
  id: string;
  type: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  model?: string;
  color: string;
}

const nodeTemplates: { [key: string]: NodeTemplate[] } = {
  'AI Models': [
    {
      id: 'openai-gpt4',
      type: 'aiModel',
      label: 'GPT-4',
      description: 'OpenAI\'s most capable model',
      icon: Bot,
      model: 'openai',
      color: 'hsl(var(--openai))',
    },
    {
      id: 'claude-3',
      type: 'aiModel',
      label: 'Claude 3',
      description: 'Anthropic\'s advanced reasoning model',
      icon: Brain,
      model: 'claude',
      color: 'hsl(var(--claude))',
    },
    {
      id: 'gemini-pro',
      type: 'aiModel',
      label: 'Gemini Pro',
      description: 'Google\'s multimodal AI',
      icon: Bot,
      model: 'gemini',
      color: 'hsl(var(--gemini))',
    },
    {
      id: 'grok',
      type: 'aiModel',
      label: 'Grok',
      description: 'xAI\'s conversational AI',
      icon: Bot,
      model: 'grok',
      color: 'hsl(var(--grok))',
    },
    {
      id: 'deepseek',
      type: 'aiModel',
      label: 'DeepSeek',
      description: 'Advanced reasoning model',
      icon: Brain,
      model: 'deepseek',
      color: 'hsl(var(--deepseek))',
    },
  ],
  'Processing': [
    {
      id: 'text-processor',
      type: 'aiModel',
      label: 'Text Processor',
      description: 'Process and analyze text content',
      icon: FileText,
      color: 'hsl(var(--node-text))',
    },
    {
      id: 'code-generator',
      type: 'aiModel',
      label: 'Code Generator',
      description: 'Generate and review code',
      icon: Code,
      color: 'hsl(var(--node-code))',
    },
    {
      id: 'image-analyzer',
      type: 'aiModel',
      label: 'Image Analyzer',
      description: 'Analyze and describe images',
      icon: Image,
      color: 'hsl(var(--node-image))',
    },
  ],
  'Logic': [
    {
      id: 'condition',
      type: 'logic',
      label: 'Condition',
      description: 'Conditional branching logic',
      icon: GitBranch,
      color: 'hsl(var(--node-logic))',
    },
    {
      id: 'data-store',
      type: 'logic',
      label: 'Data Store',
      description: 'Store and retrieve data',
      icon: Database,
      color: 'hsl(var(--node-data))',
    },
  ],
};

interface WorkspaceSidebarProps {
  onAddNode: (nodeData: any) => void;
}

export const WorkspaceSidebar = ({ onAddNode }: WorkspaceSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSections, setOpenSections] = useState<string[]>(['AI Models']);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const filteredTemplates = Object.entries(nodeTemplates).reduce((acc, [section, templates]) => {
    const filtered = templates.filter(template =>
      template.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[section] = filtered;
    }
    return acc;
  }, {} as typeof nodeTemplates);

  return (
    <div className="workspace-sidebar flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold mb-3 text-foreground">Node Library</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-8 text-sm"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {Object.entries(filteredTemplates).map(([section, templates]) => (
            <Collapsible
              key={section}
              open={openSections.includes(section)}
              onOpenChange={() => toggleSection(section)}
              className="mb-2"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-2 h-auto text-sm font-medium"
                >
                  {section}
                  {openSections.includes(section) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-1 pl-2">
                {templates.map((template) => {
                  const IconComponent = template.icon;
                  return (
                    <div
                      key={template.id}
                      className="group p-3 rounded-lg border border-border bg-card hover:bg-accent cursor-grab active:cursor-grabbing transition-colors"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/reactflow', JSON.stringify(template));
                        e.dataTransfer.effectAllowed = 'move';
                      }}
                      onClick={() => onAddNode(template)}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${template.color}20`, color: template.color }}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground group-hover:text-accent-foreground">
                            {template.label}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1 leading-tight">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};