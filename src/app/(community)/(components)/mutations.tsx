import { getDeleteComment, getInsertComment } from '@/api/comment';
import { InsertComment, UpdateCommentParams } from '@/types/posts';
import { supabase } from '@/utils/supabase/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useInsertComment = () => {
  const queryClient = useQueryClient();

  const insertCommentMuitation = useMutation({
    mutationFn: async ({ profile, postId, content }: InsertComment) => {
      try {
        const result = await getInsertComment({ profile, postId, content });
        toast.success('댓글이 등록되었습니다.');
        return result;
      } catch (error) {
        toast.error('댓글 추가 중 오류가 발생했습니다.');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });
  return insertCommentMuitation;
};

/**댓글 수정 */
export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  const insertCommentUpdateMuitation = useMutation({
    mutationFn: async ({ contentChange, id }: UpdateCommentParams) => {
      try {
        const result = await supabase.from('comments').update({ content: contentChange }).eq('id', id).select();
        if (result) {
          toast.success('수정 되었습니다.');
          return result;
        }
      } catch {
        toast.error('수정 하는데 문제가 발생했습니다.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });
  return insertCommentUpdateMuitation;
};

/** 댓글 삭제 */
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const insertCommentDeleteMuitation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const result = await getDeleteComment(id);
        toast.success('삭제 되었습니다.');
        return result;
      } catch (error) {
        toast.error('삭제 하는데 문제가 발생했습니다.');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });
  return insertCommentDeleteMuitation;
};
