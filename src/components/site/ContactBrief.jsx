"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cx } from "./ui";

const field =
  "w-full rounded-md border border-line bg-paper px-4 py-3.5 text-[15px] text-ink placeholder:text-muted transition-colors focus:border-eu focus:outline-none";

/**
 * Project brief that composes a pre-filled email in the visitor's own mail
 * app. There is no backend: nothing is sent or stored by this page.
 */
export default function ContactBrief({ email, topics }) {
  const [topic, setTopic] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const org = String(f.get("company") || "").trim();
    const reply = String(f.get("reply") || "").trim();
    const message = String(f.get("message") || "").trim();

    const subject = ["Project enquiry", topic && `: ${topic}`, org && `(${org})`].filter(Boolean).join(" ");
    const signature = [name && `Thanks,
${name}`, org && `Company: ${org}`, reply && `Reply to: ${reply}`, topic && `Service: ${topic}`]
      .filter(Boolean)
      .join("\n");
    const body = `Hi Nexarrow,\n\n${message}\n\n${signature}`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[13px] text-ink-soft">Your name</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Jane Doe" />
        </label>
        <label className="block">
          <span className="mb-2 block text-[13px] text-ink-soft">Company</span>
          <input name="company" autoComplete="organization" className={field} placeholder="Optional" />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-[13px] text-ink-soft">Where should we reply?</span>
        <input name="reply" type="email" autoComplete="email" className={field} placeholder="you@company.com" />
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
          rows={6}
          className={cx(field, "resize-y")}
          placeholder="The problem, who it affects, and anything you already know about scope or timing."
        />
      </label>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex w-fit items-center gap-3 rounded-md bg-eu px-6 py-3.5 text-[14px] text-eu-ink transition-colors duration-300 hover:bg-eu-deep"
        >
          Open email draft
          <ArrowUpRight size={16} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-45" />
        </button>
        <p className="max-w-xs text-[12.5px] leading-relaxed text-muted">
          Opens a pre-filled draft in your email app. Nothing is sent or stored by this page.
        </p>
      </div>
    </form>
  );
}
