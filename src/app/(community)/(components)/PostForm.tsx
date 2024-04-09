'use client';
import dynamic from 'next/dynamic';

import CategorySelector from './CategorySelector';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { insertPost } from '@/api/posts';
import { toast } from 'react-toastify';

import type { Params } from '@/types/posts';

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

  const params = useParams<Params>();
  const categoryNow = decodeURIComponent(params.category);

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
    router.push('/community-list?category=전체');
  };

  // 새로운 post 추가 핸들러
  const handleNewPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profile) {
      toast('사용자 정보가 없습니다.');
      return;
    }

    if (!title.trim()) {
      toast('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      toast('내용을 입력해주세요.');
      return;
    }

    // post 등록
    try {
      const newPost = await insertPost(title, content, category, profile.id);
      toast('게시물이 등록되었습니다.');
      router.push(`/community-list/${category}/${newPost}`);
    } catch (error) {
      toast('게시물 추가 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <article className="flex">
      <div>
        <CategorySelector categoryNow={categoryNow} />
      </div>
      <form onSubmit={handleNewPost} className='p-20'>
        <section className="flex">
          {categories.map((item) => (
            <div className='' key={item.id}>
              <input
                className="hidden"
                type="radio"
                id={item.id}
                name="category"
                value={item.value}
                checked={category === item.value}
                onChange={handleCategoryChange}
              />
              <label
                htmlFor={item.id}
                className={`text-lg px-8 cursor-pointer ${category === item.value ? 'bg-pointColor1 text-white' : 'bg-white'}`}
              >
                {item.label}
              </label>
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
    </article>
  );
};

export default PostForm;
