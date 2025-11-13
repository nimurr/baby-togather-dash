import { baseApi } from "../../baseApi/baseApi";

const babucareApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBabucare: builder.query({
            query: (type) => ({
                url: `/baby-care/all?category=${type}`,
                method: "GET",
            }),
            providesTags: ["Babucare"],
        }),
        createBabucare: builder.mutation({
            query: (data) => ({
                url: "/baby-care/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Babucare"],
        }),
        editBabucare: builder.mutation({
            query: ({ id, data }) => ({
                url: `/baby-care/update/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Babucare"],
        }),
        deleteBabucare: builder.mutation({
            query: (id) => ({
                url: `/baby-care/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Babucare"],
        }),


    }),
})

export const { useCreateBabucareMutation, useGetAllBabucareQuery, useDeleteBabucareMutation , useEditBabucareMutation } = babucareApi;