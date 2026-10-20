import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  DollarSign,
  ExternalLink,
  House,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  Play,
  ShieldCheck,
  Smartphone,
  Store,
  UserRound,
} from "lucide-react";

const sourceCards = [
  {
    number: "1",
    title: "Bought from authorised distributors",
    text: "In Pakistan, brands like HP, Lenovo, Apple, Dell, Acer, Logitech, Ronin and A4Tech sell through their authorised distributors. We buy from these distributors in bulk, which earns us a bulk-purchase discount. We keep a minimal margin and pass the rest of that discount on to you.",
    tags: [
      "HP",
      "Lenovo",
      "Apple",
      "Dell",
      "Acer",
      "Logitech",
      "Ronin",
      "A4Tech",
    ],
  },
  {
    number: "2",
    title: "Imported by us, when it costs us less",
    text: "Sometimes a product costs more through a local distributor than it does when we import it ourselves. In those cases we import directly and put the saving into our price. We import selected products this way, including:",
    tags: [
      "Dyson",
      "PlayStation",
      "Gaming accessories",
      "Laptops",
      "Desktops",
      "Processors",
      "Graphics cards",
    ],
    note: "The warranty for every product is shown clearly on its product page before you buy.",
  },
  {
    number: "3",
    title: "Refurbished, sorted and tested by Aitebaar Squad",
    text: "Our in-house team, Aitebaar Squad, imports refurbished laptops in bulk. They sort every batch, keep only the best units for retail, and test each one before it is listed. You get a laptop that has been checked by people who do this every day.",
    link: "See how Aitebaar Squad tests every laptop",
  },
];

const worryCards = [
  {
    icon: ShieldCheck,
    eyebrow: "“WHAT IF IT IS FAKE OR A CLONE?”",
    title: "Genuine, or your money back",
    text: "Every product is checked and verified genuine, or you get a full refund. No clones, and no grey imports sold to you as new.",
  },
  {
    icon: Smartphone,
    eyebrow: "“HOW DO I KNOW I GET THAT EXACT UNIT?”",
    title: "You see your unit before we ship",
    text: "Once you order, we send the serial number and a short video of your actual product on WhatsApp. You approve it, then we dispatch. No swaps.",
  },
  {
    icon: PackageCheck,
    eyebrow: "“WHAT IF IT IS NOT WHAT I ORDERED?”",
    title: "Open the parcel before you pay",
    text: "In Karachi, cash on delivery lets you check the product at your door before paying a single rupee. Anywhere in Pakistan, the serial number and video you approve before dispatch is your check.",
  },
  {
    icon: House,
    eyebrow: "“WHAT IF THE SELLER JUST DISAPPEARS?”",
    title: "A real shop you can walk into",
    text: "We have been in business since 1998. There is an office at Uni Centre, a store in Block 7, Clifton, and our own expert team, Aitebaar Squad. There is an address, a team and a face behind every order.",
  },
];

const promiseCards = [
  {
    icon: ShieldCheck,
    title: "100% genuine",
    text: "Sealed, checked, and verified genuine. If it is not authentic, you get every rupee back.",
  },
  {
    icon: Store,
    title: "Known, genuine sources",
    text: "Bought in bulk from authorised distributors in Pakistan, or imported by us when it costs you less.",
  },
  {
    icon: DollarSign,
    title: "Fair, direct pricing",
    text: "We forward our bulk discount to you and keep a minimal margin. No middleman markup.",
    gold: true,
  },
  {
    icon: Smartphone,
    title: "Your exact unit, before dispatch",
    text: "Serial number and a video of your actual device on WhatsApp, for you to approve.",
  },
  {
    icon: House,
    title: "Real store in Clifton",
    text: "Come see, touch, and buy in person at our store in Block 7, Clifton, Karachi.",
  },
  {
    icon: UserRound,
    title: "Real people to ask",
    text: "Talk to an actual expert on WhatsApp before and after you buy. No bots.",
  },
];

const storeChecks = [
  "See and hold the exact product before you buy",
  "Compare new and certified used side by side",
  "Ask our team anything, with no pressure to buy",
  "Collect your online order in person if you prefer",
  "Bring a device in for trade-in or repair",
];

