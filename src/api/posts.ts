import { setCookie } from 'cookies-next';
import { getCookie } from 'cookies-next';
import { supabase } from '@/utils/supabase/supabase';

import type { PostDetailDateType } from '@/types/posts';

// posts 테이블에서 게시글 가져오기
export const getPosts = async () => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`*, profiles!inner(nickname)`)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // 데이터가 성공적으로 로드된 후, "공지" 카테고리를 최상단으로 재정렬
    if (posts) {
      const noticePosts = posts.filter((post) => post.category === '공지');
      const otherPosts = posts.filter((post) => post.category !== '공지');
      return [...noticePosts, ...otherPosts];
    }

    return [];
  } catch (error) {
    console.error('포스트를 가져오는 중 오류 발생:', error);
    return [];
  }
};

export const getRecentPosts = async () => {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .neq('category', '공지')
    .is('deleted_at', null)
    .order('created_at', { ascending: false }) // 최신 게시글부터 정렬
    .limit(3); // 3개의 게시글만 가져옴

  if (error) throw error;
  return posts || [];
};

export const getRecentNotice = async () => {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', '공지')
    .is('deleted_at', null)
    .order('created_at', { ascending: false }) // 최신 게시글부터 정렬
    .limit(3); // 3개의 게시글만 가져옴

  if (error) throw error;
  return posts || [];
};

// posts 테이블에서 게시글 삭제하기
export const removeCommunityPost = async (postId: string) => {
  const { error } = await supabase.from('posts').delete().eq('id', postId);
  if (error) {
    console.error(`Failed to delete data from Supabase - ${error.message}`);
  }
};

// posts 첨부 이미지를 스토리지에 upload
export const uploadPostImageToStorage = async (file: File) => {
  const fileNewName = crypto.randomUUID();
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

  return data[0].id;
};

// post를 업데이트
export const updateCommunityPost = async (postId: string, title: string, content: string, category: string) => {
  const { data, error } = await supabase.from('posts').update({ title, content, category }).eq('id', postId).select();

  if (data && !error) {
  }
};

/** 커뮤니티 메뉴 누를때 해당 카테고리 */
export const getFilterPosts = async (category: string | null) => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`*, profiles!inner(nickname)`)
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return posts || [];
  } catch (error) {
    console.error('포스트를 가져오는 중 오류 발생:', error);
    return [];
  }
};

export const getPostDetail = async (postId: string) => {
  try {
    const { data: post, error } = await supabase
      .from('posts')
      .select(`*, profiles!inner(nickname,avatar_img_url,email)`)
      .eq('id', postId);
    if (error) {
      throw error;
    } else {
      const getPost = post[0];
      postView(getPost, postId);
      return getPost || [];
    }
  } catch (error) {
    throw error;
  }
};

export const getPostCategoryDetail = async (categoryNow: string | null, postId: string) => {
  try {
    const { data: post, error } = await supabase
      .from('posts')
      .select(`*, profiles!inner(nickname,avatar_img_url,email)`)
      .eq('category', categoryNow)
      .eq('id', postId);
    if (error) {
      throw error;
    } else {
      const getPost = post[0];
      postView(getPost, postId);
      return getPost || [];
    }
  } catch (error) {
    throw error;
  }
};

export const fetchPost = async (id: string | undefined) => {
  try {
    const { data: posts, error } = await supabase.from('posts').select('*').eq('id', id);
    if (error) throw error;
    console.log(posts);
    return posts![0];
  } catch (error) {
    console.error();
    throw error;
  }
};

export const getMyActivityPosts = async (userId: string) => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`*, profiles!inner(nickname)`)
      .eq('author_id', userId) // 'author_id'와 사용자의 ID를 비교
      .order('created_at', { ascending: true });

    if (error) throw error;
    return posts || [];
  } catch (error) {
    console.error('포스트를 가져오는 중 오류 발생:', error);
    return [];
  }
};

/** 조회수 쿠키 */
const postView = async (getPost: PostDetailDateType, postId: string) => {
  let myCookie = getCookie('PostCookie');
  if (!myCookie) {
    const cookieValue = crypto.randomUUID();
    setCookie('PostCookie', cookieValue, { maxAge: 60 * 60, path: '/' });
    myCookie = cookieValue;
  }

  const viewArray = getPost.view_array || [];
  const cookieIncludes = viewArray.includes(myCookie);
  if (getPost && !cookieIncludes) {
    const newView = [...viewArray, myCookie];
    const { error: updateError } = await supabase.from('posts').update({ view_array: newView }).eq('id', postId);
    const { error } = await supabase
      .from('posts')
      .update({ view_count: (getPost.view_count ?? 0) + 1 })
      .eq('id', postId);

    if (updateError || error) {
      console.error('조회수 업데이트 실패:', updateError);
    }
  }
};
