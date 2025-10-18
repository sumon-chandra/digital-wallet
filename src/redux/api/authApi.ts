/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ISignup, ILogin } from "@/types/auth.type";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Signup
    createUser: builder.mutation<{ message: string }, ISignup>({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    loginUser: builder.mutation<
      { data: any; message: string; token: string },
      ILogin
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logoutUser: builder.mutation<{ message: string }, void>({
      query: (credentials) => ({
        url: "/auth/logout",
        method: "POST",
        body: credentials,
        
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
