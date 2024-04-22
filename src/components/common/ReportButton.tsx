import { useSubmitReport } from '@/app/quiz/[id]/mutations';
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
  const insertReportMutation = useSubmitReport();

  const handleReport = async () => {
    if (!currentUserEmail) {
      toast.warn('로그인이 필요합니다.');
      return;
    }
    const { data: reportHistory, error } = await supabase // 신고한 이력이 있는지 조회
      .from('reports')
      .select('*')
      .match({ user_id: currentUserEmail, target_id: targetId });

    if (error) {
      toast.warn('신고 이력 조회에 오류가 있습니다.');
      return;
    }

    if (reportHistory?.length !== 0) {
      // 이력이 있다면 알림
      toast.warn(`이미 신고한 ${type === 'quiz' ? '퀴즈' : '포스트'}입니다.`);
    } else {
      const reasonForReport = window.prompt('신고 사유를 입력해 주세요.'); // 없다면 사유를 받음

      if (reasonForReport) {
        const report = {
          title,
          target_id: targetId,
          type,
          reason: reasonForReport,
          reported_user_id: creatorId,
          user_id: currentUserEmail
        };

        insertReportMutation.mutate(report);
        toast.success('신고가 등록되었습니다.');
      } else if (reasonForReport === null) {
        return;
      } else {
        toast.warn(`신고 사유를 입력해 주세요.`);
      }
    }
  };

  return (
    <button className=" text-pointColor1 underline underline-offset-[3px]" onClick={handleReport}>
      {children}
    </button>
  );
};

export default ReportButton;
