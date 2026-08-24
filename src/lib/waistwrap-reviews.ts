import rvw1 from "@/assets/rvw-1.webp.asset.json";
import rvw2 from "@/assets/rvw-2.webp.asset.json";
import rvw3 from "@/assets/rvw-3.webp.asset.json";
import rvw4 from "@/assets/rvw-4.webp.asset.json";
import rvw5 from "@/assets/rvw-5.webp.asset.json";
import rvw6 from "@/assets/rvw-6.webp.asset.json";
import rvw7 from "@/assets/rvw-7.webp.asset.json";
import rvw8 from "@/assets/rvw-8.webp.asset.json";
import rvw9 from "@/assets/rvw-9.webp.asset.json";
import sp1 from "@/assets/sp-1.webp.asset.json";
import sp2 from "@/assets/sp-2.webp.asset.json";
import sp3 from "@/assets/sp-3.webp.asset.json";
import sp4 from "@/assets/sp-4.webp.asset.json";
import sp5 from "@/assets/sp-5.webp.asset.json";
import sp6 from "@/assets/sp-6.webp.asset.json";
import sp7 from "@/assets/sp-7.webp.asset.json";

export type WWReview = { n: string; r: number; d: string; t: string; img?: string };

export const WW_REVIEWS: WWReview[] = [
  { n: "Tanisha M.", r: 5, d: "2 weeks ago", t: "ok so i was NOT expecting this lol. put it on before work and by lunch i forgot i even had it on. my shirts fit way different now", img: rvw1.url },
  { n: "Brittany W.", r: 5, d: "1 week ago", t: "girl. GIRL. i tried on 3 outfits after wrapping it and every single one looked better. no hooks poking me either which was my main issue w my old one", img: rvw2.url },
  { n: "Keisha D.", r: 5, d: "3 weeks ago", t: "bought it for a wedding, ended up wearing it every day since. it doesnt roll down like the cheap ones from amazon", img: rvw3.url },
  { n: "Megan R.", r: 5, d: "5 days ago", t: "im 4 months postpartum and this is the first thing thats felt supportive without squeezing my ribs. wore it around the house all day", img: rvw4.url },
  { n: "Shanice B.", r: 5, d: "1 month ago", t: "the dress test lol. no lines no bulge nothing. my sister ordered one after she saw the pic", img: rvw5.url },
  { n: "Alicia J.", r: 5, d: "2 months ago", t: "wore this to dinner in a fitted dress and got asked twice if i lost weight 😭 i did not", img: rvw6.url },
  { n: "Nicole S.", r: 4, d: "3 weeks ago", t: "took me like two tries to figure out the right tightness, first day i went too tight. once i got it right its honestly perfect", img: rvw7.url },
  { n: "Jasmine T.", r: 5, d: "6 days ago", t: "black dress + this = done. thats it thats the review", img: rvw8.url },
  { n: "Danielle P.", r: 5, d: "1 month ago", t: "i have 2 other trainers sitting in my closet doing nothing since i got this. no zipper fighting in the morning is worth it alone", img: rvw9.url },
  { n: "Renee C.", r: 5, d: "2 weeks ago", t: "before and after pic dont lie. i didnt even suck in", img: sp1.url },
  { n: "Amara O.", r: 5, d: "1 week ago", t: "was skeptical bc ive wasted so much money on these things. this one actually stays where u put it", img: sp2.url },
  { n: "Lauren K.", r: 5, d: "4 weeks ago", t: "side profile is what got me. my stomach doesnt push out over my jeans anymore when i sit", img: sp3.url },
  { n: "Vanessa H.", r: 5, d: "3 days ago", t: "wore it 10 hrs at work standing. no digging, no readjusting in the bathroom every hour like my old one", img: sp4.url },
  { n: "Tori L.", r: 5, d: "5 weeks ago", t: "honestly the posture thing was a surprise, im sitting up straighter without trying", img: sp5.url },
  { n: "Marisol G.", r: 5, d: "2 months ago", t: "husband noticed before i said anything. worth every penny", img: sp6.url },
  { n: "Kayla F.", r: 5, d: "1 week ago", t: "i wear a size L and it fits perfect w room to tighten more later. ordering a 2nd in pink", img: sp7.url },
  { n: "Erica N.", r: 5, d: "3 weeks ago", t: "no hooks!!! thats it. thats what sold me. the hooks on my last one snapped in a target parking lot" },
  { n: "Sam A.", r: 5, d: "1 month ago", t: "washes good too, ive washed it like 6 times and it still snaps back same as day one" },
  { n: "Priya N.", r: 5, d: "2 weeks ago", t: "white tshirt test passed. cant see it at all which was the whole reason i bought it" },
  { n: "Chloe D.", r: 4, d: "6 weeks ago", t: "great product but wish it came in more colors. black is fine but id love a nude one" },
  { n: "Tia W.", r: 5, d: "4 days ago", t: "it just works?? idk what else to say. put it on and my waist looks 3 inches smaller instantly" },
  { n: "Rosa V.", r: 5, d: "1 month ago", t: "im plus size and most of these dont fit right on me. the 2xl fits great and doesnt roll" },
  { n: "Ashley B.", r: 5, d: "2 weeks ago", t: "got the 2 pack so i can wash one and wear the other. best decision" },
  { n: "Camille B.", r: 5, d: "3 months ago", t: "been wearing since january no joke. still holds tight, no stretched out elastic" },
  { n: "Deja R.", r: 5, d: "1 week ago", t: "the free posture thing they threw in is actually good too, i use it when im at my desk" },
  { n: "Monique S.", r: 5, d: "5 weeks ago", t: "shipping was quick, came in 4 days. fits like they said, i sized up like the chart says" },
  { n: "Hailey G.", r: 3, d: "2 months ago", t: "its good but took me a min to get used to. felt weird the first couple days then i stopped noticing it" },
  { n: "Yvette M.", r: 5, d: "3 weeks ago", t: "wore it under scrubs for a 12 hr shift. no complaints, didnt bunch up once" },
  { n: "Bianca P.", r: 5, d: "6 days ago", t: "ok the wrap style is so much better than hooks why did no one make this sooner" },
  { n: "Steph L.", r: 5, d: "1 month ago", t: "my jeans button easier lol. small thing but it made my whole week" },
  { n: "Aaliyah C.", r: 5, d: "2 weeks ago", t: "bought for vacation pics, ended up wearing it the whole trip. no red marks either" },
  { n: "Karen E.", r: 4, d: "7 weeks ago", t: "solid. only thing is i wish the instructions were a lil clearer, i watched their video and got it" },
  { n: "Imani F.", r: 5, d: "4 weeks ago", t: "i sit at a desk all day and my lower back doesnt ache like it used to. didnt expect that" },
  { n: "Gaby R.", r: 5, d: "3 days ago", t: "sizing was spot on. measured my waist, ordered M, fits like a glove" },
  { n: "Whitney A.", r: 5, d: "2 months ago", t: "ive told like 5 ppl at work about it already. 2 of them ordered" },
  { n: "Simone T.", r: 5, d: "1 week ago", t: "no zipper no hooks no fighting. wrap press done. takes me 10 seconds now" },
  { n: "Jenna K.", r: 5, d: "5 weeks ago", t: "the returns thing made me feel safe buying it but i obviously kept it lol" },
  { n: "Naomi B.", r: 5, d: "3 weeks ago", t: "under a bodycon and you genuinely cannot tell. that was my whole worry" },
  { n: "Latoya H.", r: 5, d: "2 weeks ago", t: "worth the money 100%. i spent more on 2 cheap ones that both fell apart in a month" },
  { n: "Emily Q.", r: 5, d: "4 days ago", t: "husband got me this as a gift and i thought it was gonna sit in a drawer. wear it 5x a week now" },
];
