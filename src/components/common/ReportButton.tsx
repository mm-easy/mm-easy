import { useSubmitReport } from '@/app/quiz/[id]/mutations';
import { supabase } from '@/utils/supabase/supabase';
import useMultilingual from '@/utils/useMultilingual';
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
  const m = useMultilingual('report');
  const insertReportMutation = useSubmitReport();

  const handleReport = async () => {
    if (!currentUserEmail) {
      toast.warn(m('NOTIFY_TO_LOGIN'));
      return;
    }
    const { data: reportHistory, error } = await supabase // 신고한 이력이 있는지 조회
      .from('reports')
      .select('*')
      .match({ user_id: currentUserEmail, target_id: targetId });

    if (error) {
      console.log('신고 이력 조회에 오류가 있습니다.');
      return;
    }

    if (reportHistory?.length !== 0) {
      // 이력이 있다면 알림
      toast.warn(
        `${m('NOTIFY_ALREADY_REPORT1')}${type === 'quiz' ? m('NOTIFY_ALREADY_REPORT_QUIZ') : m('NOTIFY_ALREADY_REPORT_POST')}`
      );
    } else {
      let reasonForReport = window.prompt(m('ASK_TO_REASON')); // 없다면 사유를 받음

      while (!reasonForReport || reasonForReport.length > 20) {
        if (reasonForReport === null) return; // 취소했으면 아무것도 안함
        toast.warn(m('ASK_TO_REASON')); // 아무것도 입력을 안했거나 20자가 넘었다면 toast
        return;
      }

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
        toast.success(m('NOTIFY_TO_REPORT'));
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
