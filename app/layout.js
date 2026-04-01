import { Roboto } from "next/font/google";
import "./globals.css";
import RootClientLayout from "./(shared_layout)/clientLayout";
import WhatsAppContact from "@/components/WhatsAppContact";

const poppins = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
  title: {
    default:
      "Vision Tech Pakistan – Apple Laptops, Computers, PC Parts & Electronics Store",
    template: "%s | Vision Tech",
  },
  description:
    "Vision Tech – Buy laptops, Apple products, and PC components online in Pakistan at best prices.",
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
          <RootClientLayout>{children}</RootClientLayout>
          <WhatsAppContact />
        </div>
      </body>
    </html>
  );
}
