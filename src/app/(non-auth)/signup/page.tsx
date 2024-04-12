'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, error } = useAuth();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('비밀번호가 서로 일치하지 않습니다.');
      return;
    }
    if (password.length < 6) {
      toast.error('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    const signUpResult = await signUp(email, password);

    if (signUpResult && signUpResult.error) {
      toast.error(signUpResult.errorMessage);
      return;
    }

    toast.success('회원가입에 성공했습니다! 로그인 페이지로 이동합니다.');
    router.push('/login');
  };

  return (
    <article className="flex flex-col h-[84vh]">
      <div className="grid grid-cols-10 min-h-full bg-bgColor1">
        <div className="col-span-4 flex items-center justify-center border-r-2 border-solid border-pointColor1">
          <div className="w-80 h-80 bg-gray-400 rounded-full flex items-center justify-center">{/* 고양이 예시 */}</div>
        </div>
        <div className="col-span-6 flex items-center bg-white justify-center">
          <div className="w-full max-w-md p-8 bg-white">
            <form className="space-y-6" onSubmit={handleSignUp}>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700"></label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full px-3 py-4 rounded-md border border-pointColor1 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      placeholder="이메일을 입력해주세요"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-medium text-gray-700"></label>
                  <div className="mt-1">
                    <input
                      id="password"
                      type="password"
                      required
                      className="w-full px-3 py-4 rounded-md border border-pointColor1 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      placeholder="비밀번호를 입력해주세요"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700"></label>
                  <div className="mt-1">
                    <input
                      id="confirm-password"
                      type="password"
                      required
                      className="w-full px-3 py-4 rounded-md border border-pointColor1 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      placeholder="비밀번호를 다시 입력해주세요"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-5 rounded-md text-white bg-pointColor1 shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
                >
                  회원가입
                </button>
              </div>
            </form>
            <div className="flex justify-center mt-3">
              <Link className="text-sm font-medium text-pointColor1 hover:underline" href="/login">
                이미 계정이 있나요? 로그인하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SignUpPage;
