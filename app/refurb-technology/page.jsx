"use client";
import { BookOpen, RefreshCcw, Shield, Video, Zap } from "lucide-react";
import React, { useState } from "react";

const statsData = [
  {
    value: "30+",
    label: "Point inspection on every device",
    desc: "Rigorous testing procedure before approval.",
    color: "text-brand",
  },
  {
    value: "Battery %",
    label: "Real battery health shown",
    desc: "Transparent stats listed on every unit.",
    color: "text-green",
  },
  {
    value: "2x",
    label: "Fully tested twice",
    desc: "Tested before listing and before dispatch.",
    color: "text-purple",
  },
  {
    value: "Video",
    label: "Exact unit on video first",
    desc: "See your device on WhatsApp before shipping.",
    color: "text-gold-600",
  },
];

const procedureSteps = [
  {
    num: 1,
    name: "INTAKE",
    title: "Identity and authenticity check",
    desc: "Before anything else, we confirm the device is genuine and exactly what it claims to be.",
    checks: [
      "Serial and IMEI verification",
      "Model and spec confirmation",
      "Lock and blacklist check",
      "PTA status for phones",
      "Previous repair check",
    ],
    theme: "bg-brand text-white",
    cardTheme: "bg-surface border-light-100",
    textTheme: "text-muted",
  },
  {
    num: 2,
    name: "DIAGNOSTICS",
    title: "Full hardware testing, under real load",
    desc: "Every component is tested working, not just powered on. We record the results, including real battery health.",
    checks: [
      "Processor torture test",
      "RAM full pass",
      "Storage health and speed",
      "Battery health and cycles",
      "Display pixels and brightness",
      "Every key and backlight",
      "Trackpad and gestures",
      "All ports",
      "Wi-Fi and Bluetooth",
      "Camera and microphone",
      "Speakers",
      "Thermals and fan",
      "Charging",
    ],
    theme: "bg-brand text-white",
    cardTheme: "bg-surface border-light-100",
    textTheme: "text-muted",
  },
  {
    num: 3,
    name: "CONDITION",
    title: "Honest condition check",
    desc: "Every mark is noted and shown in real photos of the actual unit. What you see is what arrives.",
    checks: [
      "Body and lid",
      "Screen surface",
      "Hinges and structure",
      "Real photos of your unit",
    ],
    theme: "bg-brand text-white",
    cardTheme: "bg-surface border-light-100",
    textTheme: "text-muted",
  },
  {
    num: 4,
    name: "DATA",
    title: "Secure data wipe and a fresh start",
    desc: "Any previous owner's data is erased, then a fresh operating system is installed with the latest updates.",
    checks: ["Full data erasure", "Fresh OS install", "Drivers and updates"],
    theme: "bg-brand text-white",
    cardTheme: "bg-surface border-light-100",
    textTheme: "text-muted",
  },
  {
    num: 5,
    name: "RECONDITION",
    title: "Cleaning and reconditioning",
    desc: "A deep clean inside and out, so the device feels ready to use, not just working.",
    checks: [
      "Deep clean and sanitise",
      "Fan and vents cleaned",
      "Worn keys and feet replaced",
      "Battery replaced if below threshold",
    ],
    theme: "bg-brand text-white",
    cardTheme: "bg-surface border-light-100",
    textTheme: "text-muted",
  },
  {
    num: 6,
    name: "CERTIFY",
    title: "Final re-test, certificate, and your approval",
    desc: "A second full test from scratch. Only then is the certificate issued. When you order, we send you the serial number and a video of your exact unit on WhatsApp before it ships.",
    checks: [
      "Full re-test",
      "Aitebaar certificate issued",
      "WeGot warranty registered",
      "Serial and video sent to you",
    ],
    theme: "bg-gold text-ink",
    cardTheme: "bg-gold-50 border-gold/30",
    textTheme: "text-gold-700",
  },
];

const perksData = [
  {
    icon: <Shield />,
    title: "WeGot warranty",
    desc: "On every certified device. The period is shown on each listing.",
    colorClass: "bg-green/10 text-green",
  },
  {
    icon: <Video />,
    title: "Your unit on video",
    desc: "Serial and video on WhatsApp before we ship.",
    colorClass: "bg-brand/10 text-brand",
  },
  {
    icon: <Zap />,
    title: "Charger included",
    desc: "Unless the listing explicitly says otherwise.",
    colorClass: "bg-brand/10 text-brand",
  },
  {
    icon: <BookOpen />,
    title: "Open-parcel in Karachi",
    desc: "Check it at your door before you pay cash.",
    colorClass: "bg-brand/10 text-brand",
  },
  {
    icon: <RefreshCcw />,
    title: "7-day returns",
    desc: "Not right for you? Return it within 7 days easily.",
    colorClass: "bg-brand/10 text-brand",
  },
];

