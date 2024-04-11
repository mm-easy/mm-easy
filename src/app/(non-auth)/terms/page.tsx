'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Terms from '@/constant/Terms';
import PrivacyPolicy from '@/constant/PrivacyPolicy';
import SubHeader from '@/components/common/SubHeader';

const TermsPage = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTermsChecked(allChecked);
    setPrivacyChecked(allChecked);
  }, [allChecked]);

  // 개별 체크박스 상태 변경 핸들러
  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handlePrivacyChange = () => {
    setPrivacyChecked(!privacyChecked);
  };

  {
    /* 모든 체크박스가 선택되었는지 확인 */
  }
  useEffect(() => {
    setAllChecked(termsChecked && privacyChecked);
  }, [termsChecked, privacyChecked]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (termsChecked && privacyChecked) {
      router.push('/signup');
    } else {
      toast('모든 약관에 동의해야 합니다.');
    }
  };

  return (
    <article className="h-[84vh] flex items-center justify-center">
      <div className="flex w-[600px] items-center justify-center">
        <div className="w-full bg-white p-3 rounded shadow mx-4">
          <h1 className="text-xl font-semibold text-center mt-4 mb-6">약관 동의</h1>
          <form className="space-y-6 mb-5" onSubmit={handleSubmit}>
            <div className="flex items-start">
              <input
                id="all-checkbox"
                type="checkbox"
                checked={allChecked}
                onChange={() => setAllChecked(!allChecked)}
                className="h-5 w-5"
              />
              <label htmlFor="all-checkbox" className="ml-2 text-sm leading-tight">
                전체 동의하기
              </label>
            </div>
            <div className="flex items-start">
              <input
                id="terms-checkbox"
                type="checkbox"
                checked={termsChecked}
                onChange={handleTermsChange}
                className="h-5 w-5"
              />
              <label htmlFor="terms-checkbox" className="ml-2 text-sm leading-tight">
                <span className="text-pointColor1">[필수]</span> 뭔말Easy? 이용약관
              </label>
            </div>
            <div className="rounded-md border border-solid border-pointColor1 p-4 space-y-4 overflow-auto max-h-40">
              <Terms />
            </div>
            <div className="flex items-start">
              <input
                id="privacy-checkbox"
                type="checkbox"
                checked={privacyChecked}
                onChange={handlePrivacyChange}
                className="h-5 w-5"
              />
              <label htmlFor="privacy-checkbox" className="ml-2 text-sm leading-tight">
                <span className="text-pointColor1">[필수]</span> 개인정보 수집 및 이용
              </label>
            </div>
            <div className="rounded-md border border-solid border-pointColor1 p-4 space-y-4 overflow-auto max-h-40">
              <PrivacyPolicy />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="w-full px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pointColor1 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pointColor1"
              >
                다음으로
              </button>
            </div>
          </form>
        </div>
      </div>
    </article>
  );
};

export default TermsPage;
