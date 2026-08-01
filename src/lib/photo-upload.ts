import { supabase } from "@/integrations/supabase/client";

const BUCKET = "keepsake-photos";
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/heic", "image/heif"];

export function validatePhoto(file: File): string | null {
  const okType =
    ACCEPTED_TYPES.includes(file.type.toLowerCase()) || /\.(jpe?g|png|heic|heif)$/i.test(file.name);
  if (!okType) return "Please upload a JPG, PNG, or HEIC image.";
  if (file.size > MAX_UPLOAD_BYTES) return "That file is over 10MB. Please upload a smaller image.";
  return null;
}

/** Uploads a customer photo and returns a long-lived URL we can read from the order. */
export async function uploadPhoto(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw new Error(error.message);

  const { data, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 60 * 60 * 24 * 365);
  if (signErr || !data?.signedUrl) throw new Error(signErr?.message || "Could not create photo link.");
  return data.signedUrl;
}
