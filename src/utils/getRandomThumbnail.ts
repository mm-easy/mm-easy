export const getRandomThumbnail = (): string => {
  const thumbnails = ['quiz_thumb_1.png', 'quiz_thumb_2.png', 'quiz_thumb_3.png'];
  const randomIndex = Math.floor(Math.random() * thumbnails.length);
  return thumbnails[randomIndex];
};
