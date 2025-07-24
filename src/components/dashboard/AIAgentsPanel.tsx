import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Cpu, Zap, Target, Shield } from "lucide-react";

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
          return (
            <div
              key={agent.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium text-sm">{agent.name}</div>
                  <div className="text-xs text-muted-foreground">{agent.type}</div>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {agent.status}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AIAgentsPanel;