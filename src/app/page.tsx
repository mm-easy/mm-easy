'use client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase/supabase';

const Home = () => {
  const { getCurrentUserProfile } = useAuth();

  const {
    data: profile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

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

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>An error occurred: {error instanceof Error ? error.message : 'Unknown error'}</div>;

  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <h1>User Profile</h1>
      {profile ? (
        <div>
          <p>Id: {profile.id}</p>
          <p>Email: {profile.email}</p>
          <p>Nickname: {profile.nickname}</p>
          <p>Avatar: {profile.avatar_img_url}</p>
        </div>
      ) : (
        <p>No profile data</p>
      )}
    </div>
  );
};

export default Home;
