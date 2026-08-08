import { PackageCard } from "@/components/ballooninstallation/BalloonInstallationCard";
import { balloonInstallationTiers } from "@/data/balloon-installation-tiers";

export function BalloonInstallationSection() {
  return (
    <section
      id="balloon-installation"
      className="fluid-section bg-muted"
      aria-labelledby="balloon-installation-title"
      data-choreo
    >
      <div className="max-w-4xl" data-choreo-item data-choreo-delay="90">
        <p className="jov-kicker bg-muted text-brand-deep">
          balloon installation
        </p>
        <h2
          id="balloon-installation-title"
          className="jov-heading mt-4 text-foreground"
        >
          it&apos;s the details they remember.
        </h2>
        <p className="jov-subcopy mt-4 text-foreground/82">
          Same obsession with the finish. Only the scale changes.
        </p>
      </div>

      <div
        className="fluid-scroll-row mt-10 flex items-start gap-6 overflow-x-auto pb-6 sm:gap-8 md:grid md:grid-cols-3 md:overflow-x-visible"
        data-choreo-item
        data-choreo-delay="280"
      >
        {balloonInstallationTiers.map((tier, index) => (
          <PackageCard key={tier.id} tier={tier} index={index} />
        ))}
      </div>
    </section>
  );
}
