export const formatToLocaleDateTimeString = (dateTime: string): string => {
  // created_at 등 넣기
  return new Date(dateTime).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/. /g, '-').replace('.', '');
};