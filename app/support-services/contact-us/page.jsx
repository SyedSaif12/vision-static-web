import Link from "next/link";
import ContactPage from "./clientPage"
import {
    MessageCircle,
    Phone,
    MapPin,
    ArrowUpRight,
    Wrench,
    ShieldCheck,
    RefreshCw,
    Building2,
    CircleAlert,
} from "lucide-react";


const WHATSAPP_NUMBER = "923260220581";
const PHONE_NUMBER = "+923260220581";
const SECONDARY_PHONE = "0331 2405800";

const otherHelp = [
    {
        title: "Repair services",
        description: "Laptop repairs by Aitebaar Squad.",
        icon: Wrench,
        href: "/repair-services",
    },
    {
        title: "Warranty claim",
        description: "Start a claim for a product you bought.",
        icon: ShieldCheck,
        href: "/warranty-claim",
    },
    {
        title: "Trade-In",
        description: "Laptops, MacBooks and iPads at our store.",
        icon: RefreshCw,
        href: "/trade-in",
    },
    {
        title: "Corporate orders",
        description: "WeGot for Business: bulk and office setups.",
        icon: Building2,
        href: "/corporate-procurement",
    },
];

function Page() {

    return (
        <main className="min-h-screen bg-[#f6f8fc] text-ink">
            <div className="mx-auto w-11/12 pb-14 pt-5 sm:pb-16 sm:pt-7">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="mb-3 flex items-center gap-1.5 text-xs md:text-sm lg:text-base text-muted"
                >
                    <Link href="/" className="transition hover:text-primary">
                        Home
                    </Link>
                    <span className="text-ink"> / Contact us</span>
                </nav>

                {/* Page heading */}
                <header className="mb-6">
                    <h1 className="font-heading text-2xl font-extrabold tracking-tight text-[#0f1830] sm:text-[30px]">
                        Contact WeGot
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                        Real people, a real store. The fastest way to reach us is WhatsApp.
                    </p>
                </header>

                {/* Contact options */}
                <section
                    aria-label="Contact options"
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
                >
                    <article className="rounded-2xl border border-[#e9edf5] bg-white p-5 shadow-[0_2px_10px_rgba(15,24,48,0.02)]">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f8ee] text-green">
                            <MessageCircle size={20} fill="currentColor" strokeWidth={1.7} />
                        </div>
                        <h2 className="text-sm font-bold text-ink">WhatsApp</h2>
                        <Link
                            href={`https://wa.me/${WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 block text-sm font-semibold text-ink hover:text-primary"
                        >
                            {PHONE_NUMBER}
                        </Link>
                        <p className="mt-3 min-h-5 text-xs leading-5 text-muted">
                            Questions about a product, your order or a warranty claim.
                        </p>
                        <Link
                            href={`https://wa.me/${WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#58d66b] px-4 text-xs font-bold text-white transition hover:bg-[#43c957]"
                        >
                            Chat on WhatsApp
                        </Link>
                    </article>

                    <article className="rounded-2xl border border-[#e9edf5] bg-white p-5 shadow-[0_2px_10px_rgba(15,24,48,0.02)]">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2ff] text-primary">
                            <Phone size={19} strokeWidth={2.1} />
                        </div>
                        <h2 className="text-sm font-bold text-ink">Call us</h2>
                        <Link
                            href={`tel:${PHONE_NUMBER}`}
                            className="mt-1 block text-sm font-semibold text-ink hover:text-primary"
                        >
                            +92 326 0220581
                        </Link>
                        <Link
                            href="tel:+923312405800"
                            className="mt-0.5 block text-sm font-semibold text-ink hover:text-primary"
                        >
                            {SECONDARY_PHONE}
                        </Link>
                        <p className="mt-3 text-xs leading-5 text-muted">
                            Mon to Sat, 9am to 5:30pm. Email: contact@wegot.pk
                        </p>
                    </article>

                    <article className="rounded-2xl border border-[#e9edf5] bg-white p-5 shadow-[0_2px_10px_rgba(15,24,48,0.02)] sm:col-span-2 xl:col-span-1">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2ff] text-primary">
                            <MapPin size={20} strokeWidth={2.1} />
                        </div>
                        <h2 className="text-sm font-bold text-ink">Visit our store</h2>
                        <p className="mt-1 text-sm font-semibold leading-5 text-ink">
                            Shop 29, SAASI Arcade, Block 7, Clifton, Karachi
                        </p>
                        <p className="mt-2 text-xs leading-5 text-muted">
                            See products, collect orders, trade in your laptop or get a
                            repair.
                        </p>
                        <Link
                            href="https://maps.google.com/?q=Shop+29+SAASI+Arcade+Block+7+Clifton+Karachi"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#e6eaf2] px-4 text-xs font-bold text-ink transition hover:border-primary hover:text-primary"
                        >
                            Get directions <ArrowUpRight size={14} />
                        </Link>
                    </article>
                </section>

                {/* Expert panel + contact form */}
                <section className="mt-5 grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_1fr]">
                    <div className="rounded-2xl h-full bg-gradient-to-br from-[#2f7650] to-[#35895b] p-6 text-white sm:p-8">
                        <p className="text-base font-extrabold uppercase tracking-[0.22em] text-white/75">
                            Shop with an expert
                        </p>
                        <h2 className="my-5 max-w-lg font-heading text-2xl font-extrabold leading-snug sm:text-5xl">
                            Not sure what to buy? Ask our experts.
                        </h2>
                        <p className="my-3 max-w-xl text-lg leading-6 text-white/85">
                            Tell us your budget and what you need the device for. Our team
                            suggests the right options, new or certified refurbished, and
                            explains the difference honestly.
                        </p>
                        <ol className="mt-4 space-y-2 pl-4 text-lg leading-5 text-white/90 marker:font-semibold">
                            <li>Message us on WhatsApp, or fill in the form</li>
                            <li>
                                Tell us your budget and main use: study, office, gaming, design
                            </li>
                            <li>
                                Get 2 or 3 options with prices, then order online or visit the
                                store
                            </li>
                        </ol>
                        <Link
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi WeGot, I need help choosing a product.")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gold px-5 text-xs font-extrabold text-[#19223a] shadow-sm transition hover:bg-[#f4c31d]"
                        >
                            Start on WhatsApp <ArrowUpRight size={15} />
                        </Link>
                    </div>

                    <div className="rounded-2xl border border-[#e9edf5] bg-white p-5 sm:p-7">
                        <h2 className="font-heading text-base font-extrabold text-ink">
                            Send us a message
                        </h2>
                        <ContactPage />
                    </div>
                </section>

                {/* Other help links */}
                <section className="mt-8">
                    <h2 className="mb-3 font-heading text-lg font-extrabold text-ink">
                        Other help
                    </h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {otherHelp.map(({ title, description, icon: Icon, href }) => (
                            <Link
                                key={title}
                                href={href}
                                className="group flex min-h-[88px] items-start gap-3 rounded-xl border border-[#e9edf5] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#cbd8f7] hover:shadow-sm"
                            >
                                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-light-50 text-primary transition group-hover:bg-primary group-hover:text-white">
                                    <Icon size={17} />
                                </span>
                                <span>
                                    <span className="block text-xs font-extrabold text-ink">
                                        {title}
                                    </span>
                                    <span className="mt-1.5 block text-xs leading-5 text-muted">
                                        {description}
                                    </span>
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Page