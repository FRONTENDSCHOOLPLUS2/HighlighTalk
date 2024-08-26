import { auth } from '@/auth';
import { getArchiveData } from '@/serverActions/archiveAction';

interface Product {
  type: string;
  title: string;
  url: string;
  description: string;
  price: string | number;
}

interface TestProduct {
  [key: string]: Product;
}

// TODO - 상수 파일 분리
const TEST_PRODUCT: TestProduct = {
  freetest: {
    type: 'freetest',
    title: '우리 단톡방 분석 서비스',
    url: '/freetest',
    description: 'GPT-4o-mini 모델을 사용하여\n사용자의 대화 내용을 분석 해주는 서비스입니다.',
    price: 'FREE',
  },

  lovetest: {
    type: 'lovetest',
    title: '우리 연애 이대로 괜찮을까?',
    url: '/lovetest',
    description: '썸,연애,결혼 상대방의 대화 방식에서\n우리의 관계를 알아보세요❤️',
    price: 5,
  },
};

async function ArchiveSumary() {
  const userAuth = await auth();
  const fetchedData = userAuth ? await getArchiveData() : [];

  // console.log('횟치 데이타 확인', fetchedData);

  const sortedData = fetchedData.sort((a, b) => {
    const dateA = new Date(a.createdAt.replace(/\./g, '-')).getTime();
    const dateB = new Date(b.createdAt.replace(/\./g, '-')).getTime();
    return dateB - dateA;
  });

  const filteredData = sortedData.splice(0, 2);

  // TODO - 분석 데이터 없을 경우 뷰 (보관함 참고)
  return (
    <div className="contents result">
      <ul className="result-box">
        {filteredData.map((item, index) => {
          const productInfo = TEST_PRODUCT[item.type];
          const title = productInfo ? productInfo.title : 'Unknown';
          return (
            <>
              <li>
                <span className="result-title">
                  <span>{item.title}</span>
                  <span className="date">{item.createdAt.substring(0, 10)}</span>
                </span>
                <span className="people">{title}</span>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}
export default ArchiveSumary;
