import { PostItem } from '@/types/posts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function PostListItem({ item }: { item: PostItem }) {
  return (
    <>
      <tr className="table-row">
        <td className="table-cell text-center id-cell">{item._id}</td>
        <td className="table-cell truncate indent-cell">
          <Link href={`posts/${item._id}`}>{item.title}</Link>
        </td>

        <td className="table-cell text-center truncate">{item.user?.name}</td>
        <td className="table-cell text-center hidden-sm">{item.views}</td>
        <td className="table-cell text-center hidden-sm">{item.repliesCount || 0}</td>
        <td className="table-cell truncate text-center hidden-sm">{item.updatedAt}</td>
      </tr>
    </>
  );
}

export default PostListItem;
