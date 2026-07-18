-- Seed data mirroring lib/mock-data.ts, so a fresh Supabase project looks
-- identical to the demo until real listings are added. Run after schema.sql.
-- Replace the auth.users id below with a real user id after you create your
-- first login in Supabase Auth (Authentication -> Users -> Add user).

insert into agency_profile (name, tagline, logo_initials, city, phone, whatsapp, email, address, areas_covered, years_active)
values (
  'Horizon Estates',
  'Every listing, verified before it''s shown.',
  'HE',
  'Lahore',
  '+92 300 1234567',
  '923001234567',
  'hello@horizonestates.example',
  '12 Commercial Boulevard, DHA Phase 5, Lahore',
  array['DHA Lahore','Bahria Town','Johar Town','Gulberg','Valencia','Raiwind Road'],
  9
);

-- After creating an owner user in Supabase Auth, insert their profile row:
-- insert into agents (id, name, role, phone, whatsapp, email, avatar_initials)
-- values ('<auth-user-uuid>', 'Bilal Ahmed', 'owner', '+92 300 1234567', '923001234567', 'bilal@horizonestates.example', 'BA');

insert into properties (title, purpose, type, status, price, price_label, city, area, size, size_unit, beds, baths, verified, featured, cover_image, images, description, amenities, views, leads_count)
values
  ('1 Kanal Modern House, DHA Phase 6', 'sale', 'house', 'active', 45000000, '4.5 Crore', 'Lahore', 'DHA Phase 6', 1, 'kanal', 5, 6, true, true,
   'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
   array['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop'],
   'A double-storey corner house with a modern facade, finished basement, and separate servant quarters.',
   array['Basement','Servant Quarters','Solar Panels','Covered Parking'], 812, 14),
  ('10 Marla House, Bahria Town', 'rent', 'house', 'active', 120000, '120,000 / mo', 'Lahore', 'Bahria Town', 10, 'marla', 4, 4, true, true,
   'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop',
   array['https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop'],
   'Well-maintained house on a wide street, close to Bahria Town commercial.',
   array['Wide Street','Covered Parking','Backup Generator'], 540, 9),
  ('5 Marla Residential Plot, Valencia', 'sale', 'plot', 'active', 9800000, '98 Lac', 'Lahore', 'Valencia', 5, 'marla', null, null, true, true,
   'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
   array['https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop'],
   'Corner plot on a 40ft street, possession ready, all dues clear.',
   array['Corner Plot','Possession Ready'], 389, 6);

-- Add the remaining demo listings the same way, or start adding real ones
-- through the dashboard once auth is wired up — that path writes here directly.
