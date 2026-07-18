import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <Sidebar />
      <main className="px-6 py-8 lg:ml-60 lg:px-10">{children}</main>
    </div>
  );
}
