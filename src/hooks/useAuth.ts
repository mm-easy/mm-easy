import { useState } from 'react';
import { supabase } from '../utils/supabase/supabase';

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
    setLoading(true);
    setError(null);
  
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    setLoading(false); 
  
    if (error) {
      setError(error.message);
      return false; 
    }
  
    return true;
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
        const { data, error } = await supabase.auth.signInWithOAuth({
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
          } else {
            setError(null);
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
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'kakao',
            options: {
            },
          });
      
          if (error) {
            setError(error.message);
          } else {
            setError(null);
          }
      
          setLoading(false);
        } catch (error) {
          console.error('카카오톡 소셜 로그인 오류:', error);
          setError('카카오톡 소셜 로그인 중 오류가 발생했습니다.');
          setLoading(false);
        }
      };

  return { signUp, signIn, logout, loading, error, setError, signInWithGoogle, signInWithKakao };
};
