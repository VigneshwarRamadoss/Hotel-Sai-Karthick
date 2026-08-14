import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ExternalAction, Placeholder, SectionHeading } from "@/components/ui-kit";
import { Reveal } from "@/components/motion";
import { branches } from "@/data/site";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Locations"
        title="Find a Hotel Sai Karthik near you"
        intro="We currently operate two branches in Tamil Nadu, both serving the exact same menu with the exact same kitchen standards."
      />
      
      <section className="section-pad bg-background">
        <div className="shell">
          <SectionHeading
            eyebrow="Our Branches"
            title="Visit us in Pattukkottai and Trichy"
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            {branches.map((b, i) => (
              <Reveal key={b.slug} delay={i * 100}>
                <article className="flex flex-col h-full rounded-sm border border-border bg-card shadow-lift overflow-hidden">
                  <div className="h-48 bg-muted flex items-center justify-center border-b border-border">
                     {/* Map Placeholder */}
                     <div className="flex flex-col items-center text-muted-foreground gap-2">
                       <MapPin className="size-8 opacity-50" />
                       <span className="text-sm font-semibold uppercase tracking-wider">Map Embed Placeholder</span>
                     </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl text-primary">{b.name}</h3>
                    <address className="mt-4 space-y-1 text-sm not-italic text-muted-foreground">
                      {b.addressLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </address>
                    <div className="mt-6 space-y-3 flex-1">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-gold">Hours</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {b.hours.map((h) => (
                          <li key={h.label} className="flex items-center gap-2">
                            <Clock className="size-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                            <span className="font-semibold text-primary">{h.label}:</span>
                            <Placeholder>hours pending</Placeholder>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-border">
                      <ExternalAction
                        href={b.phone ? `tel:${b.phone}` : null}
                        pendingLabel="Phone number to be confirmed"
                      >
                        <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
                        Call {b.city}
                      </ExternalAction>
                      <ExternalAction
                        href={b.directionsUrl}
                        variant="outline"
                        pendingLabel="Map link to be confirmed"
                      >
                        <MapPin className="size-4" strokeWidth={1.5} aria-hidden="true" />
                        Get Directions
                      </ExternalAction>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
