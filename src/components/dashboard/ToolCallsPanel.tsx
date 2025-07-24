import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Wrench, Activity, Clock } from "lucide-react";
import { useAISimulation } from "@/contexts/AISimulationContext";

const ToolCallsPanel = () => {
  const { simulation } = useAISimulation();
  return (
    <Card className="card-maritime lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wrench className="h-5 w-5 text-primary" />
          Tool Calls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span>Live Tool Calls</span>
            </div>
            <Badge variant={simulation.isActive ? "default" : "secondary"} className="text-xs">
              {simulation.isActive ? `${simulation.activeAgents.length} active` : "0 calls"}
            </Badge>
          </div>
          
          {simulation.isActive ? (
            <div className="space-y-3">
              {simulation.activeAgents.map((agent, index) => (
                <div key={agent} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 animate-fade-in">
                  <div className="p-1.5 rounded-full bg-primary/20">
                    <Activity className="h-3 w-3 text-primary animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{agent}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Processing step {simulation.currentStep}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Active
                  </Badge>
                </div>
              ))}
              
              {simulation.processingData && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30 animate-fade-in">
                  <div className="p-1.5 rounded-full bg-accent/50">
                    <Wrench className="h-3 w-3 text-accent-foreground animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Data Processing Engine</div>
                    <div className="text-xs text-muted-foreground">Analyzing supply chain data</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Processing
                  </Badge>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-muted-foreground text-sm mb-2">No tool calls yet</div>
              <div className="text-xs text-muted-foreground">
                Start the demo to see AI agents in action
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCallsPanel;