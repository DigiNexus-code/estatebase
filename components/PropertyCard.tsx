import Link from "next/link";
import { Property } from "@/lib/types";

const sizeLabel = (p: Property) => {
  const unit = { marla: "Marla", kanal: "Kanal", sqft: "sq.ft", acre: "Acre" }[p.sizeUnit];
  return `${p.size} ${unit}`;
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/listings/${property.id}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/5"
    >
      <div className="relative h-52 w-full overflow-hidden bg-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.coverImage}
          alt={property.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide font-mono ${
              property.purpose === "sale" ? "bg-primary text-white" : "bg-brass text-white"
            }`}
          >
            {property.purpose === "sale" ? "For Sale" : "For Rent"}
          </span>
          {property.verified && (
            <span className="deed-stamp bg-white/90">✓ Verified</span>
          )}
        </div>
      </div>
      <div className="space-y-2 p-4">
        <p className="font-display text-lg leading-snug text-ink">{property.title}</p>
        <p className="text-sm text-ink/60">📍 {property.area}, {property.city}</p>
        <div className="flex items-center gap-3 text-xs font-mono text-ink/70">
          <span>{sizeLabel(property)}</span>
          {property.beds && (
            <>
              <span className="text-line">·</span>
              <span>{property.beds} Bed · {property.baths} Bath</span>
            </>
          )}
        </div>
        <p className="font-mono text-lg font-semibold text-primary-dark">
          ₨ {property.priceLabel}
        </p>
      </div>
    </Link>
  );
}
