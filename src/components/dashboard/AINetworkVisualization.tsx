import { useCallback, useState, useEffect } from 'react';
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
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network, Eye, Cpu, Target, Zap, Shield, Server, Database, Globe } from "lucide-react";

const initialNodes: Node[] = [
  // Input Sources
  {
    id: 'satellite',
    type: 'input',
    position: { x: 50, y: 50 },
    data: { label: '🛰️ Satellite Data' },
    style: { background: '#E3F2FD', border: '2px solid #2196F3' }
  },
  {
    id: 'iot',
    type: 'input', 
    position: { x: 50, y: 150 },
    data: { label: '📡 IoT Sensors' },
    style: { background: '#E8F5E8', border: '2px solid #4CAF50' }
  },
  {
    id: 'weather',
    type: 'input',
    position: { x: 50, y: 250 },
    data: { label: '🌤️ Weather APIs' },
    style: { background: '#FFF3E0', border: '2px solid #FF9800' }
  },

  // AI Agents
  {
    id: 'watchtower',
    position: { x: 300, y: 50 },
    data: { 
      label: (
        <div className="flex flex-col items-center gap-1">
          <Eye className="h-5 w-5 text-blue-600" />
          <span className="text-xs font-medium">Watchtower</span>
          <Badge variant="secondary" className="text-xs">Active</Badge>
        </div>
      )
    },
    style: { background: '#F3E5F5', border: '2px solid #9C27B0', width: 120, height: 80 }
  },
  {
    id: 'oracle',
    position: { x: 450, y: 50 },
    data: { 
      label: (
        <div className="flex flex-col items-center gap-1">
          <Cpu className="h-5 w-5 text-purple-600" />
          <span className="text-xs font-medium">Oracle</span>
          <Badge variant="outline" className="text-xs">Analyzing</Badge>
        </div>
      )
    },
    style: { background: '#F3E5F5', border: '2px solid #673AB7', width: 120, height: 80 }
  },
  {
    id: 'diplomat',
    position: { x: 375, y: 200 },
    data: { 
      label: (
        <div className="flex flex-col items-center gap-1">
          <Target className="h-5 w-5 text-green-600" />
          <span className="text-xs font-medium">Diplomat</span>
          <Badge variant="secondary" className="text-xs">Ready</Badge>
        </div>
      )
    },
    style: { background: '#E8F5E8', border: '2px solid #4CAF50', width: 120, height: 80 }
  },
  {
    id: 'commander',
    position: { x: 300, y: 350 },
    data: { 
      label: (
        <div className="flex flex-col items-center gap-1">
          <Zap className="h-5 w-5 text-orange-600" />
          <span className="text-xs font-medium">Commander</span>
          <Badge variant="secondary" className="text-xs">Idle</Badge>
        </div>
      )
    },
    style: { background: '#FFF3E0', border: '2px solid #FF9800', width: 120, height: 80 }
  },
  {
    id: 'guardian',
    position: { x: 450, y: 350 },
    data: { 
      label: (
        <div className="flex flex-col items-center gap-1">
          <Shield className="h-5 w-5 text-red-600" />
          <span className="text-xs font-medium">Guardian</span>
          <Badge variant="secondary" className="text-xs">Monitoring</Badge>
        </div>
      )
    },
    style: { background: '#FFEBEE', border: '2px solid #F44336', width: 120, height: 80 }
  },

  // Processing Center
  {
    id: 'processing',
    position: { x: 650, y: 200 },
    data: { 
      label: (
        <div className="flex flex-col items-center gap-1">
          <Server className="h-6 w-6 text-blue-600" />
          <span className="text-sm font-medium">Processing Hub</span>
          <div className="text-xs text-muted-foreground">Neural Network</div>
        </div>
      )
    },
    style: { background: '#E3F2FD', border: '2px solid #2196F3', width: 140, height: 100 }
  },

  // Output Systems
  {
    id: 'dashboard',
    type: 'output',
    position: { x: 850, y: 150 },
    data: { label: '📊 Dashboard' },
    style: { background: '#F3E5F5', border: '2px solid #9C27B0' }
  },
  {
    id: 'alerts',
    type: 'output',
    position: { x: 850, y: 250 },
    data: { label: '🚨 Alert System' },
    style: { background: '#FFEBEE', border: '2px solid #F44336' }
  },
  {
    id: 'automation',
    type: 'output',
    position: { x: 850, y: 350 },
    data: { label: '⚡ Automation' },
    style: { background: '#FFF3E0', border: '2px solid #FF9800' }
  }
];

