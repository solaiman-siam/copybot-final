import { baseApi } from "../../api/baseApi";



const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    login: builder.mutation({
        query: (userInfo) => ({
            url: '/login',
            method: 'POST',
            body: userInfo
        }),
    }),
    logout: builder.mutation({
        query: () => ({
            url: '/logout',
            method: 'POST',
        }),
        extraOptions: {requireAuth: true}
    }),
    forgetPass: builder.mutation({
        query: (userEmail) => ({
            url: '/send-otp',
            method: 'POST',
            body: userEmail
        })
    }),
    verifyOtp: builder.mutation({
        query: (otpInfo) => ({
            url: '/verify-otp',
            method: 'POST',
            body: otpInfo
        })
    }),
    resendOtp: builder.mutation({
        query: (userEmail) => ({
            url: '/resend-otp',
            method: 'POST',
            body: userEmail
        })
    }),
    setNewPass: builder.mutation({
        query: (newPassInfo) => ({
            url: '/reset-password',
            method: 'POST',
            body: newPassInfo
        })
    }),
    registerOtp: builder.mutation({
        query: (userEmail) => ({
            url: '/send-register-otp',
            method: 'POST',
            body: userEmail
        })
    }),
    verifyRegisterOtp: builder.mutation({
        query: (otpInfo) => ({
            url: '/verify-register-otp',
            method: 'POST',
            body: otpInfo
        })
    }),
    resendRegisterOtp: builder.mutation({
        query: (userEmail) => ({
            url: '/resend-register-otp',
            method: 'POST',
            body: userEmail
        })
    }),
    register: builder.mutation({
        query: (userInfo) => ({
            url: '/register-user',
            method: 'POST',
            body: userInfo
        })
    }),
    googleLogin: builder.mutation({
        query: (googleInfo) => ({
            url: '/auth/google',
            method: 'POST',
            body: googleInfo
        })
    }),
    deleteAccount: builder.mutation({
        query: () => ({
            url: '/delete-account',
            method: 'DELETE',
        }),
        extraOptions: {requireAuth: true}
    })
    
  }),
})


export const {useLoginMutation, useForgetPassMutation, useVerifyOtpMutation, useResendOtpMutation, useSetNewPassMutation, useRegisterOtpMutation, useVerifyRegisterOtpMutation, useResendRegisterOtpMutation, useRegisterMutation, useLogoutMutation, useGoogleLoginMutation, useDeleteAccountMutation} = authApi