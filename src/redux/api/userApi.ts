import { baseApi } from "./baseApi";
import type { TransferResponse, WithdrawResponse } from "@/types/withdraw.type";
import type { AllWalletApiResponse, GetAllUserParams, SingleUserResponse, TransactionApiResponse, UsersResponse } from "@/types/admin.type";
import type { SuccessResponse } from "@/types/api-response";
import type { IUser } from "@/types/user.type";

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		GetMyProfile: builder.query<SuccessResponse<IUser>, void>({
			query: () => ({
				url: "/users/me",
				method: "GET",
			}),
			providesTags: ["User"],
		}),
		UpdateMyProfile: builder.mutation<SuccessResponse<IUser>, Record<string, string>>({
			query: (payload) => ({
				url: "/users/update-profile",
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["User"],
		}),
		getYourTrans: builder.query<TransactionApiResponse, { page?: number; limit?: number; type?: string; startDate?: string; endDate?: string }>({
			query: ({ page, limit, type, startDate, endDate }) => ({
				url: "/trans/your-transactions",
				method: "GET",
				params: { page, limit, type, startDate, endDate },
			}),
			providesTags: ["User"],
		}),

		getYourWallet: builder.query<AllWalletApiResponse, { page?: number; limit?: number } | void>({
			query: (args) => {
				const { page, limit } = args ?? {};
				return {
					url: "/wallet/my-wallet",
					method: "GET",
					params: { page, limit },
				};
			},
			providesTags: ["User"],
		}),
		createWithdraw: builder.mutation<WithdrawResponse, void>({
			query: (body) => ({
				url: "/wallet/withdraw",
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		createTransfer: builder.mutation<TransferResponse, { receiverId: string; amount: number }>({
			query: (body) => ({
				url: "/wallet/send-money",
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		getAllUser: builder.query<UsersResponse, GetAllUserParams>({
			query: (params) => ({
				url: "/users",
				method: "GET",
				params,
			}),
		}),
		getUser: builder.query<SingleUserResponse, { search: string; method: string }>({
			query: ({ search, method }) => ({
				url: "/users/get-user-by-phone-email",
				method: "GET",
				params: { search, method },
			}),
		}),
		selectUser: builder.query<SingleUserResponse, { search: string; method: string; role: string }>({
			query: ({ search, method, role }) => ({
				url: "/users/select-user-for-transaction",
				method: "GET",
				params: { search, method, role },
			}),
		}),
	}),
});

export const {
	useGetMyProfileQuery,
	useUpdateMyProfileMutation,
	useGetYourTransQuery,
	useGetYourWalletQuery,
	useCreateWithdrawMutation,
	useCreateTransferMutation,
	useLazyGetAllUserQuery,
	useGetUserQuery,
	useSelectUserQuery,
} = userApi;
