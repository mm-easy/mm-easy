import { supabase } from '@/utils/supabase/supabase';

import type { LikeParams } from '@/types/posts';

/** 좋아요 가져오기 */
export const getLike = async (postId: string) => {
  try {
    const { data, error } = await supabase.from('likes').select('*').eq('post_id', postId);

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

/** 좋아요 하기 */
export const insertLike = async ({ userId, postId }: LikeParams) => {
  try {
    const { error } = await supabase.from('likes').insert({ user_id: userId, post_id: postId }).select();
    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

/** 좋아요 지우기 */
export const deleteLike = async ({ userId, postId }: LikeParams) => {
  try {
    const { error } = await supabase.from('likes').delete().eq('user_id', userId).eq('post_id', postId);
    if (error) throw error;
  } catch (error) {
    throw error;
  }
};
