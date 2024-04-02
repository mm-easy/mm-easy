export const generateFileName = (file: File): string => {
  const timestamp = new Date().getTime(); // 현재 타임스탬프
  const extension = file.name.split('.').pop(); // 파일의 확장자
  return `${timestamp}.${extension}`;
};