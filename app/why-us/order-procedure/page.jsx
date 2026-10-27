"use client";

import { useState } from "react";

const VIDEO_EMBED_URL = "";

const processStages = [
  { icon: "cart", title: "Order placed" },
  { icon: "phone", title: "Confirmed by us" },
  { icon: "shield", title: "Picked & checked" },
  { icon: "video", title: "Video approval" },
  { icon: "box", title: "Packed & dispatched" },
  { icon: "home", title: "Open-parcel, Karachi" },
];

const detailedSteps = [
  {
    icon: "cart",
    title: "You place your order",
    description:
      "Order online in a few taps, or send it to us on WhatsApp. Pick cash on delivery, card, bank transfer, or a wallet, and add your delivery address.",
    tag: "Your move",
    gold: true,
  },
  {
    icon: "phone",
    title: "We confirm your order",
    description:
      "A real person from our team calls or messages you to confirm the item, your address, and how you want to pay. This one step stops wrong orders and fake orders before they start.",
  },
  {
    icon: "warehouse",
    title: "We pick your exact unit from our warehouse",
    description:
      "Your product is pulled from our own stock, genuine and in hand. Nothing is drop-shipped to you from a stranger you never see.",
  },
  {
    icon: "shield",
    title: "We check and test it",
    description:
      "Every unit is inspected before it leaves. New products arrive sealed and are verified. Refurbished products are tested and certified by Aitbaar Squad.",
  },
  {
    icon: "video",
    title: "We record your serial number and film a video",
    description:
      "We note the serial number and record a short video of your actual device, powered on and working, so the exact unit and its real condition are captured before anything is packed.",
    tag: "On us",
    gold: true,
  },
  {
    icon: "message",
    title: "You approve it on WhatsApp before dispatch",
    description:
      "We send you the serial number and the video. You look at the exact unit you are getting and approve it. If anything is not right, we hold it and sort it out before it ever ships.",
    tag: "Your move",
    gold: true,
  },
  {
    icon: "box",
    title: "We pack, seal, and dispatch",
    description:
      "Secure packing with a tamper-evident seal, the invoice and warranty card inside, plus the charger and accessories. We hand it to the courier and share your tracking details.",
  },
  {
    icon: "card",
    title: "Delivery, then you pay",
    description:
      "In Karachi you get open-parcel delivery: open and check the parcel at your door before you pay, if you chose cash on delivery. Happy, you keep it and pay. Not happy, you do not pay. Outside Karachi, couriers do not allow open-parcel, so the serial number and video you approved before dispatch are your check.",
    tag: "Your move",
    gold: true,
  },
  {
    icon: "refresh",
    title: "After delivery, we are still here",
    description:
      "You have 7 days for an easy return, and our team stays reachable on WhatsApp for setup help, questions, repairs, or anything else you need.",
  },
];

const parcelItems = [
  {
    icon: "box",
    title: "Your product",
    description:
      "Genuine and sealed, or Aitbaar-certified used, exactly as shown in your video.",
  },
  {
    icon: "shield",
    title: "Tamper-evident seal",
    description: "If the seal is broken, do not accept it. Simple as that.",
  },
  {
    icon: "plug",
    title: "Charger and cable",
    description:
      "Original charger, and a 65W charger with laptops where applicable.",
  },
  {
    icon: "monitor",
    title: "In-box accessories",
    description:
      "Everything that belongs with the product, checked and included.",
  },
  {
    icon: "file",
    title: "Printed invoice",
    description: "Your proof of purchase, with the serial number recorded.",
  },
  {
    icon: "check-circle",
    title: "Warranty card",
    description:
      "Brand or WeGot warranty details, so you know your cover. Full terms on the warranty page.",
  },
];

const paymentOptions = [
  {
    id: "cod",
    icon: "cash",
    title: "Cash on delivery",
    description:
      "Open-parcel: open and check your product, then pay the rider. Available all over Karachi.",
    popular: true,
  },
  {
    id: "online",
    icon: "card",
    title: "Card, bank, or wallet",
    description:
      "Pay by debit or credit card, bank transfer, EasyPaisa, or JazzCash. Paid orders still get the serial number and video before dispatch.",
  },
  {
    id: "pickup",
    icon: "home",
    title: "Pick up in store",
    description:
      "Prefer to collect it yourself? Buy online and pick up at our Clifton store, or just come and buy in person.",
  },
];

