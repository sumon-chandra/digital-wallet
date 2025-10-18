/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Commission, Transaction } from "./admin.type";

export interface QuickActionUiProps {
  actions: {
    title: string;
    url: string;
    icon?: string;
  }[];
}

export interface WalletBalanceUiProps {
  balance?: number;
  loading?: boolean;
  role: string | undefined;
}

export interface RecentActivitiesUiProps {
  activities: Transaction[] | Commission[];
  loading?: boolean;
  role?: string;
}
export interface TotalUserAgentProps {
  users: any[];
  data: any;
  agents: any[];
  transactions: number | never[];
  commissions: { amount: number }[];
}

