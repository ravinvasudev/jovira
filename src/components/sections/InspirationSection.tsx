import { InspirationCard } from "@/components/inspiration/InspirationCard";
import { inspirationItems } from "@/data/inspiration-items";

export function InspirationSection() {
  return (
    <section
      id="inspiration"
      className="fluid-section"
      aria-labelledby="inspiration-title"
    >
      <div className="max-w-4xl">
        <h2
          id="inspiration-title"
          className="text-[clamp(1.9rem,4.2vw,3.4rem)] font-semibold tracking-tight text-foreground"
        >
          Inspiration from Past Celebrations
        </h2>
        <p className="mt-3 text-[clamp(1rem,2vw,1.2rem)] leading-8 text-foreground/82 sm:text-lg">
          Explore décor concepts we’ve styled for birthdays, graduations, and
          seasonal milestones. Every design is tailored to transform a
          customer-provided venue with warmth and elegance.
        </p>
      </div>

      <div className="mt-10 columns-1 gap-6 md:columns-2">
        {inspirationItems.map((item) => (
          <InspirationCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
