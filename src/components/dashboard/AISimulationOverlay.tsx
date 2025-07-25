import React, { useEffect, useState } from 'react';
import { useAISimulation } from '@/contexts/AISimulationContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Brain,
    Cpu,
    Database,
    Network,
    Zap,
    Activity,
    Shield,
    Globe,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Clock,
    BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataStream {
    id: string;
    source: string;
    target: string;
    data: string;
    progress: number;
}

interface ProcessingNode {
    id: string;
    name: string;
    icon: React.ElementType;
    status: 'idle' | 'processing' | 'complete' | 'error';
    progress: number;
    x: number;
    y: number;
}

const AISimulationOverlay = () => {
    const { simulation } = useAISimulation();
    const [dataStreams, setDataStreams] = useState<DataStream[]>([]);
    const [processingNodes, setProcessingNodes] = useState<ProcessingNode[]>([]);
    const [metrics, setMetrics] = useState({
        dataProcessed: 0,
        modelsRunning: 0,
        predictions: 0,
        accuracy: 0
    });

    // Initialize processing nodes
    useEffect(() => {
        setProcessingNodes([
            { id: 'data-ingestion', name: 'Data Ingestion', icon: Database, status: 'idle', progress: 0, x: 10, y: 20 },
            { id: 'risk-analyzer', name: 'Risk Analyzer', icon: Shield, status: 'idle', progress: 0, x: 30, y: 10 },
            { id: 'port-monitor', name: 'Port Monitor', icon: Globe, status: 'idle', progress: 0, x: 50, y: 30 },
            { id: 'ml-engine', name: 'ML Engine', icon: Brain, status: 'idle', progress: 0, x: 70, y: 15 },
            { id: 'predictor', name: 'Predictor', icon: TrendingUp, status: 'idle', progress: 0, x: 90, y: 25 },
        ]);
    }, []);

    // Simulate data streams and processing
    useEffect(() => {
        if (!simulation.isActive) {
            setDataStreams([]);
            setProcessingNodes(prev => prev.map(node => ({ ...node, status: 'idle', progress: 0 })));
            setMetrics({ dataProcessed: 0, modelsRunning: 0, predictions: 0, accuracy: 0 });
            return;
        }

        const interval = setInterval(() => {
            // Update metrics
            setMetrics(prev => ({
                dataProcessed: Math.min(prev.dataProcessed + Math.random() * 50, 10000),
                modelsRunning: simulation.activeAgents.length,
                predictions: Math.min(prev.predictions + Math.random() * 10, 500),
                accuracy: Math.min(85 + Math.random() * 10, 99.9)
            }));

            // Create new data streams
            if (Math.random() > 0.7) {
                const sources = ['Port Data', 'Shipment Info', 'Weather API', 'Risk Feeds', 'Market Data'];
                const targets = ['ML Engine', 'Risk Analyzer', 'Predictor', 'Port Monitor'];

                const newStream: DataStream = {
                    id: Math.random().toString(36).substring(2, 11),
                    source: sources[Math.floor(Math.random() * sources.length)],
                    target: targets[Math.floor(Math.random() * targets.length)],
                    data: `${Math.floor(Math.random() * 1000)}KB`,
                    progress: 0
                };

                setDataStreams(prev => [...prev.slice(-4), newStream]);
            }

            // Update data stream progress
            setDataStreams(prev => prev.map(stream => ({
                ...stream,
                progress: Math.min(stream.progress + 20, 100)
            })).filter(stream => stream.progress < 100));

            // Update processing nodes
            setProcessingNodes(prev => prev.map(node => {
                const isActive = simulation.activeAgents.some(agent =>
                    agent.toLowerCase().includes(node.name.toLowerCase().split(' ')[0])
                );

                if (isActive) {
                    return {
                        ...node,
                        status: 'processing',
                        progress: Math.min(node.progress + Math.random() * 15, 100)
                    };
                }

                return node;
            }));
        }, 500);

        return () => clearInterval(interval);
    }, [simulation.isActive, simulation.activeAgents]);

    if (!simulation.isActive) return null;

    return (
        <div className="fixed inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-6xl h-full max-h-[95vh] sm:max-h-[90vh] bg-card rounded-lg sm:rounded-xl border shadow-lg overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="border-b bg-card p-3 sm:p-4 animate-in slide-in-from-top-2 duration-300 delay-150">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg animate-in zoom-in duration-300 delay-300">
                                <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            </div>
                            <div className="animate-in slide-in-from-left-2 duration-300 delay-200">
                                <h2 className="text-lg sm:text-xl font-bold leading-tight text-foreground">AI Supply Chain Intelligence</h2>
                                <p className="text-muted-foreground text-xs sm:text-sm">Real-time Processing Dashboard</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 animate-in slide-in-from-right-2 duration-300 delay-250">
                            <Badge variant="secondary" className="text-xs">
                                <Activity className="h-3 w-3 mr-1" />
                                LIVE
                            </Badge>
                            <div className="text-right">
                                <div className="text-xs sm:text-sm text-muted-foreground">Step {simulation.currentStep}/{simulation.totalSteps}</div>
                                <Progress value={(simulation.currentStep / simulation.totalSteps) * 100} className="w-16 sm:w-24 h-1.5 sm:h-2" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-3 sm:p-6 h-full overflow-auto">
                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
                        <Card className="animate-in slide-in-from-bottom-2 duration-300 delay-400">
                            <CardContent className="p-2 sm:p-4">
                                <div className="flex items-center gap-1 sm:gap-2 text-primary">
                                    <Database className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="text-xs sm:text-sm font-medium">Data Processed</span>
                                </div>
                                <div className="text-lg sm:text-2xl font-bold text-foreground mt-1">
                                    {metrics.dataProcessed.toFixed(0)} <span className="text-xs sm:text-sm text-muted-foreground">MB</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="animate-in slide-in-from-bottom-2 duration-300 delay-500">
                            <CardContent className="p-2 sm:p-4">
                                <div className="flex items-center gap-1 sm:gap-2 text-primary">
                                    <Cpu className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="text-xs sm:text-sm font-medium">Models Running</span>
                                </div>
                                <div className="text-lg sm:text-2xl font-bold text-foreground mt-1">
                                    {metrics.modelsRunning} <span className="text-xs sm:text-sm text-muted-foreground">active</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="animate-in slide-in-from-bottom-2 duration-300 delay-600">
                            <CardContent className="p-2 sm:p-4">
                                <div className="flex items-center gap-1 sm:gap-2 text-primary">
                                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="text-xs sm:text-sm font-medium">Predictions</span>
                                </div>
                                <div className="text-lg sm:text-2xl font-bold text-foreground mt-1">
                                    {metrics.predictions.toFixed(0)} <span className="text-xs sm:text-sm text-muted-foreground">made</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="animate-in slide-in-from-bottom-2 duration-300 delay-700">
                            <CardContent className="p-2 sm:p-4">
                                <div className="flex items-center gap-1 sm:gap-2 text-primary">
                                    <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="text-xs sm:text-sm font-medium">Accuracy</span>
                                </div>
                                <div className="text-lg sm:text-2xl font-bold text-foreground mt-1">
                                    {metrics.accuracy.toFixed(1)} <span className="text-xs sm:text-sm text-muted-foreground">%</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Processing Visualization */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {/* Processing Nodes */}
                        <Card>
                            <CardContent className="p-3 sm:p-4">
                                <h3 className="text-foreground font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                                    <Network className="h-4 w-4 text-primary" />
                                    AI Processing Nodes
                                </h3>
                                <div className="space-y-2 sm:space-y-3">
                                    {processingNodes.map((node) => {
                                        const Icon = node.icon;
                                        return (
                                            <div key={node.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-secondary/50 rounded-lg">
                                                <div className={cn(
                                                    "p-1.5 sm:p-2 rounded-lg",
                                                    node.status === 'processing' && "bg-primary/20 animate-pulse",
                                                    node.status === 'complete' && "bg-green-500/20",
                                                    node.status === 'idle' && "bg-muted"
                                                )}>
                                                    <Icon className={cn(
                                                        "h-3 w-3 sm:h-4 sm:w-4",
                                                        node.status === 'processing' && "text-primary",
                                                        node.status === 'complete' && "text-green-600",
                                                        node.status === 'idle' && "text-muted-foreground"
                                                    )} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="text-foreground text-xs sm:text-sm font-medium truncate">{node.name}</span>
                                                        <Badge variant="outline" className={cn(
                                                            "text-xs shrink-0",
                                                            node.status === 'processing' && "border-primary text-primary",
                                                            node.status === 'complete' && "border-green-500 text-green-600",
                                                            node.status === 'idle' && "border-muted-foreground text-muted-foreground"
                                                        )}>
                                                            {node.status}
                                                        </Badge>
                                                    </div>
                                                    {node.status === 'processing' && (
                                                        <Progress value={node.progress} className="h-1 mt-1 sm:mt-2" />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Data Streams */}
                        <Card>
                            <CardContent className="p-3 sm:p-4">
                                <h3 className="text-foreground font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-primary" />
                                    Live Data Streams
                                </h3>
                                <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-auto">
                                    {dataStreams.map((stream) => (
                                        <div key={stream.id} className="p-2 sm:p-3 bg-secondary/50 rounded-lg">
                                            <div className="flex items-center justify-between mb-1 sm:mb-2 gap-2">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse shrink-0"></div>
                                                    <span className="text-foreground text-xs sm:text-sm truncate">{stream.source} → {stream.target}</span>
                                                </div>
                                                <span className="text-muted-foreground text-xs shrink-0">{stream.data}</span>
                                            </div>
                                            <Progress value={stream.progress} className="h-1" />
                                        </div>
                                    ))}
                                    {dataStreams.length === 0 && (
                                        <div className="text-center text-muted-foreground py-6 sm:py-8">
                                            <Clock className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-xs sm:text-sm">Waiting for data streams...</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Current Step Display */}
                    <Card className="mt-4 sm:mt-6">
                        <CardContent className="p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                                        <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse" />
                                    </div>
                                    <div>
                                        <h4 className="text-foreground font-semibold text-sm sm:text-base">
                                            Current Process: Step {simulation.currentStep}
                                        </h4>
                                        <p className="text-muted-foreground text-xs sm:text-sm">
                                            Active Agents: {simulation.activeAgents.join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2 sm:ml-auto">
                                    {simulation.processingData && (
                                        <Badge variant="secondary" className="text-xs">
                                            <Activity className="h-3 w-3 mr-1 animate-spin" />
                                            <span className="hidden xs:inline">Processing</span>
                                        </Badge>
                                    )}
                                    {simulation.riskLevel === 'high' && (
                                        <Badge variant="destructive" className="text-xs">
                                            <AlertTriangle className="h-3 w-3 mr-1" />
                                            <span className="hidden xs:inline">High Risk</span>
                                        </Badge>
                                    )}
                                    {simulation.riskLevel === 'medium' && (
                                        <Badge variant="secondary" className="text-xs">
                                            <AlertTriangle className="h-3 w-3 mr-1" />
                                            <span className="hidden xs:inline">Medium Risk</span>
                                        </Badge>
                                    )}
                                    {simulation.riskLevel === 'low' && (
                                        <Badge variant="secondary" className="text-xs">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            <span className="hidden xs:inline">Low Risk</span>
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AISimulationOverlay;