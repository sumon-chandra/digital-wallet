import { BACKEND_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		// baseUrl: "http://localhost:5000/api/v1",

		baseUrl: BACKEND_BASE_URL,

		credentials: "include",
	}),
	tagTypes: ["Admin", "User", "Agent", "Auth"],
	endpoints: () => ({}),
});
