"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardTopbar from "@/components/DashboardTopbar";
import ImageUpload from "@/components/ImageUpload";
import { createProperty } from "@/lib/api-client";

const steps = ["Basic Info", "Location", "Pricing & Size", "Media & Amenities", "Review"];

const inputClass = "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-primary";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40";

interface FormData {
  title: string;
  purpose: string;
  type: string;
  description: string;
  city: string;
  area: string;
  address: string;
  price: string;
  size: string;
  sizeUnit: string;
  beds: string;
  baths: string;
  images: string[];
  amenities: string[];
}

export default function NewProperty() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    purpose: "sale",
    type: "house",
    description: "",
    city: "",
    area: "",
    address: "",
    price: "",
    size: "",
    sizeUnit: "marla",
    beds: "",
    baths: "",
    images: [],
    amenities: [],
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      next();
      return;
    }

    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("purpose", formData.purpose);
      form.append("type", formData.type);
      form.append("description", formData.description);
      form.append("city", formData.city);
      form.append("area", formData.area);
      form.append("address", formData.address);
      form.append("price", formData.price);
      form.append("size", formData.size);
      form.append("sizeUnit", formData.sizeUnit);
      form.append("beds", formData.beds || "0");
      form.append("baths", formData.baths || "0");
      form.append("images", JSON.stringify(formData.images));
      form.append("amenities", JSON.stringify(formData.amenities));

      const result = await createProperty(form);
      setSubmitted(true);
      setTimeout(() => router.push("/dashboard/properties"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create property");
    } finally {
      setLoading(false);
    }
  };

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

      <form onSubmit={handleSubmit} className="max-w-2xl rounded-2xl border border-line bg-white p-8">
        {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Listing Title</label>
              <input
                required
                className={inputClass}
                placeholder="e.g. 1 Kanal Modern House, DHA Phase 6"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Purpose</label>
                <select
                  className={inputClass}
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Property Type</label>
                <select
                  className={inputClass}
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="house">House</option>
                  <option value="plot">Plot / Land</option>
                  <option value="commercial">Commercial</option>
                  <option value="apartment">Apartment</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                className={inputClass}
                rows={4}
                placeholder="Describe the property's condition, layout, and highlights"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City</label>
                <input
                  required
                  className={inputClass}
                  placeholder="Lahore"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Area / Society</label>
                <input
                  required
                  className={inputClass}
                  placeholder="DHA Phase 6"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Full Address (optional, shown only to serious inquiries)</label>
              <input
                className={inputClass}
                placeholder="Street / plot number"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Price (PKR)</label>
                <input
                  required
                  className={inputClass}
                  placeholder="e.g. 45000000"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Size</label>
                <div className="flex gap-2">
                  <input
                    required
                    className={inputClass}
                    placeholder="1"
                    type="number"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  />
                  <select
                    className={inputClass}
                    value={formData.sizeUnit}
                    onChange={(e) => setFormData({ ...formData, sizeUnit: e.target.value })}
                  >
                    <option value="marla">Marla</option>
                    <option value="kanal">Kanal</option>
                    <option value="sqft">Sq.ft</option>
                    <option value="acre">Acre</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Bedrooms</label>
                <input
                  className={inputClass}
                  placeholder="e.g. 5"
                  type="number"
                  value={formData.beds}
                  onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Bathrooms</label>
                <input
                  className={inputClass}
                  placeholder="e.g. 6"
                  type="number"
                  value={formData.baths}
                  onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Photos</label>
              <ImageUpload
                multiple
                onImageAdded={(url) => setFormData({ ...formData, images: [...formData.images, url] })}
                onError={(err) => setError(err)}
              />
            </div>
            <div>
              <label className={labelClass}>Amenities</label>
              <div className="flex flex-wrap gap-2">
                {["Parking", "Backup Generator", "Security", "Servant Quarters", "Basement", "Solar Panels", "Furnished"].map((a) => (
                  <label
                    key={a}
                    className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-ink/60 has-[:checked]:border-primary has-[:checked]:bg-primary-light has-[:checked]:text-primary-dark cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="accent-primary"
                      checked={formData.amenities.includes(a)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, amenities: [...formData.amenities, a] });
                        } else {
                          setFormData({ ...formData, amenities: formData.amenities.filter((am) => am !== a) });
                        }
                      }}
                    />
                    {a}
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
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? "Submitting..." : step === steps.length - 1 ? "Submit Listing" : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
