// export const naverApi = async (query: string) => {
//   const response = await fetch(`https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}`, {
//     method: 'GET',
//     headers: {
//       'X-Naver-Client-Id': process.env.NEXT_PUBLIC_API_KEY_NAVER_ID,
//       'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_API_KEY_NAVER_PW
//     }
//   });

//   if (!response.ok) {
//     throw new Error('News data fetching failed');
//   }

//   return response.json();
// };

// pages/api/images.js

// export default function handler(req, res) {
//   const query = req.query.query;
//   const api_url = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}`;

//   axios
//     .get(api_url, {
//       headers: {
//         'X-Naver-Client-Id': process.env.NEXT_PUBLIC_API_KEY_NAVER_ID,
//         'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_API_KEY_NAVER_PW
//       }
//     })
//     .then((response) => {
//       res.status(200).json(response.data.items);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ message: '서버 에러 발생' });
//     });
// }

// pages/api/news.js
import Cors from 'cors';
import axios from 'axios';

// CORS 설정 초기화
const cors = Cors({
  origin: '*', // 모든 출처 허용
  methods: ['GET'] // 허용할 HTTP 메소드
});

// 미들웨어를 비동기적으로 실행할 수 있도록 하는 함수
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // CORS 미들웨어 실행
  await runMiddleware(req, res, cors);

  // 네이버 API URL 및 쿼리 파라미터 설정
  const query = req.query.query; // URL 파라미터에서 검색어 가져오기
  const apiUrl = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Naver-Client-Id': process.env.NEXT_PUBLIC_API_KEY_NAVER_ID, // 환경 변수에서 API ID 가져오기
        'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_API_KEY_NAVER_PW // 환경 변수에서 API Secret 가져오기
      }
    });
    // API 응답 데이터 반환
    res.status(200).json(response.data.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 에러 발생' });
  }
}
