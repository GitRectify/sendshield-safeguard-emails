
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

interface NotificationSettingsProps {
  notifications: boolean;
  soundAlerts: boolean;
  autoCancel: boolean;
  onNotificationsChange: (enabled: boolean) => void;
  onSoundAlertsChange: (enabled: boolean) => void;
  onAutoCancelChange: (enabled: boolean) => void;
}

const NotificationSettings = ({
  notifications,
  soundAlerts,
  autoCancel,
  onNotificationsChange,
  onSoundAlertsChange,
  onAutoCancelChange
}: NotificationSettingsProps) => {
  return (
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
          <Switch checked={notifications} onCheckedChange={onNotificationsChange} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900">Sound Alerts</div>
            <div className="text-sm text-gray-600">Play subtle audio cues</div>
          </div>
          <Switch checked={soundAlerts} onCheckedChange={onSoundAlertsChange} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900">Auto-Cancel on Errors</div>
            <div className="text-sm text-gray-600">Automatically stop emails with detected issues</div>
          </div>
          <Switch checked={autoCancel} onCheckedChange={onAutoCancelChange} />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
