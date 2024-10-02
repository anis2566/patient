import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const patients = [
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe",
    phone: "1234567890",
    time: "12:00 PM",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Jane Doe",
    phone: "1234567890",
    time: "12:00 PM",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe",
    phone: "1234567890",
    time: "12:00 PM",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe",
    phone: "1234567890",
    time: "12:00 PM",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe",
    phone: "1234567890",
    time: "12:00 PM",
  },
];

export function RecentPatients() {
  return (
    <Card className="p-2">
      <CardHeader className="p-2">
        <CardTitle>Recent Patients</CardTitle>
      </CardHeader>
      <CardContent className="mt-4 flex flex-col gap-6 p-2">
        {patients.map((patient) => (
          <div key={patient.name} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-x-2">
                <Avatar>
                  <AvatarImage src={patient.image} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {patient.phone}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{patient.time}</p>
            </div>
            <Separator />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
