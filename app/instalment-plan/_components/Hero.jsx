import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { formatList } from "@/lib/instalment";
import { whatsappLink } from "../_lib/constants";

export default function Hero({ months }) {
  const tenures = months.length
    ? `${formatList(months)} monthly payments`
    : "easy monthly payments";

  return (
    <section className="bg-gradient-to-b from-light to-white">
      <div className="mx-auto w-11/12 py-8 md:py-12">
        <nav aria-label="Breadcrumb" className="text-xs text-muted md:text-sm">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-ink">
              Instalment Plans
            </li>
          </ol>
        </nav>

        <h1 className="mt-5 font-heading text-3xl font-extrabold text-ink sm:text-4xl">
          Instalment Plans
        </h1>
        <p className="mt-2 font-heading text-lg font-bold text-ink sm:text-2xl">
          Own it now.{" "}
          <span className="text-primary">Pay in easy monthly instalments.</span>
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Split your laptop, phone, or appliance into {tenures} using your bank
          credit card. Compare what each bank charges, and see your exact
          monthly amount before you buy.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#calculator"
            className="rounded-xl bg-gold px-6 py-3 text-sm font-bold text-ink shadow-md transition hover:bg-gold-600"
          >
            See my monthly payment
          </a>
          <a
            href={whatsappLink("Hi WeGot, I have a question about instalment plans.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-green px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
          >
            <MessageCircle size={18} />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
