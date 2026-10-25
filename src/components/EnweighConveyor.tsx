"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * EnweighConveyor: a scroll-driven weigh-feeder animation. Conveyor only.
 *
 * Drop it into the page where you want it (e.g. first section under the header).
 * The section is tall and its stage is sticky; scrolling runs the belt:
 *   material leaves the hopper -> is weighed on the load cell -> feed rate settles at setpoint.
 * When it finishes, the pin releases and the page continues.
 *
 * Optional `intro`: pass your existing hero content (headline, text, buttons) and it shows
 * first, then lifts away as the animation starts. Leave it out for the conveyor alone.
 *
 * No dependencies. Needs a parent with no overflow:hidden/auto or transform (breaks sticky).
 * Header height: set CSS variable --cv-top (default 0px) if the header is fixed.
 */

export type ConveyorMaterial = { name: string; a: string; b: string }; // a = dark face, b = light face

const DEFAULT_MATERIALS: ConveyorMaterial[] = [
  { name: "Coal & coke", a: "#2b2338", b: "#4a3f5e" },
  { name: "Limestone", a: "#c49a62", b: "#e3c18d" },
  { name: "Material 3", a: "#9a9aa3", b: "#c9c9d1" },
  { name: "Material 4", a: "#5f9a68", b: "#8fc79a" },
  { name: "Material 5", a: "#b4694f", b: "#d98d72" },
];

