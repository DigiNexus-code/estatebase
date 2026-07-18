import DashboardTopbar from "@/components/DashboardTopbar";
import { getLeads } from "@/lib/data";

const statusStyles: Record<string, string> = {
  new: "bg-brass/15 text-brass-dark",
  contacted: "bg-primary-light text-primary-dark",
  closed: "bg-line text-ink/50",
};

export default async function Leads() {
  const leads = await getLeads();
  return (
    <div>
      <DashboardTopbar title="Leads" subtitle={`${leads.filter(l => l.status === "new").length} new inquiries waiting on a response`} />

      <div className="space-y-3">
        {leads.map((l) => (
          <div key={l.id} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-display text-base text-ink">{l.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase ${statusStyles[l.status]}`}>{l.status}</span>
                </div>
                <p className="mt-0.5 text-xs text-ink/40">on {l.propertyTitle} · {l.createdAt}</p>
              </div>
              <div className="flex gap-2 text-sm">
                <a href={`tel:${l.phone}`} className="rounded-full border border-line px-3 py-1.5 text-ink/60 hover:border-ink/40">Call</a>
                <a href={`https://wa.me/${l.phone.replace(/[^0-9]/g, "")}`} className="rounded-full bg-primary px-3 py-1.5 text-white hover:bg-primary-dark">WhatsApp</a>
              </div>
            </div>
            <p className="mt-3 text-sm text-ink/70">{l.message}</p>
            <div className="mt-3 flex gap-2">
              {["new", "contacted", "closed"].map((s) => (
                <button key={s} className={`rounded-full border px-3 py-1 text-xs capitalize ${l.status === s ? "border-ink bg-ink text-paper" : "border-line text-ink/50"}`}>
                  Mark {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
