import Image from "next/image";
import { Bot, Check, CircleCheck, Cloud, Database, FileText, Globe, Send, Server, Sparkles, Workflow } from "lucide-react";
import { cx } from "./ui";

/**
 * Generated illustrations. There is no client photography to show, so every
 * card gets a small, honest mock of the kind of interface we build. All data
 * in here is illustrative — labels and shapes, not reported results.
 */

/* ─────────────────────────── shells ─────────────────────────── */

/** Light application window with traffic-light chrome. */
export function Window({ title, children, className = "", tone = "paper" }) {
  const night = tone === "night";
  return (
    <div
      className={cx(
        "overflow-hidden rounded-2xl border shadow-[0_24px_60px_-28px_rgba(13,13,13,.45)]",
        night ? "border-white/10 bg-[#1a1a1a] text-white" : "border-line bg-paper text-ink",
        className,
      )}
    >
      <div className={cx("flex items-center gap-1.5 border-b px-3.5 py-2.5", night ? "border-white/10" : "border-line")}>
        <span className="size-2 rounded-full bg-[#ff6b5e]" />
        <span className="size-2 rounded-full bg-[#ffc23d]" />
        <span className="size-2 rounded-full bg-[#3ccf6e]" />
        {title && <span className={cx("ml-2 text-[10.5px]", night ? "text-white/45" : "text-muted")}>{title}</span>}
      </div>
      {children}
    </div>
  );
}

