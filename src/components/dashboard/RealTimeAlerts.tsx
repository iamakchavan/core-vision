import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  TrendingDown, 
  TrendingUp, 
  Eye, 
  ChevronRight,
  Zap
} from "lucide-react";

const activeAlerts = [
  {
    id: "ALERT-001",
    title: "Port of Los Angeles Congestion",
    description: "45% capacity increase detected. Estimated 2-day delay for containers.",
    severity: "high",
    type: "Congestion",
    location: "Los Angeles, CA",
    riskScore: 8.5,
    affectedShipments: 247,
    timeAgo: "12 minutes ago",
    isReal: true,
    actionPlan: "Reroute 80% of containers to Long Beach. Negotiate expedited processing.",
    escalation: "Port Authority contacted. Alternative carriers engaged."
  },
  {
    id: "ALERT-002", 
    title: "Suez Canal Weather Advisory",
    description: "High winds (45+ knots) expected. Potential 8-hour transit delays.",
    severity: "medium",
    type: "Weather",
    location: "Suez Canal, Egypt",
    riskScore: 6.2,
    affectedShipments: 156,
    timeAgo: "34 minutes ago",
    isReal: false,
    actionPlan: "Monitor wind conditions. Prepare alternative Red Sea routing.",
    escalation: "Captain notifications sent. Weather monitoring active."
  },
  {
    id: "ALERT-003",
    title: "Shanghai Port Strike Alert",
    description: "Dockworkers union negotiations failed. 72-hour strike announced.",
    severity: "critical",
    type: "Labor",
    location: "Shanghai, China", 
    riskScore: 9.1,
    affectedShipments: 423,
    timeAgo: "2 hours ago",
    isReal: false,
    actionPlan: "Emergency rerouting to Ningbo and Shenzhen ports. Air freight backup.",
    escalation: "C-Suite notification. Emergency response team activated."
  },
  {
    id: "ALERT-004",
    title: "Cyber Security Incident",
    description: "Unusual network activity detected in Port Management System.",
    severity: "high",
    type: "Cyber",
    location: "Hamburg, Germany",
    riskScore: 7.8,
    affectedShipments: 89,
    timeAgo: "45 minutes ago",
    isReal: true,
    actionPlan: "Isolate affected systems. Manual tracking protocols activated.",
    escalation: "IT Security team engaged. Port authorities notified."
  },
  {
    id: "ALERT-005",
    title: "Fuel Price Surge",
    description: "Bunker fuel costs increased 23% due to regional supply constraints.",
    severity: "medium",
    type: "Economic",
    location: "Singapore",
    riskScore: 5.9,
    affectedShipments: 312,
    timeAgo: "1 hour ago",
    isReal: true,
    actionPlan: "Optimize routing for fuel efficiency. Negotiate fuel hedging contracts.",
    escalation: "Finance team reviewing contract terms. Fuel procurement alerted."
  }
];

const severityConfig = {
  critical: {
    color: "bg-red-500",
    textColor: "text-red-500",
    bgColor: "bg-red-500/10 border-red-500/20 dark:bg-red-500/20 dark:border-red-500/30",
    variant: "destructive" as const
  },
  high: {
    color: "bg-orange-500", 
    textColor: "text-orange-500",
    bgColor: "bg-orange-500/10 border-orange-500/20 dark:bg-orange-500/20 dark:border-orange-500/30",
    variant: "destructive" as const
  },
  medium: {
    color: "bg-yellow-500",
    textColor: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10 border-yellow-500/20 dark:bg-yellow-500/20 dark:border-yellow-500/30", 
    variant: "outline" as const
  }
};

const RealTimeAlerts = () => {
  return (
    <Card className="card-maritime">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">Risk Alerts & Reports</span>
            <span className="sm:hidden">Alerts</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
              {activeAlerts.filter(a => a.isReal).length} Live
            </Badge>
            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
              {activeAlerts.filter(a => !a.isReal).length} Simulated
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4">
        {activeAlerts.map((alert, index) => {
          const config = severityConfig[alert.severity];
          
          return (
            <div
              key={alert.id}
              className={`border rounded-lg p-3 transition-all hover:shadow-md cursor-pointer ${config.bgColor} overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-2 gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${config.color} ${alert.isReal ? 'animate-pulse' : ''}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1 flex-wrap">
                      <h4 className="font-semibold text-sm truncate flex-1">{alert.title}</h4>
                      <Badge variant={config.variant} className="text-xs px-1.5 py-0.5 flex-shrink-0">
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{alert.description}</p>
                    
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      <div className="flex items-center gap-1 min-w-0">
                        <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">{alert.timeAgo.replace(' ago', '')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right flex-shrink-0 w-16">
                  <div className="flex items-center justify-end gap-1 mb-1">
                    <span className="text-lg font-bold text-foreground">{alert.riskScore}</span>
                    <span className="text-xs text-muted-foreground">/10</span>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {alert.affectedShipments}
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    shipments
                  </div>
                  {alert.isReal ? (
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <div className="status-indicator status-live w-1.5 h-1.5" />
                      <span className="text-xs text-success font-medium">LIVE</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <div className="status-indicator status-simulated w-1.5 h-1.5" />
                      <span className="text-xs text-warning font-medium">SIM</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50 gap-2">
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <Button variant="outline" size="sm" className="h-6 text-xs px-2 flex-shrink-0">
                    <Eye className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline">View Details</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-6 text-xs px-2 flex-shrink-0">
                    <Zap className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline">Auto-Resolve</span>
                    <span className="sm:hidden">Auto</span>
                  </Button>
                </div>
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5 flex-shrink-0">
                  {alert.type}
                </Badge>
              </div>
            </div>
          );
        })}
        
        <div className="text-center pt-2">
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <span>View All ({activeAlerts.length}) Alerts</span>
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeAlerts;