import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Wrench } from "lucide-react";

const ToolCallsPanel = () => {
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
            <Badge variant="secondary" className="text-xs">
              0 calls
            </Badge>
          </div>
          
          <div className="text-center py-8">
            <div className="text-muted-foreground text-sm mb-2">No tool calls yet</div>
            <div className="text-xs text-muted-foreground">
              Start the demo to see AI agents in action
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCallsPanel;