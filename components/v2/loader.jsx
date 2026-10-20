"use client";
import { BaseImage } from "..";

const BLUE = "#1a56db";
const ORANGE = "#ffcf24";
const ORANGE_DEEP = "#e9b400";

// polar -> cartesian helper (SVG viewBox 0 0 200 200, centre 100,100)
const pt = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [100 + r * Math.cos(a), 100 + r * Math.sin(a)];
};

// SVG arc path from startDeg to endDeg (clockwise)
const arc = (r, start, end) => {
  const [x1, y1] = pt(r, start);
  const [x2, y2] = pt(r, end);
  const large = end - start > 180 ? 1 : 0;
  return {
    d: `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
    x1,
    y1,
    x2,
    y2,
  };
};

const THICK = arc(90, -105, 25); // main bold arc (tail -> head)
const THIN_A = arc(80, -150, -85);
const THIN_B = arc(76, -140, -100);

export default function PageLoader({ label = "Loading..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-lg"
    >
      <div className="relative flex aspect-square w-[clamp(240px,42vw,380px)] items-center justify-center">
        {/* Animated ring (behind the logo) */}
        <svg
          viewBox="0 0 200 200"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-[0.75] overflow-visible drop-shadow-[0_0_8px_rgba(255,138,0,0.55)]"
        >
          <defs>
            <linearGradient
              id="wg-thick"
              gradientUnits="userSpaceOnUse"
              x1={THICK.x1}
              y1={THICK.y1}
              x2={THICK.x2}
              y2={THICK.y2}
            >
              <stop offset="0%" stopColor={ORANGE} stopOpacity="0" />
              <stop offset="45%" stopColor={ORANGE} stopOpacity="0.9" />
              <stop offset="100%" stopColor={ORANGE_DEEP} />
            </linearGradient>
            <linearGradient
              id="wg-thin"
              gradientUnits="userSpaceOnUse"
              x1={THIN_A.x1}
              y1={THIN_A.y1}
              x2={THIN_A.x2}
              y2={THIN_A.y2}
            >
              <stop offset="0%" stopColor={ORANGE} stopOpacity="0" />
              <stop offset="100%" stopColor={ORANGE} />
            </linearGradient>
          </defs>

          {/* bold arcs - spin clockwise */}
          <g className="origin-center [transform-box:view-box] animate-[spin_1.6s_linear_infinite] motion-reduce:animate-[spin_4s_linear_infinite]">
            <path
              d={THICK.d}
              stroke="url(#wg-thick)"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={THICK.d}
              stroke="url(#wg-thick)"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
              transform="rotate(180 100 100)"
            />
          </g>

          {/* thin accent arcs - spin counter-clockwise */}
          <g className="origin-center [transform-box:view-box] animate-[spin_2.8s_linear_infinite_reverse] motion-reduce:animate-[spin_7s_linear_infinite_reverse]">
            <path
              d={THIN_A.d}
              stroke="url(#wg-thin)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={THIN_B.d}
              stroke="url(#wg-thin)"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
            <g transform="rotate(180 100 100)">
              <path
                d={THIN_A.d}
                stroke="url(#wg-thin)"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={THIN_B.d}
                stroke="url(#wg-thin)"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>
        </svg>

        {/* Static logo */}
        <div className="relative z-[1] h-[76px] w-[92%] shrink-0 sm:h-[90px]">
          <img
            src="/images/wegot-logo.png"
            alt="WeGot"
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-contain"
          />
          {/* <BaseImage
            src="/images/wegot-logo.png"
            alt="WeGot"
            className="w-full h-full"
            // className="relative z-[1] h-[76px] w-[92%] shrink-0 sm:h-[90px]"
            imgClassName="!object-contain"
            fit="contain"
            sizes="(max-width: 640px) 92vw, 350px"
            showSkeleton={false}
            fallbackClassName="bg-transparent"
          /> */}
        </div>
      </div>
    </div>
  );
}
