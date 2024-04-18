import { supabase } from '@/utils/supabase/supabase';

import type { InsertComment, UpdateCommentParams } from '@/types/posts';

/** 댓글가져오기 */
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

/** 댓글수 가져오기 */
export const getCommentCount = async (postId: string) => {
  const { data, error, count } = await supabase
    .from('comments')
    .select('*', { count: 'exact' })
    .eq('post_id', postId);

  if (error) {
    throw new Error(error.message);
  }

  return count; 
};


/** 댓글만들기 */
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

/** 댓글수정 */
export const getUpdateComment = async ({ contentChange, id }: UpdateCommentParams) => {
  try {
    const { error } = await supabase.from('comments').update({ content: contentChange }).eq('id', id).select();

    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

/** 댓글삭제 */
export const getDeleteComment = async (id: string) => {
  try {
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    throw error;
  }
};
