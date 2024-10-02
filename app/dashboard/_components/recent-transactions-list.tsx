import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const transactions = [
  {
    id: 1,
    patient: "Alice Johnson",
    imageUrl: "https://github.com/shadcn.png",
    phone: "1234567890",
    date: "2023-03-15",
    status: "Completed",
    amount: 250,
    method: "Cash",
  },
  {
    id: 2,
    patient: "Bob Smith",
    imageUrl: "https://github.com/shadcn.png",
    phone: "1234567890",
    date: "2023-04-02",
    status: "Pending",
    amount: 180,
    method: "Bank",
  },
  {
    id: 3,
    patient: "Carol Williams",
    imageUrl: "https://github.com/shadcn.png",
    phone: "1234567890",
    date: "2023-03-28",
    status: "Failed",
    amount: 75,
    method: "Bank",
  },
  {
    id: 4,
    patient: "David Brown",
    imageUrl: "https://github.com/shadcn.png",
    phone: "1234567890",
    date: "2023-04-10",
    status: "Completed",
    amount: 320,
    method: "Cash",
  },
  {
    id: 5,
    patient: "Eva Davis",
    imageUrl: "https://github.com/shadcn.png",
    phone: "1234567890",
    date: "2023-04-05",
    status: "Pending",
    amount: 150,
    method: "Cash",
  },
];

export function RecentTransactionsList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SL</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Method</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="py-3">{transaction.id}</TableCell>
            <TableCell className="flex items-center gap-2 py-3">
              <Avatar>
                <AvatarImage src={transaction.imageUrl} />
                <AvatarFallback>
                  {transaction.patient.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-smfont-semibold">{transaction.patient}</p>
                <p className="text-xs text-muted-foreground">
                  {transaction.phone}
                </p>
              </div>
            </TableCell>
            <TableCell className="py-3">{transaction.date}</TableCell>
            <TableCell className="py-3">{transaction.status}</TableCell>
            <TableCell className="py-3">{transaction.amount}</TableCell>
            <TableCell className="py-3">{transaction.method}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
