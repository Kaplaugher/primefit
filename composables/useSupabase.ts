import { createClient } from '@supabase/supabase-js';

export const useSupabase = () => {
  const config = useRuntimeConfig();

  const supabaseUrl = config.public.supabaseUrl as string;
  const supabaseKey = config.public.supabaseKey as string;

  const supabase = createClient(supabaseUrl, supabaseKey);

  return { supabase };
};
