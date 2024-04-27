'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/supabase';
import QuizSection from './(main)/QuizSection';
import CommunitySection from './(main)/CommunitySection';
import Banner from './(main)/Banner';
import RankingSection from './(main)/RankingSection';
import Footer from './(main)/Footer';
import PageUpBtn from '@/components/common/PageUpBtn';
import NewsSection from './(main)/NewsSection';

const Home = ({ newsData }: { newsData: React.ReactNode }) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  /** 소셜 로그인 가입 시 profiles 업데이트 */
  useEffect(() => {
    const saveUserProfile = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session) {
        const user = session.session?.user;
        if (user) {
          const id = user.id;
          const email = user.email ?? '';
          const nickname = email.split('@')[0].substring(0, 8);

          const { data: existingProfile, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', email)
            .maybeSingle();

          if (error) {
            console.error('프로필 조회 중 에러 발생', error.message);
            return;
          }

          if (!existingProfile) {
            try {
              const { error } = await supabase
                .from('profiles')
                .upsert([{ id, email, nickname, avatar_img_url: 'login_1.png' }], {
                  onConflict: 'id'
                });
              if (error) {
                console.error('프로필 정보 저장 실패:', error.message);
              }
            } catch (error) {
              console.error(error);
            }
          }
        }
      }
    };
    saveUserProfile();
  }, []);

  /** 스크롤 이동 추적 */
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div>
      <Banner />
      <QuizSection />
      <RankingSection />
      <CommunitySection />
      <NewsSection />
      {newsData}
      <Footer />
      <PageUpBtn scrollPosition={scrollPosition} bottom="bottom-[80px]" smallBottom="sm:bottom-28" />
    </div>
  );
};

export default Home;