const comparisonRows = [
  ["Genuine product guarantee", "Yes, or full refund", "Maybe, no guarantee"],
  [
    "Where the stock comes from",
    "Authorised distributors or our own imports",
    "Unknown sources",
  ],
  [
    "See your exact unit before dispatch",
    "Yes, serial + video on WhatsApp",
    "No, you get whatever arrives",
  ],
  [
    "Check parcel before paying",
    "Yes, open-parcel COD in Karachi",
    "Pay first, hope later",
  ],
  ["Returns after delivery", "7-day easy returns", "“All sales final”"],
  ["Certified refurbished", "Tested by Aitebaar Squad", 'Sold "as is"'],
  ["Physical store to visit", "Yes, Clifton, Karachi", "Usually none"],
  ["Time in business", "Since 1998", "Often a few months"],
];

const brands = [
  "HP",
  "Lenovo",
  "Apple",
  "Dell",
  "Acer",
  "Logitech",
  "Ronin",
  "A4Tech",
  "Dyson",
  "PlayStation",
];

const reviews = [
  {
    initials: "AH",
    name: "Ali H.",
    text: "“They sent me a video of my actual laptop and its serial number on WhatsApp before dispatch. I have never seen a seller do that here.”",
  },
  {
    initials: "SF",
    name: "Sana F.",
    text: "“Opened the box in front of the rider, checked everything, then paid. First time I actually felt safe buying tech online.”",
  },
  {
    initials: "BM",
    name: "Bilal M.",
    text: "“Had a question at 9pm, got a real reply on WhatsApp in minutes. Visited the Clifton shop the next day. Legit.”",
  },
];

const SectionHeading = ({ eyebrow, title, description }) => (
  <div className="mx-auto max-w-3xl text-center">
    <div className="text-[18px] font-extrabold uppercase tracking-[0.24em] text-brand">
      {eyebrow}
    </div>
    <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
      {title}
    </h2>
    {description ? (
      <p className="mt-4 text-base leading-7 text-muted sm:text-xl">
        {description}
      </p>
    ) : null}
  </div>
);

const TinyTag = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand">
    {children}
  </span>
);

