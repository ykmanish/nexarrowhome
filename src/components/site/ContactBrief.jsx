"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { cx } from "./ui";

const field =
  "w-full rounded-md border border-line bg-paper px-4 py-3.5 text-[15px] text-ink placeholder:text-muted transition-colors focus:border-eu focus:outline-none";

/** A pre-filled email with the same brief, for when the site cannot send it. */
function draftLink(email, brief) {
  const subject = `Project brief${brief.topic ? `: ${brief.topic}` : ""}${brief.company ? ` (${brief.company})` : ""}`;
  const body = `Hi Nexarrow,\n\n${brief.message}\n\nThanks,\n${brief.name}${brief.company ? `\n${brief.company}` : ""}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * The project brief form. It posts to /api/contact, which emails the brief to
 * the inbox. If the site cannot send it (no mail service set up, provider
 * down, offline), the same brief opens as a pre-filled email instead, so an
 * enquiry is never lost.
 */
export default function ContactBrief({ email, topics, reply = "within 24 hours" }) {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | invalid | limited | fallback
  const [brief, setBrief] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const data = {
      name: String(f.get("name") || "").trim(),
      company: String(f.get("company") || "").trim(),
      email: String(f.get("email") || "").trim(),
      message: String(f.get("message") || "").trim(),
      website: String(f.get("website") || ""),
      topic,
    };
    setBrief(data);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setTopic("");
        return;
      }
      const { error } = await res.json().catch(() => ({}));
      setStatus(error === "invalid" ? "invalid" : error === "rate_limited" ? "limited" : "fallback");
    } catch {
      setStatus("fallback");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="border border-line bg-paper p-7 md:p-9">
        <span className="grid size-11 place-items-center rounded-md bg-eu text-eu-ink">
          <Check size={18} strokeWidth={2.2} />
        </span>
        <p className="mt-6 font-display text-[clamp(1.6rem,2.4vw,2rem)] leading-tight tracking-[-0.02em]">
          Thanks{brief?.name ? `, ${brief.name.split(" ")[0]}` : ""}. Your brief is with us.
        </p>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
          We reply {reply}, usually with a few questions or a first direction. Check your inbox at{" "}
          <span className="text-ink">{brief?.email}</span>.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 text-[14px] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
        >
          Send another brief
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[13px] text-ink-soft">Your name</span>
          <input name="name" required maxLength={120} autoComplete="name" className={field} placeholder="Jane Doe" />
        </label>
        <label className="block">
          <span className="mb-2 block text-[13px] text-ink-soft">Company</span>
          <input name="company" maxLength={120} autoComplete="organization" className={field} placeholder="Optional" />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-[13px] text-ink-soft">Where should we reply?</span>
        <input
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className={field}
          placeholder="you@company.com"
        />
      </label>

      <fieldset>
        <legend className="mb-2.5 text-[13px] text-ink-soft">What do you need help with?</legend>
        <div className="flex flex-wrap gap-2">
          {[...topics, "Not sure yet"].map((t) => (
            <label key={t} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={t}
                checked={topic === t}
                onChange={() => setTopic(t)}
                className="peer sr-only"
              />
              <span
                className={cx(
                  "inline-flex rounded-md border px-4 py-2 text-[13.5px] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink",
                  topic === t ? "border-eu bg-eu text-eu-ink" : "border-line bg-paper text-ink-soft hover:border-ink",
                )}
              >
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-2 block text-[13px] text-ink-soft">What are you trying to build or fix?</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className={cx(field, "resize-y")}
          placeholder="The problem, who it affects, and anything you already know about scope, budget or timing."
        />
      </label>

      {status === "invalid" && (
        <p role="alert" className="text-[13.5px] text-[#b42318] dark:text-[#ff8a80]">
          Please add your name, a valid email and a few words about the project.
        </p>
      )}
      {status === "limited" && (
        <p role="alert" className="text-[13.5px] text-[#b42318] dark:text-[#ff8a80]">
          That is a few briefs in a short time. Please wait a few minutes, or email us at {email}.
        </p>
      )}
      {status === "fallback" && brief && (
        <div role="alert" className="border-l-2 border-eu bg-paper p-4 text-[14px] leading-relaxed text-ink-soft">
          We could not send this from the site just now. Your brief is not lost: open it as a ready-written email instead.
          <a
            href={draftLink(email, brief)}
            className="mt-3 flex w-fit items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-[13.5px] text-paper"
          >
            <Mail size={15} strokeWidth={1.8} /> Open as email to {email}
          </a>
        </div>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex w-fit items-center gap-3 rounded-md bg-eu px-6 py-3.5 text-[14px] text-eu-ink transition-colors duration-300 hover:bg-eu-deep disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? "Sending…" : "Send brief"}
          <ArrowUpRight size={16} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
        </button>
        <p className="max-w-xs text-[12.5px] leading-relaxed text-muted">
          We reply {reply}. Your details are used only to answer you; see our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
