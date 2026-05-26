import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Schema = z.object({
  email: z.string().trim().email().max(255),
  firstName: z.string().trim().max(80).optional(),
});

export const Route = createFileRoute("/api/public/klaviyo-subscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
        const listId = process.env.KLAVIYO_LIST_ID;
        if (!apiKey || !listId) {
          return Response.json(
            { error: "Email service not configured." },
            { status: 500 }
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body." }, { status: 400 });
        }

        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Please enter a valid email address." },
            { status: 400 }
          );
        }

        const { email, firstName } = parsed.data;

        // Klaviyo "Subscribe Profiles" endpoint — creates/updates a profile
        // and consents them to the given list.
        // https://developers.klaviyo.com/en/reference/subscribe_profiles
        const klaviyoRes = await fetch(
          "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
          {
            method: "POST",
            headers: {
              accept: "application/vnd.api+json",
              revision: "2024-10-15",
              "content-type": "application/vnd.api+json",
              Authorization: `Klaviyo-API-Key ${apiKey}`,
            },
            body: JSON.stringify({
              data: {
                type: "profile-subscription-bulk-create-job",
                attributes: {
                  profiles: {
                    data: [
                      {
                        type: "profile",
                        attributes: {
                          email,
                          ...(firstName ? { first_name: firstName } : {}),
                          subscriptions: {
                            email: { marketing: { consent: "SUBSCRIBED" } },
                          },
                        },
                      },
                    ],
                  },
                },
                relationships: {
                  list: { data: { type: "list", id: listId } },
                },
              },
            }),
          }
        );

        if (!klaviyoRes.ok && klaviyoRes.status !== 202) {
          const text = await klaviyoRes.text();
          console.error("Klaviyo subscribe error:", klaviyoRes.status, text);
          return Response.json(
            { error: "Could not subscribe right now. Please try again." },
            { status: 502 }
          );
        }

        return Response.json({ success: true });
      },
    },
  },
});
