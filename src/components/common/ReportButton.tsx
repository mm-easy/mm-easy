import { useSubmitTest } from '@/app/quiz/[id]/mutations';
import { supabase } from '@/utils/supabase/supabase';
import { toast } from 'react-toastify';

const ReportButton = ({
  children,
  targetId,
  type,
  currentUserEmail,
  title,
  creatorId
}: {
  children: React.ReactNode;
  targetId: string;
  type: string;
  currentUserEmail?: string | null | undefined;
  title: string;
  creatorId: string;
}) => {
  const insertReportMutation = useSubmitTest();

  const handleReport = async () => {
    if (!currentUserEmail) {
      toast.warn('로그인이 필요합니다.');
      return;
    }

    const report = {
      title,
      target_id: targetId,
      reported_user_id: creatorId,
      user_id: currentUserEmail
    };

    const { data: reportHistory, error } = await supabase
      .from('test')
      .select('*')
      .match({ user_id: currentUserEmail, target_id: targetId });

    if (error) {
      toast.warn('신고 이력 조회에 오류가 있습니다.');
      return;
    }

    if (reportHistory.length === 0) {
      insertReportMutation.mutate(report);
      toast.success('신고가 등록되었습니다.');
    } else {
      toast.warn(`이미 신고한 ${type === 'quiz' ? '퀴즈' : '포스트'}입니다.`);
    }
  };

  return (
    <button className=" text-pointColor1 underline underline-offset-[3px]" onClick={handleReport}>
      {children}
    </button>
  );
};

export default ReportButton;
