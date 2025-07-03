
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Clock, BarChart3, Bell, Zap, Settings, CheckCircle, Star } from "lucide-react";

const SettingsPanel = () => {
  const [delayTime, setDelayTime] = useState([60]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [autoCancel, setAutoCancel] = useState(false);

  const presetTimes = [
    { label: "Quick Review", value: 15, description: "15 seconds" },
    { label: "Standard", value: 60, description: "1 minute" },
    { label: "Thorough Review", value: 120, description: "2 minutes" },
    { label: "Custom", value: delayTime[0], description: `${delayTime[0]} seconds` }
  ];

  const stats = [
    { label: "Emails Protected Today", value: "23", change: "+4" },
    { label: "Mistakes Prevented", value: "187", change: "+12" },
    { label: "Time Saved", value: "4.2h", change: "+0.8h" },
    { label: "Success Rate", value: "98.7%", change: "+0.3%" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-8 h-8 text-premium-blue" />
          <h1 className="text-2xl font-bold text-gray-900">SendShield Settings</h1>
          <Badge className="bg-shield-green text-white">Pro</Badge>
        </div>
        <p className="text-gray-600">Configure your email protection preferences with enterprise-grade precision</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <Badge variant="secondary" className="text-xs text-shield-green">
                {stat.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delay Configuration */}
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-premium-blue" />
                <CardTitle>Delay Configuration</CardTitle>
              </div>
              <CardDescription>
                Customize how long SendShield holds your emails before sending
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Enable SendShield Protection</div>
                  <div className="text-sm text-gray-600">Automatically delay all outgoing emails</div>
                </div>
                <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-gray-900">Delay Duration</label>
                  <Badge variant="outline" className="text-premium-blue border-premium-blue">
                    {delayTime[0]} seconds
                  </Badge>
                </div>
                
                <Slider
                  value={delayTime}
                  onValueChange={setDelayTime}
                  max={300}
                  min={5}
                  step={5}
                  className="w-full"
                  disabled={!isEnabled}
                />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {presetTimes.slice(0, 3).map((preset) => (
                    <Button
                      key={preset.value}
                      variant={delayTime[0] === preset.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDelayTime([preset.value])}
                      disabled={!isEnabled}
                      className="text-xs"
                    >
                      {preset.description}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-premium-blue" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>
                Control how SendShield communicates with you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Visual Notifications</div>
                  <div className="text-sm text-gray-600">Show delay countdown in Gmail</div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Sound Alerts</div>
                  <div className="text-sm text-gray-600">Play subtle audio cues</div>
                </div>
                <Switch checked={soundAlerts} onCheckedChange={setSoundAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Auto-Cancel on Errors</div>
                  <div className="text-sm text-gray-600">Automatically stop emails with detected issues</div>
                </div>
                <Switch checked={autoCancel} onCheckedChange={setAutoCancel} />
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-premium-blue" />
                <CardTitle>Advanced Configuration</CardTitle>
              </div>
              <CardDescription>
                Fine-tune SendShield for your specific workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="font-medium text-gray-900">Priority Email Handling</label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Send Immediately</SelectItem>
                    <SelectItem value="reduced">Reduced Delay (15s)</SelectItem>
                    <SelectItem value="standard">Standard Delay</SelectItem>
                    <SelectItem value="extended">Extended Delay (5min)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="font-medium text-gray-900">Email Categories</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Protect All Emails</SelectItem>
                    <SelectItem value="external">External Only</SelectItem>
                    <SelectItem value="internal">Internal Only</SelectItem>
                    <SelectItem value="custom">Custom Rules</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* License Status */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-shield-green/5 to-premium-blue/5">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-shield-green" />
                <CardTitle className="text-lg">License Status</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-shield-green" />
                  <span className="text-sm font-medium">Email Magic Pro</span>
                </div>
                <div className="text-xs text-gray-600">
                  Valid until: December 31, 2024
                </div>
                <Badge className="w-full justify-center bg-shield-green text-white">
                  Active License
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-premium-blue" />
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Export Usage Report
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Backup Settings
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Test Protection
              </Button>
            </CardContent>
          </Card>

          {/* Usage Analytics */}
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-premium-blue" />
                <CardTitle className="text-lg">This Week</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Emails Protected</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Changes Made</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Time Saved</span>
                  <span className="font-semibold">2.1h</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">Success Rate</span>
                    <span className="font-bold text-shield-green">98.7%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Button */}
      <div className="text-center pt-4">
        <Button size="lg" className="premium-gradient text-white px-8 py-3">
          <CheckCircle className="w-5 h-5 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
