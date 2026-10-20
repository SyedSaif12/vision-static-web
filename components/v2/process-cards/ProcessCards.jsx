"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Store } from "lucide-react";
import { BaseImage } from "@/components";

const DEFAULT_VIDEO_URL =
  "https://www.youtube.com/embed/54Ej0JdngZI?si=jrXQfgO0BSwGZcX8";

const cardsData = [
  {
    id: "1",
    category: "WATCH AND READ",
    title: "Why Us",
    subtitle: "The reasons to trust WeGot",
    type: "video",
    youtubeUrl: DEFAULT_VIDEO_URL,
    storeUrl: "/why-us/why-wegot",
    bgColor: "bg-brand-50",
  },
  {
    id: "2",
    category: "WATCH AND READ",
    title: "Order Procedure",
    subtitle: "See how ordering works",
    type: "video",
    youtubeUrl: DEFAULT_VIDEO_URL,
    storeUrl: "/why-us/order-procedure",
    bgColor: "bg-gold-50",
  },
  {
    id: "3",
    category: "WATCH AND READ",
    title: "Refurb Technology",
    subtitle: "How we test and certify",
    type: "video",
    youtubeUrl: DEFAULT_VIDEO_URL,
    storeUrl: "/refurb-technology",
    bgColor: "bg-purple-50",
  },
  {
    id: "4",
    category: "COME SEE US",
    title: "Visit Store",
    subtitle: "SAASI Arcade, Block 7, Clifton",
    type: "store",
    storeUrl: "/why-us/why-wegot#store",
  },
];

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

export default function ProcessCards() {
  const [playingCards, setPlayingCards] = useState({});

  const handlePlayClick = (id) => {
    setPlayingCards((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <section className="w-full bg-surface py-8 sm:py-12">
      <div className="mx-auto grid w-11/12 grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-5">
        {cardsData.map((card) => {
          const isPlaying = Boolean(playingCards[card.id]);
          const videoId = getYouTubeVideoId(card.youtubeUrl);
          const thumbnail = getYouTubeThumbnail(card.youtubeUrl);

          const videoSrc = videoId
            ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
            : "";

          return (
            <article
              key={card.id}
              className="flex min-w-0 flex-col justify-between rounded-2xl bg-primary p-2 text-white shadow-md transition-shadow hover:shadow-lg sm:rounded-3xl sm:p-3 lg:p-4"
            >
              {/* Card heading */}
              <div className="mb-2 min-w-0 sm:mb-3">
                <span className="block text-[8px] font-bold uppercase tracking-wide text-light-50 sm:text-[10px] md:text-[11px]">
                  {card.category}
                </span>

                <Link
                  href={card.storeUrl}
                  className="mt-1 mb-1 block break-words text-sm font-bold leading-snug hover:underline sm:text-lg md:text-xl lg:text-2xl"
                >
                  {card.title}
                </Link>

                <p className="break-words text-[10px] font-normal leading-relaxed text-light-50/80 sm:text-sm lg:text-base">
                  {card.subtitle}
                </p>
              </div>

              {/* Video card */}
              {card.type === "video" ? (
                <div className="relative h-28 w-full overflow-hidden rounded-xl sm:h-36 sm:rounded-2xl md:h-40 lg:h-44">
                  {isPlaying && videoSrc ? (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={videoSrc}
                      title={`${card.title} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <BaseImage
                        src={thumbnail}
                        alt={`${card.title} video thumbnail`}
                        className="absolute inset-0 h-full w-full"
                        imgClassName="object-cover"
                        fit="cover"
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 22vw"
                        fallbackClassName="bg-primary/10"
                      />

                      <div className="absolute inset-0 bg-black/20" />

                      <span className="absolute left-1.5 top-2 z-10 rounded bg-red px-1.5 py-1 text-[8px] font-bold uppercase text-white sm:left-2 sm:text-[10px] md:text-xs">
                        VIDEO
                      </span>

                      <button
                        type="button"
                        onClick={() => handlePlayClick(card.id)}
                        aria-label={`Play ${card.title} video`}
                        className="absolute inset-0 z-20 flex items-center justify-center"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform hover:scale-110 sm:h-12 sm:w-12 md:h-14 md:w-14">
                          <Play
                            className="ml-0.5 h-4 w-4 fill-primary sm:h-5 sm:w-5 md:h-6 md:w-6"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </>
                  )}
                </div>
              ) : (
                /* Store card */
                <Link
                  href={card.storeUrl}
                  aria-label="Visit store locator"
                  className="flex h-28 w-full items-center justify-center rounded-xl bg-green-100 transition-colors hover:bg-green-200 sm:h-36 sm:rounded-2xl md:h-40 lg:h-44"
                >
                  <Store
                    strokeWidth={1}
                    className="h-10 w-10 text-green-700 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
