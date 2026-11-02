"use client";
import { BaseImage } from "@/components";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { BUYING_GUIDES } from "./AllComponents";

export function SectionTabs({
  hasSpecs,
  hasOverview,
  hasExpertReview,
  hasFaqs,
  hasWhatsInTheBox,
}) {
  const tabs = [
    hasSpecs && { href: "#specifications", label: "Specifications" },
    hasOverview && { href: "#overview", label: "Overview" },
    hasExpertReview && { href: "#expert-review", label: "Expert Review" },
    hasWhatsInTheBox && {
      href: "#whats-in-the-box",
      label: "Whats In The Box",
    },
    hasFaqs && { href: "#faqs", label: "FAQs" },
    { href: "#buying-guide", label: "Buying guide" },
  ].filter(Boolean);

  const [activeTab, setActiveTab] = useState(
    tabs[0]?.href || "#specifications",
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    tabs.forEach((tab) => {
      const element = document.querySelector(tab.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tabs]);

  return (
    <nav
      aria-label="Product sections"
      className="sticky top-0 z-20 -mx-4 overflow-x-auto border-b border-light-100 bg-surface/95 px-4 backdrop-blur sm:mx-0 sm:px-0"
    >
      <ul className="flex gap-6 whitespace-nowrap">
        {tabs.map((t) => {
          const isActive = activeTab === t.href;
          return (
            <li key={t.href}>
              <a
                href={t.href}
                onClick={() => setActiveTab(t.href)}
                className={`inline-block border-b-2 py-3 text-sm font-bold transition focus-visible:outline-none ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:border-primary hover:text-primary focus-visible:text-primary"
                }`}
              >
                {t.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Category-wise guide: iframe load nahi hoti (performance), click par YouTube khulta hai
export function BuyingGuide({ guide = BUYING_GUIDES }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!guide || !Object.keys(guide).length) return null;

  const videoId = getYouTubeVideoId(guide.url);

  const thumbnail = getYouTubeThumbnail(guide.url);

  const videoSrc = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    : "";

  return (
    <section
      id="buying-guide"
      aria-labelledby="guide-title"
      className="scroll-mt-16"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="guide-title"
          className="font-heading text-xl font-bold text-ink"
        >
          {guide.title}
        </h2>

        <a
          href={guide.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-light-100 bg-white px-4 py-1.5 text-xs font-semibold text-primary hover:bg-brand-50"
        >
          Watch on YouTube
        </a>
      </div>

      <div className="relative mt-4 aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-primary-200 via-primary-100 to-ink">
        {isPlaying && videoSrc ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={videoSrc}
            title={`${guide.title} video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <BaseImage
              src={thumbnail}
              alt={`${guide.title} video thumbnail`}
              className="absolute inset-0 h-full w-full"
              imgClassName="object-cover"
              fit="cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              fallbackClassName="bg-primary/20"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6 sm:p-12">
              <div className="max-w-md">
                <p className="text-xs font-semibold text-gold">WeGot video</p>

                <p className="mt-1 font-heading text-2xl font-extrabold text-white sm:text-4xl">
                  {guide.title}
                </p>

                <p className="mt-2 text-sm text-white/70">{guide.text}</p>
              </div>
            </div>

            {videoSrc && (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={`Play ${guide.title} video`}
                className="absolute inset-0 z-20 flex items-center justify-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red text-white shadow-lg transition-transform hover:scale-110 sm:h-20 sm:w-20">
                  <Play
                    className="ml-1 h-7 w-7 fill-white sm:h-9 sm:w-9"
                    aria-hidden="true"
                  />
                </span>
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function getYouTubeVideoId(url = "") {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1).split("/")[0];
    }

    if (
      parsedUrl.hostname.includes("youtube.com") ||
      parsedUrl.hostname.includes("youtube-nocookie.com")
    ) {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v");
      }

      return (
        parsedUrl.pathname.match(/\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ||
        null
      );
    }

    return null;
  } catch {
    return null;
  }
}

function getYouTubeThumbnail(url) {
  const videoId = getYouTubeVideoId(url);

  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";
}
