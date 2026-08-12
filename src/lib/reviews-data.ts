import a1 from "@/assets/nrv-1.webp.asset.json";
import a2 from "@/assets/nrv-2.webp.asset.json";
import a3 from "@/assets/nrv-3.webp.asset.json";
import a4 from "@/assets/nrv-4.webp.asset.json";
import a5 from "@/assets/nrv-5.webp.asset.json";
import a6 from "@/assets/nrv-6.webp.asset.json";
import a7 from "@/assets/nrv-7.webp.asset.json";
import a8 from "@/assets/nrv-8.webp.asset.json";
import a9 from "@/assets/nrv-9.webp.asset.json";
import a10 from "@/assets/nrv-10.webp.asset.json";

export type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  title?: string;
  body: string;
  photo?: string;
  photoAlt?: string;
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Danielle M.",
    rating: 5,
    date: "Jul 28, 2026",
    title: "ok this actually worked",
    body:
      "i take it right when i wake up, before i even brush my teeth lol. week one i didnt notice much, honestly almost stopped. but by like week 3 my stomach stopped doing that heavy bloated thing after dinner. not magic, just easier. im on my second bottle now",
    photo: a1.url,
    photoAlt: "Customer holding a NOURISH bottle in her bathroom",
  },
  {
    id: "r2",
    name: "Kyle R.",
    rating: 5,
    date: "Jul 21, 2026",
    title: "desk job guy, 2pm crash was killing me",
    body:
      "sit at a laptop all day and i was hitting a wall around 2 every single day. been on this about 6 wks. afternoons are way less rough now. cant say its 100% the pills but its the only thing i changed so",
    photo: a2.url,
    photoAlt: "Customer pointing at a NOURISH bottle on his desk",
  },
  {
    id: "r3",
    name: "Steph K.",
    rating: 5,
    date: "Jul 15, 2026",
    title: "doesnt wreck my stomach pre workout",
    body:
      "i lift in the garage at 6am and most iron supplements make me nauseous. this one doesnt, no idea why but ill take it. also im way more regular which sounds gross to say but thats the whole reason i bought it",
    photo: a3.url,
    photoAlt: "Customer holding NOURISH in her home gym",
  },
  {
    id: "r4",
    name: "Carol W.",
    rating: 5,
    date: "Jul 9, 2026",
    title: "my daughter got me on these",
    body:
      "im 61 and i eat like a bird these days so my doctor said i was low on b12. my daughter found these. easy to swallow, no fishy taste, no upset stomach. been about two months and i just feel a bit more like myself in the evenings",
    photo: a4.url,
    photoAlt: "Customer relaxing on the couch holding NOURISH",
  },
  {
    id: "r5",
    name: "Mark T.",
    rating: 4,
    date: "Jul 2, 2026",
    title: "good, wish it shipped faster",
    body:
      "keep a bottle in the truck cause i forget at home. works for me, meals sit better and im not popping tums after lunch anymore. only knocking a star cause my second order took a few extra days",
    photo: a5.url,
    photoAlt: "Customer holding NOURISH in his car",
  },
  {
    id: "r6",
    name: "Linda P.",
    rating: 5,
    date: "Jun 24, 2026",
    title: "with oatmeal every morning",
    body:
      "i take mine with breakfast and coffee. no nausea at all which was my worry cause iron usually kills me. 8 weeks in. hair feels a little thicker too but honestly could be the haircut lol",
    photo: a6.url,
    photoAlt: "Customer at her kitchen table with NOURISH",
  },
  {
    id: "r7",
    name: "Bri S.",
    rating: 5,
    date: "Jun 18, 2026",
    title: "eating less so i needed this",
    body:
      "ive been eating smaller portions and my energy tanked. this basically fills the gaps. one capsule, done, dont have to think about it. thats the part i like, i wont take 6 pills a day nobody has time",
    photo: a7.url,
    photoAlt: "Customer holding NOURISH in her bedroom",
  },
  {
    id: "r8",
    name: "Andres V.",
    rating: 5,
    date: "Jun 11, 2026",
    title: "coffee + this every morning",
    body:
      "coffee used to tear my stomach up. now i take one of these with it and honestly its fine. wife noticed im not complaining about my gut after dinner anymore, which she says is the real review",
    photo: a8.url,
    photoAlt: "Customer holding NOURISH and coffee in his kitchen",
  },
  {
    id: "r9",
    name: "Deb & Tony",
    rating: 5,
    date: "Jun 3, 2026",
    title: "we both take it",
    body:
      "ordered the 3 pack so we could both do it. hes better about remembering than me. about 7 weeks in for both of us, digestion is way calmer and we arent as wiped out after work. reordering",
    photo: a9.url,
    photoAlt: "Two customers in their kitchen holding NOURISH",
  },
  {
    id: "r10",
    name: "Sharon B.",
    rating: 5,
    date: "May 27, 2026",
    title: "finally one i can swallow",
    body:
      "capsule is normal sized thank god, some of these vitamins are horse pills. no weird aftertaste. took me about a month before i really noticed but now if i skip a couple days i can tell",
    photo: a10.url,
    photoAlt: "Customer holding up a bottle of NOURISH",
  },

  { id: "r11", name: "Jenna F.", rating: 5, date: "Jul 30, 2026", title: "less bloated by dinner", body: "3 weeks in. the after lunch bloat is basically gone. i dont unbutton my jeans at my desk anymore lol", photo: a7.url, photoAlt: "Customer holding NOURISH in her closet" },
  { id: "r12", name: "Robert H.", rating: 5, date: "Jul 26, 2026", body: "im 58 and just wanted something simple. one pill covers most of what my doc told me to take. no complaints", photo: a5.url, photoAlt: "Customer holding NOURISH in his car" },
  { id: "r13", name: "Marissa L.", rating: 4, date: "Jul 24, 2026", title: "took a while", body: "wasnt sure the first month tbh. week 5 ish it clicked. wish they said that louder before you buy but they kinda do" },
  { id: "r14", name: "Tyler J.", rating: 5, date: "Jul 22, 2026", body: "gym bro here. iron never sat right with me. this one doesnt make me queasy. thats it thats the review", photo: a8.url, photoAlt: "Customer holding NOURISH in his kitchen" },
  { id: "r15", name: "Anita R.", rating: 5, date: "Jul 19, 2026", title: "regular. finally.", body: "sorry for tmi but ive struggled with this for years. magnesium in here does something. mornings are predictable now", photo: a3.url, photoAlt: "Customer holding NOURISH in her home gym" },
  { id: "r16", name: "Chris D.", rating: 5, date: "Jul 17, 2026", body: "bought for my wife she stole my bottle so now we order 3 at a time", photo: a9.url, photoAlt: "Couple holding NOURISH in their kitchen" },
  { id: "r17", name: "Paula M.", rating: 5, date: "Jul 14, 2026", title: "no more 4 different bottles", body: "i was taking b12, iron, a probiotic and magnesium separately. cabinet is way cleaner now and its cheaper", photo: a6.url, photoAlt: "Customer with NOURISH at her kitchen table" },
  { id: "r18", name: "Nate W.", rating: 4, date: "Jul 12, 2026", body: "solid. energy is steadier. dont expect a coffee kick, its not that. its more like you just dont crash" },
  { id: "r19", name: "Yvette C.", rating: 5, date: "Jul 10, 2026", body: "i have a sensitive stomach and everything makes me sick. this didnt. thats huge for me" },
  { id: "r20", name: "Greg S.", rating: 5, date: "Jul 8, 2026", title: "subscription is easy", body: "set it and forget it. skipped one month when i still had extra and it took like 10 seconds" },
  { id: "r21", name: "Hannah T.", rating: 5, date: "Jul 6, 2026", body: "postpartum and running on empty. this helped more than the prenatal i was still taking honestly", photo: a1.url, photoAlt: "Customer holding NOURISH in her bathroom" },
  { id: "r22", name: "Dave K.", rating: 3, date: "Jul 4, 2026", title: "fine but pricey", body: "works ok. digestion better for sure. just wish the single bottle was cheaper. bought the 3 pack second time" },
  { id: "r23", name: "Monica A.", rating: 5, date: "Jul 1, 2026", body: "nails stopped peeling around week 6. wasnt even why i bought it lol" },
  { id: "r24", name: "Luis G.", rating: 5, date: "Jun 29, 2026", title: "travel a lot", body: "eating garbage on the road usually destroys me. been taking this and my stomach handles it way better" },
  { id: "r25", name: "Kate B.", rating: 5, date: "Jun 27, 2026", body: "the ginger thing actually helps. i get queasy in the morning and its much less" },
  { id: "r26", name: "Tom R.", rating: 5, date: "Jun 25, 2026", body: "60 caps, one a day, no math. i like that" },
  { id: "r27", name: "Priya N.", rating: 5, date: "Jun 22, 2026", title: "vegetarian and low iron", body: "my levels were always borderline. this is gentle enough that i actually keep taking it, thats the whole battle" },
  { id: "r28", name: "Shawn M.", rating: 4, date: "Jun 20, 2026", body: "good product. capsule smells a little herby when you open the bottle but whatever, doesnt taste like anything" },
  { id: "r29", name: "Ellen V.", rating: 5, date: "Jun 17, 2026", body: "im 67. my afternoons used to be a write off. not anymore. took about two months to really settle in", photo: a4.url, photoAlt: "Customer holding NOURISH on the couch" },
  { id: "r30", name: "Jordan P.", rating: 5, date: "Jun 15, 2026", title: "for once i finished the bottle", body: "i never finish supplements. finished this one and reordered before it ran out. thats new for me" },
  { id: "r31", name: "Renee D.", rating: 5, date: "Jun 13, 2026", body: "gut feels calmer, less gurgling after meals. husband says im less cranky, make of that what you will" },
  { id: "r32", name: "Bill O.", rating: 5, date: "Jun 10, 2026", body: "doc said keep taking it, numbers looked better at my last bloodwork. cant argue with that" },
  { id: "r33", name: "Camila S.", rating: 5, date: "Jun 8, 2026", title: "ozempic side effects", body: "eating way less so i wasnt getting nutrients. this fixed the run down feeling and the nausea is a lot better" },
  { id: "r34", name: "Aaron L.", rating: 4, date: "Jun 6, 2026", body: "does what it says. would love a bigger bottle option" },
  { id: "r35", name: "Trish H.", rating: 5, date: "Jun 4, 2026", body: "no jitters, no crash, no weird burps. thats a low bar but most supplements fail it" },
  { id: "r36", name: "Kevin B.", rating: 5, date: "Jun 1, 2026", body: "shipping was fast, got it in 2 days. been on it 5 weeks and the bloating after dinner is way down" },
  { id: "r37", name: "Nicole W.", rating: 5, date: "May 30, 2026", title: "worth the wait", body: "give it the 8 weeks they say. i almost quit at 3 and im glad i didnt" },
  { id: "r38", name: "Frank T.", rating: 5, date: "May 28, 2026", body: "simple, works, no nonsense label. i can read every ingredient which is more than i can say for the stuff at the store" },
  { id: "r39", name: "Alyssa J.", rating: 5, date: "May 25, 2026", body: "nurse, 12 hr shifts. i dont feel like im dragging by hour 9 anymore" },
  { id: "r40", name: "Doug E.", rating: 4, date: "May 22, 2026", body: "good stuff. only thing is i have to take it with food or it feels a little heavy" },
  { id: "r41", name: "Marta Q.", rating: 5, date: "May 20, 2026", body: "my mom takes it, i take it, we split the 3 pack. both of us notice the digestion difference", photo: a10.url, photoAlt: "Customer holding up a bottle of NOURISH" },
  { id: "r42", name: "Ian C.", rating: 5, date: "May 18, 2026", body: "was skeptical, ngl. 7 weeks later im ordering again so there you go" },
  { id: "r43", name: "Bethany R.", rating: 5, date: "May 15, 2026", title: "less snacky", body: "not sure if related but im not raiding the pantry at 3pm anymore. energy is just more even" },
  { id: "r44", name: "Omar F.", rating: 5, date: "May 12, 2026", body: "customer service answered me in like an hour when i asked about the subscription. product is good too" },
  { id: "r45", name: "Susan K.", rating: 5, date: "May 9, 2026", body: "im not a review person but this one earned it. two months, way less discomfort after eating" },
  { id: "r46", name: "Derek A.", rating: 4, date: "May 6, 2026", body: "helps. wouldnt say life changing but i notice when i stop, thats enough for me to keep buying" },
  { id: "r47", name: "Gina M.", rating: 5, date: "May 3, 2026", body: "the probiotic being in the same pill is the selling point for me. one less thing in the morning" },
  { id: "r48", name: "Wes B.", rating: 5, date: "Apr 30, 2026", body: "60 day guarantee is why i tried it. never needed it. on bottle 3" },
  { id: "r49", name: "Tara N.", rating: 5, date: "Apr 27, 2026", title: "my stomach is boring now", body: "and boring is exactly what i wanted. no rumbling no cramping no guessing" },
  { id: "r50", name: "Phil D.", rating: 5, date: "Apr 24, 2026", body: "wife bought it for me, i complained, now i take it every day without being told. shes very smug about it" },
];

export const REVIEW_COUNT = REVIEWS.length;
export const AVG_RATING =
  Math.round((REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length) * 10) / 10;
export const RATING_BREAKDOWN = [5, 4, 3, 2, 1].map((stars) => ({
  stars,
  count: REVIEWS.filter((r) => r.rating === stars).length,
}));
