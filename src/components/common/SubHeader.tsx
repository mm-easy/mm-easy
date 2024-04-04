interface QuizFormHeaderProps {
  text: string;
}

const SubHeader: React.FC<QuizFormHeaderProps> = ({ text }) => {
  return (
    <main className="pt-20 p-4 pl-10 bg-bgColor1 border-b border-pointColor1 text-pointColor1 flex items-end">
      {text}
    </main>
  );
};

export default SubHeader;
