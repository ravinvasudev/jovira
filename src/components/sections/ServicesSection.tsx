import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="fluid-section bg-muted"
      aria-labelledby="services-title"
      data-choreo
    >
      <div className="max-w-4xl" data-choreo-item data-choreo-delay="90">
        <p className="jov-kicker bg-muted text-brand-deep">what we do</p>
        <h2 id="services-title" className="jov-heading mt-4 text-foreground">
          services that make your event feel effortless and memorable.
        </h2>
        <p className="jov-subcopy mt-4 text-foreground/82">
          Every service starts with consultation and thoughtful planning, then
          moves into elegant styling that transforms your space into a
          celebration you can enjoy.
        </p>
      </div>

      <div
        className="fluid-scroll-row mt-10 flex items-start gap-6 overflow-x-auto pb-6 sm:gap-8 md:grid md:grid-cols-3 md:overflow-x-visible"
        data-choreo-item
        data-choreo-delay="280"
      >
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
