import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Globe,
  Database,
  Truck,
  Anchor,
  Wifi,
  RefreshCw,
  Settings,
  ExternalLink
} from "lucide-react";

interface IntegrationStatus {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error' | 'warning';
  lastChecked: string;
  responseTime?: number;
  endpoints: number;
  version?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mockIntegrationData: IntegrationStatus[] = [
  {
    id: "port-authority",
    name: "Port Authority API",
    description: "Real-time port operations and vessel tracking",
    status: "connected",
    lastChecked: "2024-01-24T10:30:00Z",
    responseTime: 145,
    endpoints: 12,
    version: "v2.1",
    icon: Anchor
  },
  {
    id: "shipping-lines",
    name: "Global Shipping Lines",
    description: "Container and cargo tracking across major carriers",
    status: "connected",
    lastChecked: "2024-01-24T10:28:15Z",
    responseTime: 89,
    endpoints: 8,
    version: "v1.8",
    icon: Truck
  },
  {
    id: "customs-api",
    name: "Customs & Border Protection",
    description: "Import/export documentation and clearance status",
    status: "warning",
    lastChecked: "2024-01-24T10:25:30Z",
    responseTime: 2340,
    endpoints: 6,
    version: "v3.0",
    icon: Globe
  },
  {
    id: "weather-service",
    name: "Maritime Weather Service",
    description: "Weather conditions and forecasts for shipping routes",
    status: "connected",
    lastChecked: "2024-01-24T10:29:45Z",
    responseTime: 67,
    endpoints: 4,
    version: "v2.5",
    icon: Wifi
  },
  {
    id: "logistics-db",
    name: "Internal Logistics Database",
    description: "Internal inventory and logistics management system",
    status: "error",
    lastChecked: "2024-01-24T10:20:00Z",
    responseTime: undefined,
    endpoints: 15,
    version: "v4.2",
    icon: Database
  },
  {
    id: "ai-ml-platform",
    name: "AI/ML Analytics Platform",
    description: "Machine learning models for predictive analytics",
    status: "connected",
    lastChecked: "2024-01-24T10:31:10Z",
    responseTime: 234,
    endpoints: 20,
    version: "v1.0",
    icon: Settings
  }
];

const statusConfig = {
  connected: {
    color: "bg-success text-success-foreground",
    icon: CheckCircle,
    label: "Connected",
    textColor: "text-success"
  },
  warning: {
    color: "bg-warning text-warning-foreground",
    icon: AlertTriangle,
    label: "Warning",
    textColor: "text-warning"
  },
  error: {
    color: "bg-destructive text-destructive-foreground",
    icon: XCircle,
    label: "Error",
    textColor: "text-destructive"
  },
  disconnected: {
    color: "bg-muted text-muted-foreground",
    icon: XCircle,
    label: "Disconnected",
    textColor: "text-muted-foreground"
  }
};

const formatResponseTime = (ms?: number) => {
  if (!ms) return "N/A";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
};

const formatLastChecked = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return date.toLocaleDateString();
};

const IntegrationsStatus = () => {
  const connectedCount = mockIntegrationData.filter(i => i.status === 'connected').length;
  const totalCount = mockIntegrationData.length;

  return (
    <Card className="card-maritime">
      <CardHeader className="pb-3 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <CardTitle className="text-base sm:text-lg font-semibold">Integrations Status</CardTitle>
            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
              {connectedCount}/{totalCount} Active
            </Badge>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline ml-2 text-xs">Refresh</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Check all integrations</p>
              </TooltipContent>
            </Tooltip>
            
            <Button variant="outline" size="sm" className="h-8 px-2">
              <Settings className="h-3.5 w-3.5" />
              <span className="hidden sm:inline ml-2 text-xs">Configure</span>
            </Button>
          </div>
        </div>
        
        <div className="text-xs sm:text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {mockIntegrationData.map((integration) => {
            const StatusIcon = statusConfig[integration.status].icon;
            const IntegrationIcon = integration.icon;
            
            return (
              <div 
                key={integration.id}
                className="p-3 sm:p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                  <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="p-1.5 sm:p-2 rounded-md bg-muted/50 shrink-0">
                      <IntegrationIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <h3 className="font-medium text-foreground text-xs sm:text-sm truncate">
                          {integration.name}
                        </h3>
                        {integration.version && (
                          <Badge variant="outline" className="text-xs px-1 py-0 w-fit">
                            {integration.version}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-tight">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 shrink-0">
                    <StatusIcon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${statusConfig[integration.status].textColor}`} />
                    <Button variant="ghost" size="sm" className="h-5 w-5 sm:h-6 sm:w-6 p-0">
                      <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs px-1.5 py-0.5 w-fit ${statusConfig[integration.status].color}`}
                    >
                      {statusConfig[integration.status].label}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      {integration.endpoints} endpoints
                    </span>
                  </div>
                  
                  <div className="flex sm:flex-col sm:text-right text-muted-foreground gap-2 sm:gap-0 text-xs">
                    <div>{formatResponseTime(integration.responseTime)}</div>
                    <div>{formatLastChecked(integration.lastChecked)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Summary Stats */}
        <div className="pt-3 sm:pt-4 border-t">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
            <div>
              <div className="text-base sm:text-lg font-semibold text-success">{connectedCount}</div>
              <div className="text-xs text-muted-foreground">Connected</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-semibold text-warning">
                {mockIntegrationData.filter(i => i.status === 'warning').length}
              </div>
              <div className="text-xs text-muted-foreground">Warnings</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-semibold text-destructive">
                {mockIntegrationData.filter(i => i.status === 'error').length}
              </div>
              <div className="text-xs text-muted-foreground">Errors</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-semibold text-foreground">
                {mockIntegrationData.reduce((sum, i) => sum + i.endpoints, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Endpoints</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationsStatus;