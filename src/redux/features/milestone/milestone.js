import { baseApi } from "../../baseApi/baseApi";

const milestoneApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMilestone: builder.query({
            query: ({ name, type }) => ({
                url: `/categories/all?name=${name}&type=${type}&sortBy=createdAt:desc`,
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),
        createCategoriesForBaby: builder.mutation({
            query: (data) => ({
                url: "/categories/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Categories"],
        }),
        deleteCategoriesForBaby: builder.mutation({
            query: (id) => ({
                url: `/categories/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories"],
        }),
    }),
});

export const { useGetAllMilestoneQuery, useCreateCategoriesForBabyMutation, useDeleteCategoriesForBabyMutation } = milestoneApi;