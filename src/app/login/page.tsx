'use client';

import Link from 'next/link';
import useMultilingual from '@/utils/useMultilingual';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { assetsStorageUrl } from '@/utils/supabase/storage';
import Image from 'next/image';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordImage, setShowPasswordImage] = useState(false);
  const { signIn, loading, error, signInWithGoogle } = useAuth();
  const router = useRouter();
  const m = useMultilingual('login');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginSuccess = await signIn(email, password);
    if (loginSuccess) {
      router.push('/');
    } else {
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  // const handleKakaoSignIn = async () => {
  //   await signInWithKakao();
  // };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setShowPasswordImage(!!e.target.value);
  };

  return (
    <article className="h-[84vh] bg-bgColor1 grid grid-cols-10 sm:flex sm:flex-col">
      <div className="flex items-center justify-center py-8 border-r-2 border-solid border-pointColor1 sm:order-first order-none col-span-5 sm-border-solid sm:border-r-0 sm:border-b-2 sm:border-pointColor1">
        <div className="bg-bgColor2 rounded-full flex items-center justify-center overflow-hidden border border-solid border-pointColor1 w-[400px] h-[400px] sm:w-[200px] sm:h-[200px]">
          {showPasswordImage ? (
            <Image
              src={`${assetsStorageUrl}/login_2.png`}
              alt="로그인 이미지"
              width={400}
              height={400}
              quality={100}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Image
              src={`${assetsStorageUrl}/login_1.png`}
              alt="로그인 이미지"
              width={400}
              height={400}
              quality={100}
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>
      </div>
      <div className="sm:pb-[8vh] flex items-center bg-white justify-center flex-1 col-span-5">
        <div className="w-full max-w-md p-8 bg-white">
          <div className="flex py-8 h-[50px] justify-center items-center">
            <div className="w-[200px] h-[100px] sm:w-[160px]">
              <Image
                src={`${assetsStorageUrl}/logo_horizontal_3.png`}
                alt="로그인 이미지"
                width={200}
                height={100}
                quality={100}
                className="object-cover"
              />
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700"></label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-3 py-4 rounded-md border border-pointColor1 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="you@example.com"
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
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div className="flex mt-6 text-sm">
              <span className="mr-2">{m('SIGN_UP_SPAN')}</span>
              <Link className="text-pointColor1 font-bold underline" href="/signup">
                {m('SIGN_UP_BUTTON')}
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-5 rounded-md text-white bg-pointColor1 shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
                disabled={loading}
              >
                {m('LOG_IN_BUTTON')}
              </button>
            </div>
          </form>
          <div className="flex justify-center mt-3">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full px-1 py-3 text-pointColor1 border border-pointColor1 hover:bg-gray-300 rounded-md shadow"
            >
              <FcGoogle className="mr-2" size="2em" />
              {m('GOOGLE_LOGIN_BUTTON')}
            </button>
            {/* <button
                onClick={handleKakaoSignIn}
                className="flex items-center justify-center w-full px-1 py-3 text-pointColor1 border border-pointColor1 hover:bg-gray-300 rounded-md shadow"
              >
                <SiKakaotalk className="mr-2 bg-black text-yellow-500" size="2em" />
                Kakao 로그인
              </button> */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default LoginPage;
