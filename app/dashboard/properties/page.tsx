"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardTopbar from "@/components/DashboardTopbar";
import { updatePropertyStatus } from "@/lib/api-client";

const statusStyles: Record<string, string> = {
  active: "bg-primary-light text-primary-dark",
  pending: "bg-brass/15 text-brass-dark",
  sold: "bg-line text-ink/50",
  rented: "bg-line text-ink/50",
  draft: "bg-line text-ink/40",
};

interface Property {
  id: string;
  title: string;
  area: string;
  city: string;
  coverImage: string;
  type: string;
  priceLabel: string;
  status: string;
  views: number;
  leads: number;
}

export default function PropertiesManager() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties");
        const data = await response.json();
        setProperties(data.data || []);
        setFilteredProperties(data.data || []);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter((p) => p.status.toLowerCase() === filter.toLowerCase()));
    }
  }, [filter, properties]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await updatePropertyStatus(id, newStatus as any);
      setProperties(properties.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

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
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              filter === f ? "border-ink bg-ink text-paper border" : "border border-line text-ink/60 hover:border-ink/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-2xl border border-line bg-white p-8 text-center text-ink/40">Loading properties...</div>
      ) : filteredProperties.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-8 text-center text-ink/40">No properties found</div>
      ) : (
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
                <th className="px-5 py-3 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((p) => (
                <tr key={p.id} className="border-t border-line hover:bg-paper/50 transition">
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
                    <div className="flex gap-1 flex-wrap">
                      {["active", "pending", "sold", "rented"].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(p.id, status)}
                          disabled={updatingId === p.id}
                          className={`rounded-full px-2 py-1 text-xs font-medium capitalize transition ${
                            p.status === status
                              ? "bg-ink text-paper"
                              : "bg-line text-ink/40 hover:text-ink/60"
                          } ${updatingId === p.id ? "opacity-50" : ""}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
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
      )}
    </div>
  );
}
