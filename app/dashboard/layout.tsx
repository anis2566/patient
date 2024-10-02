import { DashboardLayout } from "./_components/dashboard-layout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <WebPushProvider>
    //   <AppKnockProviders userId={session.userId}>
    <DashboardLayout>{children}</DashboardLayout>
    //   </AppKnockProviders>
    // </WebPushProvider>
  );
}
