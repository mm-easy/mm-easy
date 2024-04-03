"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

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

    {/* 모든 체크박스가 선택되었는지 확인 */}
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
        <div className="flex items-center justify-center">
        <div className="bg-white p-3 rounded shadow max-w-md w-full mx-4">
          <h1 className="text-xl font-semibold text-center mt-4 mb-6">약관 동의</h1>
          <form className="space-y-6 mb-10" onSubmit={handleSubmit}>
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
            <div className="border border-solid border-pointColor1 p-4 rounded space-y-4 overflow-auto max-h-40">
              <p className="text-sm">
                여러분을 환영합니다! 뭔말이지? 서비스를 이용해 주셔서 감사합니다. 본 약관은 다양한 뭔말이지? 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.<br/><br/>
                뭔말이지? 서비스를 이용하시거나 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br/><br/>
                제 1조: 용어의 정의<br/><br/>
                "사이트": 저희가 운영하는 웹사이트를 말합니다.<br/>
                "이용자": 사이트를 이용하는 모든 분들을 의미합니다.<br/><br/>
                제 2조: 이용약관의 적용<br/><br/>
                이용자는 사이트 이용 시 이 약관에 동의합니다.<br/>
                즐겁게 이용하시고, 저희 사이트를 소중히 다루어주세요.<br/><br/>
                제 3조: 서비스 제공 및 이용<br/><br/>
                사이트는 최신 정보를 제공하기 위해 최선을 다하겠습니다.<br/>
                이용자는 자유롭게 사이트를 즐기시길 바라며, 운영진은 이용자 여러분들로부터의 적극적인 피드백을 환영합니다.<br/><br/>
                제 4조: 책임과 의무<br/><br/>
                사이트는 이용자의 정보를 소중히 다루며, 보안에 최선을 다하겠습니다.<br/>
                이용자는 서비스 이용 시 타인의 권리를 존중해주세요.<br/><br/>
                제 5조: 분쟁 해결<br/><br/>
                이용자와 사이트 간의 분쟁은 웃음과 이해를 통해 해결하도록 합니다.<br/>
                서로의 의견을 존중하며 상호 협력하여 해결해나갑시다.<br/><br/>
                제 6조: 약관의 변경<br/><br/>
                사이트는 필요 시 약관을 변경할 수 있습니다.<br/>
                변경 사항이 있을 시 사이트에 공지하여 이용자의 동의를 얻을 것입니다.<br/><br/>
                제 7조: 재미있는 추가 사항<br/><br/>
                이용자는 사이트 이용 시 재미있는 이벤트와 콘텐츠를 기대할 수 있습니다.<br/>
                함께 즐기며, 행복한 추억을 만들어봅시다!<br/><br/>
                제 8조: 유쾌한 마무리<br/><br/>
                우리는 이용자 여러분을 감사하며, 항상 유쾌한 서비스를 제공할 것을 약속합니다.<br/>
                뭔말이지? 서비스와 함께하는 모든 순간이 행복하길 바랍니다!
              </p>
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
            <div className="border border-solid border-pointColor1 p-4 rounded space-y-4 overflow-auto max-h-40">
              <p className="text-sm">
                제 1조: 수집 및 이용목적<br/><br/>
                우리 사이트는 아이디(이메일), 닉네임을 수집하여 회원가입을 위한 목적으로 사용합니다.<br/>
                또한, 구글/카카오 소셜 로그인을 지원하며, 해당 서비스를 통해 수집된 정보도 회원 관리에 활용됩니다.<br/>
                입력하신 비밀번호는 암호화되어 저장되므로 운영진도 알 수 없습니다.<br/><br/>
                제 2조: 정보 보안<br/><br/>
                수집된 개인정보는 회원 관리용으로만 사용되며, 그 외 마케팅 용도로 사용되지 않습니다.<br/><br/>
                제 3조: 제3자 제공<br/><br/>
                회원의 동의 없이 수집된 개인정보는 제3자에게 제공되지 않습니다.<br/>
                법령에 의한 경우나 회원의 동의가 있는 경우를 제외하고는 개인정보를 외부에 제공하지 않습니다.<br/><br/>
                제 4조: 개인정보의 보유 및 파기<br/><br/>
                회원탈퇴 등 회원의 요청이 있을 시에는 수집된 개인정보를 즉시 파기합니다.<br/>
                다만, 관련 법령에 따라 보존이 필요한 경우에는 해당 법령에서 정한 기간 동안 보관 후 파기합니다.<br/><br/>
                제 5조: 개인정보 보호책임자<br/><br/>
                개인정보 관련 문의 및 민원 처리를 위해 개인정보 보호책임자를 지정하여 안내합니다.<br/>
                문의 사항이 있을 시 언제든지 연락 주시기 바랍니다.<br/><br/>
                문의: redberry0217@gmail.com<br/><br/>
                제 6조: 약관의 변경<br/><br/>
                개인정보 처리 방침은 법령 및 사이트 정책에 따라 변경될 수 있으며, 변경 시 사이트 내 공지합니다. 변경된 약관은 공지 후 7일 이내에 시행됩니다.<br/><br/>
                제 7조: 유의사항<br/><br/>
                회원은 개인정보를 최신 정보로 유지하고, 타인의 정보를 무단으로 이용하지 않도록 주의하여야 합니다.<br/>
                본 약관에 동의함으로써 회원은 개인정보 처리에 대해 동의한 것으로 간주됩니다.
              </p>
            </div>
            <div className="flex">
              <button type="submit" className="w-full px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pointColor1 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pointColor1">
                완료
              </button>
            </div>
          </form>
        </div>
      </div>       
    );
};

export default TermsPage;