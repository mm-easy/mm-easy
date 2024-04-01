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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-black rounded-full">
          {/* 고양이 예시 */}
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              ID
            </label>
            <div className="mt-1">
              <input 
                id="email"
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
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
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 text-white bg-black rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
              disabled={loading} 
            >
              로그인
            </button>
          </div>
        </form>
        <button 
          onClick={handleGoogleSignIn}
          disabled={loading} 
          className="flex items-center justify-center w-full mt-4 px-4 py-2"
        >
          <FcGoogle className="mr-2" />구글로 로그인
        </button>
        <button 
          onClick={handleGoogleSignIn}
          disabled={loading} 
          className="flex items-center justify-center w-full mt-4 px-4 py-2"
        >
          <FaFacebook className="mr-2 text-blue-600" />페이스북으로 로그인
        </button>
        <div className="flex justify-center mt-6">
        <Link href="/signup" className="text-sm font-medium text-blue-600 hover:underline">
            회원가입하러가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
