export interface User {
  _id: number;
  name: string;
  image: string | null;
}

export interface Product {
  image: string | null;
}

export interface PostItem {
  _id: number;
  type: string;
  title: string;
  content: string;
  image: string;
  views: number;
  user: User;
  replies: string;
  createdAt: string;
  updatedAt: string;
  seller_id: number | null;
  repliesCount: number;
  product: Product;
}
