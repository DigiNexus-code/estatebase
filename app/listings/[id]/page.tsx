import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { getAgentById, agencyProfile } from "@/lib/mock-data";
import { getPropertyById, getAllProperties } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function PropertyDetail({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id);
  if (!property) return notFound();
  const agent = getAgentById(property.agentId);
  const allProperties = await getAllProperties();
  const similar = allProperties.filter((p) => p.type === property.type && p.id !== property.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={property.coverImage} alt={property.title} className="col-span-4 h-80 w-full object-cover sm:col-span-3" />
              <div className="col-span-4 grid grid-cols-3 gap-2 sm:col-span-1 sm:grid-cols-1">
                {property.images.slice(0, 3).map((img, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={img} alt="" className="h-24 w-full object-cover sm:h-[6.25rem]" />
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase font-mono ${property.purpose === "sale" ? "bg-primary text-white" : "bg-brass text-white"}`}>
                {property.purpose === "sale" ? "For Sale" : "For Rent"}
              </span>
              {property.verified && <span className="deed-stamp">✓ Verified by {agencyProfile.name}</span>}
              <span className="rounded-full border border-line px-3 py-1 text-xs capitalize text-ink/60">{property.type}</span>
            </div>

            <h1 className="mt-4 font-display text-3xl text-ink">{property.title}</h1>
            <p className="mt-1 text-ink/50">📍 {property.area}, {property.city}</p>

            <div className="mt-6 flex flex-wrap gap-8 border-y border-line py-5 font-mono text-sm text-ink/70">
              <div><p className="text-xs text-ink/40">SIZE</p><p className="mt-1 text-base text-ink">{property.size} {property.sizeUnit}</p></div>
              {property.beds && (
                <div><p className="text-xs text-ink/40">BEDS / BATHS</p><p className="mt-1 text-base text-ink">{property.beds} / {property.baths}</p></div>
              )}
              <div><p className="text-xs text-ink/40">PRICE</p><p className="mt-1 text-base text-primary-dark">₨ {property.priceLabel}</p></div>
            </div>

            <div className="mt-6">
              <h2 className="font-display text-xl text-ink">Description</h2>
              <p className="mt-2 leading-relaxed text-ink/65">{property.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="font-display text-xl text-ink">Amenities</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <span key={a} className="rounded-full bg-primary-light px-3 py-1.5 text-sm text-primary-dark">{a}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: agent card */}
          <aside className="h-fit rounded-2xl border border-line bg-white p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-ink/40">Listed by</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-display text-sm text-paper">
                {agent?.avatar}
              </span>
              <div>
                <p className="font-display text-base text-ink">{agent?.name}</p>
                <p className="text-xs capitalize text-ink/50">{agent?.role} · {agencyProfile.name}</p>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <a href={`https://wa.me/${agent?.whatsapp}`} className="block rounded-lg bg-primary py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-dark">
                WhatsApp Agent
              </a>
              <a href={`tel:${agent?.phone}`} className="block rounded-lg border border-line py-2.5 text-center text-sm font-medium text-ink hover:border-ink/40">
                Call {agent?.phone}
              </a>
            </div>
            <div className="mt-5 rounded-lg bg-paper p-3 text-xs text-ink/50">
              Always visit the property and verify ownership documents in person before making any payment.
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl text-ink">Similar properties</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
