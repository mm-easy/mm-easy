'use client';

const CommunityMenu = ({ setSelectedCategory }) => {
  const menuItems: MenuItem[] = [
    { key: 'all', label: '전체' },
    { key: 'notice', label: '공지' },
    { key: 'question', label: '질문' },
    { key: 'chat', label: '잡담' },
    { key: 'study', label: '공부' },
    { key: 'diary', label: '일기' }
  ];


  return (
    <nav>
      <ul>
        {menuItems.map((item) => (
          <li key={item.key}>
            <button onClick={() => setSelectedCategory(item.label)}>{item.label}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CommunityMenu;
