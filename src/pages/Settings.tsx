import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Bell, 
  Shield, 
  Database, 
  Users, 
  Globe,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      pushNotifications: false,
      smsAlerts: true,
      riskThreshold: 'medium'
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: '30',
      apiAccess: false
    },
    integrations: {
      autoSync: true,
      syncInterval: '5',
      dataRetention: '90'
    },
    display: {
      darkMode: false,
      compactView: false,
      animationsEnabled: true
    }
  });

  const handleSave = () => {
    // Save settings logic would go here
    console.log('Settings saved:', settings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 min-h-[44px]"
            >
              ← Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="min-h-[44px]">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Reset</span>
              </Button>
              <Button onClick={handleSave} size="sm" className="gap-2 min-h-[44px]">
                <Save className="h-4 w-4" />
                <span className="ml-2">Save</span>
              </Button>
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your ZeroTouch dashboard preferences
            </p>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-14 p-1 bg-muted rounded-lg">
            <TabsTrigger 
              value="general" 
              className="flex flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs min-h-[44px] rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden xs:inline leading-tight">General</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs min-h-[44px] rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden xs:inline leading-tight">Alerts</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="flex flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs min-h-[44px] rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden xs:inline leading-tight">Security</span>
            </TabsTrigger>
            <TabsTrigger 
              value="integrations" 
              className="flex flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs min-h-[44px] rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden xs:inline leading-tight">APIs</span>
            </TabsTrigger>
            <TabsTrigger 
              value="data" 
              className="flex flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs min-h-[44px] rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
            >
              <Database className="h-4 w-4" />
              <span className="hidden xs:inline leading-tight">Data</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="card-maritime">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" defaultValue="ZeroTouch Maritime" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue="UTC-5 (EST)" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <Switch 
                      checked={settings.display.darkMode}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          display: { ...prev.display, darkMode: checked }
                        }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Compact View</Label>
                      <p className="text-sm text-muted-foreground">
                        Reduce spacing and padding for more content
                      </p>
                    </div>
                    <Switch 
                      checked={settings.display.compactView}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          display: { ...prev.display, compactView: checked }
                        }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Animations</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable smooth transitions and animations
                      </p>
                    </div>
                    <Switch 
                      checked={settings.display.animationsEnabled}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          display: { ...prev.display, animationsEnabled: checked }
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="card-maritime">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Alert Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive critical alerts via email
                      </p>
                    </div>
                    <Switch 
                      checked={settings.notifications.emailAlerts}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, emailAlerts: checked }
                        }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Browser notifications for real-time alerts
                      </p>
                    </div>
                    <Switch 
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, pushNotifications: checked }
                        }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Critical alerts sent to your mobile device
                      </p>
                    </div>
                    <Switch 
                      checked={settings.notifications.smsAlerts}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, smsAlerts: checked }
                        }))
                      }
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="email">Alert Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue="alerts@company.com" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">SMS Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    defaultValue="+1 (555) 123-4567" 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <Card className="card-maritime">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch 
                      checked={settings.security.twoFactorAuth}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, twoFactorAuth: checked }
                        }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>API Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow third-party applications to access your data
                      </p>
                    </div>
                    <Switch 
                      checked={settings.security.apiAccess}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, apiAccess: checked }
                        }))
                      }
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="session">Session Timeout (minutes)</Label>
                  <Input 
                    id="session" 
                    type="number" 
                    value={settings.security.sessionTimeout}
                    onChange={(e) => 
                      setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, sessionTimeout: e.target.value }
                      }))
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="apikey">API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input 
                        id="apikey" 
                        type={showApiKey ? "text" : "password"}
                        defaultValue="sk-1234567890abcdef"
                        className="pr-10"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="card-maritime">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  API Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Sync</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically sync data from connected services
                      </p>
                    </div>
                    <Switch 
                      checked={settings.integrations.autoSync}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          integrations: { ...prev.integrations, autoSync: checked }
                        }))
                      }
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="syncInterval">Sync Interval (minutes)</Label>
                    <Input 
                      id="syncInterval" 
                      type="number" 
                      value={settings.integrations.syncInterval}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          integrations: { ...prev.integrations, syncInterval: e.target.value }
                        }))
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="retention">Data Retention (days)</Label>
                    <Input 
                      id="retention" 
                      type="number" 
                      value={settings.integrations.dataRetention}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          integrations: { ...prev.integrations, dataRetention: e.target.value }
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Management */}
          <TabsContent value="data" className="space-y-6">
            <Card className="card-maritime">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <Download className="h-5 w-5" />
                    <span className="text-sm">Export Data</span>
                  </Button>
                  
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <Upload className="h-5 w-5" />
                    <span className="text-sm">Import Data</span>
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground">
                    These actions cannot be undone. Please be careful.
                  </p>
                  
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Clear All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;