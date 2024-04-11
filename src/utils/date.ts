export const formatToLocaleDateTimeString = (dateTime: string | undefined): string | undefined => {
  // created_at 등 넣기
  if (dateTime) {
    return new Date(dateTime)
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      .replace(/. /g, '-')
      .replace('.', '');
  }
};
