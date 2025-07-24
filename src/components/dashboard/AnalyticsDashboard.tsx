import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, AlertTriangle, DollarSign, Package, Truck, Clock } from "lucide-react";

const riskData = [
  { name: "Jan", incidents: 12, resolved: 10, pending: 2 },
  { name: "Feb", incidents: 8, resolved: 7, pending: 1 },
  { name: "Mar", incidents: 15, resolved: 13, pending: 2 },
  { name: "Apr", incidents: 22, resolved: 18, pending: 4 },
  { name: "May", incidents: 18, resolved: 16, pending: 2 },
  { name: "Jun", incidents: 25, resolved: 20, pending: 5 }
];

const portPerformance = [
  { port: "LA", efficiency: 92, capacity: 85 },
  { port: "Shanghai", efficiency: 78, capacity: 95 },
  { port: "Singapore", efficiency: 96, capacity: 88 },
  { port: "Rotterdam", efficiency: 89, capacity: 82 }
];

const riskCategories = [
  { name: "Weather", value: 35, color: "#3B82F6" },
  { name: "Geopolitical", value: 25, color: "#EF4444" },
  { name: "Infrastructure", value: 20, color: "#F59E0B" },
  { name: "Labor", value: 15, color: "#10B981" },
  { name: "Cyber", value: 5, color: "#8B5CF6" }
];

const shipmentVolume = [
  { month: "Jan", volume: 1200, forecast: 1150 },
  { month: "Feb", volume: 1100, forecast: 1200 },
  { month: "Mar", volume: 1350, forecast: 1300 },
  { month: "Apr", volume: 1450, forecast: 1400 },
  { month: "May", volume: 1320, forecast: 1380 },
  { month: "Jun", volume: 1580, forecast: 1520 }
];

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-maritime">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">$2.4M</div>
                <div className="text-sm text-muted-foreground">Cost Savings</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+12.5%</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-muted">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-maritime">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">847</div>
                <div className="text-sm text-muted-foreground">Active Shipments</div>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="secondary" className="text-xs">Real-time</Badge>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-muted">
                <Package className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-maritime">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">23</div>
                <div className="text-sm text-muted-foreground">Risk Alerts</div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                  <span className="text-xs text-warning">5 Critical</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-muted">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-maritime">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">94.7%</div>
                <div className="text-sm text-muted-foreground">On-Time Delivery</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+2.1%</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-muted">
                <Truck className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Incidents Trend */}
        <Card className="card-maritime">
          <CardHeader>
            <CardTitle className="text-lg">Risk Incidents Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={riskData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="incidents" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Categories */}
        <Card className="card-maritime">
          <CardHeader>
            <CardTitle className="text-lg">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Port Performance */}
        <Card className="card-maritime">
          <CardHeader>
            <CardTitle className="text-lg">Port Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={portPerformance} layout="horizontal">
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="port" type="category" width={80} />
                <Bar dataKey="efficiency" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                <Bar dataKey="capacity" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Shipment Volume Forecast */}
        <Card className="card-maritime">
          <CardHeader>
            <CardTitle className="text-lg">Shipment Volume & Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={shipmentVolume}>
                <XAxis dataKey="month" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  stackId="2"
                  stroke="hsl(var(--accent))"
                  fill="hsl(var(--accent))"
                  fillOpacity={0.3}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;