export const naverApi = async (query: string) => {
  const response = await fetch(`https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: {
      'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET
    }
  });

  if (!response.ok) {
    throw new Error('News data fetching failed');
  }

  return response.json();
};
