"use client";

import TopNav from "@/components/TopNav";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { AppContextProvider } from "@/context/AppContext";

import ChatBox from "@/components/ChatBox";
import { useEffect } from "react";

// client layout component for initialize redux toolkit & RTK query
export default function RootClientLayout({ children }) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <Provider store={store}>
      <AppContextProvider>
        <Toaster />
        <TopNav />
        {children}
        {/* <TawkTo /> */}
        <ChatBox />
      </AppContextProvider>
    </Provider>
  );
}
