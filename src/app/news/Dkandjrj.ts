import { naverApi } from '@/api/naverAPI';

export async function loader() {
  try {
    const newsData = await naverApi('나라');
    return newsData.items;
  } catch (error) {
    console.error('뉴스 가져오기 실패:', error);
    return [];
  }
}
