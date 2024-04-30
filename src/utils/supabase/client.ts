import { createBrowserClient } from '@supabase/ssr';
export const createClient = (supabaseUrl: string, supabaseKey: string) => createBrowserClient(supabaseUrl, supabaseKey);
