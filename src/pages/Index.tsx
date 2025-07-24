import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AIAgentsPanel from "@/components/dashboard/AIAgentsPanel";
import GlobalPortStatus from "@/components/dashboard/GlobalPortStatus";
import ToolCallsPanel from "@/components/dashboard/ToolCallsPanel";
import WorkflowProgress from "@/components/dashboard/WorkflowProgress";
import PerformanceMetrics from "@/components/dashboard/PerformanceMetrics";
import AgentNetwork from "@/components/dashboard/AgentNetwork";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import RealTimeAlerts from "@/components/dashboard/RealTimeAlerts";
import AINetworkVisualization from "@/components/dashboard/AINetworkVisualization";
import ShipmentsTracking from "@/components/dashboard/ShipmentsTracking";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <DashboardHeader />
      
      {/* Hero Status Banner */}
      <div className="border-b border-border/20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Maritime Operations Center</h2>
              <p className="text-muted-foreground">Real-time monitoring and intelligence for global supply chain operations</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12,847</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Active Shipments</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">99.2%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">System Uptime</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">24</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Active Alerts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-8">
        
        {/* Primary Operations Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Operations Overview</h3>
            <div className="text-sm text-muted-foreground">Last updated: 2 minutes ago</div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Primary Panel - Port Status */}
            <div className="lg:col-span-8">
              <div id="port-status" className="h-full">
                <GlobalPortStatus />
              </div>
            </div>
            
            {/* Secondary Panels */}
            <div className="lg:col-span-4 space-y-6">
              <div id="ai-agents">
                <AIAgentsPanel />
              </div>
              <ToolCallsPanel />
            </div>
          </div>
        </section>

        {/* Workflow & Analytics Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Workflow & Performance</h3>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">View All →</button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <WorkflowProgress />
            <PerformanceMetrics />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div id="ai-network" className="lg:col-span-1">
              <AgentNetwork />
            </div>
            <div className="lg:col-span-2">
              <div id="analytics-section">
                <AnalyticsDashboard />
              </div>
            </div>
          </div>
        </section>

        {/* Monitoring & Intelligence Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Real-time Intelligence</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Live monitoring active
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div id="alerts-section">
              <RealTimeAlerts />
            </div>
            <AINetworkVisualization />
          </div>
        </section>

        {/* Shipments Tracking */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Global Shipment Tracking</h3>
            <div className="flex items-center gap-3">
              <select className="bg-card border border-border rounded-md px-3 py-1 text-sm">
                <option>All Regions</option>
                <option>Asia Pacific</option>
                <option>Europe</option>
                <option>Americas</option>
              </select>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors">Export Data</button>
            </div>
          </div>
          
          <div id="shipments-section">
            <ShipmentsTracking />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
