"use client";
import Link from "next/link";
import { Star, Tag, Package, ChevronRight } from "lucide-react";
import { dealsLink } from "./nav-config";

const ICONS = {
  star: { Icon: Star, box: "bg-yellow-100 text-yellow-700" },
  tag: { Icon: Tag, box: "bg-red-50 text-red-500" },
  box: { Icon: Package, box: "bg-orange-50 text-orange-500" },
};

export default function DealsSheetContent({ onNavigate }) {
  return (
    <div className="flex flex-col gap-3">
      {dealsLink.map((d) => {
        const { Icon, box } = ICONS[d.icon] ?? ICONS.star;
        return (
          <Link
            key={d.href}
            href={d.href}
            onClick={onNavigate}
            className="flex items-center gap-4 rounded-2xl border border-gray-200 p-3"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${box}`}
            >
              <Icon size={18} />
            </span>
            <span className="flex-1">
              <span className="block font-bold text-slate-900">{d.label}</span>
              <span className="block text-sm text-slate-500">{d.sub}</span>
            </span>
            <ChevronRight size={18} className="text-slate-400" />
          </Link>
        );
      })}
    </div>
  );
}
