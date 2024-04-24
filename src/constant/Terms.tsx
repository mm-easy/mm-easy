import useMultilingual from '@/utils/useMultilingual';

const Terms = () => {
  const m = useMultilingual('terms');

  return (
    <p className="text-sm">
      <span className="font-bold">{m('WELCOME_MESSAGE')}</span>
      <br />
      <br />
      {m('PLEASE_ATTENTION')}
      <br />
      <br />
      <span className="font-bold">{m('ARTICLE_1')}</span>
      <br />
      <br />
      &quot;{m('SITE')}&quot;{m('WHAT_IS_SITE')}
      <br />
      &quot;{m('USER')}&quot;{m('WHAT_IS_USER')}
      <br />
      <br />
      <span className="font-bold">{m('ARTICLE_2')}</span>
      <br />
      <br />
      {m('AGREE_TERMS')}
      <br />
      {m('PLZ_GUYS')}
      <br />
      <br />
      <span className="font-bold">{m('ARTICLE_3')}</span>
      <br />
      <br />
      {m('TRY_OUR_BEST')}
      <br />
      {m('ENJOY_FREE')}
      <br />
      <br />
      <span className="font-bold">{m('ARTICLE_4')}</span>
      <br />
      <br />
      {m('TREAT_INFORM_CARE')}
      <br />
      {m('RESPECT_OTHER_RIGHTS')}
      <br />
      <br />
      <span className="font-bold">{m('ARTICLE_5')}</span>
      <br />
      <br />
      {m('WITH_LAUGHTER_UNDERSTANDING')}
      <br />
      {m('RESPECT_EACH_OTHER')}
      <br />
      <br />
      <span className="font-bold">{m('ARTICLE_6')}</span>
      <br />
      <br />
      {m('TERMS_CAN_CHANGE')}
      <br />
      {m('IF_THERES_CHANGE')}
      <br />
      <br />
      <span className="font-bold">{m('ARTICLE_7')}</span>
      <br />
      <br />
      {m('CAN_EXPECT_EVENTS_CONTENT')}
      <br />
      {m('BE_ENJOY_AND_HAPPY')}
      <br />
      <br />
      <span className="font-bold">{m('ARTICLE_8')}</span>
      <br />
      <br />
      {m('THANK_AND_PROMISE')}
      <br />
      {m('WE_HOPE_YOU_HAPPY')}
    </p>
  );
};

export default Terms;
