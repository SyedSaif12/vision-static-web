"use client";
import Link from "next/link";
import Image from "next/image";
import { categories } from "./nav-config";
import { BaseImage } from "@/components";

export default function ShopSheetContent({ onNavigate }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((c) => (
          <Link
            key={c.title}
            href={c.url}
            onClick={onNavigate}
            className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 p-2 text-center"
          >
            <div className="relative h-12 w-12 shrink-0">
              <BaseImage
                src={c.image}
                alt={c.title}
                fit="contain"
                className="h-full w-full"
              />
            </div>
            <span className="text-xs font-semibold text-ink">{c.title}</span>
          </Link>
        ))}
      </div>

      <Link
        href="/categories"
        onClick={onNavigate}
        className="mt-4 block rounded-full border border-blue-700 py-3 text-center text-sm font-bold text-blue-800"
      >
        View all categories ›
      </Link>
    </>
  );
}
