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
import { AISimulationProvider } from "@/contexts/AISimulationContext";

const Index = () => {
  return (
    <AISimulationProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <DashboardHeader />
      <div className="container mx-auto p-6 pt-8">
        
        
        {/* Main Dashboard Grid */}
        <div className="dashboard-grid mb-8">
          {/* Left Column - AI Agents */}
          <div className="lg:col-span-3 space-y-6">
            <div id="ai-agents">
              <AIAgentsPanel />
            </div>
            <div id="ai-network">
              <AgentNetwork />
            </div>
          </div>
          
          {/* Center Column - Main Content */}
          <div className="lg:col-span-6 space-y-6">
            <div id="port-status">
              <GlobalPortStatus />
            </div>
            <WorkflowProgress />
          </div>
          
          {/* Right Column - Metrics & Tools */}
          <div className="lg:col-span-3 space-y-6">
            <ToolCallsPanel />
            <PerformanceMetrics />
          </div>
        </div>

        {/* Analytics Section */}
        <div id="analytics-section" className="mb-8">
          <AnalyticsDashboard />
        </div>

        {/* Alerts and Network Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div id="alerts-section">
            <RealTimeAlerts />
          </div>
          <AINetworkVisualization />
        </div>

        {/* Shipments Tracking */}
        <div id="shipments-section" className="mb-8">
          <ShipmentsTracking />
        </div>
      </div>
    </div>
    </AISimulationProvider>
  );
};

export default Index;
