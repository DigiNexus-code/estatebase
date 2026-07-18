"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [purpose, setPurpose] = useState("sale");
  const [type, setType] = useState("");
  const [area, setArea] = useState("");

  const onSearch = () => {
    const params = new URLSearchParams();
    if (purpose) params.set("purpose", purpose);
    if (type) params.set("type", type);
    if (area) params.set("area", area);
    router.push(`/listings?${params.toString()}`);
  };

  const selectClass =
    "w-full appearance-none rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-primary";

  return (
    <div className="rounded-2xl border border-line bg-white p-3 shadow-xl shadow-ink/5">
      <div className="mb-3 flex gap-1 rounded-lg bg-paper p-1">
        {[
          { id: "sale", label: "Buy" },
          { id: "rent", label: "Rent" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setPurpose(t.id)}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
              purpose === t.id ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <select className={selectClass} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Any type</option>
          <option value="house">House</option>
          <option value="plot">Plot / Land</option>
          <option value="commercial">Commercial</option>
          <option value="apartment">Apartment</option>
        </select>
        <select className={selectClass} value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="">Any location</option>
          <option value="DHA Phase 6">DHA Lahore</option>
          <option value="Bahria Town">Bahria Town</option>
          <option value="Johar Town">Johar Town</option>
          <option value="Gulberg">Gulberg</option>
          <option value="Valencia">Valencia</option>
          <option value="Raiwind Road">Raiwind Road</option>
        </select>
        <button
          onClick={onSearch}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Search Properties
        </button>
      </div>
    </div>
  );
}
