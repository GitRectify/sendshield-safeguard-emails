
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";

const AdvancedSettings = () => {
  return (
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
  );
};

export default AdvancedSettings;
