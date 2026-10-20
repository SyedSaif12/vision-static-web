import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import RootClientLayout from "./(shared_layout)/clientLayout";
import Navbar from "@/components/v2/navbar/Navbar";

const poppins = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["Arial", "sans-serif", "Amiri", "monospace", "Noto Naskh Arabic"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
  title: {
    default:
      "WeGot Pakistan – Apple Laptops, Computers, PC Parts & Electronics Store",
    template: "%s | WeGot",
  },
  description:
    "WeGot – Buy laptops, Apple products, and PC components online in Pakistan at best prices.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      {/* Poppins here  */}

      <body
        suppressHydrationWarning={true}
        className={`${poppins.className} antialiased text-gray-700`}
      >
        <div className="overflow-x-clip w-full">
          <RootClientLayout navbar={<Navbar />}>{children}</RootClientLayout>
        </div>
      </body>
    </html>
  );
}
