import AllWallet from "@/Pages/Dashboard/Wallet/AllWallet";
import WithdrawAdd from "@/Pages/Dashboard/PaymentCashout/WithdrawAdd";
import type { ISidebarItem } from "@/types/sidebar.type";
import { lazy } from "react";
import MyProfile from "@/Pages/Dashboard/User/MyProfile";
import AllCommission from "@/Pages/Dashboard/Commission/AllCommission";
const Overview = lazy(
  () => import("@/Pages/Dashboard/Overview/Overview")
);

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Quick Actions",
        url: "/agent/dashboard/quick-actions",
        component: Overview,
        icon: "FiBell",
      },
      {
        title: "My Profile",
        url: "/agent/dashboard/my-profile",
        component: MyProfile,
        icon: "FiUser",
      },
    ],
  },
  {
    title: "Commission",
    items: [
      {
        title: "All Commission",
        url: "/agent/dashboard/agent-com",
        component: AllCommission,
        icon: "FiDollarSign",
      },
    ],
  },
  {
    title: "Wallet",
    items: [
      {
        title: "Your Wallet",
        url: "/agent/dashboard/my-wallet",
        component: AllWallet,
        icon: "FiCreditCard",
      },
      {
        title: "Add Money",
        url: "/agent/dashboard/wallet/add",
        component: WithdrawAdd,
        icon: "FiPlusCircle",
      },
    ],
  },
];

