import { useState } from 'react';
import { 
  FileText, 
  Code, 
  Image, 
  Database, 
  GitBranch,
  ChevronDown,
  ChevronRight,
  Search,
  MessageSquare,
  Hash,
  TableProperties,
  Webhook,
  Mail,
  MessageCircle,
  Phone,
  FolderOpen,
  Cloud,
  HardDrive,
  Users,
  Target,
  Zap,
  Clock,
  Pause,
  Globe,
  FileJson,
  Calendar,
  Filter,
  Calculator,
  Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Import brand logos
import openaiLogo from '@/assets/logos/openai-logo.png';
import claudeLogo from '@/assets/logos/claude-logo.png';
import geminiLogo from '@/assets/logos/gemini-logo.png';
import grokLogo from '@/assets/logos/grok-logo.png';
import deepseekLogo from '@/assets/logos/deepseek-logo.png';
import slackLogo from '@/assets/logos/slack-logo.svg';
import discordLogo from '@/assets/logos/discord-logo.png';
import notionLogo from '@/assets/logos/notion-logo.png';
import gmailLogo from '@/assets/logos/gmail-logo.svg';
import teamsLogo from '@/assets/logos/teams-logo.svg';
import twilioLogo from '@/assets/logos/twilio-logo.svg';
import hubspotLogo from '@/assets/logos/hubspot-logo.svg';
import googleDriveLogo from '@/assets/logos/google-drive-logo.svg';
import dropboxLogo from '@/assets/logos/dropbox-logo.svg';
import githubLogo from '@/assets/logos/github-logo.png';
import stripeLogo from '@/assets/logos/stripe-logo.svg';
import shopifyLogo from '@/assets/logos/shopify-logo.svg';
import asanaLogo from '@/assets/logos/asana-logo.svg';
import facebookLogo from '@/assets/logos/facebook-logo.png';
import twitterLogo from '@/assets/logos/twitter-logo.png';

interface NodeTemplate {
  id: string;
  type: string;
  label: string;
  description: string;
  icon?: React.ComponentType<any>;
  logo?: string;
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
      logo: openaiLogo,
      model: 'openai',
      color: 'hsl(var(--openai))',
    },
    {
      id: 'claude-3',
      type: 'aiModel',
      label: 'Claude 3',
      description: 'Anthropic\'s advanced reasoning model',
      logo: claudeLogo,
      model: 'claude',
      color: 'hsl(var(--claude))',
    },
    {
      id: 'gemini-pro',
      type: 'aiModel',
      label: 'Gemini Pro',
      description: 'Google\'s multimodal AI',
      logo: geminiLogo,
      model: 'gemini',
      color: 'hsl(var(--gemini))',
    },
    {
      id: 'grok',
      type: 'aiModel',
      label: 'Grok',
      description: 'xAI\'s conversational AI',
      logo: grokLogo,
      model: 'grok',
      color: 'hsl(var(--grok))',
    },
    {
      id: 'deepseek',
      type: 'aiModel',
      label: 'DeepSeek',
      description: 'Advanced reasoning model',
      logo: deepseekLogo,
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
  'Integrations': [
    {
      id: 'slack-integration',
      type: 'integration',
      label: 'Slack',
      description: 'Send messages and manage Slack channels',
      logo: slackLogo,
      color: 'hsl(142, 71%, 45%)',
    },
    {
      id: 'discord-integration',
      type: 'integration',
      label: 'Discord',
      description: 'Post messages and manage Discord servers',
      logo: discordLogo,
      color: 'hsl(227, 58%, 65%)',
    },
    {
      id: 'notion-integration',
      type: 'integration',
      label: 'Notion',
      description: 'Create and update Notion pages and databases',
      logo: notionLogo,
      color: 'hsl(0, 0%, 0%)',
    },
    {
      id: 'airtable-integration',
      type: 'integration',
      label: 'Airtable',
      description: 'Manage Airtable bases and records',
      icon: TableProperties,
      color: 'hsl(32, 100%, 50%)',
    },
    {
      id: 'webhook-integration',
      type: 'integration',
      label: 'Webhook',
      description: 'Trigger external webhooks and APIs',
      icon: Webhook,
      color: 'hsl(var(--node-integration))',
    },
  ],
  'Communication': [
    {
      id: 'gmail-integration',
      type: 'integration',
      label: 'Gmail',
      description: 'Send and receive emails via Gmail',
      logo: gmailLogo,
      color: 'hsl(4, 90%, 58%)',
    },
    {
      id: 'teams-integration',
      type: 'integration',
      label: 'Microsoft Teams',
      description: 'Send messages to Teams channels',
      logo: teamsLogo,
      color: 'hsl(221, 100%, 49%)',
    },
    {
      id: 'twilio-integration',
      type: 'integration',
      label: 'Twilio',
      description: 'Send SMS and make phone calls',
      logo: twilioLogo,
      color: 'hsl(0, 78%, 52%)',
    },
  ],
  'Data Sources': [
    {
      id: 'mysql-database',
      type: 'data',
      label: 'MySQL',
      description: 'Connect to MySQL databases',
      icon: Database,
      color: 'hsl(29, 100%, 50%)',
    },
    {
      id: 'postgresql-database',
      type: 'data',
      label: 'PostgreSQL',
      description: 'Connect to PostgreSQL databases',
      icon: Database,
      color: 'hsl(207, 100%, 44%)',
    },
    {
      id: 'google-sheets',
      type: 'data',
      label: 'Google Sheets',
      description: 'Read and write Google Sheets data',
      icon: TableProperties,
      color: 'hsl(123, 100%, 35%)',
    },
    {
      id: 'rest-api',
      type: 'data',
      label: 'REST API',
      description: 'Make HTTP requests to REST APIs',
      icon: Globe,
      color: 'hsl(var(--node-data))',
    },
  ],
  'File & Storage': [
    {
      id: 'google-drive',
      type: 'integration',
      label: 'Google Drive',
      description: 'Upload and manage Google Drive files',
      logo: googleDriveLogo,
      color: 'hsl(220, 100%, 50%)',
    },
    {
      id: 'dropbox-integration',
      type: 'integration',
      label: 'Dropbox',
      description: 'Sync and manage Dropbox files',
      logo: dropboxLogo,
      color: 'hsl(207, 100%, 50%)',
    },
    {
      id: 'aws-s3',
      type: 'integration',
      label: 'AWS S3',
      description: 'Upload and manage S3 bucket files',
      icon: HardDrive,
      color: 'hsl(29, 100%, 48%)',
    },
  ],
  'Marketing': [
    {
      id: 'hubspot-integration',
      type: 'integration',
      label: 'HubSpot',
      description: 'Manage CRM contacts and deals',
      logo: hubspotLogo,
      color: 'hsl(13, 100%, 50%)',
    },
    {
      id: 'mailchimp-integration',
      type: 'integration',
      label: 'Mailchimp',
      description: 'Manage email campaigns and subscribers',
      icon: Target,
      color: 'hsl(49, 100%, 50%)',
    },
    {
      id: 'zapier-integration',
      type: 'integration',
      label: 'Zapier',
      description: 'Trigger Zapier workflows',
      icon: Zap,
      color: 'hsl(29, 100%, 50%)',
    },
    {
      id: 'facebook-integration',
      type: 'integration',
      label: 'Facebook',
      description: 'Post to Facebook pages and groups',
      logo: facebookLogo,
      color: 'hsl(221, 44%, 41%)',
    },
    {
      id: 'twitter-integration',
      type: 'integration',
      label: 'Twitter/X',
      description: 'Post tweets and manage Twitter account',
      logo: twitterLogo,
      color: 'hsl(0, 0%, 0%)',
    },
  ],
  'Utilities': [
    {
      id: 'schedule-trigger',
      type: 'utility',
      label: 'Schedule',
      description: 'Trigger workflows on a schedule',
      icon: Calendar,
      color: 'hsl(var(--node-utility))',
    },
    {
      id: 'wait-node',
      type: 'utility',
      label: 'Wait',
      description: 'Add delays to your workflow',
      icon: Clock,
      color: 'hsl(var(--node-utility))',
    },
    {
      id: 'http-request',
      type: 'utility',
      label: 'HTTP Request',
      description: 'Make custom HTTP requests',
      icon: Globe,
      color: 'hsl(var(--node-utility))',
    },
    {
      id: 'json-parser',
      type: 'utility',
      label: 'JSON Parser',
      description: 'Parse and transform JSON data',
      icon: FileJson,
      color: 'hsl(var(--node-utility))',
    },
    {
      id: 'data-filter',
      type: 'utility',
      label: 'Filter',
      description: 'Filter data based on conditions',
      icon: Filter,
      color: 'hsl(var(--node-utility))',
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
    {
      id: 'loop',
      type: 'logic',
      label: 'Loop',
      description: 'Iterate over collections of data',
      icon: Workflow,
      color: 'hsl(var(--node-logic))',
    },
    {
      id: 'math-operation',
      type: 'logic',
      label: 'Math',
      description: 'Perform mathematical calculations',
      icon: Calculator,
      color: 'hsl(var(--node-logic))',
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
                          style={{ 
                            backgroundColor: template.logo ? '#ffffff' : `${template.color}20`, 
                            color: template.color,
                            border: `1px solid ${template.color}40`
                          }}
                        >
                          {template.logo ? (
                            <img 
                              src={template.logo} 
                              alt={`${template.label} logo`}
                              className="w-6 h-6 object-contain"
                            />
                          ) : (
                            IconComponent && <IconComponent className="w-4 h-4" />
                          )}
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