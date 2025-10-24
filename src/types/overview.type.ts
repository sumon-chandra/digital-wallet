/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ITransaction } from "./admin.type";

export interface QuickActionUiProps {
	actions: {
		title: string;
		url: string;
		icon?: string;
		description?: string;
	}[];
}

export interface WalletBalanceUiProps {
	balance?: number;
	loading?: boolean;
	role: string | undefined;
}

export interface RecentActivitiesUiProps {
	activities: ITransaction[];
	loading?: boolean;
	role?: string;
}
export interface TotalUserAgentProps {
	users: any[];
	data: any;
	agents: any[];
	transactions: number;
	totalCommission: number;
}
