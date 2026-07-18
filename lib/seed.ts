// Seed script to populate Supabase with initial data
// Run with: npx ts-node lib/seed.ts

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function seed() {
  try {
    console.log("Starting seed...");

    // 1. Seed agency profile
    console.log("Seeding agency profile...");
    const agencyResult = await supabase
      .from("agency_profile")
      .select("*")
      .limit(1);

    if (agencyResult.data && agencyResult.data.length === 0) {
      await supabase.from("agency_profile").insert([
        {
          name: "Horizon Estates",
          tagline: "Every listing, verified before it's shown.",
          logo_initials: "HE",
          city: "Lahore",
          phone: "+92 300 1234567",
          whatsapp: "923001234567",
          email: "hello@horizonestates.example",
          address: "12 Commercial Boulevard, DHA Phase 5, Lahore",
          areas_covered: ["DHA Lahore", "Bahria Town", "Johar Town", "Gulberg", "Valencia", "Raiwind Road"],
          years_active: 9,
        },
      ]);
      console.log("✓ Agency profile seeded");
    } else {
      console.log("✓ Agency profile already exists");
    }

    // 2. Seed properties
    console.log("Seeding properties...");
    const propertiesResult = await supabase
      .from("properties")
      .select("*")
      .limit(1);

    if (propertiesResult.data && propertiesResult.data.length === 0) {
      await supabase.from("properties").insert([
        {
          title: "1 Kanal Modern House, DHA Phase 6",
          purpose: "sale",
          type: "house",
          status: "active",
          price: 45000000,
          price_label: "4.5 Crore",
          city: "Lahore",
          area: "DHA Phase 6",
          size: 1,
          size_unit: "kanal",
          beds: 5,
          baths: 6,
          verified: true,
          featured: true,
          cover_image:
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
          ],
          description:
            "A double-storey corner house with a modern facade, finished basement, and separate servant quarters. Recently renovated kitchen and marble flooring throughout.",
          amenities: ["Basement", "Servant Quarters", "Solar Panels", "Covered Parking", "Modern Kitchen"],
          views: 812,
          leads_count: 14,
        },
        {
          title: "10 Marla House, Bahria Town",
          purpose: "rent",
          type: "house",
          status: "active",
          price: 120000,
          price_label: "120,000 / mo",
          city: "Lahore",
          area: "Bahria Town",
          size: 10,
          size_unit: "marla",
          beds: 4,
          baths: 4,
          verified: true,
          featured: true,
          cover_image:
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop",
          ],
          description: "Well-maintained house on a wide street, close to Bahria Town commercial. Ideal for a family.",
          amenities: ["Wide Street", "Near Commercial", "Covered Parking", "Backup Generator"],
          views: 540,
          leads_count: 9,
        },
        {
          title: "5 Marla Residential Plot, Valencia",
          purpose: "sale",
          type: "plot",
          status: "active",
          price: 9800000,
          price_label: "98 Lac",
          city: "Lahore",
          area: "Valencia",
          size: 5,
          size_unit: "marla",
          verified: true,
          featured: true,
          cover_image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
          images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop"],
          description:
            "Corner plot on a 40ft street, possession ready, all dues clear, ideal for immediate construction.",
          amenities: ["Corner Plot", "Possession Ready", "Clear Dues"],
          views: 389,
          leads_count: 6,
        },
      ]);
      console.log("✓ Properties seeded");
    } else {
      console.log("✓ Properties already exist");
    }

    console.log("\n✓ Seed complete!");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
