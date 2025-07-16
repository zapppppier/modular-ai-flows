import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Minimize2, Maximize2, MessageSquare } from 'lucide-react';
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
  isOpen: boolean;
  onToggle: () => void;
}

export function AIAssistant({ onGenerateWorkflow, isOpen, onToggle }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI Workflow Assistant. Describe the automation you want to build and I'll create the perfect workflow for you. For example: 'Send a Slack message when I receive an email from my boss' or 'Save new Google Sheets rows to a database'.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Workflow Assistant
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Describe your automation..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">Email workflows</Badge>
          <Badge variant="secondary" className="text-xs">API integrations</Badge>
          <Badge variant="secondary" className="text-xs">Data processing</Badge>
        </div>
      </CardContent>
    </Card>
  );
}