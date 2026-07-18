import DashboardTopbar from "@/components/DashboardTopbar";
import { getAllProperties, getLeads } from "@/lib/data";

const weeklyViews = [120, 180, 150, 240, 310, 275, 340];
const maxView = Math.max(...weeklyViews);
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const leadSources = [
  { source: "Direct site search", pct: 46 },
  { source: "WhatsApp inquiries", pct: 31 },
  { source: "Referral / repeat client", pct: 15 },
  { source: "Phone call", pct: 8 },
];

export default async function Analytics() {
  const [properties, leads] = await Promise.all([getAllProperties(), getLeads()]);
  const topByViews = [...properties].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div>
      <DashboardTopbar title="Analytics" subtitle="Views, leads, and where your inquiries are coming from." />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-lg text-ink">Views this week</h2>
          <div className="mt-6 flex h-40 items-end gap-3">
            {weeklyViews.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-primary/80" style={{ height: `${(v / maxView) * 100}%` }} />
                <span className="text-xs text-ink/40">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-lg text-ink">Lead sources</h2>
          <div className="mt-6 space-y-4">
            {leadSources.map((s) => (
              <div key={s.source}>
                <div className="flex justify-between text-sm text-ink/60">
                  <span>{s.source}</span>
                  <span className="font-mono">{s.pct}%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-line">
                  <div className="h-2 rounded-full bg-brass" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-white p-6">
        <h2 className="font-display text-lg text-ink">Top listings by views</h2>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-ink/40">
              <th className="pb-2 font-normal">Property</th>
              <th className="pb-2 font-normal">Views</th>
              <th className="pb-2 font-normal">Leads</th>
              <th className="pb-2 font-normal">Conversion</th>
            </tr>
          </thead>
          <tbody>
            {topByViews.map((p) => (
              <tr key={p.id} className="border-t border-line">
                <td className="py-3 pr-4 text-ink">{p.title}</td>
                <td className="py-3 pr-4 font-mono text-ink/70">{p.views}</td>
                <td className="py-3 pr-4 font-mono text-ink/70">{p.leads}</td>
                <td className="py-3 font-mono text-primary-dark">{((p.leads / p.views) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-ink/40">{leads.length} total leads tracked across all listings.</p>
      </div>
    </div>
  );
}
