"use client";

import { BaseImage } from "@/components";
import { useState } from "react";

/**
 * images: [{ fileUrl, fileName }]  (backend ka `image` array)
 * Ek image ho to thumbnails nahi dikhte, ek se zyada ho to click par main image replace hoti hai.
 */
export default function ProductGallery({ images = [], title, tags = [] }) {
    
  const list = images.filter((i) => i?.fileUrl);
  const [active, setActive] = useState(0);
  const current = list[active];
  const hasMany = list.length > 1;

  return (
    <div className="rounded-2xl border border-light-100 bg-white p-3 sm:p-4">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-light-50">
        {tags.length > 0 && (
          <ul className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-primary shadow-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <BaseImage
          src={current?.fileUrl}
          alt={current?.alt ?? `${title}${hasMany ? ` - image ${active + 1} of ${list.length}` : ""}`}
          className="h-full w-full"
          imgClassName="p-6"
          fit="contain"
          sizes="(min-width: 1024px) 560px, 100vw"
          priority
        />
      </div>

      {hasMany && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Product images">
          {list.map((img, i) => {
            const selected = i === active;
            return (
              <li key={img.fileUrl} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-pressed={selected}
                  className={`block h-16 w-16 overflow-hidden rounded-lg border-2 bg-light-50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-20 sm:w-20 ${
                    selected ? "border-primary" : "border-light-100 hover:border-faint"
                  }`}
                >
                  <BaseImage
                    src={img.fileUrl}
                    alt={img?.alt ?? ''}
                    className="h-full w-full"
                    imgClassName="p-1.5"
                    fit="contain"
                    sizes="80px"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-3 text-center text-xs text-faint">
        Photos show this model. Serial number of your unit is shared before dispatch.
      </p>
    </div>
  );
}