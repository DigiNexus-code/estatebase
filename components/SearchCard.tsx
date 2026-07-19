"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchCard() {
  const router = useRouter();
  const [purpose, setPurpose] = useState("sale");
  const [type, setType] = useState("");
  const [area, setArea] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const onSearch = () => {
    const params = new URLSearchParams();
    if (purpose) params.set("purpose", purpose);
    if (type) params.set("type", type);
    if (area) params.set("area", area);
    router.push(`/listings?${params.toString()}`);
  };

  const selectClass =
    "w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-amber-600 focus:outline-none transition-colors";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full max-w-2xl"
    >
      {/* Wine Shine Border Effect */}
      {isHovering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-amber-200/50 to-transparent"
          style={{
            animation: "wineShine 2s ease-in-out infinite",
          }}
        />
      )}

      <div className="relative rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-amber-400/50">
        {/* Purple shine line on hover */}
        {isHovering && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <div className="p-6">
          {/* Purpose Toggle */}
          <div className="mb-4 flex gap-2 rounded-lg bg-gray-100 p-1">
            {[
              { id: "sale", label: "Buy" },
              { id: "rent", label: "Rent" },
            ].map((t) => (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPurpose(t.id)}
                className={`flex-1 rounded-lg py-2 px-4 text-sm font-semibold transition-all duration-300 ${
                  purpose === t.id
                    ? "bg-black text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t.label}
              </motion.button>
            ))}
          </div>

          {/* Search Inputs Grid */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <motion.select
              whileFocus={{ scale: 1.02 }}
              className={selectClass}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Any type</option>
              <option value="house">House</option>
              <option value="plot">Plot / Land</option>
              <option value="commercial">Commercial</option>
              <option value="apartment">Apartment</option>
            </motion.select>

            <motion.select
              whileFocus={{ scale: 1.02 }}
              className={selectClass}
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">Any location</option>
              <option value="DHA Phase 6">DHA Lahore</option>
              <option value="Bahria Town">Bahria Town</option>
              <option value="Johar Town">Johar Town</option>
              <option value="Gulberg">Gulberg</option>
              <option value="Valencia">Valencia</option>
              <option value="Raiwind Road">Raiwind Road</option>
            </motion.select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSearch}
              className="rounded-lg bg-black text-white font-semibold transition-all duration-300 hover:bg-gray-800 shadow-lg hover:shadow-xl py-2 px-4"
            >
              Search
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
