import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from "../utils";
import Cookies from 'js-cookie';
import { StorageKey } from '@/lib/utils';
import dayjs from 'dayjs';
import { setUserData } from '../user/userSlice';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL
    }),
    endpoints: (builder) => ({

        // 1. Create user account Endpoint
        signup: builder.mutation({
            query: (body) => ({
                url: 'users/create',
                method: 'POST',
                body,
            }),
        }),
        // 2. Login user Endpoint
        login: builder.mutation({
            query: (body) => ({
                url: 'users/login',
                method: 'POST',
                body,
            }),
        }),

        // 3. Verify OTP Endpoint
        verifyOtp: builder.mutation({
            query: (body) => ({
                url: 'users/verify-otp',
                method: 'POST',
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const storageKeys = StorageKey()
                    const expirationTime = dayjs(data?.data?.tokens?.tokenExpirationDate).toDate()
                    if (data?.data?.user) {
                        dispatch(setUserData(data?.data?.user))
                        const userData = JSON.stringify(data?.data?.user)
                        Cookies.set(storageKeys.user, userData, { expires: expirationTime })
                    }
                    if (data?.data?.tokens) {
                        const userTokens = JSON.stringify(data?.data?.tokens)
                        Cookies.set(storageKeys.tokens, userTokens, { expires: expirationTime })
                    }
                } catch (error) {
                    console.debug('OTP verification failed')
                }
            }
        }),

        // 4. Verify OTP Endpoint
        resendOtp: builder.mutation({
            query: (body) => ({
                url: 'users/resend-otp',
                method: 'POST',
                body,
            }),
        }),

    }),
});

// ⚡ RTK Query automatically in names se hooks generate kar deta hai:
export const {
    useSignupMutation,
    useLoginMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
} = authApi;