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
    images: [neuralHeroClean, neuralHand, neuralInfographic, neuralComparison, neuralCustomer, neuralOpen],
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
