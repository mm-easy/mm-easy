export interface PaginationProps {
  total: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export type TabName = 'solvedQuizzes' | 'quizzes' | 'posts' | 'comments';