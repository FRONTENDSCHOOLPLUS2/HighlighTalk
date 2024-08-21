'use client';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages }) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const pageList = [];

  for (let i = 1; i <= totalPages; i++) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', String(i));
    const search = newSearchParams.toString();

    pageList.push(
      <li key={i}>
        <Link href={`/posts?type=comm${search}`} className={page === i ? 'active' : ''}>
          {i}
        </Link>
      </li>
    );
  }

  return (
    <div className="pagination">
      <ul>{pageList}</ul>
    </div>
  );
};

export default Pagination;
