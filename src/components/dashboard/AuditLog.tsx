import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Shield, 
  User, 
  Database, 
  Settings, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download
} from "lucide-react";
import { useState } from "react";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'success' | 'warning' | 'error';
  ipAddress: string;
  userAgent?: string;
}

const mockAuditData: AuditLogEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-24T10:30:15Z",
    user: "admin@company.com",
    action: "User Login",
    resource: "Authentication System",
    details: "Successful login from new device",
    severity: "low",
    status: "success",
    ipAddress: "192.168.1.100"
  },
  {
    id: "2",
    timestamp: "2024-01-24T10:25:30Z",
    user: "operator@company.com",
    action: "Shipment Status Update",
    resource: "Shipment #SH-2024-001",
    details: "Changed status from 'In Transit' to 'Delivered'",
    severity: "medium",
    status: "success",
    ipAddress: "192.168.1.45"
  },
  {
    id: "3",
    timestamp: "2024-01-24T10:20:45Z",
    user: "system",
    action: "Data Sync Failed",
    resource: "Port Integration API",
    details: "Connection timeout to Hamburg port system",
    severity: "high",
    status: "error",
    ipAddress: "N/A"
  },
  {
    id: "4",
    timestamp: "2024-01-24T10:15:12Z",
    user: "supervisor@company.com",
    action: "Configuration Change",
    resource: "AI Agent Settings",
    details: "Updated risk threshold parameters",
    severity: "medium",
    status: "success",
    ipAddress: "192.168.1.78"
  },
  {
    id: "5",
    timestamp: "2024-01-24T10:10:00Z",
    user: "unknown",
    action: "Failed Login Attempt",
    resource: "Authentication System",
    details: "Multiple failed login attempts detected",
    severity: "critical",
    status: "error",
    ipAddress: "203.0.113.42"
  },
  {
    id: "6",
    timestamp: "2024-01-24T10:05:33Z",
    user: "admin@company.com",
    action: "Database Backup",
    resource: "Primary Database",
    details: "Scheduled backup completed successfully",
    severity: "low",
    status: "success",
    ipAddress: "192.168.1.100"
  }
];

const severityConfig = {
  low: { 
    color: "bg-success text-success-foreground", 
    icon: CheckCircle,
    label: "Low Risk"
  },
  medium: { 
    color: "bg-warning text-warning-foreground", 
    icon: AlertTriangle,
    label: "Medium Risk"
  },
  high: { 
    color: "bg-destructive text-destructive-foreground", 
    icon: XCircle,
    label: "High Risk"
  },
  critical: { 
    color: "bg-destructive text-destructive-foreground animate-pulse", 
    icon: XCircle,
    label: "Critical Risk"
  }
};

const statusConfig = {
  success: { color: "text-success", icon: CheckCircle },
  warning: { color: "text-warning", icon: AlertTriangle },
  error: { color: "text-destructive", icon: XCircle }
};

const getActionIcon = (action: string) => {
  if (action.includes("Login")) return User;
  if (action.includes("Database") || action.includes("Data")) return Database;
  if (action.includes("Configuration") || action.includes("Settings")) return Settings;
  return Shield;
};

const AuditLog = () => {
  const [filter, setFilter] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("24h");

  const filteredData = mockAuditData.filter(entry => {
    if (filter === "all") return true;
    return entry.severity === filter || entry.status === filter;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className="card-maritime">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">Audit Log</CardTitle>
            <Tooltip>
              <TooltipTrigger>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Real-time system activity tracking</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-1 flex-wrap">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("all")}
                className="text-xs"
              >
                All
              </Button>
              <Button 
                variant={filter === "critical" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("critical")}
                className="text-xs"
              >
                Critical
              </Button>
              <Button 
                variant={filter === "error" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("error")}
                className="text-xs"
              >
                Errors
              </Button>
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export audit log</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-6">
        <div className="h-[400px] overflow-y-auto -mx-2 px-2">
          <div className="space-y-3">
            {filteredData.map((entry) => {
              const SeverityIcon = severityConfig[entry.severity].icon;
              const StatusIcon = statusConfig[entry.status].icon;
              const ActionIcon = getActionIcon(entry.action);
              
              return (
                <div 
                  key={entry.id}
                  className="flex flex-col sm:flex-row sm:items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:flex-col sm:gap-1 sm:mt-0.5">
                    <ActionIcon className="h-4 w-4 text-muted-foreground" />
                    <StatusIcon className={`h-4 w-4 ${statusConfig[entry.status].color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-medium text-foreground text-sm">
                            {entry.action}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${severityConfig[entry.severity].color}`}
                          >
                            {severityConfig[entry.severity].label}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-1">
                          <span className="font-medium">{entry.user}</span> • {entry.resource}
                        </div>
                        
                        <div className="text-xs text-muted-foreground break-words">
                          {entry.details}
                        </div>
                      </div>
                      
                      <div className="text-right text-xs text-muted-foreground whitespace-nowrap shrink-0 sm:ml-4">
                        <div>{formatTimestamp(entry.timestamp)}</div>
                        <div className="mt-1">{entry.ipAddress}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="px-2 sm:px-4 pt-4 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing {filteredData.length} of {mockAuditData.length} entries</span>
            <span>Auto-refresh: Every 30s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditLog;