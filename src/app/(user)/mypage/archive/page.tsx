import './_ArchivePage.scss';
import { auth } from '@/auth';
import { getArchiveData } from '@/serverActions/archiveAction';
import CategoryList from './components/CategoryList/CategoryList';
import Card from './components/Card/Card';
import NoDataNotification from './components/NoDataNotification/NoDataNotification';
import { PostItem } from '@/types';

async function ArchivePage() {
  const userAuth = await auth();
  const fetchedData = userAuth ? await getArchiveData() : [];

  // console.log(userAuth);
  return (
    <>
      <h1 className="heading">내 분석 보관함</h1>
      <CategoryList />
      {fetchedData && fetchedData.length > 0 ? (
        <ul className="list-data">
          {fetchedData.map((item: PostItem) => (
            <li className="item-data" key={item?._id}>
              <Card
                {...item}
                username={item?.user?.name}
                isMine={
                  userAuth?.user ? Number(userAuth.user.id) === Number(item?.user._id) : false
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <NoDataNotification />
      )}
    </>
  );
}

export default ArchivePage;
