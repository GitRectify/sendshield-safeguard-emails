
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Clock } from "lucide-react";

interface DelayConfigurationProps {
  delayTime: number[];
  isEnabled: boolean;
  onDelayTimeChange: (value: number[]) => void;
  onEnabledChange: (enabled: boolean) => void;
}

const DelayConfiguration = ({ 
  delayTime, 
  isEnabled, 
  onDelayTimeChange, 
  onEnabledChange 
}: DelayConfigurationProps) => {
  const presetTimes = [
    { label: "Quick Review", value: 15, description: "15 seconds" },
    { label: "Standard", value: 60, description: "1 minute" },
    { label: "Thorough Review", value: 120, description: "2 minutes" }
  ];

  return (
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
          <Switch checked={isEnabled} onCheckedChange={onEnabledChange} />
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
            onValueChange={onDelayTimeChange}
            max={300}
            min={5}
            step={5}
            className="w-full"
            disabled={!isEnabled}
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {presetTimes.map((preset) => (
              <Button
                key={preset.value}
                variant={delayTime[0] === preset.value ? "default" : "outline"}
                size="sm"
                onClick={() => onDelayTimeChange([preset.value])}
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
  );
};

export default DelayConfiguration;
