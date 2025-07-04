
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle } from "lucide-react";
import StatsOverview from "./settings/StatsOverview";
import DelayConfiguration from "./settings/DelayConfiguration";
import NotificationSettings from "./settings/NotificationSettings";
import AdvancedSettings from "./settings/AdvancedSettings";
import SidebarCards from "./settings/SidebarCards";

const SettingsPanel = () => {
  const [delayTime, setDelayTime] = useState([60]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [autoCancel, setAutoCancel] = useState(false);

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
      <StatsOverview stats={stats} />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          <DelayConfiguration
            delayTime={delayTime}
            isEnabled={isEnabled}
            onDelayTimeChange={setDelayTime}
            onEnabledChange={setIsEnabled}
          />

          <NotificationSettings
            notifications={notifications}
            soundAlerts={soundAlerts}
            autoCancel={autoCancel}
            onNotificationsChange={setNotifications}
            onSoundAlertsChange={setSoundAlerts}
            onAutoCancelChange={setAutoCancel}
          />

          <AdvancedSettings />
        </div>

        {/* Sidebar */}
        <SidebarCards />
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
