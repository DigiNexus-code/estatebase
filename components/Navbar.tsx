import Link from "next/link";
import { agencyProfile } from "@/lib/mock-data";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-display text-sm font-semibold text-white">
            {agencyProfile.logoInitials}
          </span>
          <span className="font-display text-lg font-semibold text-ink">{agencyProfile.name}</span>
        </Link>
        <nav className="hidden items-center gap-8 font-body text-sm text-ink/70 md:flex">
          <Link href="/listings?purpose=sale" className="hover:text-ink">Buy</Link>
          <Link href="/listings?purpose=rent" className="hover:text-ink">Rent</Link>
          <Link href="/listings?type=commercial" className="hover:text-ink">Commercial</Link>
          <Link href="/listings?type=plot" className="hover:text-ink">Plots &amp; Land</Link>
          <Link href="#areas" className="hover:text-ink">Areas</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="hidden text-sm font-medium text-ink/70 hover:text-ink sm:block">
            Agency Login
          </Link>
          <Link
            href="/dashboard/properties/new"
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:bg-primary-dark"
          >
            List a Property
          </Link>
        </div>
      </div>
    </header>
  );
}
