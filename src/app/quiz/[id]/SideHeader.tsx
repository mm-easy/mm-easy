import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { CancelButton } from '@/components/common/FormButtons';
import { storageUrl } from '@/utils/supabase/storage';
import { useDeleteQuiz } from './mutations';
import { formatToLocaleDateTimeString } from '@/utils/date';
import useMultilingual from '@/utils/useMultilingual';
import CreateInfo from './CreateInfo';

const SideHeader = ({
  url,
  info,
  creator,
  date,
  currentUserEmail,
  id
}: {
  url: string | null;
  info: string;
  creator: string;
  date: string | undefined;
  currentUserEmail: string | null;
  id: string;
}) => {
  const m = useMultilingual('quiz-try');
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteQuizMutation = useDeleteQuiz();

  /** 삭제 버튼 클릭 핸들러 */
  const handleDeleteQuiz = (id: string) => {
    if (!window.confirm(m('ASK_TO_DELETE'))) return;
    deleteQuizMutation.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['quizzes', id] });
        toast.success(m('NOTIFY_TO_DELETE'));
      }
    });
  };

  /** 수정 버튼 클릭 핸들러 */
  const handleEditQuiz = (id: string) => {
    router.push(`/quiz/form/edit?id=${id}`);
  };

  return (
    <article className="h-[76vh] sm:h-full flex flex-col justify-between text-pointColor1">
      <section className="sm:text-blackColor">
        <Image
          src={`${storageUrl}/quiz-thumbnails/${url}`}
          alt="샘플 이미지"
          width={230}
          height={230}
          quality={100}
          className="w-full h-[230px] sm:hidden object-cover border-solid border-b-2 border-pointColor1"
        />
        <p className="sm:pt-10 pl-4 pt-4 hidden sm:block">{info}</p>
        <CreateInfo creator={creator} date={formatToLocaleDateTimeString(date)} />
        <p className="p-4 sm:hidden">{info}</p>
      </section>
      <div className="sm:hidden flex justify-center font-bold pb-4">
        {currentUserEmail === creator && (
          <div className="flex justify-center gap-2 items-center">
            <CancelButton
              text={m('EDIT_BTN')}
              width="w-20"
              height="h-12"
              border="border-1"
              onClick={() => handleEditQuiz(id as string)}
            />
            <CancelButton
              text={m('DELETE_BTN')}
              width="w-20"
              height="h-12"
              border="border-1"
              onClick={() => handleDeleteQuiz(id as string)}
            />
          </div>
        )}
      </div>
    </article>
  );
};

export default SideHeader;
