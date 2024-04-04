'use client';
// import ReactQuill, { Quill } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import NoticeEditor from './NoticeEditor';

const PostForm = () => {
  const { getCurrentUserProfile } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState('질문');
  const router = useRouter();

  // const formats = [
  //   'font',
  //   'header',
  //   'bold',
  //   'italic',
  //   'underline',
  //   'strike',
  //   'blockquote',
  //   'list',
  //   'bullet',
  //   'indent',
  //   'link',
  //   'align',
  //   'color',
  //   'background',
  //   'size',
  //   'h1',
  // ];

  //  const modules = useMemo(() => {
  //     return {
  //       toolbar: {
  //         container: [
  //           [{ size: ['small', false, 'large', 'huge'] }],
  //           [{ align: [] }],
  //           ['bold', 'italic', 'underline', 'strike'],
  //           [{ list: 'ordered' }, { list: 'bullet' }],
  //           [
  //             {
  //               color: [],
  //             },
  //             { background: [] },
  //           ],
  //         ],
  //       },
  //     };
  //   }, []);

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

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // const handleContent = (e: any) => {
  //   setContent(e.target.value);
  // };

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    router.push('/community-list');
  };

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

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
      router.push('/community-list');
    }

    console.log(data);
  };

  return (
    <form onSubmit={handleNewPost}>
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
      <NoticeEditor value={content} onChange={handleEditorChange} />

      {/* <div>
        <textarea value={content} onChange={handleContent} placeholder=" 내용을 입력해 주세요."></textarea>
      </div> */}
      <div>
        <button onClick={handleCancel}>취소</button>
        <button type="submit">작성</button>
      </div>
    </form>
  );
};

export default PostForm;
