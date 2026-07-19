import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { agencyProfile } from "@/lib/mock-data";
import { getFeaturedProperties, getDashboardStats } from "@/lib/data";
import Link from "next/link";

const categories = [
  { type: "house", label: "Houses", desc: "Independent homes & farmhouses", icon: "🏡" },
  { type: "plot", label: "Plots & Land", desc: "Residential & agricultural plots", icon: "🏗️" },
  { type: "commercial", label: "Commercial", desc: "Shops, offices & plazas", icon: "🏢" },
  { type: "apartment", label: "Rentals", desc: "Apartments & rental units", icon: "🏢" },
];

export default async function Home() {
  const [featured, dashboardStats] = await Promise.all([getFeaturedProperties(), getDashboardStats()]);

  return (
    <>
      <Navbar />

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-24 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 inline-block">
            <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-200 backdrop-blur-sm border border-blue-400/20">
              ✓ Verified Properties Since {2024 - agencyProfile.yearsActive}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6">
            Discover Premium Properties in {agencyProfile.city}
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl">
            {agencyProfile.name} curates verified listings across the city's most desirable locations. Every property is personally verified by our expert team.
          </p>

          <div className="grid gap-6 md:gap-8">
            <SearchBar />
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { label: "Active Listings", value: dashboardStats.activeListings },
                { label: "Years Experience", value: `${agencyProfile.yearsActive}+` },
                { label: "Areas Covered", value: agencyProfile.areasCovered.length },
                { label: "Satisfied Clients", value: "500+" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4">
                  <dt className="text-sm font-medium text-slate-400">{s.label}</dt>
                  <dd className="mt-2 text-3xl sm:text-4xl font-bold text-white">{s.value}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Browse Properties</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">What are you looking for?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <Link
              key={c.type}
              href={`/listings?type=${c.type}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 p-8 transition hover:shadow-xl hover:border-blue-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative">
                <span className="text-5xl mb-4 block">{c.icon}</span>
                <p className="font-bold text-xl text-slate-900 mb-2">{c.label}</p>
                <p className="text-sm text-slate-600">{c.desc}</p>
                <div className="mt-4 inline-flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition">
                  Browse <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Handpicked Selection</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">Featured Properties</h2>
          </div>
          <Link href="/listings" className="mt-6 sm:mt-0 inline-flex items-center text-blue-600 font-semibold hover:gap-2 transition">
            View All <span className="ml-2">→</span>
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
            <p className="text-slate-600">Properties loading...</p>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">About Us</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">Why choose {agencyProfile.name}?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "✓", title: "Verified Properties", desc: "Every listing personally inspected by our expert team" },
              { icon: "📋", title: "Document Verified", desc: "Complete ownership and legal documentation checked" },
              { icon: "🎯", title: "Perfect Match", desc: "We find what fits your needs, not just what's available" },
              { icon: "👥", title: "Direct Agent Access", desc: "Talk directly with your dedicated agent anytime" },
            ].map((feature, idx) => (
              <div key={idx} className="rounded-xl bg-white border border-slate-200 p-8 hover:shadow-lg transition">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Our Coverage</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-12">Areas we serve</h2>

        <div className="flex flex-wrap gap-3">
          {agencyProfile.areasCovered.map((area) => (
            <span key={area} className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 border border-blue-200">
              {area}
            </span>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-4">Get Listed Today</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">List Your Property — For Free</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of satisfied property owners. We'll list, market, and manage inquiries for your property.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/properties/new"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              List Your Property
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
            >
              Dashboard Login
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2 text-center">Client Stories</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-12 text-center">Loved by property seekers</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Ahmed Hassan", role: "Property Buyer", quote: "Found my dream home within days. The verification process gave me complete peace of mind." },
            { name: "Fatima Khan", role: "Real Estate Investor", quote: "Professional team, honest dealings. They helped me build a strong investment portfolio." },
            { name: "Zeeshan Malik", role: "Property Owner", quote: "Listing was effortless. Sold my property at the right price without any hassle." },
          ].map((testimonial, idx) => (
            <div key={idx} className="rounded-xl bg-slate-50 border border-slate-200 p-8 hover:shadow-lg transition">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-slate-700 mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-bold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
