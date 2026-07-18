import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { getAllProperties } from "@/lib/data";

export default async function Listings({
  searchParams,
}: {
  searchParams: { purpose?: string; type?: string; area?: string };
}) {
  const { purpose, type, area } = searchParams;
  const properties = await getAllProperties();

  const filtered = properties.filter((p) => {
    if (purpose && p.purpose !== purpose) return false;
    if (type && p.type !== type) return false;
    if (area && p.area !== area) return false;
    return true;
  });

  const filterPill = (label: string, active: boolean, href: string) => (
    <a
      href={href}
      className={`rounded-full border px-4 py-1.5 text-sm transition ${
        active ? "border-ink bg-ink text-paper" : "border-line text-ink/60 hover:border-ink/40"
      }`}
    >
      {label}
    </a>
  );

  return (
    <>
      <Navbar />
      <section className="border-b border-line bg-white/60 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-wide text-primary">
            {filtered.length} propert{filtered.length === 1 ? "y" : "ies"} found
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink">Properties for sale &amp; rent</h1>

          <div className="mt-6 flex flex-wrap gap-2">
            {filterPill("All", !purpose, "/listings")}
            {filterPill("For Sale", purpose === "sale", "/listings?purpose=sale")}
            {filterPill("For Rent", purpose === "rent", "/listings?purpose=rent")}
            <span className="mx-1 hidden w-px self-stretch bg-line sm:block" />
            {filterPill("Houses", type === "house", "/listings?type=house")}
            {filterPill("Plots", type === "plot", "/listings?type=plot")}
            {filterPill("Commercial", type === "commercial", "/listings?type=commercial")}
            {filterPill("Apartments", type === "apartment", "/listings?type=apartment")}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line py-20 text-center">
            <p className="font-display text-xl text-ink">No properties match these filters</p>
            <p className="mt-2 text-sm text-ink/50">Try widening your search — remove a filter above.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
