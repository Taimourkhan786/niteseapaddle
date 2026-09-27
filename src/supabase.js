import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://unfvfdbqwvvlwviwutci.supabase.co";
const supabaseKey = "sb_publishable_yJQmKGdtjmoJchktvqwM9w_OJn9rEoe";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);