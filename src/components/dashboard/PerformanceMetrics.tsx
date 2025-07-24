import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Leaf, Clock, Users } from "lucide-react";
import { useAISimulation } from "@/contexts/AISimulationContext";

const metrics = [
  {
    id: "cost-savings",
    title: "Cost Savings",
    value: "$",
    subtitle: "vs manual intervention",
    icon: DollarSign,
    trend: "up"
  },
  {
    id: "carbon-reduction", 
    title: "Carbon Reduction",
    value: "—",
    subtitle: "CO₂ emissions",
    icon: Leaf,
    trend: "neutral"
  },
  {
    id: "resolution-time",
    title: "Time to Resolution", 
    value: "—",
    subtitle: "vs traditional methods",
    icon: Clock,
    trend: "neutral"
  },
  {
    id: "human-labor",
    title: "Human Labor Saved",
    value: "—", 
    subtitle: "efficiency gain",
    icon: Users,
    trend: "neutral"
  }
];

const PerformanceMetrics = () => {
  const { simulation } = useAISimulation();
  
  const getMetricValue = (metricId: string) => {
    if (!simulation.isActive && simulation.currentStep === 0) {
      return "—";
    }
    
    switch (metricId) {
      case "cost-savings":
        return simulation.currentStep >= 2 ? "$2.4M" : "—";
      case "carbon-reduction":
        return simulation.currentStep >= 4 ? "18%" : "—";
      case "resolution-time":
        return simulation.currentStep >= 3 ? "76%" : "—";
      case "human-labor":
        return simulation.currentStep >= 5 ? `${simulation.shipmentsProcessed}h` : "—";
      default:
        return "—";
    }
  };
  return (
    <Card className="card-maritime lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <div key={metric.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{metric.title}</div>
                    <div className="text-xs text-muted-foreground">{metric.subtitle}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold transition-colors ${
                    getMetricValue(metric.id) !== "—" ? "text-primary animate-fade-in" : "text-foreground"
                  }`}>
                    {getMetricValue(metric.id)}
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground text-center">
              Real-time metrics • Updated every 500ms
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;