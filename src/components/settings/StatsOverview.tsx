
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatItem {
  label: string;
  value: string;
  change: string;
}

interface StatsOverviewProps {
  stats: StatItem[];
}

const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
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
  );
};

export default StatsOverview;
