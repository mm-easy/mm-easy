/** 미리 지정된 이미지 파일 이름 목록에서 하나를 무작위로 선택해 반환 */
export const getRandomThumbnail = (): string => {
  const thumbnails = ['quiz_thumb_1.png', 'quiz_thumb_2.png', 'quiz_thumb_3.png'];
  const randomIndex = Math.floor(Math.random() * thumbnails.length);
  return thumbnails[randomIndex];
};