const faqs = [
  {
    question: "Can I really open the parcel before paying?",
    answer:
      "In Karachi, yes. With open-parcel cash on delivery across Karachi you open and check the product at your door, and only pay if you are happy. If something is wrong, you do not pay and it goes back with the rider. Outside Karachi couriers do not allow open-parcel, so the serial number and video you approve before dispatch, plus our returns, is your safeguard.",
  },
  {
    question: "What is the serial number and video you send?",
    answer:
      "Before dispatch, we record the serial number and a short video of your exact unit powered on and working. We send these to you on WhatsApp so you can check the product and approve it before we pack and dispatch it.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Typical delivery is 1 to 2 working days in Karachi and 2 to 4 working days in other major cities. Delivery timing can vary by location and courier.",
  },
  {
    question: "What if I am not home when it arrives?",
    answer:
      "Coordinate with our team or the courier to arrange a suitable delivery attempt. Please make sure the phone number and delivery address on your order are correct.",
  },
  {
    question: "Which payment methods can I use?",
    answer:
      "You can choose cash on delivery in Karachi, debit or credit card, bank transfer, EasyPaisa, JazzCash, or store pickup. Available methods may vary by order.",
  },
  {
    question: "Do you deliver outside Karachi?",
    answer:
      "Yes. We deliver to other major cities as well. Couriers outside Karachi generally do not offer open-parcel delivery, so we share the serial number and video for your approval before dispatch.",
  },
];

function Icon({ name, size = 20, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    cart: (
      <>
        <circle cx="9" cy="20" r="1" />
        <circle cx="19" cy="20" r="1" />
        <path d="M2 3h2l2.4 11.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 1.9-1.4L22 7H5" />
      </>
    ),
    phone: (
      <>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.7a2 2 0 0 1-.6 1.9L7.7 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 1.9-.6l2.7.5a2 2 0 0 1 1.7 2.7Z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="5" width="13" height="14" rx="2" />
        <path d="m16 10 5-3v10l-5-3" />
        <path d="m8 9 4 3-4 3z" fill="currentColor" stroke="none" />
      </>
    ),
    box: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="M3 8v9l9 5 9-5V8M12 13v9" />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v12h14V9M9 21v-7h6v7" />
      </>
    ),
    warehouse: (
      <>
        <path d="m3 10 9-7 9 7v11H3Z" />
        <path d="M7 21v-8h10v8M7 16h10M12 13v8" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8Z" />
      </>
    ),
    card: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M6 15h4" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5M4 17v-5h5" />
        <path d="M5.6 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.4-3" />
      </>
    ),
    cash: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M6 9h.01M18 15h.01" />
      </>
    ),
    plug: (
      <>
        <path d="M8 2v6M16 2v6M7 8h10v3a5 5 0 0 1-5 5v6M5 8h14" />
      </>
    ),
    monitor: (
      <>
        <rect x="3" y="3" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 16v5" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h8" />
      </>
    ),
    "check-circle": (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    close: (
      <>
        <path d="m18 6-12 12M6 6l12 12" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths["check-circle"]}</svg>;
}

function SectionEyebrow({ children, className = "" }) {
  return (
    <p
      className={`mb-3 text-[10px] font-extrabold uppercase tracking-[0.22em] text-primary ${className}`}
    >
      {children}
    </p>
  );
}

