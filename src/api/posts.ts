import { createClient } from "@/utils/supabase/create-client";
export const getPosts = async () => {
  const supabase = createClient();
  try {
    const { data: posts, error } = await supabase.from('posts').select('*');
    if (error) throw error;
    return posts || [];
  } catch (error) {
    console.error("포스트를 가져오는 중 오류 발생:", error);
    return [];
  }
};