import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Navigation,
  Filter,
  Search,
  MoreVertical
} from "lucide-react";

const shipments = [
  {
    id: "SH-2024-001",
    origin: "Shanghai, China",
    destination: "Los Angeles, CA",
    carrier: "COSCO Shipping",
    vessel: "COSCO Galaxy",
    cargo: "Electronics & Textiles",
    containers: 247,
    status: "in-transit",
    progress: 65,
    eta: "2024-01-28",
    priority: "high",
    riskLevel: "medium",
    lastUpdate: "2 hours ago",
    currentLocation: "Pacific Ocean",
    estimatedDelay: 0
  },
  {
    id: "SH-2024-002", 
    origin: "Hamburg, Germany",
    destination: "New York, NY",
    carrier: "Maersk Line",
    vessel: "Maersk Essex",
    cargo: "Automotive Parts",
    containers: 189,
    status: "delayed",
    progress: 45,
    eta: "2024-01-30",
    priority: "critical",
    riskLevel: "high",
    lastUpdate: "15 minutes ago",
    currentLocation: "North Atlantic",
    estimatedDelay: 18
  },
  {
    id: "SH-2024-003",
    origin: "Singapore",
    destination: "Long Beach, CA", 
    carrier: "Evergreen Marine",
    vessel: "Ever Given",
    cargo: "Consumer Goods",
    containers: 312,
    status: "arrived",
    progress: 100,
    eta: "2024-01-25",
    priority: "medium",
    riskLevel: "low",
    lastUpdate: "6 hours ago",
    currentLocation: "Long Beach Port",
    estimatedDelay: 0
  },
  {
    id: "SH-2024-004",
    origin: "Rotterdam, Netherlands",
    destination: "Miami, FL",
    carrier: "MSC",
    vessel: "MSC Gülsün",
    cargo: "Chemical Products",
    containers: 156,
    status: "loading",
    progress: 15,
    eta: "2024-02-05",
    priority: "high",
    riskLevel: "medium",
    lastUpdate: "30 minutes ago",
    currentLocation: "Rotterdam Port",
    estimatedDelay: 0
  },
  {
    id: "SH-2024-005",
    origin: "Busan, South Korea", 
    destination: "Seattle, WA",
    carrier: "Yang Ming",
    vessel: "YM Wisdom",
    cargo: "Technology Hardware",
    containers: 278,
    status: "in-transit",
    progress: 80,
    eta: "2024-01-26",
    priority: "critical",
    riskLevel: "low", 
    lastUpdate: "1 hour ago",
    currentLocation: "North Pacific",
    estimatedDelay: 0
  }
];

const statusConfig = {
  "in-transit": { color: "bg-blue-500", variant: "default" as const, icon: Truck },
  "delayed": { color: "bg-red-500", variant: "destructive" as const, icon: AlertTriangle },
  "arrived": { color: "bg-green-500", variant: "secondary" as const, icon: CheckCircle },
  "loading": { color: "bg-yellow-500", variant: "outline" as const, icon: Package }
};

const priorityConfig = {
  "critical": { color: "text-red-600 dark:text-red-400", bg: "bg-red-500/10 border-red-500/20 dark:bg-red-500/20 dark:border-red-500/30" },
  "high": { color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500/10 border-orange-500/20 dark:bg-orange-500/20 dark:border-orange-500/30" },
  "medium": { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10 border-blue-500/20 dark:bg-blue-500/20 dark:border-blue-500/30" }
};

const riskConfig = {
  "high": { color: "text-red-600 dark:text-red-400", bg: "bg-red-500/10 dark:bg-red-500/20" },
  "medium": { color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500/10 dark:bg-yellow-500/20" },
  "low": { color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10 dark:bg-green-500/20" }
};

const ShipmentsTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Simulate real-time updates
  useEffect(() => {
    if (!realTimeUpdates) return;

    const interval = setInterval(() => {
      // Simulate random progress updates for in-transit shipments
      const inTransitShipments = shipments.filter(s => s.status === 'in-transit');
      if (inTransitShipments.length > 0) {
        const randomShipment = inTransitShipments[Math.floor(Math.random() * inTransitShipments.length)];
        // In a real app, this would update the actual data
        console.log(`Real-time update: ${randomShipment.id} progress updated`);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  return (
    <Card className="card-maritime">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg">
            <Navigation className="h-5 w-5 text-primary" />
            Shipment Tracking
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={realTimeUpdates ? "default" : "secondary"} className="text-xs">
              {realTimeUpdates ? "Live Updates" : "Static"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRealTimeUpdates(!realTimeUpdates)}
              className="text-xs"
            >
              {realTimeUpdates ? "Pause" : "Resume"}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search shipments, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="arrived">Arrived</SelectItem>
              <SelectItem value="loading">Loading</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold text-foreground">{shipments.length}</div>
            <div className="text-xs text-muted-foreground">Total Shipments</div>
          </div>
          <div className="text-center p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {shipments.filter(s => s.status === 'in-transit').length}
            </div>
            <div className="text-xs text-muted-foreground">In Transit</div>
          </div>
          <div className="text-center p-3 bg-red-500/10 dark:bg-red-500/20 rounded-lg">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              {shipments.filter(s => s.status === 'delayed').length}
            </div>
            <div className="text-xs text-muted-foreground">Delayed</div>
          </div>
          <div className="text-center p-3 bg-green-500/10 dark:bg-green-500/20 rounded-lg">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {shipments.filter(s => s.status === 'arrived').length}
            </div>
            <div className="text-xs text-muted-foreground">Delivered</div>
          </div>
        </div>

        {/* Shipments List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredShipments.map((shipment) => {
            const statusConf = statusConfig[shipment.status];
            const priorityConf = priorityConfig[shipment.priority];
            const riskConf = riskConfig[shipment.riskLevel];
            const StatusIcon = statusConf.icon;

            return (
              <div
                key={shipment.id}
                className={`border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${priorityConf.bg}`}
                onClick={() => setSelectedShipment(shipment)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <StatusIcon className="h-5 w-5 text-muted-foreground" />
                      <div className={`w-2 h-2 rounded-full mt-1 ${statusConf.color} ${realTimeUpdates ? 'animate-pulse' : ''}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{shipment.id}</h4>
                        <Badge variant={statusConf.variant} className="text-xs">
                          {shipment.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${priorityConf.color}`}>
                          {shipment.priority.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>{shipment.origin}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>{shipment.destination}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3 text-muted-foreground" />
                          <span>{shipment.containers} containers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>ETA: {shipment.eta}</span>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground mb-2">
                        <strong>Current:</strong> {shipment.currentLocation} • 
                        <strong className="ml-1">Vessel:</strong> {shipment.vessel} • 
                        <strong className="ml-1">Cargo:</strong> {shipment.cargo}
                      </div>

                      {shipment.status === 'in-transit' && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>Progress</span>
                            <span>{shipment.progress}%</span>
                          </div>
                          <Progress value={shipment.progress} className="h-2" />
                        </div>
                      )}

                      {shipment.estimatedDelay > 0 && (
                        <div className="mt-2 p-2 bg-red-500/10 dark:bg-red-500/20 rounded text-xs text-red-600 dark:text-red-400">
                          ⚠️ Estimated delay: {shipment.estimatedDelay} hours
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-xs font-medium ${riskConf.color} mb-1`}>
                      Risk: {shipment.riskLevel.toUpperCase()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Updated {shipment.lastUpdate}
                    </div>
                    <Button variant="ghost" size="sm" className="mt-1 h-6 w-6 p-0">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentsTracking;