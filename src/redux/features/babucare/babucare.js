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
            query: ( type ) => ({
                url: `/baby-care/${type}/all`,
                method: "GET",
            }),
        }),
        deleteBabucare: builder.mutation({
            query: (data) => ({
                url: `/baby-care/delete`,
                method: "POST",
                body: data,
            }),
        }),


    }),
})

export const { useCreateBabucareMutation, useGetAllBabucareQuery } = babucareApi;