-- EstateBase schema
-- Run this in the Supabase SQL editor for each client's project.
-- One agency per Supabase project (per the "separate deploy per client" model),
-- so there is no agency_id column on properties/leads — RLS is scoped by auth.uid() instead.

create extension if not exists "uuid-ossp";

create table agency_profile (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  tagline text,
  logo_initials text,
  city text,
  phone text,
  whatsapp text,
  email text,
  address text,
  areas_covered text[] default '{}',
  years_active int default 0
);

create table agents (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text not null check (role in ('owner','agent')),
  phone text,
  whatsapp text,
  email text,
  avatar_initials text,
  created_at timestamptz default now()
);

create table properties (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  purpose text not null check (purpose in ('sale','rent')),
  type text not null check (type in ('house','plot','commercial','apartment')),
  status text not null default 'pending' check (status in ('active','pending','sold','rented','draft')),
  price numeric not null,
  price_label text not null,
  city text not null,
  area text not null,
  size numeric not null,
  size_unit text not null check (size_unit in ('marla','kanal','sqft','acre')),
  beds int,
  baths int,
  verified boolean default false,
  featured boolean default false,
  cover_image text,
  images text[] default '{}',
  description text,
  amenities text[] default '{}',
  agent_id uuid references agents(id),
  views int default 0,
  leads_count int default 0,
  created_at timestamptz default now()
);

create table leads (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references properties(id) on delete cascade,
  name text not null,
  phone text not null,
  message text,
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz default now()
);

-- Row Level Security: public can read published listings; only authenticated
-- agency staff can read/write everything, including pending/draft listings and leads.
alter table properties enable row level security;
alter table leads enable row level security;
alter table agents enable row level security;
alter table agency_profile enable row level security;

create policy "Public can view active properties" on properties
  for select using (status = 'active');

create policy "Staff can manage all properties" on properties
  for all using (auth.role() = 'authenticated');

create policy "Staff can manage leads" on leads
  for all using (auth.role() = 'authenticated');

create policy "Anyone can submit a lead" on leads
  for insert with check (true);

create policy "Staff can view agents" on agents
  for select using (auth.role() = 'authenticated');

create policy "Public can view agency profile" on agency_profile
  for select using (true);

create policy "Staff can update agency profile" on agency_profile
  for update using (auth.role() = 'authenticated');

-- Storage bucket for property photos (create via Supabase dashboard or CLI too):
-- insert into storage.buckets (id, name, public) values ('property-photos', 'property-photos', true);
