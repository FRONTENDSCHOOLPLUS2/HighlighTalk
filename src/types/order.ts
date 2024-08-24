interface ProductType {
  extra: string | null;
  image: string | null;
  price: number;
  quantity: number;
  seller_id: number;
  _id: 1 | 2; // 1은 사용, 2는 충전
}

export interface UserPayDataType {
  username: string; //유저명
  name: string; // 결제이름
  email: string;
  amount: number; // 결제 금액
  order_uid: string; //상점에서 생성한 고유 주문번호
}

interface PaginationType {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

interface OrderInfoType {
  order_type: 'charge' | 'purchase';
  amount: number | undefined;
  payment_method: string | undefined;
  extra: {
    balance_before: number;
    balance_after: number;
  };
}

interface OrderResponseItemType {
  cost: any;
  createdAt: string;
  order_info: OrderInfoType;
  products: ProductType; // Product
}
type OrderResponseItemArrType = OrderResponseItemType[];

export interface OrderResponseData {
  ok: 1 | 0;
  item: OrderResponseItemArrType;
  pagination: PaginationType;
}

export interface OrderDataType extends OrderInfoType {
  createdAt: string;
}
