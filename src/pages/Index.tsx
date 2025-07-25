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
import AuditLog from "@/components/dashboard/AuditLog";
import IntegrationsStatus from "@/components/dashboard/IntegrationsStatus";
import AISimulationOverlay from "@/components/dashboard/AISimulationOverlay";
import { AISimulationProvider } from "@/contexts/AISimulationContext";

const Index = () => {
  return (
    <AISimulationProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <DashboardHeader />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Left Column - AI Agents */}
            <div className="lg:col-span-3 space-y-4 lg:space-y-6">
              <div id="ai-agents" className="animate-in slide-in-from-left-4 duration-500 delay-100">
                <AIAgentsPanel />
              </div>
              <div id="ai-network" className="animate-in slide-in-from-left-4 duration-500 delay-200">
                <AgentNetwork />
              </div>
            </div>

            {/* Center Column - Main Content */}
            <div className="lg:col-span-6 space-y-4 lg:space-y-6">
              <div id="port-status" className="animate-in slide-in-from-bottom-4 duration-500 delay-150">
                <GlobalPortStatus />
              </div>
              <div className="animate-in slide-in-from-bottom-4 duration-500 delay-250">
                <WorkflowProgress />
              </div>
            </div>

            {/* Right Column - Metrics & Tools */}
            <div className="lg:col-span-3 space-y-4 lg:space-y-6">
              <div className="animate-in slide-in-from-right-4 duration-500 delay-200">
                <ToolCallsPanel />
              </div>
              <div className="animate-in slide-in-from-right-4 duration-500 delay-300">
                <PerformanceMetrics />
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div id="analytics-section" className="mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-400">
            <AnalyticsDashboard />
          </div>

          {/* Alerts and Network Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div id="alerts-section" className="animate-in slide-in-from-left-2 duration-500 delay-500">
              <RealTimeAlerts />
            </div>
            <div className="animate-in slide-in-from-right-2 duration-500 delay-600">
              <AINetworkVisualization />
            </div>
          </div>

          {/* Shipments Tracking */}
          <div id="shipments-section" className="mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-700">
            <ShipmentsTracking />
          </div>

          {/* Integrations Status */}
          <div id="integrations-section" className="mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-800">
            <IntegrationsStatus />
          </div>

          {/* Audit Log */}
          <div id="audit-section" className="mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-900">
            <AuditLog />
          </div>
        </div>

        {/* AI Simulation Overlay */}
        <AISimulationOverlay />
      </div>
    </AISimulationProvider>
  );
};

export default Index;
