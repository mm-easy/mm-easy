interface QuizFormHeaderProps {
  text: string;
}

const SubHeader: React.FC<QuizFormHeaderProps> = ({ text }) => {
  return <main className="p-5 pl-10 bg-bgColor1 border-b border-pointColor1 text-pointColor1">{text}</main>;
};

export default SubHeader;
