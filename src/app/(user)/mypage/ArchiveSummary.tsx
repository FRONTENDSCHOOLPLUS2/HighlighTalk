import { auth } from '@/auth';
import { TEST_PRODUCT } from '@/data/TEST_PRODUCT';
import { getArchiveData } from '@/serverActions/archiveAction';
import Link from 'next/link';

async function ArchiveSummary() {
  const userAuth = await auth();
  const fetchedData = userAuth ? await getArchiveData() : [];
  // console.log('post 불러오기 확인', fetchedData);

  const sortedData = fetchedData.sort((a, b) => {
    const dateA = new Date(a.createdAt.replace(/\./g, '-')).getTime();
    const dateB = new Date(b.createdAt.replace(/\./g, '-')).getTime();
    return dateB - dateA;
  });

  const filteredData = sortedData.splice(0, 2);

  // TODO - 분석 데이터 없을 경우 뷰 (보관함 참고)
  return (
    <div className="contents result nodata-content">
      {fetchedData && fetchedData.length > 0 ? (
        <ul className="result-box">
          {filteredData.map((item) => {
            const productInfo = TEST_PRODUCT[item.type];
            const title = productInfo ? productInfo.title : 'Unknown';
            return (
              <>
                <li>
                  <Link href={`/${item.type}/${item._id}`}>
                    <span className="result-title">
                      {/* <span>{item.title}</span> 아직 값이 안 들어옴, 주석처리 - 제목작성 개발 이후 스타일링*/}
                      <span className="date">분석일: {item.createdAt.substring(0, 10)}</span>
                    </span>
                    <span className="people">{title}</span>
                  </Link>
                </li>
              </>
            );
          })}
        </ul>
      ) : (
        <div className="nodata-content">
          <h2>아직 분석 데이터가 없어요.</h2>
          <p>AI 분석을 받고 이 곳에서 최근 결과를 확인할 수 있어요.</p>
        </div>
      )}
    </div>
  );
}
export default ArchiveSummary;
