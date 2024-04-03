'use client';

import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const PostForm = () => {
  const { getCurrentUserProfile } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('전체');

  const {
    data: profile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>An error occurred: {error instanceof Error ? error.message : 'Unknown error'}</div>;

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: any) => {
    setContent(e.target.value);
  };

  const handleCategory = (e: any) => {
    setCategory(e.target.value);
  };

  const addPostHandler = async (e: any) => {
    e.preventDefault();

    if (!profile) {
      alert('사용자 정보가 없습니다.');
      return;
    }

    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, category, author_id: profile.id }])
      .select('*');

    console.log(profile);

    if (error) {
      console.error('게시물 추가 중 오류가 발생했습니다:', error.message);
      alert('게시물 추가 중 오류가 발생했습니다.');
    } else {
      alert('게시물이 등록되었습니다.');
    }

    console.log(data);
  };

  return (
    <form onSubmit={addPostHandler}>
      <div>
        <label>분류</label>
        <select value={category} onChange={handleCategory}>
          <option value="질문">질문</option>
          <option value="잡담">잡담</option>
          <option value="공부">공부</option>
          <option value="일기">일기</option>
        </select>
      </div>
      <div>
        <label></label>
        <input type="text" value={title} onChange={handleTitle} placeholder=" 제목을 입력해 주세요." />
      </div>
      <div>
        <textarea value={content} onChange={handleContent} placeholder=" 내용을 입력해 주세요."></textarea>
      </div>
      <div>
        <button>취소</button>
        <button type="submit">작성</button>
      </div>
    </form>
  );
};

export default PostForm;
