import { InsertComment } from '@/types/posts';
import { supabase } from '@/utils/supabase/supabase';
import { toast } from 'react-toastify';

export const getComment = async (postId: string | string[] | undefined) => {
  try {
    const { data: comments, error } = await supabase
      .from('comments')
      .select(`*, profiles!inner(nickname,avatar_img_url)`)
      .eq('post_id', postId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return comments || [];
  } catch (error) {
    throw error;
  }
};

export const getInsertComment = async ({ profile, postId, content }: InsertComment) => {
  try {
    const { error } = await supabase
      .from('comments')
      .insert([{ author_id: profile?.id, post_id: postId, content }])
      .select();

    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

export const getDeleteComment = async (id: string) => {
  try {
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    throw error;
  }
};