/** Frosted card that floats over the sky photograph. */
export function Glass({ children, className = "" }) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-white/60 bg-white/75 p-3 text-[11px] text-[#0d0d0d] shadow-[0_14px_40px_-16px_rgba(13,13,13,.45)] backdrop-blur-md",
        "dark:border-white/10 dark:bg-[#141414]/75 dark:text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** The cloud photograph, used behind hero and feature mockups. */
export function Sky({ children, className = "", priority = false, sizes = "(min-width: 1024px) 40vw, 100vw" }) {
  return (
    <div className={cx("relative overflow-hidden", className)}>
      <div data-scrub="grow" className="absolute inset-0">
        <Image src="/hero-sky.jpg" alt="" fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-[#0d0d0d]/25 dark:from-black/30 dark:to-black/55" />
      {children}
    </div>
  );
}

/* ─────────────────────────── pieces ─────────────────────────── */

export function DeployCard({ className = "" }) {
  const steps = [
    ["Build", "42s"],
    ["Tests", "passed"],
    ["Deploy", "eu-north-1"],
  ];
  return (
    <Glass className={cx("w-[210px]", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Cloud size={13} strokeWidth={1.8} /> Production
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-[#3ccf6e]/15 px-2 py-0.5 text-[10px] text-[#1f8f47] dark:text-[#6fe39a]">
          <span className="pulse-dot size-1.5 rounded-full bg-[#3ccf6e]" /> Live
        </span>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {steps.map(([name, meta]) => (
          <li key={name} className="flex items-center justify-between rounded-lg bg-black/[.04] px-2 py-1.5 dark:bg-white/[.06]">
            <span className="flex items-center gap-1.5">
              <span className="grid size-3.5 place-items-center rounded-full bg-[#0d0d0d] text-[var(--lime)] dark:bg-[var(--lime)] dark:text-[#0d0d0d]">
                <Check size={9} strokeWidth={3} />
              </span>
              {name}
            </span>
            <span className="opacity-55">{meta}</span>
          </li>
        ))}
      </ul>
    </Glass>
  );
}

export function BarsCard({ className = "", title = "Weekly throughput" }) {
  const bars = [38, 52, 44, 70, 58, 86, 64];
  return (
    <Glass className={cx("w-[176px]", className)}>
      <div className="flex items-center justify-between">
        <span>{title}</span>
        <span className="opacity-55">7d</span>
      </div>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cx("flex-1 rounded-full", i === 5 ? "bg-[var(--lime)]" : "bg-[#0d0d0d]/15 dark:bg-white/20")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </Glass>
  );
}

export function AssistantCard({ className = "" }) {
  return (
    <Glass className={cx("w-[230px]", className)}>
      <div className="flex items-center gap-1.5 opacity-70">
        <Sparkles size={12} strokeWidth={1.8} /> Assistant
      </div>
      <p className="mt-1.5 text-[11.5px] leading-snug">Three approvals are waiting on finance sign-off.</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="rounded-full bg-black/[.05] px-2 py-0.5 text-[10px] dark:bg-white/10">ERP · AP queue</span>
        <span className="rounded-full bg-[#0d0d0d] px-2.5 py-1 text-[10px] text-white dark:bg-white dark:text-[#0d0d0d]">Open queue</span>
      </div>
    </Glass>
  );
}

/* ─────────────────────────── service visuals ─────────────────────────── */

/** SWD — an approval workflow moving through its stages. */
export function FlowVisual({ className = "" }) {
  const steps = [
    { name: "Request submitted", meta: "Operations", state: "done" },
    { name: "Manager review", meta: "Approved", state: "done" },
    { name: "Finance approval", meta: "In review", state: "active" },
    { name: "Synced to ERP", meta: "Queued", state: "todo" },
  ];
  return (
    <Window title="Purchase request · PR-1042" className={className}>
      <div className="p-4">
        <ol className="relative space-y-3">
          <span className="absolute bottom-3 left-[11px] top-3 w-px bg-line" aria-hidden="true" />
          {steps.map((s) => (
            <li key={s.name} className="relative flex items-center gap-3">
              <span
                className={cx(
                  "relative z-10 grid size-6 shrink-0 place-items-center rounded-full border",
                  s.state === "done" && "border-ink bg-ink text-lime dark:text-[#0d0d0d]",
                  s.state === "active" && "border-lime-deep bg-lime text-lime-ink",
                  s.state === "todo" && "border-line-strong bg-paper text-muted",
                )}
              >
                {s.state === "done" ? <Check size={12} strokeWidth={2.6} /> : <span className={cx("size-1.5 rounded-full", s.state === "active" ? "pulse-dot bg-lime-ink" : "bg-line-strong")} />}
              </span>
              <span className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-line px-3 py-2">
                <span className="truncate text-[12px]">{s.name}</span>
                <span className="shrink-0 text-[10.5px] text-muted">{s.meta}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Window>
  );
}

/** SAS — a tenant dashboard with KPIs and a usage curve. */
export function DashboardVisual({ className = "" }) {
  const kpis = [
    ["Accounts", "1,284"],
    ["Seats", "8,930"],
    ["Plans", "3 tiers"],
  ];
  return (
    <Window title="Workspace · Overview" className={className}>
      <div className="flex">
        <div className="hidden w-12 shrink-0 flex-col items-center gap-2.5 border-r border-line py-3 sm:flex">
          <span className="size-5 rounded-md bg-lime" />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="size-4 rounded-md bg-mist" />
          ))}
        </div>
        <div className="min-w-0 flex-1 p-3.5">
          <div className="grid grid-cols-3 gap-2">
            {kpis.map(([k, v]) => (
              <div key={k} className="rounded-xl bg-mist px-2.5 py-2">
                <div className="text-[9.5px] text-muted">{k}</div>
                <div className="mt-0.5 font-display text-[15px] leading-tight">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-2.5 rounded-xl border border-line p-2.5">
            <div className="flex items-center justify-between text-[10px] text-muted">
              <span>Active usage</span>
              <span>30 days</span>
            </div>
            <svg viewBox="0 0 240 70" className="mt-1.5 h-[70px] w-full" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="dash-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--lime)" stopOpacity="0.9" />
                  <stop offset="1" stopColor="var(--lime)" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path d="M0 58 C20 54 30 40 50 44 S80 30 100 34 S130 18 150 24 S190 10 210 14 S232 6 240 8 V70 H0Z" fill="url(#dash-fill)" />
              <path d="M0 58 C20 54 30 40 50 44 S80 30 100 34 S130 18 150 24 S190 10 210 14 S232 6 240 8" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
            </svg>
          </div>
          <div className="mt-2.5 space-y-1.5">
            {["Team plan · renewed", "Seat limit raised", "Invoice paid"].map((row, i) => (
              <div key={row} className="flex items-center justify-between rounded-lg bg-mist/70 px-2.5 py-1.5 text-[10.5px]">
                <span className="flex items-center gap-2">
                  <span className={cx("size-1.5 rounded-full", i === 0 ? "bg-lime-deep" : "bg-line-strong")} />
                  {row}
                </span>
                <span className="text-muted">{["2m", "1h", "3h"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

/** CLD — a release pipeline above a small service topology. */
export function InfraVisual({ className = "" }) {
  const pipeline = ["Commit", "Build", "Test", "Deploy"];
  const nodes = [
    { icon: Globe, label: "Edge / CDN" },
    { icon: Server, label: "API · ×3" },
    { icon: Database, label: "Postgres" },
    { icon: Workflow, label: "Queue" },
  ];
  return (
    <Window title="Release · main → production" className={className}>
      <div className="p-4">
        <div className="flex items-center gap-1.5">
          {pipeline.map((p, i) => (
            <div key={p} className="flex min-w-0 flex-1 items-center gap-1.5">
              <span className="flex min-w-0 flex-1 items-center justify-center gap-1 rounded-full border border-line py-1 text-[10.5px]">
                <CircleCheck size={11} strokeWidth={2} className="shrink-0 text-ok" />
                <span className="truncate">{p}</span>
              </span>
              {i < pipeline.length - 1 && <span className="h-px w-2 shrink-0 bg-line-strong" />}
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {nodes.map(({ icon: Icon, label }, i) => (
            <div key={label} className={cx("flex items-center gap-2 rounded-xl px-2.5 py-2.5", i === 1 ? "bg-lime text-lime-ink" : "bg-mist")}>
              <Icon size={14} strokeWidth={1.8} />
              <span className="text-[11px]">{label}</span>
              <span className={cx("ml-auto size-1.5 rounded-full", i === 1 ? "bg-lime-ink" : "bg-ok")} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl border border-dashed border-line-strong px-3 py-2 text-[10.5px] text-muted">
          <span>Region · eu-north-1</span>
          <span className="flex items-center gap-1.5">
            <span className="pulse-dot size-1.5 rounded-full bg-ok" /> All systems healthy
          </span>
        </div>
      </div>
    </Window>
  );
}

/** AIS — an assistant answering from the business's own records. */
export function ChatVisual({ className = "" }) {
  return (
    <Window title="Assistant · Finance ops" className={className}>
      <div className="space-y-3 p-4">
        <div className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-ink px-3 py-2 text-[11.5px] leading-snug text-paper">
          Which supplier invoices are still waiting on approval?
        </div>
        <div className="flex gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-lime text-lime-ink">
            <Bot size={13} strokeWidth={1.8} />
          </span>
          <div className="max-w-[82%] rounded-2xl rounded-tl-md bg-mist px-3 py-2 text-[11.5px] leading-snug">
            Three are waiting. Two need finance sign-off and one is missing a purchase order.
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["invoices-q3.pdf", "ERP · AP queue"].map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-full border border-line bg-paper px-2 py-0.5 text-[10px] text-ink-soft">
                  <FileText size={10} strokeWidth={1.8} /> {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line py-1 pl-3 pr-1 text-[11px] text-muted">
          <span className="flex-1 truncate">Ask about orders, invoices, approvals…</span>
          <span className="grid size-6 place-items-center rounded-full bg-lime text-lime-ink">
            <Send size={11} strokeWidth={2} />
          </span>
        </div>
      </div>
    </Window>
  );
}

/** A short, readable code sample — for "built to last" moments. */
export function CodeVisual({ className = "" }) {
  const k = "text-[#c792ea]";
  const f = "text-[var(--lime)]";
  const s = "text-[#9ccfd8]";
  const lines = [
    <><span className={k}>async function</span> <span className={f}>approve</span>(id, user) {"{"}</>,
    <>  <span className={k}>const</span> order = <span className={k}>await</span> orders.<span className={f}>get</span>(id)</>,
    <>  <span className={k}>await</span> policy.<span className={f}>check</span>(order, user)</>,
    <>  <span className={k}>await</span> audit.<span className={f}>log</span>(order, <span className={s}>&quot;ok&quot;</span>)</>,
    <>  <span className={k}>return</span> flow.<span className={f}>advance</span>(order)</>,
    <>{"}"}</>,
  ];
  return (
    <Window title="approve.ts" tone="night" className={className}>
      <pre className="overflow-hidden p-4 font-mono text-[10.5px] leading-[1.8]">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-4 whitespace-pre">
            <span className="w-3 shrink-0 text-right text-white/25">{i + 1}</span>
            <span className="text-white/85">{line}</span>
          </div>
        ))}
      </pre>
    </Window>
  );
}

const SERVICE_VISUALS = {
  flow: FlowVisual,
  dashboard: DashboardVisual,
  infra: InfraVisual,
  chat: ChatVisual,
  code: CodeVisual,
};

/** Picks a service's illustration by the `visual` key in content/services.js. */
export function ServiceVisual({ name, className = "" }) {
  const Cmp = SERVICE_VISUALS[name] || FlowVisual;
  return <Cmp className={className} />;
}

/* ─────────────────────────── geometric covers ─────────────────────────── */

/**
 * Abstract covers for articles: arcs, discs and bars from the same geometry as
 * the mark, so a grid of articles has variety without stock photography.
 */
export function CoverArt({ type = "arc", surface = "mist", className = "" }) {
  const ink = "var(--ink)";
  const pop = "var(--lime)";
  const art = {
    grid: (
      <>
        <rect x="18" y="88" width="164" height="18" rx="9" fill={ink} fillOpacity="0.16" />
        <rect x="18" y="58" width="120" height="18" rx="9" fill={ink} fillOpacity="0.4" />
        <rect x="18" y="28" width="74" height="18" rx="9" fill={pop} />
      </>
    ),
    orbits: (
      <>
        <circle cx="100" cy="70" r="56" stroke={ink} strokeOpacity="0.22" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="70" r="28" fill={pop} />
        <circle cx="156" cy="70" r="9" fill={ink} />
      </>
    ),
    steps: [0, 1, 2, 3, 4].map((i) => {
      const h = (i % 3) * 24 + 30;
      return <rect key={i} x={22 + i * 34} y={118 - h} width="22" height={h} rx="11" fill={i === 2 ? pop : ink} fillOpacity={i === 2 ? 1 : 0.14 + i * 0.1} />;
    }),
    columns: (
      <>
        <path d="M200 0v140H64A136 136 0 0 1 200 4Z" fill={ink} fillOpacity="0.9" />
        <path d="M0 140A92 92 0 0 1 92 48v92Z" fill={pop} />
      </>
    ),
    nodes: (
      <>
        <circle cx="72" cy="70" r="48" fill={pop} />
        <circle cx="130" cy="70" r="48" fill={ink} fillOpacity="0.88" />
      </>
    ),
    flow: (
      <>
        <path d="M0 140A140 140 0 0 1 140 0v140Z" fill={pop} />
        <circle cx="168" cy="32" r="16" fill={ink} />
      </>
    ),
  };
  return (
    <div className={cx("relative overflow-hidden", surface === "paper" ? "bg-paper" : "bg-mist", className)} aria-hidden="true">
      <svg viewBox="0 0 200 140" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
        <g data-scrub="grow" style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}>
          {art[type] || art.flow}
        </g>
      </svg>
    </div>
  );
}
