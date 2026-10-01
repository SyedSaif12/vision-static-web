import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { baseURL } from '@/redux/utils';
import { StorageKey } from './utils';
import dayjs from 'dayjs';

const storageKeys = StorageKey()

const getAuthTokens = () => {
    const authTokens = Cookies.get(storageKeys.tokens);
    return authTokens ? JSON.parse(authTokens) : null;
};

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(async (req) => {
    const authTokens = getAuthTokens();

    if (!authTokens) {
        // Handle the case when authTokens are not available (e.g., user not logged in)

        Cookies.remove(storageKeys.tokens);
        Cookies.remove(storageKeys.user);
        window.location.replace('/');

        // return req
    }

    const isExpired = new Date() > new Date(authTokens.tokenExpirationDate);

    if (!isExpired) {
        req.headers.Authorization = `Bearer ${authTokens.accessToken}`;
        return req;
    }

    //   console.debug({ authTokens });

    try {
        const response = await axios.post(`${baseURL}users/refresh`, {
            token: authTokens.refreshToken,
        });

        const expirationTime = dayjs(data?.data?.tokens?.tokenExpirationDate).toDate()
        Cookies.set(storageKeys.tokens, JSON.stringify(response?.data?.data?.tokens), {
            expires: expirationTime,
        });

        req.headers.Authorization = `Bearer ${response?.data?.data?.tokens?.accessToken}`;
        return req;
    } catch (error) {
        // Handle the error (e.g., redirect to login page)
        console.debug('error', error);

        Cookies.remove(storageKeys.tokens);
        Cookies.remove(storageKeys.user);

        window.location.replace('/');
        return req;
    }
});

//It handle when access and refresh token are revoke
axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
        ) {
            Cookies.remove(storageKeys.tokens);
            Cookies.remove(storageKeys.user);
            window.location.replace('/accounts/login');
        }

        // Handle network errors (no response received)
        if (!error.response) {
            toast.error(
                'Network error occurred. Please check your internet connection.'
            );
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
