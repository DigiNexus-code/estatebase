"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { agencyProfile } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/client";

const nav = [
  { href: "/dashboard", label: "Overview", icon: "◱" },
  { href: "/dashboard/properties", label: "Properties", icon: "▦" },
  { href: "/dashboard/leads", label: "Leads", icon: "✉" },
  { href: "/dashboard/agents", label: "Team", icon: "◍" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "▲" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-line bg-white lg:flex">
      <div className="flex items-center gap-3 border-b border-line px-6 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-display text-sm font-semibold text-white">
          {agencyProfile.logoInitials}
        </span>
        <div>
          <p className="font-display text-sm font-semibold leading-tight text-ink">{agencyProfile.name}</p>
          <p className="text-xs text-ink/40">Agency Dashboard</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-5">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active ? "bg-primary-light text-primary-dark" : "text-ink/60 hover:bg-paper hover:text-ink"
              }`}
            >
              <span className="w-4 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line p-4 space-y-2">
        <Link href="/" className="block text-xs text-ink/40 hover:text-ink/70">← Back to public site</Link>
        <button onClick={signOut} className="block text-xs text-ink/40 hover:text-clay">Sign out</button>
      </div>
    </aside>
  );
}
