import { baseApi } from "../../baseApi/baseApi";

const settingAllApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSettingsOthers: builder.query({
            query: (type) => ({
                url: `/agreement/details?type=${type}`,
                method: "GET",
                providesTags: ["Setting"],
            }),
        }),
    }),
});

export const { useGetAllSettingsOthersQuery } = settingAllApi;