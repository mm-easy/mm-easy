'use client';
import dynamic from 'next/dynamic';

import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { insertPost } from '@/api/posts';

const NoticeEditor = dynamic(() => import('../(components)/NoticeEditor'), { ssr: false });

const PostForm = () => {
  const { getCurrentUserProfile } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState('질문');
  const router = useRouter();

  const categories = [
    { id: 'question', value: '질문', label: '질문' },
    { id: 'chat', value: '잡담', label: '잡담' },
    { id: 'study', value: '공부', label: '공부' },
    { id: 'diary', value: '일기', label: '일기' }
  ];

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

  //
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  //
  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  // 카테고리 핸들러
  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  // 취소버튼 핸들러
  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    router.push('/community-list');
  };

  // 새로운 post 추가 핸들러
  const handleNewPost = async (e: FormEvent<HTMLFormElement>) => {
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

    // post 등록
    try {
      const data = await insertPost(title, content, category, profile.id);
      alert('게시물이 등록되었습니다.');
      router.push('/community-list');
      console.log(data);
    } catch (error) {
      alert('게시물 추가 중 오류가 발생했습니다.');
      console.error(error);

      console.log("내용은 =>",content)
    }
  };

  return (
    <form onSubmit={handleNewPost}>
      <section className="flex">
        {categories.map((item) => (
          <div className="w-20" key={item.id}>
            <input
              className=""
              type="radio"
              id={item.id}
              name="category"
              value={item.value}
              checked={category === item.value}
              onChange={handleCategoryChange}
            />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
        ))}
      </section>
      <div>
        <input type="text" value={title} onChange={handleTitle} placeholder=" 제목을 입력해 주세요." />
      </div>
      <div>
        <NoticeEditor value={content} onChange={handleEditorChange} />
      </div>
      <div>
        <button onClick={handleCancel}>취소</button>
        <button type="submit">작성</button>
      </div>
    </form>
  );
};

export default PostForm;
