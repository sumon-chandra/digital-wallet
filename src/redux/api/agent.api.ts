import type { AddMoneyResponse } from "@/types/withdraw.type";
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
    createAddMoney: builder.mutation<AddMoneyResponse, void>({
      query: (body) => ({
        url: "/wallet/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Agent"],
    }),
  }),
});

export const { useGetCommissionQuery ,useCreateAddMoneyMutation} = agentApi;
