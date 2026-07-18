// Database operations for Supabase backend
import { createClient } from "@/lib/supabase/server";
import { Property, Lead, Agent } from "./types";

/**
 * PROPERTIES
 */

export async function getProperties(filter?: {
  status?: string;
  purpose?: string;
}) {
  const supabase = createClient();
  let query = supabase.from("properties").select("*");

  if (filter?.status) query = query.eq("status", filter.status);
  if (filter?.purpose) query = query.eq("purpose", filter.purpose);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch properties: ${error.message}`);
  return data as Property[];
}

export async function getPropertyById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code === "PGRST116") return null;
  if (error) throw new Error(`Failed to fetch property: ${error.message}`);
  return data as Property;
}

export async function createProperty(property: Omit<Property, "id" | "created_at">) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("properties")
    .insert([property])
    .select()
    .single();

  if (error) throw new Error(`Failed to create property: ${error.message}`);
  return data as Property;
}

export async function updateProperty(
  id: string,
  updates: Partial<Omit<Property, "id" | "created_at">>
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("properties")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update property: ${error.message}`);
  return data as Property;
}

export async function updatePropertyStatus(
  id: string,
  status: "active" | "pending" | "sold" | "rented" | "draft"
) {
  return updateProperty(id, { status });
}

export async function deleteProperty(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("properties").delete().eq("id", id);

  if (error) throw new Error(`Failed to delete property: ${error.message}`);
}

/**
 * LEADS
 */

export async function getLeads(filter?: { status?: string; propertyId?: string }) {
  const supabase = createClient();
  let query = supabase.from("leads").select("*");

  if (filter?.status) query = query.eq("status", filter.status);
  if (filter?.propertyId) query = query.eq("property_id", filter.propertyId);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch leads: ${error.message}`);
  return data as Lead[];
}

export async function createLead(lead: Omit<Lead, "id" | "created_at">) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("leads")
    .insert([lead])
    .select()
    .single();

  if (error) throw new Error(`Failed to create lead: ${error.message}`);
  return data as Lead;
}

export async function updateLeadStatus(
  id: string,
  status: "new" | "contacted" | "closed"
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update lead: ${error.message}`);
  return data as Lead;
}

/**
 * AGENTS
 */

export async function getAgents() {
  const supabase = createClient();
  const { data, error } = await supabase.from("agents").select("*");

  if (error) throw new Error(`Failed to fetch agents: ${error.message}`);
  return data as Agent[];
}

export async function getAgentById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code === "PGRST116") return null;
  if (error) throw new Error(`Failed to fetch agent: ${error.message}`);
  return data as Agent;
}

export async function createAgent(agent: Omit<Agent, "id" | "created_at">) {
  const supabase = createClient();
  const userId = agent.id; // Must be valid auth.users.id

  const { data, error } = await supabase
    .from("agents")
    .insert([{ id: userId, ...agent }])
    .select()
    .single();

  if (error) throw new Error(`Failed to create agent: ${error.message}`);
  return data as Agent;
}

export async function updateAgent(
  id: string,
  updates: Partial<Omit<Agent, "id" | "created_at">>
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("agents")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update agent: ${error.message}`);
  return data as Agent;
}

/**
 * AGENCY PROFILE
 */

export async function getAgencyProfile() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("agency_profile")
    .select("*")
    .single();

  if (error && error.code === "PGRST116") return null;
  if (error) throw new Error(`Failed to fetch agency profile: ${error.message}`);
  return data;
}

export async function updateAgencyProfile(updates: Record<string, any>) {
  const supabase = createClient();
  
  // First check if profile exists
  const profile = await getAgencyProfile();
  
  if (!profile) {
    const { data, error } = await supabase
      .from("agency_profile")
      .insert([updates])
      .select()
      .single();
    
    if (error) throw new Error(`Failed to create agency profile: ${error.message}`);
    return data;
  }
  
  const { data, error } = await supabase
    .from("agency_profile")
    .update(updates)
    .eq("id", profile.id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update agency profile: ${error.message}`);
  return data;
}
