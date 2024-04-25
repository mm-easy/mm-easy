const HeaderTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="w-[10%] sm:hidden text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
      {children}
    </h2>
  );
};

export default HeaderTitle;