function VideoPanel() {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="relative min-w-0">
      {VIDEO_EMBED_URL ? (
        <div className="aspect-video overflow-hidden rounded-2xl bg-ink shadow-[0_18px_45px_rgba(15,24,48,0.16)]">
          <iframe
            className="h-full w-full"
            src={VIDEO_EMBED_URL}
            title="How ordering from WeGot works"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b367e] via-[#142958] to-[#0f1830] text-white shadow-[0_18px_45px_rgba(15,24,48,0.16)]">
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-purple/20 blur-3xl" />
          <button
            type="button"
            onClick={() => setShowHint((value) => !value)}
            className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-white/15 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white/25 focus:outline-none focus:ring-4 focus:ring-white/30"
            aria-label="Video preview settings"
          >
            {showHint ? (
              <Icon name="close" size={22} />
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5 3.8c0-.6.7-1 1.2-.7l8 5.1c.5.3.5 1.1 0 1.5l-8 5.1c-.5.3-1.2-.1-1.2-.7V3.8Z" />
              </svg>
            )}
          </button>
          {showHint && (
            <div className="absolute inset-x-4 top-4 z-20 rounded-xl border border-white/20 bg-ink/90 px-4 py-3 text-xs leading-5 text-white shadow-xl">
              Add your video embed link in{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5">
                VIDEO_EMBED_URL
              </code>{" "}
              at the top of this file.
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0b132b]/95 to-transparent px-5 pb-5 pt-14">
            <p className="text-sm font-bold">How ordering from WeGot works</p>
            <p className="mt-1 text-xs text-white/70">
              Explainer video · loads on click · before dispatch
            </p>
          </div>
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green" /> Your actual unit
        </span>
        <span className="h-1 w-1 rounded-full bg-faint" />
        <span>Serial number recorded</span>
        <span className="h-1 w-1 rounded-full bg-faint" />
        <span>Before dispatch</span>
      </div>
    </div>
  );
}

export default function OrderProcedurePage() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingSubmitted, setTrackingSubmitted] = useState(false);

  const handleTrackOrder = (event) => {
    event.preventDefault();
    if (!orderNumber.trim()) return;
    setTrackingSubmitted(true);
  };

  return (
    <main className="overflow-hidden bg-white font-sans text-ink">
      {/* Intro / hero */}
      <section className="border-b border-light-100 bg-gradient-to-b from-light-50 to-white">
        <div className="mx-auto w-11/12 pb-12 pt-7 sm:pb-16 lg:pt-9">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2">
            <span className="text-xs md:text-sm lg:text-base text-faint">
              Home / Why Us / From order to doorstep
            </span>
          </nav>
          <div className="max-w-3xl animate-fade">
            <SectionEyebrow>How it works</SectionEyebrow>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
              Order Procedure
            </h1>
            <p className="mt-4 text-lg font-bold leading-7 text-ink sm:text-xl">
              From your order to your doorstep,{" "}
              <span className="text-primary">every step in the open.</span>
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-[15px] sm:leading-7">
              No black box. Here is exactly what happens after you place an
              order, from our warehouse shelf to your hands, including the video
              of your own unit that we send you before we dispatch.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/products"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gold px-5 py-3 text-sm font-bold text-ink shadow-[0_7px_16px_rgba(255,207,36,0.28)] transition hover:-translate-y-0.5 hover:bg-gold-600 focus:outline-none focus:ring-4 focus:ring-gold/30"
              >
                Start shopping
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=923260220581&text=Hi+WeGot%2C+I+want+to+shop+with+an+expert.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-green/20"
              >
                <Icon name="message" size={16} /> Talk to an expert
              </a>
              <a
                href="#track-order"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-light-100 bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-primary/30 hover:bg-light-50 focus:outline-none focus:ring-4 focus:ring-primary/10"
              >
                Track my order
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process explainer: intentionally left/right flex on desktop, not video below text */}
      <section className="mx-auto grid w-11/12 items-center gap-9 py-14 sm:py-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:py-20">
        <div className="max-w-xl">
          <SectionEyebrow>Watch the full process</SectionEyebrow>
          <h2 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
            See exactly how a WeGot order works
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted sm:text-[15px]">
            A short explainer that walks you through every step, from your
            order, to our warehouse, to your doorstep, including the video we
            send you before dispatch.
          </p>
          <div className="mt-7 space-y-4">
            {[
              [
                "01",
                "We pick your exact unit",
                "Your product is checked from our own stock.",
              ],
              [
                "02",
                "We record proof",
                "Serial number and a short video of the real device.",
              ],
              [
                "03",
                "You approve before dispatch",
                "We only send it out after you have seen your unit.",
              ],
            ].map(([number, title, description]) => (
              <div key={number} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-[11px] font-extrabold text-primary">
                  {number}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-5 text-muted">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <VideoPanel />
      </section>

      {/* Six-stage overview */}
      <section className=" pb-14 sm:pb-16">
        <div className="mx-auto w-11/12 text-center">
          <SectionEyebrow>The short version</SectionEyebrow>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
            Your order, from tap to doorstep
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">
            Six simple stages. Every one of them you can see and check.
          </p>
          <div className="relative mt-9 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            <div className="absolute left-[8%] right-[8%] top-6 hidden h-px bg-[#dce5ff] lg:block" />
            {processStages.map((stage, index) => (
              <div
                key={stage.title}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border bg-white shadow-sm ${index === 3 ? "border-gold/70 bg-gold-50 text-gold-700" : "border-[#dce5ff] text-primary"}`}
                >
                  <Icon name={stage.icon} size={20} />
                </div>
                <p className="mt-3 max-w-32 text-xs font-bold leading-5 text-ink">
                  {stage.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed process */}
      <section className="bg-surface py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-11/12">
          <div className="text-center">
            <SectionEyebrow>The full version</SectionEyebrow>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
              Every step, in detail
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              A gold tag means it is your move. A blue tag means it is on us.
            </p>
          </div>

          <div className="relative mt-9 space-y-4 sm:mt-10 sm:space-y-5">
            <div className="absolute bottom-7 left-[21px] top-7 hidden w-px bg-[#dce5ff] sm:block" />
            {detailedSteps.map((step, index) => (
              <article
                key={step.title}
                className="relative grid gap-3 sm:grid-cols-[52px_1fr] sm:gap-3"
              >
                <div className="relative z-10 hidden sm:block">
                  <span
                    className={`absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold shadow-sm ${step.gold ? "bg-gold text-gold-700" : "bg-primary text-white"}`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`ml-1 mt-2 flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm ${step.gold ? "border-gold/40 bg-gold-50 text-gold-700" : "border-light-100 bg-white text-primary"}`}
                  >
                    <Icon name={step.icon} size={19} />
                  </span>
                </div>
                <div
                  className={`rounded-2xl border p-5 shadow-[0_3px_12px_rgba(15,24,48,0.045)] sm:px-6 sm:py-5 ${step.gold ? "border-gold/40 bg-gradient-to-r from-gold-50 to-white" : "border-light-100 bg-white"}`}
                >
                  <div className="flex items-start gap-3 sm:block">
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:hidden ${step.gold ? "bg-gold-50 text-gold-700" : "bg-brand-50 text-primary"}`}
                    >
                      <Icon name={step.icon} size={18} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-heading text-sm font-extrabold leading-5 text-ink sm:text-[15px]">
                          {step.title}
                        </h3>
                        {step.tag && (
                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${step.gold ? "bg-gold-50 text-gold-700" : "bg-brand-50 text-primary"}`}
                          >
                            {step.tag}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-xs leading-6 text-muted sm:text-[13px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Warehouse proof section: copy left, WhatsApp proof panel right */}
      <section className="mx-auto grid w-11/12 items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
        <div>
          <SectionEyebrow>The step nobody else does</SectionEyebrow>
          <h2 className="font-heading text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
            You see your unit before it leaves the warehouse
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            This is the heart of how WeGot works. Before your order is sealed
            and dispatched, we show you the exact unit on WhatsApp. Here is what
            is in that message:
          </p>
          <ol className="mt-6 space-y-3.5">
            {[
              "A short video of your actual device, powered on and working.",
              "Its serial number, so the unit on video is the unit in the box.",
              "Close looks at the real condition, and for used, its Aitbaar grade.",
              "The accessories and box that ship with it.",
              "You approve, and we dispatch. If not, we hold and fix it first.",
            ].map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-6 text-muted"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-[11px] font-extrabold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* WhatsApp-like preview */}
        <div className="mx-auto w-full max-w-[360px] rounded-[28px] border border-light-100 bg-white p-2 shadow-[0_18px_50px_rgba(15,24,48,0.14)]">
          <div className="overflow-hidden rounded-[22px] bg-[#eee7df]">
            <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-extrabold text-[#075e54]">
                W
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold">WeGot</p>
                <p className="mt-0.5 text-[10px] text-white/70">online</p>
              </div>
              <Icon name="message" size={17} />
            </div>
            <div className="space-y-3 p-3.5 text-[11px] leading-5 text-ink">
              <div className="max-w-[95%] rounded-xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
                Your order is confirmed. Here is the exact unit we are preparing
                for you.
                <p className="mt-1 text-right text-[9px] text-muted">4:12 PM</p>
              </div>
              <div className="max-w-[88%] rounded-xl rounded-tl-sm bg-white p-2 shadow-sm">
                <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#1b367e] to-[#0f1830] text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/15">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M3 1.8c0-.5.5-.8.9-.5l6 4c.4.3.4.9 0 1.2l-6 4c-.4.3-.9 0-.9-.5V1.8Z" />
                    </svg>
                  </span>
                </div>
                <p className="mt-1.5 text-[10px]">
                  your_unit.mp4 · 0:24{" "}
                  <span className="float-right text-muted">4:12 PM</span>
                </p>
              </div>
              <div className="max-w-[95%] rounded-xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
                <p className="font-semibold">
                  Serial No: <span className="text-primary">C02XL0A0NG85</span>
                </p>
                <p>Certified refurbished · Battery health 87%</p>
                <p className="mt-1 text-right text-[9px] text-muted">4:13 PM</p>
              </div>
              <div className="max-w-[74%] rounded-xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
                Shall we dispatch it?{" "}
                <span className="ml-1 text-[9px] text-muted">4:13 PM</span>
              </div>
              <div className="ml-auto max-w-[82%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 shadow-sm">
                Yes, looks perfect. Please send it.{" "}
                <span className="ml-1 text-[9px] text-muted">4:15 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parcel contents */}
      <section className="bg-surface py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-11/12">
          <div className="text-center">
            <SectionEyebrow>Opened up</SectionEyebrow>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
              What is inside your parcel
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted">
              Packed to arrive safe, sealed so you know no one opened it on the
              way.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {parcelItems.map((item) => (
              <article
                key={item.title}
                className="flex gap-3 rounded-2xl border border-light-100 bg-white p-4 shadow-[0_3px_12px_rgba(15,24,48,0.035)] sm:p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-primary">
                  <Icon name={item.icon} size={19} />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-muted">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Payment selection */}
      <section className="mx-auto w-11/12 py-14 sm:py-16 lg:py-20">
        <div className="text-center">
          <SectionEyebrow>Your choice</SectionEyebrow>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
            Delivery and payment, your way
          </h2>
        </div>
        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {paymentOptions.map((option) => {
            const selected = paymentMethod === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setPaymentMethod(option.id)}
                aria-pressed={selected}
                className={`relative flex min-h-44 flex-col items-center rounded-2xl border p-5 text-center transition focus:outline-none focus:ring-4 focus:ring-primary/10 sm:p-6 ${selected ? "border-primary bg-white shadow-[0_6px_22px_rgba(26,86,219,0.08)]" : "border-light-100 bg-white hover:border-primary/30 hover:shadow-sm"}`}
              >
                {option.popular && (
                  <span className="absolute -top-2.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-white">
                    Most popular
                  </span>
                )}
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${selected ? "bg-brand-50 text-primary" : "bg-light-50 text-primary"}`}
                >
                  <Icon name={option.icon} size={20} />
                </span>
                <h3 className="mt-3 text-sm font-extrabold text-ink">
                  {option.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-muted">
                  {option.description}
                </p>
                {selected && (
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-primary">
                    <Icon name="check-circle" size={13} /> Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#dce5ff] bg-brand-50/70 px-4 py-3.5 text-xs leading-5 text-muted sm:px-5">
          <Icon
            name="clock"
            size={17}
            className="mt-0.5 shrink-0 text-primary"
          />
          <p>
            {paymentMethod === "cod" &&
              "Open-parcel delivery, where you check before you pay, is available all over Karachi. Couriers do not allow it in other cities, so the serial number and video you approve before dispatch are your safeguard."}
            {paymentMethod === "online" &&
              "For online payments, we still share your exact unit's serial number and video for your approval before dispatch. Keep your payment confirmation for your records."}
            {paymentMethod === "pickup" &&
              "For store pickup, coordinate with the team about availability and collection timing before visiting the store."}{" "}
            Typical delivery: Karachi in 1 to 2 working days, other major cities
            in 2 to 4. Times and charges are sample values; set your real rates
            here.
          </p>
        </div>
      </section>

      {/* Order tracking */}
      <section id="track-order" className="bg-surface py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-11/12">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#dce5ff] bg-gradient-to-br from-brand-50 to-white p-6 text-center shadow-[0_5px_20px_rgba(26,86,219,0.055)] sm:p-8">
            <SectionEyebrow>Where is my order</SectionEyebrow>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight">
              Track your order
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Enter your order number to see its status, from confirmed to out
              for delivery.
            </p>
            <form
              onSubmit={handleTrackOrder}
              className="mt-5 flex flex-col gap-2.5 sm:flex-row"
            >
              <label htmlFor="order-number" className="sr-only">
                Order number
              </label>
              <input
                id="order-number"
                value={orderNumber}
                onChange={(event) => {
                  setOrderNumber(event.target.value);
                  setTrackingSubmitted(false);
                }}
                placeholder="e.g. WG-2026-004821"
                className="min-h-12 min-w-0 flex-1 rounded-xl border border-light-100 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-faint focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
              <button
                type="submit"
                className="min-h-12 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-100 focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                Track order
              </button>
            </form>
            {trackingSubmitted ? (
              <p
                role="status"
                className="mt-4 rounded-lg bg-gold-50 px-3 py-2 text-xs leading-5 text-gold-700"
              >
                Demo form only: connect this form to your order-tracking API to
                look up <strong>{orderNumber.trim()}</strong>.
              </p>
            ) : (
              <p className="mt-3 text-[11px] leading-5 text-muted">
                Demo field for now. Connect it to your live order status
                endpoint.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto w-11/12 py-14 sm:py-16 lg:py-20">
        <div className="text-center">
          <SectionEyebrow>Good to know</SectionEyebrow>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
            Common questions
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-light-100 bg-white shadow-[0_4px_18px_rgba(15,24,48,0.04)]">
          {faqs.map((faq, index) => {
            const open = activeFaq === index;
            return (
              <div
                key={faq.question}
                className={index !== 0 ? "border-t border-light-100" : ""}
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(open ? -1 : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-light-50 sm:px-6"
                >
                  <span className="text-sm font-bold leading-5 text-ink">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-primary transition ${open ? "bg-brand-50" : "bg-white"}`}
                    aria-hidden="true"
                  >
                    <span className="text-lg leading-none">
                      {open ? "−" : "+"}
                    </span>
                  </span>
                </button>
                {open && (
                  <div className="px-5 pb-5 pt-0 sm:px-6">
                    <p className="text-xs leading-6 text-muted sm:text-[13px]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA. Footer deliberately left out. */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto w-11/12 overflow-hidden rounded-2xl bg-gradient-to-r from-[#173f9f] via-primary to-[#3474f2] py-10 text-center text-white  sm:py-12 lg:rounded-[26px] lg:py-14">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
            Order with total confidence
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/80">
            You approve your exact unit before it ships. In Karachi, you also
            check it at your door with open-parcel delivery. That is how every
            WeGot order works.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/shop"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gold px-5 py-3 text-sm font-extrabold text-ink shadow-[0_7px_16px_rgba(255,207,36,0.24)] transition hover:-translate-y-0.5 hover:bg-gold-600 focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              Start shopping
            </a>
            <a
              href="/why-us"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/40 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              Why WeGot
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
