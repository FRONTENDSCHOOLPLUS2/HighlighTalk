import './_ArchivePage.scss';
import { auth } from '@/auth';
import CategoryList from './components/CategoryList/CategoryList';
import Card from './components/Card/Card';
import NoDataNotification from './components/NoDataNotification/NoDataNotification';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER;

interface Post {
  _id: number;
  title: string;
  extra: {
    result: {
      peoples: string[];
    };
  };
  user: {
    _id: number;
    name: string;
  };
  createdAt: string;
  type: string;
}

const getData = async (accessToken: string) => {
  try {
    const URL = `${SERVER_URL}/posts/users`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'client-id': `${CLIENT_ID}`,
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(URL, config);
    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    if (data.ok === 1) {
      return data.item as Post[];
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

async function ArchivePage() {
  const userAuth = await auth();
  const fetchedData = await getData(userAuth.accessToken);

  return (
    <>
      <h1 className="heading">내 분석 보관함</h1>
      <CategoryList />
      {fetchedData && fetchedData.length > 0 ? (
        <ul className="list-data">
          {fetchedData.map((item) => (
            <li className="item-data">
              <Card
                {...item}
                username={item?.user?.name}
                peoples={item?.extra?.result?.peoples}
                isMine={Number(userAuth.user.id) === Number(item?.user._id)}
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
