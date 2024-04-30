/** 주어진 파일 객체로부터 현재 시간을 기반으로 한 유니크한 파일 이름을 생성 */
export const generateFileName = (file: File): string => {
  const timestamp = new Date().getTime(); // 현재 타임스탬프
  const extension = file.name.split('.').pop(); // 파일의 확장자
  return `${timestamp}.${extension}`;
};

/** 주어진 파일 객체와 사용자 제공 ID를 사용하여 특정 포맷의 파일 이름을 생성 */
export const generateImgFileName = (file: File, id: string | undefined): string => {
  const extension = file.name.split('.').pop(); // 파일의 확장자
  return `${id}.${extension}`;
};
