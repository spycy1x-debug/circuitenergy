import { useEffect, useState } from "react";
import { sans, serif, Stars } from "@/components/site/Silk";
import { supabase } from "@/integrations/supabase/client";
import r1 from "@/assets/silkbrush-customer-1.webp.asset.json";
import r2 from "@/assets/silkbrush-customer-2.webp.asset.json";
import r3 from "@/assets/silkbrush-customer-3.webp.asset.json";
import r4 from "@/assets/silkbrush-customer-4.webp.asset.json";
import r5 from "@/assets/silkbrush-customer-5.webp.asset.json";
import r6 from "@/assets/silkbrush-customer-6.webp.asset.json";
import r7 from "@/assets/silkbrush-customer-7.webp.asset.json";
import r8 from "@/assets/silkbrush-customer-8.webp.asset.json";
import r9 from "@/assets/silkbrush-customer-9.webp.asset.json";

const PHOTOS = [r1, r2, r3, r4, r5, r6, r7, r8, r9].map((p) => p.url);

type Review = { name: string; rating: number; date: string; title: string; body: string; photo?: string };

export const REVIEWS: Review[] = [
  { name: "Kayla M.", rating: 5, date: "Aug 12, 2026", title: "So much easier in the morning", body: "I honestly did not expect a brush to make this much difference. My hair looks as though I took time to blow-dry it, but I simply brushed it. The frizz around the top is much calmer now.", photo: PHOTOS[0] },
  { name: "Brianna R.", rating: 5, date: "Aug 9, 2026", title: "Noticeably shinier", body: "After about a week, my hair looked noticeably shinier and much more polished. Even my husband asked what I had changed. I do clean it every few days, but I would do that with any good brush.", photo: PHOTOS[1] },
  { name: "Sofia G.", rating: 5, date: "Aug 4, 2026", title: "Worth the purchase", body: "I keep this one in my car for mornings when I am rushing out the door. It smooths my hair without pulling, and I arrive looking much more put together.", photo: PHOTOS[2] },
  { name: "Maddie T.", rating: 4, date: "Jul 30, 2026", title: "A very good brush", body: "It does exactly what I hoped. My hair is not pin-straight, but it is considerably smoother and much less puffy. I noticed the difference after a few days of regular use.", photo: PHOTOS[3] },
  { name: "Alina P.", rating: 5, date: "Jul 27, 2026", title: "Finally controls my flyaways", body: "The little flyaway hairs around my part have bothered me for years. This brush lays them down nicely without gel or hairspray, which is exactly what I wanted.", photo: PHOTOS[4] },
  { name: "Denise W.", rating: 5, date: "Jul 22, 2026", title: "Helpful for dry, colored hair", body: "Years of coloring have left my hair quite dry, especially at the ends. This brush helps move the natural oils through my hair, and the ends no longer look nearly as parched.", photo: PHOTOS[5] },
  { name: "Priya N.", rating: 5, date: "Jul 18, 2026", title: "Works well on thick hair", body: "My hair is very thick, and many brushes barely get through it. This one reaches through the sections without snagging and leaves my hair looking smooth and glossy.", photo: PHOTOS[6] },
  { name: "Jess L.", rating: 5, date: "Jul 14, 2026", title: "I use it every day", body: "I do not usually write reviews, but this has become part of my daily routine. My hair feels softer, has less static, and looks neater with very little effort.", photo: PHOTOS[7] },
  { name: "Emma C.", rating: 5, date: "Jul 9, 2026", title: "Gentler on my hair", body: "Brushing after washing used to leave so much hair caught in my old brush. I am seeing far less pulling with this one, and my hair looks smoother when it dries.", photo: PHOTOS[8] },
  { name: "Nicole B.", rating: 5, date: "Jul 3, 2026", title: "Beautiful shine", body: "My hair has not looked this naturally shiny in years, and I am not adding another product to get the effect. I was pleased enough to order a second brush for my sister." },
  { name: "Hannah S.", rating: 5, date: "Jun 29, 2026", title: "Feels well made", body: "The wooden handle feels solid and comfortable, not flimsy like many brushes I have owned. It has also made a real difference with the static I get in the mornings." },
  { name: "Amber K.", rating: 4, date: "Jun 25, 2026", title: "Pleased with the results", body: "My hair is definitely smoother and easier to manage. I gave four stars only because delivery took a little longer than I expected, but the brush itself is excellent." },
  { name: "Tori V.", rating: 5, date: "Jun 21, 2026", title: "A real difference in humidity", body: "Humidity has always made my hair frizz almost immediately. This is not magic, but it reduces the puffiness enough that I feel comfortable leaving the house without restyling everything." },
  { name: "Leah D.", rating: 5, date: "Jun 17, 2026", title: "My evening routine now", body: "I brush thoroughly before bed and wake up with hair that is much easier to manage. It has shortened my morning routine more than I expected." },
  { name: "Camila F.", rating: 5, date: "Jun 12, 2026", title: "Sturdy and effective", body: "I have gone through so many inexpensive brushes that cracked or lost bristles. This one feels sturdy, and my dry ends look much more polished after brushing." },
  { name: "Rachel O.", rating: 5, date: "Jun 8, 2026", title: "Looks freshly styled", body: "My hair looks as though I spent far more time on it than I did. Two careful minutes of brushing gives me a smooth, finished look that used to require a salon blowout." },
  { name: "Mia H.", rating: 4, date: "Jun 3, 2026", title: "Best on dry hair", body: "It works beautifully on dry hair for me. I did notice some tugging when I tried it on wet hair, but once I began using it as directed, I was very pleased." },
  { name: "Grace A.", rating: 5, date: "May 30, 2026", title: "I had to order another", body: "My mother borrowed mine and liked it so much that she kept it. I ordered another rather than ask for it back. We both find our hair looks fuller and better groomed after using it." },
  { name: "Elena Z.", rating: 5, date: "May 26, 2026", title: "Smooth without looking oily", body: "My hair is fine and becomes oily quickly, so I was hesitant. It gives me shine without making my hair look greasy, and it smooths the wispy pieces around my face." },
  { name: "Bella J.", rating: 5, date: "May 21, 2026", title: "No more puffiness", body: "My old comb left my hair looking twice its normal size. This brush smooths everything down and gives me a much more controlled finish." },
  { name: "Jordan Q.", rating: 5, date: "May 17, 2026", title: "The bristles make a difference", body: "I am particular about hair products and was pleasantly surprised. The boar bristles seem to smooth the surface of my hair, leaving it softer and silkier to the touch." },
  { name: "Kelsey R.", rating: 4, date: "May 12, 2026", title: "Good quality for the price", body: "This is a very nice brush for the price and feels as though it will last. I might have preferred a darker wood, but that is simply personal taste." },
  { name: "Aisha M.", rating: 5, date: "May 8, 2026", title: "Excellent for a sleek style", body: "I use it on dry hair when I want a smooth ponytail. It lays down the shorter hairs beautifully, and I no longer need nearly as much gel." },
  { name: "Sam T.", rating: 5, date: "May 3, 2026", title: "A successful gift", body: "I bought two for my daughters, and both of them were delighted. One sent me a photograph of her hair after using it, which told me everything I needed to know." },
  { name: "Vanessa L.", rating: 5, date: "Apr 28, 2026", title: "My hair behaves again", body: "After three weeks, my hair is noticeably easier to manage. I reach for the straightener much less often now, and that has been the greatest benefit for me." },
  { name: "Erin P.", rating: 5, date: "Apr 24, 2026", title: "Comfortable on the scalp", body: "The bristles feel gentle and almost like a scalp massage. I find myself brushing longer than necessary because it is genuinely relaxing." },
  { name: "Chloe W.", rating: 5, date: "Apr 19, 2026", title: "The shine is lovely", body: "The shine is quite noticeable. My hair catches the light now instead of looking dull and flat, especially around the ends." },
  { name: "Tanya B.", rating: 4, date: "Apr 15, 2026", title: "Does the job well", body: "It smooths my hair exactly as promised. The dense bristles need cleaning more often than I expected, but it is a small inconvenience for the results." },
  { name: "Olivia N.", rating: 5, date: "Apr 10, 2026", title: "Much less pulling", body: "I used to find short broken hairs everywhere after brushing. There is far less pulling with this brush, and my hair looks tidier and more even." },
  { name: "Marisol E.", rating: 5, date: "Apr 6, 2026", title: "Very good for thick, wavy hair", body: "My hair is thick and wavy, and this gives it a finished appearance without heat. I have been able to skip the flat iron on most days." },
  { name: "Ashley D.", rating: 5, date: "Apr 1, 2026", title: "My everyday brush", body: "This has replaced every other brush I own. The others are now sitting in a drawer because this one handles both smoothing and everyday detangling for me." },
  { name: "Naomi K.", rating: 5, date: "Mar 27, 2026", title: "Stays neat through the day", body: "By lunchtime, my hair used to look as though I had rushed out without fixing it. Now it stays smoother and more presentable throughout my workday." },
  { name: "Paige S.", rating: 5, date: "Mar 23, 2026", title: "Worth every penny", body: "I was skeptical about paying more for a brush, but the quality is apparent. It feels substantially better than the inexpensive brushes I have used for years." },
  { name: "Whitney A.", rating: 4, date: "Mar 18, 2026", title: "Very happy with it", body: "My hair is certainly smoother. It took a little practice to remember to work in smaller sections, but that method gives me the best finish." },
  { name: "Kira Y.", rating: 5, date: "Mar 14, 2026", title: "Soft and silky", body: "The name is fitting because my hair truly does feel silkier after brushing. It is also much more comfortable on my scalp than my old plastic brush." },
  { name: "Dani M.", rating: 5, date: "Mar 9, 2026", title: "Gentle on colored hair", body: "My hair is lightened and rather fragile, so gentleness matters to me. This smooths it without the rough pulling I experienced with other brushes." },
  { name: "Selena C.", rating: 5, date: "Mar 4, 2026", title: "The two-pack was useful", body: "I keep one at home and one in my handbag. It is wonderful for a quick touch-up before dinner or an appointment, especially when the weather is damp." },
  { name: "Ivy R.", rating: 5, date: "Feb 27, 2026", title: "A pleasant surprise", body: "I did not think changing my brush would matter very much, but my hair looks noticeably more polished in photographs. The halo of frizz is greatly reduced." },
  { name: "Lauren F.", rating: 5, date: "Feb 22, 2026", title: "Gentle enough for my daughter", body: "My daughter has very fine hair that tangles easily. She no longer dreads having it brushed, and that alone makes this purchase worthwhile." },
  { name: "Monique T.", rating: 5, date: "Feb 16, 2026", title: "A dependable brush", body: "I have used it for several months, and it still looks nearly new. The bristles have held their shape, and it continues to smooth my hair very well." },
];

