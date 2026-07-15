import { PackageCard } from "@/components/packages/PackageCard";
import { packageTiers } from "@/data/package-tiers";

export function PackagesSection() {
  return (
    <section
      id="packages"
      className="fluid-section"
      aria-labelledby="packages-title"
    >
      <div className="max-w-4xl">
        <h2
          id="packages-title"
          className="text-[clamp(1.9rem,4.2vw,3.4rem)] font-semibold tracking-tight text-foreground"
        >
          Package Options for Every Celebration Size
        </h2>
        <p className="mt-3 text-[clamp(1rem,2vw,1.2rem)] leading-8 text-foreground/82 sm:text-lg">
          Choose the level of styling support that fits your event best. Every
          package is designed for customer-provided venues and can be tailored
          through consultation.
        </p>
      </div>

      <div className="fluid-scroll-row mt-9 flex gap-5 overflow-x-auto pb-4">
        {packageTiers.map((tier) => (
          <PackageCard key={tier.id} tier={tier} />
        ))}
      </div>
    </section>
  );
}
