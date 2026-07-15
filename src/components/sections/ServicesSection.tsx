import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="fluid-section"
      aria-labelledby="services-title"
    >
      <div className="max-w-4xl">
        <h2
          id="services-title"
          className="text-[clamp(1.9rem,4.2vw,3.4rem)] font-semibold tracking-tight text-foreground"
        >
          Services Designed Around Your Celebration
        </h2>
        <p className="mt-3 text-[clamp(1rem,2vw,1.2rem)] leading-8 text-foreground/82">
          Every service starts with consultation and thoughtful planning, then
          moves into elegant styling that transforms your customer-provided
          venue with confidence and care.
        </p>
      </div>

      <div className="fluid-scroll-row mt-9 flex gap-5 overflow-x-auto pb-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
