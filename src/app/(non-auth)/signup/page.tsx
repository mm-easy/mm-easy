'use client';
import Terms from '@/constant/Terms';
import PrivacyPolicy from '@/constant/PrivacyPolicy';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';

const TermsPage = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, error } = useAuth();
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

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /** 모든 체크박스가 선택되었는지 확인 */
  useEffect(() => {
    setAllChecked(termsChecked && privacyChecked);
  }, [termsChecked, privacyChecked]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 약관 동의를 확인합니다.
    if (!termsChecked || !privacyChecked) {
      toast('모든 약관에 동의해야 합니다.');
      return;
    }

    // 이메일 유효성 검사
  if (!isValidEmail(email)) {
    toast.error('유효하지 않은 이메일 주소입니다.');
    return;
  }
    
    // 비밀번호 일치 여부를 확인합니다.
    if (password !== confirmPassword) {
      toast.error('비밀번호가 서로 일치하지 않습니다.');
      return;
    }
    
    // 비밀번호 길이를 확인합니다.
    if (password.length < 6) {
      toast.error('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    
    // 회원가입을 시도하고 결과를 처리합니다.
    const signUpResult = await signUp(email, password);
    
    if (signUpResult && signUpResult.error) {
      toast.error(signUpResult.errorMessage);
      return;
    }
    
    // 회원가입 성공 메시지를 표시하고 로그인 페이지로 이동합니다.
    toast.success('회원가입에 성공했습니다! 로그인 페이지로 이동합니다.');
    // router.push('/login');
  };
  

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <article className="min-h-screen flex items-center justify-center">
      <div className="flex w-[600px] items-center justify-center">
        <div className="w-full bg-white p-3 rounded mx-4">
          <h1 className="text-xl font-bold text-pointColor1 text-center mt-4 mb-6">회원 가입</h1>
          <div className="col-span-6 flex items-center bg-white justify-center">
          <div className="w-full mb-4 bg-white">
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="email" className="text-md font-bold text-blackColor">이메일</label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full px-3 py-4 rounded-md border border-pointColor1 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      placeholder="이메일을 입력해주세요"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="text-md font-bold text-blackColor">비밀번호</label>
                  <div className="mt-1">
                    <input
                      id="password"
                      type="password"
                      required
                      className="w-full px-3 py-4 rounded-md border border-pointColor1 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      placeholder="비밀번호를 입력해주세요"
                      autoComplete="new-password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="text-md font-bold text-blackColor">비밀번호 확인</label>
                  <div className="mt-1">
                    <input
                      id="confirm-password"
                      type="password"
                      required
                      className="w-full px-3 py-4 rounded-md border border-pointColor1 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      placeholder="비밀번호를 다시 입력해주세요"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                </div>
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <div>
              </div>
          </div>
        </div>
          <form className="space-y-6 mt-4 mb-5" onSubmit={handleSubmit}>
            <div className="flex items-start">
            <label htmlFor="terms-checkbox" className="inline-flex items-center cursor-pointer">
              <input
                id="terms-checkbox"
                type="checkbox"
                className="sr-only" 
                checked={termsChecked}
                onChange={handleTermsChange}
              />
              <span className={`relative w-5 h-5 rounded-full border-solid border-2 ${termsChecked ? 'bg-pointColor1 border-pointColor1' : 'border-pointColor1'}`}>
                {termsChecked && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                  </span>
                )}
              </span>
              <label htmlFor="privacy-checkbox" className="ml-2 text-md font-bold">
              <span className="text-pointColor1 text-md font-bold">[필수]</span> 뭔말Easy? 이용약관
                </label>
            </label>
            </div>
            <div className="rounded-md border border-solid border-pointColor1 p-4 space-y-4 overflow-auto max-h-40">
              <Terms />
            </div>
            <div className="flex items-start">
            <label htmlFor="privacy-checkbox" className="inline-flex items-center cursor-pointer">
              <input
                id="privacy-checkbox"
                type="checkbox"
                className="sr-only" 
                checked={privacyChecked}
                onChange={handlePrivacyChange}
              />
              <span className={`relative w-5 h-5 rounded-full border-solid border-2 ${privacyChecked ? 'bg-pointColor1 border-pointColor1' : 'border-pointColor1'}`}>
                {privacyChecked && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                  </span>
                )}
              </span>
              <label htmlFor="privacy-checkbox" className="ml-2 text-md font-bold">
                <span className="text-pointColor1 text-md font-bold">[필수]</span> 개인정보 수집 및 이용
              </label>
            </label>
            </div>
            <div className="rounded-md border border-solid border-pointColor1 p-4 space-y-4 overflow-auto max-h-40">
              <PrivacyPolicy />
            </div>
            <div className="flex items-start">
              <label htmlFor="all-checkbox" className="inline-flex items-center cursor-pointer">
              <input
                id="all-checkbox"
                type="checkbox"
                className="sr-only" 
                checked={allChecked}
                onChange={() => setAllChecked(!allChecked)}
              />
              <span className={`relative w-5 h-5 rounded-full border-solid border-2 ${allChecked ? 'bg-pointColor1 border-pointColor1' : 'border-pointColor1'}`}>
                {allChecked && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                  </span>
                )}
              </span> 
              <label htmlFor="all-checkbox" className="ml-2 text-md font-bold leading-tight">
                전체 동의하기
              </label>
              </label>
            </div>
            <div className="flex">
              <button
                type="submit"
                className="w-full px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-pointColor1 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pointColor1"
              >
                가입 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </article>
  );
};

export default TermsPage;
