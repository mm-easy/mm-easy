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

// // pages/api/news.js
// import Cors from 'cors';
// import axios from 'axios';

// // CORS 설정 초기화
// const cors = Cors({
//   origin: '*', // 모든 출처 허용
//   methods: ['GET'] // 허용할 HTTP 메소드
// });

// // 미들웨어를 비동기적으로 실행할 수 있도록 하는 함수
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// export default async function handler(req, res) {
//   // CORS 미들웨어 실행
//   await runMiddleware(req, res, cors);

//   // 네이버 API URL 및 쿼리 파라미터 설정
//   const query = req.query.query; // URL 파라미터에서 검색어 가져오기
//   const apiUrl = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}`;

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'X-Naver-Client-Id': process.env.NEXT_PUBLIC_API_KEY_NAVER_ID, // 환경 변수에서 API ID 가져오기
//         'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_API_KEY_NAVER_PW // 환경 변수에서 API Secret 가져오기
//       }
//     });
//     // API 응답 데이터 반환
//     res.status(200).json(response.data.items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: '서버 에러 발생' });
//   }
// }
