// policy 사용할 거 아니면 삭제해도 되는 파일

import { createBrowserClient } from '@supabase/ssr';
export const createClient = (supabaseUrl: string, supabaseKey: string) => createBrowserClient(supabaseUrl, supabaseKey);
