import { type PolicyBlock } from "@/data/site-policies";

type PolicyListProps = {
  blocks: PolicyBlock[];
};

type FaqAccordionProps = {
  items: {
    question: string;
    answer: string;
  }[];
};

export function PolicyList({ blocks }: PolicyListProps) {
  return (
    <div className="space-y-5">
      {blocks.map((block) => (
        <article
          key={block.title}
          className="rounded-[1.35rem_1rem_1.45rem_1.15rem] border border-border bg-surface p-5 sm:p-6"
        >
          <h2 className="text-base font-semibold text-foreground">
            {block.title}
          </h2>
          <p className="mt-3 space-y-2 pl-5 text-sm text-foreground/84">
            {block.content}
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground/84">
            {block.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mt-3 space-y-2 pl-5 text-sm text-foreground/84">
            {block.subContent}
          </p>
        </article>
      ))}
    </div>
  );
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-border bg-surface px-4 py-3"
        >
          <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-foreground marker:content-none">
            {item.question}
          </summary>
          <p className="mt-2 text-sm text-foreground/82">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
