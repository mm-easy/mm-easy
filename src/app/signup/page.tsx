'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';
import { HiMiniInformationCircle } from 'react-icons/hi2';
import { FaCheckCircle } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';
import Terms from '@/constant/Terms';
import PrivacyPolicy from '@/constant/PrivacyPolicy';
import useMultilingual from '@/utils/useMultilingual';

const TermsPage = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, error } = useAuth();
  const router = useRouter();
  const [lang, setLang] = useAtom(langAtom);
  const m = useMultilingual('signup');

  useEffect(() => {
    setTermsChecked(allChecked);
    setPrivacyChecked(allChecked);
  }, [allChecked]);

  /** 개별 체크박스 상태 변경 핸들러 */
  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handlePrivacyChange = () => {
    setPrivacyChecked(!privacyChecked);
  };

  /** 이메일 유효성 검사 */
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

    /** 약관 동의를 확인합니다. */
    if (!termsChecked || !privacyChecked) {
      toast(m('TOAST_MESSAGE1'));
      return;
    }

    /** 이메일 유효성 검사 토스트 */
    if (!isValidEmail(email)) {
      toast.error(m('TOAST_MESSAGE2'));
      return;
    }

    /** 비밀번호 일치 여부를 확인합니다. */
    if (password !== confirmPassword) {
      toast.error(m('TOAST_MESSAGE3'));
      return;
    }

    /** 비밀번호 길이와 조합을 확인합니다. */
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
      toast.error(m('TOAST_MESSAGE4'));
      return;
    }

    /** 회원가입을 시도하고 결과를 처리합니다. */
    const signUpResult = await signUp(email, password);

    if (signUpResult && signUpResult.error) {
      toast.error(signUpResult.errorMessage);
      return;
    }

    /** 회원가입 성공 메시지를 표시하고 로그인 페이지로 이동합니다. */
    toast.success(m('TOAST_MESSAGE5'));
    router.push('/login');
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
          <h1 className="text-xl font-bold text-pointColor1 text-center mt-4 mb-6">{m('SIGN_UP_LOGO')}</h1>
          <div className="col-span-6 flex items-center bg-white justify-center">
            <div className="w-full mb-4 bg-white">
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="email" className="text-md font-bold text-blackColor">
                    {m('EMAIL_INPUT')}
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full px-3 py-4 rounded-md border border-pointColor1 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      placeholder={m('EMAIL_INPUT_PLACEHOLDER')}
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="text-md font-bold text-blackColor">
                    {m('PASSWORD_INPUT')}
                  </label>
                  <div className="my-1">
                    <input
                      id="password"
                      type="password"
                      required
                      className="w-full px-3 py-4 rounded-md border border-pointColor1 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      placeholder={m('PASSWORD_INPUT_PLACEHOLDER')}
                      autoComplete="new-password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <HiMiniInformationCircle className="mr-1 text-lg text-pointColor1" />
                    <span className="text-blackColor text-sm">{m('PASSWORD_CONDITION')}</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="text-md font-bold text-blackColor">
                    {m('PASSWORD_CONFIRM_INPUT')}
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm-password"
                      type="password"
                      required
                      className="w-full px-3 py-4 mb-2 rounded-md border border-pointColor1 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      placeholder={m('PASSWORD_CONFIRM_INPUT_PLACEHOLDER')}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    {password === confirmPassword && confirmPassword.length > 0 ? (
                      <div className={`flex items-center animate-fadein`}>
                        <FaCheckCircle className="text-green-500 text-lg mr-1" />
                        <span className="text-sm text-green-500">{m('IF_PW_MATCH')}</span>
                      </div>
                    ) : (
                      password !== confirmPassword &&
                      confirmPassword.length > 0 && (
                        <div className={`flex items-center animate-fadein`}>
                          <IoIosCloseCircle className="text-red-500 text-lg mr-1" />
                          <span className="text-sm text-red-500">{m('IF_PW_NOT_MATCH')}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <div></div>
            </div>
          </div>
          <form className="space-y-6 mt-4 mb-5" onSubmit={handleSubmit}>
            <div className="flex items-start">
              <label htmlFor="all-checkbox" className="inline-flex items-center cursor-pointer mb-2">
                <input
                  id="all-checkbox"
                  type="checkbox"
                  className="sr-only"
                  checked={allChecked}
                  onChange={() => setAllChecked(!allChecked)}
                />
                <span
                  className={`relative w-5 h-5 rounded-full border-solid border-2 ${
                    allChecked ? 'bg-pointColor1 border-pointColor1' : 'border-pointColor1'
                  }`}
                >
                  {allChecked && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                  )}
                </span>
                <label htmlFor="all-checkbox" className="ml-2 text-md font-bold leading-tight">
                  {m('AGREE_ALL')}
                </label>
              </label>
            </div>
            <div className="flex items-start">
              <label htmlFor="terms-checkbox" className="inline-flex items-center cursor-pointer">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  className="sr-only"
                  checked={termsChecked}
                  onChange={handleTermsChange}
                />
                <span
                  className={`relative w-5 h-5 rounded-full border-solid border-2 ${
                    termsChecked ? 'bg-pointColor1 border-pointColor1' : 'border-pointColor1'
                  }`}
                >
                  {termsChecked && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                  )}
                </span>
                <label htmlFor="terms-checkbox" className="ml-2 text-md font-bold">
                  <span className="text-pointColor1 text-md mr-1 font-bold">{m('REQUIRED')}</span>
                  {m('TERMS_LABEL')}
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
                <span
                  className={`relative w-5 h-5 rounded-full border-solid border-2 ${
                    privacyChecked ? 'bg-pointColor1 border-pointColor1' : 'border-pointColor1'
                  }`}
                >
                  {privacyChecked && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                    </span>
                  )}
                </span>
                <label htmlFor="privacy-checkbox" className="ml-2 text-md font-bold">
                  <span className="text-pointColor1 text-md mr-1 font-bold">{m('REQUIRED')}</span>
                  {m('PRIVACY_POLICY_LABEL')}
                </label>
              </label>
            </div>
            <div className="rounded-md border border-solid border-pointColor1 p-4 space-y-4 overflow-auto max-h-40">
              <PrivacyPolicy />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="w-full px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-pointColor1 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pointColor1"
              >
                {m('SIGN_UP_BUTTON')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </article>
  );
};

export default TermsPage;
