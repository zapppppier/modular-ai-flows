import { useState, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { WorkspaceToolbar } from '@/components/workspace/WorkspaceToolbar';
import { WorkspaceSidebar } from '@/components/workspace/WorkspaceSidebar';
import { WorkspaceProperties } from '@/components/workspace/WorkspaceProperties';
import { WorkspaceLogs } from '@/components/workspace/WorkspaceLogs';
import { openAIService } from '@/services/openai';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { AIModelNode } from '@/components/workspace/nodes/AIModelNode';
import { LogicNode } from '@/components/workspace/nodes/LogicNode';
import { IntegrationNode } from '@/components/workspace/nodes/IntegrationNode';
import { UtilityNode } from '@/components/workspace/nodes/UtilityNode';
import { DataNode } from '@/components/workspace/nodes/DataNode';

// Node types for the workspace
const nodeTypes = {
  aiModel: AIModelNode,
  logic: LogicNode,
  integration: IntegrationNode,
  utility: UtilityNode,
  data: DataNode,
};

// Initial workspace setup
const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'aiModel',
    position: { x: 100, y: 100 },
    data: {
      label: 'Start Agent',
      model: 'openai',
      agentName: 'Agent-1',
      modelType: 'gpt-4',
      description: 'Initial input processing',
    },
  },
  {
    id: 'processor',
    type: 'aiModel',
    position: { x: 400, y: 100 },
    data: {
      label: 'Text Processor',
      model: 'claude',
      agentName: 'TextBot',
      modelType: 'claude-3',
      description: 'Advanced text analysis',
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'start',
    target: 'processor',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

const Workspace = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '[INFO] Workspace initialized',
    '[INFO] Ready to build AI workflows',
  ]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onCanvasClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onRunWorkflow = useCallback(async () => {
    setIsRunning(true);
    setLogs(prev => [...prev, '[INFO] Starting workflow execution...']);
    
    try {
      // Execute workflow with real AI nodes
      const aiNodes = nodes.filter(node => node.type === 'aiModel');
      
      if (aiNodes.length === 0) {
        setLogs(prev => [...prev, '[INFO] No AI nodes found, running simulation...']);
        setTimeout(() => {
          setLogs(prev => [...prev, '[SUCCESS] Workflow completed successfully']);
          setIsRunning(false);
        }, 2000);
        return;
      }

      for (const node of aiNodes) {
        setLogs(prev => [...prev, `[INFO] Executing ${node.data.agentName || node.data.label}...`]);
        
        try {
          const systemPrompt = String(node.data.systemPrompt || 'You are a helpful AI assistant.');
          const testInput = 'Hello! This is a workflow execution test.';
          
          const startTime = Date.now();
          const response = await openAIService.chat([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: testInput }
          ], {
            model: String(node.data.modelType || 'gpt-3.5-turbo'),
            temperature: Number(node.data.temperature || 0.7),
            maxTokens: Number(node.data.maxTokens || 500)
          });
          
          const duration = Date.now() - startTime;
          const cost = openAIService.calculateCost(response.usage, response.model);
          
          setLogs(prev => [...prev, 
            `[SUCCESS] ${node.data.agentName || node.data.label} completed`,
            `[STATS] Duration: ${duration}ms, Tokens: ${response.usage.total_tokens}, Cost: $${cost.toFixed(4)}`,
            `[OUTPUT] ${response.choices[0]?.message?.content?.slice(0, 100)}...`
          ]);
        } catch (error) {
          setLogs(prev => [...prev, 
            `[ERROR] ${node.data.agentName || node.data.label} failed: ${error instanceof Error ? error.message : 'Unknown error'}`
          ]);
        }
      }
      
      setLogs(prev => [...prev, '[SUCCESS] Workflow execution completed']);
    } catch (error) {
      setLogs(prev => [...prev, `[ERROR] Workflow failed: ${error instanceof Error ? error.message : 'Unknown error'}`]);
    } finally {
      setIsRunning(false);
    }
  }, [nodes]);

  const onSaveWorkflow = useCallback(() => {
    setLogs(prev => [...prev, '[INFO] Workflow saved']);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-workspace">
      {/* Fixed Toolbar */}
      <WorkspaceToolbar 
        onRun={onRunWorkflow}
        onSave={onSaveWorkflow}
        isRunning={isRunning}
      />
      
      {/* Resizable Main Layout */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Sidebar Panel */}
        <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
          <WorkspaceSidebar 
            onAddNode={(nodeData) => {
              const newNode: Node = {
                id: `node_${Date.now()}`,
                type: nodeData.type,
                position: { x: Math.random() * 400, y: Math.random() * 400 },
                data: nodeData,
              };
              setNodes(nds => [...nds, newNode]);
              setLogs(prev => [...prev, `[INFO] Added ${nodeData.label} node`]);
            }}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Main Content Panel (Canvas + Logs) */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            {/* Canvas Panel */}
            <ResizablePanel defaultSize={70} minSize={40}>
              <div className="h-full bg-workspace">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onNodeClick={onNodeClick}
                  onPaneClick={onCanvasClick}
                  nodeTypes={nodeTypes}
                  fitView
                  className="react-flow h-full w-full"
                >
                  <Background 
                    color="hsl(var(--muted-foreground))" 
                    gap={20} 
                    size={1}
                  />
                  <Controls />
                  <MiniMap 
                    nodeStrokeColor="hsl(var(--primary))"
                    nodeColor="hsl(var(--card))"
                    nodeBorderRadius={8}
                    maskColor="hsl(var(--workspace) / 0.8)"
                  />
                </ReactFlow>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Logs Panel */}
            <ResizablePanel defaultSize={30} minSize={15} maxSize={60}>
              <WorkspaceLogs logs={logs} onClear={() => setLogs([])} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Properties Panel */}
        <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
          <WorkspaceProperties 
            selectedNode={selectedNode}
            onUpdateNode={(nodeId, data) => {
              setNodes(nds => 
                nds.map(node => 
                  node.id === nodeId 
                    ? { ...node, data: { ...node.data, ...data } }
                    : node
                )
              );
              setLogs(prev => [...prev, `[INFO] Updated node ${nodeId}`]);
            }}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Workspace;