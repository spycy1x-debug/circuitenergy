ALTER TABLE public.product_reviews
ADD COLUMN IF NOT EXISTS image_url TEXT;

GRANT SELECT, INSERT ON public.product_reviews TO anon, authenticated;
GRANT ALL ON public.product_reviews TO service_role;