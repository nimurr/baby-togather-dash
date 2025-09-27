import { baseApi } from "../../baseApi/baseApi";

const babucareApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBabucare: builder.mutation({
            query: (data) => ({
                url: "/baby-care/create",
                method: "POST",
                body: data,
            }),
        }),


        getAllBabucare: builder.query({
            query: () => ({
                url: "/babucare",
                method: "GET",
            }),
        }),
    }),
})

export const { useGetAllBabucareQuery, useCreateBabucareMutation } = babucareApi;