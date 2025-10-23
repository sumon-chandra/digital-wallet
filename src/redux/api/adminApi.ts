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
		// redux/api/userApi.ts
		getAllUser: builder.query<UsersResponse, { searchTerm?: string } | void>({
			query: () => ({
				url: "/users",
				method: "GET",
			}),
			providesTags: ["Admin"],
		}),

		getAllAgent: builder.query<UsersResponse, void>({
			query: () => ({
				url: "/users/agents",
				method: "GET",
			}),
			providesTags: ["Admin"],
		}),
		getAllTrans: builder.query<
			SuccessResponse<TransactionResponseData>,
			{ page: number; limit: number; type?: string; startDate?: string; endDate?: string }
		>({
			query: ({ page, limit, type, startDate, endDate }) => ({
				url: "/transactions",
				method: "GET",
				params: { page, limit, type, startDate, endDate },
			}),
			providesTags: ["Admin"],
		}),

		getAllCommission: builder.query<CommissionResponse, void>({
			query: () => ({
				url: "/com/all-agent-com",
				method: "GET",
			}),
			providesTags: ["Admin"],
		}),
		getAllWallet: builder.query<AllWalletApiResponse, void>({
			query: () => ({
				url: "/wallet/all-wallet",
				method: "GET",
			}),
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
				url: `/user/${id}`,
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
