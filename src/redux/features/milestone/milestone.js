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
        getFullCetegoryDetails: builder.query({
            query: (id) => ({
                url: `/categories/details/${id}`,
                method: "GET",
            })
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
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/baby-journey/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks"],
        }),
        editTask: builder.mutation({
            query: ({ id, data }) => ({
                url: `/baby-journey/update/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Tasks"],
        }),
    }),
});

export const {
    useGetAllMilestoneQuery,
    useGetFullCetegoryDetailsQuery,
    useCreateCategoriesForBabyMutation,
    useDeleteCategoriesForBabyMutation,
    useGetAlltasksQuery,
    useCreateNewTaskMutation,
    useDeleteTaskMutation,
    useEditTaskMutation
} = milestoneApi;