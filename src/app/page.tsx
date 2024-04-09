'use client';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase/supabase';
import QuizSection from './(main)/(components)/quizSection';
import CommunitySection from './(main)/(components)/CommunitySection';
import Image from 'next/image';

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
    <QuizSection/>
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
      <CommunitySection />
    </div>
  );
};

export default Home;
