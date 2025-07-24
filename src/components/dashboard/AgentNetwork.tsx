import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network } from "lucide-react";

const AgentNetwork = () => {
  return (
    <Card className="card-maritime lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Network className="h-5 w-5 text-primary" />
          Agent Network
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Network Visualization */}
          <div className="relative bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg h-32 overflow-hidden">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              {/* Network connections */}
              <line x1="50" y1="20" x2="100" y2="50" stroke="hsl(var(--border))" strokeWidth="1" />
              <line x1="150" y1="20" x2="100" y2="50" stroke="hsl(var(--border))" strokeWidth="1" />
              <line x1="100" y1="50" x2="100" y2="80" stroke="hsl(var(--border))" strokeWidth="1" />
              
              {/* Agent nodes */}
              <circle cx="50" cy="20" r="4" fill="hsl(var(--primary))" />
              <circle cx="150" cy="20" r="4" fill="hsl(var(--primary))" />
              <circle cx="100" cy="50" r="6" fill="hsl(var(--accent))" />
              <circle cx="100" cy="80" r="4" fill="hsl(var(--primary))" />
              
              {/* Labels */}
              <text x="45" y="15" fontSize="6" fill="hsl(var(--foreground))" textAnchor="middle">W</text>
              <text x="155" y="15" fontSize="6" fill="hsl(var(--foreground))" textAnchor="middle">O</text>
              <text x="100" y="52" fontSize="6" fill="hsl(var(--foreground))" textAnchor="middle">G</text>
              <text x="100" y="83" fontSize="6" fill="hsl(var(--foreground))" textAnchor="middle">C</text>
              <text x="100" y="95" fontSize="6" fill="hsl(var(--foreground))" textAnchor="middle">D</text>
            </svg>
          </div>
          
          {/* Network Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center">
              <div className="font-medium">Watchtower</div>
              <div className="text-muted-foreground">Oracle</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Guardian</div>
              <div className="text-muted-foreground">Commander</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-medium text-sm">Diplomat</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentNetwork;