import Link from "next/link";
import { Lock, MessageCircle } from "lucide-react";
import { BRAND, ROUTES, SUPPORT_WHATSAPP } from "./lib/constants";
import { BaseImage } from "@/components";

/** Fixed (sticky) checkout header: brand, secure badge, WhatsApp help. */
export default function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 w-[92%] max-w-6xl items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
          href={ROUTES.home}
          aria-label={`${BRAND.name} home`}
          className="w-20 h-20"
          >
            <BaseImage
              src={'/images/logo-wegot-dark.png'}
              alt={BRAND.name}
              fit="contain"
              className="w-full h-full"
              sizes="(max-width: 768px) 100vw, 33vw"
            />

          </Link>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-green-700">
            <Lock size={16} aria-hidden="true" />
            Secure checkout
          </span>
        </div>

        {SUPPORT_WHATSAPP && (
          <a
            href={`https://wa.me/${SUPPORT_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm"
          >
            <MessageCircle size={18} className="text-green-500" aria-hidden="true" />
            <span className="hidden text-gray-500 sm:inline">Need help?</span>
            <span className="font-bold text-gray-900">WhatsApp us</span>
          </a>
        )}
      </div>
    </header>
  );
}
