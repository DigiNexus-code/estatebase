import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { agencyProfile } from "@/lib/mock-data";
import { getFeaturedProperties, getDashboardStats } from "@/lib/data";
import Link from "next/link";

const categories = [
  { type: "house", label: "Residential", desc: "Houses & Villas", path: "/listings?type=house" },
  { type: "plot", label: "Land", desc: "Plots & Ground", path: "/listings?type=plot" },
  { type: "commercial", label: "Commercial", desc: "Offices & Shops", path: "/listings?type=commercial" },
  { type: "apartment", label: "Rentals", desc: "Apartments", path: "/listings?type=apartment" },
];

export default async function Home() {
  const [featured, dashboardStats] = await Promise.all([getFeaturedProperties(), getDashboardStats()]);

  return (
    <>
      <Navbar />

      {/* Hero Section - Minimalist Premium */}
      <section className="bg-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <div className="mb-6 inline-block">
              <span className="deed-stamp">Verified Since {2024 - agencyProfile.yearsActive}</span>
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-bold leading-tight text-black mb-8 max-w-4xl">
              Premium properties verified
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl font-light leading-relaxed">
              Every listing is personally inspected by our team. We believe in transparency and trust. Browse {agencyProfile.areasCovered.length} areas across {agencyProfile.city}.
            </p>
          </div>

          <div className="mb-16">
            <SearchBar />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 border-t border-gray-200 pt-12">
            {[
              { label: "Active Listings", value: dashboardStats.activeListings },
              { label: "Years in Market", value: `${agencyProfile.yearsActive}+` },
              { label: "Areas Covered", value: agencyProfile.areasCovered.length },
              { label: "Verified", value: "100%" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-bold text-black mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-3">What you are looking for</p>
            <h2 className="text-5xl sm:text-6xl font-serif font-bold text-black">Browse by type</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.type}
                href={category.path}
                className="group relative bg-white border border-gray-200 p-8 hover:border-gray-400 transition-all duration-300 overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-black mb-1">{category.label}</h3>
                  <p className="text-sm text-gray-600 mb-6">{category.desc}</p>
                  <div className="flex items-center text-gray-900 font-medium text-sm group-hover:gap-2 transition-all duration-300">
                    Explore
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-amber-50/0 to-amber-50/0 group-hover:to-amber-50/30 transition-all duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-3">Current Selection</p>
              <h2 className="text-5xl sm:text-6xl font-serif font-bold text-black">Featured listings</h2>
            </div>
            <Link href="/listings" className="inline-flex items-center text-gray-900 font-medium hover:gap-2 transition-all duration-300 whitespace-nowrap">
              View all properties
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="border border-gray-200 bg-gray-50 p-16 text-center">
              <p className="text-gray-600">Loading featured properties...</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-3">Our Difference</p>
            <h2 className="text-5xl sm:text-6xl font-serif font-bold text-black">Why {agencyProfile.name}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
            {[
              { 
                title: "Every listing verified", 
                desc: "Our team personally visits and inspects each property. We verify ownership, documentation, and condition before listing." 
              },
              { 
                title: "Transparent pricing", 
                desc: "Market-tested valuations. No hidden fees. We help you understand exactly what you're paying for." 
              },
              { 
                title: "Direct access", 
                desc: "Connected directly with your dedicated agent. No call centers, no delays. Real conversations." 
              },
              { 
                title: "Legal certainty", 
                desc: "Complete document verification. Transfer papers reviewed. Ownership confirmed. Peace of mind guaranteed." 
              },
            ].map((item, idx) => (
              <div key={idx} className="pb-8 border-b border-gray-200 last:border-b-0">
                <h3 className="text-lg font-bold text-black mb-3">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-3">Service Areas</p>
          <h2 className="text-5xl sm:text-6xl font-serif font-bold text-black mb-12">Areas we operate in</h2>

          <div className="flex flex-wrap gap-3">
            {agencyProfile.areasCovered.map((area) => (
              <span key={area} className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-900 border border-gray-300 text-sm font-medium">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-mono mb-4">Ready to get started</p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">List your property</h2>
          <p className="text-lg text-gray-300 mb-12 leading-relaxed">
            Join {agencyProfile.yearsActive}+ years of trusted service. Submit your property and we'll handle the rest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/properties/new"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold hover:bg-gray-100 transition-colors"
            >
              Start Listing
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold hover:bg-white/5 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-3">What clients say</p>
            <h2 className="text-5xl sm:text-6xl font-serif font-bold text-black">Trusted by many</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ahmed Hassan", role: "Property Buyer", text: "Found exactly what I was looking for. Their verification process was thorough and transparent." },
              { name: "Fatima Khan", role: "Investor", text: "Professional, reliable, and trustworthy. Have done multiple transactions with complete confidence." },
              { name: "Zeeshan Malik", role: "Seller", text: "Smooth process from start to finish. Sold at fair market price without any complications." },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white border border-gray-200 p-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-500">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-black">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
