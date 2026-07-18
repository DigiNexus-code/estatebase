import Link from "next/link";
import DashboardTopbar from "@/components/DashboardTopbar";
import { getDashboardStats, getAllProperties, getLeads } from "@/lib/data";

export default async function DashboardOverview() {
  const [dashboardStats, properties, leads] = await Promise.all([
    getDashboardStats(),
    getAllProperties(),
    getLeads(),
  ]);

  const stats = [
    { label: "Active Listings", value: dashboardStats.activeListings, hint: "+2 this week" },
    { label: "Total Views", value: dashboardStats.totalViews.toLocaleString(), hint: "+312 this week" },
    { label: "New Leads", value: dashboardStats.newLeads, hint: "Needs response" },
    { label: "Closed This Month", value: dashboardStats.dealsClosedThisMonth, hint: "Sold or rented" },
  ];

  const recentLeads = leads.slice(0, 4);
  const topProperties = [...properties].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div>
      <DashboardTopbar
        title="Overview"
        subtitle="Here's how your listings are performing today."
        action={
          <Link href="/dashboard/properties/new" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
            + Add Property
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-white p-5">
            <p className="font-mono text-xs uppercase tracking-wide text-ink/40">{s.label}</p>
            <p className="mt-2 font-display text-3xl text-ink">{s.value}</p>
            <p className="mt-1 text-xs text-primary-dark">{s.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Top performing listings</h2>
            <Link href="/dashboard/properties" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink/40">
                <th className="pb-3 font-normal">Property</th>
                <th className="pb-3 font-normal">Status</th>
                <th className="pb-3 font-normal">Views</th>
                <th className="pb-3 font-normal">Leads</th>
              </tr>
            </thead>
            <tbody>
              {topProperties.map((p) => (
                <tr key={p.id} className="border-t border-line">
                  <td className="py-3 pr-4 text-ink">{p.title}</td>
                  <td className="py-3 pr-4 capitalize text-ink/60">{p.status}</td>
                  <td className="py-3 pr-4 font-mono text-ink/70">{p.views}</td>
                  <td className="py-3 font-mono text-ink/70">{p.leads}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Recent leads</h2>
            <Link href="/dashboard/leads" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="mt-4 space-y-4">
            {recentLeads.map((l) => (
              <div key={l.id} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-ink">{l.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase ${
                    l.status === "new" ? "bg-brass/15 text-brass-dark" : l.status === "contacted" ? "bg-primary-light text-primary-dark" : "bg-line text-ink/50"
                  }`}>{l.status}</span>
                </div>
                <p className="mt-1 text-xs text-ink/50">{l.propertyTitle}</p>
                <p className="mt-1 text-sm text-ink/70">{l.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
