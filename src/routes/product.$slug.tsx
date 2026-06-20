import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  FileText,
  X,
  Brain,
  Zap,
  Sparkles,
  Heart,
  Beaker,
  Clock,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Coffee,
  SlidersHorizontal,
  Image as ImageIcon,
} from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}
import neuralImg from "@/assets/neural-bottle.png";
import neuralOpen from "@/assets/neural-open.png";
import nmnImg from "@/assets/nmn-bottle.png";
import nmnTrio from "@/assets/nmn-trio.png";
import nmnBuiltDifferent from "@/assets/nmn-built-different-new.png";
import nmnWomanBalconyAsset from "@/assets/nmn-woman-balcony.png.asset.json";
import nmnEnergizeRepairAsset from "@/assets/nmn-energize-repair.png.asset.json";
import nmnKitchenHandAsset from "@/assets/nmn-kitchen-hand.png.asset.json";
import nmnNadChartAsset from "@/assets/nmn-nad-chart.png.asset.json";
import neuralHeroClean from "@/assets/neural-hero-clean.png";
import neuralHand from "@/assets/product-hand-kitchen.png";
import neuralCustomer from "@/assets/product-customer-thumbsup.png";
import neuralInfographic from "@/assets/product-benefits-infographic.png";
import neuralComparison from "@/assets/neural-built-different.png";
import neuralPdp2 from "@/assets/neural-pdp-2-thumbsup.png";
import neuralPdp3 from "@/assets/neural-pdp-3-infographic.png";
import neuralPdp4 from "@/assets/neural-pdp-4-comparison.png";
import neuralPdp5 from "@/assets/neural-pdp-5-handkitchen.png";
const nmnWomanBalcony = nmnWomanBalconyAsset.url;
const nmnEnergizeRepair = nmnEnergizeRepairAsset.url;
const nmnKitchenHand = nmnKitchenHandAsset.url;
const nmnNadChart = nmnNadChartAsset.url;
import supplementFacts from "@/assets/product-supplement-facts.png";
import reviewWomanBathroomAsset from "@/assets/review-woman-bathroom.png.asset.json";
import reviewWomanLaptopAsset from "@/assets/review-woman-laptop.png.asset.json";
import reviewManGymAsset from "@/assets/review-man-gym.png.asset.json";
import reviewBottleKitchenAsset from "@/assets/review-bottle-kitchen.png.asset.json";
import reviewNightstandAsset from "@/assets/review-nightstand-bottle.png.asset.json";
import reviewManSelfieAsset from "@/assets/review-man-selfie.png.asset.json";
import reviewWomanKitchenSelfieAsset from "@/assets/review-woman-kitchen-selfie.png.asset.json";
import reviewManGlassesSofaAsset from "@/assets/review-man-glasses-sofa.png.asset.json";
import reviewWomanCarSelfieAsset from "@/assets/review-woman-car-selfie.png.asset.json";
import reviewYoungManMirrorAsset from "@/assets/review-young-man-mirror.png.asset.json";
import reviewWomanMugKitchenAsset from "@/assets/review-woman-mug-kitchen.png.asset.json";
import reviewWomanGymCloseupAsset from "@/assets/review-woman-gym-closeup.png.asset.json";
const reviewWomanBathroom = reviewWomanBathroomAsset.url;
const reviewWomanLaptop = reviewWomanLaptopAsset.url;
const reviewManGym = reviewManGymAsset.url;
const reviewBottleKitchen = reviewBottleKitchenAsset.url;
const reviewNightstand = reviewNightstandAsset.url;
const reviewManSelfie = reviewManSelfieAsset.url;
const reviewWomanKitchenSelfie = reviewWomanKitchenSelfieAsset.url;
const reviewManGlassesSofa = reviewManGlassesSofaAsset.url;
const reviewWomanCarSelfie = reviewWomanCarSelfieAsset.url;
const reviewYoungManMirror = reviewYoungManMirrorAsset.url;
const reviewWomanMugKitchen = reviewWomanMugKitchenAsset.url;
const reviewWomanGymCloseup = reviewWomanGymCloseupAsset.url;
import { PRODUCTS } from "@/lib/cart";
import { shopifyCart } from "@/lib/shopify-cart";

const NMN_VARIANT_GID = "gid://shopify/ProductVariant/48124189704346";

type ProductData = {
  id: "neural" | "nmn";
  name: string;
  rating: number;
  reviews: number;
  images: string[];
  related: { id: "neural" | "nmn"; blurb: string };
  sample: { title: string; body: string; name: string; date: string };
};

type ReviewItem = {
  title: string;
  body: string;
  name: string;
  date: string;
  rating: number;
  image?: string;
  verified?: boolean;
  helpfulCount?: number;
  notHelpfulCount?: number;
};

