import { useState } from "react";
import { sans, serif, Stars } from "@/components/site/Silk";
import r1 from "@/assets/sbr-1.webp.asset.json";
import r2 from "@/assets/sbr-2.webp.asset.json";
import r3 from "@/assets/sbr-3.webp.asset.json";
import r4 from "@/assets/sbr-4.webp.asset.json";
import r5 from "@/assets/sbr-5.webp.asset.json";
import r6 from "@/assets/sbr-6.webp.asset.json";
import r7 from "@/assets/sbr-7.webp.asset.json";
import r8 from "@/assets/sbr-8.webp.asset.json";
import r9 from "@/assets/sbr-9.webp.asset.json";
import r10 from "@/assets/sbr-10.webp.asset.json";

const PHOTOS = [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10].map((p) => p.url);

type Review = { name: string; rating: number; date: string; title: string; body: string; photo?: string };

const REVIEWS: Review[] = [
  { name: "Kayla M.", rating: 5, date: "Aug 12, 2026", title: "obsessed ngl", body: "ok so i wasnt expecting much for a brush but my hair legit looks like i blow dried it and i didnt. no frizz halo anymore. i use it every morning now", photo: PHOTOS[0] },
  { name: "Brianna R.", rating: 5, date: "Aug 9, 2026", title: "shiny!!", body: "my hair is so shiny after like a week of using this. my roommate asked what i changed lol. only thing is you gotta clean it every few days but thats every brush", photo: PHOTOS[1] },
  { name: "Sofia G.", rating: 5, date: "Aug 4, 2026", title: "worth it", body: "i keep it in my car cus i always forget to brush before work. dries my hair less crazy then my old one, doesnt pull at all", photo: PHOTOS[2] },
  { name: "Maddie T.", rating: 4, date: "Jul 30, 2026", title: "good brush", body: "does what it says. hair looks smoother, not straight straight but way less poofy. took like 3 days to notice", photo: PHOTOS[3] },
  { name: "Alina P.", rating: 5, date: "Jul 27, 2026", title: "no more flyaways", body: "the little baby hairs on top of my head used to drive me insane. this actually lays them down without gel or anything", photo: PHOTOS[4] },
  { name: "Denise W.", rating: 5, date: "Jul 22, 2026", title: "im 41 and", body: "my hair been dry for years from coloring. this thing spreads the oils down so the ends dont look fried anymore. wish i got it sooner honestly", photo: PHOTOS[5] },
  { name: "Priya N.", rating: 5, date: "Jul 18, 2026", title: "thick hair approved", body: "i got super thick hair and most brushes just sit on top. this one gets thru it, doesnt snag, and my hair looks glossy after", photo: PHOTOS[6] },
  { name: "Jess L.", rating: 5, date: "Jul 14, 2026", title: "love it", body: "wasnt gonna leave a review but this is my fav thing i bought this yr. hair feels soft not staticy. also its cute", photo: PHOTOS[7] },
  { name: "Emma C.", rating: 5, date: "Jul 9, 2026", title: "smooth", body: "brushing thru my hair after the shower used to rip half of it out. barely any hair in the brush now which is wild", photo: PHOTOS[8] },
  { name: "Nicole B.", rating: 5, date: "Jul 3, 2026", title: "shiny hair era", body: "genuinely my hair has never been this shiny and im not even using product. bought a 2nd one for my sister", photo: PHOTOS[9] },
  { name: "Hannah S.", rating: 5, date: "Jun 29, 2026", title: "yesss", body: "the handle feels nice, not cheap plastic. and my hair doesnt static out in the morning anymore" },
  { name: "Amber K.", rating: 4, date: "Jun 25, 2026", title: "solid", body: "it works, hair is def smoother. only reason 4 stars is shipping took a lil longer then i thought" },
  { name: "Tori V.", rating: 5, date: "Jun 21, 2026", title: "no more frizz", body: "humid where i live so frizz is a whole personality. this cut it down like a lot. not magic but big difference" },
  { name: "Leah D.", rating: 5, date: "Jun 17, 2026", title: "so good", body: "i brush at night now instead of the morning and wake up with actual nice hair. sounds fake but its true" },
  { name: "Camila F.", rating: 5, date: "Jun 12, 2026", title: "buy it", body: "been thru so many brushes from target that break. this one feels sturdy and my ends look healthier" },
  { name: "Rachel O.", rating: 5, date: "Jun 8, 2026", title: "hair looks expensive", body: "thats it thats the review. looks like i left the salon and i just brushed it for 2 min" },
  { name: "Mia H.", rating: 4, date: "Jun 3, 2026", title: "pretty happy", body: "works better on dry hair for me, wet hair it kinda tugs. once i figured that out its been great" },
  { name: "Grace A.", rating: 5, date: "May 30, 2026", title: "my mom stole mine", body: "literally had to order another one bc my mom took it. she said her hair feels thicker w it lol" },
  { name: "Elena Z.", rating: 5, date: "May 26, 2026", title: "smooth + shiny", body: "i have fine hair that gets greasy fast, was scared this would make it worse but nope. just shinier" },
  { name: "Bella J.", rating: 5, date: "May 21, 2026", title: "10/10", body: "no more brushing my hair with a comb and looking like a lion after. big fan" },
  { name: "Jordan Q.", rating: 5, date: "May 17, 2026", title: "actually works", body: "im picky w hair stuff and this suprised me. the boar bristles do somethin to the texture, feels silkier" },
  { name: "Kelsey R.", rating: 4, date: "May 12, 2026", title: "nice", body: "good quality for the price. wish it came in a darker wood but thats me being picky" },
  { name: "Aisha M.", rating: 5, date: "May 8, 2026", title: "curly girl take", body: "i use it on dry hair for a sleek pony and it lays everything down perfect. no gel needed" },
  { name: "Sam T.", rating: 5, date: "May 3, 2026", title: "gift approved", body: "got 2 for my daughters and they both love it. one of em texted me a pic of her hair lol" },
  { name: "Vanessa L.", rating: 5, date: "Apr 28, 2026", title: "frizz gone", body: "3 weeks in and my hair just behaves now. i dont straighten as much which is the real win" },
  { name: "Erin P.", rating: 5, date: "Apr 24, 2026", title: "love", body: "soft on the scalp, feels kinda like a massage. i brush way longer then i need to ngl" },
  { name: "Chloe W.", rating: 5, date: "Apr 19, 2026", title: "shine", body: "the shine is real. my hair catches light now instead of looking dull and flat" },
  { name: "Tanya B.", rating: 4, date: "Apr 15, 2026", title: "good", body: "does the job. gotta clean the bristles more often then i expected but not a big deal" },
  { name: "Olivia N.", rating: 5, date: "Apr 10, 2026", title: "no breakage", body: "used to have little broken hairs everywhere. way less now. my hair actually growing past my shoulders" },
  { name: "Marisol E.", rating: 5, date: "Apr 6, 2026", title: "muy bueno", body: "my hair is thick and wavy and this makes it look done without heat. love that i skip the flat iron most days" },
  { name: "Ashley D.", rating: 5, date: "Apr 1, 2026", title: "everyday brush", body: "replaced every other brush i own. the rest are in a drawer collecting dust" },
  { name: "Naomi K.", rating: 5, date: "Mar 27, 2026", title: "sleek", body: "i work in an office and my hair always looked messy by noon. now it stays smooth all day" },
  { name: "Paige S.", rating: 5, date: "Mar 23, 2026", title: "worth every penny", body: "i was skeptical for a brush this price but nah its good. feels way nicer than the cheap ones" },
  { name: "Whitney A.", rating: 4, date: "Mar 18, 2026", title: "happy", body: "smoother hair for sure. took me a lil bit to get used to brushing in sections but worth it" },
  { name: "Kira Y.", rating: 5, date: "Mar 14, 2026", title: "silky", body: "name checks out lol. hair feels like silk after. also doesnt hurt my scalp like the plastic ones" },
  { name: "Dani M.", rating: 5, date: "Mar 9, 2026", title: "great", body: "my hair is bleached and fragile and this doesnt destroy it. thats all i wanted honestly" },
  { name: "Selena C.", rating: 5, date: "Mar 4, 2026", title: "buy 2", body: "get the 2 pack, one for home one for your bag. i keep mine in my purse and touch up before dates" },
  { name: "Ivy R.", rating: 5, date: "Feb 27, 2026", title: "wow", body: "didnt think a brush could change anything but my hair looks healthier in pics now. no more frizz halo" },
  { name: "Lauren F.", rating: 5, date: "Feb 22, 2026", title: "so soft", body: "my daughter has fine hair that tangles bad and she doesnt cry when i brush it now. thats a win" },
  { name: "Monique T.", rating: 5, date: "Feb 16, 2026", title: "keeper", body: "had it a few months, still looks brand new. bristles havent bent or nothing. good buy" },
];

const INITIAL = 12;

export function SilkReviews({ id = "reviews" }: { id?: string }) {
  const [count, setCount] = useState(INITIAL);
  const shown = REVIEWS.slice(0, count);

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
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {shown.map((r) => (
            <article
              key={r.name + r.date}
              className="break-inside-avoid overflow-hidden rounded-xl border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]"
            >
              {r.photo && <img src={r.photo} alt={`Review photo from ${r.name}`} className="w-full object-cover" loading="lazy" />}
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

        {count < REVIEWS.length && (
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
