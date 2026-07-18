import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { agencyProfile } from "@/lib/mock-data";
import { getFeaturedProperties, getDashboardStats } from "@/lib/data";
import Link from "next/link";

const categories = [
  { type: "house", label: "Houses", desc: "Independent homes & farmhouses", icon: "⌂" },
  { type: "plot", label: "Plots & Land", desc: "Residential & agricultural plots", icon: "▦" },
  { type: "commercial", label: "Commercial", desc: "Shops, offices & plazas", icon: "▣" },
  { type: "apartment", label: "Rentals", desc: "Apartments & rental units", icon: "⌘" },
];

export default async function Home() {
  const [featured, dashboardStats] = await Promise.all([getFeaturedProperties(), getDashboardStats()]);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="survey-grid relative border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <span className="deed-stamp mb-6">✓ {agencyProfile.yearsActive}+ Years On Ground · {agencyProfile.city}</span>
          <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
            Find your next home, plot or investment — <span className="italic text-primary">verified before you visit.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink/60">
            {agencyProfile.name} lists houses, plots, commercial units and rentals across {agencyProfile.city} —
            every listing site-visited by our own team before it ever goes live.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SearchBar />
            <dl className="grid grid-cols-2 gap-6 font-mono sm:grid-cols-4 lg:grid-cols-2">
              {[
                { label: "Active Listings", value: dashboardStats.activeListings },
                { label: "Years On Ground", value: `${agencyProfile.yearsActive}+` },
                { label: "Areas Covered", value: agencyProfile.areasCovered.length },
                { label: "Deals Closed", value: "240+" },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="text-xs uppercase tracking-wide text-ink/40">{s.label}</dt>
                  <dd className="mt-1 font-display text-3xl font-medium text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-wide text-primary">Browse by category</p>
        <h2 className="mt-2 font-display text-3xl text-ink">What are you looking for?</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.type}
              href={`/listings?type=${c.type}`}
              className="group rounded-2xl border border-line bg-white p-6 transition hover:border-primary hover:shadow-lg hover:shadow-ink/5"
            >
              <span className="font-display text-3xl text-primary">{c.icon}</span>
              <p className="mt-4 font-display text-lg text-ink">{c.label}</p>
              <p className="mt-1 text-sm text-ink/50">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <section className="border-y border-line bg-white/60 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-primary">Current Inventory</p>
              <h2 className="mt-2 font-display text-3xl text-ink">Featured properties</h2>
            </div>
            <Link href="/listings" className="hidden text-sm font-medium text-primary hover:underline sm:block">
              View all listings →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-wide text-primary">Why {agencyProfile.name}</p>
        <h2 className="mt-2 font-display text-3xl text-ink">Local expertise, straight dealing</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Site-visited listings", d: "Every property is inspected by our team before it's published." },
            { t: "Documents checked first", d: "Ownership and transfer paperwork is verified before any viewing." },
            { t: "No hard sell", d: "We show what fits your budget and needs, not just what's in stock." },
            { t: "Direct agent access", d: "Talk straight to the agent handling your case — no call centre." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-line bg-white p-6">
              <p className="font-display text-lg text-ink">{f.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas */}
      <section id="areas" className="border-t border-line bg-ink py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-wide text-brass">Coverage</p>
          <h2 className="mt-2 font-display text-3xl text-paper">Areas we actively deal in</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {agencyProfile.areasCovered.map((a) => (
              <span key={a} className="rounded-full border border-white/15 px-4 py-2 text-sm text-paper/80">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="font-mono text-xs uppercase tracking-wide text-primary">Selling or renting out?</p>
        <h2 className="mx-auto mt-2 max-w-xl font-display text-3xl text-ink">List your property with us — free.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink/55">
          Send us the details and we'll list it, market it, and handle inquiries for you.
        </p>
        <Link
          href="/dashboard/properties/new"
          className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Get Started
        </Link>
      </section>

      <Footer />
    </>
  );
}
