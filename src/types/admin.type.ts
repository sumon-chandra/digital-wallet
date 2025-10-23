interface Auth {
	provider: string;
	providerId: string;
}

export interface User {
	_id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	password: string;
	auths: Auth[];
	is_active: "ACTIVE" | "INACTIVE";
	role: "USER" | "ADMIN" | string;
	is_verified: boolean;
	createdAt: string;
	updatedAt: string;
}

interface Meta {
	page: number;
	limit: number;
	total: number;
	totalPage: number;
}
export type GetAllUserParams = {
	page?: number;
	limit?: number;
	searchTerm?: string;
	email?: string;
	phone?: string;
};
export interface UsersResponse {
	statusCode: number;
	success: boolean;
	message: string;
	meta: Meta;
	data: User[];
}

export interface Transaction {
	_id: string;
	user: string; // user id reference
	type: "TRANSFER" | "DEPOSIT" | "WITHDRAW" | string;
	amount: number;
	transaction_fee: number;
	status: "PENDING" | "COMPLETED" | "FAILED" | string;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

interface Meta {
	page: number;
	limit: number;
	total: number;
	totalPage: number;
}

export type TransactionType = "TOP_UP" | "WITHDRAW" | "SEND_MONEY" | "RECEIVE_MONEY" | "CASH_IN" | "CASH_OUT";

export interface ITransaction {
	_id: string;
	userId: string;
	walletId: string;
	type: TransactionType;
	amount: number;
	balanceBefore?: number;
	balanceAfter?: number;
	receiverId?: string;
	senderId?: string;
	agentId?: string;
	commission?: number;
	createdAt?: string;
}

type TransactionMeta = Meta & { totalCommission: number };
export interface TransactionResponseData {
	data: ITransaction[];
	meta: TransactionMeta;
}

export interface TransactionUiProps {
	data: ITransaction[];
}

export interface TransactionApiResponse {
	statusCode: number;
	success: boolean;
	message: string;
	data: TransactionResponseData;
}

export interface Commission {
	_id: string;
	agent_id: string;
	amount: number;
	type: "CASHOUT" | "REFERRAL";
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

export interface CommissionResponse {
	statusCode: number;
	success: boolean;
	message: string;
	data: {
		data: Commission[];
	};
}

export interface WalletUiProps {
	data: Wallet[];
}
export interface Wallet {
	_id: string;
	user: string;
	balance: number;
	status: "ACTIVE" | "INACTIVE" | string; // extendable if more statuses exist
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

export interface AllWalletApiResponse {
	statusCode: number;
	success: boolean;
	message: string;
	data: {
		data: Wallet[];
	};
}

export interface WalletData {
	_id: string;
	user: string;
	balance: number;
	status: "ACTIVE" | "BLOCKED";
	createdAt: string;
	updatedAt: string;
}

export interface WalletApiResponse {
	statusCode: number;
	success: boolean;
	message: string;
	data: WalletData;
}
export interface UpdateUserRoleApiResponse {
	statusCode: number;
	success: boolean;
	message: string;
	data: User;
}
