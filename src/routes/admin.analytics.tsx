import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  LogOut,
  Package,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getShopifyAnalytics } from "@/lib/shopify-admin.functions";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Seralie" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminAnalytics,
});

function AdminAnalytics() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/login" });
      } else {
        setEmail(data.session.user.email ?? null);
        setAuthChecked(true);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/login" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["shopify-analytics"],
    queryFn: () => getShopifyAnalytics(),
    enabled: authChecked,
    refetchInterval: 60_000,
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (!authChecked) {
    return (
      <div className="min-h-[80vh] grid place-items-center bg-[oklch(0.13_0.03_245)] text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const fmt = (n: number, currency = data?.currency || "USD") =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <section className="min-h-screen bg-[oklch(0.13_0.03_245)] text-white">
      <div className="container-x py-10 max-w-6xl mx-auto">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/55">
              Admin
            </div>
            <h1 className="mt-1 text-4xl font-semibold">Live store analytics</h1>
            <p className="text-white/60 text-sm mt-1">
              Signed in as {email} · auto-refreshes every minute
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 px-4 py-2 text-sm ring-1 ring-white/15 disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 px-4 py-2 text-sm ring-1 ring-white/15"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </header>

        {isLoading && (
          <div className="mt-16 grid place-items-center text-white/60">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="mt-3 text-sm">Loading Shopify data…</p>
          </div>
        )}

        {error && (
          <div className="mt-10 rounded-2xl bg-[oklch(0.3_0.1_30)] ring-1 ring-white/20 p-6">
            <p className="font-semibold">Couldn't load analytics</p>
            <p className="text-sm text-white/70 mt-1">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        )}

        {data && (
          <>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat
                icon={<DollarSign className="h-4 w-4" />}
                label="Revenue today"
                value={fmt(data.today.revenue)}
                sub={`${data.today.orders} orders`}
              />
              <Stat
                icon={<TrendingUp className="h-4 w-4" />}
                label="Revenue 7d"
                value={fmt(data.sevenDay.revenue)}
                sub={`${data.sevenDay.orders} orders`}
              />
              <Stat
                icon={<ShoppingBag className="h-4 w-4" />}
                label="Revenue 30d"
                value={fmt(data.thirtyDay.revenue)}
                sub={`${data.thirtyDay.orders} orders`}
              />
              <Stat
                icon={<Package className="h-4 w-4" />}
                label="Products"
                value={String(data.productCount)}
                sub="in catalog"
              />
            </div>

            <div className="mt-10 grid lg:grid-cols-2 gap-6">
              <Card title="Top products (30d)">
                {data.topProducts.length === 0 ? (
                  <Empty text="No sales in the last 30 days yet." />
                ) : (
                  <ul className="divide-y divide-white/10">
                    {data.topProducts.map((p) => (
                      <li
                        key={p.title}
                        className="py-3 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <div className="font-medium truncate">{p.title}</div>
                          <div className="text-xs text-white/55">
                            {p.qty} sold
                          </div>
                        </div>
                        <div className="font-semibold text-sm">
                          {fmt(p.revenue)}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>

              <Card title="Recent orders">
                {data.recentOrders.length === 0 ? (
                  <Empty text="No recent orders." />
                ) : (
                  <ul className="divide-y divide-white/10">
                    {data.recentOrders.map((o) => (
                      <li
                        key={o.id}
                        className="py-3 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <div className="font-medium truncate">
                            {o.customer}
                          </div>
                          <div className="text-xs text-white/55">
                            {new Date(o.createdAt).toLocaleString()} ·{" "}
                            {o.itemCount} item{o.itemCount !== 1 ? "s" : ""} ·{" "}
                            {o.status}
                          </div>
                        </div>
                        <div className="font-semibold text-sm">
                          {fmt(o.total, o.currency)}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>

            <p className="mt-10 text-xs text-white/40">
              Live visitor/session counts are tracked inside Shopify Admin →
              Analytics → Live View. Order, revenue, and product data here come
              from the Shopify Admin API in real time.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl bg-white/5 ring-1 ring-white/15 p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/55">
        {icon}
        {label}
      </div>
      <div className="mt-3 text-2xl font-semibold">{value}</div>
      <div className="text-xs text-white/50 mt-1">{sub}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/5 ring-1 ring-white/15 p-6">
      <h2 className="text-sm uppercase tracking-[0.18em] text-white/55 font-semibold">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="text-sm text-white/50 py-4">{text}</p>;
}
