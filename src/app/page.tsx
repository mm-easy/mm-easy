'use client';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecentPosts } from '@/api/posts';
import { supabase } from '@/utils/supabase/supabase';
import { getRecentQuizzes } from '@/api/quizzes';
import { formatToLocaleDateTimeString } from '@/utils/date';
import Link from 'next/link';
import Image from 'next/image';

import type { Quiz } from '@/types/quizzes';

const Home = () => {

  useEffect(() => {
    const saveUserProfile = async () => {
      const userDataString = localStorage.getItem('sb-icnlbuaakhminucvvzcj-auth-token');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData) {
          const user = userData.user;
          const id = user.id;
          const email = user.email;
          const nickname = email.split('@')[0];

          try {
            const { error } = await supabase 
            .from('profiles')
            .upsert([
              { id, email, nickname, avatar_img_url: "https://via.placeholder.com/150" }
            ], {
              onConflict: "id"
            });
            if (error) {
              console.error('프로필 정보 저장 실패:', error.message);
            }
            } catch (error) {
            console.error(error);
            }
          }
        }
  };
      saveUserProfile();
    }, []);

    const { data: posts } = useQuery({
      queryKey: ['recentPosts'],
      queryFn: getRecentPosts, 
      staleTime: 1000 * 60 * 5,
    });

    const { data: quiz , error } = useQuery<Quiz[]>({
      queryKey: ['recentQuiz'],
      queryFn: getRecentQuizzes, 
      staleTime: 1000 * 60 * 5,
    });

  return (
    <div className="min-h-screen">
      <header className="w-full h-400 relative"> 
      <Image
        src={'https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/main-image/mainimage.jpeg'}
        alt="메인 로고"
        width={1920}
        height={400}
        className="object-cover"
        unoptimized 
      />
    </header>
    <div className="p-4 text-2xl text-pointColor1 bg-bgColor1 font-bold border-b border-solid border-pointColor1">
          최근 올라온 퀴즈
        </div>
      <section className="">
        <div className="grid grid-cols-4 gap-2 p-4">
        {quiz?.map((quiz) => (
          <div key={quiz.id} className="flex flex-col border my-5 border-solid border-gray-200 rounded-t-3xl rounded-b-md p-4">
            <p className="font-bold text-lg mt-4 mb-3">{quiz.title}</p>
            <div className="flex flex-col gap-3">
              <div className="border-solid border border-pointColor1 rounded-md overflow-hidden w-[250px] h-[250px]">
                <Image
                  src={`https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/quiz-thumbnails/${quiz.thumbnail_img_url}`}
                  alt="퀴즈 썸네일"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mb-4">{quiz.info}</p>
              <Link href={`/quiz/${quiz.id}`}>
                <div className="text-white bg-pointColor1 rounded-md p-2 text-center">퀴즈 풀기</div>
              </Link>
            </div>
          </div>
        ))}
        </div>
      </section>
      <div className="p-4 text-2xl text-pointColor1 bg-bgColor1 font-bold border-y border-solid border-pointColor1">
          랭킹
        </div>
      <section className="my-8">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-4 shadow rounded">
              <h3 className="text-xl font-medium mb-2">사용자 {index + 1}</h3>
              <p className="text-gray-600">점수: {Math.floor(Math.random() * 100)}</p>
            </div>
          ))}
        </div>
      </section>
        <div className="p-4 text-2xl text-pointColor1 bg-bgColor1 font-bold border-y border-solid border-pointColor1">
          최근 올라온 글
        </div>
        <section className="">
        <div className="flex">
          <div className="w-1/2 p-4 border-r border-solid border-pointColor1">
            <div className='flex justify-between'>
            <h2 className="text-lg font-bold">유저가 쓴 글</h2>
            <h2 className="font-semibold text-pointColor1">더보기</h2>
            </div>
            <div>
              {posts?.map((post, index) => (
                <div key={post.id} className={`py-4 ${index !== posts.length ? 'border-b' : ''} border-solid border-pointColor1`}>
                  <Link href={`/community-list/${post.id}`}>  
                      <h2 className="text-lg font-bold">{post.title}</h2>
                      <time>작성일: {formatToLocaleDateTimeString(post.created_at)}</time>
                  </Link>
                </div>
              ))}
          </div>
          </div>
          <div className="w-1/2 p-4">
          <div className='flex justify-between'>
          <h2 className="text-lg font-bold">유저가 쓴 글</h2>
          <h2 className="font-semibold text-pointColor1">더보기</h2>
          </div>
          <div>
              {posts?.map((post, index) => (
                <div key={post.id} className={`py-4 ${index !== posts.length ? 'border-b' : ''} border-solid border-pointColor1`}>
                  <Link href={`/community-list/${post.id}`}>  
                      <h2 className="text-lg font-bold">{post.title}</h2>
                      <time>작성일: {formatToLocaleDateTimeString(post.created_at)}</time>
                  </Link>
                </div>
              ))}
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
