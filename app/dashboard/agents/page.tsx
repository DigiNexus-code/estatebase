import DashboardTopbar from "@/components/DashboardTopbar";
import { agents } from "@/lib/mock-data";

export default function Agents() {
  return (
    <div>
      <DashboardTopbar
        title="Team"
        subtitle={`${agents.length} members with dashboard access`}
        action={<button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">+ Invite Agent</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => (
          <div key={a.id} className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-display text-sm text-paper">{a.avatar}</span>
              <div>
                <p className="font-display text-base text-ink">{a.name}</p>
                <p className="text-xs capitalize text-ink/40">{a.role}</p>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-sm text-ink/60">
              <p>{a.phone}</p>
              <p>{a.email}</p>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="font-mono text-sm text-ink/70">{a.listingsCount} listings</span>
              <button className="text-sm text-primary hover:underline">Manage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
