import DashboardTopbar from "@/components/DashboardTopbar";
import { agencyProfile } from "@/lib/mock-data";

const inputClass = "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-primary";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40";

export default function Settings() {
  return (
    <div>
      <DashboardTopbar title="Settings" subtitle="This is what appears on your public-facing site." />

      <div className="max-w-2xl space-y-6">
        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-lg text-ink">Agency profile</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className={labelClass}>Agency Name</label>
              <input className={inputClass} defaultValue={agencyProfile.name} />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input className={inputClass} defaultValue={agencyProfile.tagline} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City</label>
                <input className={inputClass} defaultValue={agencyProfile.city} />
              </div>
              <div>
                <label className={labelClass}>Years Active</label>
                <input className={inputClass} defaultValue={agencyProfile.yearsActive} type="number" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-lg text-ink">Contact details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className={labelClass}>Phone</label>
              <input className={inputClass} defaultValue={agencyProfile.phone} />
            </div>
            <div>
              <label className={labelClass}>WhatsApp Number</label>
              <input className={inputClass} defaultValue={agencyProfile.whatsapp} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input className={inputClass} defaultValue={agencyProfile.email} />
            </div>
            <div>
              <label className={labelClass}>Office Address</label>
              <input className={inputClass} defaultValue={agencyProfile.address} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-lg text-ink">Areas covered</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {agencyProfile.areasCovered.map((a) => (
              <span key={a} className="flex items-center gap-2 rounded-full bg-primary-light px-3 py-1.5 text-sm text-primary-dark">
                {a} <button className="text-primary-dark/50 hover:text-primary-dark">×</button>
              </span>
            ))}
            <button className="rounded-full border border-dashed border-line px-3 py-1.5 text-sm text-ink/40 hover:border-ink/40">+ Add area</button>
          </div>
        </div>

        <button className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
          Save Changes
        </button>
      </div>
    </div>
  );
}
