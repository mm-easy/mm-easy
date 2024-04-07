'use client';

import { getPosts } from '@/api/posts';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { CommunityFormProps, Post } from '@/types/posts';

const CommunityForm = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  const [totalList, setTotalList] = useState<Post[]>([]);
  const [filteredList, setFilteredList] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 수
  const totalNum = filteredList.length; // 총 데이터 수
  const pageRange = 10; // 페이지당 보여줄 게시물 수 -   바꾸기
  const btnRange = 5; // 보여질 페이지 버튼의 개수
  const currentSet = Math.ceil(currentPage / btnRange); // 현재 페이지 세트
  const startPage = (currentSet - 1) * btnRange + 1; // 시작 페이지 번호
  const endPage = Math.min(startPage + btnRange - 1, Math.ceil(totalNum / pageRange)); // 마지막 페이지 번호

  const totalSet = Math.ceil(Math.ceil(totalNum / pageRange) / btnRange); // 전체 벼튼 세트 수

  const indexOfLastItem = currentPage * pageRange;
  const indexOfFirstItem = indexOfLastItem - pageRange;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  const fetchData = async () => {
    try {
      const data = await getPosts();
      setTotalList(data);
      setFilteredList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categoryMenu: { [key: string]: string } = {
    질문: '질문',
    잡담: '잡담',
    공부: '공부',
    일기: '일기'
  };

  const category = Object.keys(categoryMenu);

  const handleFilterRegionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selected = e.currentTarget.textContent;
    const selectedCategory = selected === '전체' ? '' : categoryMenu[selected || ''];

    if (selected === '전체') {
      setFilteredList(totalList);
    }

    if (selectedCategory) {
      setFilteredList(totalList.filter((item) => item['category'] === selectedCategory));
    }
    setCurrentPage(1); // 필터가 변경되면 페이지를 다시 1로 설정
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredList.length / pageRange); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <button key={number} onClick={() => setCurrentPage(number)}>
      {number}
    </button>
  ));

  if (!totalList || totalList.length === 0) {
    <div>데이터를 가져오지 못했습니다. 다시 시도해주세요.</div>;
  }

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const offset = (currentPage - 1) * pageRange;
  //     const loadedPosts = await getPosts(offset, pageRange);
  //     setPosts(loadedPosts);
  //   };

  //   fetchPosts();
  // }, [currentPage, selectedCategory]);

  const navigateToDetailPost = (post: any) => {
    router.push(`/community-list/${post.id}`);
  };

  const truncateTitle = (title: any) => {
    return title.length > 20 ? title.substring(0, 25) + '...' : title;
  };

  // const filteredPosts =
  //   selectedCategory === '전체' ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <article className='w-full'>
      <div className="flex w-full">
        <div>
          <li className="w-20">
            <button onClick={(e) => handleFilterRegionClick(e)}>전체</button>
          </li>
          {category.map((category) => {
            return (
              <li key={category} className="w-20">
                <button onClick={(e) => handleFilterRegionClick(e)}>{category}</button>
              </li>
            );
          })}
        </div>
        <div className="bg-white p-4 w-full ">
          <table className="w-full">
            <thead className="text-left ">
              <tr className=" text-pointColor1 font-bold border-b-2 border-solid border-pointColor1">
                <th className="p-4 ">구분</th>
                <th>닉네임</th>
                <th>제목</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody className="">
              {/* {filteredPosts.map((post) => (
                <tr
                  className=" bg-white cursor-pointer border-y border-solid border-pointColor1"
                  key={post.id}
                  onClick={() => navigateToDetailPost(post)}
                >
                  <td className="p-3 pr-12 w-24">{post.category}</td>
                  <td className="pr-10">{post.profiles.nickname || '알 수 없음'}</td>
                  <td>{truncateTitle(post.title)}</td>
                  <td>{formatToLocaleDateTimeString(post.created_at)}</td>
                </tr>
              ))} */}
              {currentItems?.map((item, idx) => {
                return (
                  <tr className="bg-white cursor-pointer border-y border-solid border-pointColor1" key={idx}>
                    <td className="p-3 w-24">{item['category']}</td>
                    <td className="">{item.profiles?.nickname || '알 수 없음'}</td>
                    <td>{item['title']}</td>
                    <td>{formatToLocaleDateTimeString(item['created_at'])}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <section className="flex justify-center my-[30px] px-20 w-full">
          <nav className="flex gap-5">
            {currentSet > 1 && <button onClick={() => setCurrentPage(startPage - 1)}>&lt;</button>}
            {Array(btnRange)
              .fill(startPage)
              .map((_, i) => {
                return (
                  <button key={i} onClick={() => setCurrentPage(startPage + i)} className="text-[16px] font-bold">
                    {/* // $active={page === startPage + i} */}
                    {startPage + i}
                  </button>
                );
              })}
            {totalSet > currentSet && <button onClick={() => setCurrentPage(endPage + 1)}>&gt;</button>}
          </nav>
        </section>
      </div>
    </article>
  );
};
export default CommunityForm;