const PRODUCT_DATA: Record<string, ProductData> = {
  "neural-performance": {
    id: "neural",
    name: "Circuit Neural Performance",
    rating: 4.8,
    reviews: 500,
    images: [neuralHeroClean, neuralPdp2, neuralPdp3, neuralPdp4, neuralPdp5, neuralOpen],
    related: { id: "nmn", blurb: "Pair with Neural Performance for complete energy and cognitive support." },
    sample: {
      title: "Brain fog is completely gone",
      body: "I've been taking Neural Performance every morning for 5 weeks. The difference in my focus is night and day. No jitters, no crash, just clear thinking from 8am to 6pm.",
      name: "James L.",
      date: "April 2, 2026",
    },
  },
  nmn: {
    id: "nmn",
    name: "Circuit NMN",
    rating: 4.6,
    reviews: 400,
    images: [nmnImg, nmnBuiltDifferent, nmnWomanBalcony, nmnEnergizeRepair, nmnKitchenHand, nmnNadChart, nmnTrio],
    related: { id: "neural", blurb: "Pair with NMN for complete energy and cognitive support." },
    sample: {
      title: "More energy, less drag",
      body: "Steadier energy, better mornings, and less of that afternoon fade. It took a few weeks, but it was worth it.",
      name: "Rachel D.",
      date: "March 16, 2026",
    },
  },
};

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = PRODUCT_DATA[params.slug];
    if (!product) throw notFound();
    return product;
  },
  component: ProductPage,
});

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} day${d === 1 ? "" : "s"} ago`;
  const w = Math.floor(d / 7);
  if (w < 5) return `${w} week${w === 1 ? "" : "s"} ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo} month${mo === 1 ? "" : "s"} ago`;
  const y = Math.floor(d / 365);
  return `${y} year${y === 1 ? "" : "s"} ago`;
}

function parseRelativeDate(input: string) {
  if (input === "Just now") return Date.now();
  const match = input.match(/(\d+)\s+(minute|hour|day|week|month|year)/i);
  if (!match) return Date.now();
  const value = Number(match[1]);
  const unit = match[2].toLowerCase();
  const multipliers: Record<string, number> = {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000,
  };
  return Date.now() - value * (multipliers[unit] || 0);
}

function ratingBreakdownFor(productId: ProductData["id"]) {
  return productId === "neural"
    ? [
        { stars: 5, pct: 79 },
        { stars: 4, pct: 12 },
        { stars: 3, pct: 6 },
        { stars: 2, pct: 2 },
        { stars: 1, pct: 1 },
      ]
    : [
        { stars: 5, pct: 74 },
        { stars: 4, pct: 14 },
        { stars: 3, pct: 8 },
        { stars: 2, pct: 3 },
        { stars: 1, pct: 1 },
      ];
}

function ProductPage() {
  const p = Route.useLoaderData() as ProductData;
  const [imgIdx, setImgIdx] = useState(0);
  const [showImageLightbox, setShowImageLightbox] = useState(false);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"why" | "ing" | "use" | "rev">("why");
  const [reviewsShown, setReviewsShown] = useState(8);
  const [userReviews, setUserReviews] = useState<ReviewItem[]>([]);
  const [reviewFilter, setReviewFilter] = useState<
    "recent" | "highest" | "lowest" | "verified" | "photos" | "5" | "4" | "3" | "2" | "1"
  >("recent");
  const [helpful, setHelpful] = useState<Record<string, "yes" | "no">>({});
  const [showLabel, setShowLabel] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [form, setForm] = useState<{ name: string; title: string; body: string; rating: number; image?: string }>({
    name: "",
    title: "",
    body: "",
    rating: 5,
  });

  useEffect(() => {
    let cancelled = false;
    import("@/integrations/supabase/client").then(({ supabase }) => {
      supabase
        .from("product_reviews")
        .select("name,title,body,rating,created_at")
        .eq("product_id", p.id)
        .order("created_at", { ascending: false })
        .limit(50)
        .then(({ data }) => {
          if (cancelled || !data) return;
          setUserReviews(
            data.map((r: any) => ({
              name: r.name,
              title: r.title,
              body: r.body,
              rating: r.rating,
              date: timeAgo(r.created_at),
              verified: true,
              helpfulCount: Math.max(2, Math.floor(r.rating * 1.5)),
              notHelpfulCount: 0,
            })),
          );
        });
    });
    return () => {
      cancelled = true;
    };
  }, [p.id]);

  useEffect(() => {
    if (!showImageLightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setImgIdx((idx) => (idx - 1 + p.images.length) % p.images.length);
      if (e.key === "ArrowRight") setImgIdx((idx) => (idx + 1) % p.images.length);
      if (e.key === "Escape") setShowImageLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showImageLightbox, p.images.length]);

  const extraReviews = useMemo(() => {
    const pool: ReviewItem[] =
      p.id === "neural"
        ? [
            {
              title: "Genuine focus, no jitters",
              body: "I've tried every nootropic on the market. This is the first one where I actually feel calm focus instead of caffeine anxiety. Two weeks in and my afternoon slump is gone.",
              name: "Marcus T.",
              date: "3 weeks ago",
              rating: 5,
              image: reviewManGym,
              verified: true,
              helpfulCount: 31,
              notHelpfulCount: 1,
            },
            {
              title: "Brain fog lifted in days",
              body: "Was skeptical but by day 4 I noticed I wasn't reaching for a third coffee. Reading retention is noticeably better.",
              name: "Priya S.",
              date: "1 month ago",
              rating: 5,
              image: reviewWomanBathroom,
              verified: true,
              helpfulCount: 28,
              notHelpfulCount: 0,
            },
            {
              title: "Great for deep work",
              body: "I write code for a living. This helps me hold complex problems in my head longer. Not magic, but real.",
              name: "Dev K.",
              date: "1 month ago",
              rating: 5,
              image: reviewBottleKitchen,
              verified: true,
              helpfulCount: 24,
              notHelpfulCount: 1,
            },
            {
              title: "Subtle but real",
              body: "Don't expect a rush. Expect to finish your to-do list without zoning out. That's exactly what I got.",
              name: "Hannah Reinholt",
              date: "2 months ago",
              rating: 4,
              image: reviewWomanLaptop,
              verified: true,
              helpfulCount: 18,
              notHelpfulCount: 2,
            },
            {
              title: "Late shift survivor",
              body: "I work nights and this has been a game changer for staying sharp during the 3am dead zone. No crash after.",
              name: "Greg M.",
              date: "2 months ago",
              rating: 5,
              image: reviewManSelfie,
              verified: true,
              helpfulCount: 21,
              notHelpfulCount: 1,
            },
            {
              title: "Mornings feel lighter",
              body: "I've been taking it before my morning routine and the difference is consistency. Cleaner focus, less friction, and I don't feel scattered by 10am.",
              name: "Lauren B.",
              date: "2 months ago",
              rating: 5,
              image: reviewWomanKitchenSelfie,
              verified: true,
              helpfulCount: 22,
              notHelpfulCount: 1,
            },
            {
              title: "Actually notice the difference",
              body: "Usually I need weeks to know if something is working. This felt obvious by the end of bottle one — better concentration and a much smoother workday.",
              name: "Daniel C.",
              date: "2 months ago",
              rating: 5,
              image: reviewManGlassesSofa,
              verified: true,
              helpfulCount: 17,
              notHelpfulCount: 0,
            },
            {
              title: "Clean focus before meetings",
              body: "I take this before busy client days and feel much more locked in. No edgy feeling, no weird crash, just stable attention.",
              name: "Brooke A.",
              date: "3 months ago",
              rating: 5,
              image: reviewWomanCarSelfie,
              verified: true,
              helpfulCount: 19,
              notHelpfulCount: 0,
            },
            {
              title: "Solid for studying",
              body: "This has become part of my morning routine. Memory recall during practice exams is sharper and I stay focused for longer blocks.",
              name: "Aisha M.",
              date: "3 months ago",
              rating: 5,
              image: reviewWomanGymCloseup,
              verified: true,
              helpfulCount: 20,
              notHelpfulCount: 1,
            },
            {
              title: "Easy daily win",
              body: "Feels smooth and dependable. Not flashy — just one of those products you quietly keep reordering because your day works better with it.",
              name: "Tyler M.",
              date: "3 months ago",
              rating: 5,
              image: reviewYoungManMirror,
              verified: true,
              helpfulCount: 14,
              notHelpfulCount: 0,
            },
            {
              title: "Coffee + this = best combo",
              body: "One capsule with breakfast and my first coffee has been the best setup for long mornings. Cleaner than my old stack.",
              name: "Melissa R.",
              date: "3 months ago",
              rating: 5,
              image: reviewWomanMugKitchen,
              verified: true,
              helpfulCount: 23,
              notHelpfulCount: 1,
            },
            {
              title: "On my nightstand every night",
              body: "I keep it right next to my water glass so I never forget. Mornings feel less foggy and I'm out the door faster.",
              name: "Trent H.",
              date: "2 months ago",
              rating: 5,
              image: reviewNightstand,
              verified: true,
              helpfulCount: 13,
              notHelpfulCount: 1,
            },
            {
              title: "Replaced two other supplements",
              body: "Cleaner formula than what I was stacking before. One capsule is a huge plus.",
              name: "Olivier B.",
              date: "2 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 12,
              notHelpfulCount: 1,
            },
            {
              title: "Took a few weeks",
              body: "First week I felt nothing. By week three the mental clarity was undeniable. Stick with it.",
              name: "Jordan L.",
              date: "3 months ago",
              rating: 4,
              verified: true,
              helpfulCount: 11,
              notHelpfulCount: 2,
            },
            {
              title: "Sharper meetings",
              body: "I run a small agency and back-to-back client calls used to wreck me. I'm clear-headed straight through now.",
              name: "Thandiwe O.",
              date: "3 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 15,
              notHelpfulCount: 0,
            },
            {
              title: "Wife noticed first",
              body: "She said I seemed more present before I even told her I was trying something new. That's when I knew.",
              name: "Cole Vandermeer",
              date: "4 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 10,
              notHelpfulCount: 0,
            },
            {
              title: "Finally a clean nootropic",
              body: "No racing heart, no comedown. Just a smooth lift in focus that lasts the whole workday.",
              name: "Dr. Elena Vasquez",
              date: "4 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 16,
              notHelpfulCount: 1,
            },
            {
              title: "ADHD-friendly",
              body: "This one quiets the noise without flattening me. Huge for getting through admin work.",
              name: "Reese N.",
              date: "5 months ago",
              rating: 5,
              verified: false,
              helpfulCount: 14,
              notHelpfulCount: 2,
            },
            {
              title: "Took it for a month before reviewing",
              body: "Wanted to be fair. Day 30: clearer mornings, sharper recall, less midday fog. Will reorder.",
              name: "Anastasia Liu-Park",
              date: "5 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 12,
              notHelpfulCount: 0,
            },
            {
              title: "Good, not life-changing",
              body: "Definitely helps with focus but I wouldn't say it transformed my life. Solid 4 stars from me.",
              name: "Mike R.",
              date: "5 months ago",
              rating: 4,
              verified: true,
              helpfulCount: 8,
              notHelpfulCount: 1,
            },
            {
              title: "Helped me finish my thesis",
              body: "The last six weeks of writing would have been miserable without this. Sustained focus is real.",
              name: "Kwame A.",
              date: "6 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 13,
              notHelpfulCount: 0,
            },
            {
              title: "Calm energy",
              body: "I describe it as caffeine without the personality change. My partner appreciates it.",
              name: "Sam P.",
              date: "6 months ago",
              rating: 5,
              verified: false,
              helpfulCount: 9,
              notHelpfulCount: 1,
            },
            {
              title: "Better than my old stack",
              body: "Was taking five different things. This replaced four of them. Cleaner mornings.",
              name: "Naoko W.",
              date: "6 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 10,
              notHelpfulCount: 0,
            },
            {
              title: "Subtle in the best way",
              body: "If you want to think more clearly without noticing you're trying, it's exactly it.",
              name: "Greg P.",
              date: "7 months ago",
              rating: 4,
              verified: false,
              helpfulCount: 6,
              notHelpfulCount: 1,
            },
            {
              title: "Reading speed up",
              body: "I read a lot for work. Noticed I was getting through dense reports faster around week 2.",
              name: "Adaeze O.",
              date: "7 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 8,
              notHelpfulCount: 0,
            },
            {
              title: "Subscribed",
              body: "Worth the money. I keep it in rotation and don't plan to stop.",
              name: "Lila",
              date: "8 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 9,
              notHelpfulCount: 1,
            },
            {
              title: "Helped with postpartum brain fog",
              body: "Cleared the haze after having my second. Felt like myself again within 3 weeks.",
              name: "Brianna E.",
              date: "9 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 11,
              notHelpfulCount: 0,
            },
            {
              title: "Honest 4 stars",
              body: "Works well. Wish it were a touch cheaper. Will keep buying though.",
              name: "Drew K.",
              date: "9 months ago",
              rating: 4,
              verified: true,
              helpfulCount: 7,
              notHelpfulCount: 2,
            },
            {
              title: "Decent, takes patience",
              body: "Took me almost a month to notice anything. Once it kicked in it was solid, but the slow ramp surprised me.",
              name: "Patrick H.",
              date: "5 months ago",
              rating: 3,
              verified: true,
              helpfulCount: 5,
              notHelpfulCount: 2,
            },
            {
              title: "Helps a little",
              body: "I get a mild lift in focus but nothing dramatic for me personally. Might just be my body chemistry.",
              name: "Eliza M.",
              date: "7 months ago",
              rating: 3,
              verified: false,
              helpfulCount: 4,
              notHelpfulCount: 2,
            },
            {
              title: "Capsule size is bigger than I expected",
              body: "The effect is real and I do feel sharper, just wish the capsule was a touch smaller.",
              name: "Yoon-Seo C.",
              date: "4 months ago",
              rating: 3,
              verified: true,
              helpfulCount: 4,
              notHelpfulCount: 1,
            },
            {
              title: "Subtle for me",
              body: "Did notice cleaner mornings but I expected more after reading the reviews.",
              name: "Robert F.",
              date: "6 months ago",
              rating: 2,
              verified: true,
              helpfulCount: 3,
              notHelpfulCount: 3,
            },
            {
              title: "Mixed feelings",
              body: "First bottle felt great, second one less so. Support team was friendly when I reached out.",
              name: "Janelle K.",
              date: "8 months ago",
              rating: 2,
              verified: true,
              helpfulCount: 3,
              notHelpfulCount: 4,
            },
          ]
        : [
            {
              title: "Energy without the crash",
              body: "47 and finally feel like I did in my 30s. Steady all-day energy, not a spike and crash. Sleep is also better.",
              name: "Rachel D.",
              date: "2 weeks ago",
              rating: 5,
              verified: true,
              helpfulCount: 16,
              notHelpfulCount: 0,
            },
            {
              title: "Noticeable in the gym",
              body: "Recovery between sets feels better and I'm not gassed by the third lift. Real difference after 3 weeks.",
              name: "Tom L.",
              date: "1 month ago",
              rating: 5,
              verified: true,
              helpfulCount: 13,
              notHelpfulCount: 1,
            },
            {
              title: "Best NMN I've tried",
              body: "Tried three other brands before this. The dose actually makes sense biochemically and I feel it.",
              name: "Dr. Lena F.",
              date: "1 month ago",
              rating: 5,
              verified: true,
              helpfulCount: 15,
              notHelpfulCount: 0,
            },
            {
              title: "Worth the price",
              body: "Not cheap but I cut out two other supplements after starting this. Net cost is similar and the results are better.",
              name: "Carlos V.",
              date: "2 months ago",
              rating: 4,
              verified: true,
              helpfulCount: 9,
              notHelpfulCount: 1,
            },
            {
              title: "Mental clarity bonus",
              body: "Bought it for energy, ended up loving the mental clarity even more. Mid-afternoon dips are gone.",
              name: "Sofia A.",
              date: "2 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 12,
              notHelpfulCount: 0,
            },
            {
              title: "Subtle, then significant",
              body: "Three weeks in and my wife asked what I was doing differently. That's when I knew it was working.",
              name: "Benji H.",
              date: "3 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 10,
              notHelpfulCount: 0,
            },
            {
              title: "One pill is convenient",
              body: "Love that the new dose is one capsule. Easier to stay consistent.",
              name: "Mira J.",
              date: "3 months ago",
              rating: 4,
              verified: true,
              helpfulCount: 8,
              notHelpfulCount: 1,
            },
            {
              title: "Back to my 5am runs",
              body: "Five weeks in and I'm hitting the trail again at sunrise without dragging.",
              name: "Imani O.",
              date: "4 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 8,
              notHelpfulCount: 0,
            },
            {
              title: "Not a placebo",
              body: "I'm a chemist and a skeptic. Ran my own little A/B with two weeks off mid-bottle. The drop-off was obvious.",
              name: "Yusuf K.",
              date: "4 months ago",
              rating: 5,
              verified: true,
              helpfulCount: 9,
              notHelpfulCount: 0,
            },
            {
              title: "Steady but slow",
              body: "Took about three weeks before I felt anything meaningful. Still reordering.",
              name: "Marisol P.",
              date: "5 months ago",
              rating: 3,
              verified: true,
              helpfulCount: 5,
              notHelpfulCount: 2,
            },
            {
              title: "Good, not great for me",
              body: "Sleep improved, energy bumped a bit. Was hoping for more given the price point.",
              name: "Devon W.",
              date: "6 months ago",
              rating: 3,
              verified: false,
              helpfulCount: 4,
              notHelpfulCount: 2,
            },
            {
              title: "Better with consistency",
              body: "Works if you take it every morning without fail, which is on me.",
              name: "Hina T.",
              date: "7 months ago",
              rating: 3,
              verified: true,
              helpfulCount: 4,
              notHelpfulCount: 2,
            },
            {
              title: "Felt mild effects",
              body: "Honestly expected a bigger shift. Customer service was great though.",
              name: "Curtis O.",
              date: "8 months ago",
              rating: 2,
              verified: true,
              helpfulCount: 3,
              notHelpfulCount: 3,
            },
            {
              title: "Worked the first month",
              body: "Strong start, then it plateaued for me. Quality seems high regardless.",
              name: "Annika R.",
              date: "9 months ago",
              rating: 2,
              verified: true,
              helpfulCount: 2,
              notHelpfulCount: 4,
            },
          ];

    const sampleReview: ReviewItem = {
      title: p.sample.title,
      body: p.sample.body,
      name: p.sample.name,
      date: p.sample.date,
      rating: 5,
      verified: true,
      helpfulCount: 26,
      notHelpfulCount: 1,
    };

    return [...userReviews, sampleReview, ...pool];
  }, [p, userReviews]);

  const sortedReviews = useMemo<ReviewItem[]>(() => {
    const arr: ReviewItem[] = [...extraReviews];
    if (reviewFilter === "highest") return arr.sort((a, b) => b.rating - a.rating);
    if (reviewFilter === "lowest") return arr.sort((a, b) => a.rating - b.rating);
    if (reviewFilter === "verified") return arr.filter((r) => r.verified);
    if (reviewFilter === "photos") return arr.filter((r) => Boolean(r.image));
    if (["1", "2", "3", "4", "5"].includes(reviewFilter)) return arr.filter((r) => r.rating === Number(reviewFilter));
    return arr.sort((a, b) => parseRelativeDate(a.date) - parseRelativeDate(b.date));
  }, [extraReviews, reviewFilter]);

  const related = PRODUCTS[p.related.id as keyof typeof PRODUCTS];
  const ratingBreakdown = ratingBreakdownFor(p.id);
  const recommendation = p.id === "neural" ? 97 : 95;
  const displayedReviews = sortedReviews.slice(0, reviewsShown);
  const photoCount = extraReviews.filter((review) => review.image).length;
  const verifiedCount = extraReviews.filter((review) => review.verified).length;

  const benefits = p.id === "neural"
    ? [
        { icon: Brain, title: "Eliminates brain fog", desc: "Wakes up tired, foggy mornings — fast." },
        { icon: Zap, title: "Enhances focus & memory", desc: "Sharper recall, longer attention spans." },
        { icon: Sparkles, title: "Smooth jitter-free energy", desc: "Calm focus without the caffeine crash." },
        { icon: Heart, title: "Supports long-term brain health", desc: "Clinically-studied nootropics for the long game." },
        { icon: Check, title: "No artificial additives", desc: "Clean label. No fillers, dyes, or junk." },
        { icon: Beaker, title: "Third-party tested", desc: "Independently lab-verified for purity & potency." },
      ]
    : [
        { icon: Zap, title: "All-day cellular energy", desc: "Boosts NAD+ for cleaner, steadier output." },
        { icon: Heart, title: "Supports healthy aging", desc: "Targets the mitochondrial decline behind fatigue." },
        { icon: Sparkles, title: "Sharper recovery", desc: "Faster bounce-back from workouts and stress." },
        { icon: Brain, title: "Mental clarity bonus", desc: "Users report fewer afternoon dips and clearer thinking." },
        { icon: Check, title: "No artificial additives", desc: "Pure 500mg NMN. Nothing else." },
        { icon: Beaker, title: "Third-party tested", desc: "Lab-verified purity in every batch." },
      ];

  const ingredients = p.id === "neural"
    ? [
        { name: "Bacopa Monnieri", dose: "300mg", desc: "Clinically shown to improve memory and information processing." },
        { name: "Lion's Mane Mushroom", dose: "500mg", desc: "Supports nerve growth factor (NGF) and long-term brain health." },
        { name: "L-Theanine", dose: "200mg", desc: "Promotes calm, focused energy — pairs with caffeine for zero jitters." },
        { name: "Natural Caffeine", dose: "75mg", desc: "Smooth, low-dose lift from green coffee bean — no crash." },
        { name: "Rhodiola Rosea", dose: "250mg", desc: "Adaptogen that fights mental fatigue under stress." },
        { name: "Citicoline (CDP-Choline)", dose: "250mg", desc: "Raises acetylcholine for sharper focus and recall." },
      ]
    : [
        { name: "NMN (β-Nicotinamide Mononucleotide)", dose: "500mg", desc: "The direct NAD+ precursor — fuels cellular energy and longevity." },
        { name: "Resveratrol", dose: "150mg", desc: "Activates sirtuins; works synergistically with NMN." },
        { name: "TMG (Trimethylglycine)", dose: "100mg", desc: "Methyl donor that supports NMN metabolism." },
      ];

  const tabs: { id: "why" | "ing" | "use" | "rev"; label: string }[] = [
    { id: "why", label: "Why You Need This" },
    { id: "ing", label: "Ingredients" },
    { id: "use", label: "How to Use" },
    { id: "rev", label: `Reviews (${p.reviews}+)` },
  ];

  const trustBadges = [
    { icon: Lock, title: "Secure Checkout", sub: "256-bit SSL" },
    { icon: Truck, title: "Free Shipping", sub: "On orders $75+" },
    { icon: ShieldCheck, title: "30-Day Guarantee", sub: "Risk-free trial" },
    { icon: Star, title: `${p.reviews}+ Reviews`, sub: `${p.rating}/5 average` },
  ];

  return (
    <>
      {showReviewForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowReviewForm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-display font-bold mb-4">Write a Review</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!form.name.trim() || !form.title.trim() || !form.body.trim()) return;
                const payload: ReviewItem = { ...form, date: "Just now", verified: true, helpfulCount: 0, notHelpfulCount: 0 };
                setUserReviews((prev) => [payload, ...prev]);
                setForm({ name: "", title: "", body: "", rating: 5 });
                setShowReviewForm(false);
                setTab("rev");
                const { supabase } = await import("@/integrations/supabase/client");
                await supabase.from("product_reviews").insert({
                  product_id: p.id,
                  name: payload.name.trim().slice(0, 80),
                  title: payload.title.trim().slice(0, 120),
                  body: payload.body.trim().slice(0, 2000),
                  rating: payload.rating,
                });
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Name</label>
                  <input className="w-full rounded-md border border-border px-3 py-2" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Title</label>
                  <input className="w-full rounded-md border border-border px-3 py-2" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button type="button" key={n} onClick={() => setForm((f) => ({ ...f, rating: n }))} className="p-1">
                        <Star className={`h-6 w-6 ${n <= form.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Review</label>
                  <textarea className="w-full rounded-md border border-border px-3 py-2 min-h-[120px]" value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} required />
                </div>
                <div className="flex gap-3 justify-end">
                  <button type="button" onClick={() => setShowReviewForm(false)} className="btn-outline">Cancel</button>
                  <button type="submit" className="btn-primary">Submit Review</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLabel && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setShowLabel(false)}>
          <div className="relative bg-white rounded-2xl p-4 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowLabel(false)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-secondary">
              <X className="h-5 w-5" />
            </button>
            <img src={supplementFacts} alt="Supplement Facts" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      )}

      {showImageLightbox && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setShowImageLightbox(false)}>
          <button onClick={() => setShowImageLightbox(false)} className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10">
            <X className="h-6 w-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + p.images.length) % p.images.length); }} className="absolute left-4 text-white p-2 rounded-full hover:bg-white/10">
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img src={p.images[imgIdx]} alt={p.name} className="max-h-[85vh] max-w-[90vw] object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % p.images.length); }} className="absolute right-4 text-white p-2 rounded-full hover:bg-white/10">
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}

      {/* TOP: image + buy */}
      <section className="container-x py-8 md:py-12">
        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{p.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* LEFT — image + benefits */}
          <div>
            <button
              type="button"
              onClick={() => setShowImageLightbox(true)}
              className="block w-full rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-secondary/40 aspect-square p-6 group"
            >
              <img src={p.images[imgIdx]} alt={p.name} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
            </button>
            <div className="mt-4 grid grid-cols-5 gap-2.5">
              {p.images.slice(0, 5).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition ${imgIdx === i ? "border-primary" : "border-border hover:border-primary/40"} bg-secondary p-1.5`}
                >
                  <img src={src} alt={`view ${i + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Premium benefit chips */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-primary">What you get</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-foreground leading-tight">{b.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground leading-snug">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — purchase column */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 text-primary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]">
              <span className="h-1.5 w-1.5 rounded-full bg-energy" />
              {p.id === "neural" ? "Best Seller · Focus Formula" : "Cellular Energy · Longevity"}
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl lg:text-[3.25rem] font-display font-bold leading-[1.05] tracking-tight">{p.name}</h1>
            <button
              type="button"
              onClick={() => {
                setTab("rev");
                requestAnimationFrame(() =>
                  document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" }),
                );
              }}
              className="mt-4 group inline-flex items-center gap-2.5 rounded-full"
              aria-label={`${p.rating} out of 5 stars from ${p.reviews}+ reviews — view reviews`}
            >
              <span className="relative inline-flex items-center">
                <span className="flex items-center gap-0.5 text-muted">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-[18px] w-[18px] fill-current" />
                  ))}
                </span>
                <span
                  className="absolute inset-0 flex items-center gap-0.5 overflow-hidden text-energy"
                  style={{ width: `${(p.rating / 5) * 100}%` }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-[18px] w-[18px] shrink-0 fill-current" />
                  ))}
                </span>
              </span>
              <span className="text-sm font-semibold text-foreground">{p.rating}</span>
              <span className="text-sm text-muted-foreground underline-offset-4 group-hover:text-foreground group-hover:underline">
                {p.reviews}+ reviews
              </span>
            </button>
            <p className="mt-4 text-body leading-relaxed">
              {p.id === "neural"
                ? "10 clinically-studied nootropics in one capsule. Sharper focus, cleaner energy, and a noticeably quieter mind — without jitters or crash."
                : "500mg of pure NMN per serving. Replenish NAD+, restore cellular energy, and support healthy aging from the inside out."}
            </p>

            <div className="mt-6">
              {p.id === "neural" ? (
                <BundleSelector thumbnail={p.images[0]} productName={p.name} />
              ) : (
                <NmnBuyBlock thumbnail={p.images[0]} />
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowLabel(true)}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition"
            >
              <FileText className="h-4 w-4" />
              View Supplement Label
            </button>

            {/* Trust badges — bigger, popped */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {trustBadges.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-gradient-to-br from-secondary/60 to-card p-3.5 hover:border-primary/30 transition"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-foreground leading-tight">{t.title}</div>
                    <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section id="reviews" className="container-x pb-16 scroll-mt-24">
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-border bg-secondary/60 p-1.5 shadow-sm backdrop-blur">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`whitespace-nowrap rounded-full px-4 sm:px-6 py-2.5 text-sm font-semibold transition ${
                  tab === t.id
                    ? "bg-card text-foreground shadow-sm ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {tab === "why" && (
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
              <div className="lg:col-span-2 space-y-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">The Science</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                  Your brain isn't broken. It's <span className="text-primary">under-fueled.</span>
                </h2>
                <div className="rounded-2xl border-l-4 border-energy bg-energy/5 px-6 py-5">
                  <p className="text-lg leading-relaxed text-foreground font-medium">
                    {p.id === "neural"
                      ? "By 30, your brain produces 25% less of the neurotransmitters responsible for focus, memory, and motivation."
                      : "By 50, your NAD+ levels drop to half of what they were in your 20s — and that decline is the engine of cellular fatigue."}
                  </p>
                </div>
                <p className="text-body leading-7">
                  {p.id === "neural"
                    ? "Most nootropics overload you with caffeine and call it a day. Circuit Neural Performance takes a different approach: a precise stack of 10 clinically-studied compounds that work together to restore the chemistry your brain is missing — without the jitters, crash, or anxiety."
                    : "NMN is the most direct precursor to NAD+, the molecule your cells use to produce energy. Restoring NAD+ supports mitochondrial function, DNA repair, and the longevity pathways that keep you feeling like yourself for decades longer."}
                </p>
              </div>
              <div className="space-y-4">
                {(p.id === "neural"
                  ? [
                      { stat: "2.5×", label: "Faster information recall", desc: "Bacopa monnieri, 12-week trial", source: "https://pubmed.ncbi.nlm.nih.gov/11498727/" },
                      { stat: "47%", label: "Less mental fatigue", desc: "Rhodiola rosea, randomized study", source: "https://pubmed.ncbi.nlm.nih.gov/19016404/" },
                      { stat: "0", label: "Jitters or crash", desc: "L-Theanine + caffeine pairing", source: "https://pubmed.ncbi.nlm.nih.gov/18681988/" },
                    ]
                  : [
                      { stat: "+38%", label: "NAD+ increase in 30 days", desc: "Oral NMN, clinical trial", source: "https://pubmed.ncbi.nlm.nih.gov/34855513/" },
                      { stat: "29%", label: "Drop in fatigue scores", desc: "NMN supplementation study", source: "https://pubmed.ncbi.nlm.nih.gov/36482258/" },
                      { stat: "100%", label: "Pharmaceutical-grade NMN", desc: "Third-party verified per batch", source: undefined as string | undefined },
                    ]
                ).map((s, i) => (
                  <div key={i} className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-primary-foreground p-5">
                    <div className="text-4xl font-display font-bold">{s.stat}</div>
                    <div className="mt-1 text-sm font-semibold">{s.label}</div>
                    {s.source ? (
                      <a
                        href={s.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs opacity-80 underline underline-offset-2 hover:opacity-100"
                      >
                        {s.desc} ↗
                      </a>
                    ) : (
                      <div className="mt-1 text-xs opacity-80">{s.desc}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "ing" && (
            <div>
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Inside the bottle</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Every ingredient earns its place.</h2>
                <p className="mt-3 text-body">Clinically-studied dosages. No fillers, no proprietary blends, no junk.</p>
              </div>
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {ingredients.map((ing, i) => (
                  <div key={i} className="group rounded-2xl border border-border bg-card p-5 hover:shadow-md hover:border-primary/30 transition">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                        <Beaker className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h3 className="font-display font-bold text-lg text-foreground">{ing.name}</h3>
                          <span className="inline-flex items-center rounded-full bg-energy/15 text-energy text-[11px] font-bold px-2 py-0.5">{ing.dose}</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground leading-6">{ing.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowLabel(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-secondary"
              >
                <FileText className="h-4 w-4" />
                View Full Supplement Facts
              </button>
            </div>
          )}

          {tab === "use" && (
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Simple daily ritual</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">How to use {p.name}</h2>
              <div className="mt-10 relative">
                <div className="absolute left-6 top-2 bottom-2 w-px bg-border hidden sm:block" />
                <div className="space-y-6">
                  {(p.id === "neural"
                    ? [
                        { icon: Coffee, title: "Take 1 capsule in the morning", desc: "With water, ideally with breakfast. Pairs beautifully with your first coffee." },
                        { icon: Clock, title: "Wait 30–60 minutes", desc: "You'll start to feel a smooth, calm lift in focus. No jitters. No crash later." },
                        { icon: Sparkles, title: "Repeat daily for 2–4 weeks", desc: "Deeper benefits (memory, long-term clarity) compound with consistent use." },
                      ]
                    : [
                        { icon: Coffee, title: "Take 1 capsule daily", desc: "With or without food, ideally in the morning. NMN absorbs well either way." },
                        { icon: Clock, title: "Be consistent", desc: "NAD+ levels rebuild gradually. Most people notice changes in 2–4 weeks." },
                        { icon: Sparkles, title: "Stack with healthy habits", desc: "Sleep, movement, and protein amplify the longevity benefits." },
                      ]
                  ).map((s, i) => (
                    <div key={i} className="relative flex gap-5">
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-energy text-[11px] font-bold flex items-center justify-center text-white">{i + 1}</span>
                        <s.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 rounded-2xl border border-border bg-card p-5">
                        <h3 className="font-display font-bold text-lg text-foreground">{s.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-6">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-5 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground leading-6">
                  If you're pregnant, nursing, on medication, or have a medical condition, talk to your healthcare provider first.
                </p>
              </div>
            </div>
          )}

          {tab === "rev" && p.id === "neural" && (
            <section className="rounded-[2rem] border border-border bg-secondary/40 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">Join the Circuit</p>
                <h2 className="mt-4 text-3xl font-display font-bold text-foreground sm:text-4xl">Customer proof that feels earned</h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  See how thousands of customers are building sharper focus, cleaner energy, and better daily performance with Circuit Neural Performance.
                </p>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
                <aside className="lg:sticky lg:top-24 space-y-4">
                  <div className="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm shadow-primary/5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Average rating</p>
                        <div className="mt-3 flex items-end gap-3">
                          <span className="text-6xl font-display font-bold leading-none text-foreground">{p.rating}</span>
                          <span className="pb-2 text-sm text-muted-foreground">out of 5</span>
                        </div>
                      </div>
                      <div className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                        {p.reviews}+ reviews
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.round(p.rating) ? "fill-energy text-energy" : "fill-muted text-muted"}`} />
                      ))}
                    </div>
                    <div className="mt-5 rounded-2xl border border-border bg-secondary/70 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-success">
                        <ShieldCheck className="h-4 w-4" />
                        <span>{recommendation}% Would Recommend</span>
                      </div>
                      <div className="mt-2 text-xs leading-6 text-muted-foreground">
                        Based on {verifiedCount}+ verified reviews and consistent repeat orders.
                      </div>
                    </div>
                    <div className="mt-6 space-y-3">
                      {ratingBreakdown.map((row) => (
                        <button
                          key={row.stars}
                          type="button"
                          onClick={() => { setReviewFilter(String(row.stars) as "5" | "4" | "3" | "2" | "1"); setReviewsShown(8); }}
                          className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition ${reviewFilter === String(row.stars) ? "bg-secondary ring-1 ring-primary/25" : "hover:bg-secondary/70"}`}
                        >
                          <span className="w-7 text-sm font-semibold text-foreground">{row.stars}</span>
                          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${row.pct}%` }} />
                          </div>
                          <span className="w-10 text-right text-xs text-muted-foreground">{row.pct}%</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                      <div className="rounded-2xl border border-border bg-secondary/70 p-3">
                        <div className="text-lg font-display font-bold text-foreground">{photoCount}</div>
                        <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">With photos</div>
                      </div>
                      <div className="rounded-2xl border border-border bg-secondary/70 p-3">
                        <div className="text-lg font-display font-bold text-foreground">{verifiedCount}</div>
                        <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Verified</div>
                      </div>
                    </div>
                    <button onClick={() => setShowReviewForm(true)} className="mt-6 btn-primary w-full">Write a Review</button>
                  </div>
                </aside>

                <div>
                  <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm shadow-primary/5 sm:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Filter reviews</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {(
                            [
                              ["recent", "Most Recent"],
                              ["highest", "Highest Rated"],
                              ["lowest", "Lowest Rated"],
                              ["verified", "Verified Only"],
                              ["photos", "With Photos"],
                            ] as const
                          ).map(([key, label]) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => { setReviewFilter(key); setReviewsShown(8); }}
                              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${reviewFilter === key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-secondary"}`}
                            >
                              {key === "photos" ? <ImageIcon className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {(["1", "2", "3", "4", "5"] as const).includes(reviewFilter as any) && (
                        <button
                          type="button"
                          onClick={() => { setReviewFilter("recent"); setReviewsShown(8); }}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Clear star filter
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 columns-1 gap-5 md:columns-2">
                    {displayedReviews.map((r, i) => {
                      const reviewKey = `${r.name}-${r.title}-${i}`;
                      const initials = r.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
                      return (
                        <article key={reviewKey} className="mb-5 break-inside-avoid rounded-[1.5rem] border border-border bg-card shadow-sm shadow-primary/5 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                          {r.image && (
                            <div className="overflow-hidden rounded-t-[1.5rem] border-b border-border bg-secondary">
                              <img src={r.image} alt={`${r.name} sharing Circuit Neural Performance`} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                            </div>
                          )}
                          <div className="p-5 sm:p-6">
                            <div className="flex items-start gap-3">
                              {r.image ? (
                                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border bg-secondary">
                                  <img src={r.image} alt={`${r.name} avatar`} className="h-full w-full object-cover" loading="lazy" />
                                </div>
                              ) : (
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-sm font-semibold text-foreground">
                                  {initials}
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-sm font-semibold text-foreground">{r.name}</span>
                                  {r.verified && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
                                      <Check className="h-3 w-3" />
                                      Verified
                                    </span>
                                  )}
                                </div>
                                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, s) => (
                                      <Star key={s} className={`h-3.5 w-3.5 ${s < r.rating ? "fill-energy text-energy" : "fill-muted text-muted"}`} />
                                    ))}
                                  </div>
                                  <span>•</span>
                                  <span>{r.date}</span>
                                </div>
                              </div>
                            </div>
                            <h3 className="mt-4 text-lg font-display font-bold text-foreground">{r.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-muted-foreground">{r.body}</p>
                            <div className="mt-5 border-t border-border pt-4">
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Was this helpful?</span>
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setHelpful((h) => ({ ...h, [reviewKey]: "yes" }))}
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${helpful[reviewKey] === "yes" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-secondary"}`}
                                  >
                                    <ThumbsUp className="h-4 w-4" />
                                    Yes
                                    <span className="text-[11px] opacity-80">{(r.helpfulCount || 0) + (helpful[reviewKey] === "yes" ? 1 : 0)}</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setHelpful((h) => ({ ...h, [reviewKey]: "no" }))}
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${helpful[reviewKey] === "no" ? "border-border bg-secondary text-foreground" : "border-border bg-background text-foreground hover:bg-secondary"}`}
                                  >
                                    <ThumbsDown className="h-4 w-4" />
                                    No
                                    <span className="text-[11px] opacity-80">{(r.notHelpfulCount || 0) + (helpful[reviewKey] === "no" ? 1 : 0)}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {sortedReviews.length === 0 ? (
                    <div className="mt-6 rounded-[1.5rem] border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
                      No reviews match this filter yet.
                    </div>
                  ) : reviewsShown < sortedReviews.length ? (
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (isLoadingMore) return;
                          setIsLoadingMore(true);
                          window.setTimeout(() => {
                            setReviewsShown((n) => Math.min(n + 4, sortedReviews.length));
                            setIsLoadingMore(false);
                          }, 260);
                        }}
                        className="inline-flex min-w-[240px] items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-secondary disabled:opacity-70"
                        disabled={isLoadingMore}
                      >
                        {isLoadingMore ? "Loading Reviews..." : "Load More Reviews"}
                      </button>
                    </div>
                  ) : (
                    <div className="mt-6 text-center text-sm text-muted-foreground">You've reached the end of the reviews.</div>
                  )}
                </div>
              </div>
            </section>
          )}

          {tab === "rev" && p.id !== "neural" && (
            <div className="max-w-3xl mx-auto space-y-5">
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold">What customers say</h2>
                <div className="mt-3 flex items-center justify-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(p.rating) ? "fill-energy text-energy" : "fill-muted text-muted"}`} />
                  ))}
                  <span className="text-sm text-muted-foreground">{p.rating} · {p.reviews}+ reviews</span>
                </div>
              </div>
              {displayedReviews.slice(0, 8).map((r, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`h-4 w-4 ${s < r.rating ? "fill-energy text-energy" : "fill-muted text-muted"}`} />
                    ))}
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <h3 className="mt-2 font-display font-bold text-lg">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-7">{r.body}</p>
                  <div className="mt-3 text-xs font-semibold text-foreground">— {r.name}</div>
                </div>
              ))}
              <div className="text-center">
                <button onClick={() => setShowReviewForm(true)} className="btn-primary">Write a Review</button>
              </div>
            </div>
          )}
        </div>
      </section>




      {/* RELATED */}
      <section className="container-x py-20">
        <h2 className="text-2xl md:text-3xl">Complete Your Stack</h2>
        <div className="mt-6 rounded-2xl border border-border p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="h-32 w-32 bg-secondary rounded-xl flex items-center justify-center shrink-0">
            <img src={related.image} alt={related.name} className="max-h-28 object-contain" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl">
              {related.name} — ${related.price.toFixed(2)}
            </h3>
            <p className="mt-1 text-body text-sm">{p.related.blurb}</p>
          </div>
          <Link to="/product/$slug" params={{ slug: related.slug }} className="btn-primary">
            View Product
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 20% 80%, oklch(0.7 0.16 200 / 0.12), transparent 50%), radial-gradient(ellipse at 80% 20%, oklch(0.72 0.18 55 / 0.10), transparent 50%), linear-gradient(180deg, oklch(0.98 0.01 240) 0%, oklch(0.96 0.02 235) 100%)",
          }}
        />
        <div className="container-x py-20 md:py-28">
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs uppercase tracking-[0.2em] font-semibold text-primary">
              <MessageCircle className="h-3.5 w-3.5" />
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl mt-4">Questions, answered</h2>
            <p className="mt-3 text-body">Everything you need to know before you start feeling better.</p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto space-y-4">
            {[
              {
                icon: Zap,
                q: "How fast will I feel it?",
                a: "Most people notice cleaner, calmer energy within the first few days. The deeper benefits — sharper focus, better memory, no afternoon slump — build over 2–4 weeks as ingredients like Bacopa monnieri reach full effect. Consistency is what makes it work, which is why most customers start with a 3-month supply.",
              },
              {
                icon: Coffee,
                q: "Does it contain caffeine? Will it keep me up at night?",
                a: "Yes — a low dose of natural caffeine, deliberately paired with L-Theanine for smooth, calm focus without the jitters or crash. For best results, take it in the morning or before 2pm so it won't affect your sleep.",
              },
              {
                icon: Beaker,
                q: "Can I take it with my morning coffee?",
                a: "Absolutely. Many customers take Circuit instead of their 2nd or 3rd coffee. If you're caffeine-sensitive, start with Circuit alone for the first few days to feel your baseline.",
              },
              {
                icon: ShieldCheck,
                q: "Is it safe? What's in it?",
                a: "Circuit is made in an FDA-registered, cGMP-certified US facility and third-party lab tested for purity. It contains 10 clinically studied compounds and no artificial additives. If you're pregnant, nursing, on medication, or have a medical condition, check with your healthcare provider first.",
              },
              {
                icon: Clock,
                q: "How long does one bottle last?",
                a: "Each bottle is a 30-day supply — one capsule daily.",
              },
              {
                icon: RotateCcw,
                q: "What if it doesn't work for me?",
                a: "Try it risk-free for 30 days. If you don't feel a noticeable difference in your focus and clarity, email us for a full refund — and keep the bottle. The only way to lose is to not try it.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-white border border-border/80 p-1 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="rounded-xl bg-gradient-to-r from-white to-secondary/30 p-5 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-ink text-base md:text-lg leading-snug">{item.q}</h3>
                      <p className="mt-2 text-body text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="bg-secondary py-16">
        <div className="container-x text-center max-w-2xl">
          <ShieldCheck className="h-12 w-12 text-success mx-auto" />
          <h2 className="text-2xl md:text-4xl mt-4">30-Day Money-Back Guarantee</h2>
          <p className="mt-4 text-body">
            Try {p.name} risk-free for 30 days. If you don't feel a noticeable difference in your focus and mental
            clarity, we'll refund every penny. No questions asked.
          </p>
        </div>
      </section>
    </>
  );
}

function Trust({ icon: Icon, text }: { icon: typeof Lock; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-ink font-medium">{text}</span>
    </div>
  );
}

type BundleOpt = {
  id: "1" | "2" | "3";
  bottles: number;
  variantId: string;
  price: number;
  compare: number;
  save: number;
  detail: string;
  freeShipping: boolean;
  popular?: boolean;
};

const BUNDLES: BundleOpt[] = [
  {
    id: "1",
    bottles: 1,
    variantId: "gid://shopify/ProductVariant/48341605810330",
    price: 42.99,
    compare: 59.0,
    save: 16,
    detail: "30 capsules · 30-day supply",
    freeShipping: false,
  },
  {
    id: "2",
    bottles: 2,
    variantId: "gid://shopify/ProductVariant/48341729607834",
    price: 79.99,
    compare: 118.0,
    save: 38,
    detail: "60 capsules · 60-day supply",
    freeShipping: true,
    popular: true,
  },
  {
    id: "3",
    bottles: 3,
    variantId: "gid://shopify/ProductVariant/48341729050778",
    price: 109.99,
    compare: 177.0,
    save: 67,
    detail: "90 capsules · 90-day supply",
    freeShipping: true,
  },
];

function BundleSelector({ thumbnail, productName }: { thumbnail: string; productName: string }) {
  const [selected, setSelected] = useState<"1" | "2" | "3">("2");
  const active = BUNDLES.find((b) => b.id === selected)!;

  const [adding, setAdding] = useState(false);
  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      await shopifyCart.add(
        {
          variantId: active.variantId,
          productTitle: productName,
          variantTitle: `${active.bottles} Bottle${active.bottles > 1 ? "s" : ""}`,
          image: thumbnail,
          unitPrice: active.price,
        },
        1,
      );
    } catch (e) {
      console.error(e);
      alert("Could not add to cart. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-[#2C353F] mb-5">
        Choose Your Package
      </h2>
      <div className="space-y-3">
        {BUNDLES.map((b) => {
          const isSelected = selected === b.id;
          const isPopular = !!b.popular;
          const popularSelected = isSelected; // popular card always uses dark slate treatment
          const baseBorder = isSelected && !isPopular ? "border-2 border-[#F5853F]" : "border border-[#D7DCE0]";
          const cardBg = popularSelected ? "bg-[#2C353F] text-white" : "bg-white";
          return (
            <div key={b.id} className={isPopular ? "relative pt-3" : "relative"}>
              {isPopular && (
                <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-block bg-gradient-to-r from-[#F5C24A] to-[#E0A526] text-[#2C353F] text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                    ★ Most Popular · Best Value
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => setSelected(b.id)}
                aria-pressed={isSelected}
                className={`w-full text-left rounded-[14px] ${baseBorder} ${cardBg} ${isPopular ? "mt-2" : ""} px-3 sm:px-4 py-3.5 flex items-center gap-3 sm:gap-4 transition-all hover:shadow-md`}
              >
                <div
                  className={`shrink-0 h-5 w-5 rounded-full border-2 ${isSelected ? (popularSelected ? "border-[#F5853F] bg-[#F5853F]" : "border-[#F5853F] bg-[#F5853F]") : popularSelected ? "border-white/50" : "border-[#D7DCE0]"} flex items-center justify-center`}
                >
                  {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                </div>
                <div
                  className={`shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-lg ${popularSelected ? "bg-white/10" : "bg-secondary"} overflow-hidden flex items-center justify-center p-1`}
                >
                  <img src={thumbnail} alt="" className="h-full w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-extrabold text-[15px] sm:text-base ${popularSelected ? "text-white" : "text-[#2C353F]"}`}
                  >
                    {b.bottles} {b.bottles === 1 ? "BOTTLE" : "BOTTLES"}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                    <span
                      className={`text-xl sm:text-2xl font-extrabold ${popularSelected ? "text-white" : "text-[#2C353F]"}`}
                    >
                      ${b.price.toFixed(2)}
                    </span>
                    <span className={`text-sm line-through ${popularSelected ? "text-white/50" : "text-[#8A95A1]"}`}>
                      ${b.compare.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className={`mt-0.5 text-[11px] sm:text-xs ${popularSelected ? "text-white/70" : "text-[#6A7786]"}`}
                  >
                    {b.detail}
                  </div>
                  {b.freeShipping && (
                    <div className="mt-1 text-[11px] sm:text-xs font-bold text-[#2E9E6B]">✓ FREE SHIPPING</div>
                  )}
                </div>
                <div className="shrink-0">
                  <span
                    className={`inline-block rounded-full px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-extrabold tracking-wide ${popularSelected ? "bg-[#F5853F] text-white" : "bg-[#F5853F] text-white"}`}
                  >
                    SAVE ${b.save}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={adding}
        className="mt-5 w-full rounded-[12px] bg-[#F5853F] hover:bg-[#E0742E] text-white font-extrabold tracking-wider uppercase text-base sm:text-[17px] py-4 sm:py-[18px] shadow-[0_10px_24px_-8px_rgba(245,133,63,0.55)] transition-all hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-70 disabled:cursor-wait"
      >
        {adding ? "Adding…" : "Add to Cart"}
      </button>
      <p className="mt-2.5 text-center text-[11px] sm:text-xs text-[#6A7786]">
        30-day money-back guarantee · Secure checkout
      </p>
    </div>
  );
}

function NmnBuyBlock({ thumbnail }: { thumbnail: string }) {
  const [adding, setAdding] = useState(false);
  const handleAdd = async () => {
    if (adding) return;
    setAdding(true);
    try {
      await shopifyCart.add(
        {
          variantId: NMN_VARIANT_GID,
          productTitle: "Circuit NMN",
          variantTitle: "1 Bottle",
          image: thumbnail,
          unitPrice: 49.99,
        },
        1,
      );
    } catch (e) {
      console.error(e);
      alert("Could not add to cart. Please try again.");
    } finally {
      setAdding(false);
    }
  };
  return (
    <div>
      <div className="rounded-[14px] border-2 border-[#F5853F] bg-white px-4 py-4 flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 rounded-lg bg-secondary overflow-hidden flex items-center justify-center p-1">
          <img src={thumbnail} alt="" className="h-full w-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-extrabold text-[#2C353F]">1 BOTTLE · 30-DAY SUPPLY</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#2C353F]">$49.99</span>
            <span className="text-sm line-through text-[#8A95A1]">$65.00</span>
          </div>
          <div className="mt-0.5 text-xs text-[#6A7786]">30 capsules · 500mg NMN</div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        disabled={adding}
        className="mt-5 w-full rounded-[12px] bg-[#F5853F] hover:bg-[#E0742E] text-white font-extrabold tracking-wider uppercase text-base sm:text-[17px] py-4 sm:py-[18px] shadow-[0_10px_24px_-8px_rgba(245,133,63,0.55)] transition-all hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-70 disabled:cursor-wait"
      >
        {adding ? "Adding…" : "Add to Cart"}
      </button>
      <p className="mt-2.5 text-center text-[11px] sm:text-xs text-[#6A7786]">
        30-day money-back guarantee · Secure checkout
      </p>
    </div>
  );
}
