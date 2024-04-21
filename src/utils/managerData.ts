import InfoHM from '@/assets/team/info_HM.png';
import InfoJM from '@/assets/team/info_JM.png';
import InfoJY from '@/assets/team/info_JY.png';
import InfoSH from '@/assets/team/info_SH.png';
import InfoYJ from '@/assets/team/info_YJ.png';
import InfoYS from '@/assets/team/info_YS.png';

import type { MultilingualFunction } from '@/types/manager';

export const createManagerData = (m: MultilingualFunction) => [
  {
    name: m('ABOUT_MANAGERDATA1_NAME'),
    content1: m('ABOUT_MANAGERDATA1_CONTENT1'),
    content2: m('ABOUT_MANAGERDATA1_CONTENT2'),
    Github: 'https://github.com/aotoyae',
    Blog: 'https://aotoyae.tistory.com/',
    img: InfoSH
  },
  {
    name: m('ABOUT_MANAGERDATA2_NAME'),
    content1: m('ABOUT_MANAGERDATA2_CONTENT1'),
    content2: m('ABOUT_MANAGERDATA2_CONTENT2'),
    Github: 'https://github.com/porosadporosad',
    Blog: 'https://velog.io/@tmxk1594/posts',
    img: InfoYJ
  },
  {
    name: m('ABOUT_MANAGERDATA3_NAME'),
    content1: m('ABOUT_MANAGERDATA3_CONTENT1'),
    content2: m('ABOUT_MANAGERDATA3_CONTENT2'),
    Github: 'https://github.com/C1oudys',
    Blog: 'https://velog.io/@kim9567/posts',
    img: InfoHM
  },
  {
    name: m('ABOUT_MANAGERDATA4_NAME'),
    content1: m('ABOUT_MANAGERDATA4_CONTENT1'),
    content2: m('ABOUT_MANAGERDATA4_CONTENT2'),
    Github: 'https://github.com/ahddl622',
    Blog: 'https://velog.io/@ahddl622/posts',
    img: InfoJM
  },
  {
    name: m('ABOUT_MANAGERDATA5_NAME'),
    content1: m('ABOUT_MANAGERDATA5_CONTENT1'),
    content2: m('ABOUT_MANAGERDATA5_CONTENT2'),
    Github: 'https://github.com/redberry0217',
    Blog: 'https://velog.io/@redberry0217/',
    img: InfoJY
  },
  {
    name: m('ABOUT_MANAGERDATA6_NAME'),
    content1: m('ABOUT_MANAGERDATA6_CONTENT1'),
    content2: m('ABOUT_MANAGERDATA6_CONTENT2'),
    Behance: 'https://www.behance.net/0802ysf5ee',
    Instagram: 'https://www.instagram.com/yethree_design/?igsh=MW42eW5rdG5nenVqZw%3D%3D&utm_source=qr',
    img: InfoYS
  }
];
