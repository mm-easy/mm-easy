import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-black rounded-full">
          {/* 고양이 예시 */}
        </div>
        <form className="space-y-6">
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
              />
            </div>
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 text-white bg-black rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
            >
              로그인
            </button>
          </div>
        </form>
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
