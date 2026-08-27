-- Shine Ministries — Office Phase 1
-- Adds the event columns the app code already assumes but schema.sql never
-- defined (rsvp_url/highlight/date_tbd), a photos table backing the About-page
-- group-photo grid + founder photo, authenticated-write RLS for the office app,
-- and a public Storage bucket for uploaded images.

-- ---------------------------------------------------------------------------
-- Events: add the columns EventRow (src/lib/supabase.ts) already expects
-- ---------------------------------------------------------------------------
alter table public.events
  add column if not exists rsvp_url text,
  add column if not exists highlight text check (highlight in ('lavender', 'sage')),
  add column if not exists date_tbd boolean not null default false;

-- ---------------------------------------------------------------------------
-- Photos: About-page group photo grid ('group') + founder photo ('founder')
-- ---------------------------------------------------------------------------
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('group', 'founder')),
  url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.photos enable row level security;

create policy "Public can view photos"
  on public.photos for select
  using (true);

create policy "Authenticated can manage photos"
  on public.photos for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Office app write access — the existing policies only cover public
-- select/insert; add authenticated-only policies for full admin CRUD.
-- ---------------------------------------------------------------------------
create policy "Authenticated can manage events"
  on public.events for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated can manage bible studies"
  on public.bible_studies for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Storage: public bucket for uploaded photos (group/founder), managed only by
-- authenticated (office app) users.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public can view media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Authenticated can manage media"
  on storage.objects for all
  using (bucket_id = 'media' and auth.role() = 'authenticated')
  with check (bucket_id = 'media' and auth.role() = 'authenticated');
