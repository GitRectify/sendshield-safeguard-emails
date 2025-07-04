
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, Zap, BarChart3, Settings, Shield } from "lucide-react";

const SidebarCards = () => {
  return (
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
  );
};

export default SidebarCards;