const faqData = [
  {
    q: "Are these devices genuine?",
    a: "Yes. Every device is verified by serial or IMEI at intake. If it is not authentic, it never reaches you.",
  },
  {
    q: "What warranty do I get?",
    a: "All devices come with official WeGot warranty covering any hardware defects, backed by Aitebaar Squad.",
  },
  {
    q: "How do I know the battery is not worn out?",
    a: "We show the exact battery health percentage on every listing and replace any battery that falls below standard thresholds.",
  },
  {
    q: "Can I see it before I pay?",
    a: "Yes! We send you a personalized video of your exact unit via WhatsApp before dispatch, plus open-parcel delivery in Karachi.",
  },
  {
    q: "What if something is faulty after I receive it?",
    a: "You get a 7-day hassle-free return window along with full warranty support.",
  },
  {
    q: "Will I know the exact condition?",
    a: "Yes, every mark or scratch is transparently shown in real high-res photos on the actual listing.",
  },
];

const SectionHeading = ({ subtitle, title, description, center = false }) => (
  <div className={`mb-8 ${center ? "text-center max-w-2xl mx-auto" : ""}`}>
    <span className="text-sm font-bold text-brand tracking-wider uppercase block mb-1">
      {subtitle}
    </span>
    <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink mt-1 mb-2">
      {title}
    </h2>
    {description && <p className="text-muted text-sm">{description}</p>}
  </div>
);

