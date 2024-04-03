export const formatToLocaleDateTimeString = (dateTime: string): string => {
  // created_at 등 넣기
  return new Date(dateTime).toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
};