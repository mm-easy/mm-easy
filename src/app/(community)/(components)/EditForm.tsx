'use client';
import dynamic from 'next/dynamic';

import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { updateCommunityPost } from '@/api/posts';
import { toast } from 'react-toastify';

import type { CommunityEditFormProps, Params } from '@/types/posts';

const NoticeEditor = dynamic(() => import('../(components)/NoticeEditor'), { ssr: false });

const EditForm = ({ postId, prevTitle, prevContent, prevCategory, prevAuthorId }: CommunityEditFormProps) => {
  const { getCurrentUserProfile } = useAuth();
  const [title, setTitle] = useState(prevTitle);
  const [content, setContent] = useState<string>(prevContent);
  const [category, setCategory] = useState(prevCategory);
  const router = useRouter();
  const params = useParams<Params>();
  const categoryNow = decodeURIComponent(params.category);
  const [loaded, setLoaded] = useState(false);

  // 게시글 정보 가져오기 (작성자 정보 포함)
  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  useEffect(() => {
    if (isProfileLoading) {
      // 사용자 정보 로딩 중인 경우, 아직 아무것도 하지 않음
      return;
    }
  
    if (!userProfile) {
      // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
      router.push('/login');
      toast('로그인 후 이용해 주세요');
      return;
    }
  
    if (userProfile.id !== prevAuthorId) {
      // 사용자가 게시글의 작성자가 아닌 경우, 리다이렉트
      router.push('/community-list?category=전체');
      toast('접근할 수 없는 게시글 입니다.');
    } else {
      // 사용자가 게시글의 작성자인 경우에만 loaded를 true로 설정
      setLoaded(true);
    }
  }, [userProfile, prevAuthorId, isProfileLoading, router]);

  useEffect(() => {
    setTitle(prevTitle);
    setContent(prevContent);
    setCategory(prevCategory);
  }, [prevTitle, prevContent, prevCategory, postId]);

  const categories = [
    { id: 'question', value: '질문', label: '질문' },
    { id: 'chat', value: '잡담', label: '잡담' },
    { id: 'study', value: '공부', label: '공부' },
    { id: 'diary', value: '일기', label: '일기' }
  ];


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

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await updateCommunityPost(postId, title, content, category);
        toast('수정이 완료되었습니다.');
        navigateToCreatedPost(postId);
        console.log('content => ', content);
      }}
    >
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
