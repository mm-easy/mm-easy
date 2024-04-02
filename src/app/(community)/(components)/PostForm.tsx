'use client';

import { supabase } from '@/utils/supabase/supabase';
import { useState } from 'react';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: any) => {
    setContent(e.target.value);
  };

  const addPostHandler = async (e: any) => {
    e.preventDefault();

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
      .insert([{ title, content, author_id: "jaemina20@gmail.com" }])
      .select('*');

    if (error) {
      console.error('게시물 추가 중 오류가 발생했습니다:', error.message);
      alert('게시물 추가 중 오류가 발생했습니다.');
    } else {
      alert('게시물이 등록되었습니다.');
    }
  };

  return (
    <form onSubmit={addPostHandler}>
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
