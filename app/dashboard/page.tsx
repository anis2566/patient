import { Calendar, DollarSign, Pill, Users } from "lucide-react";

import { ContentLayout } from "./_components/content-layout";
import { StatCard } from "./_components/stat-card";
import { EarningCard } from "./_components/earning-card";
import { RecentPatients } from "./_components/recent-patients";
import { RecentTransactions } from "./_components/recent-transactions";
import { RecentAppoinments } from "./_components/recent-appoinments";

const Dashboard = () => {
  return (
    <ContentLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-4">
        <StatCard
          icon={Users}
          title="Total Patients"
          value={1600}
          percentage={56}
          bgColor="bg-sky-500/10"
          textColor="text-sky-500"
        />
        <StatCard
          icon={Calendar}
          title="Appointments"
          value={290}
          percentage={12}
          bgColor="bg-amber-500/10"
          textColor="text-amber-500"
        />
        <StatCard
          icon={Pill}
          title="Prescriptions"
          value={2049}
          percentage={30}
          bgColor="bg-indigo-500/10"
          textColor="text-indigo-500"
        />
        <StatCard
          icon={DollarSign}
          title="Total Earnings"
          value={358028}
          percentage={20}
          bgColor="bg-green-500/10"
          textColor="text-green-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <EarningCard />
        <RecentPatients />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <RecentTransactions />
        <RecentAppoinments />
      </div>
    </ContentLayout>
  );
};

export default Dashboard;
