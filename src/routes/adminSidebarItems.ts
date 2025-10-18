import AllWallet from "@/Pages/Dashboard/Wallet/AllWallet";
import AllCommission from "@/Pages/Dashboard/Commission/AllCommission";
import AllTrans from "@/Pages/Dashboard/Transaction/AllTrans";
import type { ISidebarItem } from "@/types/sidebar.type";
import { lazy } from "react";
import MyProfile from "@/Pages/Dashboard/User/MyProfile";
import AllUsers from "@/Pages/Dashboard/User/AllUsers";
import UpdateUserRoleStatus from "@/Pages/Dashboard/User/UpdateUserRoleStatus";
import AddMoneyWalletWrapper from "@/Pages/Dashboard/Wallet/Wrapper/AddMoneyWalletWrapper";
import BlockWalletWrapper from "@/Pages/Dashboard/Wallet/Wrapper/BlockWalletWrapper";

const Overview = lazy(() => import("@/Pages/Dashboard/Overview/Overview"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Quick Actions",
        url: "/admin/dashboard/quick-actions",
        component: Overview,
        icon: "FiBell",
      },
      {
        title: "My Profile",
        url: "/admin/dashboard/my-profile",
        component: MyProfile,
        icon: "FiUser",
      },
    ],
  },
  {
    title: "Manage User",
    items: [
      {
        title: "All Users",
        url: "/admin/dashboard/all-users",
        component: AllUsers,
        icon: "FiUsers",
      },
      {
        title: "All Agents",
        url: "/admin/dashboard/all-agents",
        component: AllUsers,
        icon: "FiUserCheck",
      },
      {
        title: "Update User Role",
        url: "/admin/dashboard/update-user-role",
        component: UpdateUserRoleStatus,
        icon: "FiEdit",
      },
      {
        title: "Update User Status",
        url: "/admin/dashboard/update-user-status",
        component: UpdateUserRoleStatus,
        icon: "FiEdit",
      },

    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "All Transaction",
        url: "/admin/dashboard/all-trans",
        component: AllTrans,
        icon: "FiList",
      },
    ],
  },
  {
    title: "Commission",
    items: [
      {
        title: "All Commission",
        url: "/admin/dashboard/all-agent-com",
        component: AllCommission,
        icon: "FiDollarSign",
      },
    ],
  },
  {
    title: "Wallet",
    items: [
      {
        title: "All Wallet",
        url: "/admin/dashboard/all-wallet",
        component: AllWallet,
        icon: "FiCreditCard",
      },
      {
        title: "Add Money",
        url: "/admin/dashboard/add-money-wallet",
        component: AddMoneyWalletWrapper, 
        icon: "FiPlusCircle",
      },
      {
        title: "Block Wallet",
        url: "/admin/dashboard/block-wallet",
        component: BlockWalletWrapper, 
        icon: "FiLock",
      },
    ],
  },
];
