import { supabase } from "@/utils/supabase/supabase";

export const getMyActivityComment = async (userId:string) => {
  try {
    const { data: comments, error } = await supabase
      .from('comments')
      .select(`*, profiles!inner(nickname)`)
      .eq('author_id', userId) // 'author_id'와 사용자의 ID를 비교
      .order('created_at', { ascending: false });

    if (error) throw error;
    return comments || [];
  } catch (error) {
    console.error('포스트를 가져오는 중 오류 발생:', error);
    return [];
  }
};