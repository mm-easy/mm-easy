import { PostDetailDateType } from '@/types/posts';
import { supabase } from '@/utils/supabase/supabase';

export const postDetailDate = async (postId: string) => {
  try {
    const { data: posts, error } = await supabase.from('posts').select('*').eq('id', postId);
    if (error) throw error;
    return posts![0];
  } catch (error) {
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const { data: posts, error } = await supabase.from('posts').select('*');
    if (error) throw error;
    return posts || [];
  } catch (error) {
    console.error('포스트를 가져오는 중 오류 발생:', error);
    return [];
  }
};
