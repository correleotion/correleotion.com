-- Security hardening: size limits on anonymous writes.
-- The events table accepts inserts from anyone (by design) — these CHECKs
-- stop oversized/junk payloads from bloating the free-tier database.
-- Run once in Supabase: SQL Editor → New query → paste → Run.

alter table public.events
  add constraint events_path_len    check (char_length(coalesce(path, ''))       <= 500),
  add constraint events_ref_len     check (char_length(coalesce(referrer, ''))   <= 500),
  add constraint events_ua_len      check (char_length(coalesce(ua, ''))         <= 400),
  add constraint events_lang_len    check (char_length(coalesce(lang, ''))       <= 40),
  add constraint events_screen_len  check (char_length(coalesce(screen, ''))     <= 20),
  add constraint events_theme_len   check (char_length(coalesce(theme, ''))      <= 10),
  add constraint events_vid_len     check (char_length(coalesce(visitor_id, '')) <= 80),
  add constraint events_sid_len     check (char_length(coalesce(session_id, '')) <= 80),
  add constraint events_data_size   check (pg_column_size(data) <= 4096);

alter table public.content
  add constraint content_key_len    check (char_length(key) <= 100),
  add constraint content_value_size check (pg_column_size(value) <= 20000);
