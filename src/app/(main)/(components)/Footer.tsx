const Footer = () => {
  return (
    <main className="bg-pointColor1 text-white p-8">
      <div className="text-6xl font-black tracking-widest m-4">뭔말이지? 뭔말easy!</div>
      <p className="mt-2 text-3xl m-4">퀴즈와 게임으로 쉽고 재미있게 배우는 한국어~ :P</p>
      <div className="flex ml-4">
        <div className="bg-gray-200 mt-2 w-64 h-32 rounded-full" />
        <div className="ml-4 mt-20">
          <p className="text-lg">제작 | coding zizon</p>
          <p className="text-lg">문의 | redbery0217@gmail.com</p>
        </div>
      </div>
    </main>
  );
};

export default Footer;
