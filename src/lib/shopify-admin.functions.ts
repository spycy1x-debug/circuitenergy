import { createServerFn } from "@tanstack/react-start";

const SHOP_DOMAIN = "xwkkv0-r0.myshopify.com";
const API_VERSION = "2025-07";

async function adminFetch(path: string) {
  const token = process.env.SHOPIFY_ACCESS_TOKEN;
  if (!token) throw new Error("SHOPIFY_ACCESS_TOKEN is not configured");
  const res = await fetch(
    `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/${path}`,
    {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
      },
    },
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Shopify Admin API ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

type Order = {
  id: number;
  created_at: string;
  total_price: string;
  currency: string;
  financial_status: string;
  line_items: Array<{ title: string; quantity: number; price: string }>;
  customer?: { first_name?: string; last_name?: string; email?: string } | null;
};

export const getShopifyAnalytics = createServerFn({ method: "GET" }).handler(
  async () => {
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const [ordersRes, productsCountRes] = await Promise.all([
      adminFetch(
        `orders.json?status=any&limit=250&created_at_min=${since.toISOString()}`,
      ),
      adminFetch(`products/count.json`),
    ]);

    const orders: Order[] = ordersRes.orders ?? [];
    const productCount: number = productsCountRes.count ?? 0;

    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    const inRange = (d: string, ms: number) =>
      now - new Date(d).getTime() <= ms;

    const sum = (arr: Order[]) =>
      arr.reduce((s, o) => s + parseFloat(o.total_price || "0"), 0);

    const ordersToday = orders.filter((o) => inRange(o.created_at, day));
    const orders7d = orders.filter((o) => inRange(o.created_at, 7 * day));
    const orders30d = orders;

    const productSales = new Map<string, { qty: number; revenue: number }>();
    for (const o of orders) {
      for (const li of o.line_items || []) {
        const cur = productSales.get(li.title) || { qty: 0, revenue: 0 };
        cur.qty += li.quantity;
        cur.revenue += parseFloat(li.price || "0") * li.quantity;
        productSales.set(li.title, cur);
      }
    }
    const topProducts = [...productSales.entries()]
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 5)
      .map(([title, v]) => ({ title, qty: v.qty, revenue: v.revenue }));

    const recentOrders = orders.slice(0, 10).map((o) => ({
      id: o.id,
      createdAt: o.created_at,
      total: parseFloat(o.total_price || "0"),
      currency: o.currency,
      status: o.financial_status,
      itemCount: (o.line_items || []).reduce((s, li) => s + li.quantity, 0),
      customer:
        [o.customer?.first_name, o.customer?.last_name]
          .filter(Boolean)
          .join(" ") ||
        o.customer?.email ||
        "Guest",
    }));

    const currency = orders[0]?.currency || "USD";

    return {
      currency,
      productCount,
      today: { orders: ordersToday.length, revenue: sum(ordersToday) },
      sevenDay: { orders: orders7d.length, revenue: sum(orders7d) },
      thirtyDay: { orders: orders30d.length, revenue: sum(orders30d) },
      topProducts,
      recentOrders,
    };
  },
);
