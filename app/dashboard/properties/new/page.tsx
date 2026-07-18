"use client";

import { useState } from "react";
import DashboardTopbar from "@/components/DashboardTopbar";

const steps = ["Basic Info", "Location", "Pricing & Size", "Media & Amenities", "Review"];

const inputClass = "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-primary";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40";

export default function NewProperty() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  if (submitted) {
    return (
      <div>
        <DashboardTopbar title="Add Property" />
        <div className="rounded-2xl border border-line bg-white p-10 text-center">
          <span className="deed-stamp mb-4">✓ Submitted</span>
          <h2 className="font-display text-2xl text-ink">Property sent for review</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink/50">
            It'll appear in your dashboard as "Pending" until it's verified and published to the public site.
          </p>
          <button onClick={() => { setSubmitted(false); setStep(0); }} className="mt-6 rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper">
            Add Another Property
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardTopbar title="Add Property" subtitle="Listings are reviewed and verified before going live." />

      {/* Step indicator */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs ${
              i === step ? "bg-primary text-white" : i < step ? "bg-primary-light text-primary-dark" : "bg-line text-ink/40"
            }`}>
              {i + 1}
            </span>
            <span className={`text-sm ${i === step ? "font-medium text-ink" : "text-ink/40"}`}>{s}</span>
            {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-line" />}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); if (step === steps.length - 1) setSubmitted(true); else next(); }}
        className="max-w-2xl rounded-2xl border border-line bg-white p-8"
      >
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Listing Title</label>
              <input className={inputClass} placeholder="e.g. 1 Kanal Modern House, DHA Phase 6" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Purpose</label>
                <select className={inputClass}><option>For Sale</option><option>For Rent</option></select>
              </div>
              <div>
                <label className={labelClass}>Property Type</label>
                <select className={inputClass}><option>House</option><option>Plot / Land</option><option>Commercial</option><option>Apartment</option></select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea className={inputClass} rows={4} placeholder="Describe the property's condition, layout, and highlights" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City</label>
                <input className={inputClass} placeholder="Lahore" />
              </div>
              <div>
                <label className={labelClass}>Area / Society</label>
                <input className={inputClass} placeholder="DHA Phase 6" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Full Address (optional, shown only to serious inquiries)</label>
              <input className={inputClass} placeholder="Street / plot number" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Price (PKR)</label>
                <input className={inputClass} placeholder="e.g. 45000000" type="number" />
              </div>
              <div>
                <label className={labelClass}>Size</label>
                <div className="flex gap-2">
                  <input className={inputClass} placeholder="1" type="number" />
                  <select className={inputClass}><option>Marla</option><option>Kanal</option><option>Sq.ft</option><option>Acre</option></select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Bedrooms</label>
                <input className={inputClass} placeholder="e.g. 5" type="number" />
              </div>
              <div>
                <label className={labelClass}>Bathrooms</label>
                <input className={inputClass} placeholder="e.g. 6" type="number" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Photos</label>
              <div className="rounded-lg border-2 border-dashed border-line bg-paper p-8 text-center text-sm text-ink/40">
                Drag photos here, or click to upload (JPG/PNG, up to 10 images)
              </div>
            </div>
            <div>
              <label className={labelClass}>Amenities</label>
              <div className="flex flex-wrap gap-2">
                {["Parking", "Backup Generator", "Security", "Servant Quarters", "Basement", "Solar Panels", "Furnished"].map((a) => (
                  <label key={a} className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-ink/60 has-[:checked]:border-primary has-[:checked]:bg-primary-light has-[:checked]:text-primary-dark">
                    <input type="checkbox" className="accent-primary" /> {a}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3 text-sm text-ink/70">
            <p className="font-display text-lg text-ink">Ready to submit</p>
            <p>Your listing will be marked <span className="font-medium text-brass-dark">Pending</span> and reviewed by your team before it's published on the public site.</p>
            <div className="rounded-lg bg-paper p-4 text-xs text-ink/50">
              Tip: listings with photos and a verified badge get significantly more inquiries.
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
          <button type="button" onClick={back} disabled={step === 0} className="text-sm font-medium text-ink/50 disabled:opacity-30">
            ← Back
          </button>
          <button type="submit" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
            {step === steps.length - 1 ? "Submit Listing" : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
