import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getEnvValue(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : undefined;
}

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (cachedClient) {
    return cachedClient;
  }

  const supabaseUrl = getEnvValue("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = getEnvValue("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = getEnvValue("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  const supabaseServerKey = serviceRoleKey ?? anonKey;

  if (!supabaseUrl || !supabaseServerKey || !isValidHttpUrl(supabaseUrl)) {
    return null;
  }

  cachedClient = createClient(supabaseUrl, supabaseServerKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedClient;
}
