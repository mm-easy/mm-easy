import { toast } from 'react-toastify';
import { getDeleteComment, getInsertComment, getUpdateComment, isOpenUpdate } from '@/api/comment';
import { deleteLike, insertLike } from '@/api/likes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { InsertComment, IsOpenType, LikeParams, UpdateCommentParams } from '@/types/posts';

export const useInsertComment = () => {
  const queryClient = useQueryClient();

  /** 댓글 등록 */
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
        const result = getUpdateComment({ contentChange, id });
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

/** 좋아요 만들기 */
export const useInsertLike = () => {
  const queryClient = useQueryClient();

  const insertLikeMuitation = useMutation({
    mutationFn: async ({ userId, postId }: LikeParams) => {
      try {
        await insertLike({ userId, postId });
      } catch (error) {
        toast.error('좋아요에 오류가 생겼습니다.');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like'] });
    }
  });
  return insertLikeMuitation;
};

/** 좋아요 삭제 */
export const useDeleteLike = () => {
  const queryClient = useQueryClient();

  const insertLikeMuitation = useMutation({
    mutationFn: async ({ userId, postId }: LikeParams) => {
      try {
        await deleteLike({ userId, postId });
      } catch (error) {
        toast.error('좋아요에 오류가 생겼습니다.');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like'] });
    }
  });
  return insertLikeMuitation;
};

/** 댓글 드롭다운 */
export const useCommentIsOpen = () => {
  const queryClient = useQueryClient();

  const insertCommentIsOpenMuitation = useMutation({
    mutationFn: async ({ isOpen, id }: IsOpenType) => {
      try {
        const result = isOpenUpdate({ isOpen, id });
        if (result) {
          return result;
        }
      } catch {
        toast.error('문제가 발생했습니다.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });
  return insertCommentIsOpenMuitation;
};
