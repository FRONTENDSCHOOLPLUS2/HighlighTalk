import './_ArchivePage.scss';
import CategoryList from './components/CategoryList/CategoryList';
import Link from 'next/link';

function ArchivePage() {
  const data = [
    {
      id: 7,
      title: '윤우중 외 3명의 대화',
      theme: 'lovetest',
      author: '윤우중',
      createdAt: '2024.08.14 16:18:37',
    },
    {
      id: 9,
      title: '윤우중 외 3213213131232141244명의 대화',
      theme: 'lovetest',
      author: '윤우중',
      createdAt: '2024.08.14 16:18:37',
    },
  ];

  const parseDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    return [year, month, day].join('.');
  };

  return (
    <>
      <h1 className="heading">내 분석 보관함</h1>
      <CategoryList />
      <ul className="list-data">
        {data.map((item) => (
          <li className="item-data">
            <Link href={`${item.theme}/${item.id}`}>
              <div className="cont-data">
                <span className="tag">{item.theme}</span>
                <p className="title">{item.title}</p>
                <p className="bottom-info">
                  <span className="author">{item.author}</span>
                  <span className="date">{parseDateString(new Date(item.createdAt))}</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ArchivePage;
