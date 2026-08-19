-- Shine Ministries — database schema
-- Run this once in the Supabase SQL Editor for a new project.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  event_time text,
  location text,
  image_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Bible studies (the groups themselves)
-- ---------------------------------------------------------------------------
create table if not exists public.bible_studies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  day_of_week text,
  meeting_time text,
  location text,
  leader_name text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Bible study sign-ups (submitted from the public sign-up form)
-- ---------------------------------------------------------------------------
create table if not exists public.bible_study_signups (
  id uuid primary key default gen_random_uuid(),
  bible_study_id uuid references public.bible_studies(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  message text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Contact / volunteer / prayer request submissions (Get Involved page)
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  topic text default 'general', -- 'volunteer' | 'prayer_request' | 'general'
  message text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Newsletter sign-ups
-- ---------------------------------------------------------------------------
create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.events enable row level security;
alter table public.bible_studies enable row level security;
alter table public.bible_study_signups enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.newsletter_signups enable row level security;

-- Public (anon) can read published events / active bible studies only.
create policy "Public can view published events"
  on public.events for select
  using (is_published = true);

create policy "Public can view active bible studies"
  on public.bible_studies for select
  using (is_active = true);

-- Public (anon) can submit forms, but cannot read submissions back — that
-- keeps sign-up/contact/newsletter data private, viewable only from the
-- Supabase dashboard (Table Editor) using your own account.
create policy "Public can submit bible study signups"
  on public.bible_study_signups for insert
  with check (true);

create policy "Public can submit the contact form"
  on public.contact_submissions for insert
  with check (true);

create policy "Public can subscribe to the newsletter"
  on public.newsletter_signups for insert
  with check (true);
