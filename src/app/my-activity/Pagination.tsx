import { PaginationProps } from '@/types/pagination';

export const Pagination: React.FC<PaginationProps> = ({ total, itemsPerPage, currentPage, onPageChange }) => {
  const pageNumbers = [];
  const maxPage = Math.ceil(total / itemsPerPage);
  const maxPageButtons = 5;
  const currentPageGroup = Math.ceil(currentPage / maxPageButtons);
  const startPage = (currentPageGroup - 1) * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, maxPage);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className='flex justify-center pt-10'>
      <nav className="">
        <ul className="flex justify-center text-base font-bold gap-10">
          {startPage > 1 && (
            <button className="text-pointColor1" onClick={() => onPageChange(startPage - 1)}>
              &#9664;
            </button>
          )}
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`cursor-pointer ${number === currentPage ? 'text-blue-700 font-bold' : ''}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </li>
          ))}
          {endPage < maxPage && (
            <button className="text-pointColor1" onClick={() => onPageChange(endPage + 1)}>
              {' '}
              &#9654;
            </button>
          )}
        </ul>
      </nav>
    </section>
  );
};
