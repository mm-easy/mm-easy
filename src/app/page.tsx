'use client';

import { useEffect } from 'react';
import { supabase } from '@/utils/supabase/supabase';
import QuizSection from './(main)/(components)/QuizSection';
import CommunitySection from './(main)/(components)/CommunitySection';
import MainLogo from './(main)/(components)/MainLogo';
import RankingSection from './(main)/(components)/RankingSection';

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
              .upsert([{ id, email, nickname, avatar_img_url: 'https://via.placeholder.com/150' }], {
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
    };
    saveUserProfile();
  }, []);

  return (
    <div className="min-h-screen">
    <MainLogo />
    <QuizSection/>
    <RankingSection />
    <CommunitySection />
    </div>
  );
};

export default Home;
