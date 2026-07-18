export type PropertyPurpose = "sale" | "rent";
export type PropertyType = "house" | "plot" | "commercial" | "apartment";
export type PropertyStatus = "active" | "pending" | "sold" | "rented" | "draft";
export type SizeUnit = "marla" | "kanal" | "sqft" | "acre";

export interface Property {
  id: string;
  title: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  status: PropertyStatus;
  price: number; // in PKR
  priceLabel: string; // formatted e.g. "1.85 Crore" or "85,000 / mo"
  city: string;
  area: string;
  size: number;
  sizeUnit: SizeUnit;
  beds?: number;
  baths?: number;
  verified: boolean;
  featured: boolean;
  coverImage: string;
  images: string[];
  description: string;
  amenities: string[];
  agentId: string;
  views: number;
  leads: number;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  role: "owner" | "agent";
  phone: string;
  whatsapp: string;
  email: string;
  avatar: string;
  listingsCount: number;
}

export interface Lead {
  id: string;
  propertyId: string;
  propertyTitle: string;
  name: string;
  phone: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export interface AgencyProfile {
  name: string;
  tagline: string;
  logoInitials: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  areasCovered: string[];
  yearsActive: number;
}
