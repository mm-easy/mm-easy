'use client';
import dynamic from 'next/dynamic';

import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { insertPost, updateCommunityPost } from '@/api/posts';
import { CommunityEditFormProps } from '@/types/posts';
import { toast } from 'react-toastify';

const NoticeEditor = dynamic(() => import('../(components)/NoticeEditor'), { ssr: false });

const EditForm = ({ postId, prevTitle, prevContent, prevCategory }: CommunityEditFormProps) => {
  const { getCurrentUserProfile } = useAuth();
  const [title, setTitle] = useState(prevTitle);
  const [content, setContent] = useState<string>(prevContent);
  const [category, setCategory] = useState(prevCategory);

   useEffect(() => {
    setTitle(prevTitle);
    setContent(prevContent);
    setCategory(prevCategory);
  }, [prevTitle, prevContent, prevCategory, postId]);

  type Params = {
    category: string;
    id: string;
  };

  const router = useRouter();
  const params = useParams<Params>();
  const categoryNow = decodeURIComponent(params.category);

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

  // 게시글 제목 
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 에디터 내용
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

  const navigateToCreatedPost = (postId: string) => {
    router.push(`/community-list/${categoryNow}/${postId}`);
  };

  

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      await updateCommunityPost( postId, title, content, category);
      toast('수정이 완료되었습니다.');
      navigateToCreatedPost(postId);
      console.log("content => ",content)
    }}>
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

export default EditForm;