export default function WhyWeGotPage() {
  return (
    <main className="bg-white text-ink">
      {/* Hero / Intro */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="w-11/12 mx-auto pb-14 pt-6 lg:pt-8">
          <div className="mb-8 flex items-center gap-2 text-xs text-muted">
            <span className="font-sm">Home / Why WeGot</span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <h1 className="font-heading text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                Why WeGot
              </h1>
              <p className="mt-3 text-xl font-bold leading-snug text-ink sm:text-2xl">
                New to e-commerce.{" "}
                <span className="text-brand">
                  In the tech business since 1998.
                </span>
              </p>
              <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-muted sm:text-[18px]">
                <p>
                  WeGot is the online store of a family tech business that
                  started in 1998 with a small shop at Uni Centre, opposite
                  Techno City in Karachi. Today the second generation is taking
                  the same business online, with the same rule we have always
                  followed: genuine products at a fair price, from people you
                  can meet.
                </p>
                <p>
                  Our office is still at Uni Centre, on the 13th floor, and our
                  store is at SAASI Arcade, Block 7, Clifton. We plan to keep
                  growing, with a new branch each year, InshaAllah.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#ready"
                  className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3.5 text-base font-bold text-ink shadow-[0_10px_24px_rgba(255,207,36,.24)] transition hover:-translate-y-0.5 hover:bg-gold-600"
                >
                  Start shopping
                </a>
                <a
                  href="#order-process"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green px-6 py-3.5 text-base font-bold text-white transition hover:brightness-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  Talk to an expert
                </a>
                <a
                  href="#store"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-bold text-ink transition hover:border-brand hover:text-brand"
                >
                  Visit our store
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-ink p-7 text-white shadow-[0_20px_40px_rgba(15,24,48,.12)] min-h-[320px] sm:min-h-[360px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(255,255,255,.13),transparent_30%),radial-gradient(circle_at_15%_100%,rgba(255,207,36,.08),transparent_35%)]" />
              <div className="relative flex h-full min-h-[265px] flex-col justify-between">
                <button
                  type="button"
                  className="mx-auto mt-16 flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur transition hover:bg-white/20"
                  aria-label="Play The WeGot story"
                >
                  <Play className="ml-0.5 h-6 w-6 fill-white" />
                </button>
                <div>
                  <div className="text-sm font-bold">The WeGot story</div>
                  <div className="mt-1 text-xs text-white/65">
                    Since 1998 · meet the family, the office and the store
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,24,48,.07)]">
            <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
              {[
                ["1998", "A small shop at Uni Centre, opposite Techno City"],
                ["Office", "13th floor, Uni Centre, I.I. Chundrigar Road"],
                ["Store", "Shop 29, SAASI Arcade, Block 7, Clifton"],
                ["Online", "WeGot.pk, run by the second generation"],
                ["Next", "A new branch each year, InshaAllah"],
              ].map(([title, text]) => (
                <div key={title} className="p-5">
                  <div className="text-xl font-extrabold text-brand">
                    {title}
                  </div>
                  <div className="mt-1.5 text-base leading-5 text-muted">
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-11/12">
          <SectionHeading
            eyebrow="Why our prices are fair"
            title="Where your product comes from"
            description="Every product on WeGot reaches us in one of three ways. All three are about the same thing: a genuine product, at a better price than you would usually pay."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {sourceCards.map((card) => (
              <article
                key={card.number}
                className="flex min-h-[340px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_22px_rgba(15,24,48,.06)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-extrabold text-white">
                  {card.number}
                </div>
                <h3 className="mt-4 font-heading text-lg font-extrabold text-ink">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{card.text}</p>
                {card.tags ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <TinyTag key={tag}>{tag}</TinyTag>
                    ))}
                  </div>
                ) : null}
                {card.note ? (
                  <p className="mt-5 text-xs leading-5 text-faint">
                    {card.note}
                  </p>
                ) : null}
                {card.link ? (
                  <a
                    href="#aitebaar"
                    className="mt-auto inline-flex items-center gap-1 pt-6 text-xs font-bold text-brand hover:text-brand-600"
                  >
                    {card.link}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-4 rounded-2xl border border-brand-50 bg-light p-5 sm:p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-ink">
                Bulk buying, minimal margin, better prices
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                Buying in bulk from distributors, importing directly when it is
                cheaper, and keeping our margin small: that is how the same
                genuine product usually costs you less at WeGot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Worries */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto w-11/12">
          <SectionHeading
            eyebrow="The real reason people hesitate"
            title="Every worry you have, answered"
            description="These are the things customers in Pakistan worry about when buying tech online, and exactly what we do about each."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {worryCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_22px_rgba(15,24,48,.06)]"
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-green">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-faint">
                        {card.eyebrow}
                      </div>
                      <h3 className="mt-1.5 font-heading text-base font-extrabold text-ink">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {card.text}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Order process */}
      <section id="order-process" className="py-16 sm:py-20">
        <div className="mx-auto grid w-11/12 items-center gap-12 lg:grid-cols-[1.15fr_.7fr]">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-brand">
              How your order works
            </div>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              You approve your exact unit before it ships
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              The biggest online fear is simple: “will they send me the good
              one, or swap it?” We remove that fear completely. Before anything
              leaves our store, you see it.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "You place your order on the website or on WhatsApp.",
                "We confirm it on WhatsApp and prepare your exact unit.",
                <span key="3">
                  We send you its{" "}
                  <strong className="font-extrabold text-ink">
                    serial number
                  </strong>{" "}
                  and a short video of that actual device.
                </span>,
                "You approve it, then we dispatch. In Karachi you can also open the parcel and check it before you pay.",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand text-xs font-extrabold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-0.5 text-sm leading-6 text-muted">{item}</p>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              See our full order procedure
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* WhatsApp mockup */}
          <div className="mx-auto w-full max-w-[340px] rounded-[24px] bg-[#efe6db] p-3 shadow-[0_20px_40px_rgba(15,24,48,.12)]">
            <div className="overflow-hidden rounded-[18px] bg-[#f8f5f0]">
              <div className="flex items-center justify-between bg-[#17665a] px-4 py-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-extrabold text-[#17665a]">
                    W
                  </div>
                  <div>
                    <div className="text-sm font-extrabold">WeGot</div>
                    <div className="text-[10px] text-white/70">online</div>
                  </div>
                </div>
                <MessageCircle className="h-4 w-4 opacity-80" />
              </div>
              <div className="space-y-2.5 p-3">
                <div className="max-w-[84%] rounded-xl rounded-tl-sm bg-white p-3 text-[10px] leading-5 text-ink shadow-sm">
                  Your order is confirmed. Here is the exact unit we are
                  preparing for you.
                  <div className="mt-1 text-right text-[8px] text-faint">
                    4:12 PM
                  </div>
                </div>
                <div className="max-w-[84%] rounded-xl rounded-tl-sm bg-white p-2 shadow-sm">
                  <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#284da4] to-ink">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                      <Play className="ml-0.5 h-5 w-5 fill-white" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[8px] text-faint">
                    <span>your_unit.mp4 · 0:24</span>
                    <span>4:12 PM</span>
                  </div>
                </div>
                <div className="max-w-[84%] rounded-xl rounded-tl-sm bg-white p-3 text-[10px] leading-5 text-ink shadow-sm">
                  Serial No: <strong className="text-brand">C02LX0ANJG5</strong>
                  <br />
                  Certified refurbished · Battery health 87%
                  <div className="mt-1 text-right text-[8px] text-faint">
                    4:13 PM
                  </div>
                </div>
                <div className="max-w-[55%] rounded-xl rounded-tl-sm bg-white p-3 text-[10px] text-ink shadow-sm">
                  Shall we dispatch it?
                  <div className="mt-1 text-right text-[8px] text-faint">
                    4:13 PM
                  </div>
                </div>
                <div className="ml-auto max-w-[78%] rounded-xl rounded-tr-sm bg-[#d9f7c7] p-3 text-[10px] leading-5 text-ink shadow-sm">
                  Yes, looks perfect. Please send it.
                  <div className="mt-1 text-right text-[8px] text-green">
                    4:15 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="bg-light py-16 sm:py-20">
        <div className="mx-auto w-11/12">
          <SectionHeading
            eyebrow="What you get, every time"
            title="Six promises behind the WeGot logo"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {promiseCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_22px_rgba(15,24,48,.06)]"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.gold ? "bg-gold-50 text-gold-700" : "bg-brand-50 text-brand"}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-heading text-base font-extrabold text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {card.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto w-11/12">
          <div className="grid overflow-hidden rounded-2xl bg-gradient-to-r from-brand-700 via-brand to-[#3f72ef] text-center text-white shadow-[0_18px_45px_rgba(26,86,219,.18)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1998", "In the tech business since"],
              ["0", "Middlemen between you and us"],
              ["7-day", "Easy returns after delivery"],
              ["COD", "Cash on delivery across Pakistan"],
            ].map(([value, label]) => (
              <div
                key={value}
                className="border-b border-white/15 px-6 py-8 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0"
              >
                <div className="text-2xl font-extrabold text-gold sm:text-3xl">
                  {value}
                </div>
                <div className="mt-2 text-xs text-white/75">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aitebaar */}
      <section id="aitebaar" className="py-12 sm:py-16">
        <div className="mx-auto grid w-11/12 px-5 gap-6 bg-light py-6 sm:py-8 lg:grid-cols-[1.15fr_.85fr]">
          <div className="flex flex-col justify-center py-4 sm:py-8">
            <span className="w-fit rounded-full border border-gold-50 bg-gold-50 px-3 py-1 text-[10px] font-bold text-gold-700">
              Certified used
            </span>
            <h2 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Buying refurbished? Aitebaar Squad checks it first
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
              Aitebaar Squad is our in-house team for refurbished laptops. They
              import in bulk, sort every batch, keep only the best units for
              retail, then test, clean and certify each one to one clear
              standard, with no confusing grades. Refurbished laptops come with
              a 3-month WeGot warranty, which you can extend to 1 year for 10%
              of the price.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-gold px-5 py-3.5 text-sm font-bold text-ink shadow-[0_10px_24px_rgba(255,207,36,.24)] hover:bg-gold-600"
            >
              Meet Aitebaar Squad
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="flex min-h-[240px] items-center justify-center rounded-2xl bg-gradient-to-br from-white to-[#eef2fb]">
            <ShieldCheck
              className="h-20 w-20 text-[#b3c1dc]"
              strokeWidth={1.2}
            />
          </div>
        </div>
      </section>

      {/* Store */}
      <section id="store" className="py-16 sm:py-20">
        <div className="mx-auto w-11/12">
          <SectionHeading
            eyebrow="Come and see us"
            title="A real store, not just a website"
            description="Walk into our store in Clifton, or meet our team at the office at Uni Centre. You are welcome any day we are open."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,24,48,.06)]">
              <div className="relative h-72 bg-gradient-to-br from-[#eaf1fd] to-[#dce8fb] sm:h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d338.4292432081471!2d67.03373287073228!3d24.829472196575384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33de8b7301099%3A0x621ef94dece7ba1!2sVision%20Tech!5e1!3m2!1sen!2s!4v1775056947997!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
                <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold text-muted shadow-sm">
                  Store map
                </div>
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand shadow-[0_12px_30px_rgba(26,86,219,.15)]">
                    <MapPin className="h-6 w-6" />
                  </div>
                </div> */}
              </div>
              <div className="p-6">
                <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[10px] font-bold text-brand">
                  Our physical store
                </span>
                <h3 className="mt-4 font-heading text-xl font-extrabold text-ink">
                  WeGot store, Clifton
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Walk in, see the products and meet the team.
                </p>
                <div className="mt-5 space-y-3 text-sm text-muted">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>
                      Shop 29, SAASI Arcade, Block 7, Clifton, Karachi
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>Open Mon to Sat, 9am to 5:30pm</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>+92 326 0220581</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Store className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>
                      Office: 13th floor, Uni Centre, I.I. Chundrigar Road,
                      Karachi
                    </span>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Vision+Tech+SAASI+Arcade+Block+7+Clifton+Karachi"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-600"
                >
                  Get directions
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-50 bg-[#f7faff] p-7 sm:p-8">
              <h3 className="font-heading text-xl font-extrabold text-ink">
                What you can do in store
              </h3>
              <div className="mt-5 divide-y divide-brand-50">
                {storeChecks.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 py-3.5 text-sm text-muted"
                  >
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-light py-16 sm:py-20">
        <div className="mx-auto w-11/12">
          <SectionHeading
            eyebrow="An honest comparison"
            title="WeGot vs an ordinary online seller"
            description="The difference is not the price alone. It is how the product reaches you, and what happens after."
          />

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,24,48,.06)]">
            <div className="grid grid-cols-[1.2fr_1.5fr_1fr] bg-slate-50 text-xs font-bold text-ink">
              <div className="p-4 sm:p-5">What matters to you</div>
              <div className="bg-brand p-4 text-white sm:p-5">WeGot</div>
              <div className="p-4 sm:p-5">Ordinary online seller</div>
            </div>
            {comparisonRows.map(([matter, wegot, seller]) => (
              <div
                key={matter}
                className="grid grid-cols-[1.2fr_1.5fr_1fr] border-t border-slate-100 text-xs sm:text-sm"
              >
                <div className="p-4 text-ink sm:p-5">{matter}</div>
                <div className="bg-[#f7faff] p-4 font-semibold text-green sm:p-5">
                  {wegot}
                </div>
                <div className="p-4 text-muted sm:p-5">{seller}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-11/12 text-center">
          <SectionHeading
            eyebrow="Brands you love"
            title="The brands we carry"
          />
          <div className="mx-auto mt-9 flex max-w-5xl flex-wrap justify-center gap-3">
            {brands.map((brand) => (
              <div
                key={brand}
                className="flex min-w-[84px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-extrabold text-ink shadow-[0_6px_18px_rgba(15,24,48,.05)] sm:min-w-[94px]"
              >
                {brand}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-muted">
            New stock from authorised distributors or our own imports, plus
            refurbished laptops certified by Aitebaar Squad.
          </p>
        </div>
      </section>

      {/* Warranty note */}
      <section className="pt-10 sm:pt-14">
        <div className="mx-auto w-11/12">
          <div className="flex items-start gap-3 rounded-2xl border border-brand-50 bg-[#f7faff] px-4 py-4 text-xs leading-5 text-muted sm:px-5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span>
              Looking for warranty details? Cover depends on the brand and the
              product, and it is all explained on our Warranty page.
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="ready" className="pb-16 pt-6 sm:pb-20 sm:pt-8">
        <div className="mx-auto w-11/12">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-brand-700 via-brand to-[#3e73ec] px-6 py-12 text-center text-white shadow-[0_18px_45px_rgba(26,86,219,.18)] sm:px-10 sm:py-14">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready when you are
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Browse the store, message an expert, or come see us in Clifton.
              Whatever makes you comfortable, that is the right way to start.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-bold text-ink shadow-[0_10px_24px_rgba(255,207,36,.26)] hover:bg-gold-600"
              >
                Start shopping
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#store"
                className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/5 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10"
              >
                Visit our store
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
