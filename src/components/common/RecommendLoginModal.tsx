import useMultilingual from '@/utils/useMultilingual';
import { useRouter } from 'next/navigation';

const RecommendLoginModal = ({
  id,
  proceedWithoutLogin
}: {
  id: string | undefined;
  proceedWithoutLogin: (id: string | undefined) => void;
}) => {
  const router = useRouter();
  const m = useMultilingual('quiz-list');

  return (
    <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl border-solid border-2 border-pointColor1">
        <h2 className="font-bold text-xl mb-4">{m('ALERT_MSG_LOGIN')}</h2>
        <p className="mb-4">{m('ALERT_MSG_DETAIL')}</p>
        <div className="flex justify-around">
          <button
            onClick={() => proceedWithoutLogin(id)}
            className="bg-gray-300 text-black font-bold py-2 px-4 rounded"
          >
            {m('ALERT_MSG_PROCEED')}
          </button>
          <button
            onClick={() => {
              router.push('/login');
            }}
            className="bg-pointColor1 text-white font-bold py-2 px-4 rounded"
          >
            {m('ALERT_MSG_GOTOLOGIN')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendLoginModal;
