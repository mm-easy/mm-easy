import QuizForm from '@/app/quiz/form/QuizForm';
import SubHeader from '../../../components/common/SubHeader';

const QuizFormPage = () => {
  return (
    <>
      <SubHeader text="퀴즈 만들기" />
      <QuizForm />
    </>
  );
};

export default QuizFormPage;
