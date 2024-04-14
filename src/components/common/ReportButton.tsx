import { useSubmitAdmin, useSubmitReport } from '@/app/(quiz)/quiz/[id]/mutations';
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
  targetId: string | string[];
  type: string;
  currentUserEmail?: string | null | undefined;
  title: string;
  creatorId: string;
}) => {
  const insertAdminMutation = useSubmitAdmin();
  const insertReportMutation = useSubmitReport();

  const handleReport = async (id: string | string[]) => {
    try {
      if (!currentUserEmail) {
        toast.warn('로그인이 필요합니다.');
        return;
      }

      const admin = {
        type,
        title,
        target_id: targetId,
        reported_user_id: creatorId
      };
      const { data: adminData } = await supabase.from('admin').select('*').eq('target_id', targetId); // 이 퀴즈/포스트의 신고 이력을 가져옴
      const adminId = adminData && adminData.length > 0 ? adminData?.[0].id : null; // adminData가 null이 아니고 비어 있지 않은 경우에만 id 할당 or null 할당

      /** 신고 이력이 없다면 admin에 최초 신고 등록 */
      if (adminData?.length === 0) {
        const insertedAdminId = await insertAdminMutation.mutateAsync(admin);
        const report = {
          user_id: currentUserEmail,
          admin_id: insertedAdminId
        };

        insertReportMutation.mutate(report);
        toast.success('신고가 등록되었습니다.');
        return;
      } else {
        /** admin에 신고 이력이 있고 report에 현재 사용자가 신고자로 등록돼 있다면 이미 신고한 퀴즈/포스트라고 알림 */
        const { data: reportData } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', currentUserEmail)
          .eq('admin_id', adminId);

        if (reportData?.length !== 0) {
          toast.warn(`이미 신고한 ${type === 'quizzes' ? '퀴즈' : '포스트'}입니다.`);
          return;
        }

        /** admin에 신고 이력이 있지만 현재 사용자는 처음 신고하는 퀴즈/포스트라면 report에 신고자 등록 */
        const report = {
          user_id: currentUserEmail,
          admin_id: adminId
        };
        insertReportMutation.mutate(report);
        toast.success('신고가 등록되었습니다.');
      }
    } catch (error) {
      toast.error('신고 등록이 실패했습니다.');
    }
  };

  return (
    <button className="text-pointColor1 underline underline-offset-[3px]" onClick={() => handleReport(targetId)}>
      {children}
    </button>
  );
};

export default ReportButton;
