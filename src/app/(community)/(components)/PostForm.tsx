'use client';
import dynamic from 'next/dynamic';

import CategorySelector from './CategorySelector';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { insertPost } from '@/api/posts';
import { toast } from 'react-toastify';
import { CancelButton, SubmitButton } from '@/components/common/FormButtons';

import type { Params } from '@/types/posts';

const NoticeEditor = dynamic(() => import('../(components)/NoticeEditor'), { ssr: false });

const PostForm = () => {
  const { getCurrentUserProfile } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState('질문');
  const router = useRouter();

  const categories = [
    { id: 'notice', value: '공지', label: '공지' },
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
  const handleCancel = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const confirmLeave = confirm('작성하던 내용이 모두 사라집니다. 취소하시겠습니까?');
    if (confirmLeave) {
      // 사용자가 '예'를 선택한 경우
      router.push('/community-list?category=전체');
    } else {
      // 사용자가 '아니오'를 선택한 경우, 아무 동작도 하지 않음
    }
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
    <main className="grid grid-cols-[16%_84%] h-[84vh]">
      <div className='bg-bgColor1 border-r-2 border-solid border-pointColor1'>
        <CategorySelector categoryNow={categoryNow} />
      </div>
      <form onSubmit={handleNewPost} className="w-full mt-[4vh] px-48">
        <section className="flex border-b border-pointColor1 border-solid">
          {categories.map((item) => (
            <div key={item.id}>
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
                className={`font-bold rounded-tl-lg rounded-tr-lg text-lg px-6 pt-1 cursor-pointer  ${
                  category === item.value ? 'bg-pointColor1 text-white' : 'bg-white'
                }`}
              >
                {item.label}
              </label>
            </div>
          ))}
        </section>
        <div>
          <input
            className="w-full focus:outline-none font-medium h-24 text-3xl placeholder-gray-300"
            type="text"
            value={title}
            onChange={handleTitle}
            placeholder=" 제목을 입력하세요."
            maxLength={36}
          />
        </div>
        <div>
          <NoticeEditor value={content} onChange={handleEditorChange} />
        </div>
        <div className="pt-14 flex justify-center gap-5 font-bold">
          <CancelButton text="취소" onClick={handleCancel} width="w-[15%]" border="border-2" />
          <SubmitButton text="완료" width="w-[15%]" />
        </div>
      </form>
    </main>
  );
};

export default PostForm;
