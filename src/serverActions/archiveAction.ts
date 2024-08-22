import { auth } from '@/auth';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export const getArchiveData = async () => {
  'use server';

  const testTypes = ['lovetest', 'freetest'];
  const session = await auth();
  const URL = `${API_SERVER}/posts/users`;

  try {
    // 각 testType에 대해 fetch 요청을 Promise로 생성
    const fetchPromises = testTypes.map(async (type) => {
      try {
        const response = await fetch(`${URL}?type=${type}`, {
          headers: {
            'Content-Type': 'application/json',
            'client-id': `${CLIENT_ID}`,
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        const data = await response.json();

        console.log('archive: ', data);
        if (data.ok === 1) {
          return data.item; // 성공적으로 가져온 데이터를 반환
        } else {
          console.log(data.message);
          return []; // 에러 메시지가 있을 경우 빈 배열 반환
        }
      } catch (error) {
        console.log(error);
        throw new Error('Error fetching data - ' + type);
      }
    });

    // 모든 Promise가 완료될 때까지 기다림
    const results = await Promise.all(fetchPromises);

    // 결과 평탄화, 하나의 배열로 만들기
    const flattenedResults = results.flat();

    // 날짜 기준으로 정렬
    flattenedResults.sort((a, b) => {
      const D1 = new Date(a.createdAt);
      const D2 = new Date(b.createdAt);
      return D1 > D2 ? 1 : -1;
    });

    console.log('flattenedResults: ' + flattenedResults);
    return flattenedResults;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data');
  }
};
