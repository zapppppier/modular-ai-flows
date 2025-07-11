import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Bot, Workflow, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-workspace via-workspace-secondary to-workspace flex items-center justify-center">
      <div className="text-center space-y-8 max-w-4xl mx-auto px-6">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <Zap className="w-12 h-12 text-primary" />
              <div className="absolute inset-0 animate-pulse bg-primary/20 rounded-full blur-xl"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Flow Builder
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Build powerful AI agent workflows with visual drag-and-drop simplicity. 
            Connect any AI model, create complex logic flows, and automate intelligent processes.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6 space-y-4 hover:shadow-glow transition-all duration-300">
            <Bot className="w-8 h-8 text-openai mx-auto" />
            <h3 className="text-lg font-semibold">Multi-Model Support</h3>
            <p className="text-sm text-muted-foreground">
              Connect GPT-4, Claude, Gemini, Grok, and more in a single workflow
            </p>
          </div>
          
          <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6 space-y-4 hover:shadow-glow transition-all duration-300">
            <Workflow className="w-8 h-8 text-primary mx-auto" />
            <h3 className="text-lg font-semibold">Visual Workflow Builder</h3>
            <p className="text-sm text-muted-foreground">
              Intuitive drag-and-drop interface inspired by n8n for complex logic flows
            </p>
          </div>
          
          <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6 space-y-4 hover:shadow-glow transition-all duration-300">
            <Zap className="w-8 h-8 text-gemini mx-auto" />
            <h3 className="text-lg font-semibold">Smart Automation</h3>
            <p className="text-sm text-muted-foreground">
              Create intelligent agents that reason, process, and act autonomously
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Button 
            size="lg" 
            onClick={() => navigate('/workspace')}
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-glow"
          >
            Launch Workspace
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Start building your first AI workflow in seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
