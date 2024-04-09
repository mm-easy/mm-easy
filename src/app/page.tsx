'use client';

import { useEffect } from 'react';
import { supabase } from '@/utils/supabase/supabase';
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
    <div className="flex flex-col items-center justify-center pt-16">
      <h1>MM-Easy</h1>
    </div>
  );
};
export default Home;
