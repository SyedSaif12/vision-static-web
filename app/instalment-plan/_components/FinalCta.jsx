import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "../_lib/constants";

export default function FinalCta() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-11/12">
        <div className="rounded-2xl bg-gradient-to-br from-primary-200 via-primary-100 to-primary p-8 text-center text-white shadow-lg sm:p-12">
          <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
            Ready to buy in easy instalments?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/80">
            Browse the products you want, choose &lsquo;Pay in instalments&rsquo;
            at checkout, and pick your bank. Not sure where to start? We will
            help you on WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-gold px-6 py-3 text-sm font-bold text-ink shadow-md transition hover:bg-gold-600"
            >
              Start shopping
            </Link>
            <a
              href={whatsappLink("Hi WeGot, I want to buy on instalments.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              <MessageCircle size={18} />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
