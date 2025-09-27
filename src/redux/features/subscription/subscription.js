import { baseApi } from "../../baseApi/baseApi";


const subScriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubScription: builder.query({
            query: () => ({
                url: `/subscription-plan`, // ✅ Fixed API URL
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),
        createSubScription: builder.mutation({
            query: (formData) => ({
                url: `/subscription-plan`, // ✅ Fixed API URL
                method: "POST",
                body: formData,

            }),
            invalidatesTags: ["Subscription"],
        }),
        updateScription: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/subscription-plan/${id}`, // ✅ Fixed API URL
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["Subscription"],
        }),

        deleteSubScription: builder.mutation({
            query: (id) => ({
                url: `/subscription-plan/${id}`, // ✅ Fixed API URL
                method: "DELETE",
            }),
            invalidatesTags: ["Subscription"],
        }),
        getAllSubscribers: builder.query({
            query: () => ({
                url: `/subscription-plan`, // ✅ Fixed API URL
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),
    }),
});

export const { useGetSubScriptionQuery, useCreateSubScriptionMutation, useUpdateScriptionMutation, useDeleteSubScriptionMutation } = subScriptionApi;
