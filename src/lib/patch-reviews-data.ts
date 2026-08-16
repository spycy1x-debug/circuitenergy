import p1 from "@/assets/prv-1.webp.asset.json";
import p2 from "@/assets/prv-2.webp.asset.json";
import p3 from "@/assets/prv-3.webp.asset.json";
import p4 from "@/assets/prv-4.webp.asset.json";
import p5 from "@/assets/prv-5.webp.asset.json";
import p6 from "@/assets/prv-6.webp.asset.json";
import p7 from "@/assets/prv-7.webp.asset.json";
import p8 from "@/assets/prv-8.webp.asset.json";
import p9 from "@/assets/prv-9.webp.asset.json";
import p10 from "@/assets/prv-10.webp.asset.json";

export type PatchReview = {
  id: string;
  name: string;
  rating: number;
  date: string;
  title?: string;
  body: string;
  photo?: string;
  photoAlt?: string;
};

export const PATCH_REVIEW_COUNT = 3127;
export const PATCH_AVG_RATING = 4.8;
export const PATCH_RATING_BREAKDOWN = [
  { stars: 5, count: 2534 },
  { stars: 4, count: 439 },
  { stars: 3, count: 106 },
  { stars: 2, count: 31 },
  { stars: 1, count: 17 },
];

export const PATCH_REVIEWS: PatchReview[] = [
  {
    id: "p1",
    name: "Hailey B.",
    rating: 5,
    date: "Aug 9, 2026",
    title: "woke up and it was just… flat",
    body: "had a huge one coming in on my cheek before a wedding. slapped one on before bed, woke up and it was basically flat. still a little pink but makeup covered it easy",
    photo: p1.url,
    photoAlt: "Customer wearing an LED patch on her cheek",
  },
  {
    id: "p2",
    name: "Cole M.",
    rating: 5,
    date: "Aug 6, 2026",
    title: "my sister made me try it",
    body: "didnt think a sticker with a light in it would do anything ngl. wore it watching tv for like an hour and the red around it chilled out way faster than usual. im 17 and my skin freaks out constantly so this is staying",
    photo: p2.url,
    photoAlt: "Customer relaxing on the couch wearing a red light patch",
  },
  {
    id: "p3",
    name: "Mei L.",
    rating: 5,
    date: "Aug 3, 2026",
    title: "morning routine now",
    body: "i put one on when i wake up and do my emails. by the time im getting dressed the bump is way less angry. also it actually stays on, doesnt peel off like the cheap ones",
    photo: p3.url,
    photoAlt: "Customer wearing a glowing patch in the morning",
  },
  {
    id: "p4",
    name: "Jenny K.",
    rating: 5,
    date: "Jul 30, 2026",
    title: "the deep painful ones",
    body: "i get those under the skin cystic ones that never come to a head. normal patches do NOTHING for those. this one actually helped, took two nights but the soreness went away first which was the biggest thing for me",
    photo: p4.url,
    photoAlt: "Customer wearing a red light patch at night",
  },
  {
    id: "p5",
    name: "Sofia R.",
    rating: 5,
    date: "Jul 27, 2026",
    title: "stopped me from picking",
    body: "honestly the main win is i cant touch it while its on. i pick at everything and thats always what makes it scar. two weeks of using these and my cheek looks so much calmer",
    photo: p5.url,
    photoAlt: "Customer taking a mirror selfie wearing a patch",
  },
  {
    id: "p6",
    name: "Priya S.",
    rating: 5,
    date: "Jul 24, 2026",
    title: "flat and clear, no scar",
    body: "used it on one right by my ear that i normally would have ended up with a dark mark from. no mark at all this time. the hydrocolloid pulls a crazy amount out too, kinda gross kinda satisfying",
    photo: p6.url,
    photoAlt: "Close up of a patch worn on the cheek",
  },
  {
    id: "p7",
    name: "Maddie & Ro",
    rating: 5,
    date: "Jul 21, 2026",
    title: "we share a box",
    body: "roommates, we both get breakouts around the same time lol. got the 3 get 3 free and split it. we do them at night doing homework. def worth it, way cheaper than the derm appt i was gonna book",
    photo: p7.url,
    photoAlt: "Two customers, one wearing a glowing LED patch",
  },
  {
    id: "p8",
    name: "Camila V.",
    rating: 5,
    date: "Jul 18, 2026",
    title: "wore it in the car",
    body: "put one on driving to work bc why not, nobody could really tell it was lit up. by lunch the swelling was down. i keep two in my bag now at all times",
    photo: p8.url,
    photoAlt: "Customer wearing a patch while in the car",
  },
  {
    id: "p9",
    name: "Rachel T.",
    rating: 5,
    date: "Jul 15, 2026",
    title: "works on the little cluster ones",
    body: "i had like 3 small ones grouped on my jaw. did one patch each over two nights and theyre basically gone. the light is gentle, no burning or tingling at all",
    photo: p9.url,
    photoAlt: "Customer wearing a patch on her cheek",
  },
  {
    id: "p10",
    name: "Devin A.",
    rating: 5,
    date: "Jul 12, 2026",
    title: "guy who never does skincare",
    body: "i literally own face wash and thats it. this is easy enough that i actually use it. stick it on, forget about it, wake up, its smaller. thats all i wanted",
    photo: p10.url,
    photoAlt: "Customer wearing a red light patch on his cheek",
  },

  { id: "p11", name: "Tessa W.", rating: 5, date: "Aug 12, 2026", title: "overnight difference", body: "not a miracle but genuinely way faster than just a plain patch. maybe half the time?" },
  { id: "p12", name: "Nora J.", rating: 5, date: "Aug 11, 2026", body: "the light turning on when you press it is weirdly satisfying. also it doesnt fall off in my sleep which is the whole game" },
  { id: "p13", name: "Jaden P.", rating: 4, date: "Aug 10, 2026", title: "good, wish there were more per box", body: "works, no complaints on that. i just go through them fast during a bad week" },
  { id: "p14", name: "Aisha M.", rating: 5, date: "Aug 8, 2026", title: "no dark marks", body: "im deeper skinned and every pimple used to leave a mark for months. using these the marks are way lighter, thats the biggest deal for me" },
  { id: "p15", name: "Owen C.", rating: 5, date: "Aug 7, 2026", body: "16, play basketball, sweat a lot. these still stick. put one on after practice and it held all night" },
  { id: "p16", name: "Lily H.", rating: 5, date: "Aug 5, 2026", title: "before a date", body: "one popped up 4 hrs before dinner. wore it, took it off, put concealer on and you genuinely couldnt see it. saved me" },
  { id: "p17", name: "Marcus D.", rating: 5, date: "Aug 4, 2026", body: "the blue light thing is real i guess. mine dont get as big anymore when i catch them early" },
  { id: "p18", name: "Grace N.", rating: 4, date: "Aug 2, 2026", title: "takes 2 rounds sometimes", body: "for the big ones one night isnt enough for me, takes two. still faster than waiting a week" },
  { id: "p19", name: "Bella F.", rating: 5, date: "Aug 1, 2026", body: "i have super sensitive skin, benzoyl peroxide destroys me. this doesnt irritate at all. no peeling no burning" },
  { id: "p20", name: "Kai R.", rating: 5, date: "Jul 31, 2026", title: "worth it", body: "was skeptical at the price then i did the math vs what i was spending on spot treatments that dont work. easy" },
  { id: "p21", name: "Sarah G.", rating: 5, date: "Jul 29, 2026", body: "the pain goes away first which nobody tells you. like within an hour it stops throbbing" },
  { id: "p22", name: "Ryan T.", rating: 5, date: "Jul 28, 2026", body: "shipping was quick, got mine in 3 days. product does what it says" },
  { id: "p23", name: "Elena B.", rating: 5, date: "Jul 26, 2026", title: "hormonal chin breakouts", body: "get them same week every month like clockwork. now i just patch them the second i feel one and they never get big" },
  { id: "p24", name: "Nick S.", rating: 3, date: "Jul 25, 2026", title: "ok not amazing", body: "helped a bit. maybe my skin is just stubborn. customer service was nice about it though" },
  { id: "p25", name: "Amara O.", rating: 5, date: "Jul 23, 2026", body: "wore one to bed and my bf didnt even notice till the light caught his eye lol. very thin, doesnt feel like anything" },
  { id: "p26", name: "Chloe D.", rating: 5, date: "Jul 22, 2026", title: "less redness by morning", body: "thats the main thing. the bump might still be there a little but the angry red ring is gone" },
  { id: "p27", name: "Ethan V.", rating: 5, date: "Jul 20, 2026", body: "17m. my mom bought these. now she keeps stealing them so we ordered more" },
  { id: "p28", name: "Zoe A.", rating: 5, date: "Jul 19, 2026", body: "wore one all day at work under my mask thing and it stayed put. nobody said anything" },
  { id: "p29", name: "Hannah L.", rating: 4, date: "Jul 17, 2026", body: "solid. only note is take it off gently if you have dry skin, i yanked one and it stung" },
  { id: "p30", name: "Diego M.", rating: 5, date: "Jul 16, 2026", title: "beard area", body: "get ingrowns along my jaw and these calm them fast. sticks fine over short stubble" },
  { id: "p31", name: "Ivy K.", rating: 5, date: "Jul 14, 2026", body: "the fact you can see the gunk it pulled out is disgusting and i love it" },
  { id: "p32", name: "Trevor B.", rating: 5, date: "Jul 13, 2026", body: "no smell, no goop, no waiting for it to dry. just a sticker. perfect" },
  { id: "p33", name: "Naomi C.", rating: 5, date: "Jul 11, 2026", title: "college dorm essential", body: "stress breakouts during finals were brutal. these got me through. everyone on my floor asked what they were" },
  { id: "p34", name: "Luca F.", rating: 5, date: "Jul 10, 2026", body: "bought the buy 3 get 3 and honestly glad i did, i use one like every other day" },
  { id: "p35", name: "Priscilla Y.", rating: 5, date: "Jul 8, 2026", body: "asian skin, i scar SO easily. two months in and my cheeks look even for the first time in years" },
  { id: "p36", name: "Jonah W.", rating: 4, date: "Jul 7, 2026", body: "good product. wish the light lasted longer per patch but it does the job in the window it has" },
  { id: "p37", name: "Maya S.", rating: 5, date: "Jul 5, 2026", title: "flew with them", body: "brought some on vacation, hotel air always breaks me out. used 3 the whole trip and came back with clear skin somehow" },
  { id: "p38", name: "Ben H.", rating: 5, date: "Jul 4, 2026", body: "my derm said light therapy actually has research behind it so i figured id try the cheap version. works" },
  { id: "p39", name: "Talia R.", rating: 5, date: "Jul 2, 2026", body: "used it on my chest not just my face and it worked the same. didnt know if that was ok but it was" },
  { id: "p40", name: "Andre J.", rating: 5, date: "Jul 1, 2026", body: "the 60 day thing is what made me buy. didnt need it, but nice knowing" },
  { id: "p41", name: "Sienna P.", rating: 5, date: "Jun 29, 2026", title: "picker in recovery lol", body: "if i can physically not touch it, it heals. this is basically a lock on my face" },
  { id: "p42", name: "Wes K.", rating: 5, date: "Jun 27, 2026", body: "simple. sticks. glows. spot smaller. thats the review" },
  { id: "p43", name: "Farrah D.", rating: 5, date: "Jun 26, 2026", body: "ordered on a whim after seeing it on tiktok, actually lives up to it which never happens" },
  { id: "p44", name: "Isabel T.", rating: 5, date: "Jun 24, 2026", body: "my 15 yr old daughter uses these and she actually looks forward to it. that alone is worth the money" },
  { id: "p45", name: "Colin M.", rating: 2, date: "Jun 22, 2026", title: "one didnt light up", body: "one out of my box was dead. they replaced it no questions but knocking stars for the qc" },
  { id: "p46", name: "Rina S.", rating: 5, date: "Jun 21, 2026", body: "no residue when you peel it off. hate when patches leave that sticky ring" },
  { id: "p47", name: "Josh N.", rating: 5, date: "Jun 19, 2026", body: "put one on before a shift and forgot about it entirely. thats how comfortable it is" },
  { id: "p48", name: "Ana G.", rating: 5, date: "Jun 17, 2026", title: "faster than anything ive used", body: "ive tried sulfur, salicylic, tea tree, the works. this beats all of it for a single spot overnight" },
  { id: "p49", name: "Peyton L.", rating: 4, date: "Jun 15, 2026", body: "really good for surface stuff, decent for deep stuff. still reordering" },
  { id: "p50", name: "Dominic R.", rating: 5, date: "Jun 13, 2026", body: "skin has been the calmest its been since like 8th grade. im 22. wish i had these back then honestly" },
];
