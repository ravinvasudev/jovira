import { PackageCard } from "@/components/eventstyling/EventStylingCard";
import { eventStylingTiers } from "@/data/event-styling-tiers";

export function EventStylingSection() {
  return (
    <section
      id="event-styling"
      className="fluid-section"
      aria-labelledby="event-styling-title"
      data-choreo
    >
      <div className="max-w-4xl" data-choreo-item data-choreo-delay="90">
        <p className="jov-kicker bg-muted text-brand-deep">event styling</p>
        <h2
          id="event-styling-title"
          className="jov-heading mt-4 text-foreground"
        >
          be a guest at your own party.
        </h2>

        <p className="jov-subcopy mt-4 text-foreground/82">
          Full-service styling, entrance to photo wall.
        </p>
      </div>

      <div
        className="fluid-scroll-row mt-10 flex items-start gap-6 overflow-x-auto pb-6 sm:gap-8 md:grid md:grid-cols-3 md:overflow-x-visible"
        data-choreo-item
        data-choreo-delay="280"
      >
        {eventStylingTiers.map((tier, index) => (
          <PackageCard key={tier.id} tier={tier} index={index} />
        ))}
      </div>
    </section>
  );
}
