import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { EarningChart } from "./charts/earning-chart";

export function EarningCard() {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  return (
    <Card className="p-2 md:col-span-2">
      <CardHeader className="p-2">
        <CardTitle className="flex items-center justify-between">
          <p>Earning Report</p>
          <div className="flex items-center gap-2">
            <p className="text-sm">5.44%</p>
            <Badge className="rounded-full">+12.44%</Badge>
          </div>
        </CardTitle>
        <CardDescription>
          Showing total earnings for{" "}
          <span className="font-bold text-primary">{currentMonth}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <EarningChart />
      </CardContent>
    </Card>
  );
}
