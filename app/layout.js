// "use client";
// import { Poppins } from "next/font/google";
// import TopNav from "@/components/TopNav";
// import Footer from "@/components/Footer";

// import "./globals.css";
// import { Toaster } from "react-hot-toast";
// import { Provider } from "react-redux";
// import { store } from "@/redux/store";
// import NewsLetter from "@/components/NewsLetter";
// import { AppContextProvider } from "@/context/AppContext";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <title>Vision-Tech</title>
//         <meta name="description" content="E-Commerce with Next.js" />
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </head>

//       {/* Poppins here  */}
//       <body className={`${poppins.className} antialiased text-gray-700`}>
//         <Provider store={store}>
//           <AppContextProvider>
//             <Toaster />
//             <TopNav />
//             {children}
//             <NewsLetter />
//             <Footer />
//           </AppContextProvider>
//         </Provider>
//       </body>
//     </html>
//   );
// }

"use client";
import { Poppins } from "next/font/google";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import NewsLetter from "@/components/NewsLetter";
import { AppContextProvider } from "@/context/AppContext";

import ChatBox from "@/components/ChatBox"; // ✅ Add this

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Vision-Tech</title>
        <meta name="description" content="E-Commerce with Next.js" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      {/* Poppins here  */}
      <body className={`${poppins.className} antialiased text-gray-700`}>
        <Provider store={store}>
          <AppContextProvider>
            <Toaster />
            <TopNav />
            {children}
            <NewsLetter />
            <Footer />

            {/* <TawkTo /> */}
            <ChatBox />
          </AppContextProvider>
        </Provider>
      </body>
    </html>
  );
}
