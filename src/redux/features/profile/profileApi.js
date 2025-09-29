import { baseApi } from "../../baseApi/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url:`/users/self/in`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: "/users/self/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response) => response.data,
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
} = profileApi;
