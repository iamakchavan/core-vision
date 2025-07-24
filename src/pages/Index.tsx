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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <DashboardHeader />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"></div>
        <div className="container mx-auto px-8 pt-8 pb-4 relative">
          <div className="text-center mb-8">
            <h1 className="display-lg text-foreground mb-3">
              Maritime Operations Center
            </h1>
            <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time monitoring and intelligent analytics for global supply chain operations
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-8 pb-8">
        {/* Executive Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="metric-card">
            <div className="metric-value text-primary">247</div>
            <div className="metric-label">Active Shipments</div>
            <div className="metric-change text-success">
              +12% vs last week
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-value text-accent">98.7%</div>
            <div className="metric-label">On-Time Delivery</div>
            <div className="metric-change text-success">
              +2.3% improvement
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-value text-warning">€2.4M</div>
            <div className="metric-label">Cost Savings</div>
            <div className="metric-change text-success">
              This quarter
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-value text-destructive">3</div>
            <div className="metric-label">Critical Alerts</div>
            <div className="metric-change text-destructive">
              Requires attention
            </div>
          </div>
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="dashboard-grid mb-8">
          {/* Left Column - AI Operations */}
          <div className="lg:col-span-3 space-y-8">
            <div id="ai-agents" className="animate-fade-in">
              <AIAgentsPanel />
            </div>
            <div id="ai-network" className="animate-fade-in">
              <AgentNetwork />
            </div>
          </div>
          
          {/* Center Column - Core Operations */}
          <div className="lg:col-span-6 space-y-8">
            <div id="port-status" className="animate-slide-up">
              <GlobalPortStatus />
            </div>
            <div className="animate-slide-up">
              <WorkflowProgress />
            </div>
          </div>
          
          {/* Right Column - Analytics & Controls */}
          <div className="lg:col-span-3 space-y-8">
            <div className="animate-scale-in">
              <ToolCallsPanel />
            </div>
            <div className="animate-scale-in">
              <PerformanceMetrics />
            </div>
          </div>
        </div>

        {/* Analytics Intelligence Section */}
        <div className="dashboard-section mb-8">
          <div className="section-header">
            <h2 className="section-title">
              Business Intelligence Dashboard
            </h2>
          </div>
          <div id="analytics-section" className="animate-fade-in">
            <AnalyticsDashboard />
          </div>
        </div>

        {/* Risk Management & Network Operations */}
        <div className="dashboard-section mb-8">
          <div className="section-header">
            <h2 className="section-title">
              Risk Management & Network Operations
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div id="alerts-section" className="animate-fade-in">
              <RealTimeAlerts />
            </div>
            <div className="animate-fade-in">
              <AINetworkVisualization />
            </div>
          </div>
        </div>

        {/* Shipment Operations */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">
              Global Shipment Operations
            </h2>
          </div>
          <div id="shipments-section" className="animate-fade-in">
            <ShipmentsTracking />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