const INITIAL = 12;

const FIVE_STAR = REVIEWS.filter((r) => r.rating === 5);

export function MiniReviewCarousel() {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setI((v) => (v + 1) % FIVE_STAR.length);
        setFade(true);
      }, 250);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const r = FIVE_STAR[i]!;

  return (
    <div
      className={`rounded-xl border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] p-4 transition-opacity duration-250 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center gap-2">
        <Stars value={5} size={12} />
        {r.photo ? (
          <img src={r.photo} alt={`${r.name}'s review photo`} className="h-5 w-5 shrink-0 rounded-full object-cover" loading="lazy" />
        ) : (
          <span
            style={serif}
            className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color:var(--cw-brand-deep)] text-[10px] text-[color:var(--cw-bg)]"
          >
            {r.name.charAt(0)}
          </span>
        )}
      </div>
      <p style={sans} className="mt-1.5 line-clamp-3 text-[13px] leading-5 text-[color:var(--cw-muted)]">
        “{r.body}”
      </p>
      <p style={sans} className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--cw-brand-deep)]">
        {r.name} · Verified Buyer
      </p>
    </div>
  );
}

const PRODUCT_ID = "silkbrush";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function WriteReview({ onDone }: { onDone: (r: Review) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(5);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const inputCls =
    "w-full rounded-md border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)] px-3 py-2 text-[14px] text-[color:var(--cw-ink)] outline-none focus:border-[color:var(--gold-deep)]";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!name.trim() || !title.trim() || !body.trim()) {
      setErr("Please fill in your name, a title, and your review.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("product_reviews").insert({
      product_id: PRODUCT_ID,
      name: name.trim().slice(0, 80),
      title: title.trim().slice(0, 120),
      body: body.trim().slice(0, 2000),
      rating,
    });
    setBusy(false);
    if (error) {
      setErr("Sorry, we couldn't save your review. Please try again.");
      return;
    }
    onDone({
      name: name.trim(),
      rating,
      date: fmtDate(new Date().toISOString()),
      title: title.trim(),
      body: body.trim(),
    });
    setDone(true);
    setName("");
    setTitle("");
    setBody("");
    setRating(5);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={sans}
        className="mt-6 border border-[color:var(--gold-deep)] px-8 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-[color:var(--gold-deep)] transition hover:bg-[color:var(--gold-deep)] hover:text-white"
      >
        Write a review
      </button>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mt-6 w-full max-w-xl rounded-xl border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] p-5 text-left"
    >
      {done && (
        <p style={sans} className="mb-3 text-[13px] font-semibold text-[color:var(--gold-deep)]">
          Thank you! Your review has been posted.
        </p>
      )}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => setRating(n)}
            className={`text-[22px] leading-none ${n <= rating ? "text-[color:var(--gold-deep)]" : "text-[color:var(--cw-line)]"}`}
          >
            ★
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-3">
        <input className={inputCls} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
        <input className={inputCls} placeholder="Review title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />
        <textarea
          className={`${inputCls} min-h-24`}
          placeholder="Tell us about your experience"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
        />
      </div>
      {err && (
        <p style={sans} className="mt-2 text-[12px] text-red-600">
          {err}
        </p>
      )}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={busy}
          style={sans}
          className="border border-[color:var(--gold-deep)] bg-[color:var(--gold-deep)] px-7 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white disabled:opacity-60"
        >
          {busy ? "Posting…" : "Post review"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={sans}
          className="text-[12px] uppercase tracking-[0.14em] text-[color:var(--cw-muted)]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export function SilkReviews({ id = "reviews" }: { id?: string }) {
  const [count, setCount] = useState(INITIAL);
  const [added, setAdded] = useState<Review[]>([]);

  useEffect(() => {
    let alive = true;
    supabase
      .from("product_reviews")
      .select("name,title,body,rating,image_url,created_at")
      .eq("product_id", PRODUCT_ID)
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => {
        if (!alive || !data) return;
        setAdded(
          data.map((r) => ({
            name: r.name,
            rating: r.rating,
            date: fmtDate(r.created_at),
            title: r.title,
            body: r.body,
            photo: r.image_url ?? undefined,
          })),
        );
      });
    return () => {
      alive = false;
    };
  }, []);

  const all = [...added, ...REVIEWS];
  const shown = all.slice(0, count);


  return (
    <section id={id} className="scroll-mt-20 border-t border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="flex flex-col items-center text-center">
          <h2 style={serif} className="text-[32px] leading-[1.05] md:text-[44px]">
            Loved by 2,348 people
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <Stars value={4.8} size={18} />
            <span style={sans} className="text-[14px] font-semibold text-[color:var(--cw-ink)]">
              4.8
            </span>
            <span style={sans} className="text-[13px] text-[color:var(--cw-muted)]">
              2,348 reviews
            </span>
          </div>
          <WriteReview onDone={(r) => setAdded((a) => [r, ...a])} />
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {shown.map((r) => (
            <article
              key={r.name + r.date}
              className="break-inside-avoid overflow-hidden rounded-xl border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]"
            >
              {r.photo && <img src={r.photo} alt={`Review photo from ${r.name}`} className="aspect-[9/16] w-full bg-[color:var(--cw-bg)] object-contain" loading="lazy" />}
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <Stars value={r.rating} size={13} />
                  <span style={sans} className="text-[10px] uppercase tracking-[0.14em] text-[color:var(--cw-muted)]">
                    {r.date}
                  </span>
                </div>
                <p style={sans} className="mt-2 text-[13px] font-bold text-[color:var(--cw-ink)]">
                  {r.title}
                </p>
                <p style={sans} className="mt-1 break-words text-[13px] leading-6 text-[color:var(--cw-muted)]">
                  {r.body}
                </p>
                <p style={sans} className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--cw-brand-deep)]">
                  {r.name} · Verified
                </p>
              </div>
            </article>
          ))}
        </div>

        {count < all.length && (
          <button
            onClick={() => setCount((c) => c + 12)}
            style={sans}
            className="mx-auto mt-8 block border border-[color:var(--gold-deep)] px-8 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-[color:var(--gold-deep)] transition hover:bg-[color:var(--gold-deep)] hover:text-white"
          >
            Load more reviews
          </button>
        )}
      </div>
    </section>
  );
}
