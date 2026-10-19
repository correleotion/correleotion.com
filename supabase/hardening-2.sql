-- Security hardening, round 2: tighter anonymous writes + defense in depth.
-- Run once in Supabase: SQL Editor → New query → paste → Run.

-- 1) Anonymous inserts: keep them insert-only, but stop forged timestamps and
--    non-object payloads (the dashboard assumes data is a JSON object).
drop policy if exists "anon_insert_events" on public.events;
create policy "anon_insert_events"
  on public.events
  for insert
  to anon
  with check (
    created_at > now() - interval '1 minute'
    and created_at < now() + interval '1 minute'
    and jsonb_typeof(data) = 'object'
  );

-- 2) Defense in depth: even if a permissive policy is added by mistake later,
--    the API roles still cannot modify or remove analytics rows, and
--    visitors cannot touch the content table at all.
revoke update, delete, truncate on public.events from anon, authenticated;
revoke insert, update, delete, truncate on public.content from anon;
