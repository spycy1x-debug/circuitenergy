CREATE TABLE public.ab_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL,
  variant text NOT NULL CHECK (variant IN ('A','B')),
  event text NOT NULL CHECK (event IN ('assign','view','select','add_to_cart','initiate_checkout')),
  tier_id text,
  value numeric,
  path text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ab_events_variant_event_idx ON public.ab_events (variant, event, created_at DESC);

GRANT INSERT ON public.ab_events TO anon;
GRANT INSERT ON public.ab_events TO authenticated;
GRANT SELECT ON public.ab_events TO authenticated;
GRANT ALL ON public.ab_events TO service_role;

ALTER TABLE public.ab_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can log ab events"
  ON public.ab_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "authenticated can read ab events"
  ON public.ab_events FOR SELECT
  TO authenticated
  USING (true);