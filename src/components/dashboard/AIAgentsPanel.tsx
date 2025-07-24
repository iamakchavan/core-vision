import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Cpu, Zap, Target, Shield } from "lucide-react";
import { useAISimulation } from "@/contexts/AISimulationContext";

const aiAgents = [
  {
    id: "watchtower",
    name: "Watchtower",
    type: "sentinel",
    status: "idle",
    icon: Eye,
    description: "Monitoring global supply chain patterns"
  },
  {
    id: "oracle",
    name: "Oracle",
    type: "simulator",
    status: "idle", 
    icon: Cpu,
    description: "Predictive risk analysis engine"
  },
  {
    id: "diplomat",
    name: "Diplomat",
    type: "negotiator",
    status: "idle",
    icon: Target,
    description: "Automated contract negotiation"
  },
  {
    id: "commander",
    name: "Commander",
    type: "executor",
    status: "idle",
    icon: Zap,
    description: "Supply chain action coordinator"
  },
  {
    id: "guardian",
    name: "Guardian", 
    type: "audit",
    status: "idle",
    icon: Shield,
    description: "Compliance and security oversight"
  }
];

const AIAgentsPanel = () => {
  const { simulation } = useAISimulation();
  
  const getAgentStatus = (agentName: string) => {
    if (!simulation.isActive) return "idle";
    
    // Map our AI agents to simulation agents
    const agentMap: Record<string, string[]> = {
      "watchtower": ["Risk Analyzer", "Port Monitor"],
      "oracle": ["Risk Analyzer", "Demand Forecaster", "Weather Analyzer"],
      "diplomat": ["Compliance Checker", "Document Processor"],
      "commander": ["Route Optimizer", "Shipment Tracker"],
      "guardian": ["Compliance Checker", "Risk Analyzer"]
    };
    
    const mappedAgents = agentMap[agentName.toLowerCase()] || [];
    const isActive = simulation.activeAgents.some(activeAgent => 
      mappedAgents.includes(activeAgent)
    );
    
    return isActive ? "active" : "standby";
  };
  return (
    <Card className="card-maritime">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Cpu className="h-5 w-5 text-primary" />
          AI Agents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {aiAgents.map((agent) => {
          const IconComponent = agent.icon;
          const status = getAgentStatus(agent.id);
          const isActive = status === "active";
          
          return (
            <div
              key={agent.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                isActive 
                  ? "border-primary bg-primary/5 animate-fade-in" 
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive ? "bg-primary/20" : "bg-muted"
                }`}>
                  <IconComponent className={`h-4 w-4 transition-colors ${
                    isActive ? "text-primary animate-pulse" : "text-muted-foreground"
                  }`} />
                </div>
                <div>
                  <div className="font-medium text-sm">{agent.name}</div>
                  <div className="text-xs text-muted-foreground">{agent.description}</div>
                </div>
              </div>
              <Badge 
                variant={isActive ? "default" : "secondary"} 
                className={`text-xs ${isActive ? "animate-pulse" : ""}`}
              >
                {status}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AIAgentsPanel;