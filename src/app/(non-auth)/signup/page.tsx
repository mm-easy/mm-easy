"use client"
import Link from 'next/link';
import { useState } from 'react';
import { useSignUp } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp } = useSignUp(); 
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('비밀번호가 서로 일치하지 않습니다.'); 
      return;
    }
    try {
      await signUp(email, password);
      toast.success('회원가입에 성공했습니다!'); 
      router.push('/login');
    } catch (error) {
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-black rounded-full">
          {/* 여기에 고양이 */}
        </div>
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              ID
            </label>
            <div className="mt-1">
              <input 
                id="email"
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input 
                id="password"
                type="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1">
              <input 
                id="confirm-password"
                type="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 text-white bg-black rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
            >
              회원가입
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-6">
          <Link href="/login" className="text-sm font-medium text-blue-600 hover:underline">
              이미 계정이 있나요? 로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
