"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ---------- palette (matches reference) ---------- */
const SKY = "#CDE6F0";
const CREAM = "#F6EEDC";
const PINK = "#F5B7C8";
const YELLOW = "#FFEFA6";
const MINT = "#B7DFC7";

// canvas-confetti touches browser globals at module scope, so it can only be
// loaded in the browser — a static import crashes the SSR prerender.
async function fireConfetti() {
  if (typeof window === "undefined") return;
  const { default: confetti } = await import("canvas-confetti");
  const colors = [PINK, YELLOW, SKY, MINT, "#000"];
  confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 }, colors, shapes: ["circle", "square"] });
  setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0 }, colors }), 180);
  setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1 }, colors }), 340);
}

export default function LakshitaaInvitation() {
  return (
    <main className="min-h-screen text-ink overflow-x-hidden bg-paper-grid">
      <Nav />
      <Hero />
      <Marquee />
      <WhyYou />
      <WhatIsNexarrow />
      <Roles />
      <Promises />
      <Timeline />
      <LetterSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ---------- floating sticker bits ---------- */
function Sticker({
  children,
  className = "",
  rotate = -4,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: rotate - 10 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ delay, type: "spring", stiffness: 140, damping: 12 }}
      className={`absolute select-none ${className}`}
    >
      <motion.div animate={{ y: [0, -8, 0], rotate: [rotate, rotate + 3, rotate] }} transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink" style={{ background: "rgba(205,230,240,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full border-2 border-ink" style={{ background: PINK }} />
          <span className="chunky text-2xl">nexarrow.</span>
        </div>
        <span className="sticker hidden sm:inline-flex" style={{ background: YELLOW, transform: "rotate(2deg)" }}>
          ✦ for lakshitaa
        </span>
      </div>
    </header>
  );
}

/* ---------------- 1. HERO (the ticket) ---------------- */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const t = setTimeout(fireConfetti, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={ref} className="relative px-4 pt-10 pb-20 sm:pt-16">
      {/* background floating stickers */}
      <motion.div style={{ y: yA }} className="pointer-events-none absolute inset-0">
        <Sticker className="left-[6%] top-[18%] text-5xl" rotate={-14} delay={0.1}>⭐</Sticker>
        <Sticker className="right-[8%] top-[10%] text-5xl" rotate={12} delay={0.3}>⭐</Sticker>
        <Sticker className="left-[3%] top-[55%] text-5xl" rotate={-8} delay={0.5}>🍿</Sticker>
        <Sticker className="right-[5%] top-[60%] text-5xl" rotate={10} delay={0.7}>🧸</Sticker>
      </motion.div>
      <motion.div style={{ y: yB }} className="pointer-events-none absolute inset-0">
        <Sticker className="left-[2%] bottom-[14%] text-5xl" rotate={-18} delay={0.9}>☎️</Sticker>
        <Sticker className="right-[3%] bottom-[8%] text-5xl" rotate={8} delay={1.1}>🌸</Sticker>
      </motion.div>

      <div className="relative mx-auto max-w-3xl">
        {/* top tabs */}
        <div className="relative -mb-4 flex justify-between px-2 z-20">
          <motion.span
            initial={{ y: -30, opacity: 0, rotate: -10 }}
            animate={{ y: 0, opacity: 1, rotate: -6 }}
            transition={{ delay: 0.15, type: "spring" }}
            className="sticker"
            style={{ background: SKY }}
          >
            our tiny invitation
          </motion.span>
          <motion.span
            initial={{ y: -30, opacity: 0, rotate: 10 }}
            animate={{ y: 0, opacity: 1, rotate: 6 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="sticker"
            style={{ background: YELLOW }}
          >
            youre invited!
          </motion.span>
        </div>

        {/* TICKET */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="ticket relative px-6 pt-12 pb-8 sm:px-12 sm:pt-16 sm:pb-10"
        >
          <div className="text-center text-sm tracking-wider">
            <span className="chunky text-2xl">✦ nexarrow.</span>
            <span className="ml-2 serif-it text-xl text-ink/70">presents:</span>
          </div>
          <div className="mx-auto mt-3 w-24 border-t-2 border-dotted border-ink/40" />

          <h1 className="chunky mt-6 text-center text-[16vw] sm:text-[7.5rem] md:text-[8.5rem]">
            lakshitaa,
            <br />
            <span className="relative inline-block">
              co-found
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 8 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                className="absolute -right-10 -top-4 text-3xl"
                style={{ color: PINK }}
              >
                ✦
              </motion.span>
            </span>
            <br />
            <span className="serif-it" style={{ fontStyle: "italic" }}>nexarrow?</span>
          </h1>

          <div className="mx-auto mt-6 w-32 border-t-2 border-dotted border-ink/40" />

          <p className="mx-auto mt-6 max-w-xl text-center text-base sm:text-lg leading-relaxed text-ink/80">
            a day-one seat for the kindest, sharpest brain we know.
            no pitch decks. no buzzwords. just{" "}
            <span className="serif-it italic">one ticket</span>, one arrow, and{" "}
            <span className="font-bold">two of us hoping you say yes.</span>
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={fireConfetti}
              className="group relative rounded-full border-2 border-ink px-8 py-3.5 text-lg font-bold shadow-[4px_4px_0_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
              style={{ background: PINK }}
            >
              waitlist open now! ✦
            </button>
          </div>

          {/* perforation + bottom stub */}
          <div className="relative mt-10">
            <div className="perf" />
          </div>
        </motion.div>

        {/* TICKET STUB (bottom blue band) */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="ticket -mt-1 px-6 py-6 sm:px-12"
          style={{ background: SKY }}
        >
          <div className="grid grid-cols-3 gap-3 items-center text-center">
            <div className="sticker mx-auto" style={{ background: YELLOW, transform: "rotate(-3deg)" }}>
              <div className="text-left leading-tight">
                <div className="text-xs">scroll down,</div>
                <div className="chunky text-lg">say yes</div>
              </div>
            </div>
            <div className="relative">
              <div className="chunky text-[5rem] sm:text-[6rem] leading-none" style={{ color: "#1a1a1a" }}>
                01
              </div>
              <span className="absolute -top-1 right-2 sticker px-2 py-0.5 text-xs" style={{ background: PINK }}>st</span>
              <div className="serif-it italic text-sm">co-founder slot</div>
            </div>
            <div className="sticker mx-auto" style={{ background: YELLOW, transform: "rotate(3deg)" }}>
              <div className="text-left leading-tight">
                <div className="chunky text-base">where?</div>
                <div className="text-xs">right here,<br />with us</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const root = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(".mq-track", { xPercent: -50, ease: "none", duration: 22, repeat: -1 });
    }, root);
    return () => ctx.revert();
  }, []);
  const words = ["lakshitaa ✦", "co-founder", "nexarrow", "say yes ✿", "made by hand", "🧸", "with love ❤"];
  return (
    <div ref={root} className="border-y-2 border-ink overflow-hidden" style={{ background: "#000", color: "#fff" }}>
      <div className="mq-track flex whitespace-nowrap py-4 chunky text-3xl sm:text-5xl">
        {Array.from({ length: 2 }).map((_, k) => (
          <span key={k} className="flex">
            {words.map((w, i) => (
              <span key={i} className="px-6">{w}</span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- WHY YOU (gsap scroll) ---------------- */
function WhyYou() {
  const root = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".why-title", {
        y: 60, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".why-card", {
        y: 80, opacity: 0,
        rotate: (i) => (i % 2 === 0 ? -6 : 6),
        stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  const items = [
    { t: "you see people.", d: "not personas. real, messy, lovely people. rare.", c: PINK, e: "🌸" },
    { t: "you ship.", d: "ideas are cheap. you actually finish things. adore that.", c: YELLOW, e: "🚀" },
    { t: "you're kind.", d: "brilliance without kindness builds the wrong things.", c: MINT, e: "🧸" },
    { t: "you think weird.", d: "in the best way. your angles make the obvious new.", c: SKY, e: "✦" },
  ];
  return (
    <section ref={root} className="px-6 py-24 border-b-2 border-ink bg-paper-grid relative">
      <Sticker className="left-6 top-12 text-4xl" rotate={-12} delay={0}>⭐</Sticker>
      <Sticker className="right-10 top-20 text-4xl" rotate={10} delay={0.3}>🍿</Sticker>
      <div className="mx-auto max-w-6xl">
        <div className="why-title max-w-3xl">
          <span className="sticker" style={{ background: PINK }}>chapter 01 — why you</span>
          <h2 className="chunky mt-5 text-5xl sm:text-7xl md:text-8xl">
            because it <span className="serif-it italic">had</span> to be you.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.t}
              className="why-card ticket p-6"
              style={{ background: it.c }}
            >
              <div className="text-3xl">{it.e}</div>
              <h3 className="chunky mt-3 text-2xl">{it.t}</h3>
              <p className="mt-2 text-sm text-ink/80">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHAT IS NEXARROW ---------------- */
function WhatIsNexarrow() {
  return (
    <section className="px-6 py-24 border-b-2 border-ink relative" style={{ background: YELLOW }}>
      <Sticker className="left-10 top-10 text-5xl" rotate={-10} delay={0}>☎️</Sticker>
      <Sticker className="right-12 bottom-10 text-5xl" rotate={12} delay={0.4}>🧸</Sticker>
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <span className="sticker" style={{ background: SKY }}>chapter 02 — what is nexarrow</span>
          <h2 className="chunky mt-5 text-5xl sm:text-7xl">
            a tiny arrow, <br /><span className="serif-it italic">pointed forward.</span>
          </h2>
          <p className="mt-6 text-lg text-ink/80 max-w-lg leading-relaxed">
            nexarrow is the thing we keep sketching on napkins —
            a studio-product hybrid making software feel{" "}
            <span className="serif-it italic">human-sized</span> again.
            playful, fast, a little bit cheeky. we have the spark.
            we need your fire. 🔥
          </p>
        </div>
        <div className="relative">
          <div className="ticket p-8" style={{ background: CREAM }}>
            <div className="flex items-center justify-between">
              <div className="sticker" style={{ background: MINT, transform: "rotate(-2deg)" }}>● live</div>
              <span className="serif-it italic text-sm text-ink/60">v0.0.1 — just us</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[PINK, YELLOW, SKY].map((c, i) => (
                <div key={i} className="h-24 rounded-2xl border-2 border-ink" style={{ background: c }} />
              ))}
            </div>
            <p className="mt-6 text-base">
              <span className="chunky text-xl">mission:</span>{" "}
              build small, brave, beautiful products with people we&rsquo;d cross oceans for.
            </p>
          </div>
          <motion.div
            animate={{ rotate: [4, -6, 4] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-5 -right-4 sticker"
            style={{ background: PINK }}
          >
            ✿ slot 01 — open
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ROLES ---------------- */
function Roles() {
  const roles = [
    { who: "you", emoji: "🌸", color: PINK, items: ["co-shape the vision", "lead design + taste", "own the vibe (huge)"] },
    { who: "us", emoji: "✦", color: YELLOW, items: ["engineering + ops", "late-night debugging", "snack supply chain"] },
    { who: "together", emoji: "❤", color: MINT, items: ["equity, real + fair", "decisions over voice notes", "ship → laugh → repeat"] },
  ];
  return (
    <section className="px-6 py-24 border-b-2 border-ink bg-paper-grid relative">
      <Sticker className="right-8 top-12 text-5xl" rotate={14} delay={0}>⭐</Sticker>
      <div className="mx-auto max-w-6xl">
        <span className="sticker" style={{ background: YELLOW }}>chapter 03 — how we&rsquo;d build</span>
        <h2 className="chunky mt-5 text-5xl sm:text-7xl max-w-3xl">
          two heads. <span className="serif-it italic">one arrow.</span>
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {roles.map((r, i) => (
            <div
              key={r.who}
              className="ticket p-6"
              style={{ background: r.color, transform: `rotate(${i === 1 ? 0 : i === 0 ? -1.5 : 1.5}deg)` }}
            >
              <div className="text-4xl">{r.emoji}</div>
              <h3 className="chunky mt-2 text-3xl">{r.who}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {r.items.map((it) => (
                  <li key={it} className="flex gap-2"><span>→</span>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROMISES (gsap scroll) ---------------- */
function Promises() {
  const root = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".promise-card");
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 100, opacity: 0, scale: 0.85, rotate: i % 2 ? 6 : -6 },
          {
            y: 0, opacity: 1, scale: 1, rotate: i % 2 ? 2 : -2, duration: 0.9, ease: "back.out(1.4)",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const promises = [
    "we'll never make you sit through bad meetings.",
    "we'll fight fair. better idea wins, not louder.",
    "we'll celebrate small wins like they're the big ones.",
    "your name goes on the door. for real.",
  ];

  return (
    <section ref={root} className="px-6 py-24 border-b-2 border-ink relative" style={{ background: PINK }}>
      <Sticker className="left-6 top-10 text-5xl" rotate={-14} delay={0}>🧸</Sticker>
      <Sticker className="right-8 bottom-10 text-5xl" rotate={14} delay={0.3}>🍿</Sticker>
      <div className="mx-auto max-w-6xl">
        <span className="sticker" style={{ background: CREAM }}>chapter 04 — pinky promises</span>
        <h2 className="chunky mt-5 text-5xl sm:text-7xl max-w-3xl">
          pinky promises, <br /><span className="serif-it italic">properly notarized.</span> 🤝
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {promises.map((p) => (
            <div key={p} className="promise-card ticket p-6 text-xl" style={{ background: CREAM }}>
              <span className="chunky mr-2 text-2xl">✦</span>
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TIMELINE (gsap scrub) ---------------- */
function Timeline() {
  const root = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".tl-item", {
        x: -50, opacity: 0, stagger: 0.18, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.fromTo(".tl-line",
        { scaleY: 0 },
        {
          scaleY: 1, transformOrigin: "top",
          scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom 60%", scrub: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const steps = [
    { t: "week 1", d: "coffee. walk. vibe check. no pressure.", c: PINK },
    { t: "week 2", d: "we sketch the first product together.", c: YELLOW },
    { t: "week 3", d: "paperwork made painless. equity, fair + clear.", c: MINT },
    { t: "week 4", d: "we start. quietly, then loudly.", c: SKY },
  ];

  return (
    <section ref={root} className="px-6 py-24 border-b-2 border-ink bg-paper-grid">
      <div className="mx-auto max-w-4xl">
        <span className="sticker" style={{ background: MINT }}>chapter 05 — if you say yes</span>
        <h2 className="chunky mt-5 text-5xl sm:text-7xl">
          a gentle, <span className="serif-it italic">four-week</span> start.
        </h2>
        <div className="relative mt-14 pl-10">
          <div className="tl-line absolute left-3 top-2 bottom-2 w-1 bg-ink" />
          {steps.map((s) => (
            <div key={s.t} className="tl-item relative mb-8">
              <div className="absolute -left-[34px] top-2 h-6 w-6 rounded-full border-2 border-ink" style={{ background: s.c }} />
              <div className="ticket p-5" style={{ background: CREAM }}>
                <div className="chunky text-sm text-ink/60">{s.t}</div>
                <div className="mt-1 text-xl">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- LETTER ---------------- */
function LetterSection() {
  return (
    <section id="letter" className="px-6 py-24 border-b-2 border-ink relative" style={{ background: MINT }}>
      <Sticker className="left-8 top-10 text-5xl" rotate={-12} delay={0}>☎️</Sticker>
      <Sticker className="right-10 bottom-10 text-5xl" rotate={10} delay={0.3}>🌸</Sticker>
      <div className="mx-auto max-w-3xl">
        <span className="sticker" style={{ background: CREAM }}>chapter 06 — a small letter</span>
        <h2 className="chunky mt-5 text-5xl sm:text-7xl">
          dear <span className="serif-it italic">lakshitaa,</span>
        </h2>
        <div className="ticket mt-8 p-8 sm:p-10 text-lg leading-relaxed" style={{ background: CREAM }}>
          <p>
            we&rsquo;ve been circling this idea for a while. every time we tried to
            picture the team, your name showed up first — like a sticker that
            won&rsquo;t unstick. ✦
          </p>
          <p className="mt-4">
            nexarrow doesn&rsquo;t <span className="serif-it italic">need</span> a co-founder.
            it needs <span className="font-bold">you</span> — the taste, the steadiness,
            the way you make hard things feel doable.
          </p>
          <p className="mt-4">
            no rush. no pressure. just — read this, sit with it, and if it
            makes you smile, let&rsquo;s go. 🌱
          </p>
          <p className="mt-6 chunky text-2xl">— the nexarrow two, waiting kindly.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  const [answer, setAnswer] = useState(null);
  const handleYes = () => {
    setAnswer("yes");
    fireConfetti();
    setTimeout(fireConfetti, 400);
    setTimeout(fireConfetti, 800);
  };
  return (
    <section className="px-6 py-28 border-b-2 border-ink text-center relative bg-paper-grid">
      <Sticker className="left-[10%] top-10 text-5xl" rotate={-14} delay={0}>⭐</Sticker>
      <Sticker className="right-[12%] top-16 text-5xl" rotate={14} delay={0.3}>🧸</Sticker>
      <Sticker className="left-[8%] bottom-16 text-5xl" rotate={10} delay={0.5}>🍿</Sticker>

      <div className="mx-auto max-w-3xl">
        <h2 className="chunky text-6xl sm:text-8xl">
          so... <span className="serif-it italic">what do you say?</span> ✿
        </h2>
        <p className="mt-5 text-lg text-ink/70">
          one button. one moment. one arrow forward.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={handleYes}
            className="rounded-full border-2 border-ink px-9 py-4 text-2xl chunky shadow-[6px_6px_0_0_#000] transition hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
            style={{ background: PINK }}
          >
            YES ✦ let&rsquo;s build
          </button>
          <button
            onClick={() => setAnswer("maybe")}
            className="rounded-full border-2 border-ink px-9 py-4 text-2xl chunky shadow-[6px_6px_0_0_#000] transition hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
            style={{ background: YELLOW }}
          >
            tell me more
          </button>
        </div>
        {answer && (
          <motion.div
            initial={{ opacity: 0, y: 12, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            className="mt-10 ticket inline-block px-6 py-4"
            style={{ background: answer === "yes" ? MINT : SKY }}
          >
            {answer === "yes"
              ? "🎉 you just made our entire year. we'll call you tonight."
              : "💌 coffee on us — pick a day, any day."}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-10" style={{ background: "#000", color: "#fff" }}>
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="chunky text-xl">© nexarrow — handmade for lakshitaa ✦</div>
        <div className="opacity-70 serif-it italic">made with too much love, gsap & confetti.</div>
      </div>
    </footer>
  );
}
