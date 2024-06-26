import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

interface CustomError {
  data: {
    errors: string[];
  };
}

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BACKEND_URI}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token') as string
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
  tagTypes: ["Recipe"],
  endpoints: () => ({}),
});

export default api;
