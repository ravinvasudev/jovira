import { GrabGoPartyReadyCard } from "@/components/grabgopartyready/GrabGoPartyReadyCard";
import { grabGoPartyReadyTiers } from "@/data/grab-go-partyready";

export function GrabGoPartyReadySection() {
  return (
    <section
      id="grab-go-partyready"
      className="fluid-section"
      aria-labelledby="grab-go-partyready-title"
      data-choreo
    >
      <div className="max-w-4xl" data-choreo-item data-choreo-delay="90">
        <p className="jov-kicker bg-muted text-brand-deep">grab &apos;n go</p>
        <h2
          id="grab-go-partyready-title"
          className="jov-heading mt-4 text-foreground"
        >
          party-ready, artistic details.
        </h2>
        <p className="jov-subcopy mt-4 text-foreground/82">
          Fast styling with a polished finish.
        </p>
      </div>

      <div
        className="fluid-scroll-row mt-10 flex items-start gap-6 overflow-x-auto pb-6 sm:gap-8 md:grid md:grid-cols-3 md:overflow-x-visible"
        data-choreo-item
        data-choreo-delay="280"
      >
        {grabGoPartyReadyTiers.map((tier, index) => (
          <GrabGoPartyReadyCard key={tier.id} tier={tier} index={index} />
        ))}
      </div>
    </section>
  );
}
