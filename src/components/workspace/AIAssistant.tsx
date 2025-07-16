import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bot, Send, Sparkles, MessageSquare, Lightbulb, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface WorkflowSuggestion {
  description: string;
  nodes: Array<{
    type: string;
    label: string;
    data: any;
    position: { x: number; y: number };
  }>;
  connections: Array<{
    source: string;
    target: string;
  }>;
}

interface AIAssistantProps {
  onGenerateWorkflow: (suggestion: WorkflowSuggestion) => void;
}

export function AIAssistant({ onGenerateWorkflow }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI Workflow Assistant 🤖\n\nI can help you build powerful automations from simple descriptions. Just tell me what you want to automate and I'll create the perfect workflow for you!\n\n✨ Try asking me:\n• \"Send a Slack message when I get an email from my boss\"\n• \"Save new Google Sheets rows to a database\"\n• \"Process uploaded files and store metadata\"\n• \"Create a webhook that validates and responds to data\"",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const quickActions = [
    { label: "Email to Slack", prompt: "Send a Slack message when I receive an email from my boss", icon: Zap },
    { label: "Sheets to DB", prompt: "Save new Google Sheets rows to a database", icon: Lightbulb },
    { label: "File Processing", prompt: "Process uploaded files and store their metadata", icon: Sparkles },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseWorkflowRequest = (userInput: string): WorkflowSuggestion | null => {
    const input = userInput.toLowerCase();
    
    // Email-based workflows
    if (input.includes('email') && input.includes('slack')) {
      return {
        description: "Email to Slack notification workflow",
        nodes: [
          {
            type: 'integration',
            label: 'Gmail Trigger',
            data: { 
              integrationType: 'gmail',
              label: 'Gmail Trigger',
              config: { triggerType: 'new_email', filters: ['from:boss'] }
            },
            position: { x: 100, y: 100 }
          },
          {
            type: 'logic',
            label: 'Filter Email',
            data: { 
              logicType: 'condition',
              label: 'Filter Email',
              config: { conditions: [{ field: 'from', operator: 'contains', value: 'boss' }] }
            },
            position: { x: 350, y: 100 }
          },
          {
            type: 'integration',
            label: 'Send to Slack',
            data: { 
              integrationType: 'slack',
              label: 'Send to Slack',
              config: { channel: '#notifications', message: 'New email from {{sender}}' }
            },
            position: { x: 600, y: 100 }
          }
        ],
        connections: [
          { source: '0', target: '1' },
          { source: '1', target: '2' }
        ]
      };
    }

    // Google Sheets to Database
    if (input.includes('google sheets') && input.includes('database')) {
      return {
        description: "Google Sheets to Database sync",
        nodes: [
          {
            type: 'integration',
            label: 'Sheets Trigger',
            data: { 
              integrationType: 'google-sheets',
              label: 'Sheets Trigger',
              config: { spreadsheetId: '', worksheet: 'Sheet1', triggerType: 'new_row' }
            },
            position: { x: 100, y: 100 }
          },
          {
            type: 'utility',
            label: 'Format Data',
            data: { 
              utilityType: 'data-formatter',
              label: 'Format Data',
              config: { transformations: [{ field: 'date', format: 'ISO' }] }
            },
            position: { x: 350, y: 100 }
          },
          {
            type: 'data',
            label: 'Save to Database',
            data: { 
              dataType: 'database',
              label: 'Save to Database',
              config: { table: 'users', operation: 'insert' }
            },
            position: { x: 600, y: 100 }
          }
        ],
        connections: [
          { source: '0', target: '1' },
          { source: '1', target: '2' }
        ]
      };
    }

    // Webhook workflows
    if (input.includes('webhook') || input.includes('api')) {
      return {
        description: "Webhook processing workflow",
        nodes: [
          {
            type: 'integration',
            label: 'Webhook Receiver',
            data: { 
              integrationType: 'webhook',
              label: 'Webhook Receiver',
              config: { endpoint: '/webhook', method: 'POST' }
            },
            position: { x: 100, y: 100 }
          },
          {
            type: 'logic',
            label: 'Validate Data',
            data: { 
              logicType: 'condition',
              label: 'Validate Data',
              config: { schema: { required: ['email', 'name'] } }
            },
            position: { x: 350, y: 100 }
          },
          {
            type: 'integration',
            label: 'Send Response',
            data: { 
              integrationType: 'api',
              label: 'Send Response',
              config: { endpoint: '', method: 'POST', responseFormat: 'json' }
            },
            position: { x: 600, y: 100 }
          }
        ],
        connections: [
          { source: '0', target: '1' },
          { source: '1', target: '2' }
        ]
      };
    }

    // File processing
    if (input.includes('file') || input.includes('upload')) {
      return {
        description: "File processing workflow",
        nodes: [
          {
            type: 'integration',
            label: 'File Upload',
            data: { 
              integrationType: 'file-storage',
              label: 'File Upload',
              config: { allowedTypes: ['.pdf', '.jpg', '.png'], maxSize: '10MB' }
            },
            position: { x: 100, y: 100 }
          },
          {
            type: 'utility',
            label: 'Process File',
            data: { 
              utilityType: 'file-processor',
              label: 'Process File',
              config: { operations: ['compress', 'validate'] }
            },
            position: { x: 350, y: 100 }
          },
          {
            type: 'data',
            label: 'Store Metadata',
            data: { 
              dataType: 'database',
              label: 'Store Metadata',
              config: { table: 'files', fields: ['name', 'size', 'type'] }
            },
            position: { x: 600, y: 100 }
          }
        ],
        connections: [
          { source: '0', target: '1' },
          { source: '1', target: '2' }
        ]
      };
    }

    return null;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Parse the workflow request
      const suggestion = parseWorkflowRequest(input);
      
      if (suggestion) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Great! I've analyzed your request and created a "${suggestion.description}" workflow with ${suggestion.nodes.length} nodes. This workflow will ${suggestion.description.toLowerCase()}. Would you like me to generate this workflow on your canvas?`,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Auto-generate the workflow after a short delay
        setTimeout(() => {
          onGenerateWorkflow(suggestion);
          toast({
            title: "Workflow Generated",
            description: `Created ${suggestion.nodes.length} nodes for your automation.`,
          });
        }, 1500);

      } else {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I understand you want to build an automation, but I need more details. Try describing it like: 'When [trigger] happens, do [action]'. For example: 'When I get an email from support@company.com, create a task in my project management tool.'",
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-workspace border-r border-border/50">
      
      {/* Quick Action Buttons */}
      <div className="px-4 py-2 space-y-1">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className="w-full justify-start h-auto py-2 px-3 text-left hover:bg-accent/50 transition-all duration-200"
            onClick={() => {
              setInput(action.prompt);
              handleSendMessage();
            }}
          >
            <action.icon className="h-3 w-3 mr-2 text-primary/70 shrink-0" />
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      <Separator />
      
      {/* Chat Messages */}
      <ScrollArea className="flex-1 px-3 py-3">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-3 max-w-[85%]">
                {message.role === 'assistant' && (
                  <div className="flex items-center justify-center w-7 h-7 bg-gradient-to-br from-primary to-primary/70 rounded-lg shrink-0 mt-1">
                    <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-accent/50 text-accent-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                  <p className="text-xs opacity-60 mt-2">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-7 h-7 bg-gradient-to-br from-primary to-primary/70 rounded-lg">
                  <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <div className="bg-accent/50 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input Area */}
      <div className="p-3 border-t border-border/50 bg-workspace">
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="Describe the automation you want to build..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1 h-10 px-3 text-sm bg-background border-border/50 focus:border-primary/50 transition-all duration-200"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            size="icon"
            className="h-10 w-10 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Tags */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-xs px-2 py-1">
            <MessageSquare className="h-3 w-3 mr-1" />
            Email
          </Badge>
          <Badge variant="secondary" className="text-xs px-2 py-1">
            <Zap className="h-3 w-3 mr-1" />
            Webhooks
          </Badge>
          <Badge variant="secondary" className="text-xs px-2 py-1">
            <Sparkles className="h-3 w-3 mr-1" />
            Data
          </Badge>
        </div>
      </div>
    </div>
  );
}