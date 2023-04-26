import { createClient } from "@supabase/supabase-js";

export const Client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_API!) 