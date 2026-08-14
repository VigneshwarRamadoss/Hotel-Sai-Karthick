import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Reveal, KolamDivider } from "@/components/motion";
import { SectionHeading } from "@/components/ui-kit";

// Using the available images for the gallery
import heroImg from "@/assets/hero-tiffin.jpg";
import coffeeImg from "@/assets/filter-coffee.jpg";
import gheeRoastImg from "@/assets/ghee-roast.jpg";
import pongalImg from "@/assets/pongal.jpg";
import mealsImg from "@/assets/meals.jpg";
import interiorImg from "@/assets/interior.jpg";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

const galleryImages = [
  { src: heroImg, alt: "South Indian tiffin spread on banana leaf", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: gheeRoastImg, alt: "Crispy ghee roast dosa", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: coffeeImg, alt: "Filter coffee being poured", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: pongalImg, alt: "Ghee pongal with vadai", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: interiorImg, alt: "Traditional dining room interior", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { src: mealsImg, full: true, alt: "Full South Indian meals on banana leaf" }
];

function GalleryPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Gallery"
        title="A glimpse into Hotel Sai Karthik"
        intro="Explore our dishes, our dining rooms, and the atmosphere we create every day."
      />

      <section className="section-pad bg-background">
        <div className="shell">
          <KolamDivider className="mb-12" />
          <SectionHeading
            eyebrow="Visuals"
            title="The Sai Karthik Experience"
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4">
            {galleryImages.map((img, i) => (
              img.full ? (
                <Reveal key={i} delay={i * 50} className="col-span-1 md:col-span-3 row-span-2">
                   <div className="w-full h-full overflow-hidden rounded-sm group">
                     <img
                       src={img.src}
                       alt={img.alt}
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                   </div>
                </Reveal>
              ) : (
                <Reveal key={i} delay={i * 50} className={`${img.colSpan} ${img.rowSpan}`}>
                  <div className="w-full h-full overflow-hidden rounded-sm group bg-muted">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </Reveal>
              )
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
