import { PostDetailDateType } from '@/types/posts';
import { supabase } from '@/utils/supabase/supabase';

// export const postDetailDate = async (postId: string | string[]) => {
//   try {
//     const { data: post, error } = await supabase.from('posts').select('*').eq('id', postId);
//     if (error) throw error;
//     return post![0];
//   } catch (error) {
//     throw error;
//   }
// };

// export const postDetailUserDate = async (userId: string | undefined) => {
//   try {
//     const { data: profiles, error } = await supabase.from('profiles').select('*').eq('id', userId);
//     if (error) throw error;
//     return profiles![0];
//   } catch (error) {
//     throw error;
//   }
// };

// export const postDetailCommentDate = async (postId: string | string[]) => {
//   try {
//     const { data: comments, error } = await supabase.from('comments').select('*').eq('post_id', postId);
//     if (error) throw error;
//     return comments![0];
//   } catch (error) {
//     throw error;
//   }
// };

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
