import SubHeader from '@/components/common/SubHeader';
import SelectQuizLevel from '../(components)/SelectQuizLevel';

const QuizListPage = () => {
  return (
    <main className="h-full">
      <SubHeader text="퀴즈" />
      <SelectQuizLevel />
    </main>
  );
};

export default QuizListPage;
