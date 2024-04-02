import { useState } from 'react';
import { supabase } from '../utils/supabase/supabase';

import type { User } from '@/types/users';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    if (!email || !email.includes('@')) {
      setError('유효한 이메일 주소를 입력해주세요.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setError(error.message);
    else setError(null);

    setLoading(false);

    if (data.user) {
        const nickname = email.split('@')[0];
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, email, nickname, avatar_img_url: "https://via.placeholder.com/150" }]);
    
        if (insertError) {
          setError(insertError.message);
        }
      } else {
        setError('회원가입에 성공했으나 사용자 정보를 불러올 수 없습니다.');
      }
    
      setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    try {
        setLoading(true);
        setError(null);
      
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      
        if (error || !data.user) {
          throw new Error(error?.message || "로그인 실패");
        }
        setLoading(false);
        return true;
      } catch (error) {
          setLoading(false);
          const message = (error as Error).message;
          setError(message); 
          return null; 
    }
};

  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
    } else {
      setError(null);
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
  
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
  
      const { data, error: getUserError } = await supabase.auth.getUser();
  
      if (getUserError) {
        setError(getUserError.message);
        setLoading(false);
        return;
      }
  
      if (data && data.user) {
        const email = data.user.email || '';
        const nickname = email.split('@')[0];
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, email, nickname, avatar_img_url: "https://via.placeholder.com/150" }]);
  
        if (insertError) {
          setError(insertError.message);
        }
      } else {
        setError('회원가입에 성공했으나 사용자 정보를 불러올 수 없습니다.');
      }
      setLoading(false);
    } catch (error) {
      console.error('구글 소셜 로그인 오류:', error);
      setError('구글 소셜 로그인 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };
  
  const signInWithKakao = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {},
      });
  
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
  
      const { data, error: getUserError } = await supabase.auth.getUser();
  
      if (getUserError) {
        setError(getUserError.message);
        setLoading(false);
        return;
      }
  
  
      if (data && data.user) {
        const email = data.user.email || '';
        const nickname = email.split('@')[0];
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, email, nickname, avatar_img_url: "https://via.placeholder.com/150" }]);
  
        if (insertError) {
          setError(insertError.message);
        }
      } else {
        setError('회원가입에 성공했으나 사용자 정보를 불러올 수 없습니다.');
      }
      setLoading(false);
    } catch (error) {
      console.error('카카오톡 소셜 로그인 오류:', error);
      setError('카카오톡 소셜 로그인 중 오류가 발생했습니다.');
      setLoading(false);
    }
  }; 
  
  const getCurrentUserProfile = async (): Promise<User | null> => {
    setLoading(true);

    const { data: userData, error: getUserError } = await supabase.auth.getUser();
    console.log('data', userData); 
    if (getUserError || !userData.user) {
      setError(getUserError?.message || "로그인한 사용자가 없습니다.");
      setLoading(false);
      return null;
    }
  
    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id) 
        .single();

      if (profileError) throw profileError;

      setLoading(false);
      return profile as User; 
    } catch (error) {
      console.error("프로필 정보 조회 실패:", error);
      setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
      setLoading(false);
      return null;
    }
  };

  return { signUp, signIn, logout, loading, error, setError, signInWithGoogle, signInWithKakao, getCurrentUserProfile };
};
