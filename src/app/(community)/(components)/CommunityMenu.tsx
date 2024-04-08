// 'use client';

// import type { CommunityMenuProps, MenuItem } from '@/types/posts';

// const CommunityMenu = ({ setSelectedCategory }: CommunityMenuProps) => {
//   const menuItems: MenuItem[] = [
//     { key: 'all', label: '전체' },
//     // { key: 'notice', label: '공지' },
//     { key: 'question', label: '질문' },
//     { key: 'chat', label: '잡담' },
//     { key: 'study', label: '공부' },
//     { key: 'diary', label: '일기' }
//   ];

//   return (
//     <nav className="w-40 text-pointColor1 font-bold">
//       <ul>
//         {menuItems.map((item) => (
//           <li key={item.key} className="p-5 pl-6 border-x border-b border-solid border-pointColor1">
//             <button onClick={() => setSelectedCategory(item.label)}>{item.label}</button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default CommunityMenu;
