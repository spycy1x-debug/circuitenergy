import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}

type Props = {
  productId: string;
  buttonText: string;
  onAddToCart?: () => void;
};


const SDK_URL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
const DOMAIN = "xwkkv0-r0.myshopify.com";
const STOREFRONT_ACCESS_TOKEN = "df40e9c0cbc7f17808d61a87c11403bc";

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

export function ShopifyBuyButton({ productId, buttonText, onAddToCart }: Props) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const onAddToCartRef = useRef(onAddToCart);
  useEffect(() => { onAddToCartRef.current = onAddToCart; }, [onAddToCart]);

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
          events: {
            addVariantToCart: () => {
              onAddToCartRef.current?.();
            },
          },
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
                  "font-size": "17px",
                  "font-weight": "800",
                  "letter-spacing": "0.04em",
                  "text-transform": "uppercase",
                  "padding": "20px 24px",
                  "width": "100%",
                  "border-radius": "10px",
                  "background-color": "#FF6B2C",
                  "box-shadow": "0 10px 24px -8px rgba(255,107,44,0.55), 0 2px 0 rgba(0,0,0,0.06) inset",
                  "transition": "transform 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                  ":hover": { "background-color": "#E85A1C", "transform": "translateY(-1px)", "box-shadow": "0 14px 28px -8px rgba(255,107,44,0.7)" },
                  ":focus": { "background-color": "#E85A1C" },
                },
                buttonWrapper: { "width": "100%", "margin": "0" },
              },
              text: { button: buttonText },
            },
            productSet: {
              styles: {
                products: {
                  "@media (min-width: 601px)": {
                    "margin-left": "-20px",
                  },
                },
              },
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
            option: {},
            cart: {
              styles: {
                button: {
                  "background-color": "#708090",
                  ":hover": { "background-color": "#657382" },
                  ":focus": { "background-color": "#657382" },
                },
              },
              text: { total: "Subtotal", button: "Checkout" },
              popup: false,
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
  }, [productId, buttonText, onAddToCart]);

  return <div ref={nodeRef} className="w-full shopify-buy-button-wrapper" />;
}
