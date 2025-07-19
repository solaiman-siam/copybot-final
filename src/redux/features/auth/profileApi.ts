import { baseApi } from "../../api/baseApi";


const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation({
            query: (profileInfo) => ({
                url: '/update-profile',
                method: 'POST',
                body: profileInfo,
            }),
            extraOptions: {requireAuth: true}
        }),
        emailUpdate: builder.mutation({
            query: (emailInfo) => ({
                url: '/change-email',
                method: 'POST',
                body: emailInfo,
            }),
            extraOptions: {requireAuth: true}
        }),
        passwordUpdate: builder.mutation({
            query: (passwordInfo) => ({
                url: '/change-password',
                method: 'POST',
                body: passwordInfo,
            }),
            extraOptions: {requireAuth: true}
        })
    })
})

export const {useUpdateProfileMutation, useEmailUpdateMutation, usePasswordUpdateMutation} = profileApi