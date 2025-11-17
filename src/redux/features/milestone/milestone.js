import { baseApi } from "../../baseApi/baseApi";

const milestoneApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMilestone: builder.query({
            query: ({ type }) => ({
                url: `/categories/all?type=${type}&sortBy=createdAt:desc`,
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

        getAlltasks: builder.query({
            query: (id) => ({
                url: `/baby-journey/${id}/all`,
                method: "GET",
            }),
            providesTags: ["Tasks"],
        }),
        createNewTask: builder.mutation({
            query: (data) => ({
                url: "/baby-journey/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Tasks"],
        }),
    }),
});

export const {
    useGetAllMilestoneQuery,
    useCreateCategoriesForBabyMutation,
    useDeleteCategoriesForBabyMutation,
    useGetAlltasksQuery,
    useCreateNewTaskMutation
} = milestoneApi;