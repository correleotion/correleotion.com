-- correleotion.com analytics schema
-- Run this once in Supabase: SQL Editor → New query → paste → Run.

create table public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  type text not null check (type in ('pageview', 'click', 'copy', 'section_view')),
  visitor_id text,
  session_id text,
  path text,
  referrer text,
  ua text,
  lang text,
  screen text,
  theme text,
  data jsonb not null default '{}'::jsonb
);

create index events_created_at_idx on public.events (created_at desc);
create index events_type_idx on public.events (type);

-- Row Level Security: visitors may WRITE events, only the owner may READ them.
alter table public.events enable row level security;

-- anonymous visitors: insert only (they can never read anything back)
create policy "anon_insert_events"
  on public.events
  for insert
  to anon
  with check (true);

-- dashboard reads: only a logged-in user with the owner's email
-- (pins access to your account even if someone signs themselves up)
create policy "owner_read_events"
  on public.events
  for select
  to authenticated
  using (auth.jwt() ->> 'email' = 'thanakorn.sinon@gmail.com');

-- nobody can update or delete through the API (no policies = denied);
-- the service role / dashboard SQL editor still can, for maintenance.
