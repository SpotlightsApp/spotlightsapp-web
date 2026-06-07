-- The service_role (server-only, used by admin scripts / API routes that must
-- bypass RLS) needs table privileges on the public schema. Grant broadly and
-- set default privileges so future tables are covered too.
grant usage on schema public to service_role;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;
grant all on all routines in schema public to service_role;

alter default privileges in schema public grant all on tables to service_role;
alter default privileges in schema public grant all on sequences to service_role;
alter default privileges in schema public grant all on routines to service_role;
