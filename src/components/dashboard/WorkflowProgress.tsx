import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, AlertTriangle } from "lucide-react";

const workflowSteps = [
  {
    id: "threat-detection",
    title: "Threat Detection",
    description: "Sentinel detects LA port congestion via satellite imagery",
    tool: "analyze_satellite_imagery",
    agent: "Sentinel",
    status: "completed",
    icon: CheckCircle
  },
  {
    id: "impact-analysis", 
    title: "Impact Analysis",
    description: "Simulator runs Monte Carlo analysis for optimal routing",
    tool: "run_monte_carlo",
    agent: "Simulator",
    status: "in-progress",
    icon: Clock
  },
  {
    id: "contract-negotiation",
    title: "Contract Negotiation", 
    description: "Negotiator secures carrier capacity and terms",
    tool: "negotiate_terms",
    agent: "Negotiator",
    status: "pending",
    icon: Circle
  },
  {
    id: "human-approval",
    title: "Human Approval",
    description: "Request approval for rerouting decision",
    tool: "request_human_approval",
    agent: "Negotiator", 
    status: "pending",
    icon: Circle
  },
  {
    id: "execution",
    title: "Execution",
    description: "Executor reroutes containers and updates systems",
    tool: "reroute_shipments",
    agent: "Executor",
    status: "pending",
    icon: Circle
  },
  {
    id: "audit",
    title: "Audit & Compliance",
    description: "Audit logs to blockchain and generates reports",
    tool: "log_to_blockchain",
    agent: "Audit",
    status: "pending",
    icon: Circle
  }
];

const statusColors = {
  completed: "text-success",
  "in-progress": "text-warning", 
  pending: "text-muted-foreground"
};

const WorkflowProgress = () => {
  const completedSteps = workflowSteps.filter(step => step.status === "completed").length;
  const progressPercentage = (completedSteps / workflowSteps.length) * 100;

  return (
    <Card className="card-maritime lg:col-span-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Workflow Progress
          </div>
          <Badge variant="secondary" className="text-xs">
            Ready
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-muted-foreground">
              Step {completedSteps} of {workflowSteps.length}
            </span>
            <Progress value={progressPercentage} className="w-24" />
          </div>

          <div className="space-y-3">
            {workflowSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <IconComponent className={`h-5 w-5 mt-0.5 ${statusColors[step.status]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">{step.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {step.agent}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    <div className="text-xs text-primary font-mono">
                      Tool: {step.tool}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowProgress;