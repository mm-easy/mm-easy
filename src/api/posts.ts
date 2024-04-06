import { Post } from '@/types/posts';
import { supabase } from '@/utils/supabase/supabase';
import { v4 as uuid } from 'uuid';

// posts 테이블에서 게시글 가져오기
export const getPosts = async (offset = 0, limit = 10) => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`*, profiles!inner(nickname)`)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return posts || [];
  } catch (error) {
    console.error('포스트를 가져오는 중 오류 발생:', error);
    return [];
  }
};

// posts 첨부 이미지를 스토리지에 upload
export const uploadPostImageToStorage = async (file: File) => {
  const fileNewName = uuid();
  const { data, error } = await supabase.storage.from('community-image').upload(`quill_image/${fileNewName}`, file);

  if (error) {
    console.error('이미지 업로드 중 오류 발생:', error);
    return { error };
  }

  const response = await supabase.storage.from('community-image').getPublicUrl(`quill_image/${fileNewName}`);
  if (response.data) {
    return { url: response.data.publicUrl };
  } else {
    console.error('No public URL found in response data.');
    return { error: 'No public URL found' };
  }
};

// post를 posts 테이블에 insert
export const insertPost = async (title: string, content: string, category: string, authorId: string) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, content, category, author_id: authorId }])
    .select('*');

  if (error) {
    console.error('게시물 추가 중 오류가 발생했습니다:', error.message);
    throw new Error(error.message);
  }

  return data;
};


export const updatePost = async (id: string, title: string, content: string, category: string) => {
  const { data, error } = await supabase
    .from('posts')
    .update({ title, content, category })
    .eq('id', id);

  if (error) {
    console.error('게시물 수정 중 오류가 발생했습니다:', error.message);
    throw new Error(error.message);
  }

  return data;
};