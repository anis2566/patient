import { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { StatChart } from "./charts/stat-chart";
import { cn } from "@/lib/utils";

interface Props {
  icon: LucideIcon;
  title: string;
  value: number;
  percentage: number;
  bgColor?: string;
  textColor?: string;
}

export const StatCard = ({
  icon: Icon,
  title,
  value,
  percentage,
  bgColor,
  textColor,
}: Props) => {
  return (
    <Card className="p-2">
      <CardHeader className="p-0 px-2">
        <div className="flex items-center gap-x-4">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md text-primary",
              bgColor,
              textColor,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <p className={cn("text-md font-semibold text-primary", textColor)}>
            {title}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <StatChart />
      </CardContent>
      <CardFooter className="p-0 px-2">
        <div className="flex w-full items-start justify-between">
          <p className="text-md font-semibold">{value}</p>
          <p className="text-sm text-muted-foreground">+{percentage}%</p>
        </div>
      </CardFooter>
    </Card>
  );
};