const STEPS = [
  { title: "Material comes in", body: "Bulk material is drawn from the hopper onto the belt." },
  { title: "Weighed while it moves", body: "The load cell under the belt reads the weight every instant." },
  { title: "Delivered at the setpoint", body: "The controller trims belt speed so the feed rate holds on target." },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// % deviation from setpoint: large at start-up, settling inside +/-0.5 (simulated, for show)
const deviation = (t: number) =>
  (1 - clamp(t / 0.32)) * 2.4 * Math.cos(t * 55) + Math.sin(t * 90) * 0.28 + Math.sin(t * 37) * 0.14;

type Props = {
  intro?: ReactNode;
  materials?: ConveyorMaterial[];
  setpoint?: number; // t/h on the readout. Replace with a real figure.
};

export default function EnweighConveyor({ intro, materials = DEFAULT_MATERIALS, setpoint = 250 }: Props) {
  const wrap = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(clamp(-r.top / (r.height - window.innerHeight)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const hasIntro = !!intro;
  const introOut = hasIntro ? clamp((p - 0.05) / 0.08) : 1; // 0 = intro fully shown, 1 = gone
  const q = hasIntro ? clamp((p - 0.1) / 0.9) : p; // story progress
  const storyOn = hasIntro ? clamp((p - 0.09) / 0.06) : 1;
  const step = q < 0.34 ? 0 : q < 0.67 ? 1 : 2;

  const offset = 650 + p * 2750; // belt travel; starts with material already loaded
  const ramp = clamp(q / 0.25);
  const dev = deviation(q);
  const rate = Math.round(setpoint * ramp * (1 + (q > 0.25 ? dev : 0) / 100));
  const inBand = q > 0.32 && Math.abs(dev) <= 0.5;

  // 12 lumps leave the hopper outlet (x = 130), one per 230 units of belt travel
  const lumps = Array.from({ length: 12 }, (_, m) => {
    const x = 130 + offset - m * 230;
    const drop = Math.max(0, x - 1020);
    return { m, x, y: (drop * drop) / 260, rot: drop * 0.25, mat: materials[Math.floor(m / 2) % materials.length] };
  }).filter((l) => l.x > 100 && l.x < 1320);

  const nearest = lumps.length ? lumps.reduce((b, l) => (Math.abs(l.x - 600) < Math.abs(b.x - 600) ? l : b), lumps[0]) : null;
  const onCell = !!nearest && Math.abs(nearest.x - 600) < 110;

  const N = 70;
  const pts = Array.from({ length: N + 1 }, (_, j) => {
    const t = (j / N) * q;
    return `${(j / N) * 300},${clamp(30 - deviation(t) * 11, 3, 57).toFixed(1)}`;
  }).join(" ");

  return (
    <section ref={wrap} className="cv-wrap" aria-label="How an Enweigh weigh feeder works">
      <div className="cv-stage">
        <div className="cv-slot">
          {hasIntro && (
            <div
              className="cv-intro"
              style={{
                opacity: 1 - introOut,
                transform: `translateY(${-40 * introOut}px)`,
                pointerEvents: introOut > 0.5 ? "none" : "auto",
              }}
            >
              {intro}
            </div>
          )}
          <div className="cv-caption" key={step} style={{ opacity: storyOn }}>
            <h2>{STEPS[step].title}</h2>
            <p>{STEPS[step].body}</p>
          </div>
        </div>

        <div className="cv-belt">
          <svg viewBox="0 30 1200 330" role="img" aria-label="A weigh feeder carrying material over a load cell">
            <defs>
              <pattern id="cv-cleats" width="60" height="26" patternUnits="userSpaceOnUse" patternTransform={`translate(${-(offset % 60)} 0)`}>
                <rect width="60" height="26" fill="#2a1d47" />
                <rect width="4" height="26" fill="#4b3a78" />
              </pattern>
            </defs>

            <polygon points="40,40 220,40 170,200 90,200" fill="#d9d1ee" />
            <rect x="90" y="196" width="80" height="22" fill="#a89ccc" />

            <rect x="70" y="300" width="1060" height="14" fill="#8a7db3" />
            <rect x="120" y="314" width="14" height="46" fill="#8a7db3" />
            <rect x="1066" y="314" width="14" height="46" fill="#8a7db3" />

            <rect x="545" y="286" width="110" height="26" rx="3" fill={onCell ? "#f2b632" : "#a89ccc"} style={{ transition: "fill .25s" }} />
            <text x="600" y="342" textAnchor="middle" fontSize="16" fill="#3e2d63">load cell</text>

            <rect x="100" y="256" width="1000" height="26" rx="13" fill="url(#cv-cleats)" />
            {[100, 1100].map((cx) => (
              <g key={cx} transform={`rotate(${offset * 0.35} ${cx} 269)`}>
                <circle cx={cx} cy="269" r="26" fill="#3e2d63" />
                <line x1={cx - 20} y1="269" x2={cx + 20} y2="269" stroke="#cfc6e6" strokeWidth="4" />
                <line x1={cx} y1="249" x2={cx} y2="289" stroke="#cfc6e6" strokeWidth="4" />
              </g>
            ))}

            {lumps.map((l) => {
              const rise = l.x < 240 ? clamp((l.x - 110) / 130) : 1;
              return (
                <g key={l.m} transform={`translate(${l.x} ${256 + l.y}) rotate(${l.rot})`}>
                  <path d={`M-70 0 L-40 ${-34 * rise} L-5 ${-52 * rise} L30 ${-40 * rise} L70 0 Z`} fill={l.mat.a} />
                  <path d={`M-40 ${-34 * rise} L-5 ${-52 * rise} L10 ${-20 * rise} L-20 0 L-70 0 Z`} fill={l.mat.b} opacity=".75" />
                </g>
              );
            })}

            <polygon points="1100,300 1200,300 1200,360 1160,360" fill="#cfc6e6" opacity=".6" />
          </svg>
        </div>

        <div className="cv-panel" style={{ opacity: storyOn }}>
          <div className="cv-readout">
            <span className="cv-label">Feed rate</span>
            <span>
              <span className="cv-num">{rate}</span> <span className="cv-unit">t/h</span>
            </span>
            <span className="cv-label">{onCell && nearest ? `Weighing: ${nearest.mat.name}` : `Setpoint ${setpoint} t/h`}</span>
          </div>
          <div className="cv-trace">
            <svg viewBox="0 0 300 60" width="100%" height="56" aria-hidden>
              <rect x="0" y="24" width="300" height="12" fill="#3e2d63" opacity=".1" />
              <line x1="0" y1="30" x2="300" y2="30" stroke="#3e2d63" strokeDasharray="4 4" opacity=".5" />
              <polyline points={pts} fill="none" stroke={inBand ? "#2f9e6a" : "#6b5aa6"} strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="cv-label">{inBand ? "Within ±0.5% of setpoint" : "Settling to setpoint"}</span>
          </div>
        </div>
      </div>

      <style>{`
        .cv-wrap { position: relative; height: 400vh; }
        .cv-stage { position: sticky; top: 0; height: 100vh; overflow: hidden; padding: var(--cv-top, 0px) 24px var(--cv-bottom, 1.5rem);
          display: grid; grid-template-rows: auto minmax(0, 1fr) auto; gap: 1rem; font-family: inherit; }
        .cv-slot { display: grid; width: min(1240px, 100%); margin: 0 auto; padding-top: 1rem; }
        .cv-slot > * { grid-area: 1 / 1; }
        .cv-caption { text-align: center; justify-self: center; align-self: start; max-width: 36rem; animation: cvIn .4s ease both; }
        .cv-caption h2 { font-size: clamp(1.8rem, min(4vw, 7vh), 3rem); line-height: 1.1; color: #3e2d63; margin: 0 0 .5rem; letter-spacing: -.02em; }
        .cv-caption p { font-size: 1.1rem; color: #5b4d80; margin: 0; }
        .cv-belt { min-height: 0; display: flex; align-items: center; justify-content: center; }
        .cv-belt svg { width: 100%; height: 100%; max-width: 1400px; }
        .cv-panel { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2rem; align-items: center; text-align: center; width: min(760px, 100%); margin: 0 auto; }
        .cv-readout { display: flex; flex-direction: column; color: #3e2d63; min-width: 0; }
        .cv-num { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 700; font-variant-numeric: tabular-nums; }
        .cv-unit { font-size: 1.1rem; }
        .cv-label { font-size: .85rem; color: #5b4d80; }
        .cv-trace { min-width: 0; display: flex; flex-direction: column; gap: .25rem; }
        @keyframes cvIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .cv-caption { animation: none; } }
        @media (max-width: 640px) { .cv-wrap { height: 340vh; } .cv-panel { grid-template-columns: minmax(0, 1fr); } .cv-trace { display: none; } }
      `}</style>
    </section>
  );
}
