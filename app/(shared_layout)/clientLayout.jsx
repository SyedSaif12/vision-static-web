"use client";

import TopNav from "@/components/TopNav";
import { Toaster } from "react-hot-toast";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { AppContextProvider } from "@/context/AppContext";
import Cookies from "js-cookie";
import ChatBox from "@/components/ChatBox";
import { useEffect } from "react";
import WhatsAppContact from "@/components/WhatsAppContact";
import { StorageKey } from "@/lib/utils";
import axios from "axios";
import dayjs from "dayjs";
import AuthGuard from "@/components/protectedRoutes/AuthGuard";

// client layout component for initialize redux toolkit & RTK query
export default function RootClientLayout({ children }) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <Provider store={store}>
      <AuthInitializer />
      <AppContextProvider>
        <Toaster />
        <TopNav />
        <AuthGuard>
        {children}
        </AuthGuard>
        {/* <TawkTo /> */}
        <ChatBox />
        <WhatsAppContact />
      </AppContextProvider>
    </Provider>
  );
}

// ⚡ Token validity & Initializer Component (Provider ke andar chalega)
function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAndLoadUser = async () => {
      const storageKeys = StorageKey();

      // 1. User cookie load karein
      const userCookie = Cookies.get(storageKeys.user);
      if (userCookie) {
        try {
          const parsedUser = JSON.parse(userCookie);
          dispatch(setUserData(parsedUser));
        } catch (e) {
          console.debug("Error parsing user cookie", e);
        }
      }

      // 2. Token expiration check aur Refresh logic
      const tokensCookie = Cookies.get(storageKeys.tokens);
      if (tokensCookie) {
        try {
          const authTokens = JSON.parse(tokensCookie);
          const isExpired = new Date() > new Date(authTokens?.tokenExpirationDate);

          if (isExpired && authTokens?.refreshToken) {
            const response = await axios.post(`${baseURL}users/refresh`, {
              token: authTokens.refreshToken,
            });

            if (response?.data?.data?.tokens) {
              const newTokens = response.data.data.tokens;
              const expirationTime = dayjs(newTokens?.tokenExpirationDate).toDate();

              Cookies.set(storageKeys.tokens, JSON.stringify(newTokens), {
                expires: expirationTime,
              });
            }
          }
        } catch (error) {
          console.debug('Token refresh failed', error);
          // Agar refresh fail ho jaye toh cookies clear kar ke login par bhej sakte hain
          Cookies.remove(storageKeys.tokens);
          Cookies.remove(storageKeys.user);
        }
      }
    };

    checkAndLoadUser();
  }, [dispatch]);

  return null;
}