/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	AllWalletApiResponse,
	CommissionResponse,
	TransactionResponseData,
	UpdateUserRoleApiResponse,
	UsersResponse,
	WalletApiResponse,
} from "@/types/admin.type";
import { baseApi } from "./baseApi";
import type { SuccessResponse } from "@/types/api-response";

export const adminApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllUser: builder.query<UsersResponse, { searchTerm?: string; page?: number; limit?: number } | void>({
			query: (args) => {
				const { searchTerm, page, limit } = args ?? {};
				return {
					url: "/users",
					method: "GET",
					params: { searchTerm, page, limit },
				};
			},
			providesTags: ["Admin"],
		}),

		getAllAgent: builder.query<UsersResponse, { page?: number; limit?: number } | void>({
			query: (args) => {
				const { page, limit } = args ?? {};
				return {
					url: "/users/agents",
					method: "GET",
					params: { page, limit },
				};
			},
			providesTags: ["Admin"],
		}),
		getAllTrans: builder.query<
			SuccessResponse<TransactionResponseData>,
			{ page?: number; limit?: number; type?: string; startDate?: string; endDate?: string } | void
		>({
			query: (args) => {
				const { page, limit, type, startDate, endDate } = args ?? {};
				return {
					url: "/transactions",
					method: "GET",
					params: { page, limit, type, startDate, endDate },
				};
			},
			providesTags: ["Admin"],
		}),

		getAllCommission: builder.query<CommissionResponse, void>({
			query: () => ({
				url: "/com/all-agent-com",
				method: "GET",
			}),
			providesTags: ["Admin"],
		}),
		getAllWallet: builder.query<AllWalletApiResponse, { page?: number; limit?: number } | void>({
			query: (args) => {
				const { page, limit } = args ?? {};
				return {
					url: "/wallet/all-wallets",
					method: "GET",
					params: { page, limit },
				};
			},
			providesTags: ["Admin"],
		}),
		getCapitalWallet: builder.query<AllWalletApiResponse, void>({
			query: () => ({
				url: "/wallet/capital-wallet",
				method: "GET",
			}),
			providesTags: ["Admin"],
		}),
		createBlockWallet: builder.mutation<WalletApiResponse, { id: string; body: any }>({
			query: ({ id, body }) => ({
				url: `/wallet/${id}`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: ["Admin"],
		}),

		updateUserRoleStatus: builder.mutation<UpdateUserRoleApiResponse, { id: string; body: any }>({
			query: ({ id, body }) => ({
				url: `/users/change-user-status-role/${id}`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: ["Admin"],
		}),
	}),
});

export const {
	useGetAllUserQuery,
	useGetAllAgentQuery,
	useGetAllTransQuery,
	useGetAllCommissionQuery,
	useGetAllWalletQuery,
	useCreateBlockWalletMutation,
	useUpdateUserRoleStatusMutation,
	useGetCapitalWalletQuery,
} = adminApi;
