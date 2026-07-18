import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import * as mock from "@/lib/mock-data";
import { Property, Lead, AgencyProfile } from "@/lib/types";

// Every function here mirrors one in lib/mock-data.ts. When a Supabase project
// is connected (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY set),
// it reads real rows; otherwise it falls back to the bundled demo data so the
// project still runs out of the box.

function mapRow(row: any): Property {
  return {
    id: row.id,
    title: row.title,
    purpose: row.purpose,
    type: row.type,
    status: row.status,
    price: Number(row.price),
    priceLabel: row.price_label,
    city: row.city,
    area: row.area,
    size: Number(row.size),
    sizeUnit: row.size_unit,
    beds: row.beds ?? undefined,
    baths: row.baths ?? undefined,
    verified: row.verified,
    featured: row.featured,
    coverImage: row.cover_image,
    images: row.images ?? [],
    description: row.description ?? "",
    amenities: row.amenities ?? [],
    agentId: row.agent_id,
    views: row.views ?? 0,
    leads: row.leads_count ?? 0,
    createdAt: row.created_at,
  };
}

export async function getAllProperties(): Promise<Property[]> {
  if (!isSupabaseConfigured) return mock.properties;
  const supabase = createClient();
  const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
  if (error || !data) return mock.properties;
  return data.map(mapRow);
}

export async function getFeaturedProperties(): Promise<Property[]> {
  if (!isSupabaseConfigured) return mock.getFeaturedProperties();
  const supabase = createClient();
  const { data, error } = await supabase.from("properties").select("*").eq("featured", true).eq("status", "active");
  if (error || !data) return mock.getFeaturedProperties();
  return data.map(mapRow);
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  if (!isSupabaseConfigured) return mock.getPropertyById(id);
  const supabase = createClient();
  const { data, error } = await supabase.from("properties").select("*").eq("id", id).single();
  if (error || !data) return mock.getPropertyById(id);
  return mapRow(data);
}

export async function getLeads(): Promise<Lead[]> {
  if (!isSupabaseConfigured) return mock.leads;
  const supabase = createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*, properties(title)")
    .order("created_at", { ascending: false });
  if (error || !data) return mock.leads;
  return data.map((row: any) => ({
    id: row.id,
    propertyId: row.property_id,
    propertyTitle: row.properties?.title ?? "Unknown listing",
    name: row.name,
    phone: row.phone,
    message: row.message ?? "",
    status: row.status,
    createdAt: row.created_at,
  }));
}

export async function getAgencyProfile(): Promise<AgencyProfile> {
  if (!isSupabaseConfigured) return mock.agencyProfile;
  const supabase = createClient();
  const { data, error } = await supabase.from("agency_profile").select("*").single();
  if (error || !data) return mock.agencyProfile;
  return {
    name: data.name,
    tagline: data.tagline ?? "",
    logoInitials: data.logo_initials ?? "",
    city: data.city ?? "",
    phone: data.phone ?? "",
    whatsapp: data.whatsapp ?? "",
    email: data.email ?? "",
    address: data.address ?? "",
    areasCovered: data.areas_covered ?? [],
    yearsActive: data.years_active ?? 0,
  };
}

export async function getDashboardStats() {
  const properties = await getAllProperties();
  const leadsList = await getLeads();
  return {
    activeListings: properties.filter((p) => p.status === "active").length,
    totalViews: properties.reduce((sum, p) => sum + p.views, 0),
    newLeads: leadsList.filter((l) => l.status === "new").length,
    dealsClosedThisMonth: properties.filter((p) => p.status === "sold" || p.status === "rented").length,
  };
}
