-- Editable site content (CMS overrides).
-- Run once in Supabase: SQL Editor → New query → paste → Run.

create table public.content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.content enable row level security;

-- the site itself reads overrides — public content, public read
create policy "public_read_content"
  on public.content for select
  to anon, authenticated
  using (true);

-- only the owner may create/change/remove overrides
create policy "owner_insert_content"
  on public.content for insert
  to authenticated
  with check (auth.jwt() ->> 'email' = 'thanakorn.sinon@gmail.com');

create policy "owner_update_content"
  on public.content for update
  to authenticated
  using (auth.jwt() ->> 'email' = 'thanakorn.sinon@gmail.com')
  with check (auth.jwt() ->> 'email' = 'thanakorn.sinon@gmail.com');

create policy "owner_delete_content"
  on public.content for delete
  to authenticated
  using (auth.jwt() ->> 'email' = 'thanakorn.sinon@gmail.com');
