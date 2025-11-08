import type { AddMoneyResponse, WithdrawResponse } from "@/types/withdraw.type";
import { baseApi } from "./baseApi";
import type { CommissionResponse } from "@/types/admin.type";

export const agentApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getCommission: builder.query<CommissionResponse, void>({
			query: () => ({
				url: "/com/agent-com",
				method: "GET",
			}),
			providesTags: ["Agent"],
		}),
		createAddMoney: builder.mutation<AddMoneyResponse, { cashInUserId: string; amount: number }>({
			query: (body) => ({
				url: "/wallet/cash-in",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Agent", "User"],
		}),
		createWithdrawMoney: builder.mutation<WithdrawResponse, { cashOutUserId: string; amount: number }>({
			query: (body) => ({
				url: "/wallet/cash-out",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Agent", "User"],
		}),
	}),
});

export const { useGetCommissionQuery, useCreateAddMoneyMutation, useCreateWithdrawMoneyMutation } = agentApi;
