import { auth } from '@/auth';
import { TEST_PRODUCT } from '@/data/TEST_PRODUCT';
import { getArchiveData } from '@/serverActions/archiveAction';
import NoDataNotification from './archive/components/NoDataNotification/NoDataNotification';
import Button from '@/components/Button/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CharacterBlue, CharacterGray } from '@public/image';

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
      {fetchedData && fetchedData.length > 0 ? (
        <ul className="result-box">
          {filteredData.map((item) => {
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
      ) : (
        <div className="nodata-cont">
          <h2>아직 분석 데이터가 없어요.</h2>
          <p>AI 분석을 받고 이 곳에서 최근 결과를 확인할 수 있어요.</p>
        </div>
      )}
    </div>
  );
}
export default ArchiveSumary;
