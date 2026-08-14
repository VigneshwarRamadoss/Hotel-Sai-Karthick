import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { KolamDivider, Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/ui-kit";
import interiorImg from "@/assets/interior.jpg";
import coffeeImg from "@/assets/filter-coffee.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our Story"
        title="Tradition treated as craft, not nostalgia"
        intro="Sai Karthik is a tiffin house first. The batter is ground for the morning it is served, the sambar is drumstick sambar, and the coffee decoction is never rushed."
      />
      <section className="section-pad bg-background">
        <div className="shell">
          <KolamDivider className="mb-12" />
          <SectionHeading
            eyebrow="Origins"
            title="A simple philosophy"
            intro="We set out to create an award-winning pure vegetarian dining experience that stays true to its roots. No fusion, no shortcuts."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2 items-center">
            <Reveal delay={100}>
              <img
                src={coffeeImg}
                alt="Filter Coffee pouring"
                className="w-full h-[400px] object-cover rounded-sm shadow-lift"
              />
            </Reveal>
            <Reveal delay={200} className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                From our early days, Hotel Sai Karthik has been committed to the craft of traditional South Indian cooking. The cornerstone of our philosophy is freshness. Every morning begins with grinding fresh batter for our idlis and dosas, preparing the aromatic spice blends for our sambar, and slow-dripping filter coffee to perfection.
              </p>
              <p>
                Our founders believed that an exceptional meal does not require complex modern twists, but rather a profound respect for heritage recipes. Our pure vegetarian kitchens in Pattukkottai and Trichy operate under strict standards to ensure that the flavor you experience today is the exact same flavor you will experience years from now.
              </p>
              <p>
                We do not serve "plain" food. Even our simplest offerings, like a ghee roast, carry the richness of high-quality ingredients and meticulous preparation. It is this dedication that has earned us a place in the hearts of our regular patrons and continues to drive our pursuit of culinary excellence.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
      
      <section className="section-pad bg-ivory">
        <div className="shell">
          <SectionHeading
            eyebrow="The Kitchen"
            title="100% Pure Vegetarian"
            intro="We don't compromise on dietary requirements. Our kitchen is strictly vegetarian, and we clearly mark items containing onion or garlic."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2 items-center">
            <Reveal delay={200} className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Our kitchen policy is absolute. We do not just claim to be vegetarian; we live by it. This means separate preparation areas are not necessary because meat never enters our premises.
              </p>
              <p>
                We also understand the dietary nuances of our guests. For those who abstain from all alliums, our menu clearly denotes dishes containing onion or garlic, allowing you to dine with complete peace of mind. Our Jain-friendly options are prepared with the same level of care and flavor as the rest of our menu.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <img
                src={interiorImg}
                alt="Dining Interior"
                className="w-full h-[400px] object-cover rounded-sm shadow-lift"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
