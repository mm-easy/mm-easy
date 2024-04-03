import SubHeader from '@/components/common/SubHeader';
import SelectQuizLevel from '../(components)/SelectQuizLevel';
import QuizList from '../(components)/QuizList';

const QuizListPage = () => {
  return (
    <main className="h-full">
      <SubHeader text="퀴즈" />
      <SelectQuizLevel />
      <QuizList />
    </main>
  );
};

export default QuizListPage;
