import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import RootClientLayout from "./(shared_layout)/clientLayout";
import WhatsAppContact from "@/components/WhatsAppContact";

const poppins = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: {
    default:
      "Vision Tech Online Shopping in Pakistan | Mobiles, Laptops, Apple products and Electronics",
    template: "%s | Vision Tech",
  },
  description: "Best online selling store in Pakistan",
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
        <RootClientLayout>{children}</RootClientLayout>
        <WhatsAppContact />
      </body>
    </html>
  );
}
