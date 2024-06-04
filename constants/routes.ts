import {
  LandPlot,
  ArrowLeftRight,
  UserRoundCog,
  PocketKnife,
  Home,
} from "lucide-react";
import type { SidebarItem } from "@/types/DashboardTypes";

export const ROUTES_PATH = {
  home: "/",
  login: "/auth/login",
  ruangan: "/ruangan",
  tentang: "/tentang",
  dashboardSuperAdmin: {
    home: "/dashboard/superadmin",
    manageAdmins: "/dashboard/superadmin/manage-admins",
  },
  dashboardAdmin: {
    home: "/dashboard/admin",
    sapras: "/dashboard/admin/sapras",
    ruangan: "/dashboard/admin/ruangan",
    ruanganAdd: "/dashboard/admin/ruangan/add",
    ruanganEdit: "/dashboard/admin/ruangan/edit",
    daftarPeminjaman: "/dashboard/admin/daftar-peminjaman",
    peminjaman: "/dashboard/admin/peminjaman",
  },
};

export const SIDEBAR_SUPERADMIN: SidebarItem[] = [
  {
    title: "Dashboard",
    icons: Home,
    href: ROUTES_PATH.dashboardSuperAdmin.home,
  },
  {
    title: "Daftar Peminjaman",
    icons: ArrowLeftRight,
    href: ROUTES_PATH.dashboardAdmin.daftarPeminjaman,
  },
  {
    title: "Ruangan",
    icons: LandPlot,
    href: ROUTES_PATH.dashboardAdmin.ruangan,
  },
  {
    title: "Sapras",
    icons: PocketKnife,
    href: ROUTES_PATH.dashboardAdmin.sapras,
  },
  {
    title: "Manage Admins",
    icons: UserRoundCog,
    href: ROUTES_PATH.dashboardSuperAdmin.manageAdmins,
  },
];

export const SIDEBAR_ADMIN: SidebarItem[] = [
  {
    title: "Dashboard",
    icons: Home,
    href: ROUTES_PATH.dashboardAdmin.home,
  },
  {
    title: "Daftar Peminjaman",
    icons: ArrowLeftRight,
    href: ROUTES_PATH.dashboardAdmin.daftarPeminjaman,
  },
  {
    title: "Ruangan",
    icons: LandPlot,
    href: ROUTES_PATH.dashboardAdmin.ruangan,
  },
  {
    title: "Sapras",
    icons: PocketKnife,
    href: ROUTES_PATH.dashboardAdmin.sapras,
  },
];
