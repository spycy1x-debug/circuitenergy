
CREATE TABLE public.product_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX product_reviews_product_id_idx ON public.product_reviews (product_id, created_at DESC);
GRANT SELECT, INSERT ON public.product_reviews TO anon, authenticated;
GRANT ALL ON public.product_reviews TO service_role;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view reviews" ON public.product_reviews FOR SELECT USING (true);
CREATE POLICY "Anyone can submit reviews" ON public.product_reviews FOR INSERT WITH CHECK (
  length(name) BETWEEN 1 AND 80
  AND length(title) BETWEEN 1 AND 120
  AND length(body) BETWEEN 1 AND 2000
);
