import Link from 'next/link';

const MenuPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className='grid grid-rows-2 grid-cols-3 gap-10 p-10 w-full h-full'>
        <div className="flex flex-col justify-center items-center">
          <Link href="/quiz-list" className="w-64 h-64 bg-pointColor1 rounded-full flex items-center justify-center cursor-pointer">
            <p className="text-white text-2xl font-bold">퀴즈</p>
          </Link>
          <p className="mt-4 text-pointColor1 text-2xl font-bold">퀴즈</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link href="/community-list" className="w-64 h-64 bg-pointColor1 rounded-full flex items-center justify-center cursor-pointer">
            <p className="text-white text-2xl font-bold">커뮤니티</p>
          </Link>
          <p className="mt-4 text-pointColor1 text-2xl font-bold">커뮤니티</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link href="/" className="w-64 h-64 bg-pointColor1 rounded-full flex items-center justify-center cursor-pointer">
            <p className="text-white text-2xl font-bold">타자 연습</p>
          </Link>
          <p className="mt-4 text-pointColor1 text-2xl font-bold">타자 연습</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link href="/mypage" className="w-64 h-64 bg-pointColor1 rounded-full flex items-center justify-center cursor-pointer">
            <p className="text-white text-2xl font-bold">마이 페이지</p>
          </Link>
          <p className="mt-4 text-pointColor1 text-2xl font-bold">마이 페이지</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link href="/about" className="w-64 h-64 bg-pointColor1 rounded-full flex items-center justify-center cursor-pointer">
            <p className="text-white text-2xl font-bold">서비스 소개</p>
          </Link>
          <p className="mt-4 text-pointColor1 text-2xl font-bold">서비스 소개</p>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center">
            <p className="text-pointColor1 text-4xl font-bold">LOGO</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
