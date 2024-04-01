import { useState } from 'react';
import { supabase } from '../utils/supabase/supabase';

export const useSignUp = () => {
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
    if (password.length < 6) {
      setError('비밀번호는 6자리 이상이어야 합니다.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setError(error.message);
    else setError(null);

    setLoading(false);
  };

  return { signUp, loading, error, setError };
};
