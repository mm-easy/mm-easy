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
          .insert([{ id: data.user.id, email, nickname }]);
    
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

    if (error) {
      setError(error.message);
    } else {
      setError(null);
    }

    setLoading(false);
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

  return { signUp, signIn, logout, loading, error, setError };
};
