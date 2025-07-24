import { Activity, AlertTriangle, BarChart3, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              ZeroTouch Supply Chain Intelligence
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-muted-foreground">Live Demo</span>
              <div className="flex items-center gap-2">
                <div className="status-indicator status-live"></div>
                <span className="text-sm font-medium text-success">Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="gap-2">
          <BarChart3 className="h-4 w-4" />
          Launch AI Integration Demo
        </Button>
        <Button variant="default" size="sm" className="gap-2 gradient-primary border-0">
          <Zap className="h-4 w-4" />
          Start Demo
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;