import { agencyProfile } from "@/lib/mock-data";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold text-paper">{agencyProfile.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-paper/60">{agencyProfile.tagline}</p>
          <p className="mt-4 text-sm text-paper/60">📍 {agencyProfile.address}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-brass">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/70">
            <li>Buy Property</li>
            <li>Rent Property</li>
            <li>Commercial</li>
            <li>Plots &amp; Land</li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-brass">Areas Covered</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/70">
            {agencyProfile.areasCovered.slice(0, 4).map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-brass">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/70">
            <li>{agencyProfile.phone}</li>
            <li>{agencyProfile.email}</li>
            <li>Mon–Sat: 9am–8pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-paper/40">
        © 2026 {agencyProfile.name}. Built on EstateBase — prototype for review.
      </div>
    </footer>
  );
}
