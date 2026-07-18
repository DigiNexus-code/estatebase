"use client";

import { useState, useEffect } from "react";
import DashboardTopbar from "@/components/DashboardTopbar";
import { updateLeadStatus } from "@/lib/api-client";

const statusStyles: Record<string, string> = {
  new: "bg-brass/15 text-brass-dark",
  contacted: "bg-primary-light text-primary-dark",
  closed: "bg-line text-ink/50",
};

interface Lead {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: string;
  property?: {
    title: string;
  };
  createdAt: string;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/leads");
        const data = await response.json();
        setLeads(data.data || []);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  useEffect(() => {
    let filtered = leads;
    
    if (filter !== "All") {
      filtered = filtered.filter((l) => l.status.toLowerCase() === filter.toLowerCase());
    }
    
    if (searchTerm) {
      filtered = filtered.filter((l) => 
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.phone.includes(searchTerm)
      );
    }
    
    setFilteredLeads(filtered);
  }, [filter, leads, searchTerm]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await updateLeadStatus(id, newStatus as any);
      setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    } catch (error) {
      console.error("Failed to update lead status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div>
      <DashboardTopbar 
        title="Leads" 
        subtitle={`${newCount} new inquiries waiting on a response`}
      />

      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-lg border border-line bg-white px-3 py-2 text-sm placeholder:text-ink/30 focus:border-primary"
        />
        <div className="flex flex-wrap gap-2">
          {["All", "New", "Contacted", "Closed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f === "All" ? "All" : f.toLowerCase())}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                (f === "All" && filter === "All") || filter === f.toLowerCase()
                  ? "border border-ink bg-ink text-paper"
                  : "border border-line text-ink/60 hover:border-ink/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-line bg-white p-8 text-center text-ink/40">Loading leads...</div>
      ) : filteredLeads.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-8 text-center text-ink/40">No leads found</div>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map((l) => (
            <div key={l.id} className="rounded-2xl border border-line bg-white p-5 hover:border-ink/20 transition">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-base text-ink">{l.name}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase ${statusStyles[l.status]}`}>
                      {l.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-ink/40">
                    {l.property?.title || "Property unknown"} · {l.createdAt}
                  </p>
                </div>
                <div className="flex gap-2 text-sm">
                  <a href={`tel:${l.phone}`} className="rounded-full border border-line px-3 py-1.5 text-ink/60 hover:border-ink/40">Call</a>
                  <a href={`https://wa.me/${l.phone.replace(/[^0-9]/g, "")}`} className="rounded-full bg-primary px-3 py-1.5 text-white hover:bg-primary-dark">WhatsApp</a>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink/70">{l.message}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {["new", "contacted", "closed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(l.id, s)}
                    disabled={updatingId === l.id}
                    className={`rounded-full border px-3 py-1 text-xs capitalize transition ${
                      l.status === s
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-ink/50 hover:text-ink/70"
                    } ${updatingId === l.id ? "opacity-50" : ""}`}
                  >
                    {updatingId === l.id ? "..." : `Mark ${s}`}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
