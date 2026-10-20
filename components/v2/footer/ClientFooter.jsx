"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, MessageCircle, Clock, Plus, Minus } from "lucide-react";

/* ---------- Logo (apna logo component ho to isay replace kar do) ---------- */
const Logo = () => (
  <Link
    href="/"
    aria-label="WeGot home"
    className="inline-flex items-center gap-1.5"
  >
    <span className="font-heading text-2xl font-extrabold tracking-tight text-ink">
      WEGOT
    </span>
    <span className="relative h-5 w-7 rounded-l-md rounded-r-sm bg-gold">
      <span className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand" />
    </span>
  </Link>
);

/* ---------- Accordion on mobile, always open on lg ---------- */
const FooterSection = ({ id, title, open, onToggle, children }) => (
  <div className="border-b border-light-100 lg:border-0">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={`footer-${id}`}
      className="flex w-full items-center justify-between py-4 text-left lg:pointer-events-none lg:cursor-default lg:py-0"
    >
      <h3 className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-ink">
        {title}
      </h3>
      <span className="text-ink lg:hidden">
        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </span>
    </button>

    <div
      id={`footer-${id}`}
      className={`${open ? "block" : "hidden"} pb-4 lg:block lg:pb-0 lg:pt-5`}
    >
      {children}
    </div>
  </div>
);

const ClientFooter = ({ paymentMethods, linkGroups, bottomLinks }) => {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <footer className="w-full border-t border-light-100 bg-surface pb-20 lg:pb-0">
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-10">
        {/* ================= TOP ================= */}
        <div className="grid grid-cols-1 gap-0 py-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr] lg:gap-10 lg:py-16">
          {/* ---------- Brand ---------- */}
          <div className="pb-6 lg:pb-0">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted sm:text-[15px] sm:leading-7">
              Pakistan&apos;s managed tech marketplace.
              <br />
              Genuine products, certified used by Aitebar Squad, and a real
              store in Clifton, Karachi.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {paymentMethods.map((p) => (
                <span
                  key={p}
                  className="rounded-md border border-light-100 bg-white px-3 py-1.5 font-poppins text-[10px] font-semibold text-ink"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* ---------- Link groups ---------- */}
          {linkGroups.map((group) => (
            <FooterSection
              key={group.id}
              id={group.id}
              title={group.title}
              open={openId === group.id}
              onToggle={() => toggle(group.id)}
            >
              <ul className="space-y-3 lg:space-y-4">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition hover:text-brand sm:text-[15px]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterSection>
          ))}

          {/* ---------- Visit & Contact ---------- */}
          <FooterSection
            id="contact"
            title="Visit & Contact"
            open={openId === "contact"}
            onToggle={() => toggle("contact")}
          >
            <ul className="space-y-4 text-sm text-muted sm:text-[15px]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-muted" />
                <span>
                  Shop 29, SAASI Arcade,
                  <br />
                  Block 7, Clifton, Karachi
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-[18px] w-[18px] shrink-0" />
                <a
                  href="tel:+923260220581"
                  className="transition hover:text-brand"
                >
                  +92 326 0220581
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-[18px] w-[18px] shrink-0 fill-muted" />
                <a
                  href="https://wa.me/923260220581"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-brand"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-[18px] w-[18px] shrink-0" />
                <span>Mon to Sat, 9am to 5:30pm</span>
              </li>
            </ul>
          </FooterSection>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col gap-2 border-t border-light-100 py-5 text-xs text-muted sm:text-[13px] lg:flex-row lg:items-center lg:justify-between lg:py-6">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()} WeGot.</span>
            {bottomLinks.map((l, i) => (
              <React.Fragment key={l.label}>
                {i > 0 && <span aria-hidden>·</span>}
                <Link href={l.href} className="transition hover:text-brand">
                  {l.label}
                </Link>
              </React.Fragment>
            ))}
          </p>

          <p className="font-semibold text-brand">
            WeGot marketplace · Certified used by Aitebar Squad
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter;
