/**
 * API Client Helpers
 * Browser-side helpers for calling backend APIs
 */

// Properties
export async function createProperty(formData: FormData) {
  const response = await fetch('/api/properties', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to create property');
  return response.json();
}

export async function updateProperty(id: string, data: Record<string, any>) {
  const response = await fetch(`/api/properties/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update property');
  return response.json();
}

export async function updatePropertyStatus(id: string, status: 'active' | 'pending' | 'sold' | 'rented' | 'draft') {
  const response = await fetch(`/api/properties/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update property status');
  return response.json();
}

export async function deleteProperty(id: string) {
  const response = await fetch(`/api/properties/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete property');
  return response.json();
}

// Leads
export async function updateLeadStatus(id: string, status: 'new' | 'contacted' | 'closed') {
  const response = await fetch(`/api/leads/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update lead status');
  return response.json();
}

// Agency Profile
export async function updateAgencyProfile(data: Record<string, any>) {
  const response = await fetch('/api/agency', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update agency profile');
  return response.json();
}

// Agents
export async function createAgent(data: Record<string, any>) {
  const response = await fetch('/api/agents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create agent');
  return response.json();
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload image');
  return response.json();
}
