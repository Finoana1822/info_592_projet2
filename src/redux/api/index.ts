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
        baseUrl: `${import.meta.env.VITE_APP_BACKEND_URI}`
    }) as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
    tagTypes: ["Groupe", "Session", "Question", "User"],
    endpoints: () => ({}),
});

export default api;