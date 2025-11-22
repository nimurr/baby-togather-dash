import { baseApi } from "../../baseApi/baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllSettings: builder.query({
      query: () => ({
        url: "/general-info",
        method: "GET",
        providesTags: ["Setting"],
      }),
    }),

    updatePrivacyPolicyAll: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/agreement/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),


    addFaqMain: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/general-info/add-new-faq",
        method: "POST",
        body: data,
      }),
    }),
    deleteFaq: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: `/general-info/delete-faq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),

    updateTramsAndConditionsAll: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/info/terms-condition",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/info/terms-condition",
        method: "GET",
        providesTags: ["Setting"],
      }),
    }),


    updateAboutUs: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/info/about-us",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),

    getAboutUs: builder.query({
      query: () => ({
        url: "/info/about-us",
        method: "GET",
        providesTags: ["Setting"],
      }),
    }),

    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/info/privacy-policy",
        method: "GET",
        providesTags: ["Setting"],
      }),
    }),
    updatePrivacyPolicy: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/info/privacy-policy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),


    getUserProfile: builder.query({
      query: () => ({
        url: "/get-settings-data",
        method: "GET",
        providesTags: ["Profile"],
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/update-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),


    getAllNotification: builder.query({
      query: () => ({
        url: "/notifications",
        method: "GET",
        providesTags: ["Notification"],
      }),
    }),




  }),
});

export const {
  useGetAllSettingsQuery,
  useUpdatePrivacyPolicyAllMutation, // ✅ FIXED: Mutation hook 
  useUpdateTramsAndConditionsAllMutation,
  useGetTermsAndConditionsQuery,
  useAddFaqMainMutation,
  useDeleteFaqMutation,

  useUpdateAboutUsMutation,
  useGetAboutUsQuery,

  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,

  useGetUserProfileQuery,
  useUpdateProfileMutation,

  useGetAllNotificationQuery
} = settingApi;
