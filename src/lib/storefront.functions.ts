import { createServerFn } from "@tanstack/react-start";

/**
 * Thin proxy to the Shopify Storefront API.
 * The access token is read from the server environment — never shipped to the browser.
 */
export const storefront = createServerFn({ method: "POST" })
  .inputValidator((input: { query: string; variables?: Record<string, unknown> }) => {
    if (!input || typeof input.query !== "string") throw new Error("Invalid query");
    return { query: input.query, variables: input.variables ?? {} };
  })
  .handler(async ({ data }) => {
    const domain = process.env["SHOPIFY_STORE_DOMAIN"] ?? "checkout.seralie.com";
    const token = process.env["SHOPIFY_STOREFRONT_ACCESS_TOKEN"];
    const version = process.env["SHOPIFY_API_VERSION"] ?? "2025-07";
    if (!token) throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN");

    const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query: data.query, variables: data.variables }),
    });

    if (!res.ok) throw new Error(`Shopify ${res.status}`);
    const json = (await res.json()) as { data?: unknown; errors?: { message: string }[] };
    if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join(", "));
    return json.data as Record<string, any>;
  });
