import { GrabGoBouquetCard } from "@/components/grabgobouquets/GrabGoBouquetCard";
import { packageTiers } from "@/data/grab-go-bouquets";

export function GrabGoBouquetsSection() {
  return (
    <section
      id="grab-go-bouquets"
      className="fluid-section bg-muted"
      aria-labelledby="grab-go-bouquets-title"
      data-choreo
    >
      <div className="max-w-4xl" data-choreo-item data-choreo-delay="90">
        <p className="jov-kicker bg-muted text-brand-deep">grab &apos;n go</p>
        <h2
          id="grab-go-bouquets-title"
          className="jov-heading mt-4 text-foreground"
        >
          bouquets, beautifully styled.
        </h2>
        <p className="jov-subcopy mt-4 text-foreground/82">
          Surprisingly impactful with zero fuss.
        </p>
      </div>

      <div
        className="fluid-scroll-row mt-10 flex items-start gap-6 overflow-x-auto pb-6 sm:gap-8 md:grid md:grid-cols-3 md:overflow-x-visible"
        data-choreo-item
        data-choreo-delay="280"
      >
        {packageTiers.map((tier, index) => (
          <GrabGoBouquetCard key={tier.id} tier={tier} index={index} />
        ))}
      </div>
    </section>
  );
}