const FeatureCard = ({ icon, title, desc, colorClass }) => (
  <div className="p-5 bg-surface rounded-xl border border-light-100">
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 font-bold text-sm ${colorClass}`}
    >
      {icon}
    </div>
    <h4 className="font-bold text-sm text-ink mb-1">{title}</h4>
    <p className="text-xs text-muted">{desc}</p>
  </div>
);

function RefurbishedPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-ink">
      {/* 1. HERO & VIDEO SECTION */}
      <section className="bg-white border-b border-light-100 py-8 lg:py-12">
        <div className="w-11/12 mx-auto">
          <nav className="text-xs md:text-sm lg:text-base mb-6 flex text-faint items-center gap-2">
            <span>Home / Certified Refurbished</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="flex-1">
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
                Refurb Technology by Aitebaar Squad
              </h1>
              <h2 className="mt-4 text-lg font-bold leading-7 text-ink sm:text-xl">
                Certified used,{" "}
                <span className="text-green">tested like new.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-[15px] sm:leading-7">
                Every used laptop and phone is fully tested by Aitebaar Squad,
                meets one clear standard with no confusing grades, and comes
                with a WeGot warranty. We show you the whole procedure, and a
                video of your exact unit before it ships.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href="#stock"
                  className="bg-gold-600 text-ink px-6 py-3 rounded-lg font-medium hover:bg-gold transition shadow-sm text-sm"
                >
                  Shop refurbished
                </a>
                <a
                  href="#procedure"
                  className="bg-light-50 text-ink border border-light-200 px-6 py-3 rounded-lg font-medium hover:bg-light-100 transition text-sm"
                >
                  See every test
                </a>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-medium text-ink-50 pt-2 border-t border-light-100">
                {[
                  "Battery health on every listing",
                  "Open-parcel delivery in Karachi",
                  "7-day returns",
                ].map((tag, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-green font-bold">✓</span> {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Video Flex Right */}
            <div className="w-full lg:w-[480px] xl:w-[540px] shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#0c593a] via-[#12885a] to-[#0a3826] p-6 text-white min-h-[300px] sm:min-h-[340px] flex flex-col justify-between group cursor-pointer border border-green/20">
                <div className="flex justify-between items-start">
                  <span className="bg-gold text-ink text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
                    WATCH
                  </span>
                </div>
                <div className="my-auto flex justify-center items-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                    <svg
                      className="w-8 h-8 text-white fill-current ml-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading mb-1 text-white">
                    Refurb Technology, explained in detail
                  </h3>
                  <p className="text-xs text-white/80">
                    How Aitebaar Squad checks, cleans, and certifies every
                    device · loads on click
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-8 bg-surface">
        <div className="w-11/12 mx-auto">
          <div className="bg-white border border-light-200 rounded-xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-ink-50 leading-relaxed">
              <strong className="text-ink font-semibold">
                Aitebaar Squad is our dedicated team.
              </strong>{" "}
              They look after both our refurb technology and laptop repairs, so
              every used device is checked by the same people who fix them.{" "}
              <a
                href="#repairs"
                className="text-brand font-medium hover:underline"
              >
                See our repair services →
              </a>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsData.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-light-100 shadow-sm"
              >
                <div
                  className={`text-2xl font-bold mb-1 font-heading ${stat.color}`}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-ink mb-1">
                  {stat.label}
                </div>
                <p className="text-xs text-muted">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROCEDURE SECTION */}
      <section
        id="procedure"
        className="py-12 bg-white border-y border-light-100"
      >
        <div className="w-11/12 mx-auto">
          <SectionHeading
            subtitle="THE PROCEDURE"
            title="Six stages, thirty-plus tests"
            description="Everything Aitebaar Squad does to a used device before it earns a certificate. Shared openly, because that is the point."
            center
          />

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-6 before:w-0.5 before:bg-light-200">
            {procedureSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative flex items-start gap-4 sm:gap-6"
              >
                <div
                  className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full font-bold flex items-center justify-center shrink-0 z-10 text-sm sm:text-base ${step.theme}`}
                >
                  {step.num}
                </div>
                <div
                  className={`border rounded-xl p-5 sm:p-6 flex-1 shadow-sm ${step.cardTheme}`}
                >
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${step.textTheme}`}
                  >
                    {step.name}
                  </span>
                  <h3 className="text-lg font-bold font-heading text-ink mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted mb-4">{step.desc}</p>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs font-medium ${step.name === "CERTIFY" ? "text-ink" : "text-ink-50"}`}
                  >
                    {step.checks.map((check, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-green">✓</span> {check}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CERTIFICATE SECTION */}
      <section className="py-12 bg-surface">
        <div className="w-11/12 mx-auto">
          <div className="bg-white border border-light-200 rounded-2xl p-6 lg:p-10 shadow-sm flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1">
              <SectionHeading
                subtitle="AITEBAAR SQUAD CERTIFICATE"
                title={
                  <>
                    PROOF, IN WRITING <br /> Every device gets its own
                    certificate
                  </>
                }
                description="Once a device passes both full tests, Aitebaar Squad issues a certificate for that exact unit. It stays with your order, so you always know what you bought."
              />
              <div className="space-y-3 text-xs font-medium text-ink-50">
                {[
                  "Serial number of your exact unit",
                  "Real battery health and cycle count",
                  "Every test result, and its condition",
                  "Data wipe and warranty confirmed",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-green font-bold">✓</span> {text}
                  </div>
                ))}
              </div>
            </div>
            {/* Certificate Card Preview */}
            <div className="w-full lg:w-[420px] bg-brand-25 border border-brand/20 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center border-b border-light-200 pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-brand uppercase">
                    Sample Certificate
                  </span>
                  <h4 className="font-bold text-sm text-ink font-heading">
                    MacBook Air M1, 8GB, 256GB
                  </h4>
                </div>
                <span className="bg-green text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  PASSED
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted">
                  <span className="font-medium text-ink">Serial number:</span>{" "}
                  <span>FVFH2XXXQ6L4</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span className="font-medium text-ink">Condition:</span>{" "}
                  <span>Light marks, shown in photos</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span className="font-medium text-ink">Battery health:</span>{" "}
                  <span className="text-green font-bold">90% - 212 cycles</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span className="font-medium text-ink">Tests passed:</span>{" "}
                  <span className="font-bold text-ink">32 of 32</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span className="font-medium text-ink">Data wipe:</span>{" "}
                  <span>Complete, fresh OS</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span className="font-medium text-ink">Warranty:</span>{" "}
                  <span>Checked by Aitebaar Squad, 6 Month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT YOU GET SECTION */}
      <section className="py-12 bg-white">
        <div className="w-11/12 mx-auto">
          <h2 className="text-2xl font-bold font-heading text-ink text-center mb-8">
            What you get
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {perksData.map((perk, idx) => (
              <FeatureCard key={idx} {...perk} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CORPORATE & TRADE-IN SECTION */}
      <section className="py-12 bg-white">
        <div className="w-11/12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-light-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <SectionHeading
                  subtitle="For businesses"
                  title="Refurbished at scale, for your team"
                  description="Fit out an office for far less than new. Same Aitebaar checks, same warranty, with proper invoicing and one point of contact."
                />
              </div>
              <div>
                <button className="bg-brand text-white px-5 py-2.5 rounded-lg font-medium text-xs hover:bg-brand-600 transition">
                  Request a corporate quote
                </button>
              </div>
            </div>
            <div className="bg-surface border border-light-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <SectionHeading
                  subtitle="Trade in"
                  title="Have a device to sell? Trade it in."
                  description="Bring your old laptop or phone, get a fair value toward your next one. Final value is confirmed after we inspect it."
                />
              </div>
              <div>
                <button className="bg-ink text-white px-5 py-2.5 rounded-lg font-medium text-xs hover:bg-ink-50 transition">
                  Get a trade-in estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-12 bg-surface border-t border-light-100">
        <div className="w-11/12 mx-auto">
          <SectionHeading
            subtitle="GOOD TO KNOW"
            title="Refurbished, answered"
            center
          />
          <div className="space-y-3">
            {faqData.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-light-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex justify-between items-center font-bold text-sm text-ink hover:bg-light-50 transition"
                >
                  <span>{item.q}</span>
                  <span className="text-lg text-muted ml-2">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-5 sm:px-5 text-xs text-muted leading-relaxed border-t border-light-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CTA */}
      <section className="py-12 bg-white border-t border-light-100">
        <div className="w-11/12 mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink mb-3">
            Certified used, without the worry.
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-xl mx-auto mb-6">
            Tested twice, described honestly, backed by warranty, and shown to
            you on video before it ships. That is the Aitebaar Squad promise.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#stock"
              className="bg-brand text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-600 transition shadow-sm text-sm"
            >
              Shop refurbished
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="bg-green text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition text-sm"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RefurbishedPage;
