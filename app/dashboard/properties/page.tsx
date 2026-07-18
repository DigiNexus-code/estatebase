import Link from "next/link";
import DashboardTopbar from "@/components/DashboardTopbar";
import { getAllProperties } from "@/lib/data";

const statusStyles: Record<string, string> = {
  active: "bg-primary-light text-primary-dark",
  pending: "bg-brass/15 text-brass-dark",
  sold: "bg-line text-ink/50",
  rented: "bg-line text-ink/50",
  draft: "bg-line text-ink/40",
};

export default async function PropertiesManager() {
  const properties = await getAllProperties();
  return (
    <div>
      <DashboardTopbar
        title="Properties"
        subtitle={`${properties.length} listings total`}
        action={
          <Link href="/dashboard/properties/new" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
            + Add Property
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {["All", "Active", "Pending", "Sold", "Rented", "Draft"].map((f) => (
          <button key={f} className="rounded-full border border-line px-4 py-1.5 text-sm text-ink/60 hover:border-ink/40 first:border-ink first:bg-ink first:text-paper">
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead className="bg-paper text-left text-xs uppercase tracking-wide text-ink/40">
            <tr>
              <th className="px-5 py-3 font-normal">Property</th>
              <th className="px-5 py-3 font-normal">Type</th>
              <th className="px-5 py-3 font-normal">Price</th>
              <th className="px-5 py-3 font-normal">Status</th>
              <th className="px-5 py-3 font-normal">Views</th>
              <th className="px-5 py-3 font-normal">Leads</th>
              <th className="px-5 py-3 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id} className="border-t border-line">
                <td className="flex items-center gap-3 px-5 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.coverImage} alt="" className="h-10 w-14 rounded-md object-cover" />
                  <div>
                    <p className="font-medium text-ink">{p.title}</p>
                    <p className="text-xs text-ink/40">{p.area}, {p.city}</p>
                  </div>
                </td>
                <td className="px-5 py-3 capitalize text-ink/60">{p.type}</td>
                <td className="px-5 py-3 font-mono text-ink/70">₨ {p.priceLabel}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[p.status]}`}>{p.status}</span>
                </td>
                <td className="px-5 py-3 font-mono text-ink/70">{p.views}</td>
                <td className="px-5 py-3 font-mono text-ink/70">{p.leads}</td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/listings/${p.id}`} className="text-sm text-primary hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
