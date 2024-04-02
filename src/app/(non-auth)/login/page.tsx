"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth'; 
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading, error, signInWithGoogle } = useAuth(); 
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
    
    if (!error) {
      router.push('/'); 
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="flex min-h-screen bg-red-100">
    <div className="flex-1 flex items-center justify-center">
      <div className="w-80 h-80 bg-gray-400 rounded-full flex items-center justify-center">
        {/* 고양이 예시 */}
      </div>
    </div>
    <div className="flex-1 flex items-center bg-white justify-center">
      <div className="w-full max-w-md p-8 bg-white">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
            </label>
            <div className="mt-1">
              <input 
                id="email"
                type="email" 
                required
                className="w-full px-3 py-4 border border-blue-700 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
            </label>
            <div className="mt-1">
              <input 
                id="password"
                type="password" 
                required
                className="w-full px-3 py-4 border border-blue-700 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex mt-6 justify-between">
          <Link className="text-sm font-medium text-blue-600 hover:underline" href="/signup">
              회원가입
          </Link>
          <Link className="text-sm font-medium text-blue-600 hover:underline" href="/">
              아이디 찾기 | 비밀번호 찾기
          </Link>
        </div>
          <div>
            <button 
              type="submit" 
              className="w-full px-4 py-5 text-white bg-blue-700 shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
              disabled={loading} 
            >
              로그인
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-3">
        <button 
          onClick={handleGoogleSignIn}
          disabled={loading} 
          className="flex items-center justify-center w-full mr-3 px-1 py-3 text-blue-800 border border-blue-700 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black hover:text-white"
        >
          <FcGoogle className="mr-2" size="2em" />Google 로그인
        </button>
        <button   
          disabled={loading} 
          className="flex items-center justify-center w-full px-1 py-3 text-blue-800 border border-blue-700 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black hover:text-white"
        >
          <FaFacebook className="mr-2 text-blue-600" size="2em" />Facebook 로그인
        </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
