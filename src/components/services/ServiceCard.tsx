import type { Service } from "@/types/service";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="fluid-card min-w-[min(86vw,23rem)] flex-1 rounded-[2rem_1.3rem_2rem_1.6rem] border border-border bg-surface p-6 shadow-[0_10px_30px_rgba(110,78,56,0.08)] sm:min-w-[22rem] sm:p-7">
      <h3 className="text-xl font-semibold tracking-tight text-foreground">
        {service.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-foreground/85">
        {service.summary}
      </p>

      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-strong">
          What’s Included
        </h4>
        <ul className="mt-3 space-y-2 text-sm text-foreground/85">
          {service.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                aria-hidden
                className="mt-[0.45rem] inline-block h-1.5 w-1.5 rounded-full bg-brand"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 rounded-2xl bg-muted px-4 py-3 text-sm leading-6 text-foreground/85">
        <span className="font-semibold text-brand-strong">Ideal for:</span>{" "}
        {service.idealFor}
      </p>
    </article>
  );
}
