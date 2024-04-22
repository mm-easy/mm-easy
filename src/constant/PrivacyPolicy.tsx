import useMultilingual from '@/utils/useMultilingual';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';

const PrivacyPolicy = () => {
  const [lang, setLang] = useAtom(langAtom);
  const m = useMultilingual(lang, 'privacypolicy');

    return (
        <p className="text-sm">
        <span className="font-bold">{m('ARTICLE_1')}</span><br/><br/>
        {m('EMAIL_NICK_PURPOSE')}<br/>
        {m('SUPPORT_GOOGLE')}<br/>
        {m('PW_ENCRYPTED')}<br/><br/>
        <span className="font-bold">{m('ARTICLE_2')}</span><br/><br/>
        {m('PERSONAL_INFORM_PURPOSE')}<br/><br/>
        <span className="font-bold">{m('ARTICLE_3')}</span><br/><br/>
        {m('COLLECTED_INFORM_PROVIDE')}<br/>
        {m('WILL_NOT_PROVIDE')}<br/><br/>
        <span className="font-bold">{m('ARTICLE_4')}</span><br/><br/>
        {m('IF_YOU_REQUEST')}<br/>
        {m('IF_RELEVANT_LAW')}<br/><br/>
        <span className="font-bold">{m('ARTICLE_5')}</span><br/><br/>
        {m('INFORM_PROTECT_OFFICER')}<br/>
        {m('IF_HAVE_INQUIRIES')}<br/><br/>
        <span className="font-bold">{m('CONTACT_US')}</span><br/><br/>
        <span className="font-bold">{m('ARTICLE_6')}</span><br/><br/>
        {m('IF_CHANGED_INFORM')}<br/><br/>
        <span className="font-bold">{m('ARTICLE_7')}</span><br/><br/>
        {m('KEEP_INFORM_UPTODATE')}<br/>
        {m('IF_YOU_AGREE_TERMS')}
      </p>
    );
};

export default PrivacyPolicy;