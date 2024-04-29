import { useRouter } from 'next/navigation';
import useMultilingual from '@/utils/useMultilingual';
import ExitButton from '@/components/common/ExitButton';
import HeaderTitle from './HeaderTitle';
import { QuizDropdown } from './QuizDorpdown';
import { CancelButton } from '@/components/common/FormButtons';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteQuiz } from './mutations';
import { toast } from 'react-toastify';
import { create } from 'lodash';

const Header = ({
  level,
  title,
  isAnswerWritten,
  resultMode,
  id,
  currentUserEmail,
  creator
}: {
  level: number;
  title: string;
  isAnswerWritten: number;
  resultMode: boolean;
  id: string;
  currentUserEmail: string | null;
  creator: string;
}) => {
  const m = useMultilingual('quiz-try');
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteQuizMutation = useDeleteQuiz();

  const handleExitBtn = () => {
    if (isAnswerWritten && !resultMode) {
      if (!window.confirm(m('ASK_TO_EXIT'))) return;
    }
    router.push('/quiz/list');
  };

  /** 삭제 버튼 클릭 핸들러 */
  const handleDeleteQuiz = (id: string) => {
    if (!window.confirm(m('ASK_TO_DELETE'))) return;
    deleteQuizMutation.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['quizzes', id] });
        toast.success(m('NOTIFY_TO_DELETE'));
        router.replace('/quiz/list');
      }
    });
  };

  
  /** 수정 버튼 클릭 핸들러 */
  const handleEditQuiz = (id: string) => {
    router.push(`/quiz/form/edit?id=${id}`);
  };

  return (
    <header className="w-full h-[8vh] flex justify-between leading-[8vh] border-solid border-b-2 border-pointColor1 sm:border-0">
      <h2 className="w-[calc(16%+2px)] sm:hidden text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
        {m('HEADER')}
      </h2>
      <section className="w-[calc(84%-2px)] flex justify-between">
        <div className="w-[95%] flex sm:flex-col">
          <div className="sm:block hidden">
            <HeaderTitle>{m('LEVEL')}</HeaderTitle>
            <div className="w-[100vw] flex justify-between">
              <div>
                <h3 className="w-[10%] sm:w-full sm:h-3/4 sm:pl-4 text-center sm:text-left sm:font-semibold sm:text-pointColor1 border-solid border-r-2 border-pointColor1 sm:border-0">
                  {level === 1 ? m('QUIZ_LEVEL_1') : level === 2 ? m('QUIZ_LEVEL_2') : m('QUIZ_LEVEL_3')}
                </h3>
              </div>
              {currentUserEmail === creator && (
                <div className='pr-4 font-bold'>
                <QuizDropdown
                  editBtn={
                    <CancelButton
                      text={m('EDIT_BTN')}
                      width="w-32"
                      height="h-12"
                      border="border-1"
                      onClick={() => handleEditQuiz(id as string)}
                    />
                  }
                  deleteBtn={
                    <CancelButton
                      text={m('DELETE_BTN')}
                      width="w-32"
                      height="h-12"
                      border="border-1"
                      onClick={() => handleDeleteQuiz(id as string)}
                    />
                  }
                />
              </div>
              )}
            </div>
          </div>
          <HeaderTitle>{m('TITLE')}</HeaderTitle>
          <h3 className="sm:w-full pl-[2%] sm:pl-4 sm:text-xl sm:font-semibold">{title}</h3>
        </div>
        <ExitButton size="sm" exitText={m('EXIT_BTN')} onClick={handleExitBtn} />
      </section>
    </header>
  );
};

export default Header;
