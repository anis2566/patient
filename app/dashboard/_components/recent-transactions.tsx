import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RecentTransactionsList } from "./recent-transactions-list";

export function RecentTransactions() {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  return (
    <Card className="container p-2 md:col-span-2">
      <CardHeader className="p-2">
        <CardTitle className="flex items-center justify-between">
          <p>Recent Transactions</p>
          <div className="flex items-center gap-2">
            <p className="text-sm">5.44%</p>
            <Badge className="rounded-full">+12.44%</Badge>
          </div>
        </CardTitle>
        <CardDescription>
          Showing recent transactions for{" "}
          <span className="font-bold text-primary">{currentMonth}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <RecentTransactionsList />
      </CardContent>
    </Card>
  );
}
