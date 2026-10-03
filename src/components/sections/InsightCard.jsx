import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { paths } from "@/lib/routes";
import { CoverArt } from "@/components/site/visuals";
import { Chip, cx } from "@/components/site/ui";

export default function InsightCard({ article, surface = "mist", className = "" }) {
  return (
    <Link href={paths.article(article.slug)} data-anim="rise" className={cx("group block", className)}>
      <div className="relative overflow-hidden rounded-[22px]">
        <CoverArt type={article.hero} surface={surface} className="aspect-[4/3]" />
        <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-paper text-ink opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
          <ArrowUpRight size={16} strokeWidth={1.8} />
        </span>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Chip>{article.tag}</Chip>
        <Chip tone="soft">{article.read} read</Chip>
      </div>
      <h3 className="mt-4 font-display text-[21px] leading-[1.18] tracking-[-0.015em] text-ink transition-colors group-hover:text-ink-soft">
        {article.title}
      </h3>
      <p className="mt-3 text-[13px] text-muted">{article.date}</p>
    </Link>
  );
}
