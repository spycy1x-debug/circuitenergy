import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}

const SDK_URL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
const DOMAIN = "xwkkv0-r0.myshopify.com";
const STOREFRONT_ACCESS_TOKEN = "27b060f0e9c0b8a83808f0165c32c501";

let sdkPromise: Promise<any> | null = null;
function loadSdk(): Promise<any> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.ShopifyBuy?.UI) return Promise.resolve(window.ShopifyBuy);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SDK_URL}"]`) as HTMLScriptElement | null;
    const script = existing ?? document.createElement("script");
    if (!existing) {
      script.async = true;
      script.src = SDK_URL;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => resolve(window.ShopifyBuy));
    script.addEventListener("error", reject);
    if (window.ShopifyBuy?.UI) resolve(window.ShopifyBuy);
  });
  return sdkPromise;
}

type Props = {
  productId: string;
  buttonText: string;
};

export function ShopifyBuyButton({ productId, buttonText }: Props) {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const node = nodeRef.current;
    if (!node) return;
    node.innerHTML = "";

    loadSdk().then((ShopifyBuy) => {
      if (cancelled || !ShopifyBuy || !node) return;
      const client = ShopifyBuy.buildClient({
        domain: DOMAIN,
        storefrontAccessToken: STOREFRONT_ACCESS_TOKEN,
      });
      ShopifyBuy.UI.onReady(client).then((ui: any) => {
        if (cancelled) return;
        ui.createComponent("product", {
          id: productId,
          node,
          moneyFormat: "%24%7B%7Bamount%7D%7D",
          options: {
            product: {
              contents: { img: false, title: false, price: false },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0",
                    "margin-bottom": "0",
                  },
                },
                button: {
                  "font-size": "16px",
                  "font-weight": "600",
                  "padding": "16px 24px",
                  "width": "100%",
                  "border-radius": "6px",
                  "background-color": "#708090",
                  ":hover": { "background-color": "#657382" },
                  ":focus": { "background-color": "#657382" },
                },
                buttonWrapper: { "width": "100%", "margin": "0" },
              },
              text: { button: buttonText },
            },
            modalProduct: {
              contents: { img: false, imgWithCarousel: true, button: false, buttonWithQuantity: true },
              styles: {
                product: {
                  "@media (min-width: 601px)": { "max-width": "100%", "margin-left": "0", "margin-bottom": "0" },
                },
                button: {
                  "background-color": "#708090",
                  ":hover": { "background-color": "#657382" },
                  ":focus": { "background-color": "#657382" },
                },
              },
              text: { button: "Add to cart" },
            },
            cart: {
              styles: {
                button: {
                  "background-color": "#708090",
                  ":hover": { "background-color": "#657382" },
                  ":focus": { "background-color": "#657382" },
                },
              },
              text: { total: "Subtotal", button: "Checkout" },
            },
            toggle: {
              styles: {
                toggle: {
                  "background-color": "#708090",
                  ":hover": { "background-color": "#657382" },
                  ":focus": { "background-color": "#657382" },
                },
              },
            },
          },
        });
      });
    });

    return () => {
      cancelled = true;
      if (node) node.innerHTML = "";
    };
  }, [productId, buttonText]);

  return <div ref={nodeRef} className="w-full shopify-buy-button-wrapper" />;
}
