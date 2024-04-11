import { supabase } from '@/utils/supabase/supabase';

import type { LikeParams } from '@/types/posts';

export const getLike = async ({ postId, userId }: LikeParams) => {
  try {
    const { data: likedUser, error } = await supabase.from('likes').select('*').eq('post_id', postId);

    const likedUserNow = likedUser?.some((prev) => prev.user_id === userId);

    if (error) throw error;
    return likedUserNow;
  } catch (error) {
    throw error;
  }
};
