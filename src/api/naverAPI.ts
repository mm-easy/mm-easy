export const naverApi = async (query: string) => {
  const clientId = process.env.NEXT_PUBLIC_API_KEY_NAVER_ID;
  const clientSecret = process.env.NEXT_PUBLIC_API_KEY_NAVER_PW;

  if (!clientId || !clientSecret) {
    throw new Error('News data fetching failed');
  }

  const response = await fetch(
    `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}&display=4`,
    {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret
      }
    }
  );

  if (!response.ok) {
    throw new Error('News data fetching failed');
  }

  return response.json();
};

export async function loader() {
  try {
    const newsData = await naverApi('한국어');
    return newsData.items;
  } catch (error) {
    console.error('뉴스 가져오기 실패:', error);
    return [];
  }
}
