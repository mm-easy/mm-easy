import { PostDetailDateType } from '@/types/posts';
import { createClient } from '@/utils/supabase/create-client';

export const postDetailDate = (postId: string) => {
  const supabase = createClient();
  const fetchPost = async () => {
    try {
      const { data: posts, error } = await supabase.from('posts').select('*').eq('id', postId);
      if (error) throw error;
      return posts![0];
    } catch (error) {
      throw error;
    }
  };
  fetchPost();
};

export const getPosts = async () => {
  const supabase = createClient();
  try {
    const { data: posts, error } = await supabase.from('posts').select('*');
    if (error) throw error;
    return posts || [];
  } catch (error) {
    console.error('포스트를 가져오는 중 오류 발생:', error);
    return [];
  }
};
