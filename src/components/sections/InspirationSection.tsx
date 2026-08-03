import { InspirationCarousel } from "@/components/inspiration/InspirationCarousel";
import { inspirationItems } from "@/data/inspiration-items";

export function InspirationSection() {
  return (
    <section
      id="inspiration"
      className="fluid-section"
      aria-labelledby="inspiration-title"
      data-choreo
    >
      <div className="max-w-4xl" data-choreo-item data-choreo-delay="90">
        <p className="jov-kicker bg-muted text-brand-deep">Inspiration</p>
        <h2 id="inspiration-title" className="jov-heading mt-4 text-foreground">
          inspiration from moments we’ve already transformed.
        </h2>
        <p className="jov-subcopy mt-4 text-foreground/82">
          Browse the events we’ve styled for a variety of occasions.
        </p>
      </div>

      <InspirationCarousel items={inspirationItems} />
    </section>
  );
}
