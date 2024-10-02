import { Clock } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

const recentAppoinments = [
  {
    name: "Alice Smith",
    time: "09:30 AM",
    date: "1 hour later",
  },
  {
    name: "Bob Johnson",
    time: "11:15 AM",
    date: "3 hours later",
  },
  {
    name: "Emma Davis",
    time: "02:45 PM",
    date: "6 hours later",
  },
  {
    name: "Alice Smith",
    time: "09:30 AM",
    date: "1 hour later",
  },
];

export function RecentAppoinments() {
  return (
    <Card className="p-2">
      <CardHeader className="p-2">
        <CardTitle>Recent Appoinments</CardTitle>
      </CardHeader>
      <CardContent className="mt-4 flex flex-col p-2">
        {recentAppoinments.map((appoinment) => (
          <div
            className="grid h-[90px] grid-cols-3 items-center gap-2"
            key={appoinment.name}
          >
            <div className="flex h-full items-center justify-between">
              <p className="text-center text-sm text-muted-foreground">
                {appoinment.date}
              </p>
              <div className="flex h-full flex-col items-center justify-center">
                <div className={cn("block h-full w-[2px] bg-muted")} />
                <div className="flex items-center justify-center rounded-full bg-amber-500/10 p-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
                <div className="block h-full w-[2px] bg-muted" />
              </div>
            </div>
            <div className="col-span-2 space-y-1">
              <p className="text-sm font-semibold">{appoinment.name}</p>
              <p className="text-xs text-muted-foreground">{appoinment.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
