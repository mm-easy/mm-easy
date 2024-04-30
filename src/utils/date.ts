/** 입력받은 날짜와 시간 문자열을 'YYYY-MM-DD' 형식의 문자열로 변환 */
export const formatToLocaleDateTimeString = (dateTime: string | undefined): string | undefined => {
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

/** 입력받은 날짜와 시간 문자열을 'YYYY-MM-DD HH:MM' 형식의 문자열로 변환 */
export const formatCommentDateToLocal = (dateTime: string | undefined): string | undefined => {
  if (dateTime) {
    const formattedDateTime = new Date(dateTime)
      .toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      .replace(/. /g, '-')
      .replace(/\./g, '');

    /** '-'를 찾아서 날짜와 시간 사이를 ' ' (띄어쓰기)로 치환,
    시간 구분 마침표를 ':' (콜론)으로 변경 */
    const datePart = formattedDateTime.slice(0, 10); // 'YYYY-MM-DD' 형식의 날짜 부분
    const timePart = formattedDateTime.slice(11).replace(/-/g, ':'); // 'HH-MM' 형식의 시간 부분을 'HH:MM'으로 변경

    return `${datePart} ${timePart}`; // 'YYYY-MM-DD HH:MM' 형식으로 최종 문자열을 생성
  }
  return undefined;
};

