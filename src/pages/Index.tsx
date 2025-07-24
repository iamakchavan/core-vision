import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AIAgentsPanel from "@/components/dashboard/AIAgentsPanel";
import GlobalPortStatus from "@/components/dashboard/GlobalPortStatus";
import ToolCallsPanel from "@/components/dashboard/ToolCallsPanel";
import WorkflowProgress from "@/components/dashboard/WorkflowProgress";
import PerformanceMetrics from "@/components/dashboard/PerformanceMetrics";
import AgentNetwork from "@/components/dashboard/AgentNetwork";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto p-6">
        <DashboardHeader />
        
        <div className="dashboard-grid">
          {/* Left Column - AI Agents */}
          <div className="lg:col-span-3 space-y-6">
            <AIAgentsPanel />
            <AgentNetwork />
          </div>
          
          {/* Center Column - Main Content */}
          <div className="lg:col-span-6 space-y-6">
            <GlobalPortStatus />
            <WorkflowProgress />
          </div>
          
          {/* Right Column - Metrics & Tools */}
          <div className="lg:col-span-3 space-y-6">
            <ToolCallsPanel />
            <PerformanceMetrics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
