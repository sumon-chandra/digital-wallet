import AllWallet from "@/Pages/Dashboard/Wallet/AllWallet";
import WithdrawAdd from "@/Pages/Dashboard/PaymentCashout/WithdrawAdd";
import type { ISidebarItem } from "@/types/sidebar.type";
import { lazy } from "react";
import MyProfile from "@/Pages/Dashboard/User/MyProfile";
import TransferMoney from "@/Pages/Dashboard/PaymentCashout/TransferMoney";
import AllTrans from "@/Pages/Dashboard/Transaction/AllTrans";
const Overview = lazy(() => import("@/Pages/Dashboard/Overview/Overview"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Quick Actions",
        url: "/user/dashboard/quick-actions",
        component: Overview,
        icon: "FiBell",
      },
      {
        title: "My Profile",
        url: "/user/dashboard/my-profile",
        component: MyProfile,
        icon: "FiUser",
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "Your Transaction History",
        url: "/user/dashboard/your-trans",
        component: AllTrans,
        icon: "FiList",
      },
    ],
  },
  {
    title: "Wallet",
    items: [
      {
        title: "Your Wallet",
        url: "/user/dashboard/my-wallet",
        component: AllWallet,
        icon: "FiDollarSign",
      },
      {
        title: "Withdraw Money",
        url: "/user/dashboard/wallet/withdraw",
        component: WithdrawAdd,
        icon: "FiArrowDown",
      },
      {
        title: "Transfer Money",
        url: "/user/dashboard/wallet/transfer",
        component: TransferMoney,
        icon: "FiSend",
      },
    ],
  },
];

