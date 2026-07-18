import { agents } from "@/lib/mock-data";

export default function DashboardTopbar({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  const owner = agents[0];
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink/50">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {action}
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-xs text-paper">
          {owner.avatar}
        </span>
      </div>
    </div>
  );
}
