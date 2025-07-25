import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface AISimulationState {
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  activeAgents: string[];
  processingData: boolean;
  alertsCount: number;
  shipmentsProcessed: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface AISimulationContextType {
  simulation: AISimulationState;
  startSimulation: () => void;
  stopSimulation: () => void;
  updateSimulation: (updates: Partial<AISimulationState>) => void;
}

const AISimulationContext = createContext<AISimulationContextType | undefined>(undefined);

export const useAISimulation = () => {
  const context = useContext(AISimulationContext);
  if (!context) {
    throw new Error('useAISimulation must be used within an AISimulationProvider');
  }
  return context;
};

export const AISimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [simulation, setSimulation] = useState<AISimulationState>({
    isActive: false,
    currentStep: 0,
    totalSteps: 8,
    activeAgents: [],
    processingData: false,
    alertsCount: 0,
    shipmentsProcessed: 0,
    riskLevel: 'low'
  });

  const updateSimulation = useCallback((updates: Partial<AISimulationState>) => {
    setSimulation(prev => ({ ...prev, ...updates }));
  }, []);

  const simulationSteps = [
    {
      step: 1,
      title: "Neural Network Initialization",
      agents: ["Risk Analyzer", "Port Monitor"],
      duration: 3000,
      action: () => {
        toast({
          title: "🧠 Neural Networks Activated",
          description: "Deep learning models initializing across 47 nodes...",
        });
      }
    },
    {
      step: 2,
      title: "Real-Time Data Ingestion",
      agents: ["Data Collector", "Stream Processor", "Port Monitor"],
      duration: 2500,
      action: () => {
        updateSimulation({ processingData: true });
        toast({
          title: "⚡ High-Speed Data Ingestion",
          description: "Processing 2.3M data points from 127 global sources",
        });
      }
    },
    {
      step: 3,
      title: "Advanced Risk Modeling",
      agents: ["Risk Analyzer", "ML Engine", "Threat Detector"],
      duration: 3500,
      action: () => {
        updateSimulation({ riskLevel: 'medium', alertsCount: 3 });
        toast({
          title: "🎯 AI Risk Assessment",
          description: "Quantum-enhanced algorithms detected 3 anomalies in Pacific routes",
          variant: "destructive"
        });
      }
    },
    {
      step: 4,
      title: "Predictive Port Analytics",
      agents: ["Port Monitor", "Performance Analyzer", "Capacity Predictor"],
      duration: 2800,
      action: () => {
        toast({
          title: "🏗️ Smart Port Analysis",
          description: "AI predicts 23% efficiency boost at Shanghai terminal",
        });
      }
    },
    {
      step: 5,
      title: "Dynamic Route Optimization",
      agents: ["Route Optimizer", "Weather AI", "Traffic Analyzer"],
      duration: 4000,
      action: () => {
        updateSimulation({ shipmentsProcessed: 1247 });
        toast({
          title: "🚀 Quantum Route Optimization",
          description: "1,247 shipments optimized using genetic algorithms - 31% time saved",
        });
      }
    },
    {
      step: 6,
      title: "Multi-Modal Predictive Intelligence",
      agents: ["Demand Forecaster", "Weather AI", "Market Predictor", "Sentiment Analyzer"],
      duration: 3200,
      action: () => {
        toast({
          title: "🔮 Future-State Prediction",
          description: "AI forecasts 94.7% accuracy on 30-day supply chain events",
        });
      }
    },
    {
      step: 7,
      title: "Autonomous Compliance Engine",
      agents: ["Compliance AI", "Document Processor", "Regulatory Scanner"],
      duration: 2600,
      action: () => {
        updateSimulation({ alertsCount: 1 });
        toast({
          title: "⚖️ Smart Compliance Verification",
          description: "AI processed 15,000 documents - 99.8% compliance achieved",
        });
      }
    },
    {
      step: 8,
      title: "Intelligent Report Synthesis",
      agents: ["Report Generator", "Insight Engine", "Visualization AI"],
      duration: 2000,
      action: () => {
        updateSimulation({ processingData: false, riskLevel: 'low' });
        toast({
          title: "📊 AI-Generated Intelligence Report",
          description: "Executive dashboard updated with 47 actionable insights",
        });
      }
    }
  ];

  const startSimulation = useCallback(() => {
    if (simulation.isActive) return;

    setSimulation(prev => ({
      ...prev,
      isActive: true,
      currentStep: 0,
      activeAgents: [],
      alertsCount: 0,
      shipmentsProcessed: 0,
      riskLevel: 'low'
    }));

    toast({
      title: "🚀 AI Demo Started",
      description: "Supply Chain Intelligence System is now simulating...",
    });

    // Execute simulation steps
    simulationSteps.forEach((stepData, index) => {
      setTimeout(() => {
        updateSimulation({ 
          currentStep: stepData.step,
          activeAgents: stepData.agents 
        });
        stepData.action();

        // Complete simulation on last step
        if (index === simulationSteps.length - 1) {
          setTimeout(() => {
            setSimulation(prev => ({ ...prev, isActive: false, currentStep: 0 }));
            toast({
              title: "✨ Demo Complete",
              description: "AI simulation finished successfully!",
            });
          }, stepData.duration);
        }
      }, simulationSteps.slice(0, index).reduce((acc, step) => acc + step.duration, 0));
    });
  }, [simulation.isActive, updateSimulation]);

  const stopSimulation = useCallback(() => {
    setSimulation(prev => ({
      ...prev,
      isActive: false,
      currentStep: 0,
      activeAgents: [],
      processingData: false
    }));
    toast({
      title: "⏹️ Demo Stopped",
      description: "AI simulation has been stopped",
    });
  }, []);

  return (
    <AISimulationContext.Provider value={{ simulation, startSimulation, stopSimulation, updateSimulation }}>
      {children}
    </AISimulationContext.Provider>
  );
};