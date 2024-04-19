import { useRouter } from 'next/navigation';

const RecommendLoginModal = ({
  id,
  proceedWithoutLogin
}: {
  id: string | undefined;
  proceedWithoutLogin: (id: string | undefined) => void;
}) => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl border-solid border-2 border-pointColor1">
        <h2 className="font-bold text-xl mb-4">로그인이 필요합니다</h2>
        <p className="mb-4">로그인하지 않으면 점수가 저장되지 않습니다.</p>
        <div className="flex justify-around">
          <button
            onClick={() => proceedWithoutLogin(id)}
            className="bg-gray-300 text-black font-bold py-2 px-4 rounded"
          >
            그냥 진행하기
          </button>
          <button
            onClick={() => {
              router.push('/login');
            }}
            className="bg-pointColor1 text-white font-bold py-2 px-4 rounded"
          >
            로그인 하러가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendLoginModal;
