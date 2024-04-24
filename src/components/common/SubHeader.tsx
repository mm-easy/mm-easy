interface QuizFormHeaderProps {
  text: string;
}

const SubHeader: React.FC<QuizFormHeaderProps> = ({ text }) => {
  return (
    <main className="sm:hidden h-[8vh] font-bold pl-20 leading-[8vh] bg-bgColor1 border-b-2 border-pointColor1 text-pointColor1">
      {text}
    </main>
  );
};

export default SubHeader;