const initialEdges: Edge[] = [
  // Input to Agents
  { id: 'e1', source: 'satellite', target: 'watchtower', animated: true, style: { stroke: '#2196F3' } },
  { id: 'e2', source: 'iot', target: 'watchtower', animated: true, style: { stroke: '#4CAF50' } },
  { id: 'e3', source: 'weather', target: 'oracle', animated: true, style: { stroke: '#FF9800' } },

  // Agent interactions
  { id: 'e4', source: 'watchtower', target: 'oracle', animated: true, style: { stroke: '#9C27B0' } },
  { id: 'e5', source: 'oracle', target: 'diplomat', animated: true, style: { stroke: '#673AB7' } },
  { id: 'e6', source: 'diplomat', target: 'commander', animated: true, style: { stroke: '#4CAF50' } },
  { id: 'e7', source: 'commander', target: 'guardian', animated: true, style: { stroke: '#FF9800' } },

  // To processing hub
  { id: 'e8', source: 'watchtower', target: 'processing', style: { stroke: '#9C27B0' } },
  { id: 'e9', source: 'oracle', target: 'processing', style: { stroke: '#673AB7' } },
  { id: 'e10', source: 'diplomat', target: 'processing', style: { stroke: '#4CAF50' } },
  { id: 'e11', source: 'commander', target: 'processing', style: { stroke: '#FF9800' } },
  { id: 'e12', source: 'guardian', target: 'processing', style: { stroke: '#F44336' } },

  // Processing to outputs
  { id: 'e13', source: 'processing', target: 'dashboard', animated: true, style: { stroke: '#2196F3' } },
  { id: 'e14', source: 'processing', target: 'alerts', animated: true, style: { stroke: '#F44336' } },
  { id: 'e15', source: 'processing', target: 'automation', animated: true, style: { stroke: '#FF9800' } }
];

const nodeClassName = (node: Node) => node.type || 'default';

const AINetworkVisualization = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [processingCount, setProcessingCount] = useState(0);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Simulate real-time data processing
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingCount(prev => prev + 1);
      
      // Simulate node status updates
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === 'processing') {
            return {
              ...node,
              data: {
                ...node.data,
                label: (
                  <div className="flex flex-col items-center gap-1">
                    <Server className="h-6 w-6 text-blue-600" />
                    <span className="text-sm font-medium">Processing Hub</span>
                    <div className="text-xs text-muted-foreground">
                      {processingCount} operations/min
                    </div>
                    <div className="w-4 h-1 bg-blue-200 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-blue-500 animate-pulse" />
                    </div>
                  </div>
                )
              }
            };
          }
          return node;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [setNodes, processingCount]);

  return (
    <Card className="card-maritime">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Network className="h-5 w-5 text-primary" />
          AI Agent Network Visualization
          <Badge variant="secondary" className="text-xs ml-auto">
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 border border-border rounded-lg overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            attributionPosition="bottom-left"
            style={{ backgroundColor: "hsl(var(--muted))" }}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
          >
            <Controls />
            <MiniMap 
              zoomable 
              pannable 
              nodeClassName={nodeClassName}
              style={{ backgroundColor: "hsl(var(--background))" }}
            />
            <Background />
          </ReactFlow>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
          <div className="text-center">
            <div className="font-medium">Data Ingestion</div>
            <div className="text-muted-foreground">3 sources active</div>
          </div>
          <div className="text-center">
            <div className="font-medium">AI Processing</div>
            <div className="text-muted-foreground">{processingCount} ops/min</div>
          </div>
          <div className="text-center">
            <div className="font-medium">Output Systems</div>
            <div className="text-muted-foreground">3 endpoints</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AINetworkVisualization;