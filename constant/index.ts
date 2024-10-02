import {
  FileText,
  LucideIcon,
  Calendar,
  FileSpreadsheet,
  DollarSign,
  User,
  Heart,
} from "lucide-react";

type PatientSidebarNavs = {
  href: string;
  label: string;
  icon: LucideIcon;
  isHome?: boolean;
};

export const patientSidebarNavs: PatientSidebarNavs[] = [
  {
    href: "/",
    label: "Personal Information",
    icon: User,
    isHome: true,
  },
  {
    href: "/health",
    label: "Health Information",
    icon: Heart,
  },
  {
    href: "/medical-record",
    label: "Medical Record",
    icon: FileText,
  },
  {
    href: "/appointments",
    label: "Appointments",
    icon: Calendar,
  },
  {
    href: "/invoices",
    label: "Invoices",
    icon: FileSpreadsheet,
  },
  {
    href: "/payments",
    label: "Payments",
    icon: DollarSign,
  },
];
