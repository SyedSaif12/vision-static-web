import Link from "next/link";
import { BRAND, FOOTER_LINKS } from "./lib/constants";

export default function CheckoutFooter() {
  return (
    <footer className="mt-10 border-t border-gray-200">
      <div className="mx-auto flex w-[92%] max-w-6xl flex-col gap-2 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Policies" className="flex flex-wrap gap-x-4 gap-y-1">
          {FOOTER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gray-900 hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </div>
    </footer>
  );
}
